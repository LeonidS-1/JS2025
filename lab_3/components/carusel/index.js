export class CaruselComponent {
	constructor(parent) {
		this.parent = parent
	}
	
	getHTML(data) {
		return `
    <div class="carousel-container" style="width: 100%; overflow: hidden;">
    <div id="carousel-${data.id}" class="carousel slide" style="width: 100%;">
        <div class="carousel-indicators">
            <button style="background-color:#1C1C1E" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button style="background-color:#1C1C1E" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button style="background-color:#1C1C1E" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" style="width: 100%;">
            ${data.elements.map((elem, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}" style="width: 100%;">
                    <img src="${elem.src}" alt="Icon ${elem.title}" >
                </div>
            `).join('')}
        </div>
    </div>
</div>`
	}
	
	render(data) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
	}
}