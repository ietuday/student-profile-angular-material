import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../core/services';
import { User } from './../shared/user.modal';
import { MdDialogRef, MdDialog, MdSnackBar } from '@angular/material';
import { MdPaginatorModule } from '@angular/material';

declare const ResizeSensor;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Pagination

  pageSizeOptions = [5, 10, 15, 20, 25, 30];
  totalCount: number;

  users: User[] = new Array<User>();
  isLoading = false;
  dialogRef: MdDialogRef<DeleteUserComponent>;

  // Pagination
  private limit = 10;
  private offset = 0;


  @ViewChild('tbody')
  tbody: ElementRef;

  cellWidths = Array(6).fill(200);
  tableHover = true;
  tableStriped = true;
  tableCondensed = true;
  tableBordered = true;

  constructor(
    private api: ApiService,
    private dialog: MdDialog,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.isLoading = true;
    const apiParam = {
      'queryParams': {
        'limit': this.limit,
        'offset': this.offset
      }
    };

    this.api.request('GET_ALLUSERS', apiParam)
      .subscribe(response => {
        this.isLoading = false;
        this.users = response.users;
        console.log("Inside loadUsers",this.users);
        this.totalCount = response.usersCount;
        console.log("Total Count",this.totalCount);
        // setTimeout(() => this.resize(), 10);
      });
  }

  onPageChange(pageNo) {
    this.limit = pageNo.pageSize;
    if (pageNo.pageIndex !== 0) {
      this.offset = (pageNo.pageIndex) * pageNo.pageSize;
      this.loadUsers();
      return;
    }
    this.offset = 0;
    this.loadUsers();

  }
  private resize() {

    const cells = this.tbody.nativeElement.children[0].children;
    this.cellWidths = [];

    for (const cell of cells) {
      this.cellWidths.push(cell.offsetWidth);
    }

    const resizeSensor = new ResizeSensor(this.tbody.nativeElement, () => {
      this.cellWidths.length = 0;
      if (this.tbody.nativeElement.children[0]) {
        for (const cell of cells) {
          this.cellWidths.push(cell.offsetWidth);
        }
      }
    });
  }

  openDialog(user: User): void {

    this.dialogRef = this.dialog.open(DeleteUserComponent, {
      disableClose: true,
      height: '200px',
      width: '400px',
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (result === 'Delete!') {
        const apiParam = { 'pathParams': { 'USERID': user.id } };
        this.deleteUser(apiParam);
      }
    });
  }

  private deleteUser(user): void {
    this.isLoading = true;

    this.api.request('DELETE_USER', user)
    .subscribe(response => {
      if (response) {
        this.snackbar.open('User deleted successfully...!', '', {
          duration: 1000
        });
      }
      this.isLoading = false;
      this.loadUsers();
    });
  }

}

@Component({
  selector: 'ms-delete-user-dialog',
  template: `
  <h2 >Delete User</h2>
  <md-dialog-content>
  Would you like to delete this User?
  <br><br>
  </md-dialog-content>
  <md-dialog-actions align="end">
    <button md-raised-button color="accent" (click)="dialogRef.close('Delete!')">Delete</button>
    <button md-button (click)="dialogRef.close('Cancel!')">Cancel</button>
  </md-dialog-actions>
  `
})
export class DeleteUserComponent {
  constructor(public dialogRef: MdDialogRef<DeleteUserComponent>) { }
}
