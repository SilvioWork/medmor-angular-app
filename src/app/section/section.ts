
import { TypeProduct } from "./typeProduct";

export class Section{
  public id: number = 0;
  public size: number=0;
  public typeProduct: TypeProduct = TypeProduct.UNASIGNED;
  public products: string[] =[];
}
