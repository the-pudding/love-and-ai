<script>
  export let copy;
</script>

<section id="method">
  <h3>Methodology</h3>
  {#each copy.method as { value }}
    <p>{@html value}</p>
  {/each}
</section>

<section id="note">
  <h3>Author’s Note</h3>
  {#each copy.notes as { value }}
    <p>{@html value}</p>
  {/each}
</section>

<style>
  #method,
  #note {
    max-width: 30em;
    margin: 2rem auto 0 auto;
    padding: 0em 2em;
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
