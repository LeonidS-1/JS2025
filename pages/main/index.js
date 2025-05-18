import { AddCardButtonComponent } from '../../components/add-card-button/index.js'
import { TemplatesCardComponent } from '../../components/templates-card/index.js'
import { ApiTemplatesPage } from '../api-templates/index.js'
import { HomeButtonComponent } from '../../components/home-button/index.js'
import { SearchFilterComponent } from '../../components/filter/index.js'

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.data = this.getData()
        this.nextAdd=0;
        this.handleSearch = this.handleSearch.bind(this)

    }

    getData() {
        return [
            {
                id: 1,
                title: 'iPhone 16',
                description: `iPhone 16 Pro — новый флагман Apple, сочетающий передовые технологии и элегантный дизайн. С улучшенным процессором A18 Pro, камерой 48 МП с продвинутой оптикой и дисплеем Super Retina XDR с частотой 120 Гц, этот смартфон предлагает исключительную производительность и качество изображения. Долгий срок работы от аккумулятора, быстрая зарядка и инновационные функции iOS 18 делают его идеальным выбором для тех, кто ценит инновации и стиль.`,
                elements: [
                    {
                        title: "Встречайте iPhone 16",                        
                        src: "https://www.apple.com/v/home/ce/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_large.jpg"
                    },
                    {
                        title: "Линейка iPhone 16",
                        src: "images/phone2.png"
                    },
                    {
                        title: "iPhone 16 Pro",
                        src: "images/phone3.png"
                    },
                ],
            },
            {
                id: 2,
                title: 'Apple Watch Series 10',
                description: "Apple Watch Series 10 — революция на вашем запястье. С ещё более тонким и лёгким корпусом, новым процессором S10 для молниеносной работы и ярким Always-On дисплеем с увеличенной площадью экрана. Улучшенные датчики здоровья, включая мониторинг давления крови и уровня глюкозы, делают эти часы вашим персональным доктором. Автономность увеличена до 36 часов, а быстрая зарядка восполняет энергию за считанные минуты. Связь без iPhone через расширенный eSIM, новые спортивные режимы и ещё более прочное стекло — Series 10 созданы для тех, кто идёт вперёд.",
                elements: [
                    {
                        title: "Встречайте Apple Watch Series 10",
                        src: "https://www.apple.com/v/home/ce/images/heroes/apple-watch-series-10/hero_apple_watch_series_10_avail_lte__esu66gaw6dci_large.jpg"
                    },
                    {
                        title: "Новый дизайн Apple Watch Series 10",
                        src: "images/watch2.png"
                    },
                    {
                        title: "Отслеживание Апное",
                        src: "images/watch3.png"
                    },
                ],
            },
            {
                id: 3,
                title: 'iPad M4',
                description: "iPad Pro M4 — это эволюция планшетов с чипом Apple M4, который обеспечивает непревзойдённую производительность и эффективность. Ультратонкий дизайн сочетается с потрясающим OLED-экраном ProMotion XDR, предлагая идеальную цветопередачу и плавность изображения. Благодаря поддержке Apple Pencil Pro с тактильной отдачей и обновлённой Magic Keyboard, iPad Pro становится мощным инструментом для работы и творчества. Технологии искусственного интеллекта ускоряют выполнение задач, а порт Thunderbolt 4 расширяет возможности подключения. С увеличенным временем автономной работы, улучшенной системой Face ID и продвинутой аудиосистемой iPad Pro M4 — это не просто планшет, а универсальное устройство для профессионалов. Доступен в размерах 11 и 13 дюймов.",
                elements: [
                    {
                        title: "Встречайте iPad M4",
                        src: "https://www.apple.com/v/home/ce/images/heroes/ipad-pro/hero_ipadpro_avail__d6ddfjws77ue_large.jpg"
                    },
                    {
                        title: "Удобство iPad M4",
                        src: "images/pad2.png"
                    },
                    {
                        title: "Самый тонкий iPad M4",
                        src: "images/pad3.png"
                    },
                ],
            },
            
        ]
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
        console.log(searchTerm)
        if (searchTerm){
            const filtered=this.data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            this.renderCards(filtered,false);
        }else{
            const filtered=this.data
            this.renderCards(filtered,true);
        }   
        console.log(filtered)
        
    }


    renderCards(data,renderAddButtonComponent) {
        this.pageRoot.innerHTML = ''
        console.log(this.data)
        data.forEach(item => {
            const card = new TemplatesCardComponent(this.pageRoot)
            card.render(
                item,
                () => this.clickCard(item.id),
                () => this.handleRemoveCard(item.id)
            )
        })

        if (renderAddButtonComponent){
            const addButton = new AddCardButtonComponent(this.pageRoot)
            addButton.render(() => this.handleAddCard())
        }
    }

    clickCard(cardId) {
        const apiTemplatesPage = new ApiTemplatesPage(this.parent, cardId)
        apiTemplatesPage.render()
    }

    handleAddCard(){
        let newCard={...this.getData()[this.nextAdd]}
        if(this.nextAdd==2){this.nextAdd=0}
        else {this.nextAdd+=1}
    
        newCard.id=this.data[this.data.length-1].id+1
        
        if (this.data.length === 0 || !this.isEqualObj(newCard, this.data[this.data.length - 1])) {
            this.data.push(newCard)
        }
        else{
            this.handleAddCard()
        }
        this.renderCards(this.data,true)
        console.log(this.data)
    }
    
    isEqualObj(obj1, obj2) {
        return obj1.title === obj2.title
    }

    handleRemoveCard(cardId) {
        this.data = this.data.filter(item => item.id !== cardId)
        this.renderCards(this.data,true)
    }
    
    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

		const homeButtonContainer = document.getElementById('home-button-container')
		const homeButton = new HomeButtonComponent(homeButtonContainer)
		homeButton.render()

        const filterContainer = document.getElementById('search-filter-container');
        const searchFilter = new SearchFilterComponent(filterContainer, this.handleSearch);
        searchFilter.render();
        
        this.renderCards(this.data,true)

    }
}



