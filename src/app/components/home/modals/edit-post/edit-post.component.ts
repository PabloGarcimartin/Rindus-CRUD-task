import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonplaceholderService } from 'src/app/services/jsonplaceholder.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html'
})
export class EditPostComponent implements OnInit {
  @Input() postData: any;
  formulario: FormGroup;
  comments: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  responseCode: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    public jsonplaceholderService: JsonplaceholderService,
    private fb: FormBuilder
  ) {}

  crearFormulario(){
    this.formulario = this.fb.group({
      title: [this.postData[2]],
      body : [this.postData[3]]
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.jsonplaceholderService.getComments(this.postData[0])
      .subscribe(data => {
        this.comments = (data as any);
      });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  editPost(){

    let data = {
      id: this.postData[0],
      userId: this.postData[1],
      title: this.formulario.value.title,
      body: this.formulario.value.body,
    }
    this.jsonplaceholderService.update( this.postData[0] , data ).subscribe(  response => {

      console.log(response);
      this.responseCode = Number(response.status.toString()[0]);

      if( this.responseCode === 2 ){
        console.log('Editado con éxito!');
      } else {
        console.log('Error al editar el post');
      }
      setTimeout( () => {
        this.activeModal.close();
      }, 2000 );
    });
  }

}
