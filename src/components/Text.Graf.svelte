<script>
  import inView from "../actions/inView.js";
  import { bottomOffset } from "../stores/global.js";
  export let type;
  export let locked;
  export let i;
  export let value;
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
    <!-- use:inView="{{ bottom: $bottomOffset }}"
      on:enter="{() => (visible[x] = true)}"
      on:exit="{() => (visible[x] = false)}" -->
  {/each}
{/if}

<style>
  span {
    opacity: 1;
    transition: all 500ms ease-in-out;
  }

  span.visible {
    opacity: 1;
  }

  span.generation {
    display: inline-block;
    background: var(--tan);
    border: 1px solid var(--off-black);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.5em 1em;
    font-family: var(--mono);
  }
</style>
