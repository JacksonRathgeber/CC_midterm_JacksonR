let sec=0;
let core;
let projs=[];
let lines=[];
let coreColor;
let finishFlag=false;

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

  for (let i=0;i<=width;i++){
    lines[i]=new BackgroundLine(i);
    //set up crazy background, create objects for each line
  }
}

function draw() {
	background(0);
  
  core.display(); //show core

  if(sec==0){
    core.changeHue(160,210,250);
    finishFlag=false;
    core.vibrate(0);

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
      lines[i].topvel=createVector(random(-40,40),random(40,-5));
      lines[i].bottomvel=createVector(random(-40,40),random(40,-5));
    }
    //reset sketch after certain time elapsed, create loop
  }

  if (frameCount%60==0){
  	sec++;
    console.log(sec);
  }
  
  if (sec==34){
    sec=0;
  }
  //looping counter

  if(sec>=4 && sec<12){
    projs[0].display();
    projs[0].fire();
    if (projs[0].intersect(core)){
      projs[0].destroy();
      core.changeHue(190,170,200);
    }
  }
  //launch first projectile, disappear on collision with core

  if(sec>=15 && sec<20){
    projs[1].display();
    projs[1].fire();
    if (projs[1].intersect(core)){
      projs[1].destroy();
      core.changeHue(210,150,190);
    }
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
    core.changeHue(240,120,150);
    core.pos.sub(1,0);
    core.changeSize(100);
  }

  if (sec==26){
    core.changeHue(210,150,190);
    core.recenter();
    core.changeSize(80);
    core.vibrate(2);
  }

  if (sec>=27 && sec<29){
    core.vibrate(2);
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
    core.changeHue(255,0,0);
    core.vibrate(10);

    for (let i=0;i<=width;i++){
      lines[i].count();
      lines[i].display(3);
      lines[i].collapse(3);
    }
  }
  //background lines appear, fall off, core vibrates violently and turns completely red
}