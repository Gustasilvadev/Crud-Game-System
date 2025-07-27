import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Premio } from '../../../interfaces/premio';
import { PremioService } from '../../../services/premio.service';
import { PremioStatus } from '../../../enums/premioStatus.enum';
import { PremioCategoria } from '../../../enums/premioCategoria.enum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-atualizarPremio',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './atualizar-premio.component.html',
  styleUrls: ['./atualizar-premio.component.css']
})
export class AtualizarPremioComponent implements OnInit {
  idPremio!: number;
  premio!: Premio;
  form!: FormGroup;

  categoriaOptions: { id: number, descricao: string }[] = [];
  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public premioService: PremioService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.categoriaOptions = Object.keys(PremioCategoria)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PremioCategoria[key as keyof typeof PremioCategoria],
        descricao: key
    }));

    this.statusOptions = Object.keys(PremioStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        id: PremioStatus[key as keyof typeof PremioStatus],
        descricao: key
    }));

    this.form = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      ordemPremiacao: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });

    this.idPremio = this.route.snapshot.params['id'];

    forkJoin({
      premio: this.premioService.buscarPremio(this.idPremio),
      }).subscribe({
        next: ({ premio}) => {
          this.premio = premio;

          this.form.patchValue({
            descricao: premio.descricao,
            ordemPremiacao: premio.ordemPremiacao,
            categoria:premio.categoria,
            status: premio.status,
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
      categoria: Number(formValue.categoria),
      status: Number(formValue.status)
    };
    console.log(payload);

    this.premioService.atualizarPremio(this.idPremio, payload).subscribe((res:any) => {
      console.log('Premio atualizado com sucesso!');
      this.router.navigateByUrl('/premio');
    })
  }
}
