import { ParticipanteService } from './../../../services/participante.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ParticipanteStatus } from '../../../enums/participanteStatus.enum';

@Component({
  selector: 'app-criar-participante',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './criar-participante.component.html',
  styleUrl: './criar-participante.component.css'
})
export class CriarParticipanteComponent implements OnInit {

  form!: FormGroup;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public participanteService: ParticipanteService, private router: Router) { }


  ngOnInit(): void {

    // Inicializa o select com os enums
    this.statusOptions = Object.keys(ParticipanteStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: ParticipanteStatus[key as keyof typeof ParticipanteStatus],
        descricao: key
    }));

    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      identificacao: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
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

    this.participanteService.criarParticipante(payload).subscribe((res:any) => {
      console.log('Participante criado com sucesso!');
      this.router.navigateByUrl('/participante');
    })
  }
}
