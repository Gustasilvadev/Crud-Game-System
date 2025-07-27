import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Inscricao } from '../../../interfaces/inscricao';
import { InscricaoService } from '../../../services/inscricao.service';
import { InscricaoStatus } from '../../../enums/inscricaoStatus.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-atualizar-inscricao',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './atualizar-inscricao.component.html',
  styleUrl: './atualizar-inscricao.component.css'
})
export class AtualizarInscricaoComponent implements OnInit {

  idInscricao!: number;
  inscricao!: Inscricao;
  form!: FormGroup;
  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public inscricaoService: InscricaoService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

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

    this.idInscricao = this.route.snapshot.params['id'];

    forkJoin({
      inscricao: this.inscricaoService.buscarInscricao(this.idInscricao),
    }).subscribe({
      next: ({ inscricao}) => {
        this.inscricao = inscricao;

        this.form.patchValue({
          data: inscricao.data,
          status: inscricao.status,
          participanteId: inscricao.participanteId,
          jogoId: inscricao.jogoId
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

    this.inscricaoService.atualizarInscricao(this.idInscricao, payload).subscribe((res:any) => {
      console.log('Inscrição atualizada com sucesso!');
      this.router.navigateByUrl('/inscricao');
    })
  }
}
