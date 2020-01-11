# SnippetDepot - An online snippet repository 

This git contains code for a proof of concept extension to VS Code that enables real-time retrieving of code snippets from an online repository. It also acts as for portal for the online snippet repository project. The project combines the principles of Google Instant Search, StackOverflow and Wikipedia into one service. The online repository can be found [here](https://snippetdepot.com/repo/). Please check out our [Wiki](https://github.com/mrconter1/SnippetDepot/wiki) were you can find information on how to add snippets and other information about this project.

![Demo](example.gif)
*Typical use-case of SnippetDepot were a function is suggested in real-time and fetched into the project.*

## Features

* [Plugin](https://github.com/mrconter1/SnippetDepot/wiki/Plugins#existing-plugin)
  * Support for fetching Python3 snippets
  * Support for extending to other languages
* [Repository](https://snippetdepot.com/repo/)
  * Adding, searching and viewing Snippets
  * Communication with an [API](https://github.com/mrconter1/SnippetDepot/wiki/API)

# Navigation

* Official [Website](https://snippetdepot.com/)
* Submit and browse existing snippets on our [Repository](https://snippetdepot.com/repo/)
* Request features and view the roadmap on [Trello](https://trello.com/b/spUrRLGW/snippetdepot)
* Discuss the project on our [Subreddit](https://www.reddit.com/r/SnippetDepot/)
* Installation [Guide](#getting-started)
* Find more information on our [Wiki](https://github.com/mrconter1/SnippetDepot/wiki)

# Detailed Description

A lot of time during development goes into searching after small pieces of code. This can be a search after things as easy as removing the last character from a string to removing each file in a folder that has a filename starting on the letter 'a'. The usual practice of finding a solution to a problem consists of searching on Google, finding a suitable solution from StackOverflow and making it work with the code. The problem with this approach is that this procedure has to be done all over again each time a new developer encounters the problem. One of the primary goals of this project is to remove this repetition. If the community could work together in a fashion similar to StackOverflow and Wikipedia it would be possible to create reliable instant search and retrieve functionalities for different IDEs. 

This extension works together with the online snippet [repository](https://snippetdepot.com/repo/) and has two key functionalities. One is the search feature which gives suggestions of snippets which it predicts is needed and the second functionality fetches a chosen snippet. The fetched code is then put in a separate dependency file.

## Getting Started

**Windows**

1. [Download](https://github.com/mrconter1/SnippetDepot/archive/master.zip) the plugin as a zip.
2. Navigate to `C:\Users\your-username\.vscode\extensions\` in the file explorer
2. Create a folder named `snippets` and extract the **contents** of `SnippetDepot-master` found in the zip file into the folder.
3. Open VS Code and enable the functionality by pressing Ctrl+Shift+P and searching for 'Enable Snippets'

**Linux**

1. Navigate to `/home/your-username/.vscode/extensions/` in the terminal
2. Create a folder and enter the folder with: `mkdir snippets && cd snippets`
3. Download snippet code by executing: `git init && git pull https://github.com/mrconter1/SnippetDepot/`
4. Open VS Code and enable the functionality by pressing Ctrl+Shift+P and searching for 'Enable Snippets'

**Note that the snippet functionality is currently only supporting Python files.*

## Release Notes

### 0.1.0

The initial release of a Snippets extension for VS Code. It contains functionality to show the proof of concept for an online snippet repository.

***

For further questions feel free to [contact](https://github.com/mrconter1/SnippetDepot/wiki/contact) us.
