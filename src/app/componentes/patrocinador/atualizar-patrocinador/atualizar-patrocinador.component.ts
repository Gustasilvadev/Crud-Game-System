import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Patrocinador } from '../../../interfaces/patrocinador';
import { PatrocinadorService } from '../../../services/patrocinador.service';
import { PatrocinadorStatus } from '../../../enums/patrocinadorStatus.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-atualizar-patrocinador',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './atualizar-patrocinador.component.html',
  styleUrl: './atualizar-patrocinador.component.css'
})
export class AtualizarPatrocinadorComponent implements OnInit {

  idPatrocinador!: number;
  patrocinador!: Patrocinador;
  form!: FormGroup;
  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public patrocinadorService: PatrocinadorService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

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

    this.idPatrocinador = this.route.snapshot.params['id'];

    forkJoin({
      patrocinador: this.patrocinadorService.buscarPatrocinador(this.idPatrocinador),
    }).subscribe({
      next: ({ patrocinador}) => {
        this.patrocinador = patrocinador;

        this.form.patchValue({
          nome: patrocinador.nome,
          representanteNome: patrocinador.representanteNome,
          status: patrocinador.status,
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

    this.patrocinadorService.atualizarPatrocinador(this.idPatrocinador, payload).subscribe((res:any) => {
      console.log('Patrocinador atualizado com sucesso!');
      this.router.navigateByUrl('/patrocinador');
    })
  }
}
