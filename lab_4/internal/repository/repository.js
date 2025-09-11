class Repository {
    constructor(dbConnector) {
      this.db = dbConnector;
    }
  
    find(filters = {}) {
      let appleCards = this.db.read();
      
      if (filters.title) {
        appleCards = appleCards.filter(bp =>
          bp.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
  
      if (filters.id !== undefined) {
        appleCards = appleCards.filter(bp => bp.id === filters.id);
      }
  
      return appleCards;
    }

    update(id, updatedData) {
        const appleCards = this.db.read();
        const index = appleCards.findIndex(bp => bp.id === id);

        if (index === -1) return null;

        appleCards[index] = { ...appleCards[index], ...updatedData };
        this.db.write(appleCards);

        return appleCards[index];
    }

    findById(id) {
        return this.db.read().find(bp => bp.id === id) || null;
    }

    insert(appleCard) {
        const appleCards = this.db.read();
        const updatedappleCards = [...appleCards, appleCard];
        this.db.write(updatedappleCards);
        return appleCard;
    }

    delete(id) {
        const appleCards = this.db.read();
        const index = appleCards.findIndex(bp => bp.id === id);

        if (index === -1) return null;
        
        const filteredappleCards = appleCards.filter(bp => bp.id !== id);
        this.db.write(filteredappleCards);
        return filteredappleCards;
    }
}

module.exports={
    Repository,
}