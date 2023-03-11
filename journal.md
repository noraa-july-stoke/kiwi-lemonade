left off @ create-react-app

# general

  I have definitely had some frustrations so far, i am
  having to fight against the out dated tutorial code i learned from and adapt to changes in the packages. i decided to go with newer pakage versions so i am getting lots of interesting bugs. I found the way i set up my auth functions was based on an outdated mongodb syntax that allowed for passing in of callback into query so i had to fix that.


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
