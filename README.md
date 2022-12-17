# ClimateTown Knowledge Hub 


[![YouTube subs](https://img.shields.io/youtube/channel/subscribers/UCuVLG9pThvBABcYCm7pkNkA?label=ClimateTown&style=for-the-badge)](https://www.youtube.com/@ClimateTown)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/ClimateTown)

![Build workflow](https://img.shields.io/github/actions/workflow/status/ClimateTown/wiki/build.yml?branch=main&label=website%20build)

The "behind the scenes" of the [ClimateTown Knowledge Hub](https://climatetown.github.io/wiki) (your "one stop shop" for important climate resources in the fight against climate change!).

## Contributing
All contributions welcome! Everything from:
- suggestions
- fixing typos
- writing content
- helping with website development
- discussing content on the hub (check out the channels on Discord for this!)
  
The following sections go through how you can make different contributions. These will require you having a GitHub account. If you have any questions about contributing, feel free to ask in the Discord.

### Small edits/typos
Every page on the website has an "Edit this page" button. Clicking this will direct you to the exact file in the repo where the content is stored, so you have make the appropriate change to the page. Super easy!

### Suggestions
Have an idea for the wiki? Maybe its a topic you'd like to see on the wiki, or a website feature. Make your suggestion by [creating an issue](https://github.com/ClimateTown/wiki/issues/new/choose), and following the steps provided there. The issue will act as a space for the topic to be discussed.

### Make your own post
Want to make your own post? Great! Before launching on your writing spree, we recommend to first create an issue for the post. This allows us to discuss the addition to make sure its a good fit for the Knowledge Hub (and so others can also get involved if they want to!).

Posts are written in markdown ([learn to write Markdown](https://www.markdownguide.org/getting-started/)) in the `content` folder of the repo. Feel free to copy one of the existing posts to act as a starting point. The website theme used for the knowledge hub also has additional features such as highlighted note blocks (read the [documentation](https://learn.netlify.app/en/)).

If you're confident with Git, you can create a pull request once the post is written. If you're new to GitHub, you can use the issue you created to collaborate with a technical person to get your post added to the Hub.

## Development
**Assuming you know Git/GitHub**  
Discussion regarding development is done in the issues. Here you're welcome to comment on existing issues and assign them to yourself, or create new issues if you have ideas on how the wiki can be changed.

### Installation and setup
The wiki is built on [Hugo](https://gohugo.io/) using the [Hugo Learn Theme](https://github.com/matcornic/hugo-theme-learn).

First, [install Hugo](https://gohugo.io/getting-started/installing/). Then clone this repo (or a fork of it) with the `--recurse-submodules` flag to ensure the theme is also downloaded:
```sh
git clone --recurse-submodules https://github.com/ClimateTown/wiki.git
```
cd into this folder, and run:
```
hugo server -w
```
Now you have a server running on `localhost:1313` that will automatically update when you make changes to the files! Note that if you make changes to css or the `config.toml` file, you'll need to restart the server.

Read up on how Hugo works in the [documentation](https://gohugo.io/documentation/). The directory structure of the repo follows a [standard project directory structure](https://gohugo.io/getting-started/directory-structure/)


## Acknowledgements
- [Hugo](https://gohugo.io/) for the static site generator
- [Hugo Learn Theme](https://github.com/matcornic/hugo-theme-learn)
- [Twemoji](https://twemoji.twitter.com/) for emoji support
  
