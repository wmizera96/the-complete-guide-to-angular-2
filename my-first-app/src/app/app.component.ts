import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    `
      h3 {
        color: dodgerblue;
      }
    `,
  ],
})
export class AppComponent {
  username = '';
  showSecret = false;
  log: Date[] = [];

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    this.log.push(new Date());
  }
  onReset() {
    this.username = '';
  }
}
