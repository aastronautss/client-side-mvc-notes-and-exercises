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

var post_2 = new Post({ id: 2 });

post_2.fetch({
  success: function(model) {
    model.setUser();
  }
});

// 7.

post_2.on("change:userId", function() {
  this.setUser();
});

// 8.

Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",

  initialize: function() {
    this.on("change:userId", this.setUser);
  },

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

var post_3 = new Post({ id: 3 });
post_3.fetch();

// 9.

var post_4 = new Post({
  id: 4,
  title: "Lorem ipsum",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a sodales ipsum. Donec imperdiet feugiat turpis eu posuere. Suspendisse euismod arcu mi, sed sodales felis hendrerit id. Morbi viverra turpis varius luctus fringilla. Duis dapibus orci ut erat mollis, nec gravida ligula posuere. Nulla euismod pulvinar dictum. Phasellus vestibulum ut augue commodo venenatis. Nulla a ultricies erat, a semper lectus. Vivamus quis fringilla orci, ac pulvinar purus. Suspendisse consectetur nisi ultrices arcu blandit venenatis quis et justo. Phasellus dapibus egestas rhoncus. Donec dapibus mi eu velit tempor consequat. Aenean molestie eros vel felis aliquam, sit amet venenatis mi rutrum. Praesent viverra augue sed justo volutpat dignissim. Pellentesque et viverra felis, eget fringilla est. Morbi pretium mollis nulla, nec sollicitudin ex aliquet quis.",
  userId: 2
});

console.log(post_4.get("user")); // undefined

// 10.

Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",

  initialize: function() {
    this.has("userId") && this.setUser();
    this.on("change:userId", this.setUser);
  },

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

var post_5 = new Post({
  id: 5,
  title: "Post Five",
  body: "This is the fifth post.",
  userId: 3
});

// 11.

var template = $("#post").html();

function renderPost(model) {
  var $template = $(template),
      title = model.get('title'),
      user = model.get('user'),
      body = model.get('body'),
      byline;

  $template.find('h1').text(title);
  $template.find('header p').text('By ' + (user && user.get('name')));
  $template.find('header + p').text(body);

  $('body').html($template);
}

// 12.

Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",

  setUser: function() {
    var self = this,
        user = new User({ id: self.get("userId") });

    user.fetch({
      success: function(model) {
        self.set("user", model);
        console.log(self.toJSON());
      }
    });
  },

  initialize: function() {
    this.has("userId") && this.setUser();
    this.on("change:userId", this.setUser);
    this.on("change", renderPost);
  }
});

var post_6 = new Post({ id: 6 });
renderPost(post_6);
post_6.fetch();
