import { LightningElement, track, wire } from 'lwc';
import getProductList from '@salesforce/apex/ProductController.getProducts';

export default class DragAndDrop extends LightningElement {
    @track products = [];
    @track productsAndCounts = [];

    draggedProduct = {};
 
    @wire(getProductList)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
        } else if (error) {
            console.log('got products ERROR: ' + error);
            console.log(JSON.parse(JSON.stringify(error)));
        }
    }

    handleListItemDrag(evt) {
        this.draggedProduct = this.products.filter(product => {
			if (product.Id === evt.detail) {
			    return product;     
			}
        })[0];
    }
    
    handleItemDrop(evt) {
        this.template.querySelector('c-vanilla-canvas').addElement(this.draggedProduct, {x:evt.clientX, y:evt.clientY});
        this.updateProductsAndCounts();
    }

    updateProductsAndCounts() {
        var didCount = false;
        this.productsAndCounts.forEach(product => {
            if (product.name == this.draggedProduct.Name) {
                product.count++;
                didCount = true;
            }
        });

        if (!didCount) {
            this.productsAndCounts.push({name: this.draggedProduct.Name, count:1});
        }
    }

    handleDragOver(evt) {
        evt.preventDefault();
    }

    handleGenerateOrder() {
        console.log('productsAndCounts: ' + JSON.stringify(this.productsAndCounts));
        this.template.querySelector('c-order-modal').launchModal();
    }
}