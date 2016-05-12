var Post = Backbone.Model.extend({});
var Posts = Backbone.Collection.extend({
  model: Post
});

var User = Backbone.Model.extend({});
var Users = Backbone.Collection.extend({
  model: User
});

var blog_roll = new Posts(),
    blog_authors = new Users();

blog_authors.reset(users_data);
