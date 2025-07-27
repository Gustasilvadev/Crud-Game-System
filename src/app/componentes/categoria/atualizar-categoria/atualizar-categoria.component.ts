import { Categoria } from './../../../interfaces/categoria';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaStatus } from '../../../enums/categoriaStatus.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-atualizar-categoria',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './atualizar-categoria.component.html',
  styleUrl: './atualizar-categoria.component.css'
})
export class AtualizarCategoriaComponent implements OnInit {

  idCategoria!: number;
  categoria!: Categoria;
  form!: FormGroup;
  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public categoriaService: CategoriaService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

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

    this.idCategoria = this.route.snapshot.params['id'];

    forkJoin({
      categoria: this.categoriaService.buscarCategoria(this.idCategoria),
    }).subscribe({
      next: ({ categoria}) => {
        this.categoria = categoria;

        this.form.patchValue({
          nome: categoria.nome,
          status: categoria.status,
        });
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    console.log(this.form.value);
    const payload = {
      ...formValue,
      status: Number(formValue.status)
    };
    console.log(payload);

    this.categoriaService.atualizarCategoria(this.idCategoria, payload).subscribe((res:any) => {
      console.log('Categoria atualizada com sucesso!');
      this.router.navigateByUrl('/categoria');
    })
  }
}
