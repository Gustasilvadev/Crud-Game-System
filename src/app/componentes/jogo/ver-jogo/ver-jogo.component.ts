import { Inscricao } from './../../../interfaces/inscricao';
import { CommonModule } from '@angular/common';
import { InscricaoService } from './../../../services/inscricao.service';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JogoService } from '../../../services/jogo.service';
import { JogoStatus } from '../../../enums/jogoStatus.enum';
import { catchError, forkJoin, of } from 'rxjs';
import { Jogo } from '../../../interfaces/jogo';
import { InscricaoStatus } from '../../../enums/inscricaoStatus.enum';

@Component({
  selector: 'app-ver-jogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-jogo.component.html',
  styleUrl: './ver-jogo.component.css'
})
export class VerJogoComponent implements OnInit {
  id!: number;
  jogo: any ;

  loading: boolean = true;
  error: string | null = null;

  public InscricaoStatus = InscricaoStatus;
  public JogoStatus = JogoStatus;

  statusJogo: { id: number, descricao: string }[] = [];
  statusInscricao: { id: number, descricao: string }[] = [];



  constructor(
    private jogoService: JogoService,
    private inscricaoService: InscricaoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.statusJogo = Object.keys(JogoStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: JogoStatus[key as keyof typeof JogoStatus],
        descricao: key
      }));

    this.statusInscricao = Object.keys(InscricaoStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: InscricaoStatus[key as keyof typeof InscricaoStatus],
        descricao: key
      }));

    this.obterJogo(this.id);
  }

   obterJogo(idJogo: number){
    forkJoin({
      jogo: this.jogoService.buscarJogo(idJogo), // returns jogo[]
      inscricoes: this.inscricaoService.listarIncricao(), // returns inscricoes[]
    }).subscribe({
      next: ({ jogo, inscricoes }) => {
          const inscricao = inscricoes.find(c => c.id === jogo.categoriaId);

          this.jogo = {
            ...jogo,

          };
          console.log(this.jogo);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.jogo = null;
      }
    });

  }


}
