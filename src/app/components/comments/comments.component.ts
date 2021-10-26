import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { JsonplaceholderService } from 'src/app/services/jsonplaceholder.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  @Input() postId: number;
  comments: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  faEdit = faEdit;
  faDelete = faTrash;
  responseCodeDelete = NaN;
  responseCodeUpdate = NaN;
  responseCodeCreated = NaN;

  constructor(
    public jsonplaceholderService: JsonplaceholderService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td > button[name="edit-comment"]', row).off('click');
        $('td > button[name="edit-comment"]', row).on('click', () => {
          self.editComment(data);
        });
        $('td > button[name="delete-comment"]', row).off('click');
        $('td > button[name="delete-comment"]', row).on('click', () => {
          self.deleteComment(data);
        });
        return row;
      }
    };

    this.jsonplaceholderService.getComments(this.postId)
      .subscribe(data => {
        this.comments = (data as any);
        console.log('COMMENTS');
        console.log(this.comments);
        this.dtTrigger.next();
    });
  }

  createComment() {
    let name = '';
    let nameInput = (<HTMLInputElement>document.getElementById("newCommentName"));
    if( nameInput ){
      name = nameInput.value;
    }

    let body = '';
    let bodyInput = (<HTMLInputElement>document.getElementById("newCommentBody"));
    if( bodyInput ){
      body = bodyInput.value;
    }

    let email = '';
    let emailInput = (<HTMLInputElement>document.getElementById("newCommentEmail"));
    if( emailInput ){
      email = emailInput.value;
    }

    let newComment = {
      postId: this.postId,
      name: name,
      email: email,
      body: body,
    }

    this.jsonplaceholderService.createComment( newComment ).subscribe( response => {

      console.log(response);
      this.responseCodeCreated = Number(response.status.toString()[0]);

      if( this.responseCodeCreated === 2 ){
        console.log('Creado con éxito!');
        this.comments.push(response.body);
      } else {
        console.log('Error al crear el post');
      }
    });

  }

  editComment( data: any ) {
    let commentId = data[0];
    let name = '';
    let nameInput = (<HTMLInputElement>document.getElementById("commentName_"+commentId));
    if( nameInput ){
      name = nameInput.value;
    }

    let body = '';
    let bodyInput = (<HTMLInputElement>document.getElementById("commentBody_"+commentId));
    if( bodyInput ){
      body = bodyInput.value;
    }

    let editedComment = {
      postId: this.postId,
      id: commentId,
      name: name,
      email: data[1],
      body: body,
    }

    this.jsonplaceholderService.updateComment( commentId, editedComment ).subscribe( response => {
      this.responseCodeUpdate = Number(response.status.toString()[0]);

      if( this.responseCodeUpdate === 2 ){
        console.log('Editado con éxito!');
      } else {
        console.log('Error al editar el commentario');
      }
    });
  }

  deleteComment( data: any ) {
    let commentId = data[0];
    this.jsonplaceholderService.deleteComment( commentId ).subscribe( response => {
      this.responseCodeDelete = Number(response.status.toString()[0]);

      if( this.responseCodeDelete === 2 ){
        console.log('Eliminado con éxito!');
        var removeIndex = this.comments.findIndex(x => x.id === Number(commentId));
        ~removeIndex && this.comments.splice(removeIndex, 1);
      } else {
        console.log('Error al eliminar el commentario');
      }
    });
  }

}
