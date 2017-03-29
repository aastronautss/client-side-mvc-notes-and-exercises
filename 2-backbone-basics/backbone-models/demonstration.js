var Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts"
});

var post_1 = new Post({ id: 1 });

console.log(post_1.toJSON());
