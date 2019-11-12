import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

const MaterialComponents = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
];

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ],
})
export class MaterialModule {
}
