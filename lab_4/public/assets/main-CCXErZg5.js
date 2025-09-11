const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-jcNnNxvU.js","./index-BDYl8xd5.css"])))=>i.map(i=>d[i]);
import{m as f,S as P,C as H,P as k,W as R,a as D,A as S,D as $,G as A,B as q,V as B,H as L}from"./index-jcNnNxvU.js";class U{constructor(e){this.parent=e}getHTML(){return`
    <div class="templates-card">
        <div class="card-body-custom" style="text-align: center;  justify-content: center;">
            <button id="add-card-button" type="button" >Смотреть еще</button>       
        </div>
    </div>`}addListeners(e){document.getElementById("add-card-button").addEventListener("click",e)}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class _{constructor(e){this.parent=e}getHTML(e){return`
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
    `}addListeners(e,t,n,s){document.getElementById(`view-${e.id}`).addEventListener("click",t),document.getElementById(`remove-${e.id}`).addEventListener("click",n),document.getElementById(`explore-${e.id}`).addEventListener("click",s)}render(e,t,n){const s=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(e,t,n,exploreListener)}}class z{constructor(e){this.parent=e,this.scene=null,this.camera=null,this.renderer=null,this.model=null,this.controls=null,this.currentModelPath=null}getHTML(e){const t=this.getModelPath(e.id);return`
			<div class="3d-preview-container" style="width: 100%; height: 300px; position: relative;">
				<div id="3d-preview-${e.id}" class="3d-preview-canvas" style="width: 100%; height: 100%; border-radius: 8px; overflow: hidden;"></div>
				${t?"":'<div class="puzzle-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; color: #ccc;">🧩</div>'}
			</div>
		`}getModelPath(e){return{1:"models/Big Tree.glb",2:"models/Palm Tree.glb",3:"models/Range Rover.glb",4:"models/retro_office_desk.glb"}[e]||null}async getCustomModelPath(e){if(!e||!e.id)return null;try{const t=await f.getModel(e.id);if(t)return f.createModelURL(t)}catch(t){console.error("Ошибка получения пользовательской модели:",t)}return null}async render(e){const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t);let n=null;e.customModel?n=await this.getCustomModelPath(e.customModel):n=this.getModelPath(e.id),n&&await this.init3DScene(e.id,n)}async init3DScene(e,t){const n=document.getElementById(`3d-preview-${e}`);if(n)try{this.scene=new P,this.scene.background=new H(16316922),this.camera=new k(75,n.clientWidth/n.clientHeight,.1,1e3),this.camera.position.set(0,0,5),this.renderer=new R({antialias:!0,alpha:!0}),this.renderer.setSize(n.clientWidth,n.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=D,n.appendChild(this.renderer.domElement);const s=new S(16777215,.6);this.scene.add(s);const o=new $(16777215,.8);o.position.set(10,10,5),o.castShadow=!0,this.scene.add(o);const i=await new A().loadAsync(t);this.model=i.scene;const c=new q().setFromObject(this.model),v=c.getCenter(new B);this.model.position.sub(v);const a=c.getSize(new B),p=2/Math.max(a.x,a.y,a.z);this.model.scale.setScalar(p),this.scene.add(this.model);const m=3;this.camera.position.set(m,m,m),this.camera.lookAt(0,0,0),this.animate(),window.addEventListener("resize",()=>this.onWindowResize(n))}catch(s){console.error("Ошибка загрузки модели:",s),n.innerHTML='<div class="puzzle-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; color: #ccc;">🧩</div>'}}animate(){!this.renderer||!this.scene||!this.camera||(requestAnimationFrame(()=>this.animate()),this.model&&(this.model.rotation.y+=.01),this.renderer.render(this.scene,this.camera))}onWindowResize(e){!this.camera||!this.renderer||(this.camera.aspect=e.clientWidth/e.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.clientWidth,e.clientHeight))}dispose(){this.renderer&&this.renderer.dispose(),this.scene&&this.scene.clear()}}class j{constructor(e){this.parent=e,this.buttonGroup=new _(e),this.threeDPreview=new z(e)}getHTML(e){return`
    <div class="templates-card" data-id="${e.id}">
        <div class="card-body-custom">
            <h5 class="card-title-custom">${e.title}</h5>
            <div class="button-group-container">
                ${this.buttonGroup.getHTML(e)}
            </div>
            <div class="mt-3 text-muted">
			${e.description.map(t=>`${t}</p>`).join("")}
			</div>
            ${this.threeDPreview.getHTML(e)}
            
        </div>
    </div>`}render(e,t,n,s){const o=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",o),this.buttonGroup.addListeners(e,t,n,s),this.threeDPreview.render(e)}}class O{constructor(e,t){this.parent=e,this.onSearch=t}getHTML(){return`
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
        </div>`}addListeners(){const e=document.getElementById("searchInput"),t=document.getElementById("searchButton"),n=document.getElementById("clearSearch");t.addEventListener("click",()=>{this.onSearch(e.value.trim().toLowerCase())}),e.addEventListener("keypress",s=>{s.key==="Enter"&&this.onSearch(e.value.trim().toLowerCase())}),n.addEventListener("click",()=>{e.value="",this.onSearch("")})}render(){this.parent.insertAdjacentHTML("afterbegin",this.getHTML()),this.addListeners()}}class G{get(e,t){console.log("GET request to:",e);const n=this._makeRequest("GET",e);return t&&n.then(({data:s,status:o})=>t(s,o)).catch(s=>{console.error("GET request error:",s),t(null,0)}),n}post(e,t,n){console.log("POST request to:",e),console.log("POST data:",t);const s=this._makeRequest("POST",e,t);return n&&s.then(({data:o,status:r})=>n(o,r)).catch(o=>{console.error("POST request error:",o),n(null,0)}),s}put(e,t,n){console.log("PUT request to:",e),console.log("PUT data:",t);const s=this._makeRequest("PUT",e,t);return n&&s.then(({data:o,status:r})=>n(o,r)).catch(o=>{console.error("PUT request error:",o),n(null,0)}),s}delete(e,t){console.log("DELETE request to:",e);const n=this._makeRequest("DELETE",e);return t&&n.then(({data:s,status:o})=>t(s,o)).catch(s=>{console.error("DELETE request error:",s),t(null,0)}),n}async _makeRequest(e,t,n=null){try{const s={method:e,headers:{"Content-Type":"application/json"}};n&&(e==="POST"||e==="PUT")&&(s.body=JSON.stringify(n));const o=await fetch(t,s);return console.log(`${e} response status:`,o.status),{data:await this._handleResponse(o),status:o.status}}catch(s){throw console.error(`${e} request error:`,s),s}}async _handleResponse(e){try{const t=await e.text();if(console.log("Response text:",t),!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return t?JSON.parse(t):null}catch(t){throw console.error("Ошибка обработки ответа:",t),t}}}const g=new G;class W{constructor(){this.baseUrl="http://localhost:8001"}getTemplates(){return`${this.baseUrl}/templates`}getTemplateById(e){return`${this.baseUrl}/templates/${e}`}createTemplate(){return`${this.baseUrl}/templates`}updateTemplate(e){return`${this.baseUrl}/templates/${e}`}deleteTemplate(e){return`${this.baseUrl}/templates/${e}`}}const y=new W,F="modulepreload",N=function(l,e){return new URL(l,e).href},M={},x=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let v=function(a){return Promise.all(a.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const r=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=v(t.map(a=>{if(a=N(a,n),a in M)return;M[a]=!0;const u=a.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(!!n)for(let b=r.length-1;b>=0;b--){const h=r[b];if(h.href===a&&(!u||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${p}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":F,u||(d.as="script"),d.crossOrigin="",d.href=a,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((b,h)=>{d.addEventListener("load",b),d.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${a}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};class V{constructor(e){this.parent=e,this.uploadedModel=null}getHTML(){return`
            <div class="model-upload-container">
                <h5>3D Модель</h5>
                <div class="mb-3">
                    <label for="model-file" class="form-label">Выберите .glb файл</label>
                    <input type="file" class="form-control" id="model-file" accept=".glb" />
                    <div class="form-text">Поддерживаются только файлы формата .glb</div>
                </div>
                
                <div id="model-preview-container" class="model-preview" style="display: none;">
                    <h6>Предпросмотр модели:</h6>
                    <div id="model-preview-canvas" style="width: 100%; height: 200px; border: 1px solid #ddd; border-radius: 8px; background: #f8f9fa;"></div>
                    <div class="mt-2">
                        <small class="text-muted" id="model-info"></small>
                    </div>
                </div>
                
                <div id="upload-status" class="mt-2"></div>
            </div>
        `}async render(){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addEventListeners()}addEventListeners(){const e=document.getElementById("model-file"),t=document.getElementById("model-preview-container"),n=document.getElementById("upload-status");e.addEventListener("change",async s=>{const o=s.target.files[0];if(!o){t.style.display="none",n.innerHTML="",this.uploadedModel=null;return}if(!o.name.toLowerCase().endsWith(".glb")){n.innerHTML='<div class="alert alert-danger">Пожалуйста, выберите файл формата .glb</div>';return}if(o.size>50*1024*1024){n.innerHTML='<div class="alert alert-danger">Размер файла не должен превышать 50MB</div>';return}try{n.innerHTML='<div class="alert alert-info">Загрузка и предпросмотр модели...</div>';const r=await f.saveModel(o,o.name);this.uploadedModel=r;const i=document.getElementById("model-info");i.textContent=`Название: ${r.name} | Размер: ${(r.fileSize/1024/1024).toFixed(2)} MB`,await this.createPreview(r),t.style.display="block",n.innerHTML='<div class="alert alert-success">Модель успешно загружена!</div>'}catch(r){console.error("Ошибка загрузки модели:",r),n.innerHTML='<div class="alert alert-danger">Ошибка загрузки модели: '+r.message+"</div>"}})}async createPreview(e){const t=document.getElementById("model-preview-canvas");t.innerHTML="";try{const n=await x(()=>import("./index-jcNnNxvU.js").then(w=>w.t),__vite__mapDeps([0,1]),import.meta.url),{GLTFLoader:s}=await x(async()=>{const{GLTFLoader:w}=await import("./index-jcNnNxvU.js").then(C=>C.g);return{GLTFLoader:w}},__vite__mapDeps([0,1]),import.meta.url),o=new n.Scene;o.background=new n.Color(16316922);const r=new n.PerspectiveCamera(75,t.clientWidth/t.clientHeight,.1,1e3);r.position.set(2,2,2);const i=new n.WebGLRenderer({antialias:!0,alpha:!0});i.setSize(t.clientWidth,t.clientHeight),i.setPixelRatio(window.devicePixelRatio),t.appendChild(i.domElement);const c=new n.AmbientLight(16777215,.6);o.add(c);const v=new n.DirectionalLight(16777215,.8);v.position.set(5,5,5),o.add(v);const a=f.createModelURL(e),m=(await new s().loadAsync(a)).scene,d=new n.Box3().setFromObject(m),b=d.getCenter(new n.Vector3);m.position.sub(b);const h=d.getSize(new n.Vector3),I=1.5/Math.max(h.x,h.y,h.z);m.scale.setScalar(I),o.add(m);const T=()=>{requestAnimationFrame(T),m.rotation.y+=.01,i.render(o,r)};T(),f.revokeModelURL(a)}catch(n){console.error("Ошибка создания предпросмотра:",n),t.innerHTML='<div class="text-center p-4"><p class="text-muted">Не удалось создать предпросмотр модели</p></div>'}}getUploadedModel(){return this.uploadedModel}clearUpload(){const e=document.getElementById("model-file"),t=document.getElementById("model-preview-container"),n=document.getElementById("upload-status");e.value="",t.style.display="none",n.innerHTML="",this.uploadedModel=null}}class J{constructor(e){this.parent=e,this.modelUpload=new V(e)}get pageRoot(){return document.getElementById("add-page")}getHTML(){return`
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
                </div>

                <div class="mb-3">
                    <div id="model-upload-container"></div>
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
        `}clickBack(){new E(this.parent).render()}addDescriptionLine(e="",t=null){const n=document.getElementById("description-container"),s=t!==null?t:n.children.length,o=document.createElement("div");o.className="description-line",o.innerHTML=`
            <input type="text" class="form-control" 
                   placeholder="Введите строку описания" 
                   value="${e}"
                   data-index="${s}">
            <button type="button" class="apple-btn apple-btn-secondary mb-2" 
                    onclick="this.closest('.description-line').remove()">×</button>
        `,n.appendChild(o)}getDescriptionLines(){const e=document.querySelectorAll("#description-container input");return Array.from(e).map(t=>t.value.trim()).filter(t=>t!=="")}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new L(e).render(this.clickBack.bind(this)),document.getElementById("add-description-line").addEventListener("click",()=>{this.addDescriptionLine()}),document.getElementById("model-upload-container"),this.modelUpload.render(),document.getElementById("add-form").addEventListener("submit",async s=>{s.preventDefault();const o=this.modelUpload.getUploadedModel(),r={title:document.getElementById("title").value,description:this.getDescriptionLines(),elements:[{title:document.getElementById("element1-title").value,src:document.getElementById("element1-src").value},{title:document.getElementById("element2-title").value,src:document.getElementById("element2-src").value},{title:document.getElementById("element3-title").value,src:document.getElementById("element3-src").value}],customModel:o?{id:o.id,name:o.name,fileName:o.fileName}:null};try{const{data:i,status:c}=await g.post(y.createTemplate(),r);c===201?this.clickBack():console.error("Ошибка создания карточки:",c,i)}catch(i){console.error("Ошибка при создании карточки:",i)}})}}class K{constructor(e,t){this.parent=e,this.cardId=t}get pageRoot(){return document.getElementById("edit-page")}getHTML(){return`
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
        `}clickBack(){new E(this.parent).render()}async loadCardData(){try{const{data:e,status:t}=await g.get(y.getTemplateById(this.cardId));if(t===200&&e){document.getElementById("title").value=e.title;const n=document.getElementById("description-container");n.innerHTML="",(Array.isArray(e.description)?e.description:[e.description||""]).forEach((o,r)=>{this.addDescriptionLine(o,r)}),e.elements.forEach((o,r)=>{const i=r+1;document.getElementById(`element${i}-title`).value=o.title,document.getElementById(`element${i}-src`).value=o.src})}else console.error("Ошибка загрузки данных карточки:",t,e),this.clickBack()}catch(e){console.error("Ошибка при загрузке данных карточки:",e),this.clickBack()}}addDescriptionLine(e="",t=null){const n=document.getElementById("description-container"),s=t!==null?t:n.children.length,o=document.createElement("div");o.className="description-line",o.innerHTML=`
            <input type="text" class="form-control" 
                   placeholder="Введите строку описания" 
                   value="${e}"
                   data-index="${s}">
            <button type="button" class="apple-btn apple-btn-secondary mb-2" 
                    onclick="this.closest('.description-line').remove()">×</button>
        `,n.appendChild(o)}getDescriptionLines(){const e=document.querySelectorAll("#description-container input");return Array.from(e).map(t=>t.value.trim()).filter(t=>t!=="")}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new L(e).render(this.clickBack.bind(this)),this.loadCardData(),document.getElementById("add-description-line").addEventListener("click",()=>{this.addDescriptionLine()}),document.getElementById("edit-form").addEventListener("submit",async s=>{s.preventDefault();const o={id:this.cardId,title:document.getElementById("title").value,description:this.getDescriptionLines(),elements:[{title:document.getElementById("element1-title").value,src:document.getElementById("element1-src").value},{title:document.getElementById("element2-title").value,src:document.getElementById("element2-src").value},{title:document.getElementById("element3-title").value,src:document.getElementById("element3-src").value}]};try{const{data:r,status:i}=await g.put(y.updateTemplate(this.cardId),o);i===200?this.clickBack():console.error("Ошибка обновления карточки:",i,r)}catch(r){console.error("Ошибка при обновлении карточки:",r)}})}}class E{constructor(e){this.parent=e,this.data=[],this.nextAdd=0,this.handleSearch=this.handleSearch.bind(this)}async getData(){try{const{data:e,status:t}=await g.get(y.getTemplates());t===200&&e?(this.data=e,this.renderCards(this.data,!0)):(console.error("Ошибка получения данных:",t),this.data=[],this.renderCards(this.data,!0))}catch(e){console.error("Ошибка при загрузке данных:",e),this.data=[],this.renderCards(this.data,!0)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

        
        <div id="search-filter-container"></div>
        
        <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>
         
        `}handleSearch(e){if(e){const t=this.data.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()));this.renderCards(t,!1)}else this.renderCards(this.data,!0)}renderCards(e,t){const n=this.pageRoot;if(!n){console.error("Page root element not found");return}n.innerHTML="",console.log(this.data),e.forEach(s=>{new j(n).render(s,()=>this.clickCard(s.id),()=>this.handleRemoveCard(s.id),()=>this.clickCard2(s.id))}),t&&new U(n).render(()=>this.handleAddCard())}clickCard(e){new K(this.parent,e).render()}clickCard2(e){const t=this.data.find(o=>o.id===e),n=t?encodeURIComponent(t.title):"3D Модель";let s="";t&&t.customModel&&(s=`&customModel=${encodeURIComponent(JSON.stringify(t.customModel))}`),window.location.href=`./pages/model-detail/index.html?id=${e}&title=${n}${s}`}handleAddCard(){new J(this.parent).render()}async handleRemoveCard(e){try{const{data:t,status:n}=await g.delete(y.deleteTemplate(e));n===200?(this.data=this.data.filter(s=>s.id!==e),this.renderCards(this.data,!0)):console.error("Ошибка удаления карточки:",n)}catch(t){console.error("Ошибка при удалении карточки:",t)}}render(){if(!this.parent){console.error("Parent element is not defined");return}this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const e=document.getElementById("home-button-container");new L(e).render();const n=document.getElementById("search-filter-container");new O(n,this.handleSearch).render(),this.getData()}}const Q=document.getElementById("root"),X=new E(Q);X.render();
