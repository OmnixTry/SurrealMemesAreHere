const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const news = require('./news_list.json')
const path = require('path')

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'src')))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    news_list: news.news_list
  })
})

app.get('/article', (req, res) => {
  const oneNews = news.news_list.find((p) => p.id === req.query.id)

  res.render('article', {
    title: `About ${oneNews.firstname} ${oneNews.lastname}`,
    oneNews
  })
})

const server = app.listen(port, () => {
  console.log(`Express is running -> PORT ${port}`)
})

var serv = server
