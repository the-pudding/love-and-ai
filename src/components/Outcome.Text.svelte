<script>
  export let text;
  export let type;
  export let active;
  export let locked;
  export let i;
</script>

{#each text as { value }}
  <p class="{type}" class:active="{active === i}">
    {#if typeof value === "string"}
      <span class="block" class:locked="{locked === i}"
        >{@html value.replace(/\\/g, "")}</span
      >
    {:else}
      {#each value as { chunk, offset, id, side, count, index }}
        <span
          class="block chunk"
          class:locked="{locked === i}"
          data-id="{id}"
          data-side="{side}"
          data-count="{count}"
          data-index="{index}"
          style="transform: translateX({offset}px);"
          >{@html chunk.replace(/\\/g, "")}</span
        >
      {/each}
    {/if}
  </p>
{/each}

<style>
  p {
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: blur(4px);
    transition: filter 250ms ease-in-out;
  }

  p.active {
    filter: blur(0);
  }

  p.generation span {
    display: inline-block;
    background: var(--tan);
    border: 1px solid var(--off-black);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-family: var(--mono);
  }

  p.generatation span span {
    font-family: var(--serif);
  }
</style>
