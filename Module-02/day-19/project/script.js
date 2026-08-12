// script.js

// Select DOM elements
let addForm = document.getElementById("addForm");
let itemName = document.getElementById("itemName");
let itemPrice = document.getElementById("itemPrice");
let marketList = document.getElementById("marketList");
let totalPrice = document.getElementById("totalPrice");

// Function to update the running ETB total
function updateTotal() {
  let allPrices = marketList.querySelectorAll(".price");
  let sum = 0;

  for (let i = 0; i < allPrices.length; i++) {
    sum += Number(allPrices[i].textContent);
  }

  totalPrice.textContent = sum;
}

// 1. Add item on form submit
addForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop page reload

  let nameValue = itemName.value.trim();
  let priceValue = itemPrice.value.trim();

  // Simple validation: make sure both fields are filled
  if (nameValue === "" || priceValue === "") {
    return;
  }

  // Create row item <li>
  let li = document.createElement("li");

  // Add text content and price
  li.innerHTML = nameValue + " - <span class='price'>" + priceValue + "</span> ETB <button class='delBtn'>Delete</button>";

  // Append to the list
  marketList.appendChild(li);

  // Update total ETB and reset form
  updateTotal();
  addForm.reset();
});

// 2. Event delegation on the parent <ul> for toggle bought and delete
marketList.addEventListener("click", function (event) {
  // If delete button is clicked
  if (event.target.classList.contains("delBtn")) {
    let liToRemove = event.target.parentElement;
    liToRemove.remove();
    updateTotal(); // recalculate total after delete
  } 
  // If the list row itself is clicked, toggle bought class
  else if (event.target.tagName === "LI") {
    event.target.classList.toggle("bought");
  }
});