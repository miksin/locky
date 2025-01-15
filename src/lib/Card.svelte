<script lang="ts">
  let props = $props();
</script>

<div class={["card bg-base-200 p-4 shadow-lg", props.class]}>
  {@render props.children?.()}
</div>
