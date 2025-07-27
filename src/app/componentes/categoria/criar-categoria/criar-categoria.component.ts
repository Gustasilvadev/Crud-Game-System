import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaStatus } from '../../../enums/categoriaStatus.enum';

@Component({
  selector: 'app-criar-categoria',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './criar-categoria.component.html',
  styleUrl: './criar-categoria.component.css'
})
export class CriarCategoriaComponent implements OnInit {

  form!: FormGroup;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public categoriaService: CategoriaService, private router: Router) { }


  ngOnInit(): void {

    // Inicializa o select com os enums
    this.statusOptions = Object.keys(CategoriaStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: CategoriaStatus[key as keyof typeof CategoriaStatus],
        descricao: key
    }));

    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){

    const formValue = this.form.value;
    console.log(this.form.value);
    const payload = {
      ...formValue,
      status: Number(formValue.status), // conversão aqui de texto para number
    };
    console.log(payload);

    this.categoriaService.criarCategoria(payload).subscribe((res:any) => {
      console.log('Categoria criada com sucesso!');
      this.router.navigateByUrl('/categoria');
    })
  }
}
