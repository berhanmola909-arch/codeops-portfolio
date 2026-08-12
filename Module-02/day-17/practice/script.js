// question 1

function vat(amount, rate = 0.15) {
  return amount * rate;
}

const vatArrow = (amount, rate = 0.15) => amount * rate;


// question 2

function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());

/*
Explanation:
count stays private because it is declared with let inside the makeCounter function scope.
Outside code has no access to the inner function scope. The returned inner function forms a closure 
that maintains access to count, making it the only way to read or modify the variable.
*/


// question 3

function discountBy(rate) {
  return function(price) {
    return price * (1 - rate);
  };
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log(memberPrice(1000));
console.log(salePrice(1000));


// question 4

function applyToAll(list, fn) {
  const result = [];
  for (const item of list) {
    result.push(fn(item));
  }
  return result;
}

const prices = [100, 200, 300];
const pricesWithVat = applyToAll(prices, price => price * 1.15);
console.log(pricesWithVat);


// question 5

const cities = ["Addis Ababa", "Hawassa", "Dire Dawa", "Gondar"];

cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});