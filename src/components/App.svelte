<script>
  import { onMount, tick } from "svelte";
  import Meta from "./Meta.svelte";
  import Header from "./pudding/Header.svelte";
  import Footer from "./pudding/Footer.svelte";
  import Path from "./Path.svelte";
  import Prose from "./Prose.svelte";
  import Decision from "./Decision.svelte";
  import Intro from "./Intro.svelte";
  import OpeningAnimation from "./OpeningAnimation.svelte";
  import Methods from "./Methods.svelte";
  import copy from "../data/copy.json";

  let path;
  let mounted;
  const onChange = () => {
    if (mounted) path.render(mounted);
  };

  onMount(() => {
    mounted = true;
    setTimeout(onChange, 500);
  });
</script>

<Meta copy="{copy}" />
<Header />
<OpeningAnimation />
<Intro copy="{copy}" />

<Path selector=".unstopped .block.locked" bind:this="{path}" />

{#each copy.story as section, i}
  <section id="section-{i}" class="unstopped">
    {#if section.divider !== "false"}
      <hr class="{section.divider}" />
    {/if}
    {#if section.animation}
      <div class="animation">{@html section.animation}</div>
    {/if}
    <Prose grafs="{section.prose}" on:change="{onChange}" />
    <Decision choices="{section.decision}" on:change="{onChange}" />
  </section>
{/each}

<section id="method" class="unstopped">
  <Methods copy="{copy}" />
</section>

<section id="spacer" class="unstopped">
  <Footer />
</section>

<style>
  section {
    display: none;
  }

  .unstopped {
    display: block;
  }

  #method {
    margin-bottom: 6em;
  }

  #spacer {
    visibility: hidden;
    display: block;
    height: 50vh;
  }

  #spacer.unstopped {
    visibility: visible;
    display: block;
    height: auto;
  }

  .animation {
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  hr.pad {
    padding-top: 4em;
  }

  @media only screen and (max-width: 1000px) {
    .animation {
      position: relative;
      width: 100%;
      height: auto;
    }
  }
</style>
