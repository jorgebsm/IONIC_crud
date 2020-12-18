import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {

  post: Post = {
    title: '',
    description: ''
  }
  editing: boolean = false;
  params: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private actiavtedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.params = this.actiavtedRoute.snapshot.params;
    if ( this.params.id ) {
      this.editing = true;
      this.getPost();
    }
  }

  getPost() {
    this.postService.getPostById( this.params.id ).subscribe(
      res => {
        this.post = res
      },
      err => console.error(err)
    );
  }

  savePost() {
    this.postService.createPost( this.post.title, this.post.description ).subscribe(
      res => {
        this.router.navigate(['/posts']);
      }
    );    
  }

  updatePost() {
    this.postService.updatePost( this.post.id, this.post ).subscribe(
      res => {
        this.router.navigate(['/posts']);
      }
    );
    
  }

}
