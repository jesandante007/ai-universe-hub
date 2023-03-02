// fetch data from API
const loadAIs = async (dataLimit) => {
  try {
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(URL);
    const data = await res.json();
    showAIs(data.data.tools, dataLimit);
  } catch (error) {
    console.log(error);
  }
};

// display fetched data
const showAIs = (AIs, dataLimit) => {
  if (AIs.length > 6 && dataLimit) {
    AIs = AIs.slice(0, 6);
    toggleClass("see-more", true);
  } else {
    toggleClass("see-more", false);
  }
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
                <i class="fa-solid fa-circle-arrow-right fs-2" onclick="loadAIDetails('${id}')" data-bs-toggle="modal" data-bs-target="#AIModal"></i>
            </div>
        </div>
        </div>
    </div>`;
  });

  //   stop spinner
  toggleClass("spinner", false);
};

// see-more button event listener show all data
document.getElementById("see-more").addEventListener("click", function () {
  loadAIs(false);
});

// toggleClass
const toggleClass = (id, condition) => {
  const element = document.getElementById(id);
  if (condition) {
    element.classList.remove("d-none");
  } else {
    element.classList.add("d-none");
  }
};

// loadAI fetch data
const loadAIDetails = async (id) => {
  try {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(URL);
    const data = await res.json();
    showAIDetails(data.data);
  } catch (error) {
    console.log(error);
  }
};

// showAI's fetched data
const showAIDetails = (AI) => {
  const {
    description,
    image_link,
    features,
    integrations,
    pricing,
    accuracy,
    input_output_examples,
  } = AI;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  modalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4 my-5">
        <div class="col">
        <div class="card h-100 border-danger-subtle bg-danger-subtle">
            <div class="card-body">
            <p class="fs-4">${description}</p>
            <div class="row gap-3 mx-2 my-3">
                <p class="col px-4 py-2 rounded bg-white text-success fw-bold w-25 text-center"> ${
                  pricing[0].price ? pricing[0].price : "Free Of Cost"
                } <br> ${pricing[0].plan}</p>
                <p class="col px-4 py-2 rounded bg-white text-warning fw-bold w-25 text-center">${
                  pricing[1].price ? pricing[1].price : "Free Of Cost"
                } <br> ${pricing[1].plan}</p>
                <p class="col px-4 py-2 rounded bg-white text-danger fw-bold w-25 text-center">${
                  pricing[2].price ? pricing[2].price : "Free Of Cost"
                } <br> ${pricing[2].plan}</p>
            </div>
            <div class="d-flex">
                <div class="w-50">
                    <h5>Features</h5>
                    <ul>
                        <li>${features["1"].feature_name}</li>
                        <li>${features["2"].feature_name}</li>
                        <li>${features["3"].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h5>Integrations</h5>
                    <ul>
                        <li>${
                          integrations[0] ? integrations[0] : "No data Found"
                        }</li>
                        <li>${
                          integrations[1] ? integrations[1] : "No data Found"
                        }</li>
                        <li>${
                          integrations[2] ? integrations[2] : "No data Found"
                        }</li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div class="col">
        <div class="card h-100 p-2">
            <img src="${
              image_link[0]
            }" class="card-img-top rounded" alt="..." height="300" />
            <div class="card-body">
            <h5 class="card-title text-center">${
              input_output_examples[0].input
                ? input_output_examples[0].input
                : "Can you give any example?"
            }</h5>
            <p class="card-text text-center">${
              input_output_examples[0].output
                ? input_output_examples[0].output
                : "No! Not Yet! Take a break!!!"
            }</p>
            </div>
        </div>
        </div>
    </div>`;
};

loadAIs(true);
