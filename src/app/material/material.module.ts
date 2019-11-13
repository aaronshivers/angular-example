import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';

const MaterialComponents = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatPaginatorModule
];

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ],
})
export class MaterialModule {
}
