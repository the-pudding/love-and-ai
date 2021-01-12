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

<style>
  label {
    user-select: none;
    cursor: pointer;
  }

  input {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }

  input[type="radio"]:checked + label {
    background: yellow;
  }

  input[type="radio"]:focus + label {
    box-shadow: 0 0 0 2px var(--focus);
  }
</style>
