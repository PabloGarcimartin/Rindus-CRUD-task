import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonplaceholderService } from 'src/app/services/jsonplaceholder.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit {
  formulario: FormGroup;
  responseCode: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    public jsonplaceholderService: JsonplaceholderService,
    private fb: FormBuilder
  ) { }

  crearFormulario(){
    this.formulario = this.fb.group({
      title: [''],
      body : ['']
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  createPost(){
    let data = {
      userId: 1,   //hardcodeao porque no hay control de usuarios aún
      title: this.formulario.value.title,
      body: this.formulario.value.body,
    }
    this.jsonplaceholderService.create( data ).subscribe( response => {

      console.log(response);
      this.responseCode = Number(response.status.toString()[0]);

      if( this.responseCode === 2 ){
        console.log('Creado con éxito!');
      } else {
        console.log('Error al crear el post');
      }
      setTimeout( () => {
        this.activeModal.close();
      }, 2000 );
    });
  }
}
