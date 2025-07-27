import { VerCategoriaComponent } from './componentes/categoria/ver-categoria/ver-categoria.component';
import { Routes } from '@angular/router';
import { LayoutpainelComponent } from './componentes/layoutpainel/layoutpainel.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';

export const routes: Routes = [


   {
    path: '',
    component: LayoutpainelComponent, // Layout com painel lateral
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent // Tela inicial com cards
      },
    // Rotas do Premio
    {
      path: 'premio',
      loadComponent: () => import ('./componentes/premio/premio.component').then(mod => mod.PremioComponent)
    },
    {
      path: 'atualizar-premio/:id',
      loadComponent: () => import ('./componentes/premio/atualizar-premio/atualizar-premio.component').then(mod => mod.AtualizarPremioComponent)
    },
    {
      path: 'criar-premio',
      loadComponent: () => import ('./componentes/premio/criar-premio/criar-premio.component').then(mod => mod.CriarPremioComponent)
    },
    {
      path: 'ver-premio/:id',
      loadComponent: () => import ('./componentes/premio/ver-premio/ver-premio.component').then(mod => mod.VerPremioComponent)
    },


    // Rotas do patrocinador
    {
      path: 'patrocinador',
      loadComponent: () => import ('./componentes/patrocinador/patrocinador.component').then(mod => mod.PatrocinadorComponent)
    },
    {
      path: 'atualizar-patrocinador/:id',
      loadComponent: () => import ('./componentes/patrocinador/atualizar-patrocinador/atualizar-patrocinador.component').then(mod => mod.AtualizarPatrocinadorComponent)
    },
    {
      path: 'criar-patrocinador',
      loadComponent: () => import ('./componentes/patrocinador/criar-patrocinador/criar-patrocinador.component').then(mod => mod.CriarPatrocinadorComponent)
    },
    {
      path: 'ver-patrocinador/:id',
      loadComponent: () => import ('./componentes/patrocinador/ver-patrocinador/ver-patrocinador.component').then(mod => mod.VerPatrocinadorComponent)
    },

    // Rotas do participante
    {
      path: 'participante',
      loadComponent: () => import ('./componentes/participante/participante.component').then(mod => mod.ParticipanteComponent)
    },
    {
      path: 'atualizar-participante/:id',
      loadComponent: () => import ('./componentes/participante/atualizar-participante/atualizar-participante.component').then(mod => mod.AtualizarParticipanteComponent)
    },
    {
      path: 'criar-participante',
      loadComponent: () => import ('./componentes/participante/criar-participante/criar-participante.component').then(mod => mod.CriarParticipanteComponent)
    },
    {
      path: 'ver-participante/:id',
      loadComponent: () => import ('./componentes/participante/ver-participante/ver-participante.component').then(mod => mod.VerParticipanteComponent)
    },

    // Rotas da inscricao
    {
      path: 'inscricao',
      loadComponent: () => import ('./componentes/inscricao/inscricao.component').then(mod => mod.InscricaoComponent)
    },
    {
      path: 'atualizar-inscricao/:id',
      loadComponent: () => import ('./componentes/inscricao/atualizar-inscricao/atualizar-inscricao.component').then(mod => mod.AtualizarInscricaoComponent)
    },
    {
      path: 'criar-inscricao',
      loadComponent: () => import ('./componentes/inscricao/criar-inscricao/criar-inscricao.component').then(mod => mod.CriarInscricaoComponent)
    },
    {
      path: 'ver-inscricao/:id',
      loadComponent: () => import ('./componentes/inscricao/ver-inscricao/ver-inscricao.component').then(mod => mod.VerInscricaoComponent)
    },

    // Rotas da jogo
    {
      path: 'jogo',
      loadComponent: () => import ('./componentes/jogo/jogo.component').then(mod => mod.JogoComponent)
    },
    {
      path: 'atualizar-jogo/:id',
      loadComponent: () => import ('./componentes/jogo/atualizar-jogo/atualizar-jogo.component').then(mod => mod.AtualizarJogoComponent)
    },
    {
      path: 'criar-jogo',
      loadComponent: () => import ('./componentes/jogo/criar-jogo/criar-jogo.component').then(mod => mod.CriarJogoComponent)
    },
    {
      path: 'ver-jogo/:id',
      loadComponent: () => import ('./componentes/jogo/ver-jogo/ver-jogo.component').then(mod => mod.VerJogoComponent)
    },

    // Rotas da categoria
    {
      path: 'categoria',
      loadComponent: () => import ('./componentes/categoria/categoria.component').then(mod => mod.CategoriaComponent)
    },
    {
      path: 'atualizar-categoria/:id',
      loadComponent: () => import ('./componentes/categoria/atualizar-categoria/atualizar-categoria.component').then(mod => mod.AtualizarCategoriaComponent)
    },
    {
      path: 'criar-categoria',
      loadComponent: () => import ('./componentes/categoria/criar-categoria/criar-categoria.component').then(mod => mod.CriarCategoriaComponent)
    },
    {
      path: 'ver-categoria/:id',
      loadComponent: () => import ('./componentes/categoria/ver-categoria/ver-categoria.component').then(mod => mod.VerCategoriaComponent)
    }
  ]
 }
];

