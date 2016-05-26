var workers = {
  brightness: new Worker('javascripts/brightness.js'),
  saturation: new Worker('javascripts/saturation.js'),
  invert: new Worker('javascripts/invert.js'),
  flip_horizontal: new Worker('javascripts/flip_horizontal.js'),
  flip_vertical: new Worker('javascripts/flip_vertical.js')
};

$(window).on('load', function() {
  var canvas = $('canvas').get(0),
      img = $('img').remove().get(0),
      ctx = canvas.getContext('2d'),
      last_data;

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  last_data = getData(ctx);

  for (var prop in workers) {
    workers[prop].addEventListener('message', function(message) {
      putData(ctx, message.data.image_data);
    });
  }

  $('#tools').on('click', 'a', function(e) {
    e.preventDefault();
    var data = { image_data: getData(ctx) },
        worker = workers[$(e.target).data('method')];

    worker.postMessage(data);
    worker.addEventListener('message', function(message) {
      last_data = message.data.image_data;
      worker.removeEventListener('message', message);
    });
  });

  $('input[type=range]').on('input', function(e) {
    var $e = $(this);

    $e.next('span').text($e.val() + '%');
    workers[$e.attr('name')].postMessage({
      image_data: last_data,
      param: $e.val()
    });
  });

  function getData(ctx) {
    return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function putData(ctx, image_data) {
    ctx.putImageData(image_data, 0, 0);
  }
});
