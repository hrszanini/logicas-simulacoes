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
    }

    flocking(birds){
        let birdsInRadius = 0; 
        let steeringAlign = new Vector2D();
        let steeringCoherce = new Vector2D();
        let steeringSeparate = new Vector2D();

        for(let bird of birds){
			if(bird.id == this.id){
				continue;
			}
			
			let distance = this.position.distanceOf(bird.position);
            
			if(distance <= CHECK_RADIUS){
                birdsInRadius++;

                steeringAlign.add(bird.velocity);
                steeringCoherce.add(bird.position);
				
				if(distance == 0)
					steeringSeparate.add(new Vector2D(MAX_VELOCITY, MAX_VELOCITY));
				else
					steeringSeparate.add(
						new Vector2D()
						.sub(this.position, bird.position)
						.div(distance)
					);
            }
        }

        if(birdsInRadius > 0){
            steeringAlign.div(birdsInRadius);
            steeringAlign.setMagnitude(MAX_VELOCITY);
            steeringAlign.sub(this.velocity);
            steeringAlign.mult(ALIGN_FORCE);

            steeringSeparate.div(birdsInRadius);
            steeringSeparate.setMagnitude(MAX_VELOCITY);
            steeringSeparate.sub(this.velocity);
            steeringSeparate.mult(SEPARATE_FORCE);

            steeringCoherce.div(birdsInRadius);
            steeringCoherce.sub(this.position);
            steeringCoherce.setMagnitude(MAX_VELOCITY);
            steeringCoherce.sub(this.velocity);
            steeringCoherce.mult(COHESION_FORCE);
        }

        this.acceleration = steeringAlign
							.add(steeringSeparate)
							.add(steeringCoherce)
							.limit(1/60);
    }

    update(birds){
        this.flocking(birds);
        
		this.velocity.add(this.acceleration);
        this.velocity.limit(MAX_VELOCITY);
		this.position.add(this.velocity);
        
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
