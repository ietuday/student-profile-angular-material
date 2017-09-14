import { Component, OnInit, ViewChild, ElementRef,ViewEncapsulation } from '@angular/core';
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

  filteredUsers:User[] = new Array<User>();
  searchNameText = '';
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
        this.filteredUsers = this.users;
        console.log("Inside loadUsers",this.users);
        this.totalCount = response.usersCount;
        console.log("Total Count",this.totalCount);
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

  onSearchUser(searchQuery: string): void {
    console.log(searchQuery);
    if (searchQuery.length > 0) {
      console.log("Inside If",searchQuery.length)
      this.filteredUsers = this.users.filter(user => user.firstName.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0);
      console.log("After Applying Filter",this.filteredUsers);
    } else {
      console.log("Inside Else",searchQuery.length)
      this.filteredUsers = this.users;
      console.log("Inside Else :filteredUsers ",this.filteredUsers)

    }
  }

  sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
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
