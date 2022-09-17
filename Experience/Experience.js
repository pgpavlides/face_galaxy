import * as THREE from "three"
import TextSprite from '@seregpie/three.text-sprite';

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js"
import Controls from "./World/Controls.js"
import Floor from "./World/Floor.js"


export default class Experience{
    static instance
    constructor(canvas){
        
        if(Experience.instance){
            return Experience.instance
        }

        Experience.instance = this
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();
        this.floor = new Floor();
        this.controls = new Controls();




        
        this.sizes.on("resize", ()=>{
            this.resize();
        });
        
        this.time.on("update", ()=>{
            this.update();
        });
        
        

    }

    resize(){
        this.camera.resizeCamera();
        this.world.resize();
        this.renderer.resize();
    }

    update(){
        // console.log(this.world.arxidi)
        
        this.controls.update();
        this.camera.update();
        this.world.update();
        this.renderer.update()
    }
   
}