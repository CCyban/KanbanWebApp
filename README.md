# Kanban WebApp

The web application allows you to create/edit/delete/read Kanbans and the data inside them. The data is stored onto a MongoDB server through the web client you access the data on, using an ExpressJS server to transfer data back and forth. Accounts can be made through the account creation page on the client, and are given a 12-hour token to perform actions around the kanban data as well as the account's own data. After that, the token will have expired and they will need to sign in again for security reasons.

<hr />

This utilises a MEVN web application stack.

A MEVN stack conists of:
- [<b>M</b>ongoDB](https://www.mongodb.com/)
- [<b>E</b>xpressJS](https://expressjs.com/)
- [<b>V</b>ueJS](https://vuejs.org/)
- [<b>N</b>odeJS](https://nodejs.org/en/)

My MEVN stack also includes [Mongoose](https://mongoosejs.com/) (a popular ODM for MongoDB) & primary is made using [TypeScript](https://www.typescriptlang.org/).

<hr />

# How to Run

## Two Prerequisites
- This requires the latest version of NodeJS version 12 or above to run. <br /> You can download it from their offical page: https://nodejs.org/en/download/. <br />
Anything below will fail as [whatwg-url](https://www.npmjs.com/package/whatwg-url) (a popular package this uses) uses node APIs that were introduced in v12.

- This also requires a localhost MongoDB server to be set up without any authentication. <br /> You can find instructions on how to do so using their documentation here: https://docs.mongodb.com/guides/server/install/.

## Installing Packages
There are two ways to install packages, I have made batch files to make the process easier.

### Batch Files (Method 1)
1. Go into the batch folder.
2. Click open the <code>install-packages.bat</code> file & it will open 2 cmd windows, one for the client and another for the server. They will automatically install the packages; you can close them when they have finished installing.

### Traditionally (Method 2)
1. Go into the server folder.
2. Type <code>npm install</code>
3. Go into the client folder.
4. Type <code>npm install</code>



## Running the Client and Server
There are two ways to compile & run the client and server, I have made batch files to make the process easier.

### Batch Files (Method 1)
1. Go into the batch folder.
2. Click open the <code>start.bat</code> file & it will open 2 cmd windows, one for the client and another for the server. They will automatically build and run the servers provided you have installed the packages from earlier.
<br /> **Do not close or cancel the terminal processes until you wish to close the web server or ExpressJS server respectively.**

### Traditionally (Method 2)
1. Go into the server folder.
2. Type <code>npm run dev</code> (Do not close or cancel the process, just ignore the terminal until you want to close the ExpressJS server down).
3. Go into the client folder.
4. Type <code>npm run serve</code> (Do not close or cancel the process, just ignore the terminal until you want to close the web server down).


## Done?
- Provided you have done all that is asked, you should be able to access the client through http://localhost:8080/.
<br />It should look something like this ![image](https://user-images.githubusercontent.com/47162481/143316132-712ded9c-2414-4f43-b618-c7ee95f8303e.png)

- To check the server is running, you can go to http://localhost:8090/ to find out. You will get a message like this if it is
<br />![image](https://user-images.githubusercontent.com/47162481/143315969-5f41a003-8f8a-4d3c-9925-ea7cc35768f1.png)


## Any issues? Read more READMEs to ensure you have not missed anything.
- [Client README](https://github.com/CCyban/KanbanWebApp/tree/main/kanban-web-app/client#readme)
- [Server README](https://github.com/CCyban/KanbanWebApp/tree/main/kanban-web-app/server#readme)
