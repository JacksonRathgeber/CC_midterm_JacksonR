let phase=0;
let sec=0;
let tick=false;
let core;
let proj1;

function setup() {
  createCanvas(800,800);
  core=new Core(160,210,250);
  proj1=new Projectile(20);
}

function draw() {
	background(0);
  if (frameCount%60==0){
  	sec++;
  	tick=true;
  }
  else{
  	tick=false;
  }

  core.display();

  
  if (sec==2){
  	core.changeHue(200,0,0);
  	core.vibrate(10);
  }
  else{
  	core.recenter();
  }

  if (sec==4){
  	proj1.display();
  	proj1.fire();
  }
}

function intersect(c = new Core(r_,g_,b_), p = new Projectile(speed)){

}