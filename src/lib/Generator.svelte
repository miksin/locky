<script lang="ts">
  import CharsetEditor from "./CharsetEditor.svelte";
  import { Charset, defaultLength, type Option } from "./generate";
  import LengthEditor from "./LengthEditor.svelte";
  import PasswordPanel from "./PasswordPanel.svelte";

  let length = $state(defaultLength);
  let options: Option[] = $state([
    { type: "Lowercase", enabled: true },
    { type: "Uppercase", enabled: true },
    { type: "Digits", enabled: true },
  ]);
  let symbols: string = $state(Charset.Symbols);

  let charset: string = $derived(
    options
      .filter((o) => o.enabled)
      .map((o) => Charset[o.type])
      .join("") + symbols,
  );

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

<PasswordPanel {length} {charset} />
<LengthEditor bind:length />
<CharsetEditor bind:options bind:symbols />
