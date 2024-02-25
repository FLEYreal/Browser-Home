# Browser-Home
It is not a regular website in terms of a web-application. This is a website 
for your home page in the browser that you set up on your PC yourself.
Currently the browser-home supports only Windows. Support for Linux / MacOS
might be added sooner. I provided instructions to how to install it on your
pc below but first you need to know why? That's why I provided a list of
general productivity features in the app you might want to have.

## Features
Features Browser-Home supports already!

- Search in multiple at the same time.
    - Google
    - DuckDuckGo
    - Bing
    - YouTube
    - Yandex

- Bult-In Integrations
    - Currency Converter
    - Color Picker for HEX / RGB

- Shelves & Items
    - Add colorful "shelves" where you can put "items", 
    which work just like bookmarks in the browser.

- Keybinds
    - Support of keybinds for most used features.

- Themes
    - Currently supports 7 themes (all of them're dark)

- Hints
    - You don't need to suffer to understand some main features, 
    we have hints in the header to help you use Browser-Home

## Developing Features
Features Browser-Home will support sooner!

- Bar Toggle
    - It'll be not just search bar, it'll also support built-in
    translator and chatGPT

- In-Search
    - Allows you to search right inside the browser-home

- Type hints
    - All the search engines support type hints, when you type something
    google helps you understand what to type, so will we!

- Custom Theming
    - Limited themes aren't that good, when you can choose colors yourself!

- Background images
    - You'll be able to add background images and choose background color.
    It'll support svg, png, jpg and even gifs.

- Social AI
    - I'll develop social AI that can copy your behaviour and answer questions
    in your social media just like you would. Browser-Home will support integration
    with it, you'll be able to turn it off, see the messages he sent and delete them.

## Instruction to setup
And here we go, setup isn't this hard, just follow these steps:

1. Install 
    - <a href="https://www.python.org/downloads/">Python</a>
    - <a href="https://nodejs.org/en/download/current">Node.JS</a>
    - <a href="https://git-scm.com/downloads">Git</a>
    - <a href="https://www.postgresql.org/download/">PostgreSQL</a>
2. Clone repository using console command
```
git clone https://github.com/FLEYreal/Browser-Home.git
```
2. Create a user and database in PostgreSQL.
3. Provide user's login, password and database name in ".env" file.
4. Launch file init.py inside the project's folder with command to initialize project:
```
python init.py
```
5. And finally, just double click "startup.bat" file and you're done!

The project will startup each time you're starting pc, no need
to worry about launching startup.bar over and over!

By default it'll launch on URL: http://localhost:81. To make it your
home page, you need to go to settings in your browser and provide this url.
To make it open in the new tab, install the extension for your browser:

- Firefox: <a href="https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/">Click!</a>
- Chrome: <a href="https://chromewebstore.google.com/detail/new-tab-override/fjcmlondipcnnpmbcollgifldmajfonf?hl=en-GB">Click!</a>
