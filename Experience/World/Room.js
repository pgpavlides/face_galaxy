import * as THREE from "three"

import Experience from "../Experience.js";

import GSAP from "gsap"
// import flamingo from "/textures/flamingo.mp4"

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene
        

        

   
        this.setAnimation();
        this.setBalls();
        // this.onMouseMove();
        
        

    }

    setBalls(){
        
       


    }

   

    

    setAnimation() {
        // this.mixer = new THREE.AnimationMixer(this.actualRoom);
        // this.swim = this.mixer.clipAction(this.room.animations[0]);
                
        // this.swim.play();
        
    // //   
        // console.log(this.room);
    }

    
    
    
    resize(){

    }

    update(){
        
   
        // this.mixer.update(this.time.delta * 0.0007);
    }

}