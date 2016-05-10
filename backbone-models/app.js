// 1.

var Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts"
});

// 2.

var my_post = new Post({
  id: 1
});

console.log(my_post.toJSON());

// 3.

function logModel(model) {
  console.log(model.toJSON());
}

my_post.fetch({
  success: logModel
});

// 4.

var User = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users"
});

var my_user = new User({
  id: my_post.get("userId")
});

my_user.fetch({
  success: logModel
});

// 5.

my_post.set("user", my_user);
logModel(my_post);

// 6.

Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",
  setUser: function() {
    var self = this,
        user = new User({ id: self.get("userId") });

    user.fetch({
      success: function(model) {
        self.set("user", model);
        logModel(self);
      }
    });
  }
});
