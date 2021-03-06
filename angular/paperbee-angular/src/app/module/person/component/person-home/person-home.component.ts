import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-home',
  templateUrl: './person-home.component.html',
  styleUrls: ['./person-home.component.css']
})

export class PersonHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  onSelectSide(sideLabel){
    if(sideLabel=="个人信息"){
      this.router.navigateByUrl('home/person/personInfo')
    }else if(sideLabel="我的文章"){
      this.router.navigateByUrl('home/person/myArticle')
    }
  }

}
