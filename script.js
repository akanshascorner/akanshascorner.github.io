const TOGGLE = document.querySelector('button');
const CHEST = document.querySelector('.chest');
const RECT = document.querySelector('.nav-rect');

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
  } else {
	// Move the chest off-screen to the left
	off();
	//reset all drawers preference to 200 or 300? 300 keeps drawer open, 200 closes it
	setTimeout(resetDrawers, 250);
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
// const scrollOffset = 6.5;
homeDrawer.addEventListener('click', function () {
    const home = document.querySelector('.about');
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

//menu open button
TOGGLE.addEventListener('click', HANDLE_TOGGLE);

function on() {
	document.body.style.overflow = "hidden";
	document.getElementById("overlay").style.display = "block";
	// Use getElementsByClassName to get a collection of elements
    var itemHeaders = document.getElementsByClassName("item-header");

    // Iterate through the collection and set the background for each element
    for (var i = 0; i < itemHeaders.length; i++) {
        itemHeaders[i].style.background = "#C6C7C6";
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
		itemHeaders[i].style.background = "#F7F9F7";
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
			'Hello World',
            'Welcome '
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

            // Check if the current message is "Akansha Codes" and stop deleting
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
				speed = this.message[this.counterS] == message ? 1000 : 60;
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