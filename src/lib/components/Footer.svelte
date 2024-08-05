<script>
  import {
    siYoutube,
    siDiscord,
    siInstagram,
    siTiktok,
    siLinkedin,
    siPatreon,
  } from "simple-icons"

  const { svg: YoutubeSvg } = siYoutube
  const { svg: DiscordSvg } = siDiscord
  const { svg: InstagramSvg } = siInstagram
  const { svg: TiktokSvg } = siTiktok
  const { svg: LinkedInSvg } = siLinkedin
  const { svg: PatreonSvg } = siPatreon
</script>

<footer class="max-w-7xl mx-auto mt-16">
  <div class="mx-6 border-t-2 border-solid border-slate-300 py-10">
    <div
      class="flex flex-row mb-10 sm:justify-between justify-center flex-wrap gap-y-8 gap-x-20"
    >
      <div class="flex gap-8 flex-wrap justify-center">
        <a
          href="https://github.com/ClimateTown/knowledge-hub"
          class="underline underline-offset-4"
        >
          Contribute
        </a>
        <a
          href="https://github.com/ClimateTown/knowledge-hub/#contributors"
          class="underline underline-offset-4"
        >
          Credits
        </a>
        <a
          href="https://www.climatetownproductions.com/"
          class="underline underline-offset-4"
        >
          Climate Town
        </a>
      </div>
      <div class="flex flex-row gap-4">
        <a href="https://www.youtube.com/c/ClimateTown">
          <div class="svgWrapper fill-black dark:fill-white">
            {@html YoutubeSvg}
          </div>
        </a>
        <a href="https://discord.gg/A5Czqfgr4C">
          <div class="svgWrapper fill-black dark:fill-white">
            {@html DiscordSvg}
          </div>
        </a>
        <a href="https://www.instagram.com/climatetown/">
          <div class="svgWrapper fill-black dark:fill-white">
            {@html InstagramSvg}
          </div>
        </a>
        <a href="https://www.tiktok.com/@climatetown">
          <div class="svgWrapper fill-black dark:fill-white">
            {@html TiktokSvg}
          </div>
        </a>
        <a href="https://www.linkedin.com/company/climate-town/">
          <div class="svgWrapper fill-black dark:fill-white">
            {@html LinkedInSvg}
          </div>
        </a>
        <a href="https://www.patreon.com/ClimateTown">
          <div class="svgWrapper fill-black dark:fill-white">
            {@html PatreonSvg}
          </div>
        </a>
      </div>
    </div>
    <div class="text-sm text-zinc-500 dark:text-zinc-400 pb-5">
      <b>Legal Disclaimer:</b> This website hosts content curated and managed by
      community members from the Climate Town Discord and is not directly managed
      by Climate Town YouTube. While every effort is made to ensure the quality of
      the content, we cannot guarantee its accuracy, completeness, or suitability
      for any purpose. The opinions and views expressed on this site are those of
      the individual contributors and do not necessarily reflect those of Climate
      Town YouTube. By using this website, you agree to hold the site administrators
      and contributors harmless from any liability arising from your use of the content.
    </div>

    <div class="text-sm text-zinc-500 dark:text-zinc-400 pb-5">
      <b>Data Disclaimer:</b> By using this website, you consent to the
      collection of usage data, including clicks on "resources", search terms
      used, and pages visited. This data is solely used to monitor site usage,
      and to enhance the reach of the project. As this project is open source,
      you can inspect the usage of analytics. Our analytics platform is Mixpanel
      (<a
        href="https://mixpanel.com/legal/privacy-policy"
        class="underline underline-offset-4">see their privacy policy here</a
      >), with data being stored in the EU.
    </div>

    <div class="text-sm text-zinc-500 dark:text-zinc-400">
      “Topography” by <a
        href="https://heropatterns.com/"
        class="underline underline-offset-4">Hero Patterns</a
      >, used under
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        class="underline underline-offset-4">CC BY 4.0</a
      >
    </div>
  </div>
</footer>

<style>
  .svgWrapper {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
