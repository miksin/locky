<script lang="ts">
  import Card from "./Card.svelte";
  import {
    defaultCharset,
    defaultLength,
    evaluate,
    generate,
    Strength,
  } from "./generate";
  import checkIcon from "../assets/check.svg?raw";
  import copyIcon from "../assets/copy.svg?raw";

  interface Props {
    length: number;
    charset: string;
  }

  let { length, charset }: Props = $props();

  let pw = $state(generate(defaultLength, defaultCharset));
  let copied = $state(false);
  const strength = $derived(evaluate(length, charset));

  $effect(() => {
    console.log("PasswordPanel", { length, charset });
    pw = generate(length, charset);
  });

  const handleGenerate = () => {
    pw = generate(length, charset);
    copied = false;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pw);
    copied = true;
  };
</script>

<Card
  class={[
    "flex flex-row items-center justify-between gap-2 rounded-b-none border-b-8",
    strength === Strength.VeryWeak && "border-error",
    strength === Strength.Weak && "border-warning",
    strength === Strength.Strong && "border-info",
    strength === Strength.VeryStrong && "border-success",
  ]}
>
  <p class="prose prose-lg break-all font-mono">{pw}</p>
  <button
    class={["btn btn-circle btn-xs", copied && "hidden"]}
    onclick={handleCopy}
    aria-label="Copy password"
  >
    {@html copyIcon}
  </button>
  <button
    class={["btn btn-circle btn-xs text-success", !copied && "hidden"]}
    onclick={handleCopy}
    aria-label="Copy password"
  >
    {@html checkIcon}
  </button>
</Card>

<button class="btn btn-primary shadow-lg" onclick={handleGenerate}>
  generate
</button>
