import { VAT, addVat } from "./money.js";

// question 1

const etbPrices = [200, 500, 800, 1200];

const grandTotal = etbPrices
  .map(price => price * (1 + VAT))
  .filter(price => price < 1000)
  .reduce((sum, price) => sum + price, 0);

console.log(grandTotal);


// question 2

const customer = {
  name: "Almaz Bekele",
  city: "Addis Ababa",
  balance: 1500
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}


// question 3

const { name, city } = customer;

function greet({ name }) {
  return `Selam ${name}`;
}

console.log(greet(customer));


// question 4

const updatedCustomer = {
  ...customer,
  city: "Bahir Dar",
  phone: "0911234567"
};

console.log(customer);
console.log(updatedCustomer);


// question 5

console.log(`VAT Rate: ${VAT}`);
console.log(`Price with VAT: ${addVat(1000)}`);