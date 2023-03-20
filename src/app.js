const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const port = 3000
const handlebars = require('express-handlebars')
// const { render } = require('node-sass')
const methodOverride = require('method-override')

const route = require('./routes/index.route')
const db = require('./configs/db')
const SortMiddleware = require('./app/middleware/SortMiddleware')

//connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))

//custom middleware
app.use(SortMiddleware)

//morgan
app.use(morgan('combined'))

//handlebars
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  helpers: {
    sum: (a,b) => a + b,
    sortTable: (field, sort) => {

      const sortType = field === sort.column ? sort.type : 'default'
      const icons = {
        default: 'podium-outline',
        asc: 'trending-up-outline',
        desc: 'trending-down-outline'
      }
      const types = {
        default: 'asc',
        asc: 'desc',
        desc: 'asc'}
      const type = types[sortType]
      const icon = icons[sortType]
      return `<a href="?_sort&column=${field}&type=${type}" >
                  <ion-icon name="${icon}"></ion-icon>
              </a>` 
    },
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

app.use(express.urlencoded())
app.use(express.json())

//Routes init
route(app)

app.listen(port, () => 
  console.log(`Example app listening on port ${port}`)
)