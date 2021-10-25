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

  constructor(public activeModal: NgbActiveModal, public jsonplaceholderService: JsonplaceholderService) {
  }

  ngOnInit(): void {
  }

  deletePost(postId: number){
    this.jsonplaceholderService.delete( postId ).subscribe( result => {
      console.log('eliminado correctamente');
      console.log(result);
    });
    this.activeModal.close();
  }
}
