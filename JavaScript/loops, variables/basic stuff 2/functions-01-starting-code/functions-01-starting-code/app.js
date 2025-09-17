const startGameBtn = document.getElementById('start-game-btn');
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER WINS';

let running = false;

const getPlayerChoice = function () {
  const selection = prompt(`${ROCK} ${PAPER} ${SCISSORS}?`, '').toUpperCase();

  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_CHOICE} for you!`);
    return DEFAULT_CHOICE;
  }

  return selection;
};

const getComputerChoice = function () {
  const rnd = Math.random();

  if (rnd < 0.34) {
    return ROCK;
  } else if (rnd < 0.67) {
    return PAPER;
  }

  return SCISSORS;
};

const getWinner = (cChoice, pChoice = DEFAULT_CHOICE) => {
  if (cChoice == pChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && pChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSORS) ||
    (cChoice === SCISSORS && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  }

  return RESULT_COMPUTER_WINS;
};

//NOTES:
// const person = {
//     greet: function greet(){//functions as prop values are called methods. NOTE: functions are objects! they have params like arguments, caller, length,name..
//         console.log('ello!');
//     }
// };

// person.greet();

// //function variables:

// const start = function startGame(){//func pointer, will not be visible if called above the place of initialization. so it won't be hoisted to the top. we can make it without a name with anonymus func.
//     console.log('starting');
// }

// startGameBtn.addEventListener('click', start);

// //anonymous funcs:

// startGameBtn.addEventListener('dblclick', function(){// ONE REASONW WE WOULD STILL WANT A NAME WITH ANON FUNCS IS THE COMPILER. IF WE HAVE AN ERROR, THE COMPILE WILL TELL US THE NAME OF THE FUNC THAT GENERATED IT. OTHERWISE IT WOULD BE <ANONYMOUS>
//     console.log('smt');//BE SURE TO DOUBLE CHECK FOR MULTIPLE ADDING OF EVENT HANDLERS BECAUSE WITH THIS APPROACH INTERPRETER WILL CREATE A NEW FUNC WITH EACH CALL TO ADDEVENTLISTENER
// })

startGameBtn.addEventListener('click', () => {
  if (running) {
    return;
  }

  running = true;
  console.log('game starting');
  const playerSelection = getPlayerChoice();
  const computerChoice = getComputerChoice();

  const winner = getWinner(computerChoice, playerSelection);

  console.log(winner);
});


//NOTE: we can have funcs inside of funcs, normal stuff
const combine = (callback, operation, ...numbers) => {//rest argument -  when we want an arbitrary number of arguments passed and we loop over them. NOTE THAT WE CANNOT HAVE PARAMS AFTER REST ARGUMENT, ONLY BEFORE
    let sum = 0;
    for(const num of numbers){
        if(operation === 'ADD'){
            sum+=sum;
        }
        else if(operation === 'SUBTRACT'){
            sum-=sum;    
        }
    }
    callback(sum);
}

// const substractUp = function(callback, ...numbers){
//     let sum = 0;

//     for(const number of numbers){
//         sum-=sum;
//     }

//     callback(sum);
// }


const showResult = (message, result) => alert(message + ' ' + result);

//SO BIND LETS US PRECONFIGURE FUNCTIONS WHERE WE NEED TO PASS IN SOME VALUES, BUT WE DO NOT WANT TO IMMEDIATELLY EXECUTE IT
combine(showResult.bind(this, 'The result after adding is: '), 'ADD', 1, -5, 4);// ok so this bind will add the vale to message param of show result, everything we call after, like callback(result) will be added after this param we define here.
combine(showResult.bind(this, 'RESULT AFTER SUBTRACTING'), 'SUBTRACT', 2,3,4);

