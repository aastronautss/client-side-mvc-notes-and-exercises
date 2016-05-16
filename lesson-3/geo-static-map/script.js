$(function() {
  function generateMap(position) {
    var coords = position.coords,
        latitude = coords.latitude,
        longitude = coords.longitude,
        url = 'https://maps.googleapis.com/maps/api/staticmap';

    var params = '?center=' + latitude + ',' + longitude;
    params += '&markers=color:red%7C' + latitude + ',' + longitude;
    params += '&size=500x500';
    params += '&zoom=15'
    params += '&key=AIzaSyDceFjLV2djHlnfTb115_0xtP3q_H5A3Qc';

    $('body').html($('<img />', {
      src: url + params
    }));
  }

  navigator.geolocation.getCurrentPosition(generateMap);
});
