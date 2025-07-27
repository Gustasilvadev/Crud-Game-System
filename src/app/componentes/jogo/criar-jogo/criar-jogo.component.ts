import { JogoService } from './../../../services/jogo.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { JogoStatus } from '../../../enums/jogoStatus.enum';

@Component({
  selector: 'app-criar-jogo',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './criar-jogo.component.html',
  styleUrl: './criar-jogo.component.css'
})
export class CriarJogoComponent implements OnInit {

  form!: FormGroup;

  statusOptions: { id: number, descricao: string }[] = [];

  constructor(public jogoService: JogoService, private router: Router) { }


  ngOnInit(): void {

    // Inicializa o select com os enums
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

    this.jogoService.criarJogo(payload).subscribe((res:any) => {
      console.log('Jogo criado com sucesso!');
      this.router.navigateByUrl('/jogo');
    })
  }
}
