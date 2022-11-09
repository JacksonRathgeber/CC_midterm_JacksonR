class Core {

	constructor(r_, g_, b_){
		this.pos=createVector(width/2,height/2);
		this.vel=createVector(2,0);
		this.accel=createVector(1/15,0);
		this.r=r_;
		this.g=g_;
		this.b=b_;
		this.color=color(this.r,this.g,this.b);
		this.size=80;
		this.hueTime=0;
		this.initSize=this.size;
		this.finSize=this.size*1.25;
		this.inc=0.25;
		this.finTime=0;
		this.exploSize=this.size;
		this.exploSpeed=200;
		this.exploOpac=255;
	}

	display(){ //create image of core
		fill(this.color);
		ellipse(this.pos.x,this.pos.y,this.size,this.size);
	}

	resetHueFunc(){
		this.hueTime=0;
	}

	changeHue(xr,xg,xb, dur){ //change color

		if (frameCount%2==0 && this.hueTime<1){
			this.hueTime+=1/(dur*15);
		}
		this.color=lerpColor(this.color,color(xr,xg,xb),this.hueTime);
		if (this.hueTime>=1){
			this.hueTime=0;
		}
		//console.log(str(this.color));
		//console.log(this.hueTime);
		/*
		if(xr>this.r){
			this.r++;
		}
		else if (this.r>xr){
			this.r--;
		}
		if(xg>this.g){
			this.g++;
		}
		else if (this.g>xg){
			this.g--;
		}
		else if (this.b>xb){
			this.b--;
		}
		
		this.color=color(xr,xg,xb);
		*/
	}

	vibrate(intensity){ // vibrate w random movements
		this.pos.x=width/2+random(-intensity,intensity);
		this.pos.y=height/2+random(-intensity,intensity);
	}
	
	recenter(){ //return core to center of screen
		this.pos.x=width/2;
		this.pos.y=height/2;
	}

	changeSize(newSize, speed){ //augment size
		if(this.size>newSize){
			this.size-=speed;
		}
		if(this.size<newSize){
			this.size+=speed;
		}
	}

	breathe(){

		if (this.size>=this.finSize){
			this.sizeFlag==false;
			this.inc=-0.25;
			console.log("shrinking");
		}
		else if (this.size<=this.initSize){
			this.sizeFlag==true;
			this.inc=0.25;
			console.log("growing");
		}

		this.size+=this.inc;

		//console.log("this.size: "+this.size+", finSize: "+this.finSize+", sizeFlag: "+this.sizeFlag);

	}


	explode(timer){
		this.finTime+=1/60;
		if(this.finTime>=timer){
			strokeWeight(20);
			stroke(this.color, this.exploOpac)
			ellipse(width/2,height/2,this.exploSize,this.exploSize);
			this.exploSize+=this.exploSpeed;
			this.exploSpeed-=2;
			this.exploOpac-=2;
		}
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
		this.topvel=createVector(random(-6,6),random(15,-5));
    	this.bottomvel=createVector(random(-6,6),random(15,-5));
		this.grav=createVector(0,1);
		this.finTime=0;
		this.frames=0;
	}

	display(timer){
		strokeWeight(2);
		let opac=map(this.frames,0,timer*60,0,120);
		if(this.finTime<=timer){
			stroke(random(100,255),0,0,opac);
			line(this.toppos.x,this.toppos.y,this.bottompos.x,this.bottompos.y);
			//console.log("opac: "+opac);
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
