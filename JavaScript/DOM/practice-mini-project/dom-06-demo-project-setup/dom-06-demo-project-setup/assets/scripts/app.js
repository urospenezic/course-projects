const addMovieModal = document.getElementById('add-modal'); //a bit better performance than querySelector if we know the id
const noMoviesSection = document.getElementById('entry-text');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const addMovieButton = cancelAddMovieButton.nextElementSibling;
const inputs = addMovieModal.querySelectorAll('input');
const moviesListBox = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const closeMovieDeletion = () => {
  deleteMovieModal.classList.remove('visible');
  toggleBackdrop();
};

const clearInputs = () => {
  inputs.forEach((s) => (s.value = ''));
};

const onBackdropClick = () => {
  closeMovieModal();
  closeMovieDeletion();
  clearInputs();
};

const onCancelMovieClick = () => {
  showMovieModal();
  toggleBackdrop();
  clearInputs();
};

const deleteMovie = (id) => {
  let index = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    index++;
  }

  const i = movies.indexOf((s) => s.id === id);

  movies.splice(index, 1);

  return index;
};

const onRemoveMovieClicked = (id) => {
    
  confirmDelete = () => {
    const position = deleteMovie(id);
    moviesListBox.children[position].remove(); //this will automatically remove the event listener, so no memory leaks
    closeMovieDeletion();
  }


  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmBtn = deleteMovieModal.querySelector('.btn--danger');
  confirmBtn.replaceWith(confirmBtn.cloneNode(true));//we have to clone, otherwise it will just keep adding new listeners on top of the old ones
  confirmBtn = deleteMovieModal.querySelector('.btn--danger');


  cancelBtn.removeEventListener('click', closeMovieDeletion)
  //confirmBtn.removeEventListener('click', confirmDelete);
  cancelBtn.addEventListener('click', closeMovieDeletion);
  confirmBtn.addEventListener('click', confirmDelete);
};

const addNewMovieElement = (movie) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${movie.imageUrl}" alt="${movie.title}"/>
        </div>
        <div class="movie-element__info">
            <h2>${movie.title}</h2>
            <p>${movie.rating}/5 stars</p>
        </div>
    `;

  newMovieElement.addEventListener(
    'click',
    onRemoveMovieClicked.bind(null, movie.id)
  );
  moviesListBox.append(newMovieElement);
};

const updateUI = () => {
  if (movies.length === 0) {
    noMoviesSection.style.display = 'block';
  } else {
    noMoviesSection.style.display = 'none';
  }
};

const onAddMovieClicked = () => {
  const title = inputs[0].value;
  const img = inputs[1].value;
  const rating = inputs[2].value;

  if (
    title.trim() === '' ||
    img.trim() === '' ||
    rating.trim() === '' ||
    rating < 1 ||
    rating > 5
  ) {
    alert('Invalid inputs');
    return;
  }

  const movie = {
    id: Math.random().toString(),
    title: title,
    imageUrl: img,
    rating: rating,
  };

  movies.push(movie);
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
  addNewMovieElement(movie);
  updateUI();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', onBackdropClick);
cancelAddMovieButton.addEventListener('click', onCancelMovieClick);
addMovieButton.addEventListener('click', onAddMovieClicked);
