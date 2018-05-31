/*
  Responsible for loading, applying and saving settings.
  Requires companion/simple/companion-settings.js
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import { me as device } from "device";
import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings, onsettingschange;

export function initialize(callback) {
  settings = loadSettings();
  console.log("Settings initialized: " + settings)
  onsettingschange = callback;
  onsettingschange(settings);
}

// Received message containing settings data
messaging.peerSocket.addEventListener("message", function(evt) {
  // console.log("Settings Message: " + JSON.stringify(evt.data));
  if(evt.data.key) {
    settings[evt.data.key] = evt.data.value;       
    onsettingschange(settings);
  }  
})

// Register for the unload event
me.addEventListener("unload", saveSettings);

// Load settings from filesystem
function loadSettings() {
  try {
    let s = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    return s ? s : {};
  } catch (ex) {
    console.log("Error while loading settings from fs: " + ex);
    return {};
  }
}

// Save settings to the filesystem
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
