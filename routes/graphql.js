let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
	rollDice: function({ numDice, numSides }) {
		let output = [];
		for (let i = 0; i < numDice; i++) {
			output.push(1 + Math.floor(Math.random() * (numSides || 6)));
		}
		return output;
	}
};

let router = express();
router.use(
	'/',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);

console.log('Running a GraphQL API server at localhost:4000/graphql');

module.exports = router;
