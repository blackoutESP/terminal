import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Terminal } from 'xterm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'web terminal';
  cmd = [];
  constructor() { }

  ngOnInit(): void {
    let terminal = new Terminal({
      rows: 24,
      cols: 65,
      cursorBlink: true,
      cursorStyle: "bar"
    });
    terminal.open(document.querySelector('#terminal'));
    terminal.onKey((key) => {
      console.log(key);
      if (key.domEvent.code === 'Backspace') {
        this.cmd.slice(0, -1);
      }
      if (key.domEvent.code === 'Enter') {
        terminal.writeln('');
        terminal.clear();
      }else {
        this.cmd.push(key.key);
        terminal.write(key.key);
      }
    });
    terminal.onLineFeed(() => {
      const input = JSON.stringify({ cmd: this.cmd.join('') });
    });
  }
}
