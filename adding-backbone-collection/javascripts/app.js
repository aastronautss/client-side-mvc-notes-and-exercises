var App = {
  $body: $('tbody'),
  template: Handlebars.compile($('#items').html()),

  removeItem: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data('id');
    this.grocery_list.remove(id);
  },

  bind: function() {
    this.$body.on('click', 'a', this.removeItem.bind(this));
  },

  init: function() {
    this.grocery_list = new Items(items_json);
    this.grocery_list.render();
    this.bind();
  }
}

var Item = Backbone.Model.extend({
  idAttribute: 'id',

  initialize: function() {
    if (!this.get('id')) {
      this.set('id', this.collection.nextID());
    }
  }
});
var Items = Backbone.Collection.extend({
  model: Item,
  last_id: 0,

  setLastID: function() {
    if (this.isEmpty()) { return; }
    this.last_id = this.last().get('id');
  },

  nextID: function() {
    return ++this.last_id;
  },

  render: function() {
    App.$body.html(App.template({ items: this.models }));
  },

  initialize: function() {
    this.on('change reset add remove sort', this.render, this);
    this.render();
  }
});

Handlebars.registerPartial('item', $('#item').html());

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
  var attrs = getFormObject($(e.target));

  App.grocery_list.add(attrs);

  e.target.reset();
});

$('thead').on('click', 'th', function(e) {
  e.preventDefault();
  App.grocery_list.comparator = $(e.currentTarget).data('prop');
  App.grocery_list.sort();
});

$('main > p > a').on('click', function(e) {
  e.preventDefault();
  App.grocery_list.reset();
});

App.init();

/*

$('tbody').on('click', 'a', function(e) {
  e.preventDefault();
  var $target = $(e.target),
      id = +$target.data('id'),
      model = _.find(collection, function(item) {
        return item.get('id') === id;
      });

  collection = _.without(collection, model);
  render();
}); */
