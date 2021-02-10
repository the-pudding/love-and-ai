<script>
    import copy from "../data/copy.json";
</script>

<section id="intro">
    <h1>{@html copy.hed}</h1>
    <h2>{copy.dek}</h2>
    <div class="byline">
        <p>Authored by {@html copy.author1} and <span>{@html copy.author2}</span></p>
        <p class="with">with {@html copy.with}</p>
    </div>
</section>

<style>
    #intro {
        margin: 0 auto;
        max-width: 60em;
        text-align: center;
        padding: 0 0 4rem 0;
    }

    h1 {
        font-family: var(--headline);
        font-size: 5rem;
    }

    .byline p {
        font-family: var(--sans);
    }

    .with {
        font-size: 1rem;
    }

    .byline span {
        background: var(--tan);
        border: 1px solid var(--off-black);
        box-shadow: 2px 2px 10px rgba(40, 40, 40, 0.1);
        border-radius: 5px;
        padding: 0.25rem 0.5rem;
        font-family: var(--mono);
    }
</style>