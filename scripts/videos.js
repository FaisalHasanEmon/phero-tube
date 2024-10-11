// 1. fetch, load and display

// Loading Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error("Failed to load data", error));
};
// Loading Videos
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error("Failed to load videos", error));
};

function removeActiveClass() {
  const buttons = document.getElementsByClassName("category-btn");
  for (const button of buttons) {
    button.classList.remove("active");
  }
}

// Load Category
const loadCategoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
      removeActiveClass();
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.error("Failed to load videos", error));
};

// Time
function getTime(value) {
  const hr = parseInt(value / 3600);
  const remaining_second = value % 3600;
  const min = parseInt(remaining_second / 60);
  const sec = remaining_second % 60;

  return `${hr}hr ${min}min ${sec}sec ago`;
}

// Loading Details
const loadDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  // console.log(video);
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img src=${video.thumbnail}/>
  <p>${video.description} </p>
  
  `;
  // Way-1 showing modal
  // document.getElementById("showModalData").click();

  // Way-2 showing modal
  document.getElementById("customModal").showModal();
};
/** 
const demoObj = {
  category_id: "1001",
  video_id: "aaab",
  thumbnail: "https://i.ibb.co/QPNzYVy/moonlight.jpg",
  title: "Midnight Serenade",
  authors: [
    {
      profile_picture: "https://i.ibb.co/fDbPv7h/Noha.jpg",
      profile_name: "Noah Walker",
      verified: false,
    },
  ],
  others: {
    views: "543K",
    posted_date: "",
  },
  description:
    "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night.",
};
*/

// Display Videos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
      <img src="assets/Icon.png" />
      <h2 class="text-center text-xl font-bold">No content here in this category</h2>
    </div>
    `;

    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";

    card.innerHTML = `
        <figure class = "h-[200px] relative">
            <img
            src=${video.thumbnail}
            class = "h-full w-full object-cover"
            alt="Shoes" />

            ${
              video.others.posted_date?.length === 0
                ? ""
                : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTime(
                    video.others.posted_date
                  )}</span>`
            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div><img class ="w-10 h-10 rounded-full object-cover" src=${
              video.authors[0].profile_picture
            } />
            </div>
            <div>
                <h2 class = "font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400">${
                      video.authors[0].profile_name
                    }</p>
                    ${
                      video.authors[0].verified === true
                        ? `<img class = "w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>`
                        : ""
                    }
                </div>
                <p> <button onclick="loadDetails('${
                  video.video_id
                }')" class="btn btn-sm btn-error">Details</button> </p>
            </div>
        </div>
    `;
    videoContainer.append(card);
  });
};

// Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    // console.log(item);
    // Create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    // buttonContainer.innerText = item.category;

    // Add button
    categoryContainer.append(buttonContainer);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});
loadCategories();
loadVideos();
