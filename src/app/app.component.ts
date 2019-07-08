import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data2: Array<any>;
  data3: Array<any>;

  constructor() {

    this.data2 = [
      { data_name : 'prePro' , title : '전처리', value : 50 },
      { data_name : 'cantPro', title : '비처리', value : 60 },
      { data_name : 'aftPro' , title : '후처리', value : 80 },
    ];

    this.data3 = [
      { data_name : 'prePro' , title : '전처리', value : 50 },
      { data_name : 'cantPro', title : '비처리', value : 60 },
      { data_name : 'aftPro' , title : '후처리', value : 80 },
      { data_name : 'aftPro2', title : '알고리즘', value : 100 },
    ];

  }
}
