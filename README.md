# ExploREST

An app to browse, documentate, discover REST APIs

ExploREST is an application that you can use to documentate your REST API, to make presentations
or show easily how beautiful your API is.  
If you look at a classic API documentation, it is often quite complicated. With ExploREST, you take the user by the hand and show him how your application works by simply cliking on links, that will POST, PUT, DELETE or simply GET !

Don't believe me, just [try it](explorest.herokuapp.com)

Features:
* Cross-resource exploration: when a resource has a link to another resource, you can directly click it to access it.
* Formatted, highlighted JSON.
* Markdown to documentate your API
* Playground links: insert them in you Markdown. When you click on them, if makes a get request and diplays the result !
* Sample links: idem. When you click on them, it makes the POST or DELETE requests you specified in the Markdown. It is very practical for demonstrations, or to communicate with someone else: instead of making a curl (more efforts needed), put a sample link into the markdown for once. Now other people just have to click it !

Note that I did this project on my own, so it is not fully tested and documented yet. But there is a good base.

Requirement :
(some versions bellow should work too but have not been tested)
- nodeJS: >=6
- npm: >=3.8.9

NB. an easy way to install both, whatever the version of node you already have, is to install [nvm](https://github.com/creationix/nvm) :
``` bash
sudo apt-get update
sudo apt-get install build-essential libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
nvm install v6.2.0
```

Build and run :

``` bash
git clone https://github.com/Romathonat/ExploREST.git
```

``` bash
npm install
```

``` bash
npm run dev
```

You can go to [http://localhost:3000/](http://localhost:3000/).

Then, you need to enter the URL of the server you want to work on on the input at the top of the page (without "/" at the end)

## FAQ

- What is a **playground link** and how to create it ?  
A playground link is a clickable link that make a GET request on the API and displays its content in the codeview.
To do so, create a classic link in markdown, and make your URL begin with "/"  
example:  
```
[/resources/compute](/resources/compute)
```

- What is a **sample link** and how to create it ?  
A sample link is a link that post datas onto the current server when clicking on it. The formating is as follow (in markdown):

``` JSON
text before %{
  "text": "sampleLink",
  "post": {
    "address": "/compute",
    "datas": {
      "kind":"http://schemas.ogf.org/occi/infrastructure#compute",
      "attributes": {
        "occi.compute.hostname" : "test",
        "occi.compute.state" : "inactive"
      },
      "id": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
    }
  }
}% text after
```

It will result in a clickable link, which will post or put datas on click:

``` HTML
<p>text before <a>sampleLink</a> text after</p>
```

You can post an array instead of an object (in the "datas" attribute).
It can be put instead of posted, by using the "put" key instead of the "post" one.

If you want your sample link to post to different locations, just put an array instead of an object inside the "post" attribute. Example :

``` JSON
%{
  "text": "sampleLink",
  "post": [
    {
        "address": "/compute",
        "kind":"http://schemas.ogf.org/occi/infrastructure#compute",
        "datas": {
          "attributes": {
            "occi.compute.hostname" : "test",
            "occi.compute.state" : "inactive"
          },
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
        }
    },
    {
        "address": "/storage",
        "datas": [
            {
              "kind":"http://schemas.ogf.org/occi/infrastructure#storage",
              "attributes": {
                "occi.storage.size" : 1000
              },
              "id": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
            },
            {
              "kind":"http://schemas.ogf.org/occi/infrastructure#storage",
              "attributes": {
                "occi.storage.size" : 500
              },
              "id": "6df690d2-3158-40c4-88fb-d1c41584d689"
            }
        ]
    }
  ]
}%
```

- Can I delete datas with a sample link ?  
Yes, you can, with the following format :

``` JSON
%{
  "text": "my sample link",
  "del": "/6df690d2-3158-40c4-88fb-d1c41584d6e7"
}%
```

- I want to use this tool to documentate my own REST API, I need to add headers for the authentification, hox to do it ?
Go to the conf.js file, and add the headers you want in the headers variable.

- How to deploy on Heroku ?  

``` bash
#need to be done once
heroku git:remote -a herokuRepo 
```
``` bash
npm run build
```
``` bash
git commit -am "deployment message"
```
``` bash
git push heroku master
```
