<script lang="ts">
  import Card from "./Card.svelte";
  import {
    Charset,
    defaultCharset,
    defaultLength,
    evaluate,
    generate,
    Strength,
    type CharsetType,
  } from "./generate";
  import checkIcon from "../assets/check.svg?raw";
  import copyIcon from "../assets/copy.svg?raw";

  type Option = {
    type: CharsetType;
    enabled: boolean;
  };

  let options: Option[] = $state([
    { type: "Lowercase", enabled: true },
    { type: "Uppercase", enabled: true },
    { type: "Digits", enabled: true },
    { type: "Symbols", enabled: true },
  ]);

  let charset: string = $derived(
    options
      .filter((o) => o.enabled)
      .map((o) => Charset[o.type])
      .join(""),
  );

  let length = $state(defaultLength);
  let pw = $state(generate(defaultLength, defaultCharset));
  let strength = $state(evaluate(defaultLength, defaultCharset));
  let copied = $state(false);

  const handleGenerate = () => {
    pw = generate(length, charset);
    strength = evaluate(length, charset);
    copied = false;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pw);
    copied = true;
  };

  $effect(() => {
    if (charset.length === 0) {
      options = [
        { type: "Lowercase", enabled: true },
        { type: "Uppercase", enabled: false },
        { type: "Digits", enabled: false },
        { type: "Symbols", enabled: false },
      ];
    }
  });
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

<Card class="flex flex-col gap-2">
  <label class="form-control">
    <div class="label">
      <span class="label-text">Password Length</span>
    </div>
    <div class="flex items-center gap-2">
      <p class="prose">{length}</p>
      <input
        type="range"
        min="1"
        max="64"
        bind:value={length}
        class="range range-secondary"
      />
    </div>
  </label>
</Card>

<Card class="flex flex-col gap-2">
  {#each options as { type, enabled }}
    <label class="label cursor-pointer gap-1">
      <span class="label-text">{type}</span>
      <input
        class="checkbox-secondary checkbox"
        type="checkbox"
        checked={enabled}
        onchange={() => {
          options = options.map((o) => {
            if (o.type === type) {
              return { type, enabled: !enabled };
            }
            return o;
          });
        }}
      />
    </label>
  {/each}
</Card>

<button class="btn btn-primary shadow-lg" onclick={handleGenerate}>
  generate
</button>
