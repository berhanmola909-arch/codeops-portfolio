// 1. App State
let state = {
  dishes: [],
  cart: []
};

// 2. DOM Elements
const menuSection = document.getElementById("menu");
const cartSection = document.getElementById("cart");
const searchInput = document.getElementById("search");
const checkoutForm = document.getElementById("checkout");
const formError = document.getElementById("form-error");
const orderSuccess = document.getElementById("order-success");

// 3. LocalStorage Functions (save & load)
function save() {
  localStorage.setItem("addiseats_cart", JSON.stringify(state.cart));
}

function load() {
  const savedCart = localStorage.getItem("addiseats_cart");
  if (savedCart) {
    state.cart = JSON.parse(savedCart);
  }
}

// 4. Fetch Data from data.json
async function loadMenuData() {
  menuSection.innerHTML = "<p>Loading dishes...</p>";
  try {
    const response = await fetch("data/menu.json");
    if (!response.ok) {
      throw new Error("Could not fetch menu.json");
    }
    state.dishes = await response.json();
    displayMenu(state.dishes);
  } catch (error) {
    menuSection.innerHTML = "<p class='error'>Error loading menu. Please try again.</p>";
    console.error(error);
  }
}

// 5. Render Menu Items
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

// Helper: Calculate Total Price
function cartTotal() {
  return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// 6. Render Cart Items and Total
function displayCart() {
  cartSection.innerHTML = "<h2>Your Order</h2>";

  if (state.cart.length === 0) {
    cartSection.innerHTML += "<p>Your cart is empty.</p>";
    return;
  }

  const cartList = document.createElement("ul");

  state.cart.forEach(item => {
    const itemTotal = item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} (${item.price} ETB) x ${item.quantity} = ${itemTotal} ETB</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartList.appendChild(li);
  });

  cartSection.appendChild(cartList);

  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerHTML = `<p>Total: <strong>${cartTotal()} ETB</strong></p>`;
  cartSection.appendChild(totalDiv);
}

// 7. Add Dish to Cart
function addToCart(dishId) {
  const dishToAdd = state.dishes.find(item => item.id === dishId);
  const existingItem = state.cart.find(item => item.id === dishId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...dishToAdd, quantity: 1 });
  }

  save();
  displayCart();
  
  // Clear success message if user adds new item
  orderSuccess.textContent = "";
}

// 8. Remove Dish from Cart
function removeFromCart(dishId) {
  const existingItem = state.cart.find(item => item.id === dishId);

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
  } else {
    state.cart = state.cart.filter(item => item.id !== dishId);
  }

  save();
  displayCart();
}

// 9. Simple Validation
function validate(name, phone) {
  const phoneRegex = /^(?:\+251|0)9\d{8}$/;

  if (state.cart.length === 0) {
    return "Your cart is empty.";
  }
  if (name.trim() === "") {
    return "Please enter your name.";
  }
  if (!phoneRegex.test(phone)) {
    return "Enter a valid Ethiopian phone number (09xxxxxxxx).";
  }
  return "";
}

// 10. Place Order (Submit)
checkoutForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const area = document.getElementById("area").value;

  const errorMsg = validate(name, phone);

  if (errorMsg !== "") {
    formError.textContent = errorMsg;
    orderSuccess.textContent = "";
    return;
  }

  // Clear error message
  formError.textContent = "";

  // Order object
  const order = {
    name: name,
    phone: phone,
    area: area,
    items: state.cart,
    total: cartTotal()
  };

  console.log("Order placed:", order);

  // Show success text message instead of alert
  orderSuccess.textContent = "Order placed successfully!";

  // Reset cart and form
  state.cart = [];
  save();
  displayCart();
  checkoutForm.reset();
});

// 11. Search Functionality
searchInput.addEventListener("input", function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredDishes = state.dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm)
  );
  displayMenu(filteredDishes);
});

// Initialize App
load();
loadMenuData();
displayCart();