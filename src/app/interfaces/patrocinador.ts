import { PatrocinadorStatus } from "../enums/patrocinadorStatus.enum";

export interface Patrocinador {
  id:number;
  nome:string;
  representanteNome:string;
  status:PatrocinadorStatus;
}
