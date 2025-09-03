import { HomeButtonComponent } from '../../components/home-button/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { templateUrls } from '../../modules/templatesUrls.js'

export class EditPage {
    constructor(parent, cardId) {
        this.parent = parent
        this.cardId = cardId
    }

    get pageRoot() {
        return document.getElementById('edit-page')
    }

    getHTML() {
        return `
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
    <div class="container-fluid">
        <div id="home-button-container"></div>
    </div>
</header>

<div id="edit-page" class="container mt-4">
    <h2>Редактировать карточку</h2>
    <form id="edit-form" class="mt-4">
        <div class="mb-3">
            <label for="title" class="form-label">Название карточки</label>
            <input type="text" class="form-control" id="title" required>
        </div>

        <div class="mb-3">
        <label class="form-label">Описание карточки</label>
        <div id="description-container">
            
        </div>
        <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="add-description-line">
            + Добавить строку
        </button>
        </div>

        <div class="accordion mb-3" id="elementsAccordion">
            <!-- Элемент 1 -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        Элемент 1
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#elementsAccordion">
                    <div class="accordion-body">
                        <div class="mb-3">
                            <label for="element1-title" class="form-label">Название</label>
                            <input type="text" class="form-control" id="element1-title" required>
                        </div>
                        <div class="mb-3">
                            <label for="element1-src" class="form-label">URL изображения</label>
                            <input type="url" class="form-control" id="element1-src" required>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Элемент 2 -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        Элемент 2
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#elementsAccordion">
                    <div class="accordion-body">
                        <div class="mb-3">
                            <label for="element2-title" class="form-label">Название</label>
                            <input type="text" class="form-control" id="element2-title" required>
                        </div>
                        <div class="mb-3">
                            <label for="element2-src" class="form-label">URL изображения</label>
                            <input type="url" class="form-control" id="element2-src" required>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Элемент 3 -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                        Элемент 3
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#elementsAccordion">
                    <div class="accordion-body">
                        <div class="mb-3">
                            <label for="element3-title" class="form-label">Название</label>
                            <input type="text" class="form-control" id="element3-title" required>
                        </div>
                        <div class="mb-3">
                            <label for="element3-src" class="form-label">URL изображения</label>
                            <input type="url" class="form-control" id="element3-src" required>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary mt-4">Сохранить изменения</button>
    </form>
</div>
        `
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    loadCardData() {
        ajax.get(templateUrls.getTemplateById(this.cardId), (data, status) => {
            if (status === 200 && data) {
                document.getElementById('title').value = data.title
                
                
                const descriptionContainer = document.getElementById('description-container')
                descriptionContainer.innerHTML = ''
                
                
                const descriptionLines = Array.isArray(data.description) 
                    ? data.description 
                    : [data.description || '']
                
                descriptionLines.forEach((line, index) => {
                    this.addDescriptionLine(line, index)
                })
                
                data.elements.forEach((element, index) => {
                    const num = index + 1
                    document.getElementById(`element${num}-title`).value = element.title
                    document.getElementById(`element${num}-src`).value = element.src
                })
            } else {
                console.error('Ошибка загрузки данных карточки:', status, data)
                this.clickBack()
            }
        })
    }
    addDescriptionLine(value = '', index = null) {
        const container = document.getElementById('description-container')
        const lineIndex = index !== null ? index : container.children.length
        
        const lineDiv = document.createElement('div')
        lineDiv.className = 'description-line'
        lineDiv.innerHTML = `
            <input type="text" class="form-control" 
                   placeholder="Введите строку описания" 
                   value="${value}"
                   data-index="${lineIndex}">
            <button type="button" class="apple-btn apple-btn-secondary mb-2" 
                    onclick="this.closest('.description-line').remove()">×</button>
        `
        container.appendChild(lineDiv)
    }
    
    getDescriptionLines() {
        const inputs = document.querySelectorAll('#description-container input')
        return Array.from(inputs).map(input => input.value.trim()).filter(line => line !== '')
    }
    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render(this.clickBack.bind(this))
        
        
        this.loadCardData()
                
        document.getElementById('add-description-line').addEventListener('click', () => {
            this.addDescriptionLine()
        })
        const form = document.getElementById('edit-form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            
            const updatedCard = {
                id: this.cardId,
                title: document.getElementById('title').value,
                description: this.getDescriptionLines(), 
                elements: [
                    {
                        title: document.getElementById('element1-title').value,
                        src: document.getElementById('element1-src').value
                    },
                    {
                        title: document.getElementById('element2-title').value,
                        src: document.getElementById('element2-src').value
                    },
                    {
                        title: document.getElementById('element3-title').value,
                        src: document.getElementById('element3-src').value
                    }
                ]
            }
        
            ajax.put(templateUrls.updateTemplate(this.cardId), updatedCard, (data, status) => {
                if (status === 200) {
                    this.clickBack()
                } else {
                    console.error('Ошибка обновления карточки:', status, data)
                }
            })
        })
    }
} 