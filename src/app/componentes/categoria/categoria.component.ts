import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../interfaces/categoria';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  imports: [MatTableModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  categoria = new MatTableDataSource<Categoria>();

  displayedColumns: string[] = ['id', 'nome', 'status', 'opcoes'];

  constructor(private categoriaService: CategoriaService) { }

  // Método para listar todas as categorias
  obterListaCategoria(){
    this.categoriaService.listarCategoria().subscribe(data => {
      this.categoria.data = data;
      console.log(this.categoria.data);
    });
  }

  // Método para apagar categoria
  apagar(id:number) {
    this.categoriaService.apagarCategoria(id).subscribe(res =>
    {
      this.categoria.data = this.categoria.data.filter((item: Categoria) => item.id !== id);
      console.log("Categoria deletada com sucesso.");
    }
    )
  }

  ngOnInit(): void {
    this.obterListaCategoria();
  }
}
