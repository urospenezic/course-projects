import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { UserTaskListComponent } from "./user.task.list/user.task.list.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { TaskComponent } from "./user.task.list/task/task.component";
import { NewTaskComponent } from "./user.task.list/task/new-task/new-task.component";
import { SharedModule } from "./shared/card/shared.module";

//older way of creating components. nowadays we use the standalone components.
@NgModule({
    declarations: [AppComponent, HeaderComponent, UserComponent, UserTaskListComponent, TaskComponent, NewTaskComponent],
    imports: [BrowserModule, FormsModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 

}