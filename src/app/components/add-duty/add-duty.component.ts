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
  newDuty: Duty = { id: '', name: '' };
  public constructor(private dutiesService: DutiesService) {}

  addDutyForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.addDutyForm.value.id && this.addDutyForm.value.name) {
      this.newDuty = {
        id: this.addDutyForm.value.id,
        name: this.addDutyForm.value.name,
      };
      this.dutiesService.addDuty(this.newDuty);
      this.addDutyForm.reset();
    }
  }
}
