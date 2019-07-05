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
      { title_en : 'prePro' , title_kr : '전처리', value : 50 },
      { title_en : 'cantPro', title_kr : '비처리', value : 60 },
      { title_en : 'aftPro' , title_kr : '후처리', value : 80 },
    ];

    this.data3 = [
      { title_en : 'prePro' , title_kr : '전처리', value : 50 },
      { title_en : 'cantPro', title_kr : '비처리', value : 60 },
      { title_en : 'aftPro' , title_kr : '후처리', value : 80 },
      { title_en : 'aftPro2', title_kr : '알고리즘', value : 100 },
    ];

  }
}
