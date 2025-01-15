<script lang="ts">
  import { Charset, generate } from "./generate";

  type Options = {
    lowercase: boolean;
    uppercase: boolean;
    digits: boolean;
    symbols: boolean;
  };
  let options: Options = $state({
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: true,
  });
  let charsets: string[] = $derived(
    [
      options.lowercase ? Charset.Lowercase : "",
      options.uppercase ? Charset.Uppercase : "",
      options.digits ? Charset.Digits : "",
      options.symbols ? Charset.Symbols : "",
    ].filter((v) => v !== ""),
  );

  let pw = $state("");
  const onClick = () => {
    pw = generate(10, charsets);
  };
</script>

<div>
  <p class="my-1 text-teal-400">{pw}</p>
  <div>
    <label>
      <input
        type="checkbox"
        bind:checked={options.lowercase}
        disabled={charsets.length === 1 && options.lowercase}
      />
      lowercase
    </label>
    <label>
      <input
        type="checkbox"
        bind:checked={options.uppercase}
        disabled={charsets.length === 1 && options.uppercase}
      />
      uppercase
    </label>
    <label>
      <input
        type="checkbox"
        bind:checked={options.digits}
        disabled={charsets.length === 1 && options.digits}
      />
      digits
    </label>
    <label>
      <input
        type="checkbox"
        bind:checked={options.symbols}
        disabled={charsets.length === 1 && options.symbols}
      />
      symbols
    </label>
  </div>
  <button onclick={onClick}> generate </button>
</div>
