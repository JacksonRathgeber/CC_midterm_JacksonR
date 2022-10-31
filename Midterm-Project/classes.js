class Core {

	constructor(r_, g_, b_){
		this.pos=createVector(width/2,height/2);
		this.color=color(r_,g_,b_);
		this.size=80;
	}

	display(){ //create image of core
		fill(this.color);
		ellipse(this.pos.x,this.pos.y,this.size,this.size);
	}

	changeHue(xr,xg,xb){ //change color
		this.color=color(xr,xg,xb);
	}

	vibrate(intensity){ // vibrate w random movements
		this.pos.x=width/2+random(-intensity,intensity);
		this.pos.y=height/2+random(-intensity,intensity);
	}
	
	recenter(){ //return core to center of screen
		this.pos.x=width/2;
		this.pos.y=height/2;
	}

	changeSize(newSize){ //augment size
		this.size=newSize;
	}

}




class Projectile{

	constructor(speed){
		this.pos=createVector(-60,height/2);
		this.speed=createVector(speed,0);
		this.opacity=255;
		this.size=40;
	}

	display(){ //create image of projectile
		noStroke();
		fill(150,0,0,this.opacity);
		ellipse(this.pos.x,this.pos.y,this.size,this.size);
	}

	fire(){ //shoot projectile
		this.pos.add(this.speed);
	}

	destroy(){ //projectile disappears
		this.opacity=0;
	}

	intersect(core){ //check intersection with core
		if (core.pos.dist(this.pos)<=this.size){
		  return true;
		}
	return false;
	}

	retreat(){ //move away from core
		this.pos.sub(this.speed.x/2);
	}

	changeSpeed(newSpeed){ //augment speed
		this.speed=newSpeed;
	}
}

class BackgroundLine{
	constructor(x_){
		this.x=x_;
		this.toppos=createVector(this.x,0);
		this.bottompos=createVector(this.x,height);
		this.topvel=createVector(random(-40,40),random(80,-5));
    	this.bottomvel=createVector(random(-40,40),random(80,-5));
		this.grav=createVector(0,3);
		this.finTime=0;
		this.frames=0;
	}

	display(timer){
		let opac=map(this.frames,0,timer*60,0,120);
		if(this.finTime<=timer){
			stroke(random(100,255),0,0,opac);
			line(this.toppos.x,this.toppos.y,this.bottompos.x,this.bottompos.y);
			console.log("opac: "+opac);
		}
		else{
			line(this.toppos.x,this.toppos.y,this.bottompos.x,this.bottompos.y);
		}
	}
	//lines fade in, random stroke colors

	count(){ //independent time keeper for end sequence
 	 	if(frameCount%60==0){
    		this.finTime++;
		}
		this.frames++;
	}

	collapse(timer){
		if(this.finTime>=timer){
			this.toppos.add(this.topvel);
			this.bottompos.add(this.bottomvel);
			this.topvel.add(this.grav);
			this.bottomvel.add(this.grav);
		}
	}
	//lines fall offscreen
}
