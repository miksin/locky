<script lang="ts">
  import Generator from "./lib/Generator.svelte";
  import Logo from "./lib/Logo.svelte";
</script>

<main
  class="max-w-128 mx-auto flex min-h-dvh w-full flex-col gap-4 p-4 md:py-8"
>
  <div class="flex flex-col">
    <Logo />
    <h3 class="prose-l prose">Password Generator</h3>
  </div>
  <Generator />
  <p class="prose ml-auto mt-auto">
    Made by <a href="https://github.com/miksin/locky">@miksin</a>
  </p>
</main>
