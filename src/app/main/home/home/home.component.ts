import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

loadPosts() {
  this.postService.getAllPosts().subscribe({
    next: (res) => {
      console.log('API Response:', res);
      this.posts = res.posts; 
    },
    error: (err) => {
      console.error('Error loading posts:', err);
    }
  });
}


}
