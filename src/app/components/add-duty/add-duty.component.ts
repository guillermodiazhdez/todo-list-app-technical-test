import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Duty } from 'src/app/models/duty.model';
import { DutiesService } from 'src/app/services/duties.service';

@Component({
  selector: 'add-duty',
  templateUrl: './add-duty.component.html',
  styleUrls: ['./add-duty.component.scss'],
})
export class AddDutyComponent {
  public constructor(private dutiesService: DutiesService) {}

  public addDutyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  public onSubmit() {
    if (this.addDutyForm.value.name) {
      const newDuty: Duty = {
        id: '',
        name: this.addDutyForm.value.name,
      };
      this.dutiesService.addDuty(newDuty);
      this.addDutyForm.reset();
    }
  }
}
