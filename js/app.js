/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/




/**
 * Define Global Variables
 * 
*/

const sectionElements = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();
const navbar = document.getElementById("navbar__list");



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

window.addEventListener('DOMContentLoaded',function(){window.scrollTo(0,0)})



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/* build nav */

/* get all the section */
/* insert li elements using document fragments*/
/* innerhtml = <a href = ??> data-nav(getAttribute)<a> */
function addNavList() {
    for (const elem of sectionElements) {
        const newLi = document.createElement("li");
        const newLiContent = `<a href="#" data-list=${elem.id}>${elem.getAttribute("data-nav")}</a>`;
        newLi.innerHTML=newLiContent;
        // console.log(newLi);
        fragment.appendChild(newLi);
    }
    navbar.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
/* get section offset
set element class name */

function addActiveClassToElem(){
    const navLists = document.querySelectorAll("#navbar__list li");
    for (let i = 0; i<sectionElements.length;i++){
        if (window.pageYOffset >= (sectionElements[i].offsetTop-250) && window.pageYOffset <= (sectionElements[i].offsetTop + sectionElements[i].offsetHeight-250)){
            sectionElements[i].classList.add("section-active");
            navLists[i].classList.add("navbar-active");

        }else{
            sectionElements[i].classList.remove("section-active");
            navLists[i].classList.remove("navbar-active");
        }
    }
}

function handleScrolled(){
    window.addEventListener('scroll',addActiveClassToElem);
}


function scrollToSection(event){
    if(event.target.nodeName === "A"){
        event.preventDefault();
        window.scrollTo(0,document.getElementById(event.target.getAttribute("data-list")).offsetTop);
    }

}

function handleClick(){
    navbar.addEventListener('click',scrollToSection)
}


// build the nav

addNavList();

// Add class 'active' to section when near top of viewport
handleScrolled();
handleClick();


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
