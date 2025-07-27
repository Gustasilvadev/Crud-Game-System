import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PremioService } from '../../../services/premio.service';
import { PremioStatus } from '../../../enums/premioStatus.enum';
import { PremioCategoria } from '../../../enums/premioCategoria.enum';

@Component({
  selector: 'app-criarPremio',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './criar-premio.component.html',
  styleUrls: ['./criar-premio.component.css']
})
export class CriarPremioComponent implements OnInit {

  form!: FormGroup;

  statusOptions: { id: number, descricao: string }[] = [];
  categoriaOptions: { id: number, descricao: string }[] = [];

  constructor(public premioService: PremioService, private router: Router) { }


  ngOnInit(): void {

    // Inicializa o select com os enums
    this.statusOptions = Object.keys(PremioStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PremioStatus[key as keyof typeof PremioStatus],
        descricao: key
    }));

    this.categoriaOptions = Object.keys(PremioCategoria)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PremioCategoria[key as keyof typeof PremioCategoria],
        descricao: key
    }));

    this.form = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      ordemPremiacao: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
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
      categoria: Number(formValue.categoria),
    };
    console.log(payload);

    this.premioService.criarPremio(payload).subscribe((res:any) => {
      console.log('Premio criado com sucesso!');
      this.router.navigateByUrl('/premio');
    })
  }
}
