const express = require('express')
const app = express()
var fs = require('fs')
const port = process.env.PORT || 3000
// const news = require('./news_list.json')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://localhost:27017/'

//
// connecting to database on the cloud
//
const uri =
    'mongodb+srv://omnixTry:omnixTry@cluster0-kwws1.mongodb.net/test?retryWrites=true&w=majority'
const mongoClient = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const multer = require('multer')
const upload = multer({ dest: 'src/img/' })

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'src')))

//
// Adding Page Responses
//

app.get('/addpage', urlencodedParser, function (request, response) {
  response.sendFile(path.join(__dirname, 'views/addData.html'))
})
app.post('/upload', upload.array('Image', 2), function (
  request,
  response,
  next
) {
  if (!request.body) return response.sendStatus(400)
  // console.log(request.body)

  const filedata1 = request.files[0]
  const filedata2 = request.files[1]
  const binary1 = fs.readFileSync(filedata1.path).toString('base64')
  const binary2 = fs.readFileSync(filedata2.path).toString('base64')

  // new Buffer(binary1).toString('base64')

  // console.log(filedata1)

  const OneArticle = {
    imgSrc: `${binary1}`,
    title: `${request.body.title}`,
    memeImage: `${binary2}`,
    about: `${request.body.about}`,
    origin: `${request.body.origin}`
  }

  mongoClient.connect(function (err, client) {
    if (err) {
      return console.log(err)
    }
    // console.log('connected to MongoDB: port = 27017')
    const db = client.db('news')
    const collection = db.collection('articles')

    collection.insertOne(OneArticle, (err, result) => {
      if (err) {
        return console.log(err)
      }
      // console.log(result.ops)
      client.close()
    })
  })
  // console.log(filedata1)
  if (!filedata1) response.send('Ошибка при загрузке файла')
  else response.send('Файл загружен')
})
// app.post("/register", urlencodedParser, function (request, response) {
//   if(!request.body) return response.sendStatus(400);
//   console.log(request.body);

//   //response.send(`${request.body.userName} - ${request.body.userAge}`);
// });

/*
mongoClient.connect(function (err, client) {
  if (err) {
    return console.log(err)
  }
  console.log('connected to MongoDB: port = 27017')
  const db = client.db('news')
  const collection = db.collection('articles')
  const user = [
    {
      id: '0',
      imgSrc: '1.png',
      title: 'Meme Man Breaks all the charts!XDXD',
      memeImage: 'stonks.png',
      about:
                'Meme Man refers to a poorly made 3D head which functions as the mascot of the Facebook page Special meme fresh. The head is frequently used in absurd edits, surreal memes and shitposting.',
      origin:
                "According to Special meme fresh's post on Know Your Meme,[1] the 3D model of the head originates from a wonky attempt at a human head posted on 4chan’s 3DCG board long ago. The image was later adapted to be their profile mascot, first appearing in their profile photo on April 9th."
    },
    {
      id: '1',
      imgSrc: '2.png',
      title:
                'Orang - the most untrustworthy creature in the universe!*mischievous*',
      memeImage: 'orang_meme.jpg',
      about:
                "Orang, is a major antagonist of the Surreal Memes multiverse and one of Meme Man's biggest rivals. His full name is thought to be Orang Min. He is the most well-known COLoure. His trustworthiness rating is quite low, so trusting him is mostly advised against. However, he may be the deuteragonist or tritagonist if his rivalry with Meme Man was not truly set in stone. He isn't really much infamous as other antagonists. But, he is half trustworthy and untrustworthy, pretty epical.",
      origin:
                "According to Special meme fresh's post on Know Your Meme,[1] the 3D model of the head originates from a wonky attempt at a human head posted on 4chan’s 3DCG board long ago. The image was later adapted to be their profile mascot, first appearing in their profile photo on April 9th."
    },
    {
      id: '2',
      imgSrc: 'h.jpg',
      title: 'Lettet H. Is there something funnier?',
      memeImage: 'h_meme.png',
      about:
                'H is the 8th letter of the English alphabet which received attention as an ironic meme in various internet communities in the 2010s.',
      origin:
                'One of the earliest examples of H being used as the punchline to a joke was in an episode of Chowder called The Catch Phrase, which aired in 2008. Chef Mung Daal drinks a soda to try and think up a catchphrase but ends up with only the letter H.(shown below)'
    },
    {
      id: '3',
      imgSrc: 'yam-dimention.jpg',
      title: 'The Yam Dimensione',
      memeImage: 'yamnation.jpg',
      about:
                'The yam dimension is a dimension in the surreal memes universe. Sending people to the dimension is a punishment for certain crimes (including destroying dimensions) supposedly implemented by the Council of the Ancients.',
      origin:
                "In Council of the Ancients, Grand Pillar Cl'egius and the rest of the Council sentenced Meme Man to Yamnation. There he first met Orang, who was also likely sentenced.            Orang then greets Meme Man and tells him of a way to escape. Orang floats to a button and enables gravity, causing them to fall and exit the dimension."
    },
    {
      id: '4',
      imgSrc: 'Money_face.png',
      title: "Get to know who's Moneyface",
      memeImage: 'satelite_dishes.png',
      about:
                'Henol, do you requie satelite dihses? - Money Face, also known as Slunker, is one of the many Surreal Memes Characters. He likes to sell Meme Man and others satelite dishes. He also tried to lend Meme Man a hand, but Meme Man had plenty. Very little is known about him. He is also presumed to be a family member of Meme Man and was one of the five heads who lived together in Meme Lads. Later in the show, he takes control of the Death Realm and becomes Death Lord Slunker.',
      origin:
                "Slunker appeared in his first meme with the caption this is the money face it happens only once every 5000 years. repost in the next 20 seconds or you will never have money again. Slunker's origin is very similar to Orang's, suggesting that the two memes were originally created by the same person. Slunker went on to become a character in Satelite Dishes and Meme Lads. He is presumably related to Meme Man, which is highly possible because they lived together in Meme Lads with three other meme faces, though it is not certain. In Meme Lads, he is also referred to as Slunker although this is not his official name."
    }
  ]
  collection.insertMany(user, function (err, result) {
    if (err) {
      return console.log(err)
    }
    console.log(result.ops)
    client.close()
  })
})
*/

app.get('/', (req, res) => {
  mongoClient.connect((err, client) => {
    if (err) return console.log(err)
    const db = client.db('news')
    const collection = db.collection('articles')
    collection.find().toArray((err, news) => {
      if (err) return console.log(err)
      res.render('index', {
        title: 'Homepage',
        news_list: news
      })
    })
  })
})

app.get('/article', (req, res) => {
  // const oneNews = news.news_list.find((p) => p.id === req.query.id)
  // const oneNews =
  mongoClient.connect((err, client) => {
    const db = client.db('news')
    const collection = db.collection('articles')

    if (err) return console.log(err)

    console.log(req.query.id)

    collection.findOne({ title: req.query.id }, (err, oneNews) => {
      if (err) console.log(err)
      // console.log(oneNews)

      res.render('article', {
        title: `${oneNews.title}`,
        oneNews
      })

      // client.close();
    })
  })
})

const server = app.listen(port, () => {
  console.log(`Express is running -> PORT ${port}`)
})
