/*
The `AppState` class is responsible for
managing the state of the appliaction i.e. details 
of items added to cart or wishlist and for notifying 
other application components to update their state
*/
export class AppState {
    constructor(dependentComponents) {
	this._state = null;
	this._dependentComponents = dependentComponents;
	this.loadState();
	this.syncState();
    }
    loadState() {
	let data = localStorage.getItem("state");
	if (data) {
	    this._state = JSON.parse(data);
	} else {
	    this._state = {};
	    this._state.cart = [];
	    this._state.totalCartItems = 0;
	}
	this.saveState();
    }
    saveState() {
	let data = JSON.stringify(this._state);
	localStorage.setItem("state", data);
    }
    updateCart(productId, change) {
	let index = 0;
	// Checking for the presence of specified item
	// and updating it's count
	for (let item of this._state.cart) {
	    if (item.id == productId) {
		item.count += change;
		break;
	    }
	    index++;
	}
	// If item not found then add it to cart
	if (index === this._state.cart.length) {
	    this._state.cart.push({id:productId, count:change});
	}
	// If the item specified by `index` i.e. affected item
	// has a count <= 0, then remove it from the cart
	// also update the `totalCartItems` variable if item is still
	// in the cart
	if (this._state.cart[index].count <= 0) {
	    // If the item is just removed also decrease the total products count
	    if (this._state.cart[index].count == 0) {
		this._state.totalCartItems += change;
	    }
	    this._state.cart.splice(index, 1);
	} else {
	    this._state.totalCartItems += change;
	}
	this.saveState();
	this.syncState();
    }
    get totalItemsCount() {
	return this._state.totalCartItems;
    }
    getProductCount(productId) {
	for (let item of this._state.cart) {
	    if (item.id === productId) {
		return item.count;
	    }
	}
	return 0;
    }
    syncState() {
	for (let component of this._dependentComponents) {
	    component.update(this);
	}
    }
}
