<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Icons from "$lib/components/icons/index";
</script>

<main class="overflow-hidden">
  <div class="absolute inset-0 isolate hidden contain-strict lg:block">
    <div
      class="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]"
    ></div>
    <div
      class="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]"
    ></div>
    <div
      class="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]"
    ></div>
  </div>
  <section>
    <div class="relative md:pt-24">
      <div
        class="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
      ></div>
      <div class="mx-auto max-w-5xl px-6 md:px-6">
        <div class="sm:mx-auto lg:mr-auto lg:mt-0">
          <h1
            class="mt-8 max-w-2xl text-balance text-5xl font-semibold md:text-6xl lg:mt-16"
          >
            Svelte AI Elements
          </h1>
          <p class="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground">
            Svelte AI Elements is a custom registry built on top of
            <a
              href="https://shadcn-svelte.com"
              target="_blank"
              class="underline underline-offset-2 text-primary">shadcn-svelte</a
            >
            to help you build AI-native applications faster.
            <br /> It provides pre-built components like conversations, messages,
            prompt input, response and more.
          </p>

          <div class="mt-12 flex items-center gap-1 md:gap-3">
            <Button
              size="lg"
              class="rounded-full md:text-base h-10.5 font-normal"
              href="/docs/introduction"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="secondary"
              href="https://github.com/SikandarJODD/ai-elements"
              target="_blank"
              rel="noreferrer"
              class="rounded-full border border-secondary md:text-base font-normal h-10.5"
            >
              <Icons.GitHub class="mr-1 size-5" />
              Star on Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
