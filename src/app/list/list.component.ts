import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  postDetails:any = [];
  postDetails1:any = []
  show: boolean;
  id: any;
  addRecord: FormGroup
  formshow: boolean;
  constructor(private https:HttpClient, private formBuilder:FormBuilder, private shared: SharedService) {
    this.addRecord = this.formBuilder.group({
      title:[''],
      post:[''],
      image1:[''],
      image2:[''],
      image3:['']
    })
  }

  ngOnInit(): void {
    this.getList().subscribe(results=>{
      this.postDetails1 = results;
      this.postDetails = this.postDetails1.slice(0,8)
      this.shared.detailsShare(this.postDetails)
    })
  }
  getList(){
    return this.https.get('https://jsonplaceholder.typicode.com/posts')
  }
  
  sendId(id){
    this.formshow = null;
    this.show = true;
    this.id = id;
  }
  add(){
    this.show = null;
    this.formshow = true;
  }
  delRec(id){
    this.show = null;
    for(let i=0; i< this.postDetails.length; i++){
      if( id == this.postDetails[i]['id'] ){
        this.postDetails.splice(i,1);  
      }
    }
  }
  addNewRec(){
    if(this.addRecord.value.title !== null && this.addRecord.value.title !== "" ){
      this.postDetails.push({
        userId:1,
        id: this.postDetails.length+1,
        title: this.addRecord.value.title,
        body: this.addRecord.value.post,
        image1: this.addRecord.value.image1,
        image2: this.addRecord.value.image2,
        image3: this.addRecord.value.image3,
      })
      this.addRecord.reset();    
    }
  }

}
