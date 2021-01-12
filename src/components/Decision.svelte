<script>
  export let choices;

  let value;

  const slugify = (str) => str.toLowerCase().replace(/\W/g, "");
</script>

{#if choices}
  <div class="decision">
    <fieldset>
      {#each choices as { hed, text }}
        <input
          id="{slugify(hed)}"
          type="radio"
          value="{hed}"
          bind:group="{value}" />
        <label for="{slugify(hed)}">{hed}</label>
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
