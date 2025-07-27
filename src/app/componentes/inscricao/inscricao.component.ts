import { Inscricao } from './../../interfaces/inscricao';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { InscricaoService } from '../../services/inscricao.service';

@Component({
  selector: 'app-inscricao',
  imports: [MatTableModule,ReactiveFormsModule,RouterModule],
  templateUrl: './inscricao.component.html',
  styleUrl: './inscricao.component.css'
})
export class InscricaoComponent implements  OnInit {

  inscricao = new MatTableDataSource<Inscricao>();

  displayedColumns: string[] = ['id', 'data', 'status', 'participanteId', 'jogoId',  'opcoes'];

  constructor(private InscricaoService: InscricaoService) { }

  // Método para listar todas as inscricoes
  obterListaInscricoes(){
    this.InscricaoService.listarIncricao().subscribe(data => {
      this.inscricao.data = data;
      console.log(this.inscricao.data);
    });
  }

  // Método para apagar inscricao
  apagar(id:number) {
    this.InscricaoService.apagarInscricao(id).subscribe(res =>
    {
      this.inscricao.data = this.inscricao.data.filter((item: Inscricao) => item.id !== id);
      console.log("Inscricao deletada com sucesso.");
    }
    )
  }

  ngOnInit(): void {
    this.obterListaInscricoes();
  }

}
