<script>
  import Graf from "./Graf.svelte";
  export let grafs;
</script>

<div class="prose">
  {#each grafs as { value }}
    <Graf text="{value}" on:change />
  {/each}
</div>

<style>
  .prose {
    display: flex;
    flex-direction: column;
    max-width: 60em;
    margin: 0 auto;
  }
</style>
