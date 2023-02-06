
<p align="center">
<a href="https://climatetown.github.io/knowledge-hub">
<img width="200" src="static/images/knowledge-hub-logo.png">
</a>
</p>

[![YouTube subs](https://img.shields.io/youtube/channel/subscribers/UCuVLG9pThvBABcYCm7pkNkA?label=ClimateTown&style=for-the-badge)](https://www.youtube.com/@ClimateTown)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/ClimateTown)

![Build workflow](https://img.shields.io/github/actions/workflow/status/ClimateTown/knowledge-hub/build.yml?branch=main&label=website%20build)

⚠⚠This hub is still a WIP and not released.⚠⚠

---

The "behind the scenes" of the [ClimateTown Knowledge Hub](https://climatetown.github.io/knowledge-hub), your "one stop shop" for important climate resources in the fight against climate change!

## Contributing
> TLDR; [Create an issue](https://github.com/ClimateTown/knowledge-hub/issues/new/choose), or edit the content directly and make a pull request.

All contributions welcome! Everything from:
- suggestions
- fixing typos
- writing content
- helping with website development
- discussing content on the hub (check out the channels on Discord for this!)
  
The following sections go through how you can make different contributions. These will require you having a GitHub account.

For any discussion or questions about the Knowledge Hub, join us in `#💬knowledge-hub-discussion` in the ClimateTown Discord.

### Small edits/typos
Resources data (title, URL, description, tags) are stored in the `data/resources.yml` file, which is then used to populate the resource on the website. To make small edits, you can [directly edit this file](https://github.com/ClimateTown/knowledge-hub/edit/main/data/resources.yml) or you can create an issue.

To suggest changes anywhere else in the site, you can use GitHub's search functionality to find the exact file which to suggest the change.

### Resource suggestions
We're always looking to publicise awesome climate resources. Got a resource to share? The easiest way is to create an issue, filling out the "resource suggestion" form. This will create a discussion around the resource, and if it's a good fit for the Knowledge Hub, we'll add it to the site.

### Site suggestions
This website is powered by coders from the community. Have a suggestion to make the site better? Create an issue and we'll discuss it! If the feature sounds good, we'll look at adding it to the site. The feature is much more likely to be added if you are willing to help with the development.


## Development installation
The site is built using [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/). A dev environment can be easily set up using Node and npm:

- [install Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
- `git clone https://github.com/ClimateTown/knowledge-hub.git`
- `cd` into the cloned directory
- `npm install`
- `npm run dev`

### OPTIONAL: Python
Some of the tools in the codebase (eg. YouTube API, JSON schema validation) use Python. For most changes to the site Python is not required.

To set up Python:
- install Python from [here](https://www.python.org/downloads/) if you haven't already (minimum version 3.7)
- create a virtual environment, then activate it (optional, but recommended)
  - `python -m venv venv`
  - activate the environment using either:
    - `source venv/bin/activate` (Linux/MacOS)
    - `venv\Scripts\activate.bat` (Windows)
- `pip install -r requirements.txt`

This codebase uses [`pip-tools`](https://pypi.org/project/pip-tools/) to manage dependencies. If you add a new dependency, you can add it to `requirements.in` and run `pip-compile` to update `requirements.txt`. To update your environment run `pip-sync`.

## Acknowledgements
- [Twemoji](https://twemoji.twitter.com/) for emoji support