const search = document.querySelector("#SearchMovie");
const searchButton = document.querySelector(".movies-search button");
const movieName = document.querySelector("#result-name");
const yearMade = document.querySelector("#year");
const ageRate = document.querySelector("#ageRate");
const timeDuration = document.querySelector("#duartion");
const imdbRating = document.querySelector("#imdb-value");
const RottenRating = document.querySelector("#rotten-value");
const movieImg = document.querySelector(".image-container");
const genre = document.querySelector(".box");
const storyPlot = document.querySelector("#storyPlot");
const director = document.querySelector("#director");
const stars = document.querySelector("#stars");
const boxOffice = document.querySelector("#boxoffice");
const writer = document.querySelector("#writer");
const genreHTML = document.querySelector(".genre");

BASE_URL = `https://www.omdbapi.com/?t=${search}&apikey=5f68227a`;

const namefun = () => {
  
  var title = search.value;
  let titleReplace = title.replace(" ", "+");
  fetchMultiple(titleReplace);
}


async function fetchMultiple(titleReplace) {
  const URL = `https://www.omdbapi.com/?s=${titleReplace}&apikey=5f68227a`;

  try {
    const searchResponse = await fetch(URL);
    const searchResult = await searchResponse.json();

    if(searchResult.Response == 'True') {
      document.querySelector(".movie-card-container").innerHTML = "";
      const movies = searchResult.Search;
      for(let movie of movies) {
        const movieID = movie.imdbID;
        const movieDetailUrl = `https://www.omdbapi.com/?i=${movieID}&apikey=5f68227a`;
        const detailResponse = await fetch(movieDetailUrl);
        const details = await detailResponse.json();
        printMovieDetails(details);
      }
    }
    else {
      document.querySelector(".movie-card-container").innerHTML = "<h2>This Movie Is Not Available or Please Make Sure You Entered Appropriate Title.</h2>"
      document.querySelector(".movie-card-container").style.display = "flex";
      document.querySelector(".movie-card-container").style.fontFamily = "Arial";
      document.querySelector(".movie-card-container").style.justifyContent = "center";
      document.querySelector(".movie-card-container").style.alignItem = "center";
      document.querySelector(".movie-card-container").style.height = "300px";
      document.querySelector(".movie-card-container").style.width = "100%";
      document.querySelector(".movie-card-container").style.color = "gray";
      document.querySelector(".movie-card-container").style.marginTop = "200px";

    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function printMovieDetails(movie) {
  document.querySelector(".movie-card-container").innerHTML += `
  <div class="movie-card">
                <div class="search-result-container">
                  <div class="movie-name">
                    <h2 id="result-name">${movie.Title}</h2>
                    <div class="short-details">
                      <span id="year">${movie.Year}</span>&#x2022;
                      <span id="ageRate">${movie.Rated}</span>&#x2022;
                      <span id="duartion">${movie.Duration}</span>
                    </div>
                  </div>
                  <div class="ratings">
                    <div class="imdb-rating rate">
                      <h4>IMDb RATING</h4>
                      <div class="rated">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <span id="imdb-value">${movie.imdbRating}</span>
                      </div>
                      
                    </div>
                    <div class="rotten-tomatoes rate">
                      <h4>ROTTEN TOMATOES</h4>
                      <div class="rated">
                        <i class="fa-solid fa-pizza-slice" style="color: #ff0000;"></i>
                        <span id="rotten-value"></span>
                      </div>
                      
                    </div>
                  </div>
                </div>

                <div class="long-detail-container">
                  <div class="image-container">
                  <img src="${movie.Poster}" alt="" id="imag">
                  </div>
                  <div class="long-detail">
                    <div class="genre">
                    </div>

                    <div class="plot">
                      <h3 id="storyPlot">${movie.Plot}</h3>
                    </div>

                    <div class="makers-list">
                      <ul class="list">
                      <li class="list-item" ><h4>Directors</h4><p id="director">${movie.Director}</p></li>
                      <li class="list-item"> <h4>Writers</h4><p id="writer">${movie.Writer}</p></li>
                      <li class="list-item"><h4>Stars</h4><p id="stars">${movie.Actors}</p></li>
                      <li class="list-item"><h4>Box Office Collection</h4><p id="boxoffice">${movie.BoxOffice}</p></li>
                    </ul>
                    </div>

                  </div>
                </div>

              </div>
  `
}

searchButton.addEventListener('click', namefun);
