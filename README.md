# MemePop

A Stream Deck plugin that fetches and displays a random meme on your Elgato Stream Deck.  
Click the button to get a fresh meme from [My website](https://memetrigger.nathanaeldousa.com), opening a web page with the meme on a custom PHP-powered site.

---

## Features

- Fetches random memes from a public API
- Updates the Stream Deck button icon with a meme preview
- Downloads and opens memes locally on your computer
- Simple, lightweight, and fun!

---

## Setup & Installation

### 1. Download the pre-built plugin

You can download the latest `.streamdeckplugin` file from the [releases page](https://github.com/yourusername/memetrigger/releases) or directly from the repository root.

### 2. Install the plugin

- Double-click the `.streamdeckplugin` file.  
- Confirm the prompt in the Stream Deck software.  
- You'll get a notification saying *Stream Deck plugin successfully installed*.  
- Drag and drop the plugin action onto any button tile.  
- Have fun!

### 3. (Optional) Customize or develop the plugin

If you want to customize or develop the plugin further:

```bash
git clone https://github.com/NathanaelDousa/memePop.git
cd memePop
npm install -g @elgato/cli@latest
npm run watch
