function disableScroll(event) { //スマホの縦スクロールを制限
    event.preventDefault();
}
document.addEventListener('touchmove', disableScroll, { passive: false });

let spiral1,spiral2;
let r = 45;
let cam;

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    cam = createCamera();
    ortho();

    spiral1 = createModel1();
    spiral2 = createModel2();
}

function draw(){
    background(230);

    ambientLight(100);
    directionalLight(255, 255, 255, 1, 1, 0);  

    stroke(0);
    noStroke();
    strokeWeight(1);

    scale(0.8);

    fill(255, 150, 0);

    push();
    spirals(0,true);
    rotateY(PI/2);
    spirals(PI/2,false);
    pop();

    fill(0, 255, 150);
    push();
    rotateZ(PI/2);
    rotateX(PI/2);
    translate(2*r, 0, 2*r);
    spirals(PI,false);
    rotateY(PI/2);
    spirals(-PI/2,true);
    pop();

    fill(150, 0, 255);
    push();
    rotateZ(PI/2);
    translate(0, 0, 2*r);
    spirals(0,true);
    rotateY(PI/2);
    spirals(PI/2,false);
    pop();



    function spirals(a,b){
        push();
        translate(-r*6, 0, -r*6);
        for(let i=0; i<4; i++)  for(let j=0; j<4; j++)  if((i+j)%2==0){
            push();
            translate(i*4*r, 0, j*4*r);
            if(i%2==0)  rotateY(PI);
            rotateY(a);
            if(b)   model(spiral1);
            else    model(spiral2);
            pop();
        }
        pop();
    }

    
}

function createModel1(){
    return new p5.Geometry(1, 1,
        function createGeometry(){

            let a=20;
            
            for(let i=0; i<=2*a; i++) for(let j=0; j<2; j++){
                this.vertices.push(new p5.Vector(r*cos(-TAU/a*i+j*0.6-0.3), 8*r-8*r/a*i, r*sin(-TAU/a*i+j*0.6-0.3)));
            }
            
            for(let i=0; i<2*a; i++){
                this.faces.push([2*i, 2*i+1, 2*i+3]);
                this.faces.push([2*i+3, 2*i+2, 2*i]);
            }

            this.computeNormals();
            this.gid = 'geo1';

        }
    )
}

function createModel2(){
    return new p5.Geometry(1, 1,
        function createGeometry(){

            let a=20;
            for(let i=0; i<=2*a; i++) for(let j=0; j<2; j++){
                this.vertices.push(new p5.Vector(r*cos(TAU/a*i+j*0.6-0.3), 8*r-8*r/a*i, r*sin(TAU/a*i+j*0.6-0.3)));
            }
            
            for(let i=0; i<2*a; i++){
                this.faces.push([2*i, 2*i+1, 2*i+2]);
                this.faces.push([2*i+1, 2*i+3, 2*i+2]);
            }
            
            this.computeNormals();
            this.gid = 'geo2';
        }
    )
}


function mouseDragged(){
    const deltaTheta = (-2 * (mouseX - pmouseX)) / 300;
    const deltaPhi = (1 * (mouseY - pmouseY)) / 300;
    cam._orbit(deltaTheta, deltaPhi, 0);   
}

