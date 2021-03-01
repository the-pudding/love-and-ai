<script>
  import inView from "../actions/inView.js";
  import switcher from "../actions/switcher.js";
  export let copy;
  let visible = true;
</script>

<section
  id="intro"
  use:inView
  on:enter="{() => (visible = true)}"
  on:exit="{() => (visible = false)}"
>
  <h1 class="hed" use:switcher>
    {#each copy.titles as title, i}
      <span role="button" class:switch="{i === 0}">{title}</span>
    {/each}
  </h1>
  <p class="subhed">{copy.description}</p>
  <div class="byline-corner">
    <div class="byline-block visible">
      <p class="byline-category">Story</p>
      <a href="https://pudding.cool/author/pamela-mishkin/" target="_blank"
        ><p>Pamela Miskin</p></a
      >
      <p>with help from <span>GPT-3</span></p>
    </div>
    <div class="byline-block" class:visible>
      <p class="byline-category">Design + Code</p>
      <a href="https://pudding.cool/author/russell-goldenberg/" target="_blank"
        ><p>Russell Goldenberg</p></a
      >
      <a href="https://pudding.cool/author/jan-diehm/" target="_blank"
        ><p>Jan Diehm</p></a
      >
    </div>
    <div class="byline-block" class:visible>
      <p class="byline-category">Illustrations</p>
      <a href="https://mariascherlies.com/" target="_blank"
        ><p>Maria Scherlies</p></a
      >
    </div>
  </div>
</section>

<style>
  .byline-corner {
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem 0 0 1rem;
    text-align: left;
    color: var(--off-black);
  }

  .byline-category {
    font-weight: 700;
    font-family: var(--sans);
  }

  .byline-block {
    margin: 0 0 1rem 0;
    transition: opacity 500ms ease-in-out;
    opacity: 0;
  }

  .byline-block.visible {
    opacity: 1;
  }

  .byline-block a:hover {
    color: var(--path-orange);
  }

  .byline-block p {
    margin: 0;
    font-size: 0.75em;
  }

  .byline-block span {
    background: var(--tan);
    border: 1px solid var(--off-black);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.125rem 0.25rem;
    font-family: var(--mono);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  section {
    margin: 0 auto;
    max-width: 60em;
    text-align: center;
    padding: 0 0 2em 0;
  }

  h1 {
    font-family: var(--headline);
    font-size: 4em;
    margin: 0.55em 0;
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
    font-size: 1.25em;
    line-height: 1.2;
    font-family: var(--sans);
    max-width: 40rem;
    margin: 0 auto;
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
