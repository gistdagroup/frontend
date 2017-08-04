import { User } from './user';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users = [];
  selectedUser = null;
  errorMessage: string = '';
  successMessage: string = '';
  isAdd: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.list().subscribe(users => this.users = users);
  }

  onAdd() {
    this.isAdd = true;
    this.selectedUser = new User();
  }

  onCreated(user) {
    this.userService.add(user)
      .map(res => res.json())
      .subscribe(dev => {
        this.successMessage = "Create user Completed";
        this.users.push(dev);
        this.isAdd = false;
        this.selectedUser = null;
      });
  }

  onDelete(user: User) {
    if (confirm('Confirm to delete this user?')) {
      this.userService.delete(user).subscribe(() => {
        this.successMessage = "Delete user completed";
        this.users = this.users.filter(x => x != user);
      });
    }
  }

}
