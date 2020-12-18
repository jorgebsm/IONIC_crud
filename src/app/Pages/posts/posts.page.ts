import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostService } from '../../Services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  
  posts: any = [];

  constructor(
    private postService: PostService,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  ionViewWillEnter() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      res => {
        this.posts = res;
        this.posts.reverse();
      },
      err => console.error(err)
    );
  }

  async deletePost(id) {
    const alert = await this.alertController.create({
      header: 'Eliminar post',
      message: '¿Estás seguro?',
      buttons: [{
        text: 'Sí',
        handler: () => {
          this.removeOk(id); 
        }
      },
      'Cancelar']
    });

    await alert.present();
  }

  removeOk(id) {
    this.postService.deletePost( id ).subscribe(
      res => {
        this.getPosts();
      },
      err => console.error(err)
    );
  }

  redirectUpdate(id) {
    this.router.navigate(['/post/update', id]);
  }

}
