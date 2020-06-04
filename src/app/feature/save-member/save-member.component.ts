import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-save-member',
  templateUrl: './save-member.component.html',
  styleUrls: ['./save-member.component.css']
})
export class SaveMemberComponent implements OnInit {

	memberForm: FormGroup;
  title: string = 'Add Member';
	isSubmitted: boolean = false;
	formResponseMessage: string = '';
	formResponseStatus: boolean;
	dob: string = '';
	memberId: string;

  constructor(
  	private memberService: MemberService,
  	private route: ActivatedRoute,
  	private datePipe: DatePipe
  	) {
  	this.memberForm = new FormGroup({
  		'id': new FormControl(null),
  		'firstname': new FormControl(null,[
  				Validators.required,
  				Validators.minLength(3),
  				Validators.maxLength(20),
  				Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')
  			]),
  		'lastname': new FormControl(null,[Validators.required]),
  		'mobile': new FormControl(null,[
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$"),
        ]),
  		'email': new FormControl(null,[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        ]),
  		'dob': new FormControl(null,[Validators.required]),
  		'address': new FormControl(null,[
          Validators.required,
          Validators.maxLength(50),
         ]),
  	});
  }

  ngOnInit() {
  	this.memberId = this.route.snapshot.paramMap.get('memberId');
  	if(this.memberId) {
      this.title = 'Edit Member';
      this.memberForm.get('email').disable();
      this.fetchMember();
    }
  }

  fetchMember(){
  	this.memberService
  			.fetchMember(this.memberId)
  			.subscribe((res: any) => {
  				console.log(res);
  				this.dob = this.datePipe.transform(new Date(res.dob), 'yyyy-MM-dd');

  				this.memberForm.patchValue({'firstname' : res.firstname});
  				this.memberForm.patchValue({'lastname' : res.lastname});
  				this.memberForm.patchValue({'mobile' : res.mobile});
  				this.memberForm.patchValue({'email' : res.email});
  				this.memberForm.patchValue({'address' : res.address});
  				this.memberForm.patchValue({'id' : res.id});
  			},
  			(err: any) => {
  				console.log(err);
  				this.formResponseMessage = err.error.message || 'Unable To Process Request, Try Again Later';
  				this.formResponseStatus = false;
  				setTimeout(() => {
  					this.isSubmitted = false;
  					this.formResponseMessage = '';
  					this.formResponseStatus = null;
  				},3000);
  			})
  }

  saveMember(){
  	this.isSubmitted = true;
  	if(this.memberForm.valid){
  		this.memberService
  			.saveMember(this.memberForm.value)
  			.subscribe((res: any) => {
  				console.log(res);
  				this.formResponseMessage = 'Details Saved';
  				this.formResponseStatus = res.status;
  				setTimeout(() => {
  					this.isSubmitted = false;
  					this.formResponseMessage = '';
  					this.formResponseStatus = null;
  					this.memberForm.reset();
  				},3000);
  			},
  			(err: any) => {
  				console.log(err);
  				this.formResponseMessage = err.error.message || 'Unable To Process Request, Try Again Later';
  				this.formResponseStatus = false;
  				setTimeout(() => {
  					this.isSubmitted = false;
  					this.formResponseMessage = '';
  					this.formResponseStatus = null;
  				},3000);
  			});
  	} else {
  		this.validateAllFormFields(this.memberForm);
  	}
  }

  validateAllFormFields(formGroup: FormGroup) {         
	  Object.keys(formGroup.controls).forEach(field => {  
	    const control = formGroup.get(field);             
	    if (control instanceof FormControl) {             
	      control.markAsTouched({ onlySelf: true });
	    } else if (control instanceof FormGroup) {        
	      this.validateAllFormFields(control);            
	    }
	  });
	}

	changeInput(event){
		if(this.memberForm.get('firstname').value == this.memberForm.get('lastname').value){
				this.memberForm.get('firstname').setErrors({ samename: true });
				this.memberForm.get('lastname').setErrors({ samename: true });
		} else {
			this.memberForm.get('firstname').setErrors({ samename: false });
			this.memberForm.get('lastname').setErrors({ samename: false });
		}
	}

  validateMobile(event){
    let value = this.memberForm.get('mobile').value;
    if(value){
      let firstChar = String(value).substr(0,1);
      if(firstChar != '7' && firstChar != '8' && firstChar != '9')
        this.memberForm.get('mobile').setErrors({ custom : true });
    }
  }

}
