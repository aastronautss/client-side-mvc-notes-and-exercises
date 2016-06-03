var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

module.exports = function(app) {
  function setActiveNavTo(title) {
    var active_item = _(app.locals.links).findWhere({ active: true });
    if (active_item) { active_item.active = false; }
    _(app.locals.links).findWhere({ title: title }).active = true;
  }

  router.get('/', function(req, res, next) {
    var products = fs.readFileSync(path.resolve(path.dirname(__dirname), 'public/products.json'), 'utf8');
    var title = 'Web Store'

    setActiveNavTo(title);

    res.render('index', {
      products: JSON.parse(products),
      title: title
    });
  });



  return router;
};
