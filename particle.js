class Particle{
    constructor(x, y, diameter, color, vel_x, vel_y){
        this.x = x;
        this.y = y;
        this.radius = diameter/2;
        this.diameter = diameter;
        this.color = color;
        this.velocity_x = vel_x;
        this.velocity_y = vel_y;
        this.mass = (this.radius) * (this.radius);
       
    }

    // Moves the particle to the next position deppending on acceleration and velocity
    move(acceleration_x, acceleration_y) {
        if(frameRate() > 0){
            this.velocity_x += acceleration_x * 1/frameRate();
            this.velocity_y += acceleration_y * 1/frameRate();
        
            this.x += this.velocity_x * 1/frameRate(); 
            this.y += this.velocity_y * 1/frameRate();

        }
        

    }

    
    // Collision detection for the left and right side of the margin box
    isCollidingVertically(){
        return this.x + this.radius > width || this.x - this.radius < 0

    }

    // Collision detection for the top and bottom side of the margin box
    isCollidingHorizontally(){
        return this.y + this.radius > height || this.y - this.radius < 0
    }

    // Collision detection with another particle
    isColliding(particle){
        return (dist(this.x, this.y, particle.x, particle.y) <= this.radius + particle.radius)
    }

    
    // Draw on the canvas the particle
    draw(){
        fill(this.color[0], this.color[1], this.color[2]);
        noStroke();
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    // Setters
    set setVelX(vel){
        this.velocity_x = vel;
    }
    set setVelY(vel){
        this.velocity_y = vel;
    }

    // Getters
    get getVelX(){return this.velocity_x;}
    get getVelY(){return this.velocity_y;} 
}