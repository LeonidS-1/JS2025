class AppleCardDTO {
	constructor(data) {
	  AppleCardDTO._validate(data);
	  this.id = data.id || null;
	  this.title = data.title;
	  this.description = data.description;
	  this.elements = data.elements;
	}
  
	static _validate(data) {
	  if (data.id !== undefined) {
		const numberId = Number.parseInt(data.id);
		if (Number.isNaN(numberId)) {
		  throw new Error('Invalid appleCard ID');
		}
	  }
  
	  if (!data.title || typeof data.title !== 'string') {
		throw new Error('Title is required');
	  }
  
	  if (!Array.isArray(data.elements)) {
		throw new Error('Elements must be an array');
	  }
	}
  
	toJSON() {
	  return {
		id: this.id,
		title: this.title,
		description: this.description,
		elements: this.elements,
	  };
	}
  }

module.exports={
	AppleCardDTO,
}