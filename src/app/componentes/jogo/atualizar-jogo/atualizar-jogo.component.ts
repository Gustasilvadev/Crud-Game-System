import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Jogo } from '../../../interfaces/jogo';
import { JogoService } from '../../../services/jogo.service';
import { JogoStatus } from '../../../enums/jogoStatus.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-atualizar-jogo',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './atualizar-jogo.component.html',
  styleUrl: './atualizar-jogo.component.css'
})
export class AtualizarJogoComponent implements OnInit {

  idJogo!: number;
  jogo!: Jogo;
  form!: FormGroup;
  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public jogoService: JogoService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.statusOptions = Object.keys(JogoStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: JogoStatus[key as keyof typeof JogoStatus],
        descricao: key
    }));

    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      categoriaId: new FormControl('', [Validators.required])
    });

    this.idJogo = this.route.snapshot.params['id'];

    forkJoin({
      jogo: this.jogoService.buscarJogo(this.idJogo),
    }).subscribe({
      next: ({jogo}) => {
        this.jogo = jogo;

        this.form.patchValue({
          nome: jogo.nome,
          status: jogo.status,
          categoriaId: jogo.categoriaId
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

    this.jogoService.atualizarJogo(this.idJogo, payload).subscribe((res:any) => {
      console.log('Jogo atualizado com sucesso!');
      this.router.navigateByUrl('/jogo');
    })
  }
}
