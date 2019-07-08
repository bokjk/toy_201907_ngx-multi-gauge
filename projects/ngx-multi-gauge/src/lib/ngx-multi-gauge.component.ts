import {Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'NgxMultiGauge',
  templateUrl: './ngx-multi-gauge.component.html',
  styleUrls: ['./ngx-multi-gauge.component.styl']
})
export class NgxMultiGaugeComponent implements OnInit {

  @ViewChild('chart1') CHART1: ElementRef<any>;

  constructor() { }

  @Input() rawData = [ { data_name : 'prePro' , title : '전처리', value : 87 }, { data_name : 'cantPro', title : '비처리', value : 91 }];

  sampleDataName = [];
  sampleTitle = [];
  sampleData    = [];
  totalValue    = 0;

  width = 500;
  height = 500;
  bg_color = "#E5E5E5";
  line_color = "#004C90";
  radius = this.height / 2;
  angle_max = 0.75; // 100%의 기준 길이

  list_margin = this.height / 16; // 항목과 항목 사이의 거리
  line_width = this.height / 50;  // 선넓이
  center_circle_size = this.height / 10; // 가운데 구멍 크기


  svg: any;
  pie: any;


  ngOnInit() {

    // 상위 컴포넌트에 input데이터가 있는지 확인
    // console.log(this.rawData);

    // 받은 데이터를 각 부분으로 나누어줌
    this.rawData.map( v => {
      this.sampleDataName.push(v.data_name);
      this.sampleTitle.push(v.title);
      this.sampleData.push(v.value);
    });

    // 종합 데이터
    this.totalValue = 0;
    this.sampleData.map(v => {
      this.totalValue += v;
    });

    const _CHART =  this.CHART1.nativeElement;

    this.svg = d3.select(_CHART)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);


    // ****************************  차트부분  ********************************** //
    const arcs = this.sampleData.map((v, i) => {
      const inner_calc = this.center_circle_size + ( i * this.list_margin + ((i - 1) * this.line_width ) + (this.list_margin + this.line_width) ); // i x 마진 + ( (i-1) x 선넓이 ) + (마진+선넓이)
      const outer_calc = inner_calc + this.line_width;

      return d3.arc()
        .innerRadius( inner_calc )
        .outerRadius( outer_calc )
        .cornerRadius(this.line_width)
        .padAngle(.07)
        .padRadius(100);
    });

    const emptyPieData = this.sampleData.map((v, i) => {
      v = 100;
      return [
        {value: v * this.angle_max        , arc : arcs[i]},   // value
        {value: (100 - v) * this.angle_max, arc : arcs[i]},   // 나머지
        {value: 100 * (1 - this.angle_max), arc : arcs[i]},   // 빈곳
      ];
    });

    const pieData = this.sampleData.map((v, i) => {
      return [
        {value: v * this.angle_max        , arc : arcs[i]},   // value
        {value: (100 - v) * this.angle_max, arc : arcs[i]},   // 나머지
        {value: 100 * (1 - this.angle_max), arc : arcs[i]},   // 빈곳
      ];
    });

    const pie = d3.pie()
      .sort(null)
      .value(d => {
        // console.log(d);
        return d[`value`];
      });


    // const test: any = [{ value : 80 }, { value : 0 }, { value : 20 }];
    // console.log(pie(test));

    // 빈 배경 라인바
    const empty_bg = this.svg.selectAll('.empty')
      .data(emptyPieData)
      .enter()
      .append('g').classed('empty', true)
      .attr('transform', `translate( ${ this.width / 2 }, ${ this.height / 2 } ) rotate(0)` )
      .attr('fill-opacity', (d, i) => 2 / (i + 1));

    empty_bg.selectAll('path').data(d => { return pie(d); })
      .enter()
      .append('path')
      .attr('d', d => d.data.arc(d) )
      .attr('fill', (d, i) => i === 0 ? this.bg_color : 'none' );



    // 실제 데이터 바
    const g = this.svg.selectAll('.list')
      .data(pieData)
      .enter()
      .append('g').classed('list', true)
      .attr('transform', `translate( ${ this.width / 2 }, ${ this.height / 2 } ) rotate(0)` )
      .attr('fill-opacity', (d, i) => 2 / (i + 1));

    g.selectAll('path').data(d => { return pie(d); })
      .enter()
      .append('path')
      .attr('d', d => d.data.arc(d) )
      .attr('fill', (d, i) => i === 0 ? this.line_color : 'none' );



    // 텍스트 부분 (데이터 값)
    this.svg.selectAll('.empty').each( (d, index, _this) => {
      const el = d3.select(_this[index]);
      // console.log(el);
      el.selectAll('path').each((r, i) => {
        if( i === 1 ) {
          const centroid  = r[`data`].arc.centroid({ startAngle: r[`startAngle`] + 0.05, endAngle : r[`startAngle`] + 0.001 + 0.05 });
          const title_centroid = r[`data`].arc.centroid({ startAngle: 0, endAngle : 0 });
          // console.log(`r=>`, r);
          // console.log(`centroid1=>`, centroid);
          // console.log(`centroid2=>`, centroid2);

          // 비처리 전처리 항목의 제목 텍스트
          g.append('text')
            .text( (v) => {
              return `${ this.sampleTitle[index] }`;
            })
            .attr('transform', `translate(${title_centroid[0] - 5 },${title_centroid[1]})`)  // 똑바로 서있는 텍스트
            .attr('alignment-baseline', `middle`)
            .attr('text-anchor', `end`);

          // 각 항목 값 텍스트 20%, 50%
          g.append('text')
            .text( (v) => {
              return `${ this.sampleData[index] }%`;
            })
            // .attr('transform', `translate(${centroid[0]},${centroid[1]}) rotate(${180 / Math.PI * (r[`startAngle`]) + 7})`)  // 바에 맞추어서 회전되어있는 텍스트
            .attr('transform', `translate(${centroid[0] - 15},${centroid[1] - 5 })`)  // 똑바로 서있는 텍스트
            .attr('alignment-baseline', `middle`);

        }

      });
    });




    // ****************************  가운데 원 부분  ********************************** //
    this.svg.selectAll('circle')
      .data(this.rawData)
      .enter()
      .append('circle')
      .attr('cx',this.width / 2)
      .attr('cy',this.height / 2)
      .attr('r',this.radius / 4.5)
      .attr('stroke', this.bg_color)
      .attr('fill','none')
      .attr('stroke-dasharray','3')
      .attr('stroke-width',2);


  }
}
