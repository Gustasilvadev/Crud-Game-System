import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatrocinadorService } from '../../../services/patrocinador.service';
import { PatrocinadorStatus } from '../../../enums/patrocinadorStatus.enum';

@Component({
  selector: 'app-ver-patrocinador',
  imports: [RouterModule],
  templateUrl: './ver-patrocinador.component.html',
  styleUrl: './ver-patrocinador.component.css'
})
export class VerPatrocinadorComponent implements OnInit {
  id!: number;
  patrocinador: any;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(private patrocinadorService: PatrocinadorService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.statusOptions = Object.keys(PatrocinadorStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PatrocinadorStatus[key as keyof typeof PatrocinadorStatus],
        descricao: key
    }));

    this.obterPatrocinador(this.id);
  }

  obterPatrocinador(idPatrocinador: number) {
    this.patrocinadorService.buscarPatrocinador(idPatrocinador).subscribe({
      next: (res: any) => {
        this.patrocinador = res;
        console.log("Patrocinador carregada:", res);
      },
      error: (err) => {
        console.error("Erro ao buscar Patrocinador:", err);
      }
    });
  }
}
