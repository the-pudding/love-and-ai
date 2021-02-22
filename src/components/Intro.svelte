<section id="intro">
  <div class="animation">
    <div class="bridge">
      <div class="background"></div>
      <div class="middle"></div>
      <div class="foreground"></div>
    </div>
  </div>
  <h1>A <span>model</span> break-up</h1>
  <h2>Sometimes all your story needs is a better ending.</h2>
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
    padding: 0 0 4rem 0;
  }

  h1 {
    font-family: var(--headline);
    font-size: 5rem;
  }

  h1 span {
    border: 1px solid var(--fg);
    box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-family: var(--mono);
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

  .animation {
    width: 100%;
    height: 450px;
  }

  .bridge {
    position: absolute;
    width: 100%;
    height: auto;
  }

  .background {
    background: url("../assets/images/210219_River_Animation_Final_BG.png") 0 0;
    position: absolute;
    width: 600px;
    height: 450px;
    background-size: cover;
  }

  .foreground {
    background: url("../assets/images/210219_River_Animation_Final_FG.png") 0 0;
    position: absolute;
    width: 600px;
    height: 450px;
    background-size: cover;
  }
</style>
