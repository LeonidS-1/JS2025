(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();class p{constructor(e){this.parent=e}getHTML(){return`
    <div class="templates-card">
        <div class="card-body-custom" style="text-align: center;  justify-content: center;">
            <button id="add-card-button" type="button" >Смотреть еще</button>       
        </div>
    </div>`}addListeners(e){document.getElementById("add-card-button").addEventListener("click",e)}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class h{constructor(e){this.parent=e}getHTML(e){return`
     <div class="btn-group mt-3" role="group" aria-label="Действия с карточкой">
    <button type="button" 
            class="apple-btn apple-btn-secondary" 
            id="remove-${e.id}">
        <i class="bi bi-trash"></i> Не интересно
    </button>
    <button type="button" 
            class="apple-btn apple-btn-primary" 
            id="view-${e.id}">
        <i class="bi bi-calculator"></i> Редактировать
    </button>
	<button type="button" 
            class="apple-btn apple-btn-primary" 
            id="explore-${e.id}">
        <i class="bi bi-calculator"></i> Узнать больше
    </button>
</div>
    `}addListeners(e,t,s,n){document.getElementById(`view-${e.id}`).addEventListener("click",t),document.getElementById(`remove-${e.id}`).addEventListener("click",s),document.getElementById(`explore-${e.id}`).addEventListener("click",n)}render(e,t,s){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),this.addListeners(e,t,s,exploreListener)}}class m{constructor(e){this.parent=e}getHTML(e){return`
    <div class="carousel-container" style="width: 100%; overflow: hidden;">
    <div id="carousel-${e.id}" class="carousel slide" style="width: 100%;">
        <div class="carousel-indicators">
            <button style="background-color:#1C1C1E" type="button" data-bs-target="#carousel-${e.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button style="background-color:#1C1C1E" type="button" data-bs-target="#carousel-${e.id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button style="background-color:#1C1C1E" type="button" data-bs-target="#carousel-${e.id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" style="width: 100%;">
            ${e.elements.map((t,s)=>`
                <div class="carousel-item ${s===0?"active":""}" style="width: 100%;">
                    <img src="${t.src}" alt="Icon ${t.title}" >
                </div>
            `).join("")}
        </div>
    </div>
</div>`}render(e){const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t)}}class b{constructor(e){this.parent=e,this.buttonGroup=new h(e),this.carousel=new m(e)}getHTML(e){return`
    <div class="templates-card" data-id="${e.id}">
        <div class="card-body-custom">
            <h5 class="card-title-custom">${e.title}</h5>
            <div class="button-group-container">
                ${this.buttonGroup.getHTML(e)}
            </div>
            <div class="mt-3 text-muted">
			${e.description.map(t=>`${t}</p>`).join("")}
			</div>
            ${this.carousel.getHTML(e)}
            
        </div>
    </div>`}render(e,t,s,n){const r=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",r),this.buttonGroup.addListeners(e,t,s,n)}}class d{constructor(e){this.parent=e}addListeners(e){document.getElementById("home-button").addEventListener("click",e)}getHTML(){return`
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
</button>`}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class v{constructor(e,t){this.parent=e,this.onSearch=t}getHTML(){return`
        <div class="search-filter-container p-3" style="background-color: #f8f9fa;">
            <div class="input-group">
                <input type="text" 
                       id="searchInput" 
                       class="form-control" 
                       placeholder="Поиск по apple.com..." 
                       aria-label="Поиск">
                <button class="btn" id="searchButton" style="background-color: #86868B; 
                       border: 1px solid #86868B;
                       color: #ffffff;
                       transition: all 0.3s ease;">
                    <i class="bi bi-search"></i> Поиск
                </button>
                <button class="btn" type="button" id="clearSearch" style="background-color: #white; 
                       border: 1px solid #e5e7eb;
                       color: #86868B;
                       transition: all 0.3s ease;">
                    <i class="bi bi-x-lg"></i> Очистить
                </button>
            </div>
        </div>`}addListeners(){const e=document.getElementById("searchInput"),t=document.getElementById("searchButton"),s=document.getElementById("clearSearch");t.addEventListener("click",()=>{this.onSearch(e.value.trim().toLowerCase())}),e.addEventListener("keypress",n=>{n.key==="Enter"&&this.onSearch(e.value.trim().toLowerCase())}),s.addEventListener("click",()=>{e.value="",this.onSearch("")})}render(){this.parent.insertAdjacentHTML("afterbegin",this.getHTML()),this.addListeners()}}class g{get(e,t){console.log("GET request to:",e);const s=this._makeRequest("GET",e);return t&&s.then(({data:n,status:r})=>t(n,r)).catch(n=>{console.error("GET request error:",n),t(null,0)}),s}post(e,t,s){console.log("POST request to:",e),console.log("POST data:",t);const n=this._makeRequest("POST",e,t);return s&&n.then(({data:r,status:a})=>s(r,a)).catch(r=>{console.error("POST request error:",r),s(null,0)}),n}put(e,t,s){console.log("PUT request to:",e),console.log("PUT data:",t);const n=this._makeRequest("PUT",e,t);return s&&n.then(({data:r,status:a})=>s(r,a)).catch(r=>{console.error("PUT request error:",r),s(null,0)}),n}delete(e,t){console.log("DELETE request to:",e);const s=this._makeRequest("DELETE",e);return t&&s.then(({data:n,status:r})=>t(n,r)).catch(n=>{console.error("DELETE request error:",n),t(null,0)}),s}async _makeRequest(e,t,s=null){try{const n={method:e,headers:{"Content-Type":"application/json"}};s&&(e==="POST"||e==="PUT")&&(n.body=JSON.stringify(s));const r=await fetch(t,n);return console.log(`${e} response status:`,r.status),{data:await this._handleResponse(r),status:r.status}}catch(n){throw console.error(`${e} request error:`,n),n}}async _handleResponse(e){try{const t=await e.text();if(console.log("Response text:",t),!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return t?JSON.parse(t):null}catch(t){throw console.error("Ошибка обработки ответа:",t),t}}}const l=new g;class f{constructor(){this.baseUrl="http://localhost:8001"}getTemplates(){return`${this.baseUrl}/templates`}getTemplateById(e){return`${this.baseUrl}/templates/${e}`}createTemplate(){return`${this.baseUrl}/templates`}updateTemplate(e){return`${this.baseUrl}/templates/${e}`}deleteTemplate(e){return`${this.baseUrl}/templates/${e}`}}const c=new f;class y{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("add-page")}getHTML(){return`
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
                <label class="form-label">Описание карточки</label>
                <div id="description-container">
                    
                </div>
                <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="add-description-line">
                    + Добавить строку
                </button>

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
        `}clickBack(){new u(this.parent).render()}addDescriptionLine(e="",t=null){const s=document.getElementById("description-container"),n=t!==null?t:s.children.length,r=document.createElement("div");r.className="description-line",r.innerHTML=`
            <input type="text" class="form-control" 
                   placeholder="Введите строку описания" 
                   value="${e}"
                   data-index="${n}">
            <button type="button" class="apple-btn apple-btn-secondary mb-2" 
                    onclick="this.closest('.description-line').remove()">×</button>
        `,s.appendChild(r)}getDescriptionLines(){const e=document.querySelectorAll("#description-container input");return Array.from(e).map(t=>t.value.trim()).filter(t=>t!=="")}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new d(e).render(this.clickBack.bind(this)),document.getElementById("add-description-line").addEventListener("click",()=>{this.addDescriptionLine()}),document.getElementById("add-form").addEventListener("submit",async n=>{n.preventDefault();const r={title:document.getElementById("title").value,description:this.getDescriptionLines(),elements:[{title:document.getElementById("element1-title").value,src:document.getElementById("element1-src").value},{title:document.getElementById("element2-title").value,src:document.getElementById("element2-src").value},{title:document.getElementById("element3-title").value,src:document.getElementById("element3-src").value}]};try{const{data:a,status:i}=await l.post(c.createTemplate(),r);i===201?this.clickBack():console.error("Ошибка создания карточки:",i,a)}catch(a){console.error("Ошибка при создании карточки:",a)}})}}class L{constructor(e,t){this.parent=e,this.cardId=t}get pageRoot(){return document.getElementById("edit-page")}getHTML(){return`
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
        `}clickBack(){new u(this.parent).render()}async loadCardData(){try{const{data:e,status:t}=await l.get(c.getTemplateById(this.cardId));if(t===200&&e){document.getElementById("title").value=e.title;const s=document.getElementById("description-container");s.innerHTML="",(Array.isArray(e.description)?e.description:[e.description||""]).forEach((r,a)=>{this.addDescriptionLine(r,a)}),e.elements.forEach((r,a)=>{const i=a+1;document.getElementById(`element${i}-title`).value=r.title,document.getElementById(`element${i}-src`).value=r.src})}else console.error("Ошибка загрузки данных карточки:",t,e),this.clickBack()}catch(e){console.error("Ошибка при загрузке данных карточки:",e),this.clickBack()}}addDescriptionLine(e="",t=null){const s=document.getElementById("description-container"),n=t!==null?t:s.children.length,r=document.createElement("div");r.className="description-line",r.innerHTML=`
            <input type="text" class="form-control" 
                   placeholder="Введите строку описания" 
                   value="${e}"
                   data-index="${n}">
            <button type="button" class="apple-btn apple-btn-secondary mb-2" 
                    onclick="this.closest('.description-line').remove()">×</button>
        `,s.appendChild(r)}getDescriptionLines(){const e=document.querySelectorAll("#description-container input");return Array.from(e).map(t=>t.value.trim()).filter(t=>t!=="")}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new d(e).render(this.clickBack.bind(this)),this.loadCardData(),document.getElementById("add-description-line").addEventListener("click",()=>{this.addDescriptionLine()}),document.getElementById("edit-form").addEventListener("submit",async n=>{n.preventDefault();const r={id:this.cardId,title:document.getElementById("title").value,description:this.getDescriptionLines(),elements:[{title:document.getElementById("element1-title").value,src:document.getElementById("element1-src").value},{title:document.getElementById("element2-title").value,src:document.getElementById("element2-src").value},{title:document.getElementById("element3-title").value,src:document.getElementById("element3-src").value}]};try{const{data:a,status:i}=await l.put(c.updateTemplate(this.cardId),r);i===200?this.clickBack():console.error("Ошибка обновления карточки:",i,a)}catch(a){console.error("Ошибка при обновлении карточки:",a)}})}}class B{constructor(e,t){this.parent=e,this.id=t,this.data=null,this.getData();const s=[999,1099,1199];this.discount=Math.min(50,Math.floor(this.sumOfSquares(s)/1e5)),this.findAnagrams=this.findAnagrams.bind(this),this.clickBack=this.clickBack.bind(this)}async getData(){try{const{data:e,status:t}=await l.get(c.getTemplates());t===200&&e?(this.data=e.find(s=>s.id===Number(this.id))||e[0],this.render()):(console.error("Ошибка получения данных:",t),this.data=null,this.render())}catch(e){console.error("Ошибка при загрузке данных:",e),this.data=null,this.render()}}get pageRoot(){return document.getElementById("api-templates-page")}sumOfSquares(e){return e.reduce((t,s)=>t+Math.pow(s,2),0)}getHTML(){return`
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
                ${this.data.description.map(e=>`${e}</p>`).join("")}
                </div>

                
                
            </div>
        </div>`}clickBack(){const e=this.parent||document.getElementById("root");new u(e).render()}render(){if(!this.parent){console.error("Parent element is not defined in ApiTemplatesPage");return}this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");if(new d(e).render(this.clickBack),this.data){const s=document.getElementById("carousel-container");new m(s).render(this.data);const r=document.getElementById("btn-find-anagrams");r&&r.addEventListener("click",this.findAnagrams)}}}class u{constructor(e){this.parent=e,this.data=[],this.nextAdd=0,this.handleSearch=this.handleSearch.bind(this)}async getData(){try{const{data:e,status:t}=await l.get(c.getTemplates());t===200&&e?(this.data=e,this.renderCards(this.data,!0)):(console.error("Ошибка получения данных:",t),this.data=[],this.renderCards(this.data,!0))}catch(e){console.error("Ошибка при загрузке данных:",e),this.data=[],this.renderCards(this.data,!0)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

        
        <div id="search-filter-container"></div>
        
        <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>
         
        `}handleSearch(e){if(e){const t=this.data.filter(s=>s.title.toLowerCase().includes(e.toLowerCase()));this.renderCards(t,!1)}else this.renderCards(this.data,!0)}renderCards(e,t){const s=this.pageRoot;if(!s){console.error("Page root element not found");return}s.innerHTML="",console.log(this.data),e.forEach(n=>{new b(s).render(n,()=>this.clickCard(n.id),()=>this.handleRemoveCard(n.id),()=>this.clickCard2(n.id))}),t&&new p(s).render(()=>this.handleAddCard())}clickCard(e){new L(this.parent,e).render()}clickCard2(e){new B(this.parent,e).render()}handleAddCard(){new y(this.parent).render()}async handleRemoveCard(e){try{const{data:t,status:s}=await l.delete(c.deleteTemplate(e));s===200?(this.data=this.data.filter(n=>n.id!==e),this.renderCards(this.data,!0)):console.error("Ошибка удаления карточки:",s)}catch(t){console.error("Ошибка при удалении карточки:",t)}}render(){if(!this.parent){console.error("Parent element is not defined");return}this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new d(e).render();const s=document.getElementById("search-filter-container");new v(s,this.handleSearch).render(),this.getData()}}const T=document.getElementById("root"),E=new u(T);E.render();
