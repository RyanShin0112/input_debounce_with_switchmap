import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }
  
  private genereateRandomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getValue(query: string): Observable<string> {
    return new Observable<string>((observe) => {
      setTimeout(() => {
        observe.next(query);
      }, this.genereateRandomInRange(500, 5000));
    });    
  }    
}
