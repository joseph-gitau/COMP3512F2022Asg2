// require assign2.js
import { getapi, api } from "./assign2.js";

// check if genres, artists, songsData are in localStorage
// if not, get them from api
// if yes, get them from localStorage
if (
  localStorage.getItem("genres") === null ||
  localStorage.getItem("artists") === null ||
  localStorage.getItem("songsData") === null
) {
  const genreList1 = [];
  const artistList1 = [];
  const songData1 = [];
  // store response
  const response = await fetch(api);
  const data = await response.json();
  const songtp = JSON.stringify(data);
  const allSongs = JSON.parse(songtp);
  // console.log(genres);
  for (let i = 0; i < allSongs.length; i++) {
    // console.log(genres[i]["title"]);
    const tempgenre = allSongs[i]["genre"];
    genreList1.push(tempgenre);
  }
  // console.log(genreList1);
  // loop through allSongs and store in artists
  for (let i = 0; i < allSongs.length; i++) {
    const tempartist = allSongs[i]["artist"];
    artistList1.push(tempartist);
  }
  // console.log(artistList1);
  // loop through allSongs and store in songsData
  for (let i = 0; i < allSongs.length; i++) {
    const tempsong = allSongs[i];
    songData1.push(tempsong);
  }
  // console.log(songData1);
  /* const temp_genre = JSON.stringify(genreList1);
      const genres = JSON.parse(temp_genre); */
  const genres = genreList1;
  const temp_artist = JSON.stringify(artistList1);
  const artists = JSON.parse(temp_artist);
  const temp_song = JSON.stringify(songData1);
  const songsData = JSON.parse(temp_song);

  // store genres, artists, songsData in localStorage
  localStorage.setItem("genres", JSON.stringify(genres));
  localStorage.setItem("artists", JSON.stringify(artists));
  localStorage.setItem("songsData", JSON.stringify(songsData));
} else {
}
const genres = JSON.parse(localStorage.getItem("genres"));
const artists = JSON.parse(localStorage.getItem("artists"));
const songsData = JSON.parse(localStorage.getItem("songsData"));
/* console.log(genres);
console.log(artists);
console.log(songsData);*/

// document.addEventListener("DOMContentLoaded", function () {
//this array will store all the songs in the database
const songsArray = [];

for (let a of artists) {
  let option = document.createElement("option");
  option.text = a["name"];
  option.value = a["id"];
  let aSelect = document.getElementById("artist");
  aSelect.appendChild(option);
}
// get unique artists
const getUniqueArtists = (data) => {
  const uniqueArtists = [];
  data.forEach((item) => {
    if (!uniqueArtists.includes(item.artist["name"])) {
      uniqueArtists.push(item.artist["name"]);
    }
  });
  return uniqueArtists;
};
// console.log("unique artists:", getUniqueArtists(songsData));

for (let g of genres) {
  let option = document.createElement("option");
  option.text = g["name"];
  option.value = g["id"];
  let aSelect = document.getElementById("genre");
  aSelect.appendChild(option);
}

//Retrieve and display song data
const tableBody = document.getElementById("tBody");

for (let s of songsData) {
  const songRow = document.createElement("tr");
  songRow.setAttribute("songID", s["song_id"]);
  // songRow.

  //create td for title
  const songDataTitle = document.createElement("td");
  //add data inside of td
  songDataTitle.textContent = s["title"];
  songDataTitle.style.cursor = "pointer";
  // add event listener to td
  // songDataTitle.addEventListener("click", showSongDetails);

  //Insert song title into the TD
  songRow.insertAdjacentElement("beforeend", songDataTitle);
  //add td1 (Song title)
  tableBody.insertAdjacentElement("afterend", songRow);

  //create td for artist name
  const songDataArtist = document.createElement("td");
  //add data inside of td
  songDataArtist.textContent = s["artist"]["name"];
  //add td2 (Artist name)
  songRow.appendChild(songDataArtist);

  //create td for year
  const songDataYear = document.createElement("td");
  //add data inside of td
  songDataYear.textContent = s["year"];
  //add the year td to the row
  songRow.appendChild(songDataYear);

  //create td for genre
  const songDataGenre = document.createElement("td");
  //add data inside of td
  songDataGenre.textContent = s["genre"]["name"];
  //add the genre td to the row
  songRow.appendChild(songDataGenre);

  //create td for popularity
  const songDataPopularity = document.createElement("td");
  //add data inside of td
  songDataPopularity.textContent = s["details"]["popularity"];
  //add the popularity td to the row
  songRow.appendChild(songDataPopularity);

  //create td for addToPlaylist
  const playlistButton = document.createElement("button");
  //add data inside of td
  playlistButton.textContent = "Add";
  //add button to the end of the row
  songRow.appendChild(playlistButton);

  //add the completed song row to the table body
  tableBody.appendChild(songRow);

  const mySong = new Song(s);

  //add song to all songs array
  songsArray.push(mySong);

  // console.log(mySong);
}

//TEST outputting the array to console
console.log(songsArray);

//TESTING sorting for columns, console.log which header was clicked
const tableContent = document.getElementById("tBody");
const tableButtons = document.querySelectorAll("th ");

const createRow = (obj) => {
  const row = document.createElement("tr");
  const objKeys = Object.keys(obj);
  objKeys.map((key) => {
    const cell = document.createElement("td");
    cell.setAttribute("data-attr", key);
    cell.innerHTML = obj[key];
    cell.addEventListener("click", (e) => {
      console.log(e.target);
    });
    cell.style.cursor = "pointer";
    row.appendChild(cell);
  });
  // add button to the end of the row
  const playlistButton = document.createElement("button");
  //add data inside of td
  playlistButton.textContent = "Add";
  //add button to the end of the row
  row.appendChild(playlistButton);

  // onclick of first td in row (song title), showSongDetails
  /* const songTitle = row.querySelector("td");
  songTitle.addEventListener("click", showSongDetails);
  songTitle.style.cursor = "pointer"; */

  return row;
};

const getTableContent = (data) => {
  const pData = [];
  // loop through the data and create a new array of data with title, artist, year, genre, popularity
  data.map((item) => {
    const obj = {
      title: item.title,
      artist: item.artist.name,
      year: item.year,
      genre: item.genre,
      popularity: item.popularity,
    };
    pData.push(obj);
  });
  // return pData;
  pData.map((obj) => {
    const row = createRow(obj);
    tableContent.appendChild(row);
    // console.log(obj);
  });
  addPop();
  color();
};
// getTableContentFiltered
const getTableContentFiltered = (data) => {
  const pData = [];
  // loop through the data and create a new array of data with title, artist, year, genre, popularity
  data.map((item) => {
    const obj = {
      title: item.title,
      artist: item.artist.name,
      year: item.year,
      genre: item.genre,
      popularity: item.popularity,
    };
    pData.push(obj);
  });
  // return pData;
  pData.map((obj) => {
    const row = createRow(obj);
    tableContent.appendChild(row);
    // console.log(obj);
  });
  addPop();
  color();
};

// sort by title ascending or descending
const sortByTitle = (data, direction = "asc") => {
  tableContent.innerHTML = "";
  console.log("sorting by title");
  const sorted = [...data].sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }

  console.log(sorted);
  //   return sorted;
  getTableContent(sorted);
};
/* const sortByTitle = (data) => {
  data.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });
  tableContent.innerHTML = "";
  getTableContent(data);
}; */
// sort by artist ascending or descending
const sortByArtist = (data, direction = "asc") => {
  tableContent.innerHTML = "";
  console.log("sorting by artist");
  const sorted = data.sort((a, b) => {
    if (a.artist.name < b.artist.name) {
      return -1;
    }
    if (a.artist.name > b.artist.name) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }
  //   return sorted;
  getTableContent(sorted);
};
// sort by year ascending or descending
const sortByYear = (data, direction) => {
  tableContent.innerHTML = "";
  console.log("sorting by year");
  const sorted = data.sort((a, b) => {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }
  //   return sorted;
  getTableContent(sorted);
};
// sort by genre ascending or descending
const sortByGenre = (data, direction) => {
  tableContent.innerHTML = "";
  console.log("sorting by genre");
  const sorted = data.sort((a, b) => {
    if (a.genre.name < b.genre.name) {
      return -1;
    }
    if (a.genre.name > b.genre.name) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }
  //   return sorted;
  getTableContent(sorted);
};
// sort by popularity ascending or descending
const sortByPopularity = (data, direction = "asc") => {
  tableContent.innerHTML = "";
  console.log("sorting by popularity");
  const sorted = [...data].sort((a, b) => {
    if (a.popularity < b.popularity) {
      return -1;
    }
    if (a.popularity > b.popularity) {
      return 1;
    }

    return 0;
  });
  if (direction === "desc") {
    sorted.reverse();
  }

  console.log(sorted);
  //   return sorted;
  getTableContent(sorted);
};

const sortData = (data, param, direction = "asc") => {
  tableContent.innerHTML = "";
  const sortedData =
    direction == "asc"
      ? [...data].sort(function (a, b) {
          if (a[param] < b[param]) {
            return -1;
          }
          if (a[param] > b[param]) {
            return 1;
          }
          return 0;
        })
      : [...data].sort(function (a, b) {
          if (b[param] < a[param]) {
            return -1;
          }
          if (b[param] > a[param]) {
            return 1;
          }
          return 0;
        });

  getTableContent(sortedData);
};

const resetButtons = (event) => {
  [...tableButtons].map((button) => {
    if (button !== event.target) {
      button.removeAttribute("data-dir");
    }
  });
};

/* window.addEventListener("load", () => {
  [...tableButtons].map((button) => {
    button.addEventListener("click", (e) => {
      resetButtons(e);
      if (e.target.getAttribute("data-dir") == "desc") {
        sortData(songList, e.target.id, "desc");
        e.target.setAttribute("data-dir", "asc");
      } else {
        sortData(songList, e.target.id, "asc");
        e.target.setAttribute("data-dir", "desc");
      }
    });
  });
}); */

function Song(s) {
  this.title = s["title"];
  this.artist = s["artist"];
  this.year = s["year"];
  this.genre = s["genre"]["name"];
  this.popularity = s["details"]["popularity"];
  this.songID = s["song_id"];
}
// });

// sort by title on click of title header
// on first click of title header, sort by title ascending
// on second click of title header, sort by title descending
tableButtons[0].addEventListener("click", () => {
  // get id of title and add data-dir attribute to it
  const title = document.getElementById("title");
  title.setAttribute("data-dir", "asc");
  const direction = tableButtons[0].getAttribute("data-dir");
  if (direction === "asc") {
    sortByTitle(songsArray, "desc");
    tableButtons[0].setAttribute("data-dir", "desc");
    // add down arrow to title header
    tableButtons[0].innerHTML = "Title &#9660;";
  } else {
    sortByTitle(songsArray, "asc");
    tableButtons[0].setAttribute("data-dir", "asc");
    // add up arrow to title header
    tableButtons[0].innerHTML = "Title &#9650;";
  }
});

// sort by artist on click of artist header
// on first click of artist header, sort by artist ascending
// on second click of artist header, sort by artist descending
tableButtons[1].addEventListener("click", () => {
  // get id of artist and add data-dir attribute to it
  const artist = document.getElementById("artist");
  artist.setAttribute("data-dir", "asc");
  const direction = tableButtons[1].getAttribute("data-dir");
  if (direction === "asc") {
    sortByArtist(songsArray, "desc");
    tableButtons[1].setAttribute("data-dir", "desc");
    // add down arrow to artist header
    tableButtons[1].innerHTML = "Artist &#9660;";
  } else {
    sortByArtist(songsArray, "asc");
    tableButtons[1].setAttribute("data-dir", "asc");
    // add up arrow to artist header
    tableButtons[1].innerHTML = "Artist &#9650;";
  }
});

// sort by year on click of year header
// on first click of year header, sort by year ascending
// on second click of year header, sort by year descending
tableButtons[2].addEventListener("click", () => {
  const direction = tableButtons[2].getAttribute("data-dir");
  if (direction === "asc") {
    sortByYear(songsArray, "desc");
    tableButtons[2].setAttribute("data-dir", "desc");
    // add down arrow to year header
    tableButtons[2].innerHTML = "Year &#9660;";
  } else {
    sortByYear(songsArray, "asc");
    tableButtons[2].setAttribute("data-dir", "asc");
    // add up arrow to year header
    tableButtons[2].innerHTML = "Year &#9650;";
  }
});

// sort by genre on click of genre header
// on first click of genre header, sort by genre ascending
// on second click of genre header, sort by genre descending
tableButtons[3].addEventListener("click", () => {
  const genre = document.getElementById("genre");
  genre.setAttribute("data-dir", "asc");

  const direction = tableButtons[3].getAttribute("data-dir");
  if (direction === "asc") {
    sortByGenre(songsArray, "asc");
    tableButtons[3].setAttribute("data-dir", "desc");
    // add down arrow to genre header
    tableButtons[3].innerHTML = "Genre &#9660;";
  } else {
    sortByGenre(songsArray, "desc");
    tableButtons[3].setAttribute("data-dir", "asc");
    // add up arrow to genre header
    tableButtons[3].innerHTML = "Genre &#9650;";
  }
});

// sort by popularity on click of popularity header
// on first click of popularity header, sort by popularity ascending
// on second click of popularity header, sort by popularity descending
tableButtons[4].addEventListener("click", () => {
  // get id of popularity and add data-dir attribute to it
  const popularity = document.getElementById("popularity");
  popularity.setAttribute("data-dir", "asc");
  const direction = tableButtons[4].getAttribute("data-dir");
  if (direction === "asc") {
    sortByPopularity(songsArray, "popularity", "desc");
    tableButtons[4].setAttribute("data-dir", "desc");
    // add down arrow to popularity header
    tableButtons[4].innerHTML = "Popularity &#9660;";
  } else {
    sortByPopularity(songsArray, "popularity", "asc");
    tableButtons[4].setAttribute("data-dir", "asc");
    // add up arrow to popularity header
    tableButtons[4].innerHTML = "Popularity &#9650;";
  }
});
// on hover of table header, change cursor to pointer
tableButtons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.cursor = "pointer";
  });
});

// alternate table row colors
const tableRows = document.querySelectorAll("tr");
tableRows.forEach((row, index) => {
  if (index % 2 === 0) {
    row.style.backgroundColor = "#00382b";
  }
});
// get the 4th td element of each row and add a class of "popularity"
const addPop = function () {
  const popularity = document.querySelectorAll("td:nth-child(5)");
  popularity.forEach((pop) => {
    pop.classList.add("popularity");
  });
};
// document.addEventListener("DOMContentLoaded", function () {
const color = function () {
  // add a colored bar to the popularity column based on the popularity score
  const popularity = document.querySelectorAll(".popularity");
  popularity.forEach((pop) => {
    const popScore = pop.innerHTML;
    if (popScore >= 80) {
      pop.style.backgroundColor = "#00ff00";
    } else if (popScore >= 60) {
      pop.style.backgroundColor = "#ffff00";
    } else if (popScore >= 40) {
      pop.style.backgroundColor = "#ff9900";
    } else if (popScore >= 20) {
      pop.style.backgroundColor = "#ff0000";
    } else {
      pop.style.backgroundColor = "#990000";
    }
  });
};
addPop();
color();
// });

// on submit of form, filter table by selected
const filterForm = function () {
  // change .th-header text
  const filterHeader = document.getElementsByClassName("th-header");
  filterHeader[0].innerHTML = "Search/Browse Songs";
  const form = document.getElementById("filterBox");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const filterT = document.getElementById("filterT");
    const filterA = document.getElementById("filterA");
    const filterG = document.getElementById("filterG");

    // filter by title
    if (filterT.checked) {
      const filterTerm = document.getElementById("title").value;
      tableContent.innerHTML = "";
      const sorted = songsArray.filter((song) => {
        return song.title.toLowerCase().includes(filterTerm.toLowerCase());
      });
      console.log("Sorted: ", sorted);
      //if sorted is not empty, display the filtered table
      if (sorted) {
        // displayTable(sorted);
        getTableContentFiltered(sorted);
        // on click of title item, display song info

        // if sorted is empty, display a message that no results were found
      } else {
        tableContent.innerHTML = "No results found";
      }
    }
    // filter by artist
    if (filterA.checked) {
      const filterTermA = document.getElementById("artist").value;
      console.log("Filter term: ", filterTermA);
      tableContent.innerHTML = "";
      const sortedA = songsArray.filter((song) => {
        // sort by artist['id']
        return song.artist["id"] == filterTermA;
      });
      console.log("Sorted by artist: ", sortedA);
      //if sorted is not empty, display the filtered table
      if (sortedA) {
        // displayTable(sorted);
        getTableContent(sortedA);
        // if sorted is empty, display a message that no results were found
      } else {
        tableContent.innerHTML = "No results found";
      }
    }
    // filter by genre
    if (filterG.checked) {
      const filterTermG = document.getElementById("genre").value;
      tableContent.innerHTML = "";
      const sortedG = songsArray.filter((song) => {
        return song.genre["id"] == filterTermG;
      });
      console.log("Sorted by Genre: ", sortedG);
      //if sorted is not empty, display the filtered table
      if (sortedG) {
        // displayTable(sorted);
        getTableContent(sortedG);
        // if sorted is empty, display a message that no results were found
      } else {
        tableContent.innerHTML = "No results found";
      }
    }
  });
};
filterForm();

// showSongDetails function
const showSongDetails = function (song) {
  // hide table header
  const tableHeader = document.getElementById("headerRow");
  tableHeader.style.display = "none";
  console.log("Song passed: ", song);
  tableContent.innerHTML = "";
  /* tableContent.innerHTML = `<h2>${song.title}</h2>
  <p>Artist: ${song.artist.name}</p>
  <p>Album: ${song.title}</p>
  <p>Genre: ${song.genre.name}</p>
  <p>Popularity: ${song.popularity}</p>
  <p>Duration: ${song.duration}</p>
  <p>Release Date: ${song.release_date}</p>
  <p>Explicit: ${song.explicit}</p>
  <p>Price: ${song.price}</p>`;
}; */
  // convert duration to minutes and seconds
  const duration = song.details.duration;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const durationString = `${minutes}:${seconds}`;
  // anychart data table
  var data = [
    // { x: "bpm", value: song.details.bpm },
    { x: "energy", value: song.analytics.energy },
    // { x: "Loudness", value: song.details.loudness },
    { x: "Danceability", value: song.analytics.danceability },
    { x: "Valence", value: song.analytics.valence },
    { x: "Acousticness", value: song.analytics.acousticness },
    { x: "Liveness", value: song.analytics.liveness },
    { x: "Speechiness", value: song.analytics.speechiness },
    // { x: "Popularity", value: song.details.popularity },
  ];

  // create radar chart
  var chart = anychart.radar();
  // set chart yScale settings
  chart.yScale().minimum(35).maximum(65).ticks({ interval: 5 });

  // create first series
  chart.line(data);

  // set chart title
  chart.title("Radar Chart");

  tableContent.innerHTML = `
  <div class="songDetails">
            <div class="song-info">
                <h3>Song information</h3>
                <h4 id="songTitle">Song Title: ${song.title}</h4>
                <h5 id="songArtist">Artist: ${song.artist.name}</h5>
                <h5 id="songGenre">Genre: ${song.genre.name}</h5>
                <h5 id="songYear">Year: ${song.year}</h5>
                <h5 id="songDuration">Duration: ${durationString} Minutes</h5>
                
                <h4>Analysis data</h4>
                <h5 id="bpm">pm: </h5>
                <h5 id="songEnergy">Energy: </h5>
                <h5 id="songLoudness">Loudness: </h5>
                <h5 id="songDanceability">Danceability: </h5>
                <h5 id="songLiveness">Liveness: </h5>
                <h5 id="songValence">Valence: </h5>
                <h5 id="songAcousticness">Acousticness: </h5>
                <h5 id="songSpeechiness">Speechiness: </h5>
                <h5 id="songPopularity">Popularity</h5>
            </div>
            
            <div class="song-radar">
                <h2>Radar chart</h2>
                <div class="chart" id="chart">
                   
                </div>
            </div>
        </div>
  `;
  // set container id for the chart
  chart.container("chart");
  // initiate chart drawing
  chart.draw();
};

// onclick of table row, display song details
const tableRow = document.querySelectorAll("tr");
tableRow.forEach((row, index) => {
  row.addEventListener("click", () => {
    const songId = row.getAttribute("data-id");
    const song = songsData.find((song) => {
      return song.id == songId;
    });
    console.log("Song: ", song);
    showSongDetails(song);
  });
});

