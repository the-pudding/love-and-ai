<script>
  import Graf from "./Text.Graf.svelte";
  export let text;
  export let type;
  export let active;
  export let locked;
  export let i;
</script>

{#each text as { value }}
  <p class="{type}" class:active="{active === i}">
    <Graf type="{type}" locked="{locked}" value="{value}" i="{i}" />
  </p>
{/each}

<style>
  p {
    margin: 0 auto;
    padding: 1.5em 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: blur(4px);
    transition: filter 250ms ease-in-out;
    line-height: 2;
  }

  p.active {
    filter: blur(0);
  }

  p.reality {
    align-items: flex-start;
  }

  @media only screen and (max-width: 480px) {
    p, p.reality {
      font-size: 0.9em;
    }
  }
</style>
