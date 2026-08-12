// script.js

// Question 1: Change text and toggle class
let title = document.getElementById("title");
if (title) {
  title.textContent = "Selam, Addis!";
  title.classList.toggle("active");
}

// Question 2: Loop array and add li elements to ul
let cities = ["Addis Ababa", "Hawassa", "Gonder"];
let cityList = document.getElementById("cityList");
if (cityList) {
  for (let i = 0; i < cities.length; i++) {
    let newLi = document.createElement("li");
    newLi.textContent = cities[i];
    cityList.appendChild(newLi);
  }
}

// Question 3: Click button and see event bubbling
let myBtn = document.getElementById("myBtn");
let myDiv = document.getElementById("myDiv");

if (myBtn) {
  myBtn.addEventListener("click", function (event) {
    console.log("Button clicked! Target:", event.target);
  });
}

if (myDiv) {
  myDiv.addEventListener("click", function () {
    console.log("Div heard the click too (bubbling)!");
  });
}

// Question 4: Delete item using delegation
let itemList = document.getElementById("itemList");
if (itemList) {
  itemList.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
      let liToRemove = event.target.parentElement;
      if (liToRemove) {
        liToRemove.remove();
      }
    }
  });
}

// Question 5: Simple form add to list
let taskForm = document.getElementById("taskForm");
let userInput = document.getElementById("userInput");
let todoList = document.getElementById("todoList");

if (taskForm && userInput && todoList) {
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page refresh

    let text = userInput.value.trim();
    if (text !== "") {
      let taskLi = document.createElement("li");
      taskLi.textContent = text;
      todoList.appendChild(taskLi);
      userInput.value = ""; // clear input field
    }
  });
}