// import * as THREE from "three"
// import TextSprite from '@seregpie/three.text-sprite';

import Experience from "../Experience.js";

import GSAP from "gsap"

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.arxidi='';

        // this.openWebsite();
        // this.letters();
      
        
    }
 
    openWebsite() {
        this.button = document.querySelector(".introtext")
        this.button.onclick = (event) => {
            window.open()
        }        
        
    }

    

    
    resize(){

    }

    update(){}
        
     
};
