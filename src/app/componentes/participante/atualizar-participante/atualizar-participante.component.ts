import { Participante } from './../../../interfaces/participante';
import { ParticipanteService } from './../../../services/participante.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParticipanteStatus } from '../../../enums/participanteStatus.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-atualizar-participante',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './atualizar-participante.component.html',
  styleUrl: './atualizar-participante.component.css'
})
export class AtualizarParticipanteComponent implements OnInit {

  idParticipante!: number;
  participante!: Participante;
  form!: FormGroup;
  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public participanteService: ParticipanteService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

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

    this.idParticipante = this.route.snapshot.params['id'];

    forkJoin({
      participante: this.participanteService.buscarParticipante(this.idParticipante),
    }).subscribe({
      next: ({ participante}) => {
        this.participante = participante;

        this.form.patchValue({
          nome: participante.nome,
          email: participante.email,
          identificacao: participante.identificacao,
          endereco: participante.endereco,
          status: participante.status,
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

    this.participanteService.atualizarParticipante(this.idParticipante, payload).subscribe((res:any) => {
      console.log('Participante atualizado com sucesso!');
      this.router.navigateByUrl('/participante');
    })
  }
}
