<script lang="ts">
  import Card from "./Card.svelte";
  import { Charset, type Option } from "./generate";
  interface Props {
    options: Option[];
    symbols: string;
  }

  let { options = $bindable(), symbols = $bindable() }: Props = $props();

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
</script>

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
