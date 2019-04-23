# hacktivoverflow

Question-answer web app build using TDD.

## REST API

Using express and mongoose.

## Open Endpoints

Open endpoints require no Authentication.

#### Question related

- [Fetch all Question](#fetch-all-question) : `GET /questions`
- [Fetch a question by its id](#fetch-a-question-by-its-id) : `GET /questions/:question_id`

#### Authentication related

- [Register](#register) : `POST /auth/register` 
- [Login](#login) : `POST /auth/login`

## Closed Endpoints

Closed endpoints require a valid Token to be included in the header of the request.

#### User Questions

- [Create a Question](#create-a-question) : `POST /users/:user_id/questions`
- [Up-vote a Question](#up-vote-a-question) : `PUT /users/:user_id/questions/:question_id/upvote`
- [Down-vote a Question](#down-vote-a-question) : `PUT /users/:user_id/questions/:question_id/downvote`

#### User Answers

- [Create an Answer](#create-an-answer) : `POST /users/:user_id/questions/:question_id/answers`
- [Up-vote an Answer](#up-vote-a-question) : `PUT /users/:user_id/questions/:question_id/answer/:answer_id/upvote`
- [Down-vote an Answer](#down-vote-a-question) : `PUT /users/:user_id/questions/:question_id/answer/:answer_id/downvote`


<hr>

## Fetch all Question

**Method :** `GET`

**URL** : `/questions`

**Response Success**

**Status** : `200`

**Body** :

```json
{
    "questions": [
        {
            "_id": "String",
            "title": "String",
            "description": "String",
            "upvotes": "Number",
            "downvotes": "Number",
            "author": "String",
            "answers": ["String"]
        }
        ...
    ]
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Fetch a question by its id

**Method** : `GET`

**URL** : `/questions/:question_id`

**Response Success**

**Status** : `200`

**Body** :

```json
{
    "question": {
    	"_id": "String",
       	"title": "String",
        "description": "String",
       	"upvotes": "Number",
       	"downvotes": "Number",
       	"author": "String",
        "answers": [
            {
                "_id": "String",
                "title": "String",
                "description": "String",
                "upvotes": "Number",
                "downvotes": "Number",
                "author": "String",
            },
            ...
        ]
  	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Register

**Method** : `POST`

**URL** : `/auth/register`

**Response Success**

**Status** : `201`

**Body** :

```json
{
    "user": {
    	"_id": "String",
       	"name": "String",
        "email": "String"
	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Login

**Method** : `POST`

**URL** : `/auth/login`

**Response Success**

**Status** : `201`

**Body** :

```json
{
	"user": {
		"_id": "String",
		"name": "String",
		"email": "String"
	},
	"token": "String"
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
	"message": "Internal Server Error."
}
```



## Create a Question

**Method :** `POST`

**URL** : `/users/:user_id/questions`

**Request Headers** :

```json
{
	"Authorization": "<token>"
}
```

**Request Body** :

```json
{
	"title": "String",
	"description": "String"
}
```

**Response Success**

**Status** : `201`

**Body** :

```json
{
    "question": {
        "_id": "String",
        "title": "String",
        "description": "String",
        "upvotes": "Number",
        "downvotes": "Number",
        "author": "String",
		"answers": ["String"]
	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Up-vote  a Question

**Method :** `PUT`

**URL** : `/users/:user_id/questions/:question_id/upvote`

**Request Headers** :

```json
{
	"Authorization": "<token>"
}
```

**Response Success**

**Status** : `201`

**Body** :

```json
{
    "question": {
        "_id": "String",
        "title": "String",
        "description": "String",
        "upvotes": "Number",
        "downvotes": "Number",
        "author": "String",
		"answers": ["String"]
	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Down-vote  a Question

**Method :** `PUT`

**URL** : `/users/:user_id/questions/:question_id/upvote`

**Request Headers** :

```json
{
	"Authorization": "<token>"
}
```

**Response Success**

**Status** : `201`

**Body** :

```json
{
    "question": {
        "_id": "String",
        "title": "String",
        "description": "String",
        "upvotes": "Number",
        "downvotes": "Number",
        "author": "String",
		"answers": ["String"]
	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```



## Create  an Answer

**Method :** `POST`

**URL** : `/users/:user_id/questions/:question_id/answers`

**Request Headers** :

```json
{
	"Authorization": "<token>"
}
```

**Response Success**

**Status** : `201`

**Body** :

```json
{
    "answer": {
        "_id": "String",
        "title": "String",
        "description": "String",
        "upvotes": "Number",
        "downvotes": "Number",
        "question": "String",
        "author": "String",
	}
}
```

**Response Error**

**Status** : `500`

**Body** :

```json
{
    "message": "Internal Server Error."
}
```