import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMembersComponent } from './feature/list-members/list-members.component';
import { SaveMemberComponent } from './feature/save-member/save-member.component';

const routes: Routes = [
	{ path: '', component: ListMembersComponent },
	{ path: 'add', component: SaveMemberComponent },
	{ path: 'add/:memberId', component: SaveMemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
