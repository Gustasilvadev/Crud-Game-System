import { ParticipanteService } from './../../services/participante.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Participante } from '../../interfaces/participante';

@Component({
  selector: 'app-participante',
  imports: [MatTableModule, MatPaginatorModule, RouterModule],
  templateUrl: './participante.component.html',
  styleUrl: './participante.component.css'
})
export class ParticipanteComponent implements OnInit {

  participante = new MatTableDataSource<Participante>();

  displayedColumns: string[] = ['id', 'nome', 'email', 'identificacao', 'endereco', 'status', 'opcoes'];

  constructor(private participanteService: ParticipanteService) { }

  // Método para listar todos os participante
  obterListaParticipante(){
    this.participanteService.listarParticipante().subscribe(data => {
      this.participante.data = data;
      console.log(this.participante.data);
    });
  }

  // Método para apagar participante
  apagar(id:number) {
    this.participanteService.apagarParticipante(id).subscribe(res =>
    {
      this.participante.data = this.participante.data.filter((item: Participante) => item.id !== id);
      console.log("Participante deletado com sucesso.");
    })
  }

  ngOnInit(): void {
    this.obterListaParticipante();
  }

}
