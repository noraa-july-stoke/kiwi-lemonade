left off @ create-react-app

# general

  making an app on a new stack and deploying to docker....

  i just graduated from app academy, a fast paced, 1000+ hour course with a >3% acceptance rate. i learned a lot. two different full stacks but i wanted to put my skills to the test and see if i couldnt go completely solo and figure out to make a fullstack starter app on a completely new stack. i started by looking at various tutorials and the koa docs. i then took what i learned and applied my favorite parts of the knowledge i gained into creatin a backend with koa.

  I have definitely had some frustrations so far, i am
  having to fight against the out dated tutorial code i learned from and adapt to changes in the packages. i decided to go with newer pakage versions so i am getting lots of interesting bugs. I found the way i set up my auth functions was based on an outdated mongodb syntax that allowed for passing in of callback into query so i had to fix that.

  typescript is a little bit tricky, and it makes the linter complain a lot but  between looking at the docs, inspecting the problems tab next to my terminal, and looking at suggested quick fixes ive been able to figure out some simple stuff and translate some of my "index" files, as well as my redux state to typescipt.


## Key URLs
```javascript
/api/auth/login // - Login a user. Send username and password using JSON in the request body.

/api/auth/signup // - Signup a user. Send username and password using JSON in the request body.

/api/auth/status // - Get information on whether you are currently logged in.

/api/auth/logout // - Logout current user.

/api/ // - Base route for API
```

server context structure:

ctx.user = object || null
ctx.authenticated = boolean



host ports :
  frontend: 3000
  backend: 8080

docker ports:
  fronend: 3000
  backend: 8080
