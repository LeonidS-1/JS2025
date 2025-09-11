const { IDCounter } = require('../db/counter');

class Service {
    constructor(repository) {
      this.repo = repository;
      this.idCounter = new IDCounter();
    }
  
    findAppleCards(filters = {}) {
      if (filters.id) {
        return this.repo.findById(filters.id);
      }
      return this.repo.find(filters);
    }
  
    addAppleCard(data) {
      
      const newId = this.idCounter.getNextId();
      const appleCardData = {
        ...data,
        id: newId
      };
      return this.repo.insert(appleCardData);
    }
  
    updateAppleCard(id, updatedData) {
      return this.repo.update(id, updatedData);
    }
  
    deleteAppleCard(id) {
      return this.repo.delete(id);
    }
}

module.exports={
    Service,
}