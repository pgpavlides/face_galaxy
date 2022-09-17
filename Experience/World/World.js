import * as THREE from "three"
import TextSprite from '@seregpie/three.text-sprite';
import GUI from 'lil-gui';

import Experience from "../Experience.js";

import Room from "./Room.js"
import Floor from "./Floor.js"
import Controls from "./Controls.js"
import Environment from "./Environment.js"

export default class World {
    
    
    constructor() {
                

        this.experience = new Experience();
        this.gui = new GUI({autoPlace: true})
        
        this.gui.domElement.id = 'gui';
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.floor = this.experience.floor;
        this.renderer = this.experience.renderer;

        // console.log(this.renderer)

        this.spiral = 90;
        this.count = 10000;
        this.globalcount = true;
        this.strDownloadMime = "image/octet-stream";

        this.parameters = {
            size: 2,
            color: { r: 1, g: 1, b: 1},
            facerotation: 1,
            camerarotation: 0.1,
            starcount: 10000,
            spiralcount: 90,
        }
        
        
        // this.arxidi='';

        

        this.resources.on("ready", ()=>{
            this.environment = new Environment();
            this.room = new Room();
            // this.floor = new Floor(); 
            this.controls = new Controls();
        });

        

        
        

        this.createUserInput();
        this.particleSystem();
        
        this.resetButton();
        this.newColorPicker();
        this.guiControls();
        this.screenShot();
        // this.createDownloadButton();
        // this.runOnce();

        // this.sizeSlider();
        
        // console.log(this.arxidi);

        
    }

    

    newColorPicker() {
        
    }
   

    particleSystem(){
       
        
        
        this.textureLoader = new THREE.TextureLoader()
        
        
        this.particleTexture = this.textureLoader.load(this.img);

        this.particlesGeometry = new THREE.BufferGeometry(2,32,32)
        
        this.positions = new Float32Array(this.count * 3);
        this.colors = new Float32Array(this.count * 3);

        for(let i = 0; i < this.count * 3; i++){
            // this.positions[i] = (Math.random() - 0.5) * 90
            this.positions[i] = (Math.random() - 0.5) * this.spiral

            this.colors[i] = Math.random();
        }

        this.particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.positions, 3)
        )
        this.particlesGeometry.setAttribute(
            'color',
            new THREE.BufferAttribute(this.colors, 3)
        )

            
        this.particlesMaterial = new THREE.PointsMaterial();
       
        
        this.particlesMaterial.size = this.parameters.size;
        this.particlesMaterial.color = this.parameters.color;
        this.particlesMaterial.sizeAttenuation = true;
        this.particlesMaterial.map = this.particleTexture;
        this.particlesMaterial.transparent = true;

        if ( this.globalcount === true) {
            this.particlesMaterial.map = this.textureLoader.load("/textures/koulis.png");
            this.particlesMaterial.alphaMap = this.textureLoader.load("/textures/koulis.png");   
        } else {
            this.particlesMaterial.map = this.textureLoader.load(this.img);
            this.particlesMaterial.alphaMap = this.textureLoader.load(this.img);
        }
        // this.img = this.textureLoader.load("/textures/koulis.png");
        


        // this.particlesMaterial.alphaMap = this.particleTexture
        this.particlesMaterial.depthWrite = false;
        this.particlesMaterial.vertexColors = true;
        this.particles = new THREE.Points(this.particlesGeometry,this.particlesMaterial)
        this.scene.add(this.particles)
            
       
    }

    createUserInput() {
        this.button = document.querySelector(".imageloader")
        this.button.onclick = (event) => {
            this.input = document.createElement('input');
            this.input.type = 'file';
            this.input.addEventListener ('change', (e) => {
                // console.log(this.input.files)
                this.reader = new FileReader();
                this.reader.onload = () => {
                  this.img = new Image();
                  this.img = this.reader.result
                  
                  this.particlesMaterial.map = this.textureLoader.load(this.img);
                  this.particlesMaterial.alphaMap = this.textureLoader.load(this.img);
                //   this.scene.add(this.particles)
                  
                }
                this.reader.readAsDataURL(this.input.files[0])
            });
            this.input.click();
            this.globalcount = false;

                                
        }
        
    }

   

    resetButton() {

        this.button = document.querySelector(".resetbutton")
        this.button.onclick = (event) => {
            
            this.particlesMaterial.map = this.textureLoader.load("/textures/koulis.png");
            this.particlesMaterial.alphaMap = this.textureLoader.load("/textures/koulis.png");
            this.globalcount = true;
            

        }

    }

    // createDownloadButton() {
    //     this.saveLink = document.createElement("div");
    //     this.saveLink.style.position = "absolute";
    //     this.saveLink.style.top = "10px";
    //     this.saveLink.style.width = "100%";
    //     this.saveLink.style.color = "white !important";
    //     this.saveLink.style.textAlign = "center";
    //     this.saveLink.innerHTML = '<a href="#" id="saveLink">Save Frame</a>';
    //     document.body.appendChild(this.saveLink);
    //     document.getElementById("saveLink").addEventListener("click", this.saveAsImage());
    //     this.renderer = new THREE.WebGLRenderer({
    //     preserveDrawingBuffer: true })
    // }

    // saveAsImage () {
    //     this.imgData;
    //     this.imgNode;
    //     try {
    //       this.strMime = "image/jpeg";
    //       this.imgData = this.renderer.domElement.toDataURL(this.strMime);

    //        saveFile(this.imgData.replace(this.strMime, this.strDownloadMime), "test.jpg");
    //      } catch (e) {
    //        console.log(e);
    //        return;
    //         }
    // }

    // saveFile(strData, filename) {
    //     this.link = document.createElement("a");
    //     if (typeof this.link.download === "string") {
    //       document.body.appendChild(this.link); //Firefox requires the link to be in the body
    //       this.link.download = filename;
    //       this.link.href = strData;
    //       this.link.click();
    //       document.body.removeChild(this.link); //remove the link when done
    //     } else {
    //       location.replace(uri);
    //     }
    // }
   
    screenShot() {
        this.button = document.querySelector(".screenshotbutton")
        
        this.button.onclick = (event) => {            
            
            this.renderer.renderer.render(this.scene, this.camera.perpectiveCamera);
            this.renderer.renderer.domElement.toBlob(function(blob){
    	        var a = document.createElement('a');
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download = 'canvas.png';
                a.click();
            }, 'image/png', 1.0);
            
            
            
            
            
            
            
            // this.w = window.open('', '');
            // this.w.document.title = "Screenshot";
            // this.w.document.body.style.backgroundColor = "red";
            // this.imgc = new Image();
            // console.log(this.renderer.renderer)
            // // this.renderer.preserveDrawingBuffer = true;
            // // Without 'preserveDrawingBuffer' set to true, we must render now
            // this.renderer.renderer.render(this.scene, this.camera.perpectiveCamera)            
            // this.imgc.src = this.renderer.renderer.domElement.toDataURL();
            // this.w.document.body.appendChild(this.imgc);  
        
        }
    }

    // runOnce(){

        
    //     if (this.globalcount === false) {
    //         this.particlesMaterial.map = this.textureLoader.load("/textures/koulis.png");
    //         this.particlesMaterial.alphaMap = this.textureLoader.load("/textures/koulis.png");
    //         // this.globalcount === true ;
    //     }

        
    // }

    guiControls() {
        
        
       
        this.gui.add(this.parameters, 'size', 0, 10, 0.001).name('Size')
        this.gui.add(this.parameters, 'camerarotation', 0, 1, 0.001).name('Camera Rotation')
        this.gui.add(this.parameters, 'starcount', 0, 10000, 1).name('Star Count')
        this.gui.add(this.parameters, 'spiralcount', 0, 200, 0.01).name('Density')
        this.gui.addColor(this.parameters, 'color').name("Color")
        this.gui.onChange( event => {
            
            // this.particlesMaterial.size = this.parameters.size
            // this.particlesMaterial.color = this.parameters.color
            this.camera.controls.autoRotateSpeed = this.parameters.camerarotation
            this.spiral = this.parameters.spiralcount
            this.count = this.parameters.starcount

            this.scene.remove(this.particles)
            this.particleSystem();
            
            
        });

        
    }


    resize() { 
    
    }

    update() {

        this.particlesGeometry.attributes.position.needsUpdate = true;
        
        
        if (this.room) {
            this.room.update();
        }
        if (this.controls) {
            this.controls.update();
        }
    }

}
     

    
  