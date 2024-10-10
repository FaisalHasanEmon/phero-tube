// 1. fetch, load and display

// Loading Data
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error("Failed to load data"));
};

const displayCategories = (data) => {
  console.log(data);
};

loadCategories();
