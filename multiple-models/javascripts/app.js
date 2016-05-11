var collection = [],
    templates = {};

var Item = Backbone.Model.extend();

items_json.forEach(function(item) {
  item.id = collection.length + 1;
  collection.push(new Item(item));
});

$('[type="text/x-handlebars"]').each(function() {
  var $template = $(this);
  templates[$template.attr('id')] = Handlebars.compile($template.html());
});

Handlebars.registerPartial('item', $('#item').html());

function render() {
  $('tbody').html(templates.items({ items: collection }));
}

function getFormObject($f) {
  var data = $f.serializeArray(),
      o = {};

  data.forEach(function(item) {
    o[item.name] = item.value;
  });

  return o;
}

$('form').on('submit', function(e) {
  e.preventDefault();
  var new_item = new Item(getFormObject($(e.target)));

  new_item.set('id', collection.length + 1);

  collection.push(new_item);
  $('tbody').append(templates.item(new_item.toJSON()));

  e.target.reset();
});

$('thead').on('click', 'th', function(e) {
  e.preventDefault();
  var $th = $(e.target),
      iteratee = $th.data('prop');

  collection = _.sortBy(collection, function(model) {
    return model.get(iteratee);
  });
  render();
});

$('tbody').on('click', 'a', function(e) {
  e.preventDefault();
  var $target = $(e.target),
      id = +$target.data('id'),
      model = _.find(collection, function(item) {
        return item.get('id') === id;
      });

  collection = _.without(collection, model);
  render();
});

$('main > p > a').on('click', function(e) {
  e.preventDefault();
  collection = [];
  $('tbody').empty();
});

render();
