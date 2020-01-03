const express = require('express');
const app = express();
const post = 3000;

app.set('views', './views');

app.set('view engine', 'pug');

app.get('/', (require, response) => {
    response.render('index',{
        name: 'Hieu'
    });
})

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: [
            {id: 1, name: 'Hieu'},
            {id: 2, name: 'Hung'}
        ]
    })
})

app.listen(post, () => {
    console.log('Server start ' + post);
})