let sec=0;
let core;
let projs=[];
let lines=[];
let coreColor;
let finishFlag=false;
let vibr=10;

function setup() {
  createCanvas(800,800);

  coreColor=color(160,210,250);
  core=new Core(coreColor); // core = "main character"
  
  projs[0]=new Projectile(1);
  projs[1]=new Projectile(1.5); //projectiles = negativity? something like that
  projs[2]=new Projectile(5);
  
  for (let i=3;i<=6;i++){
    projs[i]=new Projectile(10); //set up "rapid-fire" near end
    projs[i].pos.x-=80*(i-2);
    //console.log(i+" location: "+projs[i].pos.x);
  }

  for (let i=0;i<=width;i+=2){
    lines[i]=new BackgroundLine(i);
    //set up crazy background, create objects for each line
  }
}

function draw() {
	background(0);
  
  core.display(); //show core

  if(sec==0){
    core.resetHueFunc();
    core.changeHue(160,210,250,1);
    finishFlag=false;
    core.vibrate(0);
    core.changeSize(80,0.25);

    projs=[];
    lines=[];

    projs[0]=new Projectile(1);
    projs[1]=new Projectile(1.5);
    projs[2]=new Projectile(5);
  
    for (let i=3;i<=6;i++){
      projs[i]=new Projectile(10);
      projs[i].pos.x-=80*(i-2);
      //console.log(i+" location: "+projs[i].pos.x);
    }
    for (let i=0;i<=width;i++){
      lines[i]=new BackgroundLine(i);
      lines[i].topvel=createVector(random(-6,6),random(15,-5));
      lines[i].bottomvel=createVector(random(-6,6),random(15,-5));
    }
    //reset sketch after certain time elapsed, create loop
  }

  if (frameCount%30==0){
  	sec+=0.5;
    console.log(sec);
  }
  
  if (sec>42){
    sec=-1;
    vibr=10;

  }
  //looping counter

  if(sec>=4 && sec<12){
    projs[0].display();
    projs[0].fire();
    if (projs[0].intersect(core)){
      projs[0].destroy();
      core.changeHue(190,170,200,3);
      screenShake(5);
    }
  }
  if(sec==12){
    core.resetHueFunc(); 
  }
  //launch first projectile, disappear on collision with core

  if(sec>=15 && sec<20){
    projs[1].display();
    projs[1].fire();
    if (projs[1].intersect(core)){
      projs[1].destroy();
      core.changeHue(210,150,190,5);
    }
  }
  if(sec==20){
    core.resetHueFunc(); 
  }
  //launch second projectile, functionally identical to first


  if(sec>=24 && sec<=29){
    projs[2].display();
  }

  if(sec>=24 && sec<25){
    projs[2].fire();    
  }
  if(sec>=25 && sec<=27){
    projs[2].retreat();
  }
  if (sec==25){
    core.pos.sub(core.vel);
    core.vel.sub(core.accel);
    core.changeSize(120,1);
  }
  if (sec>=24 && sec<=27){
    core.changeHue(230,120,150,5);
  }

  if (sec==25.5){
    core.pos.add(core.vel);
    core.vel.add(core.accel);
    core.changeSize(80,1);
  }

  if (sec>=26 && sec<29){
    core.vibrate(2);
  }
  if (sec==29){
    core.resetHueFunc();
  }
  if (sec>=29){
    core.vibrate(2);

  //third projectile approaches, is "scared off", retreats
    
    for (let i=2;i<=6;i++){
      projs[i].display();
      projs[i].changeSpeed(10);
      projs[i].fire();
      if(projs[i].intersect(core)){
        projs[i].destroy();
        core.vibrate(5);
      }
    }
    if (projs[6].intersect(core)){
      finishFlag=true;
    }
  }
  //third projectile returns with rapid-fire, triggers end sequence
  
  if (finishFlag==true){
    core.vibrate(10);
    core.changeHue(255,0,0,30);
    core.explode(2.8);

    for (let i=0;i<=width;i++){
      lines[i].count();
      lines[i].display(3);
      lines[i].collapse(3);
    }
  }
  if (sec==34){
    core.resetHueFunc();
  }
  //background lines appear, fall off, core vibrates violently and turns completely red

  if (sec>34 && sec<=42){
    finishFlag=false;
    core.vibrate(vibr);
    if(vibr>0){
      vibr-=1/30;
    }
    core.changeHue(160,210,250,750);
    core.breathe();
    //console.log(vibr);
  }


}

function screenShake(strength){
  push();
  translate(random(-1*strength,strength), random(-1*strength,strength));
  pop();
}