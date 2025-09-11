const express = require('express')

const { SetupRoutes } = require('../../internal/controller/controller')
const { DBConnector } = require('../../internal/db/db')
const { Repository } = require('../../internal/repository/repository')
const { Service } = require('../../internal/service/service')
const app = express()
const host = 'localhost'
const port = 8001

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
};

app.use(corsMiddleware)

app.use(express.json())

// Обслуживание статических файлов из папки dist
app.use(express.static('dist'))

db=new DBConnector("templates.json")

repo=new Repository(db)

service=new Service(repo)

router=SetupRoutes(service)

app.use('/templates', router)

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'dist' })
})

app.listen(port, host, () => {
	console.log(`Сервер запущен по адресу http://${host}:${port}`)
})
