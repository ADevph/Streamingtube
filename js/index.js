const handleBtn = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  const categories = data.data;
  const Container = document.getElementById("button-container");
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category.category;
    button.className = "btn hover:bg-[#FF1F3D] ";

    button.innerHTML = `                 
      <a onclick="handleCards('${category.category_id}')" class="tab">${category.category}</a>
       `;
    Container.appendChild(button);
  });

  const sortBtn = document.getElementById("sort-btn");
  sortBtn.addEventListener("click", () => {
    currentCategoryData.sort(
      (a, b) =>
        parseInt(b.others.views.replace("K", "")) -
        parseInt(a.others.views.replace("K", ""))
    );
    displayCards(currentCategoryData);
  });


  function secondsToHrMin(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}hr ${minutes}min`;
}


};


//card display

async function handleCards(categoryId) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const CardData = data.data;
  currentCategoryData = CardData;
  displayCards(CardData);
}


function displayCards(CardData) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  //  Drawing section

  if (CardData.length === 0) {
    cardContainer.innerHTML = "";
    const centerDiv = document.createElement("div");
    centerDiv.className =
      "flex flex-col items-center justify-center text-center h-96 w-screen mx-auto";
    const image = document.createElement("img");
    image.src = " img/f.png ";
    image.className = "";

    const paragraph = document.createElement("p");
    paragraph.textContent = `Oops!! Sorry, There is no 
    content here`;
    paragraph.className = "text-3xl text-[#171717] text-center ";
    centerDiv.appendChild(image);
    centerDiv.appendChild(paragraph);
    cardContainer.appendChild(centerDiv);
  }


  CardData.forEach((data) => {
    const timeHrMin = secondsToHrMin(data.posted_date); // Convert posted_date to hr:min


    const card = document.createElement("div");

    card.className = "card flex flex-col h-96 w-84 ";
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = `${data.thumbnail}`;
    
    img.className = "object-cover h-48 w-full mt-4 rounded-lg";
    imgDiv.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body flex-grow flex flex-col";

    cardBody.innerHTML = `
  <div class="flex gap-2">
    <img src="${data.authors[0].profile_picture}" class="w-10 h-10 rounded-full">
    <h2 class="card-title  ">${data.title}</h2>
  </div>

  <div class="flex ml-10">
    <span class="">${data.authors[0].profile_name}</span>
    ${
      data.authors[0].verified
        ? '<img src="img/v.png" class="ml-2 mt-1 w-4 h-4" alt="Verified Badge">'
        : ""
    }
  </div>
  <div class="text-sm ml-10  text-gray-500">${data.others.views} views 
  </div>
`;

    card.appendChild(imgDiv);
    card.appendChild(cardBody);

    cardContainer.appendChild(card);
  });
}

handleBtn().then(() => {
  handleCards("1000");
});
