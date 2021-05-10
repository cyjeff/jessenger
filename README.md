# Jessenger
<img width="150" alt="apple-touch-icon" src="https://user-images.githubusercontent.com/34878933/114009857-7d566200-989e-11eb-8f25-ab3bd1041c3d.png">
A Facebook messenger mock with React and .NET framework. Realtime feature enabled by SignalR library.

This is a student project I did at Code Chrysalis, a Tokyo-based bootcamp.

The main goal of the project is to learn a new programming language / frameworks in a week and try to create a working application with it. 

I chose C sharp and Dotnet maninly because I worked in large enterprise before and I would like to know why many larger enterprises choose it as their backbones, and also to learn how the eco-system is different from JavaScript / Node.js. 

Deployed app can be accessed here:
https://cyjefftest.azurewebsites.net/


## Technical Stack Used
<img width="650" alt="Screen Shot 2021-04-08 at 18 32 28" src="https://user-images.githubusercontent.com/34878933/114004923-0fa83700-989a-11eb-938c-76c859262e1d.png">

* Front-end
  * React.js
  * SignalR
* Server
  * .NET 5
  * Entity Framework
* Database
  * Azure SQL Database (Microsoft SQL Server under the hood)
* Deployment
  * Azure App Service
  * Visual Studio Code
  
## Features and Functionalities Implemented

* Database migration and seeding - .NET EF (Entity Framework)
* REST based API server (GET, POST) - .NET 5
* Front-end - React.js
  * input username
  * input and send messages
  * view messages from other users and self
  * user input validation - JS, CSS
  * auto scroll to bottom - "react-scroll" library
* Realtime feature - websocket messages via SignalR

## Sample User Interfaces

<img width="300" alt="scr1" src="https://user-images.githubusercontent.com/34878933/117683989-89ac4280-b1ef-11eb-9af6-c9d8cf66e18f.jpeg">
Animated input validation:
<img width="300" alt="scr2" src="https://user-images.githubusercontent.com/34878933/117682898-81073c80-b1ee-11eb-8071-f746b6f7f275.jpeg">
<img width="300" alt="scr3" src="https://user-images.githubusercontent.com/34878933/117684013-8dd86000-b1ef-11eb-8286-d76f65c45e7c.jpeg">
  
  
