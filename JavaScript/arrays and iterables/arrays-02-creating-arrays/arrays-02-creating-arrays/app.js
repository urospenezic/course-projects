// const numbers = [1, 2, 3];
// console.log(numbers);

//const moreNumbers = new Array();
//const moreNumbers = new Array('smt, 'smt1', 'smt2');
//const moreNumbers = new Array(5,3,4,5);
//const moreNumbers = new Array(4); //length of 4
// const moreNumbers = Array(5, 2);
// console.log(moreNumbers);

// const yetMoreNumbers = Array.of(1, 2);
// console.log(yetMoreNumbers);

// const listItems = document.querySelectorAll('li');
// console.log(listItems);

// const arrayListItems = Array.from(listItems);//if passed a string it break it into a list of chars
// console.log(arrayListItems);


// const arrayCanStoreAnything = [30, 'smt', {moreDetail: []}];

// const matrix = [[1,1.6], [-5.4, 2.1]];


// const hobbies = ['cooking', 'games'];
// hobbies.unshift('coding'); //prepends to beginning
// const poppedValue = hobbies.pop();//removes the last element;
// hobbies.shift();//shifts to the left, removing the first one. shift and unshift are slower than push and pop

// //hobbies[5] = 'smt'; //it will expand the array to fit it and populate the inbetween elements with empty values
// hobbies.splice(0, 0, 'STUFF');//first element
// hobbies.splice(1, 0, 'SMT 2'); //inserted in second place. SPLICE IS USED A FUCK TON AND DOES A FUCK TON, WHICH IS WHY ARRAY.FROM() IS USEFULL, BECAUSE ARRAYS HAVE SPLICE
// //const removedElements = hobbies.splice(0,2);//removes the first 2 itens

// const removedElements = hobbies.splice(-1, 1); //removes the last element, if beggining is set to -1 it will start from the end. so -2 is valid as well


const test = [1, 3.3, 5.2, 10.2, 11, 13.9, -1.3, -10];
// //const storedResults = test.slice();// slice is usefull because it returns a new array since arrays in js are reference types. so change in one will reflect the other
// const storedResults = test.concat([0,0.1,0.2]);
// test.push(98);

// const selectRange = test.slice(0,2);

// const negativeRange = test.slice(-3, -1); //third last to last, but BOTH HAVE TO BE NEGATIVE

// const fromIndexToEnd = test.slice(2);

// //indexOf doesn't work with objects, equality comparison on objects is always false

// //for arrays that store objects we use find, simillar to where in c#

 const people = [{name: 'Somebody'}, {name: 'Somebody else'}];

// const somebodyElse = people.find((item, index, collection) => { //find passes in item, index and the collection always. the return value of find is a reference, not a copy, so direct point to item of an array
//     return item.name === 'Somebody else';
// });

// const index = people.findIndex((item, index, collection) =>{
//     return item.name ==='Somebody else';
// });

// const check = test.includes(10.99);


const add = 0.19;
// const afterAdd = [];
// test.forEach((number, index, collection)=>{
//     const obj = {index: index, price: number*(1+add)};
//     afterAdd.push(obj);
// })

//SAME CAN BE ACHIEVED VIA MAP():
const mapped = test.map((price, index, collection) => {
    const obj = {index: index, price: number*(1+add)};
    return obj;
})

const sorted = test.sort((a, b) =>{//SORT BY DEFAULT CONVERTS EVERYTHING TO STRING AHBHAHAJHASDKJAHDKJAHDS;AJHD;AJHC;AJNCA;CJNA SO WE HAVE TO GIVE IT COMPARER 
    if(a > b){
        return 1;
    }else if(a===b){
        return 0;
    }

    return -1;
});

//reverse() reverses the array

const filtered = test.filter(number => number < 3);

const sum = test.reduce((prevValue, curValue, curIndex, collection) => {//2 arguments, function and initial value. executes the fun with curValue = initialValue in the first go. returns a single item after running this function through the array
    return prevValue + curValue;
}, 0);


//STRING SHENANIGANS
const data = 'new york;10.99;2000';
const tranformed = data.split(';');

const nameFragments = ['firstName', 'lastName'];
const name = nameFragments.join(' '); //separator as argument

//DESTRUCTURING
const [firstName, lastName] = nameFragments;

//we can also do:
// const[firstName, lastName, ...restOfInfo] = nameFragments; //this way we pickup all the rest of the array elements after the 2 into this restOfInfo 


//SPREAD operator

const copiedNameFragmetns = [...nameFragments]; //copies the array withot reference, so changes in the first will not reflect second. but with objects!!! they will not be deep cloned, but referenced still 
// so i can have 2 arrays where adding elements to one does not reflect in the other, but changed to object inside of an array will be visible in both
//to avoid that (in case we want to):

const copiedAndMapped = [...people.map(person => ({name:person.name}))];

const min = Math.min(...test);

