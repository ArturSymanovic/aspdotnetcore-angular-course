import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        this.messages = data.messages.result;
        this.pagination = data.messages.pagination;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  loadMessages(): void {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number): void {
    this.alertify.confirm(
      'Are you sure you want to delete this message?',
      () => {
        this.userService
          .deleteMessage(this.authService.decodedToken.nameid, id)
          .subscribe(
            () => {
              this.messages.splice(
                this.messages.findIndex((m) => m.id === id),
                1
              );
              this.alertify.success('Message has been deleted');
              this.loadMessages();
            },
            (error) => {
              this.alertify.error(error);
            }
          );
      }
    );
  }
}
