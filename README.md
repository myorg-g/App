# User Management API

## Copy values from values.env to .env and update them
## Install dependencies 
```
# to install packages 
npm install 

# to start application
node index.js
```

# Swagger documentation 
<http://localhost:3000/api-docs> or <http://host:3000/api-docs>



```
/api/users for user registration
/api/login for user login
/api/logout for user logout
/api/users/role for updating user roles
/api/users/block for blocking/unblocking users
/api/forgot-passcode for requesting a password reset
/api/reset-passcode/{token} for resetting a password

```