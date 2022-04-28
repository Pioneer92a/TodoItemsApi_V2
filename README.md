Notes:

1. 'npm start' -> default express port 3000
   'npm start 4000' -> assign port '4000' to express server or whichever you specify

2. Prisma automatically makes a lazy connection with the data source upon first query.
   No connect command required

3. 'seed.ts' in the infrastructure layer provides seed data. It is automatically executed in case of 'npx prisma migrate reset'.
   To execute it manually, use 'npx prisma db seed'

User Routes cleared:

1. post("/logout/:uuid")
   mark the specific user logged out in the database
   no impact on current session

2. get("/logout")
   logout the current user as logged out and clear the session
   no impact in database

3. get("/login") -> login to find or create user (only working from browser)
   login from google
   create new user if not already present (logged in by default)
   if user already present, mark him/her as logged in

4. post("/delete/:uuid")
   delete the user

5. get("/user/:uuid")
   read the user

   TASK ROUTES: note that below operations will be performed only if user is marked logged in from database

a. post('/task') -> create a new task
body: name, userUUID

b. get('/task/:id') -> read a task
body: userUUID

c. post('/task/update/:id') -> update a task
body: userUUID

d. delete('/task/:id') -> delete a task
body: userUUID

e. "/task/getAll/:page" -> get tasks of a user starting from page. Limit is defined in .env file. Offset pagination is implemented here
body: userUUID

TODO: middlewares need to be implemented in tasks
