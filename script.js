
const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 8.8, releaseYear: 2010 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0, releaseYear: 2008 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, releaseYear: 2014 }
];

const addMovie = (collection, movie) => {
    collection.push(movie);
    displayMovies(collection);
};

const listMoviesByGenre = (collection, genre) => {
    return collection.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
};

const findHighestRatedMovie = collection => {
    return collection.reduce((highest, movie) => (movie.rating > highest.rating ? movie : highest));
};

const getMovieTitles = collection => {
    return collection.map(movie => movie.title);
};

const moviesAfterYear = (collection, year) => {
    return collection.filter(movie => movie.releaseYear > year);
};

const displayMovies = (collection) => {
    const movieList = document.getElementById('movieCollection');
    movieList.innerHTML = ''; 

    collection.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <strong>${movie.title}</strong> (${movie.releaseYear})<br>
            Genre: <span>${movie.genre}</span><br>
            Rating: ${movie.rating}
        `;
        movieList.appendChild(movieItem);
    });
};

const displayHighestRatedMovie = (movie) => {
    const highestRatedDiv = document.getElementById('highestRatedMovie');
    highestRatedDiv.innerHTML = `
        <strong>${movie.title}</strong> (${movie.releaseYear})<br>
        Genre: <span>${movie.genre}</span><br>
        Rating: ${movie.rating}
    `;
};

const displayMovieTitles = (titles) => {
    const titlesDiv = document.getElementById('movieTitles');
    titlesDiv.innerHTML = titles.join(', ');
};

document.getElementById('addMovieBtn').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const releaseYear = parseInt(document.getElementById('releaseYear').value);

    if (title && genre && !isNaN(rating) && !isNaN(releaseYear)) {
        addMovie(movies, { title, genre, rating, releaseYear });
        displayHighestRatedMovie(findHighestRatedMovie(movies));
        displayMovieTitles(getMovieTitles(movies));
    } else {
        alert("Please fill in all fields correctly.");
    }
});

document.getElementById('listByGenreBtn').addEventListener('click', () => {
    const genre = document.getElementById('genreFilter').value;
    if (genre) {
        const filteredMovies = listMoviesByGenre(movies, genre);
        displayMovies(filteredMovies);
    } else {
        alert("Please enter a genre to filter by.");
    }
});

document.getElementById('filterByYearBtn').addEventListener('click', () => {
    const year = parseInt(document.getElementById('yearFilter').value);
    if (!isNaN(year)) {
        const filteredMovies = moviesAfterYear(movies, year);
        displayMovies(filteredMovies);
    } else {
        alert("Please enter a valid year.");
    }
});

displayMovies(movies);
displayHighestRatedMovie(findHighestRatedMovie(movies));
displayMovieTitles(getMovieTitles(movies));
