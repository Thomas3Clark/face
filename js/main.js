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

  if (localStorage.weather) {
    $weatherOn[0].checked = localStorage.weather === 'true';
    $gpsOn[0].checked = localStorage.gps === 'true';
    $city.value = localStorage.manual_city;
    $apiid.value = localStorage.weather_api;
    $tempFormat.value = localStorage.temperature_format;
  }
}

function getAndStoreConfigData() {
  var $weatherOn = $('#weatherOn');
  var $gpsOn = $('#gpsOn');
  var $city = document.getElementById('city');
  var $tempFormat = document.getElementById('tempFormat');
  var $apiid = document.getElementById('apiid');

  var options = {
    weather: $weatherOn[0].checked,
    gps: $gpsOn[0].checked,
    manual_city: $city.value,
    temperature_format: $tempFormat.value,
    weather_api: $apiid.value,
  };

  localStorage.weather = options.weather;
  localStorage.gps = options.gps;
  localStorage.manual_city = options.manual_city;
  localStorage.temperature_format = options.temperature_format;
  localStorage.weather_api = options.weather_api;

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
