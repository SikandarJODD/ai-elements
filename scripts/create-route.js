import { generateRoutes } from "./create-routes.js";

function printSingleUsage() {
  console.log(`Usage:
  pnpm create:route <name>
  pnpm create:route <name> --source <source-relative-path> --export <symbol> --force --dry-run

Examples:
  pnpm create:route backlight
  pnpm create:route dialog-doc --source ui/dialog --export Root
`);
}

function parseSingleCliArgs(argv) {
  const options = {
    dryRun: false,
    exportOverride: undefined,
    force: false,
    help: false,
    routeName: undefined,
    sourceOverride: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

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

    if (argument === "--source") {
      const sourceValue = argv[index + 1];

      if (!sourceValue || sourceValue.startsWith("--")) {
        throw new Error("The --source option requires a value.");
      }

      options.sourceOverride = sourceValue;
      index += 1;
      continue;
    }

    if (argument === "--export") {
      const exportValue = argv[index + 1];

      if (!exportValue || exportValue.startsWith("--")) {
        throw new Error("The --export option requires a value.");
      }

      options.exportOverride = exportValue;
      index += 1;
      continue;
    }

    if (argument.startsWith("--")) {
      throw new Error(`Unknown option "${argument}".`);
    }

    if (options.routeName) {
      throw new Error(
        `Unexpected extra positional argument "${argument}". Use create:routes for batch generation.`,
      );
    }

    options.routeName = argument;
  }

  if (options.help) {
    return options;
  }

  if (!options.routeName) {
    throw new Error("A route name is required.");
  }

  return options;
}

async function runSingleCli(argv = process.argv.slice(2)) {
  const options = parseSingleCliArgs(argv);

  if (options.help) {
    printSingleUsage();
    return;
  }

  await generateRoutes(
    [
      {
        exportOverride: options.exportOverride,
        routeName: options.routeName,
        sourceOverride: options.sourceOverride,
      },
    ],
    {
      dryRun: options.dryRun,
      force: options.force,
    },
  );
}

runSingleCli().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});