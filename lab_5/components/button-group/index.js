export class ButtonGroupComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
     <div class="btn-group mt-3" role="group" aria-label="Действия с карточкой">
    <button type="button" 
            class="apple-btn apple-btn-secondary" 
            id="remove-${data.id}">
        <i class="bi bi-trash"></i> Не интересно
    </button>
    <button type="button" 
            class="apple-btn apple-btn-primary" 
            id="view-${data.id}">
        <i class="bi bi-calculator"></i> Редактировать
    </button>
</div>
    `
	}

	addListeners(data, viewListener, removeListener) {
		document
			.getElementById(`view-${data.id}`)
			.addEventListener('click', viewListener)
		document
			.getElementById(`remove-${data.id}`)
			.addEventListener('click', removeListener)
	}

	render(data, analyzeListener, removeListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(data, analyzeListener, removeListener)
	}
}
