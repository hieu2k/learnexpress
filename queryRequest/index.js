const express = require('express');
const app = express();
const post = 3001;
const bodyParser = require('body-parser');
let users = [
            {id: 1, name: 'Hieu'},
            {id: 2, name: 'Hung'}
        ];



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
        users: users
    })
})


app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUser = users.filter(user => {
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

app.post('/users/create', (req, res) => {
    users.push(req.body);
    res.redirect('/users');
})

app.listen(post, () => {
    console.log('Server start ' + post);
})