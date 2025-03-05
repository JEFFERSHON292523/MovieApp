const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers : {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params:{
        'api_key': API_KEY, 
    },
});

//UTILS

    function CreateMovies(movies,container){
        container.innerHTML='';
        movies.forEach(movie => {
        
            const movieContainer= document.createElement('div');
            movieContainer.classList.add('movie-container')
            const movieImg = document.createElement('img');
            
            movieContainer.addEventListener('click',()=>{
                location.hash='#movies='+ movie.id;
            })

            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.title);
            movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'+ movie.poster_path);
            
            movieContainer.appendChild(movieImg);
            container.appendChild(movieContainer);
        });
    }

    function CreateCategories(categories, container){
        container.innerHTML='';

        categories.forEach(category => {
        
            const categorieContainer= document.createElement('div');
            categorieContainer.classList.add('category-container')
            const categoryTtle= document.createElement('h3');
    
            categoryTtle.classList.add('category-title');
            const categoryTtleText = document.createTextNode(category.name);
            categoryTtle.setAttribute('id', 'id'+ category.id)
            categoryTtle.addEventListener('click', ()=>{
                location.hash=`#categories=${category.id}-${category.name}`;
            }
            );
    
            categoryTtle.appendChild(categoryTtleText);
            categorieContainer.appendChild(categoryTtle);
            container.appendChild(categorieContainer);
        });
    }
//FUNCTIONS

async function getTrendingMoviesPreview() {
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    console.log(data);

    CreateMovies(movies,trendingMoviesPreviewList)
}

async function getCategoriesMoviesPreview() {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    console.log(data);

    CreateCategories(categories,categoriesPreviewList)
}

async function getMoviesByCategory(id) {
    const {data} = await api('discover/movie',{
        params:{
            with_genres : id,
        }
    });
    const movies = data.results;
    console.log(data);

    CreateMovies(movies,genericSection)
}

async function getMoviesBySerach(query) {
    const {data} = await api('search/movie',{
        params: {
            query
        }
    });
    const movies = data.results;
    console.log(data);

    CreateMovies(movies,genericSection)
    
}

async function getMovieById(id) {
    const {data: movie} = await api('movie/'+id);

    const movieImgURL ='https://image.tmdb.org/t/p/w500'+ movie.poster_path;
    headerSection.style.background = `
        linear-gradient(
        180deg, rgba(0, 0, 0, 0.35) 19.27%,
         rgba(0, 0, 0, 0) 29.17%),
        url(${movieImgURL})`
    ;

    movieDetailTitle.textContent= movie.title;
    movieDetailDescription.textContent=movie.overview;
    movieDetailScore.textContent=movie.vote_average;

    CreateCategories(movie.genres, movieDetailCategoriesList);
    getRealtedMoviesId(id);
}

async function getMoviesBySerach(query) {
    const {data} = await api('search/movie',{
        params: {
            query
        }
    });
    const movies = data.results;
    console.log(data);

    CreateMovies(movies,genericSection)
    
}

async function getRealtedMoviesId(id) {
    const {data} = await api(`movie/${id}/recommendations`)
    const relatedMovies = data.results;
    
    CreateMovies(relatedMovies, relatedMoviesContainer);
    
}