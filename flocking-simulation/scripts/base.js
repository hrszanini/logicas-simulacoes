class Vector2D{
    constructor(x, y){
        if(x == undefined)
            x = 0;
        if(y == undefined)
            y = 0;
        
        this.x = x;
        this.y = y;

        return this;
    };

    add(other){
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    addStatic(){
        return new Vector2D(vector.x + other.x, vector.y + other.y);
    }

    sub(other){
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    subStatic(vector, other){
        return new Vector2D(vector.x - other.x, vector.y - other.y);
    }

    mult(value){
        this.x *= value;
        this.y *= value;
        return this;
    }

    multStatic(vector, value){
        return new Vector2D(vector.x * value, vector.y * value);
    }

    div(value){
        this.x /= value;
        this.y /= value;
        return this;
    }

    divStatic(vector, value){
        return new Vector2D(vector.x / value, vector.y / value);
    }

    distanceOf(other){
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    getMagntude(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    setMagntude(value){
        let adjust = this.getMagntude() / value;

        if(adjust != 0) {
            this.x /= adjust;
            this.y /= adjust;
        }

        return this;
    }

    getDirection(){
        let magntude = this.getMagntude();
        return new Vector2D(this.x / magntude, this.y / magntude);
    }

    cycle(xMin, yMin, xMax, yMax){
        if(this.y > xMax)
            this.y = xMin;
        else if(this.y < xMin)
            this.y = xMax;
        
        if(this.x > yMax)
            this.x = yMin;
        else if(this.x < yMin)
            this.x = yMax;
    }

    limit(value){
        if(value == undefined)
            value = 1;

        let adjust = this.getMagntude() / value;

        if(adjust > 1){
            this.x /= adjust;
            this.y /= adjust;
        }

        return this;
    }
}

class Bird{
    constructor(radiusCheck){
        if(radiusCheck == undefined)
            radiusCheck = 0;

        this.position = new Vector2D();
        this.velocity = new Vector2D();
        this.acceleration = new Vector2D();
        this.radiusCheck = radiusCheck;
    }

    flocking(birds){
        let birdsInRadius = 0; 
        let steeringAlign = new Vector2D();
        let steeringCoherce = new Vector2D();
        let steeringSeparate = new Vector2D();

        for(let bird of birds){
            if(bird != this && this.position.distanceOf(bird.position) <= this.radiusCheck){
                birdsInRadius++;

                steeringAlign.add(bird.velocity);
                steeringCoherce.add(bird.position);
                steeringSeparate.add(new Vector2D().subStatic(this.position, bird.position));
            }
        }

        if(birdsInRadius > 0){
            steeringAlign.div(birdsInRadius);
            steeringAlign.setMagntude(MAX_VELOCITY);
            steeringAlign.sub(this.velocity);
            steeringAlign.mult(ALIGN_FORCE/1000);

            steeringSeparate.div(birdsInRadius)
            steeringSeparate.setMagntude(MAX_VELOCITY);
            steeringSeparate.sub(this.velocity);
            steeringSeparate.mult(SEPARATE_FORCE/1000);

            steeringCoherce.div(birdsInRadius);
            steeringCoherce.sub(this.position);
            steeringCoherce.setMagntude(MAX_VELOCITY);
            steeringCoherce.sub(this.velocity);
            steeringCoherce.mult(COHESION_FORCE/1000);
        }

        this.acceleration = steeringAlign.add(steeringSeparate).add(steeringCoherce);

    }

    update(birds){
        this.acceleration = new Vector2D();

        this.flocking(birds)

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity.limit(MAX_VELOCITY));
        return this;
    }

    random(minX, minY, maxX, maxY, maxV){
        let randomX = Math.random() * maxX + minX;
        let randomY = Math.random() * maxY + minY;
        this.position = new Vector2D(randomX, randomY);

        let randomVX = (Math.random() * 2) -1;
        let randomVY = (Math.random() * 2) -1;
        this.velocity = new Vector2D(randomVX * maxV, randomVY * maxV);
        return this;
    }

}