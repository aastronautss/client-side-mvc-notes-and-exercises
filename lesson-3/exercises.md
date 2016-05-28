# course 260, Lesson 3: Advanced Browser-based Javascript

## Window Object Methods

### 1.

```javascript
window.location.reload();
```

### 2.

```javascript
window.location = 'http://www.google.com'
```

### 3.

```javascript
window.history.back();
```

### 4.

```javascript
window.location.search.match(/%3A(.+)$/)[1];
```

### 5.

```javascript
screen_height = window.screen.height;
screen_width = window.screen.width;

window_height = document.body.clientHeight;
window_width = document.body.clientWidth;

missing_area = screen_height * screen_width - window_height * window_width;
```

### 6.

```javascript
window.location = 'http://alistapart.com/';
window.scrollTo(0, document.body.scrollHeight);
```

### 7.

```javascript
function addParams(params) {
  var search = "?"

  for (var prop in params) {
    search = search + prop + "=" + window.encodeURIComponent(params[prop]) + "&";
  }

  search = search.replace(/&$/, '');

  window.location.search = search;
}
```
## Regular Expressions

### 1.

```javascript
"123, easy as 123".replace(/\d{3}/, "ABC");
```

### 2.

```javascript
function startsUppercase(str) {
  return /^A-Z/.test(str);
}
```
### 3.

```javascript
function strip(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/g, '');
}
```

### 4.

```javascript
"$ plus $$ equals $$$".match(/\$/g).length;
```

### 5.

```javascript
var passing_sentence = "The characters that specify repetition always follow the pattern to which they are being applied.";
var failing_sentence = "I am the 1337est";

function hasTheBestWords(str) {
  return /[A-Za-z]{3, 5}/.test(str);
}

hasTheBestWords(passing_sentence); // true
hasTheBestWords(failing_sentence); // false
```

### 6.

```javascript
var query = "Hen";
var source = "She'll be coming 'round the mountain when she comes";

(new RegExp(query, "i")).test(source); // true
```

### 7.

```javascript
var ary = "H%*e(ll)o".match(/\w/g);
console.log(ary.join(''));
```

### 8.

```javascript
var regex = /(['"])\w+\1/;
```

### 9.

```javascript
var validTel(str) {
  return /^\(\d{3}\) \d{3}-?\d{4}$/.test(str);
}
```

### 10.

```javascript
var regex = /\d*-?\(\d{3}\) \d{3}-?\d{4}x?\d*/
```
