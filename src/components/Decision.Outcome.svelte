<script>
  export let data = [];
  export let active;
  $: current = data[active];
  $: r = current.rotate * -1;
</script>

<div class="decision-outcome" style="transform: rotate({r}deg);">
  {#each data as { text, type, rotate }, i}
    <div
      class="outcome {type}"
      class:active="{active === i}"
      style="transform: rotate({rotate}deg) translateY(3em);"
    >
      {#if text}
        {#each text as { value }}
          <p>{@html value}</p>
        {/each}
      {/if}
    </div>
  {/each}
</div>

<style>
  .decision-outcome {
    position: relative;
    transition: transform 500ms ease-out;
    transform-origin: 50% calc(var(--col-width) / -2);
    width: var(--col-width);
    margin: 0 auto;
  }

  .outcome {
    position: absolute;
    transform-origin: 50% calc(var(--col-width) / -2);
    top: 0;
    left: 0;
    width: calc(var(--col-width));
    transition: opacity 500ms ease-out;
    opacity: 0;
  }

  .outcome.active {
    opacity: 1;
  }

  p {
    padding: 1em;
  }
</style>
