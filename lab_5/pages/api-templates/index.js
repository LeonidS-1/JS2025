import { HomeButtonComponent } from '../../components/home-button/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
import { TemplatesCardComponent } from '../../components/templates-card/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { templateUrls } from '../../modules/templatesUrls.js'

export class ApiTemplatesPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
        this.data = null
        this.getData()
        
        const devicePrices = [999, 1099, 1199]
        this.discount = Math.min(50, Math.floor(this.sumOfSquares(devicePrices) / 100000)) 
        this.findAnagrams = this.findAnagrams.bind(this)
        this.clickBack = this.clickBack.bind(this)
    }

    getData() {
        ajax.get(templateUrls.getTemplates(), (data, status) => {
            if (status === 200 && data) {
                // Находим конкретную карточку по ID
                this.data = data.find(card => card.id === Number(this.id)) || data[0]
                this.render()
            } else {
                console.error('Ошибка получения данных:', status)
                this.data = null
                this.render()
            }
        })
    }

    get pageRoot() {
        return document.getElementById('api-templates-page')
    }

    sumOfSquares(arr) {
        return arr.reduce((sum, current) => sum + Math.pow(current, 2), 0)
    }

    getHTML() {
       

        return `
        <div id="api-templates-page">
            <div class="main-container">
                <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                    <div class="container-fluid">
                        <div id="home-button-container"></div>
                    </div>
                </header>

                <div class="header-center">
                    <h4 class="header-title">${this.data.title}</h4>
                </div>

                <div class="carousel-container" id="carousel-container"></div>
                
                <div class="mt-3 text-muted">
                ${this.data.description.map(line => `${line}</p>`).join('')}
                </div>

                
                
            </div>
        </div>`
    }

   
    clickBack() {
        // Используем тот же parent, что был передан в конструктор ApiTemplatesPage
        const parent = this.parent || document.getElementById('root')
        const mainPage = new MainPage(parent)
        mainPage.render()
    }

    render() {
        if (!this.parent) {
            console.error('Parent element is not defined in ApiTemplatesPage')
            return
        }
        
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render(this.clickBack)

        if (this.data) {
            const carouselContainer = document.getElementById('carousel-container')
            const carousel = new CaruselComponent(carouselContainer)
            carousel.render(this.data)

            // Добавляем обработчик события после рендера
            const anagramsBtn = document.getElementById('btn-find-anagrams')
            if (anagramsBtn) {
                anagramsBtn.addEventListener('click', this.findAnagrams)
            }
        }
    }
}