import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  posts: any[] = [];

  constructor(private authService: AuthService) {}

ngOnInit() {
  this.authService.getProfile().subscribe((res: any) => {
    console.log('Profile response:', res);
    this.user = res.user;
    this.posts = res.user.posts || []; 
  });
}

}
