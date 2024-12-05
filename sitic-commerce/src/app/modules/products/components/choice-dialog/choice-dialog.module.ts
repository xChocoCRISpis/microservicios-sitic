import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceDialogComponent } from './choice-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChoiceClassModule } from 'src/app/shared/pipes/choice-class/choice-class.module';



@NgModule({
  declarations: [
    ChoiceDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,


    //Pipes
    ChoiceClassModule
  ]
})
export class ChoiceDialogModule { }
