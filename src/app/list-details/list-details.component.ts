import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit, OnChanges {

  @Input() item: string;
  @Output() newItemEvent = new EventEmitter<string>();
  postDetails: any=[];
  postDetails1: any=[];
  ids: any;
  title: any;
  post: any;

  constructor(private https:HttpClient, private shared: SharedService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    /*this.getList(changes.item.currentValue).subscribe(results=>{
      this.postDetails = results;
      console.log(this.postDetails);
      
    })*/
    this.shared.currentData.subscribe(data => {
      this.postDetails1 = data;
      for(let i=0; i< this.postDetails1.length; i++){
        if( changes.item.currentValue == this.postDetails1[i]['id'] ){
          this.title = this.postDetails1[i]['title'];
          this.ids = this.postDetails1[i]['id'];
          this.post = this.postDetails1[i]['body']
        }
      }
    }); 
  }
  getList(id){
    return this.https.get('https://jsonplaceholder.typicode.com/posts/' + id)
  }
  delRecord(id){
    this.newItemEvent.emit(id);
  }
  
}
