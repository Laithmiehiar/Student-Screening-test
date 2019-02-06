import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-timer',
  template: `
      <h1>Time Passed:
          {{hoursDisplay ? hoursDisplay : '00'}} : {{(minutesDisplay) && (minutesDisplay <= 59)
            ? minutesDisplay : '00'}}
            : {{(secondsDisplay) && (secondsDisplay <= 59) ? secondsDisplay : '00'}} <br/>
      </h1>
  `,
  styles: [ `
      h1 {
          color: #57acec;
          margin-top: 24px;
          text-align: center;
      }
  `]
})
export class TimerComponentComponent implements OnInit {

  ticks = 0;

    minutesDisplay = 0;
    hoursDisplay = 0;
    secondsDisplay = 0;

    sub: Subscription;

    ngOnInit() {
        this.startTimer();
    }

    private startTimer() {

        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = t;

                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);
            }
        );
    }

    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
         return this.pad((Math.floor(ticks / 60)) % 60);
    }

    private getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    private pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }

}
