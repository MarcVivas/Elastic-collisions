
let particles = [];
let collisions = new Set();
function setup(){
    // Creates a canvas with 1000px width and 800px height
    createCanvas(windowWidth, 800);


    for (let x = 0; x < random(5,10); x++){
        particles.push(new Particle(random(0, windowWidth), random(0, 800), random(40, 100), [random(70, 255), random(70, 255), random(70, 255)], -200, -100))
    }
}

function windowResized() {
    resizeCanvas(windowWidth, 800);
}

function draw(){
    background(0, 0, 22);
    for(let index = 0; index < particles.length; index++){
        
        handleCollisions(particles[index], index);
        

        particles[index].draw();
    
        
        particles[index].move(0, 0);
       

      
    }
}


// Changes the velocity of the particle if collides with something
function handleCollisions(particle, index){
    handleMarginBoxCollisions(particle);
    handleParticlesCollisions(particle, index);
}

// Changes the velocity of the particle if collides with another particle
function handleParticlesCollisions(particle, index){
    for(let i = index; i< particles.length; i++){
        if(index != i){
            if(particles[index].isColliding(particles[i]) && !collisions.has('' + i + index) ){
                ellastic_collision(particles[index], particles[i]);
                collisions.add(''+ i + index);
              
            }
            else if(!particles[index].isColliding(particles[i])){collisions.delete('' + i + index); }
        }
    }

}

// Changes the velocity of the particle if collides with the margin
function handleMarginBoxCollisions(particle){
    if (particle.isCollidingVertically() && !particle.isCollidingHorizontally()){
        if(particle.x + particle.radius > width){
            if(particle.getVelX >= 0){
                particle.setVelX = -particle.getVelX;
            }
        }
        else{
            if(particle.getVelX <= 0){
                particle.setVelX = -particle.getVelX;
            }
        }

    }
    else if(particle.isCollidingVertically() && particle.isCollidingHorizontally()){
        if(particle.x + particle.radius > width){
            if(particle.getVelX >= 0){
                particle.setVelX = -particle.getVelX;
            }
        }
        else{
            if(particle.getVelX <= 0){
                particle.setVelX = -particle.getVelX;
            }
        }
        if(particle.y + particle.radius > height){
            if(particle.getVelY >= 0){
                particle.setVelY = -particle.getVelY;
            }
        }
        else{
            if(particle.getVelY <= 0){
                particle.setVelY = -particle.getVelY;
            }
        }
    }
    else if(!particle.isCollidingVertically() && particle.isCollidingHorizontally()){
        if(particle.y + particle.radius > height){
            if(particle.getVelY >= 0){
                particle.setVelY = -particle.getVelY;
            }
        }
        else{
            if(particle.getVelY <= 0){
                particle.setVelY = -particle.getVelY;
            }
        }
    }

}

function ellastic_formula(vel1, vel2, rad1, rad2, mass1, mass2){
    let M = mass1 + mass2;
    return vel1 - ((rad1-rad2)*((2*mass2)/M)* (((vel1 - vel2) * (rad1 - rad2))/(abs(rad1-rad2) * abs(rad1-rad2))) )
}

// https://scipython.com/blog/two-dimensional-collisions/
function ellastic_collision(part1, part2){
    par1VelX = part1.getVelX;
    par1VelY = part1.getVelY;
    par2VelX = part2.getVelX;
    par2VelY = part2.getVelY;
    part1.setVelX = ellastic_formula(par1VelX, par2VelX, part1.radius, part2.radius, part1.mass, part2.mass);
    part1.setVelY = ellastic_formula(par1VelY, par2VelY, part1.radius, part2.radius, part1.mass, part2.mass);
    part2.setVelX = ellastic_formula(par2VelX, par1VelX, part2.radius, part1.radius, part2.mass, part1.mass);
    part2.setVelY = ellastic_formula(par2VelY, par1VelY, part2.radius, part1.radius, part2.mass, part1.mass);
}

function mousePressed(){
    if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
        particles.push(new Particle(mouseX, mouseY, random(40, 100), [random(70, 255), random(70, 255), random(70, 255)], -200, -100))

    }

   
}
