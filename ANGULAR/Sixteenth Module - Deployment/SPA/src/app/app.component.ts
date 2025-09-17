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

//pages are rendered on demand by the dynamic web server and the browser receives a finished, rendered page
//becomes hydrated ('activated') after initial rendering (essentially becomes a SPA)
//dynamic web server is required
//I WILL CREATE A COPY OF THIS PROJECT AND ADD SSR TO IT

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}
