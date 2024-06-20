import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  constructor(private readonly spinnerSVc: SpinnerService) { }

  isLoading$ = this.spinnerSVc.isLoading$;

}
