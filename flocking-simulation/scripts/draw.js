var HEIGHT = window.innerHeight, 
	WIDTH = window.innerWidth, 
	FPS = 60, 
	SCREEN_ID = "screen",
	BACKGROUND_ID = "background";

var colors = {
    background: "#B1D4E0",
    bird: "#0C2D48",
    birdCheck: "#B6D9E5" 
};

var ctx_bg, ctx;

function initialize(){
	let background =  document.createElement("canvas");
    background.id = BACKGROUND_ID;
    background.width = WIDTH;
    background.height = HEIGHT;

    document.body.appendChild(background);

    ctx_bg = background.getContext("2d");
    
	let screen =  document.createElement("canvas");
    screen.id = SCREEN_ID;
    screen.width = WIDTH;
    screen.height = HEIGHT;

    document.body.appendChild(screen);

    ctx = screen.getContext("2d");
}

function clearScreen(){
    ctx_bg.clearRect(0, 0, WIDTH, HEIGHT);
    ctx_bg.fillStyle = colors.background;
    ctx_bg.fillRect(0, 0, WIDTH, HEIGHT);
    
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw_bird(x, y, radiusCheck, direction){
    ctx_bg.fillStyle = colors.birdCheck;
	ctx_bg.beginPath();
	ctx_bg.arc(
		x, 
		y, 
		CHECK_RADIUS, 
		0, 
		2 * Math.PI);
	ctx_bg.fill();

    ctx.fillStyle = colors.bird;
	ctx.beginPath();
	direction.mult(10);
	ctx.moveTo(x + direction.x, y + direction.y);
	direction.div(3);
	ctx.lineTo(x + direction.y, y - direction.x);
	ctx.lineTo(x - direction.y, y + direction.x);
	ctx.closePath();
	ctx.stroke();
}

function draw(birds){
    clearScreen();
	
	for(let bird of birds) {

		if(bird.position.x + bird.radiusCheck > WIDTH)
			 draw_bird(
				 bird.position.x - WIDTH, 
				 bird.position.y, 
				 bird.radiusCheck,
				 bird.velocity.getDirection()
			 );

		if(bird.position.x - bird.radiusCheck < 0)
			 draw_bird(
				 bird.position.x + WIDTH, 
				 bird.position.y, 
				 bird.radiusCheck,
				 bird.velocity.getDirection()
			 );


		if(bird.position.y + bird.radiusCheck > HEIGHT)
			 draw_bird(
				 bird.position.x, 
				 bird.position.y - HEIGHT, 
				 bird.radiusCheck,
				 bird.velocity.getDirection()
			 );

		if(bird.position.y - bird.radiusCheck < 0)
			 draw_bird(
				 bird.position.x, 
				 bird.position.y + HEIGHT, 
				 bird.radiusCheck,
				 bird.velocity.getDirection()
			 );

		 draw_bird(
			 bird.position.x, 
			 bird.position.y, 
			 bird.radiusCheck,
			 bird.velocity.getDirection()
		 );
	}
}
