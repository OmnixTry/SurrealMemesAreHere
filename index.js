const express = require('express');
const app = express();
const port = 3000;
const news = require('./news_list.json')

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/src'));


app.get('/', (req, res) =>{
    res.render('index', {
        title: 'Homepage',
        news_list: news.news_list
    });
});

app.get('/article', (req, res) => {
    const one_news = news.news_list.find(p => p.id === req.query.id);
    
    res.render('article', {
    title: `About ${one_news.firstname} ${one_news.lastname}`,
    one_news,
    });
});

const server = app.listen(port, () => {
    console.log(`Express is running -> PORT ${port}`);
});