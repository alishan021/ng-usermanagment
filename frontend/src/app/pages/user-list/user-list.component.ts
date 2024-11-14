import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { JSONResult, User } from '../../interfaces/interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  private userService: UserService = inject(UserService);

  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.onGetAllUsers().subscribe((res: JSONResult) => {
      if(res.result) {
        this.users = res.data;
      }
    })
  }

  onClickDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete this user ?");
    if(isDelete) {
      this.userService.onDeleteUser(id).subscribe((res: JSONResult) => {
        alert(res.msg);
        if(res.result) {
          this.loadUsers();
        }
      })
    }
  }

  onEditUserClick(id: number) { 
    this.userService.userId = id;
  }

}
