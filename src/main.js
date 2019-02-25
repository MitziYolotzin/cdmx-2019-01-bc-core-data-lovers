

const pokemons = document.getElementById('pokemons');
const searchCoincidence = document.getElementById('search-coincidences');

// ARRAY BUTTONS
const buttonsCollection = document.getElementsByClassName("typesPokemon");
const buttonsArray = Array.from(buttonsCollection);

//STATS
let maxCandy = document.getElementById('max-candy');
let minCandy = document.getElementById('min-candy');
let avgCandy = document.getElementById('avg-candy');

let maxSpawn = document.getElementById('max-spawn');
let minSpawn = document.getElementById('min-spawn');
let avgSpawn = document.getElementById('avg-spawn');

let maxAverage = document.getElementById('max-avg');
let minAverage = document.getElementById('min-avg');
let avgAverage = document.getElementById('avg-avg');

//BUTTTONS actions for order data
const orderRadio = document.getElementsByName("order");
const arrayRadio = Array.from(orderRadio);
let dataParse = JSON.parse(localStorage.dataPoke);

//Obtains the location of the page
let ubication = location.href;

//MENU
let menu = document.querySelector('#menu');
let drawer = document.querySelector('nav');
let outMenu = document.querySelector('nav');

//JSON Data Dynamic 
//let dataPokemon =[];


//Show data
const printPokemon = (pokemon) => {
  let namePokemon = `<div class="divPokemon">
    <div class="flip-card-inner">
      <div class="flip-card-front"><h5># ${pokemon.id}</h5><img id="${pokemon.id}" src="${pokemon.img}"><p>${pokemon.name}</p>
        <span class="color-type">${pokemon.type}</span>
      </div>
      <div class="flip-card-back">
      <h4>${pokemon.name}</h4>
      <table id="details">
        <tr>
          <th>Height</th><td>${pokemon.height}</td>
        </tr>
        <tr>
          <th>Weight</th><td>${pokemon.weight}</td>
        </tr>
        <tr>
          <th>Candy</th><td class="break-words">${pokemon.candy}</td>
        </tr>
        <tr>
          <th>Egg</th><td class="break-words">${pokemon.egg}</td>
        </tr>
      </table>
      </div>
    </div>
  </div>`;
  pokemons.insertAdjacentHTML("beforeend", namePokemon);
};

//Show List Data
const showList = (pokemonList) => {
  pokemons.innerHTML = "";
  pokemonList.forEach(element => {
    printPokemon(element);
  });
};


//JSON Data Dynamic
const dataDynamic = () => {
fetch ('./data/pokemon/pokemon.json')

.then (response => response.json())

.then(dataPoke => {
 
localStorage.dataPoke = JSON.stringify(dataPoke.pokemon);

});

};


//Pokémon type function according to clicking on the button that the user selects
const getTypePokemon = (arrayButtons) => {

  arrayButtons.map(boton => {
    boton.addEventListener("click", (event) => {
      //console.log(event.target.name);
      //console.log(window.filterByType(event.target.name));
      //Invoke a function that paints Pokemon
      showList(window.data.filterByType(JSON.parse(localStorage.dataPoke), event.target.name));
    })
  })
}


//Filter coincidence gets the matches letter by letter
const filterCoincidence = () => {
  searchCoincidence.addEventListener('keyup', () => {
    let searchValue = document.getElementById('search-coincidences').value;
    showList(window.data.filterByLetter(JSON.parse(localStorage.dataPoke), searchValue));
  });
}


//Buttons actions for order data
const getOrderPokemon = (optionsRadio) => {
  optionsRadio.map(radio => {
    radio.addEventListener("click", () => {
      if (radio.checked === true) {
        let idRadio = radio.id.split('-');
      
        showList(window.data.sortData(dataParse, idRadio[1], idRadio[0]));
      }
    });
  });
}

//Stats
const computeStatsView = () => {
  const resultCandy = window.data.computeStats(JSON.parse(localStorage.dataPoke), 'candy_count');
  maxCandy.innerHTML = resultCandy.maximum;
  minCandy.innerHTML = resultCandy.minimum;
  avgCandy.innerHTML = resultCandy.average;
  
  const resultSpawn = window.data.computeStats(JSON.parse(localStorage.dataPoke), 'spawn_chance');
  maxSpawn.innerHTML = resultSpawn.maximum;
  minSpawn.innerHTML = resultSpawn.minimum;
  avgSpawn.innerHTML = resultSpawn.average;

  const resultAvg = window.data.computeStats(JSON.parse(localStorage.dataPoke), 'avg_spawns');
  maxAverage.innerHTML = resultAvg.maximum;
  minAverage.innerHTML = resultAvg.minimum;
  avgAverage.innerHTML = resultAvg.average;

  //Stats googlecharts
  let google = window.google;
  google.charts.load('current', {
    'packages': ['bar']
  });

  const drawChartCandy = () => {
    let data = google.visualization.arrayToDataTable([
      ['feature', 'maximum', 'average', 'minimum'],
      ['Candy count', resultCandy.maximum, resultCandy.average, resultCandy.minimum]
    ]);

    let options = {
      chart: {
        title: 'Candy Count',
        subtitle: '151 pokemons',
      }
    };

    let chart = new google.charts.Bar(document.getElementById('chart-candy'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  };

  const drawChartSpawn = () => {
    let data = google.visualization.arrayToDataTable([
      ['feature', 'maximum', 'average', 'minimum'],
      ['Spawn Chance', resultSpawn.maximum, resultSpawn.average, resultSpawn.minimum]
    ]);

    let options = {
      chart: {
        title: 'Spawn Chance',
        subtitle: '151 pokemons',
      }
    };

    let chart = new google.charts.Bar(document.getElementById('chart-spawn'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  };

  const drawChartAvg = () => {
    let data = google.visualization.arrayToDataTable([
      ['feature', 'maximum', 'average', 'minimum'],
      ['Avg Spawns', resultAvg.maximum, resultAvg.average, resultAvg.minimum]
    ]);

    let options = {
      chart: {
        title: 'Avg Spawns',
        subtitle: '151 pokemons',
      }
    };

    let chart = new google.charts.Bar(document.getElementById('chart-avg'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  };

  google.charts.setOnLoadCallback(drawChartCandy);
  google.charts.setOnLoadCallback(drawChartSpawn);
  google.charts.setOnLoadCallback(drawChartAvg);
}

const changePageSection = () => {
//this part obtains the location of the page and depending on it executes the functions
if (ubication.includes('typePokemon.html')) {
  //Pass all data to show all the info or dataByType to show the filtered information
  //showList(allData);
  filterCoincidence();


} else if (ubication.includes('orderPokemon.html')) {
  /*const orderNameRadio = document.getElementById('asc-name');
  orderNameRadio.addEventListener('click',()=>{
    showList(window.sortData(dataPokemon,'name','asc'));
  });*/

  getOrderPokemon(arrayRadio);

  showList(window.data.showAllData(dataParse));
  

} else if (ubication.includes('statsPokemon.html')) {
  
computeStatsView();

}
}


//MENU NAV
menu.addEventListener('click', () => {
  //Despliega menú
  drawer.classList.toggle('open');
  //Permite scroll
  document.getElementsByTagName("html")[0].style.overflow = "auto";
  /*noscroll
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
  e.stopPropagation();*/
});

outMenu.addEventListener('click', () => {
  //Cierra menú al seleccionar una opción
  drawer.classList.remove('open');
});


//CALL FUNCTIONS
changePageSection();
dataDynamic();
getTypePokemon(buttonsArray);
