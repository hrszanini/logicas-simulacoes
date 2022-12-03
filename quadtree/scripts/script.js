var quadPoints = [], quadtree;

function createPoints(quantity){
    let points = [];

    for(let i=0; i<quantity; i++){
        let newPoint = new Point(
            Math.random() * width, 
            Math.random() * height
            );
        
            points.push(newPoint);
    }

    return points;
}

function generateAndDrawQuadtree(points){
    quadtree = new QuadTree(new Area(0, 0, height, width));
    points.map((point) => {quadtree.insert(point);})

    clearAll();
    points.map(drawPoint);
    quadtree.draw();
}

function generateMousePoint(){
    let x = window.event.clientX + Math.random();
    let y = window.event.clientY + Math.random();

    let newPoint = new Point(x, y);
    quadPoints.push(newPoint);

    console.log(`Adicionado novo ponto em (${x} : ${y})`)

    generateAndDrawQuadtree(quadPoints);
}

function restart(){
    quadPoints = createPoints(POINTS_QUANTITY);
    generateAndDrawQuadtree(quadPoints);
}

restart();