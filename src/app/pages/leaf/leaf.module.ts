import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeafPageRoutingModule } from './leaf-routing.module';

import { LeafPage } from './leaf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LeafPageRoutingModule
  ],
  declarations: [LeafPage]
})
export class LeafPageModule {}
