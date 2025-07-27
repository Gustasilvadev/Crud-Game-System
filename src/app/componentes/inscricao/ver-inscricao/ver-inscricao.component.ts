import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InscricaoService } from '../../../services/inscricao.service';
import { InscricaoStatus } from '../../../enums/inscricaoStatus.enum';

@Component({
  selector: 'app-ver-inscricao',
  imports: [RouterModule],
  templateUrl: './ver-inscricao.component.html',
  styleUrl: './ver-inscricao.component.css'
})
export class VerInscricaoComponent implements OnInit {

  id!: number;
  inscricao: any;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(private inscricaoService: InscricaoService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.statusOptions = Object.keys(InscricaoStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: InscricaoStatus[key as keyof typeof InscricaoStatus],
        descricao: key
    }));

    this.obterIncricao(this.id);
  }

  obterIncricao(idInscricao: number) {
    this.inscricaoService.buscarInscricao(idInscricao).subscribe({
      next: (res: any) => {
        this.inscricao = res;
        console.log("Inscricao carregada:", res);
      },
      error: (err) => {
        console.error("Erro ao buscar inscricao:", err);
      }
    });
  }
}
