//we declare variables like: let smt = 5;
//we declare constants like: const smt = 5;
//js peasents use camelcase

const defaultResult = 0;
let result = defaultResult;
let logEntries = [];

/*these are called "Template literals". One thing to note about these - line breaks and whitespace will be taken into account (easy way to add new lines)
let calculationDescription = `( ${defaultResult}  +10) * 3 / 2 -1`; //jesus christ is there a better way to concatinate. ok there is, backtick does that (`); so to add ${value} we need to wrap the string in `
let errorMessage = "An error \n" + "occured"; //new line ez. so backslash escapes chars just like any other lang*/

addBtn.addEventListener('click', calculate.bind(this, 'ADD')); //proper way with bind
subtractBtn.addEventListener('click', subtract);//finds the func by name, idk where it looks at this stage. only this document?
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);


function calculate(operation){
  let operator;
  const resultOld = result;
  if(operation == 'ADD'){
    result+=enteredNumber;
    operator = '+'
  } else if(operation == 'SUB'){
    result-=enteredNumber;
    operator = '-';
  }
  else if(operation == 'MUL'){
    result*=enteredNumber;
    operator = '*';
  }
  else{
    result /= enteredNumber;
    operator = '/';
  }

  log(operation, enteredNumber, resultOld, result);

}

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteLog(operator, resultBeforeCalc, calcNumber) {
  const description = `${resultBeforeCalc} + ${operator} ${calcNumber}`;
  outputResult(result, description);
}

function log(operation, number, oldValue, newValue) {
  const entry = {
    operation: operation,
    previous: oldValue,
    result: newValue,
    number: number,
  };

  logEntries.push(entry);
  console.log(logEntries[logEntries.length - 1]);
}

function calculateResult(calculationType){
  const enteredNumber = getUserNumberInput();
  const initialResult = result;

  if()
}

function add() {
  //result = result + userInput.value; //this does string concatination? jesus fuck.. userInput.Value is string and result is number, so result is concat of string number + string.
  //NOTE: 3 + "3" = "33"
  //NOTE: "HI" - "i" = NaN
  //NOTE: 3 * "3" = 9 (number not string kekw)
  //NOTE: 3 - "3" = 0 and 3 / "3" = 0 so the only exception is +
  const enteredNumber = getUserNumberInput();
  const resultOld = result;
  result += enteredNumber; //short for parseInt is +userInput.value.
  createAndWriteLog('+', resultOld, enteredNumber);
  log('ADD', enteredNumber, resultOld, result);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const resultOld = result;
  result -= enteredNumber;
  createAndWriteLog('-', resultOld, enteredNumber);
  log('SUB', enteredNumber, resultOld, result);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const resultOld = result;
  result *= enteredNumber;
  createAndWriteLog('*', resultOld, enteredNumber);
  log('MUL', enteredNumber, resultOld, result);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const resultOld = result;
  result /= enteredNumber;
  createAndWriteLog('/', resultOld, enteredNumber);
  log('DIV', enteredNumber, resultOld, result);
}

/*
    Data type syntax:

    Object:
        {name: smt, age: 20}
    Array:
        [1,3,6]

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Special types:
    undefined -> default value for stuff that's not assigned. you tipically want to check variables for undefined to determine if it has value (was assigned). we do that via typeof variableName. that will return a type, which can be undefined
    null -> not default, has to be set explicitly. used to manage empty data basically 
    NaN -> not a type technically. it's kindof an error code returned as a result that failed (e.g. 3 * "hi")
    
    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    A BIT ON TYPEOF: array and object both return Object as the type, integers and stuff like that will return Number. Null has a value of object as well. But undefined has its own type, so typeof variableName that's undefined will return "undefined".
     typeof NaN = "number"

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    DEVELOPER TOOLS: Perfomance tab:
    -Adding js script directly at the bottom of html is not good because we can see in performance tab that they get requested for load after the whole scripting is done (networking tab look at scripts being pulled, main tab when parsing happens). we can see
    that we pull the scripts only after the page is parsed and execute the scripts only when the download is done. so nothing is async by doing this
    so this is where defer comes into play, like so:
    <script src="assets/scripts/vendor.js" defer></script>
    <script src="assets/scripts/app.js" defer></script>
    ALWAYS IMPORT SCRIPTS IN THE HEAD SECTION WITH DEFER OR ASYNC. DEFER FOR SCRIPTS THAT RELY ON HTML BEING LOADED, ASYNC FOR DATA FETCHING ETC. SO ASYNC SCRIPTS WILL EXECUTE RIGHT AFTER DOWNLOAD, DEFER WILL WAIT FOR HTML IF IT'S STILL LOADING

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    VS CODE SHORTCUTS:
    CTRL+D -> SELECT NEXT OCCURENCE. selektujemo 1 stvar i ctrl d ce da nam nadje sl reference u fajlu na tu stvar
    SHIFT+SPACE ponovo potera intelliense za tipa array.NESTO
    CTRL+SHIFT+SPACE - trigger parameter hints (helper za func parametre)
    CTRL+SHIFT+T -> reopen closed editor

    NOTE: ALWAYS DEBUG IN INCOGNITO MODE BECAUSE BROWSER EXTENSIONS CAN INTERFERE WITH THE PAGE. ALWAYS GO TO CONSOLE FIRST TO LOOK FOR ERRORS. SOURCES TAB WILL GIVE US AN INPUT INTO WHICH PART OF OUR CODE IS CAUSING ERRORS THAT THE CODE EDITOR MISSED. 
    WE CAN GET TO SOURCES DIRECTLY BY CLICKING ON ERRORS IN CONSOLE. FOR LOGICAL ERRORS - WE CAN USE CONSOLE.LOG AS THE LAST RESULT TO TRY AND TRACK WHAT'S HAPPENING
    CONSOLE.LOG TAKES AN ARBITRARY NUMBER OF PARAMS, SO WE CAN TO SMTH LIKE: Console.log('INPUT VALUES ARE:', variable1, variable2);
    SINCE CONSOLE.LOG IS A BIT TIRESOME TO USE -> CHROME DEBUGGING TOOL -> SOURCE -> WE CAN ACTUALLY DO SOME PROPER DEBUGGING. WE CAN PLACE BREAKPOINTS THERE AND ANALYZE EVERYTHING
    GOING THROUGH CALLSTACK WILL POP UP THE SCOPE AND WATCH TABS. YOU CAN CHANGE VALUES DIRECTLY IN SCOPE TO SEE IF THE CODE WILL EXECUTE CORRECTLY WITH THOSE VALUES
    RIGHT CLICKING IN SOURCE WILL LET US PLACE CONDITIONAL BPs 
    WE CAN DEBUG IN VS CODE, WE JUST NEED TO INSTALL JAVASCRIPT DEBUGGER (intall with vs code by default) OR MOZILLA DEBUGGER

    SOMETHING NEW THAT I WISH WE HAVE:
      Event Listener Breakpoints tab in chrome debugging source: we can actually tell the browser to stop the code whenever a UI event gets triggered, like click. The browser will pause at the first code we run as the click event gets raised
      
    == operator checks only values, === checks the type as well
    Strings can also be compared with greater than (>) or lower/ smaller than (<) operators.

    JavaScript compares strings based on standard lexicographical ordering, using Unicode values.

    That means that b is greater than a for example.

    JavaScript always looks at the first character and only considers other characters if the first character is similar. In addition, capital characters are considered to be smaller than lowercase characters.

    See these examples:

    'ab' > 'aa' // true
    'a' > 'B' // true
    'a' > 'b' // false

    arrays and objects will return false if checked like obj1==obj2 or obj1 === obj2 even if they have the same properties and values (reference types in js?)

    NOTE BIG BOI NOTE FUCKING JS TRASH:
    let name = "smt";
    if(name) CE DA BUDE TRUE I UCI CE U JEBENI IF JER JS AKO NEMA DODENJEN COMPARISON POKUSAVA DA PRETVORIM TIP PODATKA U BOOLEAN I AKO TO MOZE DA URADI JEBENO VRATI TRUE
    STO SE BROJEVA TICE:
    let number = 0;
    if(number) ce biti false jer uspe 0 da pretvori u bool, al bilo koji dr broj ce biti true. tako da je condition if(!userInputNumber) skroz validna sintaksa da preskonis nulu
    STRINGOVI -> prazan string je uvek false, sve ostalo true
    OBJ AND ARRAYS -> always true ako se upise samo if(obj)
    SPECIAL TYPES (null, undefined, NaN) -> uvek false
*/
