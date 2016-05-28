function largestProduct(digit_string, number) {
  var digits = parseDigits(digit_string),
      largest = 0;

  digits.forEach(function(digit, idx) {
    var product = prod(digits.slice(idx, idx + number));
        largest = product > largest ? product : largest;
    });

  return largest;
}

function prod(numbers) {
  return numbers.reduce(function(prev, current) {
    return +prev * +current;
  });
}

function parseDigits(digit_string) {
  return digit_string.replace(/\D/g, '').split('');
}

self.addEventListener('message', function(e) {
  self.postMessage(largestProduct(e.data.digit_string, e.data.number));
}, false);
