import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Premio } from '../../interfaces/premio';
import { RouterModule } from '@angular/router';
import { PremioService } from '../../services/premio.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-premio',
  standalone:true,
   imports: [MatTableModule, MatPaginatorModule, RouterModule],
  templateUrl: './premio.component.html',
  styleUrls: ['./premio.component.css']
})
export class PremioComponent implements OnInit  {

  premio = new MatTableDataSource<Premio>();

  displayedColumns: string[] = ['id', 'descricao','ordemPremiacao','categoria' ,'status', 'opcoes'];

  constructor(private premioService: PremioService) { }

  // Método para listar todos os premios
  obterListaPremios(){
    this.premioService.listarPremio().subscribe(data => {
      this.premio.data = data;
      console.log(this.premio.data);
    });
  }

  // Método para apagar premio
  apagar(id:number) {
    this.premioService.apagarPremio(id).subscribe(res =>
    {
      this.premio.data = this.premio.data.filter((item: Premio) => item.id !== id);
      console.log("Premio deletado com sucesso.");
    }
    )
  }

  ngOnInit(): void {
    this.obterListaPremios();
  }


}
