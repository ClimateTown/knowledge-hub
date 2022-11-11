# ClimateTown Wiki
> (still WIP⚠)

![Build workflow](https://github.com/ClimateTown/wiki/actions/workflows/build.yml/badge.svg)

Welcome to the ClimateTown Wiki! This is "behind the scenes" of the [wiki website](https://climatetown.github.io/wiki) where all the information for the site is stored. Want to make changes to the site? Just propose changes here! There are many ways that you can contribute to the development of the site, whether it be writing content, or helping with coding. Check out the contributing section below for more info!

# Contributing
There are a variety of different ways you can contribute. This can be anything from making a suggestion, fixing a typo, all the way to curating a post or helping with website development. The following sections go through how you can make different contributions. All contributions will require you having a GitHub account.

## Small edits/typos
Every page on the website has an "Edit this page" button. Clicking this will direct you to the exact file in the repo where the content is stored, so you have make the appropriate change to the page. Super easy!

## Suggestions
Have an idea for the wiki? Maybe its a topic you'd like to see on the wiki, or a website feature. Make your suggestion by [creating an issue](https://github.com/ClimateTown/wiki/issues/new/choose), and following the steps provided there. The issue will act as a space for the topic to be discussed.

## Make your own post
Want to make your own post? Great! Before launching on your writing spree, we recommend to first create an issue for the post. This allows us to discuss the addition to make sure its a good fit for the wiki (and so others can also get involved if they want to!).

Posts are written in markdown ([learn to write Markdown](https://www.markdownguide.org/getting-started/)) in the `content` folder of the repo. Feel free to copy one of the existing posts to act as a starting point.

If you're confident with Git, you can create a pull request once the post is written. If you're new to GitHub, you can use the issue you created to collaborate with a technical person to get your post added to the site.

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

---
If you just want to chat about the wiki, you can do so in the `#wiki` channel in the ClimateTown Discord server.

