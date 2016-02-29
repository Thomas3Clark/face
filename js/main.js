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
  var $tempFormat = document.getElementById('tempFormat');

  if (localStorage.weather) {
    $weatherOn[0].checked = localStorage.weather === 'true';
    $tempFormat.value = localStorage.temperature_format;
  }
}

function getAndStoreConfigData() {
  var $weatherOn = $('#weatherOn');
  var $tempFormat = document.getElementById('tempFormat');

  var options = {
    weather: $weatherOn[0].checked,
    temperature_format: $tempFormat.value,
  };

  localStorage.weather = options.weather;
  localStorage.temperature_format = options.temperature_format;

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
