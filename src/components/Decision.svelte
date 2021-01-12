<script>
  export let choices;
</script>

{#if choices}
  <div class="decision">
    <fieldset>
      {#each choices as { hed, text }}
        <input type="radio" value="{hed}" />
        <label>{hed}</label>
      {/each}
    </fieldset>
  </div>
{/if}
