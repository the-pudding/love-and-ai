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

<Methods copy="{copy}" />

<!-- <Footer /> -->
