import { InscricaoStatus } from "../enums/inscricaoStatus.enum";

export interface Inscricao {
  id:number;
  data:string;
  status: InscricaoStatus;
  participanteId: number;
  jogoId: number;

}
