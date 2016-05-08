// 1.

var Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts"
});

// 2.

var my_post = new Post({
  id: 1
});

console.log(my_post.toJSON());
