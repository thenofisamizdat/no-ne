/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 // First add the obligatory web framework
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Util is handy to have around, so thats why that's here.
const util = require('util')
// and so is assert
const assert = require('assert');

// We want to extract the port to publish our app on
var port = process.env.PORT || 8080;

// Then we'll pull in the database client library
var redis = require("redis");

// Now lets get cfenv and ask it to parse the environment variable
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();

// Within the application environment (appenv) there's a services object
var services = appenv.services;
// The services object is a map named by service so we extract the one for Redis
var redis_services = services["compose-for-redis"];

// This check ensures there is a services for Redis databases
assert(!util.isUndefined(redis_services), "Must be bound to compose-for-redis services");

// We now take the first bound Redis service and extract it's credentials object
var credentials = redis_services[0].credentials;

/// This is the Redis connection. From the application environment, we got the
// credentials and the credentials contain a URI for the database. Here, we
// connect to that URI
var client=redis.createClient(credentials.uri);

client.on("error", function (err) {
    console.log("Error " + err);
});

// We can now set up our web server. First up we set it to server static pages
app.use(express.static(__dirname + '/public'));

//Add user
app.put("/users", function(request, response) {
    
  client.hset("users", request.body.userID, JSON.stringify(request.body), function(error, result) {
      if (error) {
       // response.status(500).send(error);
      } else {
        //response.send("success");
      }
    });
});
// Get all users
app.get("/users", function(request, response) {

    client.hgetall("users",function(err, resp) {
      if (err) {
        response.status(500).send(err);
      } else {
        response.send(resp);
      }
    });
});

// Add note
app.put("/notes", function(request, response) {
    
  client.hset("notes", request.body.noteID, JSON.stringify(request.body), function(error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send("success");
      }
    });
});

// Get all notes
app.get("/notes", function(request, response) {

    client.hgetall("notes",function(err, resp) {
      if (err) {
        response.status(500).send(err);
      } else {
        response.send(resp);
      }
    });
});

// Add note
app.put("/noteBooks", function(request, response) {
    
  client.hset("noteBooks", request.body.storyID, JSON.stringify(request.body), function(error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(request.body);
      }
    });
});

// Get all notebooks
app.get("/noteBooks", function(request, response) {

    client.hgetall("noteBooks",function(err, resp) {
      if (err) {
        response.status(500).send(err);
      } else {
        response.send(resp);
      }
    });
});

app.delete("/delete/:all", function (req, res){
    client.flushdb( function (err, succeeded) {
        console.log(succeeded); // will be true if successfull
    });
});

// Now we go and listen for a connection.
app.listen(port);

//require("cf-deployment-tracker-client").track();
