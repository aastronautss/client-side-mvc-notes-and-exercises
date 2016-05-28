var templates = {};
var Item = Backbone.Model.extend({
  idAttribute: 'id'
});
var Items = {
  collection: [],
  $body: $('tbody'),

  create: function(item_data) {
    var item = new Item(item_data);

    this.setID.call(this, item);
    this.collection.push(item);

    return item;
  },

  remove: function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget),
        id = +$target.data('id'),
        model = _(this.collection).findWhere({ id: id });

    this.collection = _(this.collection).without(model);
    this.render();
  },

  empty: function() {
    this.collection = [];
    this.$body.empty();
  },

  sortBy: function(prop) {
    this.collection = _(this.collection).sortBy(function(model) {
      return model.attributes[prop];
    });
    this.render();
  },

  render: function() {
    Items.$body.html(templates.items({
      items: this.collection
    }));
  },

  setID: function(model) {
    model.set('id', this.collection.length + 1);
  },

  seedCollection: function() {
    items_json.forEach(this.create.bind(this));
  },

  bind: function() {
    this.$body.on('click', 'a', this.remove.bind(this));
  },

  init: function() {
    this.seedCollection();
    this.render();
    this.bind();
  }
};

$('[type="text/x-handlebars"]').each(function() {
  var $template = $(this);
  templates[$template.attr('id')] = Handlebars.compile($template.html());
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
  var attrs = getFormObject($(e.target)),
      model = Items.create(attrs);
  $('tbody').append(templates.item(model.toJSON()));

  e.target.reset();
});

$('thead').on('click', 'th', function(e) {
  e.preventDefault();
  var prop = $(e.currentTarget).data('prop');
  Items.sortBy(prop);
});

$('main > p > a').on('click', function(e) {
  e.preventDefault();
  Items.empty();
});

Items.init();

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
