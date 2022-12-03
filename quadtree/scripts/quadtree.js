class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Area {
    constructor(x, y, h, w){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }
}

class QuadTree {
    constructor(area){
        this.area = area;
        this.points = [];
        this.subdivided = false;
    }

    insert(newPoint){
        if(this.points.length < QUADTREE_CAPACITY && !this.subdivided)
            this.points.push(newPoint);
        else {
            this.subdivide();
            this.points.push(newPoint);
            this.points.map((point) => this.subinsert(point));
            this.points = [];
        }
    }

    subdivide(){
        if(!this.subdivided){
            this.UL = new QuadTree(
                new Area(this.area.x, this.area.y, this.area.h/2, this.area.w/2));
            this.UR = new QuadTree(
                new Area(this.area.x + this.area.w/2, this.area.y, this.area.h/2, this.area.w/2));
            this.DL = new QuadTree(
                new Area(this.area.x, this.area.y + this.area.h/2, this.area.h/2, this.area.w/2));
            this.DR = new QuadTree(
                new Area(this.area.x + this.area.w/2, this.area.y + this.area.h/2, this.area.h/2, this.area.w/2));
            
            this.subdivided = true;
        }
    }

    subinsert(point){
        if(point.y < this.area.y + this.area.h/2)
            if(point.x < this.area.x + this.area.w/2)
                this.UL.insert(point);
            else
                this.UR.insert(point);
        else
            if(point.x < this.area.x + this.area.w/2)
                this.DL.insert(point);
            else
                this.DR.insert(point);
    }

    draw(){
        drawQuadtree(this);

        if(this.subdivided)
            if(QUADTREE_DRAW_DELAY_IN_MILI > 0)
                setTimeout(() => {this.drawSub()}, QUADTREE_DRAW_DELAY_IN_MILI);
            else
                this.drawSub();
    }

    drawSub(){
        this.UL.draw();
        this.UR.draw();
        this.DL.draw();
        this.DR.draw();
    }
}