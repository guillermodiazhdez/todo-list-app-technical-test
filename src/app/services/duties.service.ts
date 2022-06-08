import { Duty } from '../models/duty.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class DutiesService {
  private duties: Duty[] = [];
  private dutiesUpdated = new Subject<Duty[]>();

  constructor(private httpClient: HttpClient) {}

  /* Return a new array with old and new duties objects */
  getDuties() {
    this.httpClient
      // any as id is wrong, it is actually _id and would not match with the interface
      .get<{ message: string; duties: any }>('http://localhost:3000/api/duties')
      .pipe(
        map((dutyData) => {
          return dutyData.duties.map((duty: { _id: string; name: string }) => {
            return {
              id: duty._id,
              name: duty.name,
            };
          });
        })
      )
      // result of map transformation
      .subscribe((transformedDuty) => {
        this.duties = transformedDuty;
        // notify rest of app about this update
        this.dutiesUpdated.next([...this.duties]);
      });
  }

  getDutyUpdateListener() {
    return this.dutiesUpdated.asObservable();
  }

  addDuty(duty: Duty) {
    this.httpClient
      .post<{ message: string }>('http://localhost:3000/api/duties', duty)
      .subscribe((response) => {
        console.log(response);
        // when server side responds is ok
        this.duties.push(duty);
        // copy of duties after updated them and notify it
        this.dutiesUpdated.next([...this.duties]);
      });
  }
}
