<script>
  import { base } from "$app/paths"

  import Button from "lib//components/Button.svelte"
  import Link45deg from "svelte-bootstrap-icons/lib/Link45deg.svelte"

  $: heroBgImage = `background-image: url("${base}/images/topography.svg");`
</script>

<div
  class="heroBanner relative flex justify-center items-center flex-col"
  style={heroBgImage}
>
  <div
    class="heroBanner_overlay absolute w-full flex flex-col justify-center text-center bg-gradient-to-b from-transparent to-white dark:from-transparent dark:to-neutral-900 h-full"
  >
    <div class="max-w-7xl mx-auto">
      <h1 class="font-bold text-5xl mx-6">
        Your one-stop shop for resources in the fight against climate change
      </h1>
      <h2 class="font-bold text-slate-500 dark:text-neutral-400 mx-6">
        By the Climate Town Community
      </h2>
    </div>
  </div>
</div>

<div class="bg-blue-primary mb-20">
  <div
    class="bannerContainer flex flex-column justify-center flex-col sm:flex-row sm:justify-between max-w-7xl mx-auto gap-8"
  >
    <div class="text-center sm:text-start mx-6 sm:ml-6">
      <span class="text-white font-bold text-lg">Where it All Started</span>
      <h2 class="text-white font-bold text-2xl">Climate Town Productions</h2>
    </div>
    <Button href="https://www.climatetownproductions.com/">
      Visit Climate Town
    </Button>
  </div>
</div>

<div class="flex flex-wrap justify-center gap-y-4 mx-6 sm:gap-x-20">
  <a href="{base}/resources" class="heroCardContainer">
    <div class="heroCard">
      <div class="relative">
        <img
          srcset="{base}/images/restore_banner.webp"
          alt="placeholder"
          class="rounded-md h-48 object-fill"
        />
        <div
          class="linkIconContainer absolute bottom-0 right-0 bg-zinc-50 dark:bg-zinc-800"
        >
          <Link45deg width={24} height={24} />
        </div>
      </div>
      <h3 class="text-blue-primary font-bold">Resources</h3>
      <div>A crowdsourced collection of a variety of climate resources.</div>
    </div>
  </a>
  <a href="{base}/youtube" class="heroCardContainer">
    <div class="heroCard">
      <div class="relative h-48">
        <img
          srcset="{base}/images/youtube_feed_banner.jpg"
          alt="placeholder"
          class="rounded-md h-48 object-fill"
        />
        <div
          class="linkIconContainer absolute bottom-0 right-0 bg-zinc-50 dark:bg-zinc-800"
        >
          <Link45deg width={24} height={24} />
        </div>
      </div>
      <h3 class="text-blue-primary font-bold">YouTube Feed</h3>
      <div>
        A feed of Climate Town and various other popular climate YouTuber
        videos, right here in the Knowledge Hub!
      </div>
    </div>
  </a>
</div>

<style>
  .heroBanner,
  .heroBanner_overlay {
    height: 42.5rem;
  }

  .heroCard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.75rem;
  }

  .heroCardContainer,
  .heroCard {
    max-width: 25rem;
  }

  .linkIconContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    padding: 8px;
    border-top-left-radius: 8px;
  }

  .bannerContainer {
    min-height: 180px;
    display: flex;
    align-items: center;
  }
</style>
