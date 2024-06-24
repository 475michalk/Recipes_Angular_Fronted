import { Component } from '@angular/core';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterModule,NgFor],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  users: string[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getAllUserNames().subscribe(
      names => this.users = names,
      error => console.error('Error fetching user names:', error)
    );
  }

}
