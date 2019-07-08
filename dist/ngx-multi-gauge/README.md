## Sample Image



## Install

  1. install***d3***
  ```bash
  npm install d3
  ```
  
  2. install***ngx-multi-gauge***
  ```bash
  npm install ngx-multi-gauge
  ```
 
 
 ## Usage
 
 1. Setting
 ```typescript

  import { NgxMultiGaugeComponent } from "ngx-multi-gauge";

  // In your App's module:
  declarations: [
    NgxMultiGaugeComponent
  ]

```
 
 2. Use
 ```typescript
 // app.html
 <NgxMultiGauge class="chart" [rawData] = "data2"></NgxMultiGauge>
  
```
 ```typescript
 // app.ts
 export class AppComponent {
   data2: Array<any>;
 
   constructor() {
 
     this.data2 = [
      { data_name : 'prePro' , title : '전처리', value : 50 },
      { data_name : 'cantPro', title : '비처리', value : 60 },
      { data_name : 'aftPro' , title : '후처리', value : 80 },
     ];
   }
 }
  
```

 ## Properties
 
 - data_name : Name of the data that you actually use.
 - title     : Name to show on the chart
 - value     : Actual values to be expressed in the chart
 
 ## Further
 
 - Custom Able
   - Color
     - Bar_bg_color
     - Line_color
   - Radius value
   - Angle_max
   - Total_value show/hide
   - Line Width
   - List Margin
   - Center Circle Size
