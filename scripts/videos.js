// 1. fetch, load and display

// Loading Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error("Failed to load data", error));
};
// Loading Videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error("Failed to load videos", error));
};

// Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    // console.log(item);
    // Create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // Add button
    categoryContainer.append(button);
  });
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
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class = "h-[200px] relative">
            <img
            src=${video.thumbnail}
            class = "h-full w-full object-cover"
            alt="Shoes" />
            <span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${
              video.others.posted_date
            }</span>
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div><img class ="w-10 h-10 rounded-full object-cover" src=${
              video.authors[0].profile_picture
            } /></div>
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
            </div>
        </div>
    `;
    videoContainer.append(card);
  });
};

loadCategories();
loadVideos();
