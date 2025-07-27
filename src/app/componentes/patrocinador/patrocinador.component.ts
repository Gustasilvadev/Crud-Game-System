import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Patrocinador } from '../../interfaces/patrocinador';
import { PatrocinadorService } from '../../services/patrocinador.service';

@Component({
  selector: 'app-patrocinador',
  imports: [MatTableModule, MatPaginatorModule, RouterModule],
  templateUrl: './patrocinador.component.html',
  styleUrl: './patrocinador.component.css'
})
export class PatrocinadorComponent implements OnInit {

  patrocinador = new MatTableDataSource<Patrocinador>();

  displayedColumns: string[] = ['id', 'nome',"representanteNome", 'status', 'opcoes'];

  constructor(private patrocinadorService: PatrocinadorService) { }

  // Método para listar todos os patrocinador
  obterListaPatrocinador(){
    this.patrocinadorService.listarPatrocinador().subscribe(data => {
      this.patrocinador.data = data;
      console.log(this.patrocinador.data);
    });
  }

  // Método para apagar patrocinador
  apagar(id:number) {
    this.patrocinadorService.apagarPatrocinador(id).subscribe(res =>
    {
      this.patrocinador.data = this.patrocinador.data.filter((item: Patrocinador) => item.id !== id);
      console.log("Patrocinador deletado com sucesso.");
    }
    )
  }

  ngOnInit(): void {
    this.obterListaPatrocinador();
  }

}
