<script lang="ts">
  import Card from "./Card.svelte";

  interface Props {
    length: number;
  }

  let { length = $bindable() }: Props = $props();
</script>

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
