// 1.

var User = Backbone.Model.extend({
  url: "http://jsonplaceholder.typicode.com/users"
});
var Users = Backbone.Collection.extend({
  model: User,
  url: "http://jsonplaceholder.typicode.com/users"
});

// 2.

var user_collection = new Users();
user_collection.fetch({
  success: function() {
    console.log(user_collection.toJSON());
  }
});

// 3.

var my_user = new User({
  name: "Jon Doe",
  email: "jon@doe.com"
});
user_collection.add(my_user);
my_user.save(null,  {
  success: function() {
    console.log(user_collection.toJSON());
    console.log(my_user.toJSON());
  }
});

// 4.

var my_other_user = new User({
  name: "Jane Doe",
  email: "jane@doe.com"
});
user_collection.create(my_other_user, {
  success: function() {
    console.log(user_collection.toJSON());
  }
});

user_collection.create({ name: "Bob Doe", email: "bob@doe.com" }, {
  success: function(model) {
    console.log(model.toJSON());
  }
});

// 5.

user_collection.fetch({
  reset: true,
  success: function() {
    console.log(user_collection.toJSON());
  }
});

// 6

user_collection.set({
  id: 1,
  name: "Molly Doe",
  email: "molly@doe.com"
});

console.log(user_collection.first().toJSON());

// 7.

var users_template = Handlebars.compile($("#users").html());

function renderCollection() {
  $('body').html(users_template({ users: this.toJSON() }));
}

var Users = Backbone.Collection.extend({
  model: User,
  url: "http://jsonplaceholder.typicode.com/users",
  initialize: function() {
    this.on('sync', renderCollection);
  }
});

// 8.

var Users = Backbone.Collection.extend({
  model: User,
  url: "http://jsonplaceholder.typicode.com/users",
  initialize: function() {
    this.on('sync sort', renderCollection);
  }
});

user_collection.fetch({
  success: function() {
    user_collection.comparator = 'name';
    user_collection.sort();
  }
});

// 9.

var emails = user_collection.pluck('email');
console.log(emails);

// 10.

var Users = Backbone.Collection.extend({
  url: "http://jsonplaceholder.typicode.com/users",
  model: User,
  parse: function(response) {
    response.forEach(function(user) {
      user.company_name = user.company.name;
      user.catchPhrase = user.company.catchPhrase;
      user.company_bs = user.company.bs;
      delete user.company;
    });
    return response;
  },
  initialize: function() {
    this.on('sync sort', renderCollection);
  }
});
