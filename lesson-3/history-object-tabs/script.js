$(function() {
  $('nav').on('click', 'a', function(e) {
    e.preventDefault();
    var $target = $(e.target),
        id = $target.attr('href');

    switchPage(id);

    history.pushState({ id: id }, $target.text(), location.pathname + id);
  });

  $(window).bind('popstate', function(e) {
    var state = e.originalEvent.state;

    switchPage(state === null ? "#page_1" : state.id);
  });

  if (location.hash) {
    switchPage(location.hash);
  }

  function switchPage(id) {
    $('.active').removeClass('active');
    $('nav a[href="' + id + '"]').addClass('active');
    $('article').hide();
    $(id).show();
  }
});
