
searchFormBtn.addEventListener('click', ()=>{
    location.hash='#search='+searchFormInput.value;
})
trendingBtn.addEventListener('click', ()=>{
    location.hash='#trends='
})
arrowBtn.addEventListener('click', ()=>{
    location.hash=window.history.back();
})


window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('hashchange',navigator,false)


function navigator() {
    console.log(location);
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith('#movies=')){
        movieDetailsPage();
    }else if(location.hash.startsWith('#categories=')){
        categoriesPage();
    }else {
        homePage();
    }
}

function homePage(){
    console.log('home');   

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getCategoriesMoviesPreview();
    getTrendingMoviesPreview();
}

function categoriesPage(){
    window.scroll(0,0);
    console.log('categories');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
     const [_,categoryData]= location.hash.split('=');
     const [categoryId,categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML=categoryName;
    getMoviesByCategory(categoryId);


}

function movieDetailsPage(){
    console.log('movies');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');


    const [_,movieId]= location.hash.split('=');
    getMovieById(movieId);
}

function searchPage(){
    console.log('search');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_,query]= location.hash.split('=');
    getMoviesBySerach(query);
    
}

function trendsPage(){
    console.log('trends');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

