var scrabble_key = {
  // 1 Point
  a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, r: 1, s: 1, t: 1,
  // 2 Points
  d: 2, g: 2,
  // 3 Points
  b: 3, c: 3, m: 3, p: 3,
  // 4 Points
  f: 4, h: 4, v: 4, w: 4, y: 4,
  // 5 Points
  k: 5,
  // 8 Points
  j: 8, x: 8,
  // 10 Points
  q: 10, z: 10
};

function Scrabble(str) {
  if (!str) { return 0; }
  var score = 0;

  letters = str.toLowerCase().split('');
  letters.forEach(function(letter) {
    score += scrabble_key[letter];
  });

  return score;
}
