var HEIGHT = window.innerHeight, WIDTH = window.innerWidth, FPS = 60, SCREEN_ID = "screen";

var colors = {
    background: "#B1D4E0",
    bird: "#0C2D48",
    birdCheck: "#B6D9E5" 
};

var canvas, ctx;

function initialize(){
    let screen =  document.createElement("canvas");
    screen.id = SCREEN_ID;
    screen.width = WIDTH;
    screen.height = HEIGHT;

    document.body.appendChild(screen);

    canvas = document.getElementById(SCREEN_ID);
    ctx = canvas.getContext("2d");
}

function clearScreen(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function draw(birds){
    clearScreen();

    for(let bird of birds){
        ctx.fillStyle = colors.birdCheck;

        if(bird.position.x + bird.radiusCheck > WIDTH){
            ctx.beginPath();
            ctx.arc(bird.position.x - WIDTH, bird.position.y, bird.radiusCheck, 0, 2 * Math.PI);
            ctx.fill();
        }

        if(bird.position.x - bird.radiusCheck < 0){
            ctx.beginPath();
            ctx.arc(bird.position.x + WIDTH, bird.position.y, bird.radiusCheck, 0, 2 * Math.PI);
            ctx.fill();
        }

        if(bird.position.y + bird.radiusCheck > HEIGHT){
            ctx.beginPath();
            ctx.arc(bird.position.x, bird.position.y - HEIGHT, bird.radiusCheck, 0, 2 * Math.PI);
            ctx.fill();
        }

        if(bird.position.y - bird.radiusCheck < 0){
            ctx.beginPath();
            ctx.arc(bird.position.x, bird.position.y + HEIGHT, bird.radiusCheck, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(bird.position.x, bird.position.y, bird.radiusCheck, 0, 2 * Math.PI);
        ctx.fill();
    }

    for(let bird of birds){
        let birdSize = 2;
        ctx.fillStyle = colors.bird;

        if(bird.position.x + birdSize > WIDTH){
            ctx.beginPath();
            ctx.arc(bird.position.x - WIDTH, bird.position.y, birdSize, 0, 2 * Math.PI);
            ctx.fill();
        }

        if(bird.position.x - birdSize < 0){
            ctx.beginPath();
            ctx.arc(bird.position.x + WIDTH, bird.position.y, birdSize, 0, 2 * Math.PI);
            ctx.fill();
        }

        if(bird.position.y + birdSize > HEIGHT){
            ctx.beginPath();
            ctx.arc(bird.position.x, bird.position.y - HEIGHT, birdSize, 0, 2 * Math.PI);
            ctx.fill();
        }

        if(bird.position.y - birdSize < 0){
            ctx.beginPath();
            ctx.arc(bird.position.x, bird.position.y + HEIGHT, birdSize, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(bird.position.x, bird.position.y, birdSize, 0, 2 * Math.PI);
        ctx.fill();
    }
}

