import { CategoriaStatus } from "../enums/categoriaStatus.enum";
import { Inscricao } from "./inscricao";
import { Jogo } from "./jogo";

export interface Categoria {
  id:number;
  nome:string;
  status:CategoriaStatus;
  jogos:Jogo[];
  inscricoes:Inscricao[];
}
