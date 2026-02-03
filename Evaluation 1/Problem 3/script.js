// Problem 3

function once(fn) {
  let greet = false;
  return function(...a) {
    if (!greet) {
      greet = true;
      return fn.apply(this, a);}};
}

function greet() {
  console.log("Hello");
}

const greetOnce=once(greet);

greetOnce(); // Hello
greetOnce(); // no output
greetOnce(); // no output