import Weather from "../../common/weather/weather";
import * as messaging from "messaging";

let weather, onweatherupdated;

export function initialize(callback) {
  weather = new Weather();
  onweatherupdated = callback;
  onweatherupdated(weather);
//  settings = loadSettings();
//  onsettingschange = callback;
//  onsettingschange(settings);
}

messaging.peerSocket.addEventListener("open", function(evt) {    
  weather.fetch();
})

messaging.peerSocket.addEventListener("message", function(evt) {   
  console.log("Weather in weather onmessage: " + JSON.stringify(evt.data));
  weather.update(evt.data);
  onweatherupdated(weather);
})
