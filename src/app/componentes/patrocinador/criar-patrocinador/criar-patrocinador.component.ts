import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PatrocinadorService } from '../../../services/patrocinador.service';
import { PatrocinadorStatus } from '../../../enums/patrocinadorStatus.enum';

@Component({
  selector: 'app-criar-patrocinador',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './criar-patrocinador.component.html',
  styleUrl: './criar-patrocinador.component.css'
})
export class CriarPatrocinadorComponent implements OnInit {

  form!: FormGroup;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public patrocinadorService: PatrocinadorService, private router: Router) { }


  ngOnInit(): void {

    // Inicializa o select com os enums
    this.statusOptions = Object.keys(PatrocinadorStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PatrocinadorStatus[key as keyof typeof PatrocinadorStatus],
        descricao: key
    }));

    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      representanteNome: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
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

    this.patrocinadorService.criarPatrocinador(payload).subscribe((res:any) => {
      console.log('Patrocinador criado com sucesso!');
      this.router.navigateByUrl('/patrocinador');
    })
  }
}
