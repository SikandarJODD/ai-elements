import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = process.cwd();
const COMPONENTS_ROOT = path.join(ROOT_DIR, "src", "lib", "components");
const ROUTES_ROOT = path.join(
  ROOT_DIR,
  "src",
  "routes",
  "(main)",
  "components",
);
const REGISTRY_FILE = path.join(
  ROOT_DIR,
  "src",
  "lib",
  "registry",
  "components.ts",
);

const LANGUAGE_BY_EXTENSION = {
  ".css": "css",
  ".js": "javascript",
  ".json": "json",
  ".md": "markdown",
  ".svelte": "svelte",
  ".ts": "typescript",
};

function isDirectExecution(moduleUrl) {
  if (!process.argv[1]) {
    return false;
  }

  return path.resolve(process.argv[1]) === fileURLToPath(moduleUrl);
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function toKebabCase(value) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toPascalCase(value) {
  return toKebabCase(value).split("-").filter(Boolean).map(capitalize).join("");
}

function humanizeSlug(value) {
  return toKebabCase(value)
    .split("-")
    .filter(Boolean)
    .map(capitalize)
    .join(" ");
}

function normalizeRouteName(value) {
  const normalized = toKebabCase(value);

  if (!normalized) {
    throw new Error(`Invalid route name "${value}".`);
  }

  return normalized;
}

function normalizeSourceOverride(value) {
  const normalized = value
    .trim()
    .replace(/\\/g, "/")
    .replace(/^src\/lib\/components\//, "")
    .replace(/^\/+|\/+$/g, "");

  if (!normalized) {
    throw new Error("Source path cannot be empty.");
  }

  return normalized;
}

function normalizeSpecInput(spec) {
  if (!spec || typeof spec !== "object") {
    throw new Error("Each route spec must be an object.");
  }

  return {
    routeName: spec.routeName,
    sourceOverride: spec.sourceOverride
      ? normalizeSourceOverride(spec.sourceOverride)
      : undefined,
    exportOverride: spec.exportOverride?.trim() || undefined,
  };
}

function parseRouteSpecString(spec) {
  const trimmed = spec.trim();

  if (!trimmed) {
    throw new Error("Route specs cannot be empty.");
  }

  const [routePart, mappingPart] = trimmed.split("=", 2);
  const routeName = routePart.trim();

  if (!routeName) {
    throw new Error(`Invalid route spec "${spec}".`);
  }

  if (!mappingPart) {
    return normalizeSpecInput({ routeName });
  }

  const exportSeparatorIndex = mappingPart.lastIndexOf("@");
  const hasExplicitExport = exportSeparatorIndex !== -1;

  return normalizeSpecInput({
    routeName,
    sourceOverride: hasExplicitExport
      ? mappingPart.slice(0, exportSeparatorIndex)
      : mappingPart,
    exportOverride: hasExplicitExport
      ? mappingPart.slice(exportSeparatorIndex + 1)
      : undefined,
  });
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function listDirectoryEntries(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });

  return entries.sort((left, right) => left.name.localeCompare(right.name));
}

async function walkDirectories(rootDirectory, callback) {
  const entries = await listDirectoryEntries(rootDirectory);

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const fullPath = path.join(rootDirectory, entry.name);
    await callback(fullPath, entry.name);
    await walkDirectories(fullPath, callback);
  }
}

async function findSourceCandidates(routeSlug) {
  const candidates = [];

  await walkDirectories(
    COMPONENTS_ROOT,
    async (directoryPath, directoryName) => {
      if (toKebabCase(directoryName) !== routeSlug) {
        return;
      }

      if (!(await pathExists(path.join(directoryPath, "index.ts")))) {
        return;
      }

      candidates.push(
        toPosixPath(path.relative(COMPONENTS_ROOT, directoryPath)),
      );
    },
  );

  return candidates.sort((left, right) => left.localeCompare(right));
}

async function resolveSourceDirectory(spec, routeSlug) {
  if (spec.sourceOverride) {
    const sourceDirectory = path.join(COMPONENTS_ROOT, spec.sourceOverride);

    if (!(await pathExists(sourceDirectory))) {
      throw new Error(
        `Source path "${spec.sourceOverride}" does not exist under src/lib/components.`,
      );
    }

    if (!(await pathExists(path.join(sourceDirectory, "index.ts")))) {
      throw new Error(
        `Source path "${spec.sourceOverride}" must contain an index.ts file.`,
      );
    }

    return {
      relativePath: spec.sourceOverride,
      directoryPath: sourceDirectory,
    };
  }

  const candidates = await findSourceCandidates(routeSlug);

  if (candidates.length === 0) {
    throw new Error(
      `Could not resolve a component source for "${routeSlug}". Pass --source or use "${routeSlug}=<source-relative-path>".`,
    );
  }

  if (candidates.length > 1) {
    throw new Error(
      [
        `Component name "${routeSlug}" is ambiguous. Provide an explicit source path.`,
        ...candidates.map((candidate) => `- ${candidate}`),
      ].join("\n"),
    );
  }

  return {
    relativePath: candidates[0],
    directoryPath: path.join(COMPONENTS_ROOT, candidates[0]),
  };
}

async function collectSourceFiles(sourceDirectory) {
  const collectedFiles = [];

  async function walk(currentDirectory) {
    const entries = await listDirectoryEntries(currentDirectory);

    for (const entry of entries) {
      const fullPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      collectedFiles.push(
        toPosixPath(path.relative(sourceDirectory, fullPath)),
      );
    }
  }

  await walk(sourceDirectory);

  return collectedFiles.sort((left, right) => left.localeCompare(right));
}

function parseExportNames(indexFileContents) {
  const exportNames = new Set();
  const exportBlockPattern = /export\s*\{([\s\S]*?)\}/g;

  for (const match of indexFileContents.matchAll(exportBlockPattern)) {
    const items = match[1].split(",");

    for (const item of items) {
      const cleaned = item.replace(/\/\/.*$/gm, "").trim();

      if (!cleaned || cleaned.startsWith("type ")) {
        continue;
      }

      const exportName = cleaned.includes(" as ")
        ? cleaned
            .split(/\s+as\s+/)
            .at(-1)
            ?.trim()
        : cleaned.split(/\s+/).at(-1)?.trim();

      if (exportName) {
        exportNames.add(exportName);
      }
    }
  }

  return exportNames;
}

async function resolveComponentExport({
  sourceDirectory,
  sourceRelativePath,
  routeTitlePascal,
  exportOverride,
}) {
  const indexFilePath = path.join(sourceDirectory, "index.ts");
  const indexFileContents = await fs.readFile(indexFilePath, "utf8");
  const exportNames = parseExportNames(indexFileContents);
  const sourcePascal = toPascalCase(path.basename(sourceRelativePath));
  const preferredExports = [];

  if (exportOverride) {
    preferredExports.push(exportOverride);
  }

  preferredExports.push(routeTitlePascal);

  if (!preferredExports.includes(sourcePascal)) {
    preferredExports.push(sourcePascal);
  }

  preferredExports.push("Root");

  const exportName = preferredExports.find((candidate) =>
    exportNames.has(candidate),
  );

  if (!exportName) {
    throw new Error(
      [
        `Could not resolve an export for "${sourceRelativePath}".`,
        `Expected one of: ${preferredExports.join(", ")}`,
        `Available exports: ${[...exportNames].sort().join(", ") || "(none found)"}`,
      ].join("\n"),
    );
  }

  return {
    exportName,
    localName: routeTitlePascal,
  };
}

function getImportStatement(sourceRelativePath, exportName, localName) {
  const importPath = `$lib/components/${sourceRelativePath}`;

  if (exportName === localName) {
    return `import { ${localName} } from "${importPath}";`;
  }

  return `import { ${exportName} as ${localName} } from "${importPath}";`;
}

function toRawImportVariable(relativeFilePath) {
  const extension = path.extname(relativeFilePath).slice(1);
  const withoutExtension = relativeFilePath.slice(
    0,
    Math.max(
      0,
      relativeFilePath.length - path.extname(relativeFilePath).length,
    ),
  );

  return `${toPascalCase(withoutExtension)}${toPascalCase(extension)}Raw`;
}

function getLanguageForFile(relativeFilePath) {
  return LANGUAGE_BY_EXTENSION[path.extname(relativeFilePath)] ?? undefined;
}

function createTreeNode(name, isFile = false) {
  return {
    children: new Map(),
    isFile,
    name,
  };
}

function buildFolderStructure(sourceRelativePath, sourceFiles) {
  const root = createTreeNode("src");
  const baseSegments = ["lib", "components", ...sourceRelativePath.split("/")];

  function addPath(segments, isFile = false) {
    let currentNode = root;

    for (const [index, segment] of segments.entries()) {
      const isLeaf = index === segments.length - 1;

      if (!currentNode.children.has(segment)) {
        currentNode.children.set(
          segment,
          createTreeNode(segment, isLeaf && isFile),
        );
      }

      currentNode = currentNode.children.get(segment);

      if (isLeaf) {
        currentNode.isFile = isFile;
      }
    }
  }

  addPath(baseSegments);

  for (const filePath of sourceFiles) {
    addPath([...baseSegments, ...filePath.split("/")], true);
  }

  const lines = ["src/"];

  function renderNode(node, prefix = "") {
    const children = [...node.children.values()].sort((left, right) => {
      if (left.isFile !== right.isFile) {
        return left.isFile ? 1 : -1;
      }

      return left.name.localeCompare(right.name);
    });

    children.forEach((child, index) => {
      const isLast = index === children.length - 1;
      const connector = isLast ? "`-- " : "|-- ";
      lines.push(
        `${prefix}${connector}${child.name}${child.isFile ? "" : "/"}`,
      );

      if (!child.isFile) {
        renderNode(child, `${prefix}${isLast ? "    " : "|   "}`);
      }
    });
  }

  renderNode(root);

  return lines.join("\n");
}

function renderPageSvelte() {
  return `<script lang="ts">
\timport ComponentDocPage from "$lib/components/docs/base/main/component-doc-page.svelte";
\timport { data } from "./data";
</script>

<ComponentDocPage
\tid={data.id}
\ttitle={data.title}
\tdescription={data.description}
\tseo={data.seo}
\tpreview={data.preview}
\tpreviewCode={data.preview_code}
\tinstallCodeBlocks={data.install_block?.install_code}
\tinstallPackages={data.install_block?.packages}
\tinstallFolderStructure={data.install_block?.folder_structure}
\tinstallTailwindCode={data.install_block?.tailwind}
\texamples={data.examples}
\tpropsTables={data.props}
/>
`;
}

function renderPageTs() {
  return `export const prerender = true;
`;
}

function renderLlmsServerTs() {
  return `import type { RequestHandler } from "./$types";
import docs from "../docs.md?raw";

export const prerender = true;

export const GET: RequestHandler = async () => {
\treturn new Response(docs, {
\t\theaders: {
\t\t\t"Content-Type": "text/plain; charset=utf-8",
\t\t\t"Cache-Control": "public, max-age=3600",
\t\t},
\t});
};
`;
}

function renderPreviewSvelte(importStatement, componentName, title) {
  return `<script lang="ts">
\t${importStatement}

\tconst PreviewComponent: any = ${componentName};
</script>

<div class="flex w-full flex-col gap-4 rounded-2xl border border-dashed border-border/60 bg-muted/20 p-6">
\t<p class="text-sm text-muted-foreground">
\t\tReplace this starter preview with a polished ${title} example.
\t</p>
\t<div class="flex min-h-48 items-center justify-center rounded-xl bg-background/80 p-6">
\t\t<PreviewComponent />
\t</div>
</div>
`;
}

function renderDemoExampleSvelte(importStatement, componentName, title) {
  return `<script lang="ts">
\t${importStatement}

\tconst DemoComponent: any = ${componentName};
</script>

<section class="flex w-full flex-col gap-4 rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
\t<div class="space-y-1">
\t\t<h2 class="text-lg font-semibold">${title} demo</h2>
\t\t<p class="text-sm text-muted-foreground">
\t\t\tSwap this placeholder with a real usage example for ${title}.
\t\t</p>
\t</div>
\t<div class="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 p-6">
\t\t<DemoComponent />
\t</div>
</section>
`;
}

function renderDocsMarkdown({
  importStatement,
  title,
  slug,
  description,
  localName,
}) {
  return `# ${title}

${description}

## Installation

<Tabs items={["CLI", "Manual"]}>
<Tab value="CLI">

### Using CLI

\`\`\`bash
npx shadcn-svelte@latest add https://sv-animations.vercel.app/r/${slug}.json
\`\`\`

</Tab>
<Tab value="Manual">

### Manual Installation

Copy the component source files into your project and update the example files with real usage.

</Tab>
</Tabs>

## Usage

\`\`\`svelte
<script lang="ts">
  ${importStatement}
</script>

<${localName} />
\`\`\`

## Props

Document the ${title} props here.

## Features

- Replace this placeholder bullet with a real ${title} feature.
- Add one or two implementation details that matter to consumers.
- Include usage constraints or accessibility notes if they apply.
`;
}

function renderDataTs({
  description,
  folderStructure,
  installCodeBlocks,
  installCodeImports,
  seoDescription,
  slug,
  sourceRelativePath,
  title,
}) {
  const installCodeValue =
    installCodeBlocks.length === 1
      ? installCodeBlocks[0]
      : `[\n${installCodeBlocks.map((block) => `\t\t${block}`).join(",\n")}\n\t]`;

  return `${installCodeImports.join("\n")}

import type {
\tComponentDoc,
\tComponentMeta,
\tInstallComponentDocs,
} from "$lib/types/structure";
import type { Example } from "$lib/types/example";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";
import DemoExample from "./examples/demo-example.svelte";
import DemoExampleRaw from "./examples/demo-example.svelte?raw";

export const meta: ComponentMeta = {
\tid: ${JSON.stringify(slug)},
\ttitle: ${JSON.stringify(title)},
\tdescription: ${JSON.stringify(description)},
\tcategory: ${JSON.stringify(sourceRelativePath.split("/")[0])},
};

const seo: SEO = {
\ttitle: ${JSON.stringify(title)},
\tdescription: ${JSON.stringify(seoDescription)},
\tkeywords: ["Svelte", ${JSON.stringify(title)}, "Component"],
};

const examples: Example[] = [
\t{
\t\tname: "Demo",
\t\tpreview: DemoExample,
\t\tcode: {
\t\t\tname: "demo-example.svelte",
\t\t\tcode: DemoExampleRaw,
\t\t\tlang: "svelte",
\t\t},
\t},
];

const install_block: InstallComponentDocs = {
\tpackages: [],
\tinstall_code: ${installCodeValue},
\tfolder_structure: ${JSON.stringify(folderStructure)},
};

export const data: ComponentDoc = {
\t...meta,
\tpreview: Preview,
\tpreview_code: {
\t\tname: "preview.svelte",
\t\tcode: PreviewCode,
\t\tlang: "svelte",
\t\thideLines: true,
\t},
\tinstall_block,
\texamples,
\tseo,
\tprops: [],
};
`;
}

function escapeTemplateStringValue(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function readQuotedField(objectBlock, fieldName) {
  const pattern = new RegExp(`${fieldName}:\\s*"((?:\\\\.|[^"])*)"`);
  const match = objectBlock.match(pattern);

  if (!match) {
    return undefined;
  }

  return JSON.parse(`"${match[1]}"`);
}

function splitRegistryObjectBlocks(arrayBody) {
  const objectBlocks = [];
  let braceDepth = 0;
  let startIndex = -1;
  let inString = false;
  let isEscaped = false;

  for (let index = 0; index < arrayBody.length; index += 1) {
    const character = arrayBody[index];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
        continue;
      }

      if (character === "\\") {
        isEscaped = true;
        continue;
      }

      if (character === '"') {
        inString = false;
      }

      continue;
    }

    if (character === '"') {
      inString = true;
      continue;
    }

    if (character === "{") {
      if (braceDepth === 0) {
        startIndex = index;
      }

      braceDepth += 1;
      continue;
    }

    if (character === "}") {
      braceDepth -= 1;

      if (braceDepth === 0 && startIndex !== -1) {
        objectBlocks.push(arrayBody.slice(startIndex, index + 1));
        startIndex = -1;
      }
    }
  }

  return objectBlocks;
}

async function readRegistryState() {
  const contents = await fs.readFile(REGISTRY_FILE, "utf8");
  const arrayPattern = /(let components: Component\[] = \[)([\s\S]*?)(\n\];)/;
  const match = contents.match(arrayPattern);

  if (!match) {
    throw new Error("Could not locate the components registry array.");
  }

  const objectBlocks = splitRegistryObjectBlocks(match[2]);
  const entries = objectBlocks.map((block) => ({
    badge: readQuotedField(block, "badge"),
    desc: readQuotedField(block, "desc"),
    href: readQuotedField(block, "href"),
    id: readQuotedField(block, "id"),
    name: readQuotedField(block, "name"),
  }));

  return {
    contents,
    entries,
    match,
  };
}

function formatRegistryEntries(entries) {
  return entries
    .map((entry) => {
      const lines = [
        "  {",
        `    id: "${escapeTemplateStringValue(entry.id)}",`,
        `    name: "${escapeTemplateStringValue(entry.name)}",`,
        `    href: "${escapeTemplateStringValue(entry.href)}",`,
      ];

      if (entry.badge) {
        lines.push(`    badge: "${escapeTemplateStringValue(entry.badge)}",`);
      }

      if (entry.desc) {
        lines.push(`    desc: "${escapeTemplateStringValue(entry.desc)}",`);
      }

      lines.push("  },");

      return lines.join("\n");
    })
    .join("\n");
}

function renderRegistryContents(registryState, nextEntries) {
  const formattedEntries = formatRegistryEntries(nextEntries);

  return registryState.contents.replace(
    registryState.match[0],
    `${registryState.match[1]}\n${formattedEntries}${registryState.match[3]}`,
  );
}

function getRegistryEntryAction(existingEntries, slug) {
  return existingEntries.some((entry) => entry.id === slug)
    ? "update"
    : "create";
}

function buildRegistryEntries(existingEntries, routePlans) {
  const nextEntries = [...existingEntries];

  for (const routePlan of routePlans) {
    const nextEntry = {
      desc: routePlan.description,
      href: `/components/${routePlan.slug}`,
      id: routePlan.slug,
      name: routePlan.title,
    };

    const existingIndex = nextEntries.findIndex(
      (entry) => entry.id === routePlan.slug,
    );

    if (existingIndex === -1) {
      nextEntries.push(nextEntry);
      continue;
    }

    nextEntries[existingIndex] = {
      ...nextEntry,
      badge: nextEntries[existingIndex].badge,
    };
  }

  return nextEntries;
}

function buildInstallCodeImports(sourceRelativePath, sourceFiles) {
  return sourceFiles.map((filePath) => {
    const variableName = toRawImportVariable(filePath);
    return `import ${variableName} from "$lib/components/${sourceRelativePath}/${filePath}?raw";`;
  });
}

function buildInstallCodeBlocks(sourceFiles) {
  return sourceFiles.map((filePath, index) => {
    const language = getLanguageForFile(filePath);
    const parts = [
      "{",
      `name: ${JSON.stringify(filePath)},`,
      `code: ${toRawImportVariable(filePath)},`,
    ];

    if (language) {
      parts.push(`lang: ${JSON.stringify(language)},`);
    }

    if (index === 0) {
      parts.push("isExpand: true,");
    }

    parts.push("}");

    return parts.join(" ");
  });
}

function buildGeneratedFiles(routePlan) {
  const routeDirectory = path.join(ROUTES_ROOT, routePlan.slug);
  const examplesDirectory = path.join(routeDirectory, "examples");
  const llmsDirectory = path.join(routeDirectory, "llms.txt");
  const importStatement = getImportStatement(
    routePlan.sourceRelativePath,
    routePlan.exportName,
    routePlan.localName,
  );
  const installCodeImports = buildInstallCodeImports(
    routePlan.sourceRelativePath,
    routePlan.sourceFiles,
  );
  const installCodeBlocks = buildInstallCodeBlocks(routePlan.sourceFiles);

  return [
    {
      contents: renderPageSvelte(),
      filePath: path.join(routeDirectory, "+page.svelte"),
    },
    {
      contents: renderPageTs(),
      filePath: path.join(routeDirectory, "+page.ts"),
    },
    {
      contents: renderDataTs({
        description: routePlan.description,
        folderStructure: routePlan.folderStructure,
        installCodeBlocks,
        installCodeImports,
        seoDescription: routePlan.seoDescription,
        slug: routePlan.slug,
        sourceRelativePath: routePlan.sourceRelativePath,
        title: routePlan.title,
      }),
      filePath: path.join(routeDirectory, "data.ts"),
    },
    {
      contents: renderDocsMarkdown({
        description: routePlan.description,
        importStatement,
        localName: routePlan.localName,
        slug: routePlan.slug,
        title: routePlan.title,
      }),
      filePath: path.join(routeDirectory, "docs.md"),
    },
    {
      contents: renderLlmsServerTs(),
      filePath: path.join(llmsDirectory, "+server.ts"),
    },
    {
      contents: renderPreviewSvelte(
        importStatement,
        routePlan.localName,
        routePlan.title,
      ),
      filePath: path.join(examplesDirectory, "preview.svelte"),
    },
    {
      contents: renderDemoExampleSvelte(
        importStatement,
        routePlan.localName,
        routePlan.title,
      ),
      filePath: path.join(examplesDirectory, "demo-example.svelte"),
    },
  ];
}

async function buildRoutePlan(spec, options, existingRegistryEntries) {
  const slug = normalizeRouteName(spec.routeName);
  const title = humanizeSlug(slug);
  const localName = toPascalCase(slug);

  if ((await pathExists(path.join(ROUTES_ROOT, slug))) && !options.force) {
    throw new Error(
      `Route "${slug}" already exists. Re-run with --force to overwrite generated files.`,
    );
  }

  const source = await resolveSourceDirectory(spec, slug);
  const sourceFiles = await collectSourceFiles(source.directoryPath);

  if (sourceFiles.length === 0) {
    throw new Error(
      `Source component "${source.relativePath}" does not contain any files.`,
    );
  }

  const resolvedExport = await resolveComponentExport({
    exportOverride: spec.exportOverride,
    routeTitlePascal: localName,
    sourceDirectory: source.directoryPath,
    sourceRelativePath: source.relativePath,
  });

  const description = `TODO: ${title}.`;
  const seoDescription = `TODO: ${title}.`;
  const folderStructure = buildFolderStructure(
    source.relativePath,
    sourceFiles,
  );

  return {
    description,
    exportName: resolvedExport.exportName,
    files: buildGeneratedFiles({
      description,
      exportName: resolvedExport.exportName,
      folderStructure,
      localName,
      seoDescription,
      slug,
      sourceFiles,
      sourceRelativePath: source.relativePath,
      title,
    }),
    folderStructure,
    localName,
    registryAction: getRegistryEntryAction(existingRegistryEntries, slug),
    seoDescription,
    slug,
    sourceFiles,
    sourceRelativePath: source.relativePath,
    title,
  };
}

function validateUniqueRouteNames(specs) {
  const seenSlugs = new Map();

  for (const spec of specs) {
    const slug = normalizeRouteName(spec.routeName);

    if (seenSlugs.has(slug)) {
      throw new Error(
        `Route name "${spec.routeName}" conflicts with "${seenSlugs.get(slug)}" after normalization.`,
      );
    }

    seenSlugs.set(slug, spec.routeName);
  }
}

async function writeGeneratedFiles(files) {
  for (const file of files) {
    await fs.mkdir(path.dirname(file.filePath), { recursive: true });
    await fs.writeFile(file.filePath, file.contents, "utf8");
  }
}

function printDryRun(routePlans) {
  console.log("Dry run: no files were written.");

  for (const routePlan of routePlans) {
    console.log(`\n[${routePlan.slug}]`);
    console.log(`source: ${routePlan.sourceRelativePath}`);
    console.log(`export: ${routePlan.exportName} -> ${routePlan.localName}`);
    console.log(`registry: ${routePlan.registryAction}`);

    for (const file of routePlan.files) {
      console.log(`- ${toPosixPath(path.relative(ROOT_DIR, file.filePath))}`);
    }
  }
}

export async function generateRoutes(specInputs, options = {}) {
  const normalizedSpecs = specInputs.map(normalizeSpecInput);
  validateUniqueRouteNames(normalizedSpecs);

  const registryState = await readRegistryState();
  const routePlans = [];

  for (const spec of normalizedSpecs) {
    routePlans.push(
      await buildRoutePlan(
        spec,
        {
          dryRun: Boolean(options.dryRun),
          force: Boolean(options.force),
        },
        registryState.entries,
      ),
    );
  }

  const nextRegistryEntries = buildRegistryEntries(
    registryState.entries,
    routePlans,
  );
  const nextRegistryContents = renderRegistryContents(
    registryState,
    nextRegistryEntries,
  );

  if (options.dryRun) {
    printDryRun(routePlans);
    return {
      registryContents: nextRegistryContents,
      routePlans,
    };
  }

  for (const routePlan of routePlans) {
    await writeGeneratedFiles(routePlan.files);
  }

  await fs.writeFile(REGISTRY_FILE, nextRegistryContents, "utf8");

  for (const routePlan of routePlans) {
    console.log(
      `${routePlan.registryAction === "create" ? "Created" : "Updated"} route ${routePlan.slug}`,
    );
  }

  return {
    registryContents: nextRegistryContents,
    routePlans,
  };
}

function printBatchUsage() {
  console.log(`Usage:
  pnpm create:routes <name1> <name2> <name3>
  pnpm create:routes badge=ui/badge dialog=ui/dialog navigation-menu=ui/navigation-menu@Root

Options:
  --force    Overwrite generated files for existing routes
  --dry-run  Print the planned changes without writing files
  --help     Show this message
`);
}

export function parseBatchCliArgs(argv) {
  const specs = [];
  const options = {
    dryRun: false,
    force: false,
    help: false,
  };

  for (const argument of argv) {
    if (argument === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (argument === "--force") {
      options.force = true;
      continue;
    }

    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }

    if (argument.startsWith("--")) {
      throw new Error(`Unknown option "${argument}".`);
    }

    specs.push(parseRouteSpecString(argument));
  }

  if (!options.help && specs.length === 0) {
    throw new Error("At least one route spec is required.");
  }

  return { options, specs };
}

export async function runBatchCli(argv = process.argv.slice(2)) {
  const { options, specs } = parseBatchCliArgs(argv);

  if (options.help) {
    printBatchUsage();
    return;
  }

  await generateRoutes(specs, options);
}

if (isDirectExecution(import.meta.url)) {
  runBatchCli().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}