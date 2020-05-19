import express from 'express'

const app = express()
app.use(express.json())

let entries = [
  {
    "name": "jack palaia",
    "number": 1111111,
    "id": 1
  },
  {
    "name": "will palaia",
    "number": 22222222,
    "id": 2
  },
  {
    "name": "kate palaia",
    "number": 3333333,
    "id": 3
  }
]

app.get('/api/persons', (request, response) => {
  response.json(entries)
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${entries.length} people</p>
    ${new Date()}
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = entries.find(entry => entry.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  entries = entries.filter(entry => entry.id !== id)

  response.status(204).end()
})

const generateId = () => Math.max(...entries.map(entry => entry.id)) + 1 

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  // error handling
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (entries.some(entry => entry.name === body.name)) {
    return response.status(400).json({
      error: 'name already in phonebook'
    })
  }
  
  const entry = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  entries = entries.concat(entry)

  response.json(entry)
})

const port = 3001
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})