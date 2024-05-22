## API Reference

#### User Register

```http
  POST /api/user/register
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Name`, `Email` | string | **Required**. |

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Password` | varchar | **Required**. |

#### User Login

```http
  POST /api/user/login
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Email` | string | **Required**. |

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Password` | varchar | **Required**. |

Successful response will will return an accessToken to be used as Bearer for authenticating below post requests.

#### Get individual post

```http
  GET /api/post/get/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer accessToken` | varchar | **Required**.  |
| `id` | number | **Required**. id of the post as last parameter in request|

#### Create a new post

```http
  POST /api/post/new
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer accessToken` | varchar | **Required**.  |

Will return post object which contains post details including a google cloud url for each post image & a createAt attribute.
Post response object will also contain a userId which = the user that created the post. This userId is a foreignkey on our posts postgres table linking the two together.
Images are currently static.

#### Edit a posts description

```http
  POST /api/post/update/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer accessToken` | varchar | **Required**.  |
| `id` | number | **Required**. id of the post as last parameter in request|
| `description` | string | **Required**. New description |

Will return post object with edited description.

#### Add a friend to current users friendslist

```http
  POST /api/friend/add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer accessToken` | varchar | **Required**.  |
| `friendId` | number | **Required**. id of the friend you would like to add|

Will return a http response 200.

#### Remove a friend from current users friendslist

```http
  DELETE /api/friend/remove
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer accessToken` | varchar | **Required**.  |
| `friendId` | number | **Required**. id of the friend you would like to remove|

Will return a http response 200.

#### Get current users friendslist

```http
  GET /api/friend/flist
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer accessToken` | varchar | **Required**.  |

Will return an array of friend objects which includes the friends name & email 

## Deployment

To deploy this project run

```bash
  npm start || node index.js
```