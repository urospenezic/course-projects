import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "./header/header.component";
import { UsersComponent } from "./users/users.component";
//SPA - Single Page Application build (there's 1 index.html file, client side only rendering - the js code served is the only code that does the rendering):
//ng build or npm run build which will trigger ng build under the hood. this compiles ts code to js code and optimizes the code for production.
//this way we get the polyfills.js and main.js files which are used to run the app in the browser. those are located in the dist folder, which build outputs.
//SPA: disadvantages:
//initially missing content (the base file being loaded is the index.html file, which is pretty much empty, so if js is slow on rendering users might initially see pretty empty websites)
//bad SEO - crawlers will not see the content, they'll mostly see an almost empty index html file

//DEPLOYING SPA:
//no need to have a dynamic server, we just need a static host that can serve the static files (js and html we provide). so deployment is pretty straightforward.
//Firebase - for example static host for free
//go to create project, follow the steps, go to hosting -> get started -> npm install -g firebase-tools -> in terminal "firebase login" -> "firebase init" -> "firebase deploy"

//SHORTCUT FOR DEPLOYING:
//ng add @angular/fire //installs firebase and angular firebase library (THERE ARE ALSO LIBRARIES FOR VERCEL, NETLIFY, GITHUB PAGES, AMAZAON CLOUD S3 ETC)
//ng deploy //deploys the app to firebase

//********************SERVER SIDE RENDERING (SSR)*********************************/

//TO CONVERT THE APP TO SSR:
//ng add @angular/ssr
//follow the instructions
//this will change the angular.json file to set up the server side rendering
//it will also create a server.ts file and a main.server.ts file

//********************SSR BUILD*********************************/
//run ng build - will add a server subfolder to the dist folder, as well as the usual files

/*OUTPUT
Server bundles
Initial chunk files     | Names               |  Raw size
server.mjs              | server              |   1.11 MB | 
chunk-6G375PKY.mjs      | -                   | 571.19 kB | 
polyfills.server.mjs    | polyfills.server    | 268.60 kB | 
chunk-SDALTKD2.mjs      | -                   |  42.00 kB | 
chunk-5XUXGTUW.mjs      | -                   |   2.55 kB | 
render-utils.server.mjs | render-utils.server |   1.47 kB | 
main.server.mjs         | main.server         | 149 bytes | 

Lazy chunk files        | Names               |  Raw size
chunk-VCVCHJZV.mjs      | xhr2                |  12.07 kB | 
*/

//WE CAN NOW RUN THE SSR APP LOCALLY (PREVIEW MODE FOR TESTING AND DEBUGGING):
//in terminal: npm run serve:ssr:routing (it has to match the name in package.json (under scripts object))

//IF WE JUST RUN THIS WITHOUT ANY TWEAKS AND LOAD UP USER TASKS -> REFRESH THE PAGE WE ARE HIT WITH THIS ERROR IN THE TERMINAL:
/*
Node Express server listening on http://localhost:4000
ERROR ReferenceError: localStorage is not defined
    at new n (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-SDALTKD2.mjs:2:5592)
    at k.ɵfac [as factory] (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-SDALTKD2.mjs:2:5994)
    at so.hydrate (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-6G375PKY.mjs:8:11504)
    at so.get (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-6G375PKY.mjs:8:10618)
    at RT (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-6G375PKY.mjs:5:2448)
    at ue (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-6G375PKY.mjs:5:2527)
    at G (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-6G375PKY.mjs:5:2571)
    at rt (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-SDALTKD2.mjs:2:8834)
    at file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-6G375PKY.mjs:43:80534
    at kn (file:///D:/Projects/Angular%20Learning/Sixteenth%20Module%20-%20Deployment/SSR/dist/routing/server/chunk-6G375PKY.mjs:8:12998)
*/

//LOCAL STORAGE IS NOT AVAILABLE ON THE SERVER SIDE - ITS A BROWSER FEATURE
//ONE FIX IS TO USE THE afterNextRender() method to run code after the next render (that way, the localStorage is available because SSR only runs the first render)
//SEE TASKS.SERVICE.TS FOR THE FIX

/*
THERE IS ALSO ONE MORE PROBLEM WITH THE APP:
IF WE MANUALLY NAVIGATE TO USERS TASK, WE WILL SEE DIFFERENT TASKS THEN WHEN WE NAVIGATE BY CLICKING TO OTHER USER AND THEN COMING BACK TO PREV USER TASKS
THAT'S BECAUSE THE INITIAL LIST OF TASKS COMES FROM THE SERVER, WHICH IS USING THE HARDCODED DATA FROM THE TASKS.SERVICE.TS FILE
BUT IF THE APP AFTER THE FIRST RENDER IS USING LOCAL STORAGE, THE LIST OF TASKS WILL BE DIFFERENT
PROBLEM IS THAT WE HAVE A RESOLVER THAT READS THE TASKS ONCE (RESOLVE USER TASKS RESOLVER)
TO FIX THE BUG WE SHOULD USE AN ACTUAL DATABASE OR SOME STORAGE THAT WORKS ON THE SERVER SIDE AS WELL

FOR NOW, ILL COMMENT OUT THE RESOLVER AND UPDATE THE COMPONENT TO USE THE TASKS SERVICE TO GET THE TASKS AND USE COMPUTED 
*/

//************************SSG (STATIC SITE GENERATION) *********************************/
//it is a combination of SSR and SPA - we do some ssr rendering, but routes are pre-rendered on build time client side
//that way the page is server quicker than in rendered on demand by the server
//dynamic web server is still required
//DISADVANTAGE: if you pre-render a page that fetches data, we will have no dynamic data fetching (data is fetched only doing build time)

//to add ssg:
//ng add @angular/ssg (or if converting from ssr, we skip this because its contained within ssr lib)
//out of the box with ssr angular will already try to pre-render some pages (in angular.json file prerender:true) (its trying to identify pages that can be pre-rendered)
//by default, the page can be pre-rendered if they do not have dynamic routes (so its considered that a dynamic route means a dynamic data fetching)
//it can however pre-render the NoTaskComponent route (which is a static route)

//to manually add a page to be pre-rendered:
//add a .txt file anywhere in src folder (any name)
//per line, manually add the route that you want to pre-render
//for example a line can be: "/users/u1/tasks"
//once we've added the routes to this .txt file, we go back to angular.json file and change the "prerender" from true to {routesFile:"prerender.txt"}

/*
When deploying Angular applications that need to run code on the server (i.e., SSR apps or SSG + SSR apps), you need a hosting provider that allows you do that.
A static host (which only serves static files but doesn't run any code on the server) does NOT suffice.

When it comes to deploying Angular apps, Firebase' "App Hosting" service can be a great choice: https://firebase.google.com/docs/app-hosting.

Firebase, like Angular, is developed by Google. Therefore, deploying an Angular app via Firebase App Hosting is relatively straightforward. 
You can follow the steps outlined in the official documentation: https://firebase.google.com/docs/app-hosting/get-started
*/

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}
