# Overview "no-ne"

"no-ne" is a Bluemix application that uses a Node.js server to communicate between a REDIS JSON document-store database, and a html5/jquery/javascript client. 
User authentication is handled using Facebook OAuth 2.0.

## Code Structure

| File | Description |
| ---- | ----------- |
|[**server.js**](server.js)|Establishes a connection to the database and handles all perisitent data traffic between client(s) and backend through RESTful API endpoints. |
|[**index.html**](public/index.html)|This is the application hub. All .css design files and .js javascript programs connect here. This file also contains all markup and is the user entry point to the application.|
|[**Program Folder**](public/Programs/)|This contains every javascript program that runs on the client side. For ease, programs are divided by the screen area in which they operate. (e.g- left navigation bar program is found in folder LeftBar, etc.)|
|[**Design Folder**](public/Designs/)|As with the Programs folder, Designs contains every css stylesheet used to determine the look and feel of the client application. Again, designs are separated by the screen area which they style. (e.g- left navigation bar style is found in folder LeftBarStyles, etc.)|



## Running the app on Bluemix

1. Download and install the [Cloud Foundry CLI][cloud_foundry_url] tool

2. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/thenofisamizdat/no-ne.git
  ```

3. `cd` into this newly created directory

4. Connect to Bluemix in the command line tool and follow the prompts to log in.

  ```
  $ cf api https://api.ng.bluemix.net
  $ cf login
  ```
  
5. Push the app to Bluemix.

  ```
  $ cf push
  ```

Now when you visit `no-ne.eu-gb.mybluemix.net/` you are at the application's entry point. Once logged in through facebook, the app connects via Node.js API endpoints to the REDIS database and the client is ready for use.


## Binding a Bluemix service to the app

1. Create, for instance, the Compose for Redis service in Bluemix.

  ```
  $ cf create-service compose-for-redis Standard my-compose-for-redis-service
  ```

2. Bind the service to the application.

  ```
  $ cf bind-service no-ne my-compose-for-redis-service
  ```
  
3. Restart the application

  ```
  $ cf restart no-ne
  ```
  
  [cloud_foundry_url]: https://github.com/cloudfoundry/cli
  https://www.atlassian.com/git/tutorials/using-branches/git-branch/