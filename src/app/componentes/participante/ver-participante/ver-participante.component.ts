import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParticipanteService } from '../../../services/participante.service';
import { ParticipanteStatus } from '../../../enums/participanteStatus.enum';

@Component({
  selector: 'app-ver-participante',
  imports: [RouterModule],
  templateUrl: './ver-participante.component.html',
  styleUrl: './ver-participante.component.css'
})
export class VerParticipanteComponent implements OnInit {

  id!: number;
  participante: any;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(private participanteService: ParticipanteService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.statusOptions = Object.keys(ParticipanteStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: ParticipanteStatus[key as keyof typeof ParticipanteStatus],
        descricao: key
    }));

    this.obterParticipante(this.id);
  }

  obterParticipante(idParticipante: number) {
    this.participanteService.buscarParticipante(idParticipante).subscribe({
      next: (res: any) => {
        this.participante = res;
        console.log("Participante carregado:", res);
      },
      error: (err) => {
        console.error("Erro ao buscar participante:", err);
      }
    });
  }
}
