import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private dataSource = new BehaviorSubject<[]>(null); 
  currentData = this.dataSource.asObservable();

 constructor(){} 

 detailsShare(newData: any){
 this.dataSource.next(newData); 
 }
}
