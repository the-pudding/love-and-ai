<script>
  import switcher from "../actions/switcher.js";
  export let copy;
</script>

<section id="intro">
  <h1 class="hed" use:switcher>
    {#each copy.titles as title, i}
      <span role="button" class:switch="{i === 0}">{title}</span>
    {/each}
  </h1>
  <p class="subhed">{copy.description}</p>
  <div class="byline">
    <p>
      Authored by <a href="https://pudding.cool/author/pamela-mishkin/"
        >Pamela Mishkin</a
      >
      and <span>GPT-3</span>
    </p>
  </div>
</section>

<style>
  section {
    margin: 0 auto;
    max-width: 60em;
    text-align: center;
    padding: 0 0 4em 0;
  }

  h1 {
    font-family: var(--headline);
    font-size: 4em;
    margin: 1em 0;
    user-select: none;
  }

  h1 span {
    border: 1px solid var(--fg);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.75rem 1.75rem 0.75rem 1rem;
    font-family: var(--mono);
  }

  h1 span:hover {
    background: rgba(251, 231, 201, 0.25);
  }

  p.subhed {
    font-size: 1.5em;
    line-height: 1.2;
  }

  .byline p {
    font-family: var(--sans);
  }

  .byline span {
    border: 1px solid var(--fg);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-family: var(--mono);
  }
</style>
