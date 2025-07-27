import { Inscricao } from './../../../interfaces/inscricao';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaStatus } from '../../../enums/categoriaStatus.enum';
import { InscricaoStatus } from '../../../enums/inscricaoStatus.enum';
import { JogoStatus } from '../../../enums/jogoStatus.enum';
import { JogoService } from '../../../services/jogo.service';
import { InscricaoService } from '../../../services/inscricao.service';
import { CategoriaService } from '../../../services/categoria.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ver-categoria',
  imports: [CommonModule,RouterModule],
  templateUrl: './ver-categoria.component.html',
  styleUrl: './ver-categoria.component.css'
})
export class VerCategoriaComponent implements OnInit {
  id!: number;
  categoria: any ;

  loading: boolean = true;
  error: string | null = null;

  jogoSelecionado: any = null;
  inscricoesDoJogoSelecionado: Inscricao[] = [];
  carregandoInscricoes: boolean = false;

  public CategoriaStatus = CategoriaStatus;
  public InscricaoStatus = InscricaoStatus;
  public JogoStatus = JogoStatus;

  statusJogo: { id: number, descricao: string }[] = [];
  statusInscricao: { id: number, descricao: string }[] = [];
  statusCategoria: { id: number, descricao: string }[] = [];



  constructor(
    private jogoService: JogoService,
    private inscricaoService: InscricaoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.statusCategoria = Object.keys(CategoriaStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: CategoriaStatus[key as keyof typeof CategoriaStatus],
        descricao: key
    }));

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

    this.obterCategoria(this.id);
  }

    obterCategoria(idCategoria: number) {
    forkJoin({
      categoria: this.categoriaService.buscarCategoria(idCategoria),
      jogos: this.jogoService.listarJogo()
    }).subscribe({
      next: ({ categoria, jogos }) => {
        // Filtra apenas os jogos da categoria
        const jogosDaCategoria = jogos.filter(jogo => jogo.categoriaId === idCategoria);

        this.categoria = {
          ...categoria,
          todosJogos: jogosDaCategoria
        };

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.error = 'Erro ao carregar dados';
        this.loading = false;
      }
    });
  }

  selecionarJogo(jogo: any) {
    this.jogoSelecionado = jogo;
    this.carregarInscricoes(jogo.id);
  }

  carregarInscricoes(jogoId: number) {
    this.carregandoInscricoes = true;
    this.inscricaoService.listarIncricao().subscribe({
      next: (inscricoes) => {
        this.inscricoesDoJogoSelecionado = inscricoes.filter(i => i.jogoId === jogoId);
        this.carregandoInscricoes = false;
      },
      error: (err) => {
        console.error('Erro ao carregar inscrições:', err);
        this.carregandoInscricoes = false;
      }
    });
  }
}

