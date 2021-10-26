import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonplaceholderService } from 'src/app/services/jsonplaceholder.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html'
})
export class DeletePostComponent implements OnInit {
  @Input() postId: number;
  @Input() postTitle: string;
  responseCode: number = 0;

  constructor(public activeModal: NgbActiveModal, public jsonplaceholderService: JsonplaceholderService) {
  }

  ngOnInit(): void {
  }

  deletePost(postId: number){
    this.jsonplaceholderService.delete( postId ).subscribe( response => {

      console.log(response);
      this.responseCode = Number(response.status.toString()[0]);

      if( this.responseCode === 2 ){
        console.log('Eliminado con éxito!');
      } else {
        console.log('Error al eliminar el post');
      }
      setTimeout( () => {
        this.activeModal.close();
      }, 2000 );
    });
  }
}
