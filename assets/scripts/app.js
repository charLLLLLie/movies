const addMovieModal = document.getElementById('add-modal');
/* const addMovieModal = document.querySelector('#add-modal');
const addMovieModal = document.body.children[1]; */

const startAddMovieButton = document.querySelector('header button');

const backdrop = document.getElementById('backdrop');

const cancelAddMovieButton =  document.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;


const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal')

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if(movies.length == 0){
        entryTextSection.style.display = 'block';
    }else{
        entryTextSection.style.display = 'none'
    }
}

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible')
}

const deleteMovieHandler = (movieId) =>{
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    //listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUI();
}


const startDeleteMovieHandler = (movieId) =>{
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButtton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButtton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButtton.replaceWith(confirmDeletionButtton.cloneNode(true))

    confirmDeletionButtton = deleteMovieModal.querySelector('.btn--danger');


    //confirmDeletionButtton.removeEventListener('click', deleteMovieHandler.bind(null, movieId))
    cancelDeletionButtton.removeEventListener('click', closeMovieDeletionModal)



    cancelDeletionButtton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButtton.addEventListener('click', deleteMovieHandler.bind(null,movieId ));


    //deleteMovie(movieId);
    
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
     const newMovieElement = document.createElement('li');
     newMovieElement.className = 'movie-element';
     newMovieElement.innerHTML =`
     <div class= "movie-element__image">
     <img src="${imageUrl}" alt="${title}">
     </div>
     <div class= "movie-element__info">
     <h2>${title}</h2>
     <p>${rating}/5 stars</p>
     </div>
     `;
     newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null,id));
     const listRoot = document.getElementById('movie-list');
     listRoot.append(newMovieElement);

}




const closeMovieModal = () => {
     addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    /*     addMovieModal.className = 'modal card'
     */
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for(const usrInput of userInputs){
        usrInput.value = '';
    }
}

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};



const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(titleValue.trim() === ''||
     imageUrlValue.trim() === '' ||
      ratingValue.trim() === '' ||
      +ratingValue < 1  ||
      +ratingValue > 5
      ){
         alert('Please enter valid values (rating between 1 and 5)')
         return
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue

    } ;
    movies.push(newMovie);
    console.log(movies)
    closeMovieModal(); 
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click',backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler)
confirmAddMovieButton.addEventListener('click', addMovieHandler)