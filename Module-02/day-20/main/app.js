const list = document.querySelector("#list");
const refreshBtn = document.querySelector("#refresh");

async function load() {
    list.innerHTML = "Loading…";
    try {
        // TheMealDB API – returns a list of meals (CORS-friendly, no key needed)
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }
        const data = await res.json();
        list.innerHTML = "";
        // data.meals is an array of meal objects; each has a 'strMeal' property
        if (data.meals && data.meals.length > 0) {
            data.meals.slice(0, 10).forEach(meal => {
                const li = document.createElement("li");
                li.textContent = meal.strMeal;
                list.append(li);
            });
        } else {
            list.innerHTML = "No meals found.";
        }
    } catch (err) {
        list.innerHTML = "Could not load data.";
    }
}

refreshBtn.addEventListener("click", load);

load();