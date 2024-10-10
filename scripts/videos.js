// 1. fetch, load and display

// Loading Data
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error("Failed to load data", error));
};

// category : "Music"
// category_id : "1001"
// [[Prototype]] : Object

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);
    // Create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // Add button
    categoryContainer.append(button);
  });
};

loadCategories();
