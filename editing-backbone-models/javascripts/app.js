var Product = Backbone.Model.extend({
  initialize: function() {
    var self = this,
        date = new Date(self.get('date'));

    self.set({
      datetime: date.toISOString(),
      date_formatted: date.toUTCString()
    });
  }
}),
    templates = {};

$("[type='text/x-handlebars']").each(function() {
  var $template = $(this);
  templates[$template.attr('id')] = Handlebars.compile($template.html());
});


function render() {
  $('fieldset').html(templates.form(display_product.toJSON()));
  $('article').html(templates.product(display_product.toJSON()));
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
  var $f = $(e.target),
      old_json = display_product.toJSON(),
      new_json = getFormObject($f);

  new_json.date = (new Date()).valueOf();
  display_product = new Product(_.extend(old_json, new_json));
  render();
});

var display_product = new Product(product_json);

render();
