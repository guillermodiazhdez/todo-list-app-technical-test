import { Duty } from '../models/duty.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class DutiesService {
  private duties: Duty[] = [];
  private dutiesUpdated = new Subject<Duty[]>();

  constructor(private httpClient: HttpClient) {}

  /* Return a new array with old and new duties objects */
  getDuties() {
    this.httpClient
      .get<{ message: string; duties: Duty[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((response) => {
        this.duties = response.duties;
      });
  }

  getDutyUpdateListener() {
    return this.dutiesUpdated.asObservable();
  }

  addDuty(duty: Duty) {
    this.duties.push(duty);
    // copy of duties after updated them and notify it
    this.dutiesUpdated.next([...this.duties]);
  }
}
