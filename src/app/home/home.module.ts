import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSearchModule,
  NbToggleModule, NbUserModule
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {AceEditorModule} from 'ng2-ace-editor';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [HomeComponent],
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
  ]
})
export class HomeModule {}
