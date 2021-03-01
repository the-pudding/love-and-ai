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
    setTimeout(path.render, 30);
  });
</script>

<Meta copy="{copy}" />
<Header />
<OpeningAnimation />
<Intro copy="{copy}" />

<Path selector=".unstopped .block.locked" bind:this="{path}" />

{#each copy.story as section, i}
  <section id="section-{i}" class="unstopped">
    {#if section.animation}
      <div class="animation">{@html section.animation}</div>
    {/if}
    <Prose grafs="{section.prose}" on:change="{onChange}" />
    <Decision choices="{section.decision}" on:change="{onChange}" />
    {#if section.divider === "true"}
      <hr />
    {/if}
  </section>
{/each}

<section id="method">
  <Methods copy="{copy}" />
</section>

<!-- for when we hit a stop so it doesn't jump -->
<div style="padding-top:50vh" class="spacer"></div>

<!-- <Footer /> -->
<style>
  section {
    display: none;
  }

  .unstopped {
    display: block;
  }

  .animation {
    position: absolute;
    width: 100%;
    height: 100vh;
  }
</style>
