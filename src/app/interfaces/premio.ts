import { PremioCategoria } from "../enums/premioCategoria.enum";
import { PremioStatus } from "../enums/premioStatus.enum";

export interface Premio {
  id:number;
  descricao:string;
  ordemPremiacao:string;
  categoria:PremioCategoria;
  status:PremioStatus;
}
