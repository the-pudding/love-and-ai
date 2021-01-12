<script>
  export let choices;
  export let index;

  let value;
</script>

{#if choices}
  <div class="decision">
    <fieldset>
      {#each choices as { hed, text }, i}
        <input
          id="decision-{index}--{i}"
          type="radio"
          value="{hed}"
          name="decision-{index}"
          bind:group="{value}" />
        <label for="decision-{index}--{i}">{hed}</label>
      {/each}
    </fieldset>
  </div>
{/if}
