var NUMBER_OF_BIRDS = 100, 
	MAX_VELOCITY = 5, 
	CHECK_RADIUS = 50, 
	COHESION_FORCE, 
	ALIGN_FORCE, 
	SEPARATE_FORCE;

var flock = [];

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

    COHESION_FORCE = document.getElementById("cohesion").value;
    ALIGN_FORCE = document.getElementById("alignment").value;
    SEPARATE_FORCE = document.getElementById("separation").value;
    
	CHECK_RADIUS = document.getElementById("check_radius").value;
	NUMBER_OF_BIRDS = document.getElementById("birds_number").value;

    colors.bird = document.getElementById("bird").value;
    colors.background = document.getElementById("background").value;
    colors.birdCheck = document.getElementById("vision").value;

    for(let bird of flockCopy){
        bird.update(flock);
        bird.position.cycle(0, 0, HEIGHT, WIDTH);
    }

    flock = flockCopy;
    draw(flock);

    setTimeout(updateFlock, 1000/FPS);
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
updateFlock();
