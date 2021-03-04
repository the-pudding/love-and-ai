<script>
  import inView from "../actions/inView.js";
  import css from "../actions/css.js";
  import { bottomOffset } from "../stores/global.js";
  export let type;
  export let locked;
  export let i;
  export let value;
  export let dur;
  const visible = [];
</script>

{#if typeof value === "string"}
  <span
    data-id="true"
    class="block {type}"
    class:locked="{locked === i}"
    class:visible="{visible[0]}">{@html value.replace(/\\/g, "")}</span
  >
  <!-- use:inView="{{ bottom: $bottomOffset }}"
    on:enter="{() => (visible[0] = true)}"
    on:exit="{() => (visible[0] = false)}" -->
{:else}
  {#each value as { chunk, offset, id, side, count, index }, x}
    <span
      use:css="{{ dur }}"
      class="block chunk {type}"
      class:locked="{locked === i}"
      class:flip="{chunk.includes('=flip')}"
      data-id="{id}"
      data-side="{side}"
      data-count="{count}"
      data-index="{index}"
      style="transform: translateX({offset}px);"
      class:visible="{visible[x]}">{@html chunk.replace(/\\/g, "")}</span
    >
  {/each}
{/if}

<style>
  span {
    --dur: 500ms;
    opacity: 1;
    transition: all var(--dur) ease-in-out;
    display: block;
  }

  span.visible {
    opacity: 1;
  }

  span.reality {
    width: 100%;
  }

  span.generation {
    background: var(--tan);
    border: 1px solid var(--off-black);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.5em 1em;
    font-family: var(--mono);
  }
</style>
