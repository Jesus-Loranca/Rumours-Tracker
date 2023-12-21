import { Component } from '@angular/core';
import * as data from '../data/rumour-engines.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
	rumourEngines = Object.keys(data).map(key => data[Number(key)]);
}
