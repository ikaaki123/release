import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';






const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatMenuModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule
  
  
  
  
  
];

@NgModule({
  imports: [CommonModule, ...MATERIAL_MODULES],
  declarations: [],
  exports: [...MATERIAL_MODULES]
})
export class MaterialModule { }