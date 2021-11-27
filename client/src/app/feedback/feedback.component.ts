import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';

 
@Component({ 
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'fullname': '', 
    'mobnum': 0,
    'email': '',
    'message': ''
  };

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
    'message': {
      'required':      'Feedback is required.',
      'minlength':     'Feedback must be at least 15 characters long.',
    }
  };

  feedbackForm: FormGroup;
  feedback: Feedback;
  errMess: string;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)] ],
      mobnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      message: ['', [Validators.required, Validators.minLength(15)] ]
    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();
    this.feedbackForm.reset({
      fullname: '',
      mobnum: 0,
      email: '',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
