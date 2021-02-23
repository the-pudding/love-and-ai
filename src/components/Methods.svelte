<script>
    export let copy;
</script>

<section id="method">
    {#each copy.method as { value }}
        <p>{value}</p>
    {/each}
</section>

<style>
    #method p {
        display: flex;
        flex-direction: column;
        max-width: 31em;
        margin: 0 auto;
        padding: 1em;
        font-family: var(--sans);
        font-size: 0.9em;
    }
</style>
  