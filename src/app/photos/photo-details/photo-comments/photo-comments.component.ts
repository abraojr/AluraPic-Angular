import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {


  @Input() photoId: number;
  commentForm: FormGroup;
  comments$: Observable<PhotoComment[]>;

  constructor(private photoService: PhotoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.fb.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;
    this.photoService
      .addComments(this.photoId, comment)
      .subscribe({
        next: () => {
          this.commentForm.reset();
          alert('Comment added successfully');
        }
      });
  }
}
