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

<Path selector=".block.locked" bind:this="{path}" />

{#each copy.story as section, i}
  <section id="section-{i}">
    {#if i === 4}
      <div class="animation">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    {/if}
    {#if i === 9}
      <div class="animation">
        <div class="train"></div>
      </div>
    {/if}
    <Prose grafs="{section.prose}" on:change="{onChange}" />
    <Decision choices="{section.decision}" on:change="{onChange}" />
    {#if i === 1 || i === 2 || i === 4 || i === 8 || i === 9}
      <div class="divider">
        <div class="line"></div>
      </div>
    {/if}
  </section>
{/each}

<Methods copy="{copy}" />

<!-- <Footer /> -->
