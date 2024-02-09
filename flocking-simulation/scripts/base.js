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

    add(vector, other){
		if(other == undefined){
			this.x += vector.x;
			this.y += vector.y;
			return this;
		}
		
		return new Vector2D(
			vector.x + other.x, 
			vector.y + other.y);
		
    }

    sub(vector, other){
		if(other == undefined){
			this.x -= vector.x;
			this.y -= vector.y;
			return this;
		}

		return new Vector2D(
			vector.x - other.x, 
			vector.y - other.y);
    }

    mult(param, value){
		if(value == undefined){
			this.x *= param;
			this.y *= param;
			return this;
		}
		
		return new Vector2D(
			param.x * value, 
			param.y * value);
    }

    div(param, value){
		if(value == undefined){
			this.x /= param;
			this.y /= param;
			return this;
		}
		
		return new Vector2D(
			param.x / value, 
			param.y / value);
    }

    distanceOf(other){
        return Math.sqrt(
			Math.pow(this.x - other.x, 2) + 
			Math.pow(this.y - other.y, 2));
    }

    getMagnitude(){
        return Math.sqrt(
			Math.pow(this.x, 2) + 
			Math.pow(this.y, 2));
    }

    setMagnitude(value){
        let adjust = this.getMagnitude() / value;

        if(adjust != 0) {
            this.x /= adjust;
            this.y /= adjust;
        }

        return this;
    }

    getDirection(){
        let magnitude = this.getMagnitude();

        return new Vector2D(
			this.x / magnitude, 
			this.y / magnitude
		);
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

        let adjust = this.getMagnitude() / value;

        if(adjust > 1){
            this.x /= adjust;
            this.y /= adjust;
        }

        return this;
    }
}

class Bird{
    constructor(id){
		this.id = id;
        this.position = new Vector2D();
        this.velocity = new Vector2D();
        this.acceleration = new Vector2D();
		this.flock = [];
    }

    fly(birds){
        let accelerationAlign = new Vector2D();
        let accelerationCoherce = new Vector2D();
        let accelerationSeparate = new Vector2D();

        for(let pos = this.id; pos < birds.length; pos++){
			let bird = birds[pos];

			let distance = this.position.distanceOf(bird.position);
            
			if(distance > CHECK_RADIUS)
				continue;
			
			this.flock.push(bird);
			bird.flock.push(this);
		}

		if(this.flock.length == 0)
			return;
		else
			this.acceleration = new Vector2D();
		
		for(let bird of this.flock){
			accelerationAlign.add(bird.velocity);

			accelerationCoherce.add(bird.position);
			
			let distance = this.position.distanceOf(bird.position);
			
			if(distance == 0)
				accelerationSeparate.add(new Vector2D(MAX_ACCELERATION, MAX_ACCELERATION));
			else
				accelerationSeparate.add(
					new Vector2D()
					.sub(this.position, bird.position)
					.div(distance)
				);
        }

		accelerationCoherce.div(this.flock.length);
		accelerationCoherce.sub(this.position);
		accelerationCoherce.setMagnitude(MAX_ACCELERATION);
		accelerationCoherce.mult(COHESION_RATIO);
		this.acceleration.add(accelerationCoherce);
		
		accelerationAlign.setMagnitude(MAX_ACCELERATION);
		accelerationAlign.mult(ALIGN_RATIO);
		this.acceleration.add(accelerationAlign);

		accelerationSeparate.setMagnitude(MAX_ACCELERATION);
		accelerationSeparate.mult(SEPARATE_RATIO);
		this.acceleration.add(accelerationSeparate);
    }

    update(birds){
        this.fly(birds);
        
		this.velocity.add(this.acceleration);
        this.velocity.limit(MAX_VELOCITY);
		this.position.add(this.velocity);
		this.flock = [];

		return this;
    }

    random(minX, minY, maxX, maxY, maxV){
        let randomX = Math.random() * maxX + minX;
        let randomY = Math.random() * maxY + minY;
        this.position = new Vector2D(randomX, randomY);

        let randomVX = (Math.random() * 2) -1;
        let randomVY = (Math.random() * 2) -1;
        this.velocity = new Vector2D(
						randomVX * maxV, 
						randomVY * maxV);
        return this;
    }

}
