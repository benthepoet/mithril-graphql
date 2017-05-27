# mithril-graphql
This module provides a lightweight GraphQL client for the Mithril framework. The client servers as a wrapper around Mithril's `m.request` function. 

## Usage
This module is best utilized with Babel (ES2015+) or CoffeeScript as they both support multiline strings.

###
ES5
```
var GraphClient = require('mithril-graphql').GraphClient;

var options = {
    url: '/graphql'
};

var query = 'query User($id: Int!) { user(id: $id) { id name } }';

var client = new GraphClient(options, queries);

client
    .get(query, { id: 1 })
    .then(function (response) {
        console.log(reponse.data);
    });
```

###
Babel (ES2015+)
```
const { GraphClient } = require('mithril-graphql');

cont options = {
    url: '/graphql'
};

const query = `
    query User($id: Int!) { 
        user(id: $id) { 
            id 
            name 
            
        } 
        
    }
';

const client = new GraphClient(options, queries);

client
    .get(query, { id: 1 })
    .then(response => {
        console.log(reponse.data);
    });
```

###
CoffeeScript
```
{ GraphClient } = require('mithril-graphql')

options = {
    url: '/graphql'
}

query = """
    query User($id: Int!) { 
        user(id: $id) { 
            id 
            name 
            
        } 
        
    }
"""

client = new GraphClient(options, queries)

client
    .get(query, { id: 1 })
    .then(response ->
        console.log(reponse.data)
    )
```

## Recommended Usage
For optimal use, it is recommended that GraphQL are written statically and utilize variables. Before the client sends 
the request it will try to minify the query. Minification will strip out any carriage returns that are followed immediately by tabs or spaces.

## Good

### queries.js
```
const queries = {
    User: `
        query User($id: Int!) { 
            user(id: $id) { 
                id 
                name 
                
            } 
            
        }
    `
};
```

### graph.js
```
const { GraphClient } = require('mithril-graphql');
const queries = require('./queries');

const options = {
    url: '/graphql'
};

const client = new GraphClient(options);

client
    .get(queries.User, { id: 1 })
    .then((response) => {
        console.log(response.data);
    });
```

## Bad

### graph.js
```
const { GraphClient } = require('mithril-graphql');

cont options = {
    url: '/graphql'
};

const id = 1;

const query = `
    query { 
        user(id: ${id}) { 
            id 
            name 
            
        } 
        
    }
';

const client = new GraphClient(options, queries);

client
    .get(query)
    .then(response => {
        console.log(reponse.data);
    });
```

## API

## constructor(options)

## get(query, [variables])
Sends a GraphQL query using the HTTP GET method.

## post(query, [variables])
Sends a GraphQL query using the HTTP POST method.