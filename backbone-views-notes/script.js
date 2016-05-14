var fruit_template = Handlebars.compile("<div>{{name}}</div>");

var Fruit = Backbone.Model.extend({});
var Fruits = Backbone.Collection.extend({});
var FruitList = Backbone.View.extend({
  tagName: 'main',
  attributes: {
    id: 'fruit'
  },
  template: fruit_template,

  events: {
    'click a.add': 'addToCart'
  },

  addToCart: function(e) {
    e.preventDefault();

    // Add item to cart.
  }

  render: function() {
    this.$el.html(this.template({
      fruits: this.collection.toJSON();
    }));
  },

  initialize: function() {
    this.listenTo(this.collection, 'change', this.render);
    this.render();
  }
});

var fruit_view = new FruitList({ collection: Fruits });
