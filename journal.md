left off @ create-react-app

i think my csrf is working but i might need to move those routes elsewhere.
also i fucked up some stuff converting to typescript. this is gonna be fun debugging tomorrow!

# general

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


## ISSUES:

CSRF restore is misbehaving.
