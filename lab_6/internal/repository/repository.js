class Repository {
    constructor(dbConnector) {
      this.db = dbConnector;
    }
  
    find(filters = {}) {
      let applecards = this.db.read();
      
      if (filters.title) {
        applecards = applecards.filter(bp =>
          bp.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
  
      if (filters.id !== undefined) {
        applecards = applecards.filter(bp => bp.id === filters.id);
      }
  
      return applecards;
    }

    update(id, updatedData) {
        const applecards = this.db.read();
        const index = applecards.findIndex(bp => bp.id === id);

        if (index === -1) return null;

        applecards[index] = { ...applecards[index], ...updatedData };
        this.db.write(applecards);

        return applecards[index];
    }

    findById(id) {
        return this.db.read().find(bp => bp.id === id) || null;
    }

    insert(applecard) {
        const applecards = this.db.read();
        const updatedapplecards = [...applecards, applecard];
        this.db.write(updatedapplecards);
        return applecard;
    }

    delete(id) {
        const applecards = this.db.read();
        const index = applecards.findIndex(bp => bp.id === id);

        if (index === -1) return null;
        
        const filteredapplecards = applecards.filter(bp => bp.id !== id);
        this.db.write(filteredapplecards);
        return filteredapplecards;
    }
}

module.exports={
    Repository,
}