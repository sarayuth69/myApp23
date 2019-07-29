import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CutomermenuPage } from './cutomermenu.page';

const routes: Routes = [
  {
    path: '',
    component: CutomermenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CutomermenuPage]
})
export class CutomermenuPageModule {}
