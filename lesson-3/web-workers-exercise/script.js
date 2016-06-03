var worker = new Worker('/worker.js');

$(function() {
  var $form = $('form');

  function displayAnswer(answer) {
    $('#answer span').text(answer);
  }

  $form.on('submit', function(e) {
    e.preventDefault();
    var data = {};
    data.digit_string = $('textarea').val(),
    data.number = +$('[type=number]').val();

    worker.postMessage(data);
  });

  worker.addEventListener('message', function(e) {
    displayAnswer(e.data);
  }, false);
});
