# Vue Social Network Client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

# Vue Social Network API
API for the Vue social network app

https://vue-social-network-api.herokuapp.com

## Endpoints
* [Auth](#auth)
* [Sign Up](#sign-up)
* [List posts](#list-posts)
* [Create post](#create-post)
* [List post comments](#list-post-comments)
* [Add post comment](#add-post-comment)
* [Get user profile](#get-user-profile)

### Auth
`POST /api/auth`


#### Body
```json
{
  "username": "user3@accedia.com",
  "password": "user"
}
```
**NOTE: Use these credentials to successfully authenticate**

#### Sample Response
Status `200 OK`

```json
{
  "user": {
    "id": "d70c26a8-b530-42eb-a658-4fb53078cbc9",
    "username": "black_panter",
    "email": "user@accedia.com",
    "firstname": "Bobby",
    "lastname": "Harrison",
    "image": "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
  },
  "token": "MTU2Njk3NjQwNTMzNw=="
}
```

Status `400 Bad Request`

```json
{
  "message": "Wrong username/password",
  "detail": "wrongPassword"
}
```

### Sign Up
`POST /api/sign-up`

#### Body
```json
{
  "username": "new_admin@accedia.com",
  "email": "admin@accedia.com",
  "firstname": "Name",
  "lastname": "Name",
  "password": "admin"
}
```

#### Sample Response
Status `201 Created`

```
No Body
```

Status `400 Bad Request`

```json
{
  "message": "This user is already in use",
  "detail": "usedUser"
}
```

### List posts
`GET /api/posts/{post_id?}`

#### Required Headers

```json
{
  "Authorization": "MTU2Njk3NjQwNTMzNw=="
}
```

#### Path parameters
Name                | Type        | Description
--------------------| ----------- | -----------
post_id             | Optional    | Retrieve the post details by its id

#### Query parameters
Name                | Type        | Description
--------------------| ----------- | -----------
author.username     | Optional    | Filter the posts by an autor by his username. For example: `black_panter`
created_at_like     | Optional    | Filter the posts created on a certain date. For example: `2019-09-16`
_sort               | Optional    | Sort the result by the given field. For example: `created_at`
_order              | Optional    | Sort the result by the given field. Possible values: `asc` or `desc`

#### Sample Response
Status `200 OK`

```json
[
  {
    "id": "513b732a-7b2a-4474-aabd-1693e80c7398",
    "post": "quia et suscipit<br>suscipit recusandae consequuntur expedita et cum<br>reprehenderit molestiae ut ut quas totam<br>nostrum rerum est autem sunt rem eveniet architecto",
    "author": {
      "id": "d70c26a8-b530-42eb-a658-4fb53078cbc9",
      "username": "black_panter",
      "email": "user@accedia.com",
      "firstname": "Bobby",
      "lastname": "Harrison",
      "image": "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
    },
    "comments_count": 2,
    "created_at": "2019-09-16T20:43:31.717Z"
  },
  ...
]
```

### Create post
`POST /api/posts`

#### Required Headers

```json
{
  "Authorization": "MTU2Njk3NjQwNTMzNw=="
}
```

#### Sample Response
Status `201 OK`

```json
{
  "id": "513b732a-7b2a-4474-aabd-1693e80c7398",
  "post": "quia et suscipit<br>suscipit recusandae consequuntur expedita et cum<br>reprehenderit molestiae ut ut quas totam<br>nostrum rerum est autem sunt rem eveniet architecto",
  "author": {
    "id": "d70c26a8-b530-42eb-a658-4fb53078cbc9",
    "username": "black_panter",
    "email": "user@accedia.com",
    "firstname": "Bobby",
    "lastname": "Harrison",
    "image": "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
  },
  "comments_count": 2,
  "created_at": "2019-09-16T20:43:31.717Z"
}
```

### List post comments
`GET /api/comments?post_id={post_id}`

#### Required Headers

```json
{
  "Authorization": "MTU2Njk3NjQwNTMzNw=="
}
```

#### Query parameters
Name                | Type        | Description
--------------------| ----------- | -----------
post_id             | Required    | Get a list of the comments for a post. For example: `533c3ce-d6e1-4fd1-89e5-eb095edd0591`
_sort               | Optional    | Sort the result by the given field. For example: `commented_at`
_order              | Optional    | Sort the result by the given field. Possible values: `asc` or `desc`

#### Sample Response
Status `200 OK`

```json
[
  {
    "post_id": "533c3ce-d6e1-4fd1-89e5-eb095edd0591",
    "comment": "Great stuff!",
    "commented_at": "2019-08-16T21:23:31.717Z",
    "author": {
      "id": "d70c26a8-b530-42eb-a658-4fb53078cbc9",
      "username": "black_panter",
      "email": "user@accedia.com",
      "firstname": "Bobby",
      "lastname": "Harrison",
      "image": "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
    }
  },
  ...
]
```

### Add post comment
`POST /api/comments?post_id={post_id}`

#### Required Headers

```json
{
  "Authorization": "MTU2Njk3NjQwNTMzNw=="
}
```

#### Query parameters
Name                | Type        | Description
--------------------| ----------- | -----------
post_id             | Required    | Add a comment to a post with this id. For example: `533c3ce-d6e1-4fd1-89e5-eb095edd0591`

#### Sample Response
Status `201 OK`

```json
{
  "post_id": "533c3ce-d6e1-4fd1-89e5-eb095edd0591",
  "comment": "Great stuff!",
  "commented_at": "2019-08-16T21:23:31.717Z",
  "author": {
    "id": "d70c26a8-b530-42eb-a658-4fb53078cbc9",
    "username": "black_panter",
    "email": "user@accedia.com",
    "firstname": "Bobby",
    "lastname": "Harrison",
    "image": "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
  }
}
```

### Get user profile
`GET /api/users/{user_id}`

#### Required Headers

```json
{
  "Authorization": "MTU2Njk3NjQwNTMzNw=="
}
```

#### Sample Response
Status `200 OK`

```json
{
  "id": "d70c26a8-b530-42eb-a658-4fb53078cbc9",
  "username": "black_panter",
  "email": "user@accedia.com",
  "firstname": "Bobby",
  "lastname": "Harrison",
  "image": "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
}
```

