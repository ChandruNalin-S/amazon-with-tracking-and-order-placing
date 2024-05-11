/*
IMPORTANT:"BackEnd"

BackEnd: another computer that manages the data of a website.

for example: like our amazon website. when we ordered a product, the information or message send to the another computer and we get an Response/acknowlegment then it is called a backend.

note: the message or request are transfer by the help of HTTP

HTTP: HyperText Transfer protocol.

HTTP: through this user can send request or message to another computer/ backend computer by the URL.

note:->"Locate another computer on the internet, we need to use URL- Uniform Resource Locator",it like an address,but for the internet.

->"Helps us locate another computer on the internet".

EXAMPLE->URl: https://amazon.com, https://youtube.com and https://supersimple.dev.and the s denote secure version of this http protocol.

->amazon.com is a Domain name and it points out another computer on the internet.


// Note: The Network tab inside the inspect-> there we can see HTTP request coming in and out of our computer.

Note: if we want to see HTTP request, then before open the console, we need to open the Network tab, then only we can see HTTP request.
*/




const xhr = new XMLHttpRequest();//Creates a new HTTP message to send to the backend. request = message. and built-in class in javascript. 

/*
Note: Why do we put the event listener up here at the top. because first we need to setup the event listener and then trigger the event or send the request.

*/

xhr.addEventListener('load',()=>{// this code will wait for the response and then load.
  console.log(xhr.response);
})

/*
GET = get some information from the backend.

Types of requests:
->GET
->POST
->PUT
->UPDATE
*/
// below code is to set it up this http request.
xhr.open('GET', 'https://supersimplebackend.dev');//IN open we have to give two parameter-> one is "Type of HTTP message" and second parameter is to "where to send this HTTP message or request".  

// after the domain name "/" if we give a name it called a url paths for example:https://supersimplebackend.dev/documentation, the documentation is a url paths after the domain name/,  through the url paths we can request or send different request to backend and we get response or different response.

// response from the backend must be -> text, html, json, image and different type of response.

xhr.send();// sending the message to another computer or backend computer on the internet. and xhr.send is a asynchronous code->it means does not wait for this line of code to finish it will move to next line of code.


// xhr.response-> undefined because it request and response take time to come across from the internet to the our computer. that's why we used addeventlistener at the top to load the response through "load" type. 


// NOTE: Using the browser = making a GET request to backend.