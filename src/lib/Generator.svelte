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
  ]);

  let symbols: string = $state(Charset.Symbols);
  const symbolSet = $derived(new Set(symbols.split("")));
  const checkedAllSymbols = $derived(symbols.length === Charset.Symbols.length);
  const checkedSomeSymbols = $derived(
    symbols.length > 0 && symbols.length < Charset.Symbols.length,
  );
  const onCheckSymbols = () => {
    if (checkedAllSymbols) {
      symbols = "";
    } else {
      symbols = Charset.Symbols;
    }
  };

  let charset: string = $derived(
    options
      .filter((o) => o.enabled)
      .map((o) => Charset[o.type])
      .join("") + symbols,
  );

  let length = $state(defaultLength);
  let pw = $state(generate(defaultLength, defaultCharset));
  $effect(() => {
    pw = generate(length, charset);
  });
  let copied = $state(false);

  const handleGenerate = () => {
    pw = generate(length, charset);
    copied = false;
  };

  const strength = $derived(evaluate(length, charset));

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

<button class="btn btn-primary shadow-lg" onclick={handleGenerate}>
  generate
</button>

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
  <label class="label cursor-pointer gap-1">
    <span class="label-text">{symbols.length} Symbols</span>
    <input
      class="checkbox-secondary checkbox"
      type="checkbox"
      checked={checkedAllSymbols}
      indeterminate={checkedSomeSymbols}
      onchange={onCheckSymbols}
    />
  </label>
  <div class="autofill-grid grid gap-2">
    {#each Charset.Symbols.split("") as symbol}
      <button
        class={[
          "aspect-square rounded",
          symbolSet.has(symbol) && "bg-secondary",
        ]}
        aria-label={symbol}
        onclick={() => {
          if (symbolSet.has(symbol)) {
            symbols = symbols.replace(symbol, "");
          } else {
            symbols = symbols + symbol;
          }
        }}
      >
        {symbol}
      </button>
    {/each}
  </div>
</Card>

<style>
  .autofill-grid {
    grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
  }
</style>
