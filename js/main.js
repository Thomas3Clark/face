(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $weatherOn = $('#weatherOn');
  var $gpsOn = $('#gpsOn');
  var $city = document.getElementById('city');
  var $tempFormat = document.getElementById('tempFormat');
  var $apiid = document.getElementById('apiid');
  var $emblem = document.getElementById('emblem');
  var $themeColor = document.getElementById('themeColor');
  var $contrastOn = $('#contrastOn');

  if (localStorage.weather) {
    $weatherOn[0].checked = window.localStorage.weather === 'true';
    $gpsOn[0].checked = window.localStorage.gps === 'true';
    $city.value = window.localStorage.manual_city;
    $apiid.value = window.localStorage.weather_api;
    $tempFormat.value = window.localStorage.temperature_format;
    $emblem.value = window.localStorage.emblem;
    $themeColor.value = window.localStorage.themeColor;
    $contrastOn[0].checked = window.localStorage.contrastOn === 'true';
  }
}

function getAndStoreConfigData() {
  var $weatherOn = $('#weatherOn');
  var $gpsOn = $('#gpsOn');
  var $city = document.getElementById('city');
  var $tempFormat = document.getElementById('tempFormat');
  var $apiid = document.getElementById('apiid');
  var $emblem = document.getElementById('emblem');
  var $themeColor = document.getElementById('themeColor');
  var $contrastOn = $('#contrastOn');

  var options = {
    weather: $weatherOn[0].checked,
    gps: $gpsOn[0].checked,
    manual_city: $city.value,
    temperature_format: $tempFormat.value,
    weather_api: $apiid.value,
    emblem: $emblem.value,
    themeColor: $themeColor.value,
    contrastOn: $contrastOn[0].checked,
  };

  window.localStorage.weather = options.weather;
  window.localStorage.gps = options.gps;
  window.localStorage.manual_city = options.manual_city;
  window.localStorage.temperature_format = options.temperature_format;
  window.localStorage.weather_api = options.weather_api;
  window.localStorage.themeColor = options.themeColor;
  window.localStorage.emblem = options.emblem;
  window.localStorage.contrastOn = options.contrastOn;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
