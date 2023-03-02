// fetch data from API
const loadAIs = async () => {
  try {
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(URL);
    const data = await res.json();
    showAIs(data.data.tools);
  } catch (error) {
    console.log(error);
  }
};

// display fetched data
const showAIs = (AIs) => {
    
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  AIs.forEach((AI) => {
    const { id, name, description, image, published_in, features } = AI;
    cardsContainer.innerHTML += `
    <div class="col">
        <div class="card h-100 p-3">
        <img src="${image}" class="card-img-top rounded" alt="..." height="220"/>
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <div class="card-text">
                1. ${features[0]}<br>
                2. ${features[1]}<br>
                3. ${features[2]}
            </div>
        </div>
        <div class="card-footer bg-body mt-3 d-flex justify-content-between align-items-center">
            <div>
                <h5 class="my-2">${name}</h5>
                <p><i class="fa-solid fa-calendar-days"></i> ${published_in}</p>
            </div>
            <div>
                <i class="fa-solid fa-circle-arrow-right fs-2"></i>
            </div>
        </div>
        </div>
    </div>`;
  });

  //   stop spinner
  toggleClass('spinner', false);
};

// toggleClass
const toggleClass = (id, condition) => {
  const element = document.getElementById(id);
  if (condition) {
    element.classList.remove("d-none");
  } else {
    element.classList.add("d-none");
  }
};

loadAIs();
