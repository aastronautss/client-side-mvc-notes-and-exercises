var Post = Backbone.Model.extend({
  url: 'http://jsonplaceholder.typicode.com/posts',
  initialize: function() {
    if (!this.get("id")) {
      this.set("id", this.collection.nextID());
    }
  }
});
var Posts = Backbone.Collection.extend({
  model: Post,
  url: 'http://jsonplaceholder.typicode.com/posts',
  last_id: 0,
  setLastID: function() {
    if (this.isEmpty()) { return; }
    this.last_id = this.last().get('id');
  },
  nextID: function() {
    return ++this.last_id;
  },
  initialize: function() {
    this.on('sync', this.setLastID);
  }
});

var User = Backbone.Model.extend({});
var Users = Backbone.Collection.extend({
  model: User,
});

var blog_roll = new Posts(),
    blog_authors = new Users();

blog_authors.reset(users_data);
blog_roll.fetch({
  reset: true,
  success: function(collection) {
    console.log(collection.toJSON());
  }
});
