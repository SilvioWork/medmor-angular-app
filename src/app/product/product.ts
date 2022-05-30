import { TypeContainer } from "./typecontainer";
import { Section } from "../section/section";

export class Product {

    id:number = 0;
    size: string = '';
    color: string = '';
    price:number = 0;
    fragile:boolean = true;
    amount: number = 0;
    lot:string = '';
    containerType: TypeContainer = TypeContainer.UNASIGNED;

    section!: Section;


}
