const { Router } = require("express")
const { AppleCardDTO } = require("../domain/appleCard");

class Controller {
    constructor(service) {
        this.service = service

        this.findAppleCards = this.findAppleCards.bind(this);
        this.addAppleCard = this.addAppleCard.bind(this);
        this.updateAppleCard = this.updateAppleCard.bind(this);
        this.deleteAppleCard = this.deleteAppleCard.bind(this);
        this.findAppleCardById = this.findAppleCardById.bind(this);
    }

    findAppleCards(req, res) {
        try {
            const filters = {
                ...req.query,
                id: req.params.id ? Number(req.params.id) : undefined
            }
            
            const result = this.service.findAppleCards(filters)
            
            res.json(result.map(item => new AppleCardDTO(item).toJSON()))
        } catch (err) {
            console.log(err)
            res.status(400).json({ 
                status: 'error',
                message: err.message
            })
        }
    }

    findAppleCardById(req, res) {
        try {
            const id = Number.parseInt(req.params.id)
            const result = this.service.findAppleCards({id})
            if (!result){
                res.status(404).json({ 
                    status: 'not found'
                })
                return
            }
            res.json(new AppleCardDTO(result).toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).json({ 
                status: 'error',
                message: err.message
            })
        }
    }

    updateAppleCard(req, res) {
        try {
            const id = Number(req.params.id)
            const data = new AppleCardDTO(req.body)
            
            const result = this.service.updateAppleCard(id, data)
            if (!result){
                res.status(404).json({ 
                    status: 'not found'
                })
                return
            }

            res.json(new AppleCardDTO(result).toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).json({
                status: 'error', 
                message: err.message
            })
        }
    }

    addAppleCard(req, res) {
        try {
            const data = new AppleCardDTO(req.body)
            const result = this.service.addAppleCard(data)
            res.status(201).json(new AppleCardDTO(result).toJSON())
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }

    deleteAppleCard(req, res) {
        try {
            const id = Number(req.params.id)
            const result = this.service.deleteAppleCard(id)
            if (!result){
                res.status(404).json({ 
                    status: 'not found'
                })
                return
            }
            
            res.json({
                deleted: id,
                count: result.length
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }
}

function SetupRoutes(service){
    controller=new Controller(service)

    const router = Router()

    router.get('/', controller.findAppleCards)
    router.get('/:id', controller.findAppleCardById)
    router.post('/', controller.addAppleCard)
    router.delete('/:id', controller.deleteAppleCard)
    router.put('/:id', controller.updateAppleCard)

    return router
}

module.exports={
    SetupRoutes,
}