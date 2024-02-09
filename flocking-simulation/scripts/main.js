var NUMBER_OF_BIRDS = 100, 
	MAX_VELOCITY = 1, 
	MAX_ACCELERATION = 1/100,
	PROPORTION = 1/100,
	CHECK_RADIUS = 50, 
	COHESION_RATIO, 
	ALIGN_RATIO, 
	SEPARATE_RATIO;

var flock = [];
const configuration = {
	cohesion: {
		label: document.getElementById("cohesion-label"),
		range: document.getElementById("cohesion"),
		checkbox: document.getElementById("cohesion-active")
	},
	alignment: {
		label: document.getElementById("alignment-label"),
		range: document.getElementById("alignment"),
		checkbox: document.getElementById("alignment-active")
	},
	separation: {
		label: document.getElementById("separation-label"),
		range: document.getElementById("separation"),
		checkbox: document.getElementById("separation-active")
	},
	vision: {
		label: document.getElementById("vision-label"),
		range: document.getElementById("vision"),
		checkbox: document.getElementById("vision-active")
	},
	birds_number: document.getElementById("birds-number"),
	colors: {
		bird: document.getElementById("bird-color"),
		background: document.getElementById("background-color"),
		vision: document.getElementById("vision-color")
	}
}

function updateLabel(prefix){
	configuration[prefix].label.innerHTML = configuration[prefix].range.value;
}

function updateCheckbox(prefix){
	if(!configuration[prefix].checkbox.checked) {
		configuration[prefix].checkbox.value = configuration[prefix].range.value;
		configuration[prefix].range.value = 0;
		configuration[prefix].range.disabled = true;
	} else {
		configuration[prefix].range.value = configuration[prefix].checkbox.value;
		configuration[prefix].range.disabled = false;
	}

	updateLabel(prefix);
}

configuration.cohesion.range.addEventListener("input", ()=>{updateLabel("cohesion")} );
configuration.cohesion.checkbox.addEventListener("change", ()=>{updateCheckbox("cohesion")} );

configuration.alignment.range.addEventListener("input", ()=>{updateLabel("alignment")} );
configuration.alignment.checkbox.addEventListener("change", ()=>{updateCheckbox("alignment")} );

configuration.separation.range.addEventListener("input", ()=>{updateLabel("separation")} );
configuration.separation.checkbox.addEventListener("change", ()=>{updateCheckbox("separation")} );

configuration.vision.range.addEventListener("input", ()=>{updateLabel("vision")} );
configuration.vision.checkbox.addEventListener("change", ()=>{updateCheckbox("vision")} );


function populateFlock(){
    let newFlock = [];
	let id = 0;

    for(let i=0; i < NUMBER_OF_BIRDS; i++){
        newFlock.push(
			new Bird(++id).random(0, 0, WIDTH, HEIGHT, 1)
		);
    }

    flock = newFlock;
}

function updateFlock(){
    let flockCopy = deepCopy(flock);

    COHESION_RATIO = configuration.cohesion.range.value * PROPORTION;
    ALIGN_RATIO = configuration.alignment.range.value * PROPORTION;
    SEPARATE_RATIO = configuration.separation.range.value * PROPORTION;
    
	CHECK_RADIUS = configuration.vision.range.value;
	NUMBER_OF_BIRDS = configuration.birds_number.value;

    colors.bird = configuration.colors.bird.value;
    colors.background = configuration.colors.background.value;
    colors.birdCheck = configuration.colors.vision.value;

    for(let bird of flockCopy){
        bird.update(flock);
        bird.position.cycle(0, 0, HEIGHT, WIDTH);
    }

    flock = flockCopy;
    draw(flock);
}

function deepCopy(birdList){
    let newBirdList = [];
	let id = 0;
    for(let bird of birdList){
        let newBird = new Bird(++id);

        newBird.position = new Vector2D(bird.position.x, bird.position.y);
        newBird.velocity = new Vector2D(bird.velocity.x, bird.velocity.y);
        newBird.acceleration = new Vector2D(bird.acceleration.x, bird.acceleration.y);

        newBirdList.push(newBird)
    }

    return newBirdList;
}

initialize();
populateFlock();
setInterval(updateFlock, 1000/FPS);
