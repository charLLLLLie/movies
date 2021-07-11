const addMovieModal = document.getElementById('add-modal');
/* const addMovieModal = document.querySelector('#add-modal');
const addMovieModal = document.body.children[1]; */

const startAddMovieButton = document.querySelector('header button');

const backdrop = document.getElementById('backdrop');

const cancelAddMovieButton =  document.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;


const userInputs = addMovieModal.querySelectorAll('input');


const movies = [];
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    /*     addMovieModal.className = 'modal card'
     */
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for(const usrInput of userInputs){
        usrInput.value = '';
    }
}

const cancelAddMovie = () => {
    toggleMovieModal();
    clearMovieInput();
};

const backdropClickHandler = () => {
    toggleMovieModal();
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
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue

    } ;
    movies.push(newMovie);
    console.log(movies)
    toggleMovieModal();
    clearMovieInput();
};


startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click',backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovie)
confirmAddMovieButton.addEventListener('click', addMovieHandler)