import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css']
})
export class ListMembersComponent implements OnInit {

  members: Array<any>;
	membersRef: Array<any>;
	memberId: string;
	responseMessage:string = '';
	responseStatus:boolean;
	closeResult: string = '';
  sort: number = 1;
  constructor(
  	private memberService: MemberService,
  	private datePipe: DatePipe,
  	private modalService: NgbModal
  	) { }

  ngOnInit() {
  	this.fetchMembers();
  }

  fetchMembers(){
  	this.memberService
  		.fetchMembers()
  		.subscribe((res: any) => {
  			this.members = res;
  			this.members.forEach((member,i) => {
  				this.members[i].dob = this.datePipe.transform(member.dob, 'dd-MM-yyyy');
  			});
        this.membersRef = this.members;
  		},
  		(err: any) => {
  			console.log(err);
  			this.members = [];
  		})
  }

  deleteMember(){
  	this.memberService
  		.deleteMember(this.memberId)
  		.subscribe((res: any) => {
  			console.log(res);
  			this.fetchMembers();
  			this.responseMessage = 'Deleted successfully';
				this.responseStatus = true;
  			setTimeout(() => {
  				this.responseMessage = '';
  				this.responseStatus = null;
  				this.modalService.dismissAll();
  			},3000);
  		},
  		(err: any) => {
  			console.log(err);
  			this.responseMessage = 'Unable to deleted, try again later';
				this.responseStatus = false;
  		})
  }

  confirmDelete(deleteModal,memberId){
  	this.memberId = memberId;
  	this.open(deleteModal);
  }

   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
	
  sortColumn(columnName){
    this.sort = -this.sort;
    this.members = this.members
    .sort((member1,member2) => {
      return member1[columnName] > member2[columnName] ? this.sort : -this.sort;
    });
  }

  searchMember(event){
    if(event.target.value.length){
      let { value } = event.target;
      value = String(value).toLowerCase();

      this.members = this.membersRef
        .filter((member,i) => {
          let isMatched = false;
          for(let key in member){
            let data = String(member[key]).toLowerCase();
            if(data.includes(value))
              isMatched = true;
          }
          return isMatched;
        });
    } else {
      this.members = this.membersRef;
    }
  }
}
