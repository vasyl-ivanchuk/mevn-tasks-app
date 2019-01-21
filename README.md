# MEVN tasks application
Simple application built using Mongo, Express, Vue, Node (MEVN) stack.

How to run:
the easiest way to run the app is to use `docker-compose`:
```
docker-compose build
docker-compose up
```
`build` command will create three docker images: mongo, client and server. `up` command will run them.
IMPORTANT: server image **on every run** will **clear existing data** from the configured Mongo collection (_mevn-tasks-app_ by default) and will **seed the test data** again.

Client app will be available with the next URL: http://localhost:8080/
Server API can be accessed with http://localhost:3001

API endpoints:
- http://localhost:3001/login POST - login the user
- http://localhost:3001/tasks GET - get user's tasks
- http://localhost:3001/task POST - create a new task
- http://localhost:3001/tasks/:id PUT - update an existing task
- http://localhost:3001/tasks/:id DELETE - delete an existing task

To run application manually you can separatelly run client and server with:
```
npm start
```
command.

Create test data:
if you use `docker-compose` to run the app, test data will be created automatically on every run. If you run server manually, to create test data use next commands:
```
cd server
npm run seed
```

Test data:
By default one user with three tasks will be created. User credentials:
```
email: email@domain.com
password: abcABC123
```

To run server tests, go to the server folder and execute standard npm test command:
```
npm test
```