<script>
  export let copy;
</script>

<div>
  <h3>Methodology</h3>
  {#each copy.method as { value }}
    <p>{@html value}</p>
  {/each}
</div>
<div>
  <h3>Author’s Note</h3>
  {#each copy.notes as { value }}
    <p>{@html value}</p>
  {/each}
</div>

<style>
  div {
    max-width: 30em;
    padding: 0em 2em;
    margin: 2em auto;
  }

  h3 {
    font-family: var(--sans);
    font-weight: 700;
    font-size: 1em;
    text-transform: uppercase;
    margin: 0;
    padding: 0;
  }
  p {
    font-family: var(--sans);
    font-size: 0.9em;
    margin: 0 0 1em 0;
  }
</style>
