import { ThisReceiver } from '@angular/compiler';
import { OnDestroy } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Duty } from 'src/app/models/duty.model';
import { DutiesService } from 'src/app/services/duties.service';

@Component({
  selector: 'duties-list',
  templateUrl: './duties-list.component.html',
  styleUrls: ['./duties-list.component.scss'],
})
export class DutiesListComponent implements OnInit, OnDestroy {
  public duties: Duty[] = [];
  public dutyName: string;
  public dutyId: string;

  public toggleButton: boolean = true;

  public dutiesSub: Subscription = new Subscription();

  public constructor(private dutiesService: DutiesService) {}

  public ngOnInit() {
    this.dutiesService.getDuties();
    this.dutiesSub = this.dutiesService
      .getDutyUpdateListener()
      .subscribe((duties: Duty[]) => {
        this.duties = duties;
      });
  }

  public onDelete(dutyId: string) {
    this.dutiesService.deleteDuty(dutyId);
  }

  public onEdit(dutyId: string) {
    this.dutyId = dutyId;
    this.dutyName = this.duties.find((duty) => duty.id === dutyId)?.name;
    this.toggleButton = false;
  }

  public updateDuty() {
    this.dutiesService.updateDuty(this.dutyId, this.dutyName);
    this.dutyName = null;
    this.toggleButton = true;
  }

  public ngOnDestroy(): void {
    this.dutiesSub.unsubscribe();
  }
}
