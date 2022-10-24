class Core {

	constructor(r_, g_, b_){
		this.x=width/2;
		this.y=height/2;
		this.color=color(r_,g_,b_);
		this.size=80;
	}

	display(){
		fill(this.color);
		ellipse(this.x,this.y,this.size,this.size);
	}

	changeHue(xr,xg,xb){
		this.color=color(xr,xg,xb);
	}

	vibrate(intensity){
		this.x=width/2+random(-intensity,intensity);
		this.y=height/2+random(-intensity,intensity);
	}
	
	recenter(){
		this.x=width/2;
		this.y=height/2;
	}

	changeSize(newSize){
		this.size=newSize;
	}
}




class Projectile{

	constructor(speed){
		this.pos=createVector(0,height/2);
		this.speed=createVector(speed,0);
		this.opacity=255;
	}

	display(){
		fill(150,0,0,this.opacity);
		ellipse(this.pos.x,this.pos.y,40,40)
	}

	fire(){
		this.pos.add(this.speed);
	}
}




