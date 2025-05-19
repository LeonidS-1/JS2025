export class HomeButtonComponent {
	constructor(parent) {
		this.parent = parent
	}

	addListeners(listener) {
		document.getElementById('home-button').addEventListener('click', listener)
	}

	getHTML() {
		return `
    <button id="home-button" style="
    padding: 0; 
    border: none; 
    background: none;
    font-size: 40px;
    line-height: 1;
    color: #000;
    cursor: pointer;
">
    
</button>`
	}

	render(listener) {
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(listener)
	}
}
