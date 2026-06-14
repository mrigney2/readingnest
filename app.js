import data from "./stories.json" with { type:'json' };

const lastStory = data.stories.length - 1;

// most recent story displayed first
let currentIndex = lastStory;

let prevIndex;
let currentStory;
let currentView = "story";

// renders story
function renderStory() {
    currentStory = data.stories[currentIndex];

     // fade in 
    // document.getElementById("page").style.opacity = 0;
    // setTimeout(() => {
    //     document.getElementById("page").style.opacity = 1;
    // }, 600)
    document.getElementById("page").scrollTop = 0;
    document.getElementById("page").textContent = currentStory.title + " - " + currentStory.createdAt + "\n\n" + currentStory.content;
    // setTimeout(() => {
    //     document.getElementById("page").textContent = currentStory.title + " - " + currentStory.createdAt + "\n\n" + currentStory.content;
    // }, 601)

    document.getElementById("menu").style.setProperty("--bottom-border", "2px");
    currentView = "story";
}

// renders table of contents
function renderMenu() {
    // create list
    let tableofContents = document.createElement('ul');
    tableofContents.style.listStyleType = "square"

    // add each story as list item 
    data.stories.forEach((story, index) => {
        const li = document.createElement('li');

        // add marker to currently selected story
        if (story.title === currentStory.title) {
            li.textContent = story.title;
            li.style.textDecoration = "underline solid 2px";
        }
        else {
            li.textContent = story.title;
        }

        // when list item is clicked, navigate to story
        li.addEventListener("click", () => {
            currentIndex = index;
            renderStory()
        });

        // add item to list in reverse order (i.e. newest to oldest)
        tableofContents.prepend(li);
    });

    // render list
    document.getElementById("page").textContent = "Table of Contents";
    document.getElementById("page").appendChild(tableofContents);
}

// navigates to previous story
function prevStory() {
    // goes to end if on first story
    if (currentIndex === lastStory) {
        currentIndex = 0;
    }
    else {
        currentIndex = currentIndex + 1;
    }
    renderStory(currentIndex);
}

// navigates to next story
function nextStory() {
    // goes to beginning if on last story
    if (currentIndex === 0) {
        currentIndex = lastStory;
    }
    else {
        currentIndex = currentIndex - 1;
    }
    renderStory(currentIndex);
}

// navigates to table of contents
function menu() {
    if (currentView === "story") {
        currentView = "menu";
        renderMenu()
        document.getElementById("menu").style.setProperty("--bottom-border", "4px");
    }
    else {
        currentView = "story";
        document.getElementById("page").textContent = currentStory.title + " - " + currentStory.createdAt + "\n\n" + currentStory.content;
    }
}

// navigates to random story
function shuffle() {
    let randomNum = Math.random();
    let newIndex = 0;
    if (randomNum > 0.5) {
         newIndex = Math.ceil(randomNum * lastStory);
    }
    else {
        newIndex = Math.floor(randomNum * lastStory);
    }

    // makes sure different story will render than current & previous shuffle
    if (currentIndex == newIndex || prevIndex == newIndex) {
        shuffle();
    }
    else {
        prevIndex = currentIndex;
        currentIndex = newIndex;
        renderStory();
    }
}

// initial loading 
window.addEventListener('load', () => {

    // display loading for 3s
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 3000);

    // load in vidoe
    setTimeout(() => {
        document.getElementById("vid").style.opacity = 1;
    }, 3000);

    // load in book
    setTimeout(() => {
        document.getElementById("book").style.opacity = 1;
        document.getElementById("book").style.transform = "translateY(0px)";
        renderStory();
    }, 3400);

    // load in footer
     setTimeout(() => {
        document.getElementById("prev").style.transform = "translateY(0px)";
        document.getElementById("prev").style.opacity = 1;
    }, 4700);

    setTimeout(() => {
        document.getElementById("menu").style.opacity = 1; 
        document.getElementById("shuffle").style.opacity = 1;
        document.getElementById("menu").style.transform = "translateY(0px)";
        document.getElementById("shuffle").style.transform = "translateY(0px)";
    }, 4950);

    setTimeout(() => {
        document.getElementById("next").style.opacity = 1;
        document.getElementById("next").style.transform = "translateY(0px)";
    }, 5200);
});

// // load video
// document.getElementById("vide").play();


// footer buttons
document.getElementById("prev").addEventListener("click", prevStory);

document.getElementById("menu").addEventListener("click", menu);
document.getElementById("shuffle").addEventListener("click", shuffle);

document.getElementById("next").addEventListener("click", nextStory);