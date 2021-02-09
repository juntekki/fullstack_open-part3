const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json()) 
const cors = require('cors')
app.use(cors())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
  })

  const isPostMethod = (req) => req.method === 'POST'
  const postFormat = ':method :url :status :res[content-length] - :response-time ms :body'


  app.use(express.static('build'))

  app.use(morgan('tiny', {
    skip: isPostMethod
  }))
  
  app.use(morgan(postFormat, {
    skip: (req, res) => !isPostMethod(req,res)
  }))


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Juuso",
        "number": "123",
        "id": 5
    },
    {
        "name": "Pete",
        "number": "12345",
        "id": 6
    },
    {
        "name": "Marjo",
        "number": "040-123-123",
        "id": 7
    }
]


app.get('/info', (req, res, next) => {

    const info = `<p>Phonebook has info for ${persons.length} people.</p>
                  <p>${(new Date()).toString()}
                 `
    res.send(info)

})


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(persons => persons.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }


    if (isMatch(body.name)) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }


    //Checks if the name is already in the persons list
    function isMatch(name) {
        for(var i=0;i<persons.length;i++){
            if(persons[i].name==name){
               console.log("Found match");
               return true;
            }
         }
         return false;
    }


    const person = {
        name: body.name,
        number: body.number,
        id: Math.random(8, 1000)
    }

    persons = persons.concat(person)

    response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})