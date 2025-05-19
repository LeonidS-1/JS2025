import { HomeButtonComponent } from '../../components/home-button/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { templateUrls } from '../../modules/templatesUrls.js'

export class AddPage {
    constructor(parent) {
        this.parent = parent
    }

    get pageRoot() {
        return document.getElementById('add-page')
    }

    getHTML() {
        return `
       <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
            <div class="container-fluid">
                <div id="home-button-container"></div>
            </div>
        </header>

        <div id="add-page" class="container mt-4">
            <h2>Добавить новую карточку</h2>
            <form id="add-form" class="mt-4">
                <div class="mb-3">
                    <label for="title" class="form-label">Название карточки</label>
                    <input type="text" class="form-control" id="title" required>
                </div>

                <div class="mb-3">
                    <label for="card-description" class="form-label">Описание карточки</label>
                    <textarea class="form-control" id="card-description" rows="3" required></textarea>
                </div>

                <div class="accordion mb-3" id="elementsAccordion">
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

                <button type="submit" class="btn btn-primary mt-4">Добавить карточку</button>
            </form>
        </div>
        `
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render(this.clickBack.bind(this))

        const form = document.getElementById('add-form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            
            const newCard = {
                title: document.getElementById('title').value,
                description: document.getElementById('card-description').value,
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

            ajax.post(templateUrls.createTemplate(), newCard, (data, status) => {
                if (status === 201) {
                    
                    this.clickBack()
                } else {
                    console.error('Ошибка создания карточки:', status, data)
                    
                }
            })
        })
    }
} 