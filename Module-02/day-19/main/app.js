// Single source of truth to store list items
let items = [];

// Select DOM elements
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

// Render function to draw items on the screen
function render() {
  // Clear the list first
  list.innerHTML = "";

  // Loop through the items array and create list items
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.dataset.id = item.id;

    // Add done class if item is completed
    if (item.done) {
      li.classList.add("done");
    }

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "del";

    li.append(deleteBtn);
    list.append(li);
  });

  // Update item count display
  count.textContent = items.length + " items";
}

// Handle adding new item from form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = nameInput.value.trim();
  if (text === "") return;

  // Add new item object to array
  items.push({
    id: Date.now(),
    name: text,
    done: false
  });

  // Reset input field and update display
  nameInput.value = "";
  render();
});

// Event delegation for list clicks (toggle done or remove)
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  // If remove button was clicked
  if (e.target.matches(".del")) {
    items = items.filter((item) => item.id !== id);
  } else {
    // Toggle completed status
    const item = items.find((item) => item.id === id);
    if (item) {
      item.done = !item.done;
    }
  }

  render();
});