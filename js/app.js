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
  console.log(AIs);
};

loadAIs();
