const TOGGLE = document.querySelector('button');
const CHEST = document.querySelector('.chest');
const RECT = document.querySelector('.nav-rect');
const themeSwitch = document.getElementById('themeSwitch');
const root = document.documentElement;

// Function to toggle light and dark themes
function toggleTheme() {
	if (themeSwitch.checked) {
		//Dark mode
		root.style.setProperty('--bg-color', 'hsl(0 0% 6%)');  // background color
		root.style.setProperty('--text-color', 'white'); // text color
		root.style.setProperty('--svg-color', 'hsl(0 0% 98%)');// svg color
		root.style.setProperty('--menu-bg-color', '#181D27');// menu background color
		root.style.setProperty('--project-card-color', '#2b2b2b');// project cards background color
		root.style.setProperty('--button-border', 'hidden');// button border nonexistent!!
		//^^^^ FIGURE OUT HOW TO MAKE IT GONE
	} else {
		//Light mode
		root.style.setProperty('--bg-color', '#FFFDF3'); // Light mode background color
		root.style.setProperty('--text-color', 'black');  // Light mode text color
		root.style.setProperty('--svg-color', 'hsl(0, 0%, 12%)'); //Light mode svg color
		root.style.setProperty('--menu-bg-color', '#FFFDF3');// light mode menu background color
		root.style.setProperty('--project-card-color', '#FFFEF7');// Light mode project cards background color
		root.style.setProperty('--button-border', '2px solid var(--button-fg)');// Light mode button border exists!!
	}
}

themeSwitch.addEventListener('change', toggleTheme);

// Set initial state: move chest off-screen to the left
gsap.set([CHEST, RECT], { x: '-185%'});
// Use GSAP timeline for smoother animation
const timeline = gsap.timeline();

const HANDLE_TOGGLE = () => {
  TOGGLE.setAttribute('aria-pressed', TOGGLE.matches('[aria-pressed=true]') ? false : true);
  const isPressed = TOGGLE.matches('[aria-pressed=true]');

  if (isPressed) {
	// Move the chest back on-screen from the left
	on();
	// if (themeSwitch.checked) {
	// 	root.style.setProperty('--svg-color', 'hsl(0 0% 12%)');// Light mode svg color
	// }
  } else {
	// Move the chest off-screen to the left
	off();
	//reset all drawers preference to 200 or 300? 300 keeps drawer open, 200 closes it
	setTimeout(resetDrawers, 250);
	// if (themeSwitch.checked) {
	// 	root.style.setProperty('--svg-color', 'hsl(0 0% 98%)');// Dark mode svg color
	// }
  }
};

//automatic logo scrolling
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

//automatic drawer menu scrolling
//I want to have top drawer scroll to my about section but about me, projects and contact me looks weird on drawers
const homeDrawer = document.querySelector('.chest-drawer--top');
const projectsDrawer = document.querySelector('.chest-drawer--middle');
const contactDrawer = document.querySelector('.chest-drawer--bottom');
const projectsButton = document.querySelector('.projects-button');
const scrollOffset = 6.5;
homeDrawer.addEventListener('click', function () {
    const home = document.querySelector('.item-header'); //about or item-header
    home.scrollIntoView({ behavior: 'smooth' });
	HANDLE_TOGGLE();
});
projectsDrawer.addEventListener('click', function () {
    const projects = document.querySelector('.projects');
    projects.scrollIntoView({ behavior: 'smooth' });
	HANDLE_TOGGLE();
});
contactDrawer.addEventListener('click', function () {
    const footer = document.querySelector('.item-footer');
    footer.scrollIntoView({ behavior: 'smooth' });
	HANDLE_TOGGLE();
});
projectsButton.addEventListener('click', function () {
    const projects = document.querySelector('.projects');
    projects.scrollIntoView({ behavior: 'smooth' });
});

//Get this to work only when on about me page
// homeDrawer.addEventListener('click', function () {
//     location.href='index.html';
// });
// projectsDrawer.addEventListener('click', function () {
//     location.href='about.html';
// });
// contactDrawer.addEventListener('click', function () {
//     location.href='project.html';
// });

//menu open button
TOGGLE.addEventListener('click', HANDLE_TOGGLE);

function on() {
	document.body.style.overflow = "hidden";
	document.getElementById("overlay").style.display = "block";
	// Use getElementsByClassName to get a collection of elements
    var itemHeaders = document.getElementsByClassName("item-header");

    // Iterate through the collection and set the background for each element
    for (var i = 0; i < itemHeaders.length; i++) {
        // itemHeaders[i].style.background = "#C6C7C6";
    }
	timeline.to([CHEST, RECT], { x: '0%', duration: 0.5, ease: 'power2.out'});
}
  
function off() {
	document.body.style.overflow = "auto";
	document.getElementById("overlay").style.display = "none";

	// Use getElementsByClassName to get a collection of elements
	var itemHeaders = document.getElementsByClassName("item-header");

	// Iterate through the collection and set the background for each element
	for (var i = 0; i < itemHeaders.length; i++) {
		// itemHeaders[i].style.background = "#FFFDF3";
	}
	timeline.to([CHEST, RECT], { x: '-185%', duration: 0.5, ease: 'power2.in', });
}

// Reset all drawers to initial stages
function resetDrawers() {
    var drawerDetails = document.querySelectorAll('.chest-drawer details');
    drawerDetails.forEach(detail => {
        detail.removeAttribute('open');
    });
}

//Header
$(function() {
	var message = {
		message: [
			'Software Engineer.',
			'Hackathon Winner.',
			'Student Athlete.',
			'Full Stack Developer.',
			'Teaching Assistant.',
		],
		counterS: 0,
		counterL: 0,
		deleteS: false,

		init: function() {
			this.cacheElem();
			this.type();
		},

		cacheElem: function() {
			this.$text = $('.text');
		},

		type: function() {
			var message 	= this.message[this.counterS],
				  that 	    = this,
				  speed 	  = 0;

            // Check if the current message is "____" and stop deleting
			if (this.message[this.counterS] === 'Welcome ' && this.counterL >= message.length - 1 && !this.deleteS) {
				this.deleteS = true; // Set deleteS to true to stop further deletion
                setTimeout(function () {
                    that.hideCursor(); // Call the function to hide the cursor after a delay
                  }, 2700);
				return;
			}

			message = !this.deleteS ? message.slice(0, ++this.counterL) : message.slice(0, --this.counterL);
			if(this.message[this.counterS] != message && !this.deleteS) {
				this.$text.text(message);
				speed = 90;
			}
			else {
				this.deleteS = true; 
				speed = this.message[this.counterS] == message ? 2000 : 60;
				this.$text.text(message);
				if (message == '') {
					this.deleteS = false;
					this.counterS = this.counterS < this.message.length - 1 ? this.counterS + 1 : 0;
				}
			}
			setTimeout(function(){that.type()}, speed);
		},
            hideCursor: function () {
          // Hide the cursor
          $('.cursor').css('visibility', 'hidden');
        },
      };
	message.init();
});

//preloader
var loader = document.getElementById("preloader");
        window.addEventListener("load", function() {
            loader.style.display = "none";
            document.body.style.overflow = "auto";
})

//buttons
const UPDATE = ({ target, x, y }) => {
    const bounds = target.getBoundingClientRect();
    target.style.setProperty("--x", x - bounds.left);
    target.style.setProperty("--y", y - bounds.top);
  };
  
  const BTNS = document.querySelectorAll("button");
  BTNS.forEach(BTN => BTN.addEventListener("pointermove", UPDATE));

  //Project Cards
  console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
