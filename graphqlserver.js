const express = require('express');
const app = express();
const graphqlHttp = require('express-graphql');
const cors = require('cors');


app.use(express.json());
app.use(cors());

const graphQLSchema = require('./graphql/schema');
const graphQLResolvers = require('./graphql/resolvers');
app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}))

const PORT = process.env.PORT || '8000';
app.listen(PORT, () => {console.log('Listening on port 8000...')})