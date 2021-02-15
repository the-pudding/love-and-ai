<script>
  import { onMount, tick } from "svelte";
  import Meta from "./Meta.svelte";
  import Header from "./pudding/Header.svelte";
  import Footer from "./pudding/Footer.svelte";
  import Path from "./Path.svelte";
  import Prose from "./Prose.svelte";
  import Decision from "./Decision.svelte";
  import Intro from "./Intro.svelte";
  import copy from "../data/copy.json";

  let path;
  const onChange = () => {
    path.render();
  };

  onMount(() => {
    setTimeout(path.render, 1000);
  });
</script>

<Meta copy="{copy}" />
<Header />
<Intro />

<Path selector=".block.locked" bind:this="{path}" />

{#each copy.story as section, i}
  <section id="section-{i}">
    <Prose grafs="{section.prose}" />
    <Decision choices="{section.decision}" on:change="{onChange}" />
  </section>
{/each}

<!-- <Footer /> -->
