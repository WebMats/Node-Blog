// code away!
const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');

app.use(express.json())
app.use(cors());

app.use('/users', userRoutes)
app.use('/posts', postsRoutes);



app.listen(8000, () => {console.log('Listening on port 8000...')})

