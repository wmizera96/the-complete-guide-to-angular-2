import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 7) {
          observer.complete();
        }

        if (count > 9) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 500);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => !!(data % 2)),
        map((data: number) => 'Round: ' + (data + 1)),
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          console.log('completed');
        }
      );
  }

  ngOnDestroy(): void {
    // not necessary if error or completed
    this.firstObsSubscription.unsubscribe();
  }
}
