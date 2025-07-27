import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PremioService } from '../../../services/premio.service';
import { PremioCategoria } from '../../../enums/premioCategoria.enum';
import { PremioStatus } from '../../../enums/premioStatus.enum';

@Component({
  selector: 'app-verPremio',
  imports:[RouterModule],
  templateUrl: './ver-premio.component.html',
  styleUrls: ['./ver-premio.component.css']
})
export class VerPremioComponent implements OnInit {

  id!: number;
  premio: any;

  categoriaOptions: { id: number, descricao: string }[] = [];
  statusOptions: { id: number, descricao: string }[] = [];

  constructor(private premioService: PremioService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.statusOptions = Object.keys(PremioCategoria)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PremioCategoria[key as keyof typeof PremioCategoria],
        descricao: key
    }));

    this.statusOptions = Object.keys(PremioStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PremioStatus[key as keyof typeof PremioStatus],
        descricao: key
    }));

    this.obterPremio(this.id);
  }

  obterPremio(idPremio: number) {
    this.premioService.buscarPremio(idPremio).subscribe({
      next: (res: any) => {
        this.premio = res;
        console.log("Premio carregado:", res);
      },
      error: (err) => {
        console.error("Erro ao buscar o premio:", err);
      }
    });
  }
}
