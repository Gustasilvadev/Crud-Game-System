import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InscricaoService } from '../../../services/inscricao.service';
import { InscricaoStatus } from '../../../enums/inscricaoStatus.enum';

@Component({
  selector: 'app-criar-inscricao',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './criar-inscricao.component.html',
  styleUrl: './criar-inscricao.component.css'
})
export class CriarInscricaoComponent implements OnInit {

  form!: FormGroup;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public inscricaoService: InscricaoService, private router: Router) { }


  ngOnInit(): void {

    // Inicializa o select com os enums
    this.statusOptions = Object.keys(InscricaoStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: InscricaoStatus[key as keyof typeof InscricaoStatus],
        descricao: key
    }));

    this.form = new FormGroup({
      data: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      participanteId: new FormControl('', [Validators.required]),
      jogoId: new FormControl('', [Validators.required])

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

    this.inscricaoService.criarInscricao(payload).subscribe((res:any) => {
      console.log('Incricao criada com sucesso!');
      this.router.navigateByUrl('/inscricao');
    })
  }
}
