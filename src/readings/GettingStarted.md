
## What is ExploREST ?

ExploREST is an application that you can use to documentate your REST API, to make presentations
or show easily how beautiful your API is.  
If you look at a classic API documentation, it is often quite complicated. With ExploREST, you take the user by the hand and show him how your application works by simply cliking on links, that will POST, PUT, DELETE or simply GET !

## Try it out

To show you how simple it is, let's use ExploREST to discover a REST API you may not know : [http://jsonplaceholder.typicode.com/](http://jsonplaceholder.typicode.com/)  
First select http://jsonplaceholder.typicode.com/ in the list a the top of the page and click on use.

You can get the list of posts by clicking [here](/posts).  

With this API, you can create posts. Let's say we want to create a post : %{
    "text": "try it",
    "post":{
        "adress": "/posts",
        "data":{
            "userId": 25,
            "id": 26,
            "title": "My beautiful Post",
            "body": "Lorem ipsum, consectur etc"
        }
    }
}%  

Now we are going to delete it
%{
  "text": "by clicking here",
  "del": "/posts/26"
}%


See ? That was **easy**

You can explore the API by clicking on the links, in the JSON or in this text, or by entering a target URL and clicking on the GET button.

Morevover, the use of the three buttons are quite simple :

* GET: make a GET request with the target URL
* EDIT: switch the JSON view to editable, then you can make a POST or PUT to edit or create data
* DEL: make a DELETE request with the target URL

You can also click on links to navigate betweens resources in the json. Try with the Github API (try
resources that are not protected by authentification)

### Switching server

You can switch the current server you are working on with the editable dropdown at the top of the page.
