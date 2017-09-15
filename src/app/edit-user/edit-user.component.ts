import { Component, OnInit, ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import { ApiService } from '../core/services';
import { User } from './../shared/user.modal';
import { Resource } from './../shared/resource.modal';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent{

  user: User = new User();
  isLoading = false;
  isSubmitting = false;
  isEditMode = false;
  tempPass = '*********';
  roles = [];
  isWarning = false;
  resultMessage: string;
  validationError: string[];
  resource: Resource = <Resource>{};
  resourceId: string;

  // properties for image upload
  public file_srcs = 'assets/img/avatars/noavatar.png';
  public debug_size_before: string;
  public debug_size_after: string;
  profile_img;
  imageName = '';



  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MdSnackBar,
    private changeDetectorRef: ChangeDetectorRef) {

    this.loadRoles();
    this.route.params.subscribe(params => {
      const routeId = params['id'];
      if (routeId) {
        this.isEditMode = true;
        this.loadUser(routeId);
      }
    });
  }

  validateEmail(email) {
    const apiParam = {
      queryParams: {
        'email': email
      }
    };
    this.api.request('VALIDATE_EMAIL', apiParam)
      .subscribe(response => {
        this.isWarning = true;
        this.resultMessage = response.errors.message;
      });
  }

  onSubmit(form) {
    if (this.isEditMode) {
      this.onUpdateUser(form);
    } else {
      this.onCreateUser(form);
    }
  }

  private onCreateUser(form) {
    if (!form.valid) {
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.snackbar.open('Password not macthed.....', '', { duration: 1000 });
      return;
    }
    if (this.file_srcs === 'assets/img/avatars/noavatar.png') {
      this.createUser();
    } else {
      const apiParamImage = {
        data: {
          'data': this.file_srcs,
          'name': this.imageName,
          'type': 'jpeg'
        }
      };

      this.api.request('ADD_RESOURCE', apiParamImage)
        .subscribe(response => {
          if (response.resource.id) {
            this.user.resourceId = response.resource.id;
            this.createUser();
          }
        });

    }
  }

  private createUser() {
    this.isLoading = this.isSubmitting = true;
    const apiParam = { 'data': this.user };
    this.api.request('ADD_USER', apiParam)
      .subscribe(response => {
        this.isLoading = this.isSubmitting = false;

        if (response) {
          this.snackbar.open('User created successfully...!', '', {
            duration: 1000
          });

          this.router.navigate(['users-list']);
        }
      }, errors => {
        this.isWarning = true;
        if (errors.validationErrors) {
          this.validationError = errors.validationErrors;
          this.isLoading = this.isSubmitting = false;
        } else {
          this.resultMessage = errors.errors.message;
          // this.snackbar.open(errors.errors.message, '', { duration: 1000 });
          this.isLoading = this.isSubmitting = false;
        }
      });
  }

  onUpdateUser(form) {
    if (!form.valid) {
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.snackbar.open('Password not macthed.....', '', { duration: 1000 });
      return;
    }

    this.isLoading = this.isSubmitting = true;

    if (this.user.password === this.tempPass && this.user.confirmPassword === this.tempPass) {
      delete this.user.password;
      delete this.user.confirmPassword;
    }

    let url = '';
    let apiParamImage = {
      data: {
        'data': this.file_srcs,
        'name': this.imageName,
        'type': 'jpeg'
      }
    };

    if (this.file_srcs !== 'assets/img/avatars/noavatar.png' && this.file_srcs !== this.resource.data) {
      if (this.user.resourceId && this.file_srcs !== this.resource.data) {
        url = 'UPDATE_RESOURCE';
        apiParamImage['pathParams'] = { 'RESOURCESID': this.resource['id'] };
      } else if (!this.user.resourceId && this.file_srcs) {
        url = 'ADD_RESOURCE';
      }

      this.api.request(url, apiParamImage)
        .subscribe(response => {
          if (response.resource.id) {
            this.user.resourceId = response.resource.id;
            this.resource = <Resource> response.resource;
            this.updateUser();
          }
        });
    } else { this.updateUser(); }

  }

  private updateUser() {
    const apiParam = {
      'data': this.user,
      'pathParams': { 'USERID': this.user.id }
    };
    this.api.request('UPDATE_USER', apiParam)
      .subscribe(response => {
        this.isLoading = this.isSubmitting = false;

        if (response) {
          this.snackbar.open('User updated successfully...!', '', {
            duration: 1000
          });
        }
        this.router.navigate(['users-list']);
      }, errors => {
        if (errors.validationErrors) {
          this.isWarning = true;
          this.validationError = errors.validationErrors;
          this.isLoading = this.isSubmitting = false;
        } else {
          this.snackbar.open(errors.errors.message, '', { duration: 1000 });
          this.isLoading = false;
        }
      });
  }

  loadRoles(): void {
    this.isLoading = true;
    this.api.request('GET_ALLROLES')
      .subscribe(response => {
        this.isLoading = false;
        this.roles = response.roles;
      }, errors => {
        this.snackbar.open(errors.errors.message, '', { duration: 1000 });
        this.isLoading = false;
      });


  }

  loadUser(userId: string) {
    this.isLoading = true;
    const apiParam = {
      'pathParams': { 'USERID': userId }
    };
    this.api.request('GET_USER', apiParam)
      .subscribe(response => {
        this.isLoading = false;
        this.user = response.user;
        this.user.password = this.tempPass;
        this.user.confirmPassword = this.tempPass;
        this.user.role = response.user.role.id;

      }, errors => {
        this.snackbar.open(errors.errors.message, '', { duration: 1000 });
        this.isLoading = false;
      });

    const apiParamResource = {
      'pathParams': { 'USERID': userId }
    };

    this.api.request('GET_RESOURCE', apiParamResource)
      .subscribe(response => {
        this.file_srcs = response.resource.data;
        this.resource = response.resource;
        this.resourceId = response.resource.id;
        // this.resourceName = response.resource.name;
      });
  }
  //upload image code

  fileChange(input) {

    let reader = new FileReader();
    this.imageName = input.files[0].name;
    this.readFile(input.files[0], reader, (result) => {

      var img = document.createElement("img");

      img.src = result;

      this.resize(img, 250, 250, (resized_jpeg, before, after) => {
        this.debug_size_before = before;
        this.debug_size_after = after;
        this.file_srcs = resized_jpeg;
      });
    });
    this.profile_img = null;
  }

  readFile(file, reader, callback) {

    reader.onload = () => {

      callback(reader.result);

      this.profile_img = reader.result;

      console.log(reader.result);

    };


    reader.readAsDataURL(file);

  }

  readFiles(files, index = 0) {


  }

  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {

    return img.onload = () => {

      var width = img.width;

      var height = img.height;

      // Set the WxH to fit the Max values (but maintain proportions)

      if (width > height) {

        if (width > MAX_WIDTH) {

          height *= MAX_WIDTH / width;

          width = MAX_WIDTH;

        }

      } else {

        if (height > MAX_HEIGHT) {

          width *= MAX_HEIGHT / height;

          height = MAX_HEIGHT;

        }

      }


      // create a canvas object

      var canvas = document.createElement("canvas");


      // Set the canvas to the new calculated dimensions

      canvas.width = width;

      canvas.height = height;

      var ctx = canvas.getContext("2d");


      ctx.drawImage(img, 0, 0, width, height);


      // Get this encoded as a jpeg

      // IMPORTANT: 'jpeg' NOT 'jpg'

      var dataUrl = canvas.toDataURL('image/jpeg');


      // callback with the results

      callback(dataUrl, img.src.length, dataUrl.length);

    };

  }






}
