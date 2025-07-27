import { Jogo } from './../../interfaces/jogo';
import { CategoriaService } from './../../services/categoria.service';
import { PatrocinadorService } from './../../services/patrocinador.service';
import { Inscricao } from './../../interfaces/inscricao';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PremioService } from '../../services/premio.service';
import { ParticipanteService } from '../../services/participante.service';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { InscricaoService } from '../../services/inscricao.service';
import { JogoService } from '../../services/jogo.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule,MatCardModule,MatIconModule,MatProgressSpinner],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Variáveis para contagem
  totalPremios: number = 0;
  totalParticipantes: number = 0;
  totalPatrocinadores: number = 0;
  totalInscricoes: number = 0;
  totalJogos: number = 0;
  totalCategorias: number = 0;

  // Variáveis de loading
  loadingPremios: boolean = true;
  loadingParticipantes: boolean = true;
  loadingPatrocinadores: boolean = true;
  loadingInscricoes: boolean = true;
  loadingJogos: boolean = true;
  loadingCategorias: boolean = true;

  constructor(
    private premioService: PremioService,
    private participanteService: ParticipanteService,
    private inscricaoService: InscricaoService,
    private jogoService:JogoService,
    private PatrocinadorService:PatrocinadorService,
    private categoriaService:CategoriaService
    // Injete outros serviços
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    // Carrega dados de prêmios
    this.premioService.listarPremio().subscribe({
      next: (premios) => {
        this.totalPremios = premios.length;
        this.loadingPremios = false;
      },
      error: () => this.loadingPremios = false
    });

    // Carrega dados de participantes
    this.participanteService.listarParticipante().subscribe({
      next: (participantes) => {
        this.totalParticipantes = participantes.length;
        this.loadingParticipantes = false;
      },
      error: () => this.loadingParticipantes = false
    });

    // Carrega dados de inscrições
    this.inscricaoService.listarIncricao().subscribe({
      next: (inscricoes) => {
        this.totalInscricoes = inscricoes.length;
        this.loadingInscricoes = false;
      },
      error: () => this.loadingInscricoes = false
    });

    // Carrega dados de jogos
    this.jogoService.listarJogo().subscribe({
      next: (jogos) => {
        this.totalJogos = jogos.length;
        this.loadingJogos = false;
      },
      error: () => this.loadingJogos = false
    });

    // Carrega dados de patrocinadores
    this.PatrocinadorService.listarPatrocinador().subscribe({
      next: (patrocinadores) => {
        this.totalPatrocinadores = patrocinadores.length;
        this.loadingPatrocinadores = false;
      },
      error: () => this.loadingPatrocinadores = false
    });

    // Carrega dados de categorias
    this.categoriaService.listarCategoria().subscribe({
      next: (categorias) => {
        this.totalCategorias = categorias.length;
        this.loadingCategorias = false;
      },
      error: () => this.loadingCategorias = false
    });

  }
}
