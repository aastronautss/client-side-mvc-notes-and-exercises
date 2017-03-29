var App = {
  init: function() {
    this.grocery_list = new Items(items_json);
    this.grocery_list_view = new ItemsView({ collection: this.grocery_list });
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

  initialize: function() {
    this.on('change reset add remove sort', this.render, this);
  }
});
var ItemsView = Backbone.View.extend({
  el: $('tbody').get(0),
  template: Handlebars.compile($('#items').html()),

  events: {
    'click a': 'removeItem'
  },

  removeItem: function(e) {
    e.preventDefault();
    var id = +$(e.currentTarget).data('id');
    this.collection.remove(id);
  },
  render: function() {
    this.$el.html(this.template({ items: this.collection.models }));
  },
  initialize: function() {
    this.listenTo(this.collection, 'change reset add remove sort', this.render);
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
