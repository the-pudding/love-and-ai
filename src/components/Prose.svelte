<script>
  import Graf from "./Graf.svelte";
  export let grafs;
</script>

<div class="prose">
  {#each grafs as { text, align, id, connect }}
    <Graf text="{text}" align="{align}" />
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
