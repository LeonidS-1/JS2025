import { HomeButtonComponent } from '../../components/home-button/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
import { MainPage } from '../main/index.js'

export class ApiTemplatesPage {
	constructor(parent, id) {
		this.parent = parent
		this.id = id
		this.data = this.getData()
        
        const devicePrices = [999, 1099, 1199]
        this.discount = Math.min(50, Math.floor(this.sumOfSquares(devicePrices) / 100000)) 
        this.findAnagrams = this.findAnagrams.bind(this)

	}

	getData() {
		const cards = [
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
        

		return (
			cards.find(card => card.id === Number(this.id)) ||
			cards[0]
		)
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
                
                ${this.data.description ? `
                    <div class="description-container">
                        <p class="description-text">${this.data.description}</p>
                    </div>
                ` : ''}

                
                <div class="discount-block">
                    <h4>Специальное предложение</h4>
                    <p>При покупке нескольких устройств вы получаете прогрессивную скидку!</p>
                    <p>Текущая рассчитанная скидка: <strong>${this.discount}%</strong></p>
                    <small>Скидка рассчитывается на основе суммы квадратов цен устройств</small>
                </div>
            



                <div class="col-md-6 col-lg-3">
                    <div class="card tool-card p-3">
                        <h5 class="card-title">Поиск анаграмм</h5>
                        <p class="card-text text-muted small">Группировка слов по схожести букв</p>
                        <div class="mb-3">
                            <label class="form-label">Введите слова через запятую:</label>
                            <input type="text" 
                                class="form-control" 
                                id="anagramsInput" 
                                value="Siri, Iris, paid, post, stop, tops, pots, iPad, iPhone">
                        </div>
                        <button id="btn-find-anagrams" 
                                class="btn btn-primary w-100" 
                                onclick="findAnagrams()">
                            Найти анаграммы
                        </button>
                        <div class="result-box mt-3">
                            <p class="mb-1"><strong>Результат:</strong></p>
                            <div id="AnagramResults">-</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }

    findAnagrams() {
        const userInput = document.getElementById('anagramsInput').value;
        const wordsList = userInput.split(',').map(word => word.trim()).filter(word => word);
        
        const anagramMap = {};
        
        for (const word of wordsList) {
            const normalizedKey = word.toLowerCase().split('').sort().join('');
            if (!anagramMap[normalizedKey]) {
                anagramMap[normalizedKey] = [];
            }
            anagramMap[normalizedKey].push(word);
        }
        
        const resultGroups = Object.values(anagramMap)
            .filter(group => group.length >= 2)
            .map(group => group.sort())
            .sort((a, b) => a[0].localeCompare(b[0]));
        
        let resultHTML = '';
        if (resultGroups.length === 0) {
            resultHTML = 'Анаграммы не найдены';
        } else {
            resultGroups.forEach(group => {
                resultHTML += `
                    <div class="mb-2">
                        <span class="badge bg-light text-dark">Группа:</span> 
                        ${group.join(', ')}
                    </div>
                `;
            });
            
            const hasMatchingGroup = resultGroups.some(group => 
                this.isSameOutput(group, wordsList)
            );
            
            if (hasMatchingGroup) {
                resultHTML += `
                    <div class="mt-3 text-muted">
                        Группа совпадает с исходным списком слов
                    </div>
                `;
            } else {
                resultHTML += `
                    <div class="mt-3 text-muted">
                        Группы не совпадают с исходным списком слов
                    </div>
                `;
            }
        }
        
        document.getElementById('AnagramResults').innerHTML = resultHTML;
    }
    
    isSameOutput(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
    
        const normalize = (item) => 
            typeof item === 'string' ? item.toLowerCase() : item;
        
        const sortedArr1 = [...arr1.map(normalize)].sort();
        const sortedArr2 = [...arr2.map(normalize)].sort();
    
        return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render(this.clickBack.bind(this))

        const carouselContainer = document.getElementById('carousel-container')
        const carousel = new CaruselComponent(carouselContainer)
        document.getElementById("btn-find-anagrams").addEventListener('click', this.findAnagrams)

        carousel.render(this.data)
    }
}