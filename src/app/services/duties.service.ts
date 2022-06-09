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
      .post<{ message: string; dutyId: string }>(
        'http://localhost:3000/api/duties',
        duty
      )
      .subscribe((response) => {
        const mongoDBDutyId = response.dutyId;
        // update created id from MongoDB to duty in frontend
        duty.id = mongoDBDutyId;
        // once ID is updated in that duty, store the duty
        this.duties.push(duty);
        // copy of duties after updated them and notify it
        this.dutiesUpdated.next([...this.duties]);
      });
  }

  updateDuty(id: string, name: string) {
    const duty: Duty = {
      id: id,
      name: name,
    };
    this.httpClient
      .put('http://localhost:3000/api/duties/' + id, duty)
      .subscribe((response) => console.log(response));
  }

  deleteDuty(dutyId: string) {
    this.httpClient
      .delete('http://localhost:3000/api/duties/' + dutyId)
      .subscribe(() => {
        // keep duties with different id to the one deleted
        const updatedDuties = this.duties.filter((duty) => duty.id !== dutyId);
        this.duties = updatedDuties;
        // notify rest of app about this update by passing a copy of updated duties
        this.dutiesUpdated.next([...this.duties]);
      });
  }
}
