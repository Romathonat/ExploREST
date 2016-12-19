
## What is ExploREST ?

ExploREST is an application that you can use to documentate your REST API, to make presentations
or show easily how beautiful your API is.  
If you look at a classic API documentation, it is often quite complicated. With ExploREST, you take the user by the hand and show him how your application works by simply cliking on links, that will POST, PUT, DELETE or simply GET !

## Try it out

To show you how simple it is, let's use ExploREST to discover a REST API you may not know : [http://reqres.in/api](http://reqres.in/api)  
You can get the list of users by clicking [here](/users).  

With reqres, you can create users. Let's say we want to create an user called Linus Torvald : %{
    "text": "try it",
    "post":{
        "adress": "/users",
        "data": {
            "id": 51,
            "name": "Linux Torvald",
            "job": "Linux God"
        }
    }
}%  

Now let's create a friend of Linus, which is friend with the first user of our database : %{
    "text": "Richard Stallman",
    "post":{
        "adress": "/users",
        "data": {
            "name": "Richard Stallman",
            "job": "Computer God",
            "friend": "http://reqres.in/api/users/1"
        }
    }
}%  

You can click on links to navigate betweens resources in the json, clik on the value of the field "friend"
of Stallman for example.  

Now we are going to delete Linux Torvald
%{
  "text": "by clicking here",
  "del": "/users/51"
}%

See ? That was **easy**

You can explore the API by clicking on the links, in the JSON or in this text, or by entering a target URL and clicking on the GET button.

Morevover, the use of the three buttons are quite simple :

* GET: make a GET request with the target URL
* EDIT: switch the JSON view to editable, then you can make a POST or PUT to edit or create data
* DEL: make a DELETE request with the target URL

### Switching server

You can switch the current server you are working on with the editable dropdown at the top of the page.
