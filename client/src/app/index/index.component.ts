import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetails } from '../shared/userdetails';
import { baseURL } from '../shared/baseurl';

import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
  
  @ViewChild('lform') loginFormDirective;
  @ViewChild('rform') registerFormDirective;

  loginformErrors = {
    'mobnum': 0,
    'password': '',
  };

  registerformErrors = {
    'fullname': '', 
    'mobnum': 0,
    'email': '', 
    'password': '',
    'shopadmin': false,
    'address': '',
    'landmark': '',
    'city': '',
    'state': '',
    'shopname': '',
  }

  validationMessages = {
    'fullname': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 6 characters long.',
      'maxlength':     'Name cannot be more than 30 characters long.'
    },
    'mobnum': {
      'required':      'Mobile number is required.',
      'pattern':       'Mobile number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must have atleast a number, a lowercase letter, an uppercase letter and one special symbol',
      'minlength':     'Password must be at least 8 characters long.'
    },
    'address': {
      'required':      'Address is required.',
    },
    'landmark': {
      'required':      'Landmark is required.',
    },
    'city': {
      'required':      'City is required.',
    },
    'state': {
      'required':      'State is required.',
    },
    'shopname': {
      'required':      'Shop Name is required.',
    },
  };

  loginForm: FormGroup;
  registerForm: FormGroup;
  user: UserDetails;
  errMess: string;
  show_more_form = false;
  form_title = "Register As A Customer";
  
  constructor(private fb: FormBuilder, @Inject('baseURL') private baseURL) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  ngOnInit(): void {
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      mobnum: ['', [Validators.required, Validators.pattern] ],
      password: ['', [Validators.required] ],
    });
    this.loginForm.valueChanges
    .subscribe(data => this.onloginValueChanged(data));

    this.onloginValueChanged();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)] ],
      mobnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [
        Validators.required,     
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
        Validators.minLength(8)
        ] 
      ],
      shopadmin: [false],
      address: [''],
      landmark: [''],
      city: [''],
      state: [''],
      shopname: [''],
      latitude: [0, [Validators.required]],
      longitude: [0, [Validators.required]]
      // address: ['', [Validators.required]],
      // landmark: ['', [Validators.required]],
      // city: ['', [Validators.required]],
      // state: ['', [Validators.required]],
      // shopname: ['', [Validators.required]],
    });
    this.registerForm.valueChanges
    .subscribe(data => this.onregisterValueChanged(data));

    this.onregisterValueChanged();
  }

  cross() {
    this.loginFormDirective.resetForm();
    this.registerFormDirective.resetForm();
  }

  loginSubmit() {
    this.user = this.loginForm.value;
    console.log(this.loginForm);
    this.loginForm.reset();
    this.loginForm.reset({
      fullname: '',
      mobnum: 0,
      email: '',
      message: ''
    });
    this.loginFormDirective.resetForm();
  }

  registerSubmit() {
    this.user = this.registerForm.value;
    console.log(this.user);
    this.registerForm.reset();
    this.registerForm.reset({
      fullname: '',
      mobnum: 0,
      email: '',
      password: '',
      shopadmin: false
    });
    this.registerFormDirective.resetForm();
  }

  
  onloginValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.loginformErrors) {
      if (this.loginformErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.loginformErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.loginformErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onregisterValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.registerformErrors) {
      if (this.registerformErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.registerformErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.registerformErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  toggleformview(){
    this.show_more_form = !this.show_more_form;
    if (!this.show_more_form){
        this.form_title = "Register As A Customer";
    }
    else{
        this.form_title = "Register As A Seller";
    }
  }
}
