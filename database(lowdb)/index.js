const express = require('express');
const app = express();
const post = 3000;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
        
app.set('views', './views');

app.set('view engine', 'pug');

app.get('/', (require, response) => {
    response.render('index',{
        name: 'Hieu'
    });
})

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
})

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUser = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    
    res.render('users/index',{
        users: matchedUser,
        value: q
    })
    
})

app.get('/users/create', (req, res) => {
    res.render('users/create')
})

app.get('/users/:id', (req, res) => {
    let  id = req.params.id;
    res.render('users/view',{
        user: db.get('users').find({id: id}).value()
    });
})

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(post, () => {
    console.log('Server start ' + post);
})