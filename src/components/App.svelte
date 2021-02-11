<script>
  import Meta from "./Meta.svelte";
  import Header from "./pudding/Header.svelte";
  import Footer from "./pudding/Footer.svelte";
  import Path from "./Path.svelte";
  import Prose from "./Prose.svelte";
  import Decision from "./Decision.svelte";
  import copy from "../data/copy.json";

  let path;
  const onChange = () => {
    path.render();
  };
</script>

<Meta />

<!-- <Header /> -->

<Path selector=".block.locked" bind:this="{path}" />

{#each copy.story as section, i}
  <section id="section-{i}" class="{section.class}">
    <Prose grafs="{section.prose}" />
    <Decision choices="{section.decision}" on:change="{onChange}" />
  </section>
{/each}

<!-- <Footer /> -->
