
# Project 2 - Express and MongoDB

For the second project, you need to run a local mongo db instance. For this project, you'll need to create a server which connects to a database. The database will house a certain number of posts from specific users.

**There should be 2 main routes, each with multiple endpoints:**
- **v1**: In this version, you need to write a wrapper around `https://jsonplaceholder.typicode.com/`. In this version, you need only to implement:
	- GET: `/allPosts` -> returns all posts for all users.
	- GET: `/allPosts/<username>` -> returns all posts for a specific user, by using their username.
	- GET: `/posts/<postid>` -> returns a specific post by its ID number.
	- GET: `/profile/<username>` -> returns a specific user's information.

- **v2**: In this version, you'll need to write access a database so that all of the data are not coming from `jsonplaceholder` but from your own local mongo instance (which we will cover in class how to set up and use):
	- GET: `/allPosts` -> returns all posts for all users.
	- GET: `/allPosts/<username>` -> returns all posts for a specific user, by using their username.
	- GET: `/posts/<postid>` -> returns a specific post by its ID number.
	- GET: `/profile/<username>` -> returns a specific user's username.
	- POST: `/posts` -> creates a new post for a specific user.
	- PATCH: `/posts/<id>` -> updates a specific post.
	- DELETE: `/posts/<postid>` -> removes a particular post.

**Each post ought to look something along the lines of:**
```
{  
	"userId": 1,  
	"id": 1,  
	"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",  
	"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"  
}
```

**Each user ought to look something like (you can keep the address from `jsonplaceholder` if you like, but there's no need):**
```
{  
	"id": 1,  
	"name": "Leanne Graham",  
	"username": "Bret",  
	"email": "Sincere@april.biz",  
	"phone": "1-770-736-8031 x56442",  
	"website": "hildegard.org",  
	"company": {  
		"name": "Romaguera-Crona",  
		"catchPhrase": "Multi-layered client-server neural-net",  
		"bs": "harness real-time e-markets"  
	}  
}
```

**NOTE:** The project should use at least one middleware. At the very least, you must use a body parser middleware.
##

### Suggestions
You should at first get your endpoints running before you attempt to connect to connect to `jsonplaceholder` or create a mongoDB instance. Use this fake data to get your project going similar to how it was done in the notes.
##

### HOW TO RUN
1. Must have [node.js](https://nodejs.org/en/download/) install on your local machine. 
2. Must have [mongoDB](https://www.mongodb.com/download-center/community) install on your local machine.
3. Must have some sort of API Development Tool (Postman App or Insomnia REST Client).
4. Open a terminal in the project folder:
	- If testing v1, open terminal there.
	- If testing v2, open terminal there.
5. Type: `npm i` OR `npm install`
6. Once all necessary packages installed, you can start running the server. Make sure you still in the project folder.
7. Type: `npm run dev` OR `npm run start`
8. (v2 ONLY) Open a second terminal to start mongoDB instance by typing: `mongo`
##

### Endpoints Example
> NOTE: Structure may look different if you are importing with mongoimport

- **GET** [/allPosts] Returns all posts for all users *(v1 and v2)*
	- **Invoke:** /allPosts
	```
	/* Return */
	[
		{
			"userid": 1,
			"id": 1,
			"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
		},
		...
		{
			"userid": 10,
			"id": 100,
			"title": "at nam consequatur ea labore ea harum",
			"body": "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
		}
	]
	```
##

- **GET** [/allPosts/:username] Returns all posts for a specific user, by using their username *(v1 and v2)*
	- **Invoke:** /allPosts/Bret
	```
	/* Return */
	[
		{
			"userid": 1,
			"id": 1,
			"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
		},
		...
		{
			"userid": 1,
			"id": 10,
			"title": "optio molestias id quia eum",
			"body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
		}
	]
	```
##

- **GET** [/posts/:postid] Returns a specific post by its ID number *(v1 and v2)*
	- **Invoke:** /posts/1
	```
	/* Return */
	[
		{
			"userid": 1,
			"id": 1,
			"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
		}
	]
	```
##

- **POST** [/posts] Creates a new post for a specific user *(v2)*
	- **Invoke:** /posts
	```
	/* Send */
	{
		"userid": 1,
		"id": 1,
		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
	}
	```
	```
	/* Return */
	{
		"_id": "5e9cfc9743bc934828371a04",
		"userid": "5e9cfb0c97fc86c5b2371661",
		"id": 1,
		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
		"__v": 0
	}
	```
##

- **PATCH** [/posts/:id] Updates a specific post *(v2)*	
	- **Invoke:** /posts/1
	```
	/* Send */
	{
		"title": "node.js",
		"body": "Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser."
	}
	```
	```
	/* Return */
	{
		"_id": "5e9cfc9743bc934828371a04",
		"userid": "5e9cfb0c97fc86c5b2371661",
		"id": 1,
		"title": "node.js",
		"body": "Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser.",
		"__v": 0
	}
	```
##

- **DELETE** [/posts/:postid] Removes a particular post *(v2)*
	- **Invoke:** /posts/1
	```
	/* Return */
	{
		"n": 1,
		"ok": 1,
		"deletedCount": 1
	}
	```
##

- **GET** [/profile/:userid] Returns a specific user by userid *(v1 and v2)*
	- **Invoke:** /profile/1
	```
	/* Return */
	[
		{
			"_id": "5e9cfb0c97fc86c5b2371661",
			"id":  1,
			"name":  "Leanne Graham",
			"username":  "Bret",
			"email":  "Sincere@april.biz",
			"address": {
				"street":  "Kulas Light",
				"suite":  "Apt. 556",
				"city":  "Gwenborough",
				"zipcode":  "92998-3874",
				"geo": {
					"lat": {
						"$numberDecimal": "-37.3159"
					},
					"lng": {
						"$numberDecimal": "81.1496"
					}
				},
			},
			"phone":  "1-770-736-8031 x56442",
			"website":  "hildegard.org",
			"company": {
				"name":  "Romaguera-Crona",
				"catchPhrase":  "Multi-layered client-server neural-net",
				"bs":  "harness real-time e-markets"
			}
		}
	]
	```
##

- **POST** [/profile] Creates a new user *(v2)*
	- **Invoke:** /profile
	```
	/* Send */
	{
		"id":  1,
		"name":  "Leanne Graham",
		"username":  "Bret",
		"email":  "Sincere@april.biz",
		"address": {
			"street":  "Kulas Light",
			"suite":  "Apt. 556",
			"city":  "Gwenborough",
			"zipcode":  "92998-3874",
			"geo": {
				"lat":  "-37.3159",
				"lng":  "81.1496"
			}
		},
		"phone":  "1-770-736-8031 x56442",
		"website":  "hildegard.org",
		"company": {
			"name":  "Romaguera-Crona",
			"catchPhrase":  "Multi-layered client-server neural-net",
			"bs":  "harness real-time e-markets"
		}
	}
	```
	```
	/* Return */
	{
		"_id": "5e9cfb0c97fc86c5b2371661",
		"id":  1,
		"name":  "Leanne Graham",
		"username":  "Bret",
		"email":  "Sincere@april.biz",
		"address": {
			"street":  "Kulas Light",
			"suite":  "Apt. 556",
			"city":  "Gwenborough",
			"zipcode":  "92998-3874",
			"geo": {
				"lat": {
					"$numberDecimal": "-37.3159"
				},
				"lng": {
					"$numberDecimal": "81.1496"
				}
			},
		},
		"phone":  "1-770-736-8031 x56442",
		"website":  "hildegard.org",
		"company": {
			"name":  "Romaguera-Crona",
			"catchPhrase":  "Multi-layered client-server neural-net",
			"bs":  "harness real-time e-markets"
		}
	}
	```
##

- **PATCH** [/profile] Update an existing user *(v2)*
	- **Invoke:** /profile
	```
	/* Send */
	{
		"id": 1,
		"company": {
			"catchPhrase": "Uber multi-layered client-server neural-net"
		}
	}
	```
	```
	/* Return */
	{
		"_id": "5e9cfb0c97fc86c5b2371661",
		"id":  1,
		"name":  "Leanne Graham",
		"username":  "Bret",
		"email":  "Sincere@april.biz",
		"address": {
			"street":  "Kulas Light",
			"suite":  "Apt. 556",
			"city":  "Gwenborough",
			"zipcode":  "92998-3874",
			"geo": {
				"lat": {
					"$numberDecimal": "-37.3159"
				},
				"lng": {
					"$numberDecimal": "81.1496"
				}
			},
		},
		"phone":  "1-770-736-8031 x56442",
		"website":  "hildegard.org",
		"company": {
			"name":  "Romaguera-Crona",
			"catchPhrase":  "Uber multi-layered client-server neural-net",
			"bs":  "harness real-time e-markets"
		}
	}
	```
##

- **DELETE** [/profile] Removes a particular user (will remove all posts associate to this user) *(v2)*
	- **Invoke:** /profile
	```
	/* Send */
	{
		"id": 1
	}
	```
	```
	/* Return */
	{
		"n": 1,
		"ok": 1,
		"deletedCount": 1
	}
	```