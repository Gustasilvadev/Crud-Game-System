import { ParticipanteStatus } from "../enums/participanteStatus.enum";

export interface Participante {
  id:number;
  nome:string;
  email:string;
  identificacao:string;
  endereco:string;
  status:ParticipanteStatus;
}
