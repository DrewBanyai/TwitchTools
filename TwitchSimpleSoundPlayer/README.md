# TwitchSimpleSoundPlayer (TSSP)
A dead-simple Javascript project to play local sound files when chat commands trigger them in Twitch

To use:
- Drop this folder onto your desktop or another local folder on your computer
- Drop any number of MP3 sound files into the "Sounds" folder, ensuring they have no spaces in the filenames
- Double-click "CompileSounds.bat" which will auto-generate a Sounds.js file from the list of files in your Sounds folder
  - Any time you add or remove sounds in that folder, double-click "CompileSounds.bat" to regenerate your sounds list in Sounds.js
- Edit "Settings.js" to add the CHANNEL, USERNAME, and TOKEN values (token can be generated at https://twitchapps.com/tmi/)
- Open the index.htm file in a browser by double-clicking it, or by adding it to OBS as a browser source (if in a browser, click once on the page after it loads)
  - If you add it as a browser source in OBS, you can just make it invisible and you won't have to worry about it, it'll load with OBS
- In the chat of the selected channel, use the sound command: ['!' plus the file name, minus '.mp3'] ... i.e. to play bruh.mp3, use '!bruh'
- Enjoy, and please let me know if you experience any bugs or have any suggestions.

Notes:
- If you have the window open in a browser (not as a browser source in OBS) you can go to the toggle screen and change whether sounds are enabled, whether they have delays or restrictions, and what their relative volume is. These settings will be saved in your browser's local cache and loaded again automatically. This currently can only be done in a browser, not through OBS.
