class AppleCardUrls {
    constructor() {
        this.baseUrl = 'http://localhost:8001';
    }

    getAppleCards() {
        return `${this.baseUrl}/appleCards`;
    }

    getAppleCardById(id) {
        return `${this.baseUrl}/appleCards/${id}`;
    }

    createAppleCard() {
        return `${this.baseUrl}/appleCards`;
    }

    updateAppleCard(id) {
        return `${this.baseUrl}/appleCards/${id}`;
    }

    deleteAppleCard(id) {
        return `${this.baseUrl}/appleCards/${id}`;
    }
}

export const appleCardUrls = new AppleCardUrls(); 