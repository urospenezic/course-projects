//alert for example comes from window. we can do window.alert() and it will do the same thing
//whitespaces, line breaks, spaces in html (line tab to indent child node) is stored as Text Node

//in chrome debugger we can see that some elements of the html have $0 or smth simillar
//this is used to quickly select elements from the console in chrome dev tools like:
/*
    console.dir($0);


    querying:
    querySelector(), getElementById() -> return single element, can query by CSS selector, id... direct ref to DOM element is returned!
    querySelectorAll(), getElementsByTagName() -> collection of elements NodeList. query by css selector, tag name, css class.. queryselectorall returns a snapshot of DOM, not direct reference, changed will not be reflected. getElementBy.. will return a direct ref

    once we fetch one element via document.getElementByWhatever() we get a ref to element which then only has querySelector() and querySelectorAll(), not getby
    THIS IS BECAUSE GETBY AL KINDA DEPRECATED, EVERYONE JUST USES QUERYSELECTORSm the only excpetion being getElementById

    SO QUERY SELECTOR ALL TAKES IN ANY ARGUMENT, WE JUST HAVE TO USE IT LIKE CSS REFS, so querySelector('#SMT') for IDs, ('.Smt-Smt) for class etc
    query selector can get complex, like document.querySelector('ul li:first-of-type'); - to get the first occurence of list item in a list

    Summary: Node Query Methods
Here's a summary of the various methods you got to reach out to DOM elements (note: you can only query for element nodes).

Besides the below query methods, you also got these special properties on the document object to select parts of the document:

document.body => Selects the <body> element node.

document.head => Selects the <head> element node.

document.documentElement => Selects the <html> element node

---

QUERY METHODS

---

document.querySelector(<CSS selector>);
Takes any CSS selector (e.g. '#some-id', '.some-class' or 'div p.some-class') and returns the first (!) matching element in the DOM. Returns null if no matching element could be found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

document.getElementById(<ID>);
Takes an ID (without #, just the id name) and returns the element that has this id. Since the same ID shouldn't occur more than once on your page, it'll always return exactly that one element. Returns null if no element with the specified ID could be found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById

document.querySelectorAll(<CSS selector>);
Takes any CSS selector (e.g. '#some-id', '.some-class' or 'div p.some-class') and returns all matching elements in the DOM as a static (non-live) NodeList. Returns and empty NodeList if no matching element could be found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

document.getElementsByClassName(<CSS CLASS>);
Takes a CSS class g (e.g. 'some-class') and returns a live HTMLCollection of matched elements in your DOM. Returns an empty HTMLCollection if not matching elements were found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName

document.getElementsByTagName(<HTML TAG>);
Takes an HTML tag (e.g. 'p') and returns a live HTMLCollection of matched elements in your DOM. Returns an empty HTMLCollection if not matching elements were found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName

There also is the getElementsByName() method which really isn't used commonly (https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName).

==================================================================================================================================================================
    accessing styling stuff in an element like:
    let h1 = document.querySelector('h1');
    h1.style.backgroundColor = 'red';
    h1.style.color ='white';

    FOR THE FULL LIST OF PROPERTIES ON AN ELEMENT, ITS BEST TO GET ONTO CHROME DEV TOOLS AND CONSOLE.DIR THE ELEMENT OR GO TO MSDN AND FIND H1 -> SCROLL DOWN AND YOU'LL SEE DOM INTERFACE FOR LIKE HTMLHeadingElement -
     click that and theres a list of props and methods


     setAttribute('attribute', 'value for attribute);

=========================================================================================================================================================================================

    TRAVERSING THE DOM:
    parentNode, parentElement, closest(), childNodes, children, querySelector(), firstChild, firstElementChild, lastChild, lastElementChild, previousSibling, previousElementSiblin, nextSibling, nextElementSibling

    // select secon list item for example:

    const ul = document.querySelector('ul');

    ul.children[1];//text nodes are excluded from children automatically here

    ul.childNodes //selects text nodes as well

    //for parent traversal:

    const liFirst = document.querySelector('li');

    liFirst.parentNode //acess to parent node, same as parentEleemnt

    liFirst.closest('body'); //searches the visual tree upwards till it finds the element

    //previousSibling will hit textNodes, previousElemenetSibling will hit actual html elements

=============================================================================================================================================================================================
    STYLING DOM:

    1. via style property - overrides any existing styles because it directly hits the css styles on the element
    2. via css class name = directly set css class and so the style updates auto
    3. via classList - add/remove/toggle css classes

    textContent!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! retrievs all of the text from all of the child nodes!!!!!!!!!!!!!!!!!!!!!!!!!

    CREATING ELEMENTS:
    1. via html strings -> innderHtml ALL CONTENT CHANGED LIKE THIS IS RERENDERED SO THE USER INPUT CONTENT IS LOST (IMPORTANT FOR INPUT CONTROLS ETC) -> add (render) html string 
    || insertAdjacentHTML() - add string in specific position  WILL NOT CAUSE THE WHOLE RENDER SO THE INPUT AINT LOST
    2. createElement() -> appendChild() || append() prepend() before() after() inserBefore() replaceChild() replaceWith()
    3
    One downside of directly injecting html is that we do not get the direct ref to the content we've added, but we have to requery for it

    REMOVING:

    remove()
    removeChild()
    
*/

const section = document.querySelector('section');
const list = section.querySelector('ul');
var btn = document.querySelector('button');

section.className = 'red-bg';

btn.addEventListener('click', () =>{
    //NOTE: THIS IS A BIT TOO HARDCODED
    // if(section.className === 'red-bg visible'){
    //     section.className = 'red-bg hidden';
    //     return;
    // }
    // section.className = 'red-bg visibble';

    //this is better
    section.classList.toggle('hidden');//requires presetting visible on the html. if that is not set, add another line with toggle('visible');
})

const liItems = list.querySelectorAll('li');

const listItems2 = list.getElementsByTagName('li');

const newLi = document.createElement('li');
newLi.textContent ='added item';
list.appendChild(newLi);
//NOTE: AFTER INSERTION liItems WILL NOT REFLECT THE CHANGE, BECAUSE IT'S A SNAPSHOP, SO WE'LL HAVE TO REQUERY. STILL BETTER TO USE QUERYSELECTORALL
//NOTE: INSERTING SELECTED ELEMENT MULTIPLE TIMES DOES NOT COPY IT - IT MOVES IT. we'll have to node.cloneNode(bool deepClone);
//we can also do list.lastElementChild.before(newLi) or after(newLi);//NOTE!!!!!!!!!! BEFORE AND AFTER DO NOT WORK IN SAFARI, SO IT'S SAFER TO USE inserAdjacentElement. ALWAYS CHECK DOCUMENTATION FOR BROWSER SUPPORT
//append() will insert anythign we pass in, like just plain text nodes + append() is not supported in IE, other browsers support it. this is newer than appendChild()




