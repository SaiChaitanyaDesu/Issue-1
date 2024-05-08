// scripts.js
const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const AlphabetBtn = document.getElementById("AlphabetBtn");
const NumberBtn = document.getElementById("NumberBtn");

//Types
async function fetchTypes(url) {
  // let url = "https://pokeapi.co/api/v2/pokemon/5/"
  let types = [];
  let imgUrl;
  let options = {
    method: "GET",
  };
  await fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      let fetchedTypes = jsonData.types;
      imgUrl = jsonData.sprites.front_default;
      for (let i = 0; i < fetchedTypes.length; i++) {
        types.push(fetchedTypes[i].type.name);
      }
    });

  let typesStr = "";
  for (let i = 0; i < types.length; i++) {
    typesStr = typesStr + " " + types[i];
  }
  return { typesStr, imgUrl };
}

//Display
function displayPokemons(pokemons) {
  pokemonContainer.innerHTML = "";
  pokemons.forEach(async (pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    let Num = pokemon.url.split("/")[6];
    await fetchTypes(pokemon.url).then((doc) => {
      card.innerHTML = `
      <div class="pokemon-info">
        <img src="${doc?.imgUrl}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>Number: ${Num}</p>
        <p>Types: ${doc.typesStr}</p>
      </div>
    `;
      pokemonContainer.appendChild(card);
    });
  });
}

//Initial Fetching
let fetchedPokemons;
let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";
let options = {
  method: "GET",
};
fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    fetchedPokemons = jsonData.results;
    displayPokemons(fetchedPokemons);
  });

// search pokemon
function searchPokemons(text) {
  function checkName(pokemon) {
    return text === pokemon.name;
  }
  let searchResults = fetchedPokemons.filter(checkName);
  displayPokemons(searchResults);
}

// Event listeners
//search
searchBtn.addEventListener("click", () => {
  const searchText = searchInput.value.toLowerCase();
  searchPokemons(searchText);
});

//Sort by alphabet
AlphabetBtn.addEventListener("click", async () => {
  const alphabet = fetchedPokemons.sort((a, b) => a.name.localeCompare(b.name));
  pokemonContainer.innerHTML = "";
  console.log(alphabet);
  for (let i = 0; i < alphabet.length; i++) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    let Num = alphabet[i].url.split("/")[6];
    await fetchTypes(alphabet[i].url).then((doc) => {
      card.innerHTML = `
      <div class="pokemon-info">
        <img src="${doc?.imgUrl}" alt="${alphabet[i].name}">
        <h2>${alphabet[i].name}</h2>
        <p>Number: ${Num}</p>
        <p>Types: ${doc.typesStr}</p>
      </div>
    `;
      pokemonContainer.appendChild(card);
    });
  }
});

//Sort by number
NumberBtn.addEventListener("click", async () => {
  const num = fetchedPokemons.sort((a, b) => {
    let num1 = parseInt(a.url.split("/")[6]);
    let num2 = parseInt(b.url.split("/")[6]);
    return num1 - num2;
  });
  pokemonContainer.innerHTML = "";
  console.log(num);
  for (let i = 0; i < num.length; i++) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    let Num = num[i].url.split("/")[6];
    await fetchTypes(num[i].url).then((doc) => {
      card.innerHTML = `
      <div class="pokemon-info">
        <img src="${doc?.imgUrl}" alt="${num[i].name}">
        <h2>${num[i].name}</h2>
        <p>Number: ${Num}</p>
        <p>Types: ${doc.typesStr}</p>
      </div>
    `;
      pokemonContainer.appendChild(card);
    });
  }
});
