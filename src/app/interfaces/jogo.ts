import { JogoStatus } from "../enums/jogoStatus.enum";
import { Inscricao } from "./inscricao";

export interface Jogo {
  id:number;
  nome:string;
  status:JogoStatus;
  categoriaId:number;
  inscricoes: Inscricao[];
}
