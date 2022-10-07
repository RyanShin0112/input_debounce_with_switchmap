import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, Subject } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public queryString = '';
  public output = 'Input query';
  private querySubject = new Subject<string>();

  public constructor(public appService: AppService) {}

  ngOnInit(): void {
    this.querySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          console.log('input:', value);
          return this.appService.getValue(value);
        })
      )
      .subscribe((query: string) => {
        console.log('result output:', query);
        this.output = query;
      });
  }

  public acceptEvent(filterValue: string) {
    this.querySubject.next(filterValue);
  }

  public onKeyEvent(e: KeyboardEvent): void {
    this.acceptEvent(this.queryString);
  }
}
