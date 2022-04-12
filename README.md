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
   mark the specific user logged out in the database
   no impact on current session

   TASK ROUTES: note that below operations will be performed only if user is marked logged in from database

a. post('/task') -> create a new task
body: name, userUUID

b. get('/task/:id') -> read a task
body: userUUID

c. post('/task/update/:id') -> update a task
body: userUUID

d. delete('/task/:id') -> delete a task
body: userUUID

TODO: middlewares need to be implemented in tasks
