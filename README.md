<p align="center">
<a href="https://hub.climatetownproductions.com">
<img width="200" src="static/images/knowledge-hub-logo.png">
</a>
</p>

[![YouTube subs](https://img.shields.io/youtube/channel/subscribers/UCuVLG9pThvBABcYCm7pkNkA?label=ClimateTown&style=for-the-badge)](https://www.youtube.com/@ClimateTown)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/ClimateTown)

![Build workflow](https://img.shields.io/github/actions/workflow/status/ClimateTown/knowledge-hub/build.yml?branch=main&label=website%20build)
[![All Contributors](https://img.shields.io/github/all-contributors/ClimateTown/knowledge-hub?color=ee8449&style=flat-square)](#contributors)

---

### Update: A maintainer has gone on break. Will be back July 2024 🤠

The "behind the scenes" of the [ClimateTown Knowledge Hub](https://hub.climatetownproductions.com), your "one-stop shop" for important online resources in the fight against climate change!

## How to suggest a resource

- [Create an issue](https://github.com/ClimateTown/knowledge-hub/issues/new/choose) and select "✨Resource Suggestion".
- Fill out the form. Please adhere to the instructions.
- Get the resource approved (or discuss it further in the issue).
- Once approved, resource is then onboarded onto the website. Resource onboarding happens at least once a month (on the first Sunday)!

## Contributing

> TLDR: [Create an issue](https://github.com/ClimateTown/knowledge-hub/issues/new/choose), or edit the content directly and make a pull request.

All contributions welcome! We embrace:

- suggestions
- fixing typos
- writing content
- helping with website development, and
- discussing content on the Hub (check out the channels on Discord for this!)

The following sections go through how you can make different contributions. These will require you having a GitHub account.

For any discussion or questions about the Knowledge Hub, join us in the `#💬knowledge-hub-discussion` channel in the Climate Town Discord.

### Small edits/typos

Resources data (titles, URLs, descriptions, and tags) are stored in the `data/resources.yml` file, which is then used to populate the resource on the website. To make small edits, you can [directly edit this file](https://github.com/ClimateTown/knowledge-hub/edit/main/data/resources.yml) or you can create an issue.

To suggest changes anywhere else in the site, you can use GitHub's search functionality to find the exact file in which to suggest them.

### Resource suggestions

We're always looking to publicise awesome climate resources. Got a resource to share? The easiest way is to create an issue, filling out the "resource suggestion" form. This will create a discussion around the resource, and if it's a good fit for the Knowledge Hub, we'll add it to the site.

### Site improvements

This website is powered by coders from the community. If you want to contribute to the website, please follow the following guidelines:

- Create suggestions as issues in the repository. Discuss suggestions before submitting a pull request (unless the improvement is objectively good; e.g. performance, accessibility).
- If you want to work on an issue, drop a comment on it (this helps prevent unnecessary doubling up of work). If someone working on an issue hasn't updated the issue in a few weeks, feel free to drop a comment of your own if you want to try it out.

## Development setup

The site is primarily built using [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/), using Python for some additional tools in the codebase (eg. YouTube API, JSON schema validation). The following sections go through two options for installation, how to add Python dependencies, and setting up the YouTube API key.

### ⚡QUICK SETUP⚡

TLDR; simply click this badge to spin up a Codespaces cloud environment 🕺

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ClimateTown/knowledge-hub)

For local development, this repo provides a [dev container](https://code.visualstudio.com/docs/devcontainers/containers) to streamline installation (assuming you're familiar with Docker and have it installed). Building and running this container will install all dependencies for the project, and run the development server in the background piping the output to `nohup.out`.

### Manual installation

Alternatively, you can install all project dependencies manually in the OS of your choice.

#### Node and npm (for Svelte and SvelteKit)

- [install Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
- `git clone https://github.com/ClimateTown/knowledge-hub.git`
- `cd` into the cloned directory
- `npm install`
- `npm run dev`

#### OPTIONAL: Python

As mentioned above, Python is only responsible for some tooling in the codebase. For most changes to the site, Python is not required.

- [install Python](https://www.python.org/downloads/) if you haven't already (minimum version 3.7)
- create a virtual environment, then activate it (optional, but recommended)
  - `python -m venv venv`
  - activate the environment using either:
    - `source venv/bin/activate` (Linux/MacOS)
    - `venv\Scripts\activate.bat` (Windows)
- `pip install -r requirements.txt`

#### OPTIONAL: Pre-commit

This codebase uses [pre-commit](https://pre-commit.com/) and [pre-commit CI](https://pre-commit.ci/) to run linting on code, format Python code, and generally have help with code quality.

To set up pre-commit locally:

- install the Python environment (which includes pre-commit)
- `pre-commit install` to install the hooks

To run pre-commit manually (without making a commit), use `pre-commit run --all-files`. If you want to stop using pre-commit locally, just do `pre-commit uninstall`.

---

### Adding Python dependencies

This codebase uses [`pip-tools`](https://pypi.org/project/pip-tools/) to manage dependencies. If you add a new dependency, you can add it to `requirements.in` and run `pip-compile` to update `requirements.txt`. To update your environment run `pip-sync`.

### YouTube API Keys

To set up the YouTube API (important for working on scripts with YouTube video scraping):

- Follow the python installation steps above
- Go to <https://console.cloud.google.com> and create account
- Go to <https://console.cloud.google.com/apis/credential>
- Make an API Key: Create Credentials > API Key
- Enable Youtube API v3 <https://console.cloud.google.com/marketplace/product/google/youtube.googleapis.com>
- Make a .env file in root folder (where this file is)
- Add YOUTUBE_API_KEY=YourApiKeyHere
- Run `python scripts/youtube.py`

## ✨Contributors

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/VeckoTheGecko"><img src="https://avatars.githubusercontent.com/u/36369090?v=4?s=60" width="60px;" alt="Vecko"/><br /><sub><b>Vecko</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=VeckoTheGecko" title="Code">💻</a> <a href="#content-VeckoTheGecko" title="Content">🖋</a> <a href="#ideas-VeckoTheGecko" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-VeckoTheGecko" title="Maintenance">🚧</a> <a href="#projectManagement-VeckoTheGecko" title="Project Management">📆</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://daniellemlbastien.com/"><img src="https://avatars.githubusercontent.com/u/4835191?v=4?s=60" width="60px;" alt="Danielle Bastien"/><br /><sub><b>Danielle Bastien</b></sub></a><br /><a href="#a11y-dmlb" title="Accessibility">️️️️♿️</a> <a href="https://github.com/ClimateTown/knowledge-hub/commits?author=dmlb" title="Code">💻</a> <a href="#maintenance-dmlb" title="Maintenance">🚧</a> <a href="https://github.com/ClimateTown/knowledge-hub/pulls?q=is%3Apr+reviewed-by%3Admlb" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/azebramoomoo"><img src="https://avatars.githubusercontent.com/u/121310825?v=4?s=60" width="60px;" alt="azebramoomoo"/><br /><sub><b>azebramoomoo</b></sub></a><br /><a href="#content-azebramoomoo" title="Content">🖋</a> <a href="#design-azebramoomoo" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Jacobjeevan"><img src="https://avatars.githubusercontent.com/u/40040905?v=4?s=60" width="60px;" alt="Jacob John Jeevan"/><br /><sub><b>Jacob John Jeevan</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=Jacobjeevan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Morzaram"><img src="https://avatars.githubusercontent.com/u/70202379?v=4?s=60" width="60px;" alt="Chris King"/><br /><sub><b>Chris King</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=Morzaram" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JarrodBaniqued"><img src="https://avatars.githubusercontent.com/u/132729879?v=4?s=60" width="60px;" alt="Jarrod Baniqued"/><br /><sub><b>Jarrod Baniqued</b></sub></a><br /><a href="#content-JarrodBaniqued" title="Content">🖋</a> <a href="https://github.com/ClimateTown/knowledge-hub/issues?q=author%3AJarrodBaniqued" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tutterown"><img src="https://avatars.githubusercontent.com/u/1977859?v=4?s=60" width="60px;" alt="Nick Tutterow"/><br /><sub><b>Nick Tutterow</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=tutterown" title="Code">💻</a> <a href="#content-tutterown" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/GBT7"><img src="https://avatars.githubusercontent.com/u/1940589?v=4?s=60" width="60px;" alt="GBT7"/><br /><sub><b>GBT7</b></sub></a><br /><a href="#content-GBT7" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/williamtaggart97"><img src="https://avatars.githubusercontent.com/u/49992113?v=4?s=60" width="60px;" alt="Billy Taggart"/><br /><sub><b>Billy Taggart</b></sub></a><br /><a href="#ideas-williamtaggart97" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Micahg05"><img src="https://avatars.githubusercontent.com/u/28328628?v=4?s=60" width="60px;" alt="Micahg05"/><br /><sub><b>Micahg05</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=Micahg05" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ForrestCinelli"><img src="https://avatars.githubusercontent.com/u/4729019?v=4?s=60" width="60px;" alt="Forrest Cinelli"/><br /><sub><b>Forrest Cinelli</b></sub></a><br /><a href="#content-ForrestCinelli" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/werner33"><img src="https://avatars.githubusercontent.com/u/692461?v=4?s=60" width="60px;" alt="Jordan Manley"/><br /><sub><b>Jordan Manley</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=werner33" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://discord.com/users/165584193093369856"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-square-color-icon.png?s=60" width="60px;" alt="cpufreak101"/><br /><sub><b>cpufreak101</b></sub></a><br /><a href="#design-cpufreak101#9442" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Veeltu"><img src="https://avatars.githubusercontent.com/u/88980422?v=4?s=60" width="60px;" alt="Paweł Andrys"/><br /><sub><b>Paweł Andrys</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=Veeltu" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://hackerone.com"><img src="https://avatars.githubusercontent.com/u/69660071?v=4?s=60" width="60px;" alt="Matthew Caughman"/><br /><sub><b>Matthew Caughman</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/pulls?q=is%3Apr+reviewed-by%3Amacaugh" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Lasercar"><img src="https://avatars.githubusercontent.com/u/64717068?v=4?s=60" width="60px;" alt="LaserCar"/><br /><sub><b>LaserCar</b></sub></a><br /><a href="#content-LaserCar" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/isidro-molina-b20497215/"><img src="https://avatars.githubusercontent.com/u/86175612?v=4?s=60" width="60px;" alt="Isidro Molina"/><br /><sub><b>Isidro Molina</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=imolina212" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/christina-loiacono/"><img src="https://avatars.githubusercontent.com/u/65386414?v=4?s=60" width="60px;" alt="Christina Loiacono"/><br /><sub><b>Christina Loiacono</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=christina-ml" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rivermizell"><img src="https://avatars.githubusercontent.com/u/97765376?v=4?s=60" width="60px;" alt="River Mizell"/><br /><sub><b>River Mizell</b></sub></a><br /><a href="#content-rivermizell" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/monedula"><img src="https://avatars.githubusercontent.com/u/139066628?v=4?s=60" width="60px;" alt="monedula"/><br /><sub><b>monedula</b></sub></a><br /><a href="#content-monedula" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://commitsovercoffee.com"><img src="https://avatars.githubusercontent.com/u/129554482?v=4?s=60" width="60px;" alt="Sourav Singh"/><br /><sub><b>Sourav Singh</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=commitsovercoffee" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Lyrete"><img src="https://avatars.githubusercontent.com/u/34749217?v=4?s=60" width="60px;" alt="Tommi Alajoki"/><br /><sub><b>Tommi Alajoki</b></sub></a><br /><a href="https://github.com/ClimateTown/knowledge-hub/commits?author=Lyrete" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Stephen-at-Pleno"><img src="https://avatars.githubusercontent.com/u/127327471?v=4?s=60" width="60px;" alt="Stephen Tanner"/><br /><sub><b>Stephen Tanner</b></sub></a><br /><a href="#content-Stephen-at-Pleno" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification. Contributions of any kind are, again, welcome!

## Acknowledgements

- [Bootstrap Icons](https://icons.getbootstrap.com/) for icons via [svelte-bootstrap-icons](https://www.npmjs.com/package/svelte-bootstrap-icons)
- [Twemoji](https://twemoji.twitter.com/) for emoji support
