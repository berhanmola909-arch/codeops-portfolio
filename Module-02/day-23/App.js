// 1. App State
let state = {
  dishes: [],
  cart: []
};

// 2. DOM Elements
const menuSection = document.getElementById("menu");
const cartSection = document.getElementById("cart");
const searchInput = document.getElementById("search");

// 3. Fetch Data from data.json
async function loadMenuData() {
  menuSection.innerHTML = "<p>Loading dishes...</p>";
  try {
    const response = await fetch("menu.json");
    if (!response.ok) {
      throw new Error("Could not fetch data.json");
    }
    state.dishes = await response.json();
    displayMenu(state.dishes);
  } catch (error) {
    menuSection.innerHTML = "<p>Error loading menu. Please try again.</p>";
    console.error(error);
  }
}

// 4. Render Menu Items
function displayMenu(items) {
  menuSection.innerHTML = "";

  if (items.length === 0) {
    menuSection.innerHTML = "<p>No dishes found.</p>";
    return;
  }

  items.forEach(dish => {
    const dishDiv = document.createElement("div");
    dishDiv.className = "dish";

   

    dishDiv.innerHTML = `
      <h3>${dish.name}</h3>
      <p class="price">${dish.price} ETB</p>
      <button onclick="addToCart(${dish.id})">Add to Order</button>
    `;


    menuSection.appendChild(dishDiv);
  });
}

// 5. Render Cart Items and Total
function displayCart() {
  cartSection.innerHTML = "<h2>Your Order</h2>";


  if (state.cart.length === 0) {
    cartSection.innerHTML += "<p>Your cart is empty.</p>";
     return;
   
  }

  let total = 0;
  const cartList = document.createElement("ul");
  cartList.style.listStyle = "none";
  cartList.style.padding = "0";

  state.cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    

    const li = document.createElement("li");
    li.style.marginBottom = "10px";
    li.innerHTML = `
      <span>${item.name} (${item.price} ETB) x ${item.quantity} = ${itemTotal} ETB</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartList.appendChild(li);
  });


  cartSection.appendChild(cartList);

  const totalDiv = document.createElement("div");
  totalDiv.style.marginTop = "15px";
  totalDiv.style.fontWeight = "bold";
  totalDiv.innerHTML = `<p>Total: ${total} ETB</p>`;
  cartSection.appendChild(totalDiv);
}

// 6. Add Dish to Cart
function addToCart(dishId) {
  const dishToAdd = state.dishes.find(item => item.id === dishId);
  const existingItem = state.cart.find(item => item.id === dishId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...dishToAdd, quantity: 1 });
  }

  displayCart();
}

// 7. Remove Dish from Cart
function removeFromCart(dishId) {
  const existingItem = state.cart.find(item => item.id === dishId);

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
  } else {
    state.cart = state.cart.filter(item => item.id !== dishId);
  }

  displayCart();
}

// 8. Search Functionality
searchInput.addEventListener("input", function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredDishes = state.dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm)
  );
  displayMenu(filteredDishes);
});

// Initialize App
loadMenuData();
displayCart();