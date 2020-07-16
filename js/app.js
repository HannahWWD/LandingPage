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


/* define global variables */

const sectionElements = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();
const navbar = document.getElementById("navbar__list");
const navMenu = document.querySelector(".navbar__menu");
const expandIcon = document.querySelector("#expand-icon");
const collapseIcon = document.querySelector("#collapse-icon");
const topBtn = document.querySelector(".back-to-top");
const tagLengthLimit = 10;
const header = document.querySelector("header");
let isScrolling;
let mouseInNav = false;

/* this is to prevent the live server from remembering the viewport position.
So that the viewport will back to default position(0,0) after refreshing  */

history.scrollRestoration = "manual";



/* ****************
helper functions
***************** */

/* limit tag name length -
 make sure tag names in the navigation bar won't exceed certain characters */
limitTagLength = (tagName) => {
    if (tagName.length > tagLengthLimit) {
        shortTagName = tagName.slice(0, tagLengthLimit - 1) + "...";
        return shortTagName;
    } else {
        return tagName;
    }
}

/* decide if full tag name should be shown:
   based on if the navigation bar is expanded or collapsed */

displayFullNavTags = (navIsExpended) => {
    for (let i = 0; i < sectionElements.length; i++) {
        const navLink = navbar.children[i].querySelector("a");
        const fullTagName = sectionElements[i].getAttribute("data-nav");
        if (navIsExpended) {
            navLink.textContent = fullTagName;
        } else {
            navLink.textContent = limitTagLength(fullTagName);
        }
    }
}




/*****************
main functions for navigation bar  
******************/

/* build navigation bar 
   (add navigation tags based on section titles) */

addTagLists = () => {
    for (const elem of sectionElements) {
        const newLi = document.createElement("li");
        const fullTagName = elem.getAttribute("data-nav");
        /* make sure the section title in the navigation bar won't exceed certain characters */
        const displayTagName = limitTagLength(fullTagName);
        const newLiContent = `<a href="#" data-list=${elem.id}>${displayTagName}</a>`;
        newLi.innerHTML = newLiContent;
        fragment.appendChild(newLi);
    }
    navbar.appendChild(fragment);
}


addTagLists();


/* expand and collapse nav bar 
   onclicking the expand/collapse icons */
expandNav = () => {
    navMenu.classList.add("expand-menu"); // expand menu
    expandIcon.classList.add("hidden"); //hide expand icon
    collapseIcon.classList.remove("hidden"); //show collapse icon
    displayFullNavTags(true); // show full navigation tag names
}


collapseNav = () => {
    navMenu.classList.remove("expand-menu"); //collapse menu
    collapseIcon.classList.add("hidden"); // hide collapse icon
    expandIcon.classList.remove("hidden"); //show expand icon
    displayFullNavTags(false); // don't show full nabigation tag names
}


/* Add class 'active' to section when near top of viewport */
addActiveClassToElem = () => {
    const navLists = document.querySelectorAll("#navbar__list li"); //select tags (li)
    for (let i = 0; i < sectionElements.length; i++) {
        // if scroll to section top, add active class
        // -250px is to add flexibility
        if (window.pageYOffset >= (sectionElements[i].offsetTop - 250) && window.pageYOffset <= (sectionElements[i].offsetTop + sectionElements[i].offsetHeight - 250)) {
            sectionElements[i].classList.add("section-active");
            navLists[i].classList.add("navbar-active");

        } else {
            // if scroll to other sections, remove active class
            sectionElements[i].classList.remove("section-active");
            navLists[i].classList.remove("navbar-active");
        }
    }
}


/* scroll to section while clicking designated nav tags */
scrollToSection = (event) => {
    if (event.target.nodeName === "A") {
        event.preventDefault();
        window.scrollTo(0, document.getElementById(event.target.getAttribute("data-list")).offsetTop - 100);
    }

}




/* ****************
main functions for back to top button (all event related)
***************** */

/* display back to top button when below the fold */
showBackTopBtn = () => {
    // if scroll to the area below the fold
    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
        topBtn.classList.remove("hidden");
    } else {
        topBtn.classList.add("hidden");
    }
}


/* onclick, scroll to top  */
scrollToTop = () => {
    /* reference:  https://www.w3schools.com/howto/howto_js_scroll_to_top.asp */
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}





/* *****************
 events 
 ************ */

/* on scroll */
window.addEventListener('scroll', addActiveClassToElem);
window.addEventListener("scroll", showBackTopBtn);

/* onclick */
navbar.addEventListener('click', scrollToSection)
expandIcon.addEventListener("click", expandNav)
collapseIcon.addEventListener("click", collapseNav)
/* the onclick() event for the back to top button is written in the html file */
/* <button class="back-to-top hidden" onclick="scrollToTop()"> */




/* ******************
the following section is for "hide menu while user not scrolling"
Although it works well but I don't think this feature is redundant
uncomment the whole  section to check out how it works
*************** */


/*
hideShowNav = (event) => {
    //prevent functions in setTimeOut fired while scrolling (prevent hiding navbar)
    window.clearTimeout(isScrolling);
    header.style.top="0";

    //hide navbar if not scrolling and mouse if not inside
    isScrolling = setTimeout(function(){
        if (mouseInNav == false){
        header.style.top= `-${header.offsetHeight}px`;}
    },2000)

}


// if mouse inside or has clicked the navbar, then keep the navbar displaying
toggleMouseInNav = () => {
    mouseInNav = true;
    // reset after 3s
    setTimeout(function(){
    mouseInNav = false;},3000);
}
header.addEventListener("mouseover",toggleMouseInNav)
header.addEventListener("click",toggleMouseInNav)
window.addEventListener("scroll",hideShowNav);
*/
