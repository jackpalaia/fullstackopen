import express from 'express'

const app = express()
app.use(express.json())

const entries = [
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
  console.log(response)
  response.json(entries)
})

const port = 3001
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})