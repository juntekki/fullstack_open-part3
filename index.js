require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json()) 
//app.use(logger)




const cors = require('cors')
app.use(cors())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
  })

  const isPostMethod = (req) => req.method === 'POST'
  const postFormat = ':method :url :status :res[content-length] - :response-time ms :body'


  app.use(morgan('tiny', {
    skip: isPostMethod
  }))
  
  app.use(morgan(postFormat, {
    skip: (req, res) => !isPostMethod(req,res)
  }))

  const isInvalid = person => !person.name || !person.number

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
    var count = Person.length
    const info = `<p>Phonebook has info for ${count} people.</p>
                  <p>${(new Date()).toString()}
                 `
    res.send(info)

})


const errorHandler = (error, req, res, next) => {
    console.log(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ error: 'malformed id' })
    } else if (error.name ==='ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    next(error)
  }
  app.use(errorHandler)



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
    // res.json(persons)

    Person.find({})
    .then(persons =>
      res.json(persons.map(person => person.toJSON()))
    )
    .catch(error =>
      next(error)
    )
})

app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })

    // const id = Number(req.params.id)
    // const person = persons.find(persons => persons.id === id)

    // if (person) {
    //     res.json(person)
    // } else {
    //     res.status(404).end()
    // }
})


app.post('/api/persons', (request, response, next) => {
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


    // if (isMatch(body.name)) {
    //     return response.status(400).json({
    //         error: 'name already exists'
    //     })
    // }


    // //Checks if the name is already in the persons list
    // function isMatch(name) {
    //     for(var i=0;i<persons.length;i++){
    //         if(persons[i].name==name){
    //            console.log("Found match");
    //            return true;
    //         }
    //      }
    //      return false;
    // }

    const person = new Person({
        name: body.name,
        number: body.number
      })
    
      person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
      }).catch(error => next(error))

    // const person = {
    //     name: body.name,
    //     number: body.number,
    //     id: Math.random(8, 1000)
    // }

    // persons = persons.concat(person)

    // response.json(person)
})


app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

    // const id = Number(request.params.id)
    // persons = persons.filter(persons => persons.id !== id)

    // response.status(204).end()
})




app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
  
    if (isInvalid(req.body)) {
      return res.status(400).json({
        error: 'Both name and number must be defined.'
      })
    }
  
    const person = {
      name: body.name,
      number: body.number
    }
  
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        if (updatedPerson) {
          res.json(updatedPerson.toJSON())
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})