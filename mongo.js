const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://kayttaja:${password}@cluster0.cxpgs.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)



const showPeople = () => {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}

const addPerson = (name, number) => {
  const person = new Person({ name, number })
  person.save().then(result => {
    console.log('added', name, 'with number', number, 'to phonebook')
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  showPeople()
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  addPerson(name, number)
} else {
  console.log('invalid number of parameters')
  process.exit(1)
}



// const person = new Person({
//   name: 'Juuso',
//   number: '040123123',
// })

// person.save().then(response => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })