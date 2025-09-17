// const crazyStuff = 'level';

// const someObj = {
//     prop : 'value',
//     secondProp: 10,
//     thirdProp: 'smt',
//     'forth prop': 'smt2',//we can make prop keys as string, so it allows white space etc
//     [crazyStuff]:'level will be stored as key. here is value'
// };

// //add property dynamically

// someObj.addedProperty = 'dynamic';

// //remove property from obj
// delete someObj.prop;//or someObj.addedProperty = undefined;//will be picked up by GC, but it's not recommended doing it

// //access string key
// const smt = someObj['forth prop'];//alwyas put quoation marks, so someOjb[prop] doesn't work because it will try to search by value of prop and not 'prop'.
// //better way to do that is to assign keyValue to variable like:
// const thirdKey = 'forth prop';
// const testmeh = someObj[thirdKey];

// //property types and orders
// const test = {
//     1.2: 'smt' //number has to be > 0, this will behind the scenes get converted to string
// };
// //NOTE: objects that consist only of number keys -> THEY WILL BE SORTED BY DEFAULT BY KEY
// const ytest = test['1.5'];

// WE CAN COPY OBJECTS BY const anotherPerson = {...person}; copied not by ref, BUT DOESN'T DO DEEP CLONE, SO ANY PROPS REFERENCING ANOTHER OBJ WILL STILL POINT TO THE SAME THING
//TO DEEP CLONE WE: const person3 = {...person, hobbies:[...person.hobies]}; //so we have to manually deep clone
// const person4 = Object.assign({}, person); //older way of copying and better support
//OBJECT DESTRUCTURING: const { info } = movie; // the name betwee {} has to exist on the object or it won't work. WE CAN ALSO DO const {info, ...allOtherProps} = movie;
//WE CAN ALSO ASSIGN NAMES TO DESTRUCTED PARTS LIKE: const {title: myCustomName} = movie; // then we just use myCustomName to get the title

//==============================================================================================================================================================================

/* "this" - Summary
The this keyword can lead to some headaches in JavaScript - this summary hopefully acts as a remedy.

this refers to different things, depending on where it's used and how (if used in a function) a function is called.

Generally, this refers to the "thing" which called a function (if used inside of a function). That can be the global context, an object or some bound data/ object (e.g. when the browser binds this to the button that triggered a click event).

1) this in Global Context (i.e. outside of any function)

function something() { ... }
 
console.log(this); // logs global object (window in browser) - ALWAYS (also in strict mode)!
2) this in a Function (non-Arrow) - Called in the global context

function something() { 
    console.log(this);
}
 
something(); // logs global object (window in browser) in non-strict mode, undefined in strict mode
3) this in an Arrow-Function - Called in the global context

const something = () => { 
    console.log(this);
}
 
something(); // logs global object (window in browser) - ALWAYS (also in strict mode)!
4) this in a Method (non-Arrow) - Called on an object

const person = { 
    name: 'Max',
    greet: function() { // or use method shorthand: greet() { ... }
        console.log(this.name);
    }
};
 
person.greet(); // logs 'Max', "this" refers to the person object
5) this in a Method (Arrow Function) - Called on an object

const person = { 
    name: 'Max',
    greet: () => {
        console.log(this.name);
    }
};
 
person.greet(); // logs nothing (or some global name on window object), "this" refers to global (window) object, even in strict mode
this can refer to unexpected things if you call it on some other object, e.g.:

const person = { 
    name: 'Max',
    greet() {
        console.log(this.name);
    }
};
 
const anotherPerson = { name: 'Manuel' }; // does NOT have a built-in greet method!
 
anotherPerson.sayHi = person.greet; // greet is NOT called here, it's just assigned to a new property/ method on the "anotherPerson" object
 
anotherPerson.sayHi(); // logs 'Manuel' because method is called on "anotherPerson" object => "this" refers to the "thing" which called it
If in doubt, a console.log(this); can always help you find out what this is referring to at the moment!
*/

const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movie-list');

const VISIBLE_TAG = 'visible';

const movies = [];

const renderMovie = (movie) => {
  const xor = toggleMoviesList();

  if (xor) {
    const movieEl = document.createElement('li');
    const {info} = movie;
    let text = info.title + ' - ';

    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text = text + `${key}: ${info[key]}`;
      }
    }

    movieEl.classList.add(VISIBLE_TAG);
    movieEl.id = 'movie-item';
    movieEl.textContent = text;
    movieList.append(movieEl);
    movie.movieElement = movieEl;
  }
};

const toggleMoviesList = (condition = movies.length > 0) => {
  if (condition) {
    movieList.classList.add(VISIBLE_TAG);
    return true;
  } else {
    movieList.classList.remove(VISIBLE_TAG);
  }

  return false;
};

const onAddMovieClicked = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      get title(){// can be accessed as normal properties, like newMovie.title
        return this._title;
      },
      set title(val){
        if(val === ''){
            this._title = 'DEFAULT';
            return;
        }

        this._title = val;
      },
      description, //if we have a variable that we want to assign to prop of the same name, we can do this as a shortcut
      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormattedTitle: function(){//Arrow functions cannot be used to write object methods because, as you have found, since arrow functions close over the this of the lexically enclosing context, the this within the arrow is the one that was current where you defined the object.
        return this.info.title.toUpperCase();//this always points to the thing that called the function, so we cannot do this logic by desctructuring 
        //because const {getFormattedTitle} = movie;
        //getFormattedTitle(); // this doesn't have anythign on the left side, like movie.getFormattedTittle() so the value of 'this' will be assigned the name of the func that called just getFormattedTitle();
        //TO BYPASS THIS, WE HAVE TO USE BIND() IN CALLING CODE:
        //const {getFormattedTitle} = movie;
        //getFormattedTitle.bind(movie);//BIND FIRST ARGUMENT IS TO ASSING THE VALUE OF ANY 'THIS' KEYWORD THAT THE METHOD MAY USE. USE THIS IS NOT EXECUTING IMMEDIATELLY
        //IF EXECUTING IMMEDIATELY USE:
        //getFormattedTitle.call(movie); first argument is the same as bind || getFormattedTitle.apply(movie); the only diff between call and apply is that call as second arg takes a list of args and apply takes an array of args
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    },
    getInfoLowerCase(){//SHORTER SYNTAX FOR METHODS
        return this.info;
    }

  };

  newMovie.info.title = title;

  movies.push(newMovie);
  renderMovie(newMovie);
};

const onFilterMoviesClicked = () => {
    //'this' will point to window
    //BUT!!!! IF WE USED THE FUNCTION() {} SYNTAX -> THIS WILL POINT TO BUTTON
    //ARROW FUNCTIONS HAVE NO CONCEPT OF THIS
  const input = document.getElementById('filter-title').value;
  let remaining = 0;

  movies.forEach((mov) => {
    const {info, movieElement} = mov
    if (movieElement !== undefined && movieElement !== null) {
      if (!info.title.includes(input)) {
        movieElement.classList.remove(VISIBLE_TAG);
      } else {
        movieElement.classList.add(VISIBLE_TAG);
        remaining++;
      }
    }
  });

  toggleMoviesList(remaining > 0);
};

addMovieBtn.addEventListener('click', onAddMovieClicked);
searchBtn.addEventListener('click', onFilterMoviesClicked);
