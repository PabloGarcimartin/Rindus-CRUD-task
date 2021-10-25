import { Component, Type, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/interfaces/post';
import { JsonplaceholderService } from 'src/app/services/jsonplaceholder.service';


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DeletePostComponent } from 'src/app/components/home/modals/delete-post/delete-post.component';
import { EditPostComponent } from 'src/app/components/home/modals/edit-post/edit-post.component';
import { CreatePostComponent } from 'src/app/components/home/modals/create-post/create-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  posts: Post[] = [];
  faEdit = faEdit;
  faDelete = faTrash;
  postId: number = 0;
  closeResult: string = '';

  constructor(private jsonplaceholderService: JsonplaceholderService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td > button[name="edit-post"]', row).off('click');
        $('td > button[name="edit-post"]', row).on('click', () => {
          self.editPost(data);
        });
        $('td > button[name="delete-post"]', row).off('click');
        $('td > button[name="delete-post"]', row).on('click', () => {
          self.deletePost(data);
        });
        return row;
      }
    };
    this.jsonplaceholderService.getAll()
      .subscribe(data => {
        this.posts = (data as any);
        this.dtTrigger.next();
      });
  }

  createPost() {
    const modalRef = this.modalService.open(CreatePostComponent);
  }

  editPost(data:any) {
    const modalRef = this.modalService.open(EditPostComponent, { size: 'xl' });
    modalRef.componentInstance.postData = data;
  }

  deletePost(data:any) {
    const modalRef = this.modalService.open(DeletePostComponent);
    modalRef.componentInstance.postId = data[0];
    modalRef.componentInstance.postTitle = data[2];
  }

}
