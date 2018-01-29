function* fakeGenerate(runes, count) {
  let i = 0;
  while (true) {
    yield runes[i++];
  }
}

function fakeRandome(runes) {
  var rnd = fakeGenerate(runes, runes.linght);
  return function () {
    return rnd.next().value
  }
}

module.export = fakeRandome

// var randome = fakeRandome([5,4,3,2,1])
