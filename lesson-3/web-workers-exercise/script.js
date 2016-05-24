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

$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var digit_string = $('textarea').val(),
        number = +$('[type=number]').val();

    $('#answer span').text(largestProduct(digit_string, number));
  });
});
