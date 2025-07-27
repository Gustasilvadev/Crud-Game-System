import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PainelBotao } from '../../interfaces/PainelBotao';

@Component({
  selector: 'app-layoutpainel',
  imports: [RouterModule,CommonModule],
  templateUrl: './layoutpainel.component.html',
  styleUrl: './layoutpainel.component.css'
})
export class LayoutpainelComponent {
  painelBotoes: PainelBotao[] = [
    { label: 'Prêmios', icon: 'emoji_events', route: '/premio' },
    { label: 'Participantes', icon: 'people', route: '/participante' },
    { label: 'Patrocinadores', icon: 'business', route: '/patrocinador' },
    { label: 'Inscrições', icon: 'how_to_reg', route: '/inscricao' },
    { label: 'Jogos', icon: 'sports_esports', route: '/jogo' },
    { label: 'Categorias', icon: 'category', route: '/categoria' },
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' }
  ];


}
