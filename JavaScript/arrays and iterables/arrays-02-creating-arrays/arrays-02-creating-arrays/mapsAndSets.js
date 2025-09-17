//============================================ MAPS AND SETS =========================================================================================

//hash maps and hash sets, same shit

const ids = new Set([1,2,3]);

if(ids.has('Hi')){
    //do stuff lik
    ids.delete('Hi');
}

for(const entry of ids.entries()){//can also use ids.values()
    //iterate over set values
}


//-------------------------------------------------------------
// KEYS CAN BE ANYTHING, WE CAN STORE AN INT KEY IN ONE ROW AND STRING IN THE NEXT
const person1 = {name: 'someone'};
const person2 = {name: 'someoneElse'};

const personData = new Map([[person1, [{date:'yesterday', price:10}]]]);
console.log(personData);
const value = personData.get(person1);

personData.set(person2, [{date: 'two weeks ago', price:2}]);

for(const [key, value] in personData.entries()){//we can do personData.keys() .values()...
    //do stuff
}

//------------------------ WEAK SETS AND MAPS ---------------------------------------------------
let person = {name:'someone'};
const peeps = new WeakSet();
peeps.add(person);

//weak set internally stores object so that they can destroy/release them if we do not work with them. so if we eventually don't work with this data, weak sets and maps will let the garbage collector pick em up. so doesn't hold onto something you're not pulling
//from it. it will be deleted
//so if i
person = null;

//and never use it again in the code, it will be removed from the WeakSet and picked up by GC. that will not happen with normal Set, it will hold on to it

//same shit and syntax for WeakMap();



const data = [1, 50, -2, 30, 5, 20, 39029, 129, 25, 4, -10, 0, -1.3, 4.5];

const filtered = data.filter(num => (num > 5)).map(num => ({number: num})).reduce((prev, curr) => {
    return prev.number * curr.number;
}, {number: 1});

const findMax = (...arr) => Math.max(...arr);
