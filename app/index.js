import document from "document";
import { units, locale, preferences } from "user-settings";
import { display } from "display";

import * as util from "../common/utils";
import * as myActivity from "components/activity";
import * as myClock from "components/clock";
import * as myHRM from "components/hrm";
import * as mySettings from "components/device-settings";
import * as myWeather from "components/weather"

/* -------- UI Components --------- */

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
let dateStr = document.getElementById("dateStr");

let weatherConditions = document.getElementById("weatherConditions");
let weatherTemperature = document.getElementById("weatherTemperature");

let txtHRM = document.getElementById("txtHRM");
let iconHRM = document.getElementById("iconHRM");
let imgHRM = iconHRM.getElementById("icon");
let statsCycle = document.getElementById("stats-cycle");
let statsCycleItems = statsCycle.getElementsByClassName("cycle-item");

/* -------- configuration value --------- */

//const GRANULARITY = "seconds";
const GRANULARITY = "seconds";

/* --------- CLOCK ---------- */
const clockCallback = (data) => {
  dateStr.text = data.dateText;
  hourHand.groupTransform.rotate.angle = data.hoursAngle;  
  minHand.groupTransform.rotate.angle = data.minutesAngle;
  secHand.groupTransform.rotate.angle = data.secondsAngle;
};
myClock.initialize(GRANULARITY, clockCallback);

/* ------- WEATHER ---------- */
const weatherCallback = (data) => {
  let temperatureUnit = units.temperature; // temperature unit came from FitBit App settings via user-settings.units
  console.log("Weather in main: " + JSON.stringify(data));
  if(data.is_success === true) {
    const WEATHER_COND_MAX_LENGTH = 12;
    weatherConditions.text  = util.truncateText(data.conditions, WEATHER_COND_MAX_LENGTH);
    weatherTemperature.text = temperatureUnit === "C" ? 
      Math.round(data.temperature) + "°C" :
      Math.round(data.temperature * 9.0 / 5.0 + 32) + "°F";
  }
};
myWeather.initialize(weatherCallback);

/* ------- ACTIVITY --------- */
const activityCallback = (data) => {
  let n = new Date;  
  statsCycleItems.forEach((item, index) => {    
    let img = item.firstChild;
    let txt = img.nextSibling;    
    txt.text = data[Object.keys(data)[index]].pretty;
    // Reposition the activity icon to the left of the variable length text
    img.x = txt.getBBox().x - txt.parent.getBBox().x - img.width - 7;
  });
};
myActivity.initialize(GRANULARITY, activityCallback);

/* -------- HRM ------------- */
const hrmCallback = (data) => {
  txtHRM.text = `${data.bpm}`;
  if (data.zone === "out-of-range") {
    imgHRM.href = "images/heart_open.png";
  } else {
    imgHRM.href = "images/heart_solid.png";
  }
  if (data.bpm !== "--") {
    iconHRM.animate("highlight");
  }
};
myHRM.initialize(hrmCallback);

/* -------- SETTINGS -------- */
const settingsCallback = (data) => {
  if (!data) {
    return;
  }
  console.log("Settings changed callback: " + JSON.stringify(data));

  if(data.alwaysOn === true) {
    display.autoOff = false;
  } else {
    display.autoOff = true;
  }
  
//weatherOn
//activitiyOn
//heartRateOn
//alwaysOn
//healthStatusDefault
};
mySettings.initialize(settingsCallback);
