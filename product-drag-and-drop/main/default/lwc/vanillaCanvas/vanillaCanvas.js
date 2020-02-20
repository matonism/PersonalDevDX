import { LightningElement, api, track } from 'lwc';
import BACKGROUND_IMAGE from '@salesforce/resourceUrl/floorplan';
import ITEMS from '@salesforce/resourceUrl/Items';

export default class VanillaCanvas extends LightningElement {

    ctx;
    canvas;
    WIDTH;
    HEIGHT;
    offsetX;
    offsetY;
    mouseStartX;
    mouseStartY;

    productElements = [];
    background = new Image();
    dragok = false;

    renderedCallback() {
        // get canvas related references
        this.canvas = this.template.querySelector('.canvas');
        this.ctx = this.canvas.getContext("2d");
        var BB = this.canvas.getBoundingClientRect();
        this.offsetX = BB.left;
        this.offsetY = BB.top;
        this.WIDTH = this.canvas.width;
        this.HEIGHT = this.canvas.height;

        this.canvas.width  = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.WIDTH = this.canvas.offsetWidth;
        this.HEIGHT = this.canvas.offsetHeight;

        this.background.src = BACKGROUND_IMAGE;
    
        // call to draw the scene
        this.draw();
    }

    // draw a single rect
    drawImageElement(sourceURL, x, y, w, h) {
        var image = new Image();
        image.src = sourceURL;
        this.ctx.drawImage(image, x, y, w, h);
    }
   
    // clear the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    }
   
    // redraw the scene
    draw() {
        this.clear();
        this.ctx.drawImage(this.background, 0, 0, this.WIDTH, this.HEIGHT);

        this.productElements.forEach(element => {
            this.drawImageElement(element.imageURL, element.x, element.y, element.width, element.height);
        });
    }
   
   
    // handle mousedown events
    mouseDown(e){
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - this.offsetX);
        var my = parseInt(e.clientY - this.offsetY);

        // test each rect to see if mouse is inside
        this.dragok = false;

        this.productElements.forEach(element => {
            if(mx > element.x && mx < (element.x + element.width) && my > element.y && (my < element.y + element.height)){
                // if yes, set that rects isDragging=true
                this.dragok = true;
                element.isDragging = true;
            }
        });

        // save the current mouse position
        this.mouseStartX = mx;
        this.mouseStartY = my;
    }
   
   
    // handle mouseup events
    mouseUp(e){
        // tell the browser we're handling this mouse event
        if (this.dragok) {
            e.preventDefault();
            e.stopPropagation();
    
            // clear all the dragging flags
            this.dragok = false;
            this.productElements.forEach(element => {
                element.isDragging = false;
            });
        } 
    }
   
   
    // handle mouse moves
    mouseMove(e){
        // if we're dragging anything...
        if (this.dragok){

            // tell the browser we're handling this mouse event
            e.preventDefault();
            e.stopPropagation();

            // get the current mouse position
            var mx = parseInt(e.clientX - this.offsetX);
            var my = parseInt(e.clientY - this.offsetY);

            // calculate the distance the mouse has moved
            // since the last mousemove
            var dx = mx - this.mouseStartX;
            var dy = my - this.mouseStartY;

            // move each rect that isDragging 
            // by the distance the mouse has moved
            // since the last mousemove
            this.productElements.forEach(element =>{
                if(element.isDragging){
                    element.x += dx;
                    element.y += dy;
                }
            });

            // redraw the scene with the new rect positions
            this.draw();

            // reset the starting mouse position for the next mousemove
            this.mouseStartX = mx;
            this.mouseStartY = my;
        }
    }

    @api
    addElement(element, location) {
        var imageElement = {};
        imageElement.name = element.Name;
        imageElement.imageURL = ITEMS + '/Items/' + element.Image_URL__c + '.png';
        imageElement.height = element.Image_Height__c;
        imageElement.width = element.Image_Width__c;
        imageElement.x = location.x - this.offsetX - (element.Image_Width__c/2);
        imageElement.y = location.y - this.offsetY - (element.Image_Height__c/2);
        this.productElements.push(imageElement);
        this.draw();
    }

    handleDrop(evt) {
        evt.preventDefault();
        const customEvent = new CustomEvent('itemdrop', {
            detail: evt.detail
        });
        
        this.dispatchEvent(customEvent);
    }

    handleDragOver(evt) {
        evt.preventDefault();
    }
}
