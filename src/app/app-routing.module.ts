import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDutyComponent } from './components/add-duty/add-duty.component';

import { DutiesListComponent } from './components/duties-list/duties-list.component';

const routes: Routes = [
  { path: '', component: DutiesListComponent },
  { path: 'create', component: AddDutyComponent },
  { path: 'edit/:dutyId', component: AddDutyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
