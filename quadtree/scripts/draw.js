var ctx, height, width;

function canvas(){
    height = document.documentElement.clientHeight; 
    width = document.documentElement.clientWidth;

    let canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;

    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
}

function clearAll(){
    ctx.clearRect(0, 0, width, height);
}

function drawQuadtree(quadtree){
    color = QUADTREE_COLOR;

    ctx.strokeStyle = color;
    ctx.strokeRect( quadtree.area.x , quadtree.area.y, quadtree.area.w, quadtree.area.h);
}

function drawPoint(point){
    let x = point.x;
    let y = point.y;
    let color = POINT_COLOR;
    let size = POINT_SIZE;

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(
        x, 
        y,
        size/2, 
        0*Math.PI, 
        2*Math.PI);
    ctx.fill();
}

canvas();