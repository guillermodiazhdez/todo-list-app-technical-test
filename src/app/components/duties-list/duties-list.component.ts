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
  duties: Duty[] = [];
  private dutiesSub: Subscription = new Subscription();

  public constructor(private dutiesService: DutiesService) {}

  public ngOnInit() {
    this.duties = this.dutiesService.getDuties();
    this.dutiesSub = this.dutiesService
      .getDutyUpdateListener()
      .subscribe((duties: Duty[]) => {
        this.duties = duties;
      });
  }

  ngOnDestroy(): void {
    this.dutiesSub.unsubscribe();
  }
}
