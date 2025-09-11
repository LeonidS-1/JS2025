import { AddCardButtonComponent } from '../../components/add-card-button/index.js'
import { TemplatesCardComponent } from '../../components/templates-card/index.js'
import { HomeButtonComponent } from '../../components/home-button/index.js'
import { SearchFilterComponent } from '../../components/filter/index.js'
import { AddPage } from '../add/index.js'
import { EditPage } from '../edit/index.js'
import { ajax } from '../../modules/ajax.js'
import { appleCardUrls } from '../../modules/templatesUrls.js'
import { ApiAppleCardsPage } from '../api-templates/index.js'

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.data = []
        this.nextAdd=0;
        this.handleSearch = this.handleSearch.bind(this)
    }

    getData() {
        ajax.get(appleCardUrls.getAppleCards(), (data, status) => {
            if (status === 200 && data) {
                this.data = data
                this.renderCards(this.data, true)
            } else {
                console.error('Ошибка получения данных:', status)
                
                this.data = []
                this.renderCards(this.data, true)
            }
        })
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return `
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

        
        <div id="search-filter-container"></div>
        
        <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>
         
        `
    }

    handleSearch(searchTerm) {
        if (searchTerm) {
            const filtered = this.data.filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            this.renderCards(filtered, false)
        } else {
            this.renderCards(this.data, true)
        }
    }


    renderCards(data,renderAddButtonComponent) {
        const pageRoot = this.pageRoot
        if (!pageRoot) {
            console.error('Page root element not found')
            return
        }
        
        pageRoot.innerHTML = ''
        console.log(this.data)
        data.forEach(item => {
            const card = new TemplatesCardComponent(pageRoot)
            card.render(
                item,
                () => this.clickCard(item.id),
                () => this.handleRemoveCard(item.id),
                () => this.clickCard2(item.id)
            )
        })

        if (renderAddButtonComponent){
            const addButton = new AddCardButtonComponent(pageRoot)
            addButton.render(() => this.handleAddCard())
        }
    }

    clickCard(cardId) {
        const editPage = new EditPage(this.parent, cardId)
        editPage.render()
    }

    clickCard2(cardId) {
        const apiAppleCardsPage = new ApiAppleCardsPage(this.parent, cardId)
        apiAppleCardsPage.render()
    }

    handleAddCard() {
        const addPage = new AddPage(this.parent)
        addPage.render()
    }
    
    

    handleRemoveCard(cardId) {
        ajax.delete(appleCardUrls.deleteAppleCard(cardId), (data, status) => {
            if (status === 200) {
                this.data = this.data.filter(item => item.id !== cardId)
                this.renderCards(this.data, true)
            } else {
                console.error('Ошибка удаления карточки:', status)
            }
        })
    }
    
    render() {
        if (!this.parent) {
            console.error('Parent element is not defined')
            return
        }
        
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

		const homeButtonContainer = document.getElementById('home-button-container')
		const homeButton = new HomeButtonComponent(homeButtonContainer)
		homeButton.render()

        const filterContainer = document.getElementById('search-filter-container');
        const searchFilter = new SearchFilterComponent(filterContainer, this.handleSearch);
        searchFilter.render();
        
        // Вызываем getData после обновления DOM
        this.getData()
    }
}



