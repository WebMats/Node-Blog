// code away!
const express = require('express');
const app = express();

const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');

app.use(express.json())

app.use('/user', userRoutes)
app.use('/posts', postsRoutes);



app.listen(8000, () => {console.log('Listening on port 8000...')})

