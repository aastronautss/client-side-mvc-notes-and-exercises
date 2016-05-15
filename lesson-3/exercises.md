# Exercises: Window Object Methods

## 1.

```javascript
window.location.reload();
```

## 2.

```javascript
window.location = 'http://www.google.com'
```

## 3.

```javascript
window.history.back();
```

## 4.

```javascript
window.location.search.match(/%3A(.+)$/)[1];
```

## 5.

```javascript
screen_height = window.screen.height;
screen_width = window.screen.width;

window_height = document.body.clientHeight;
window_width = document.body.clientWidth;

missing_area = screen_height * screen_width - window_height * window_width;
```

## 6.

```javascript
window.location = 'http://alistapart.com/';
window.scrollTo(0, document.body.scrollHeight);
```

## 7.

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
