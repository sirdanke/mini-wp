# mini-wp



List of routes:

|   Route               | HTTP  |   Header(s) |Body    | Description

|---------------        |:------    |:---------|:-------|:-----------

|/posting               |POST       | required | author : user:id (**Required**), title:String (**Required**),posting:String (**Required**), tags:String(**required**) , image : imagefile   (**required**) | create new posting

|/posting               |GET        | required | none   | get all posting

|/posting/:id           |PATCH      | required | none   | update posting

|/posting/user          |GET        | required | none   | get user postings

|/posting/:id           |DELETE     | required | none   | delete posting

|/tag                   |GET        | required  | none  | 

|/users                 |POST       | none      | name :String  (**Required**), email:String (**Required**), password: string (**Required**)   | create user

|/login                 |POST       | none      | email:String (**Required**), password: string (**Required**)     | user login

|/login/google          |POS        | none      | goole id_token (**requred**)  |  login/signup google

|/users/:id             |PATCH      | required  | data to update    | edit user profile


# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>

$ npm start <br/>

$ npm run dev
