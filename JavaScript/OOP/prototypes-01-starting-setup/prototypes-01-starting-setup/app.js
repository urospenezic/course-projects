//CONSTRUCTOR FUNCS:
class AgedPerson{
    printAge(){
        console.log(this.age);
    }
}

class Person extends AgedPerson{
    name ='Smt';

    constructor(){
        this.age = 30;
    }

    /* THIS IS ACTUALLY A PERFORMANCE HIT BECAUSE THIS GREET FUNCTION WILL GET GENERATED OVER AND OVER AGAIN FRO EACH OBJECT INSTANTIATION
    greet = function(){
         console.log('hello');
    }


    KEEP IN MIND THOUGH THAT THE PERF HIT IS NOT THAT MUCH, SO WRITING THIS:
    geet = () => { doSmt;}
    TO AVOID HAVING TO .bind() EACH METHOD CALL COULD STILL BE WORTH, DEPENDING OF PERSONAL PREFERENCE

    */

    greet(){
        console.log('hello');
    }
}

//behind the scenes this will trasnlate to a CONSTRUCTOR FUNCTION:
//classes are sugar coating on top of constructor funcs

// function Person(){
//     this.age = 30;
//     this.name ='smt';

//     this.greet(){
//         'hello';
//     };
// };
//BAD WAY TO OVERRIDE THE WHOLE PROTOTYPE
// Person.prototype = {//this will happen whenever we say "extends"
//     printAge(){
//         console.log(this.age):
//     }
// };

// Person.prototype.printAge = function(){
//     console.log(this.age);
// };


// let smt = new Person();//executes the constructor func. what it does is embeds "this = {}; and ads all the "properties" to the created anonymous object

// smt.greet();

//PROTOTYPES:

//every constructor func has an inherited hidden .prototype property and is automatically added to the object initialized via the constructor func
//prototype is an object
//prototypes are the way js shares code for inheritance and object initialization
//protypes are basically fallback objects:
/*
so in this scenario if we have a constructor func like Person above and we instatiate an object derived from that func and we try this:

person.sayHello();// this will not immediatelly fail because the js will try to search for that func in the prototype object.
if it doesnt find it there, it will look at the prototype of the protoype (every obj has a prototype)

so the code from parent classes to children is inherited via the invisible prototype object

so the toString() method is derived to each object via the prototype. JS also has the Global Object (constructor func) that has the default stuff like toString() -> the end of prototype chain is Object.prototype!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NOT THE Object itself

WE CAN DIG THROUGH PROTOTYPES IN DEBUGGER VIA LOOKING AT __proto__ property on any obj

prototype obj exists on constructor funcs as well as __proto__ 

__proto__ points to prototype obj of the constructor function that created the object\
prototype object is available for constructor funcs and is a way to say "any object derived from this constructor func has this feature"
*/


//const p = new Person();
//console.log(p); //we'll see that it has a __proto__ pointing to AgedPerson object and that THAT PROTOYPE has the greet method, not our Person class? ALSO THE __proto__ of agedPerson is an anonymous object that stores it's method "printAge". so all methods are bubbled up 1 level by prototypes
//values of properties and fields will be at the same level though 
/*
THIS IS DONE BECAUSE YOU'LL WANT DIFFERENT DATA IN PROPERTIES AND FIELDS, BUT METHODS ARE ALWAYS THE SAME, THEY JUST REFER TO THE DATA AND TO THE SAME THING
so prototype bubbling is a little optimization 
LIKE:
const p2 = new Person();
p.__proto__ === p2.__proto__ will be true, so they will point to the same block of memory for prototype (which will have a greet method only). so whenever we create a new person object, only properties are generated over and over again, methods are all stored in the same memory block

to achieve the same behaviour with constructor funcs we do:

funstion Person(){
    this.age = 30;
    this.smt = 'smt';
}

Person.prototype.greet = function () {doSmt;};
*/

const course = {
    title: 'js',
    rating: 5
};

course.log(course.__proto__);

//CHANGING PROTOTYPE FOR AND OBJECT THAT HAS ALREADY BEEN CREATED:
Object.setPrototypeOf(course, {
    ...Object.getPrototypeOf(course),//keep all of the existing functionalities
    printRating: function(){
        console.log(`${this.rating}`);
    }
});

const student = Object.create({
    printProgress: function(){
        console.log(this.progess);
    }
});

course.printRating();