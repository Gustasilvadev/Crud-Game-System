import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Jogo } from '../../interfaces/jogo';
import { MatPaginator } from '@angular/material/paginator';
import { JogoService } from '../../services/jogo.service';

@Component({
  selector: 'app-jogo',
  imports: [MatTableModule,ReactiveFormsModule,RouterModule],
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.css'
})
export class JogoComponent implements  OnInit {

  jogo = new MatTableDataSource<Jogo>();

  displayedColumns: string[] = ['id', 'nome', 'status', 'opcoes'];

  constructor(private jogoService: JogoService) { }

  // Método para listar todos os jogos
  obterListaJogo(){
    this.jogoService.listarJogo().subscribe(data => {
      this.jogo.data = data;
      console.log(this.jogo.data);
    });
  }

  // Método para apagar jogo
  apagar(id:number) {
    this.jogoService.apagarJogo(id).subscribe(res =>
    {
      this.jogo.data = this.jogo.data.filter((item: Jogo) => item.id !== id);
      console.log("Jogo deletado com sucesso.");
    }
    )
  }

  ngOnInit(): void {
    this.obterListaJogo();
  }

}
