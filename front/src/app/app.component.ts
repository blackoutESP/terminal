import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Terminal } from 'xterm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'web terminal';
  constructor() { }

  ngOnInit(): void {
    let terminal = new Terminal({
      rows: 24,
      cols: 65,
      cursorBlink: true,
      cursorStyle: "bar"
    });
    terminal.open(document.querySelector('#terminal'));
    terminal.onKey((keyboardEvent) => {
      if (keyboardEvent.domEvent.key === 'Enter') {
        // terminal.writeln('\r');
      } else {

      }
    });
  }
}
