export class SearchFilterComponent {
    constructor(parent, onSearch) {
        this.parent = parent;
        this.onSearch = onSearch;
    }

    getHTML() {
        return `
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
        </div>`;
    }

    addListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const clearButton = document.getElementById('clearSearch');

        
        searchButton.addEventListener('click', () => {
            this.onSearch(searchInput.value.trim().toLowerCase());
        });

        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.onSearch(searchInput.value.trim().toLowerCase());
            }
        });

        
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            this.onSearch('');
        });
    }

    render() {
        this.parent.insertAdjacentHTML('afterbegin', this.getHTML());
        this.addListeners();
    }
}