import { NgModule } from "@angular/core";    
import { CardComponent } from "./card.component";

@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent]//components that are shipped with this module when importing it
})
export class SharedModule{

}