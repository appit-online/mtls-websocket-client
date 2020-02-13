import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PncComponent} from './pnc.component';
import {RouterModule, Routes} from '@angular/router';
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule,
  NbToggleModule, NbUserModule
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {AceEditorModule} from 'ng2-ace-editor';

const routes: Routes = [
  {
    path: '',
    component: PncComponent,
  }
];

@NgModule({
  declarations: [PncComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbToggleModule,
    NbInputModule,
    NbActionsModule,
    NbSearchModule,
    NbListModule,
    NbUserModule,
    FormsModule,
    AceEditorModule,
    NbSelectModule,
    NbStepperModule,
    NbAccordionModule,
    NbTabsetModule,
  ]
})
export class PncModule {}
