/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
export class NgxMultiGaugeComponent {
    constructor() {
        this.rawData = [{ title_en: 'prePro', title_kr: '전처리', value: 87 }, { title_en: 'cantPro', title_kr: '비처리', value: 91 }];
        this.sampleTitleEn = [];
        this.sampleTitleKr = [];
        this.sampleData = [];
        this.totalValue = 0;
        this.width = 500;
        this.height = 500;
        this.bg_color = "#E5E5E5";
        this.line_color = "#004C90";
        this.radius = this.height / 2;
        this.angle_max = 0.75; // 100%의 기준 길이
        // 100%의 기준 길이
        this.list_margin = this.height / 16; // 항목과 항목 사이의 거리
        // 항목과 항목 사이의 거리
        this.line_width = this.height / 50; // 선넓이
        // 선넓이
        this.center_circle_size = this.height / 10; // 가운데 구멍 크기
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // 상위 컴포넌트에 input데이터가 있는지 확인
        // console.log(this.rawData);
        // 받은 데이터를 각 부분으로 나누어줌
        this.rawData.map((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            this.sampleTitleEn.push(v.title_en);
            this.sampleTitleKr.push(v.title_kr);
            this.sampleData.push(v.value);
        }));
        // 종합 데이터
        this.totalValue = 0;
        this.sampleData.map((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            this.totalValue += v;
        }));
        /** @type {?} */
        const _CHART = this.CHART1.nativeElement;
        this.svg = d3.select(_CHART)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        // ****************************  차트부분  ********************************** //
        /** @type {?} */
        const arcs = this.sampleData.map((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        (v, i) => {
            /** @type {?} */
            const inner_calc = this.center_circle_size + (i * this.list_margin + ((i - 1) * this.line_width) + (this.list_margin + this.line_width));
            // i x 마진 + ( (i-1) x 선넓이 ) + (마진+선넓이)
            /** @type {?} */
            const outer_calc = inner_calc + this.line_width;
            return d3.arc()
                .innerRadius(inner_calc)
                .outerRadius(outer_calc)
                .cornerRadius(this.line_width)
                .padAngle(.07)
                .padRadius(100);
        }));
        /** @type {?} */
        const emptyPieData = this.sampleData.map((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        (v, i) => {
            v = 100;
            return [
                { value: v * this.angle_max, arc: arcs[i] },
                { value: (100 - v) * this.angle_max, arc: arcs[i] },
                { value: 100 * (1 - this.angle_max), arc: arcs[i] },
            ];
        }));
        /** @type {?} */
        const pieData = this.sampleData.map((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        (v, i) => {
            return [
                { value: v * this.angle_max, arc: arcs[i] },
                { value: (100 - v) * this.angle_max, arc: arcs[i] },
                { value: 100 * (1 - this.angle_max), arc: arcs[i] },
            ];
        }));
        /** @type {?} */
        const pie = d3.pie()
            .sort(null)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            // console.log(d);
            return d[`value`];
        }));
        // const test: any = [{ value : 80 }, { value : 0 }, { value : 20 }];
        // console.log(pie(test));
        // 빈 배경 라인바
        /** @type {?} */
        const empty_bg = this.svg.selectAll('.empty')
            .data(emptyPieData)
            .enter()
            .append('g').classed('empty', true)
            .attr('transform', `translate( ${this.width / 2}, ${this.height / 2} ) rotate(0)`)
            .attr('fill-opacity', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => 2 / (i + 1)));
        empty_bg.selectAll('path').data((/**
         * @param {?} d
         * @return {?}
         */
        d => { return pie(d); }))
            .enter()
            .append('path')
            .attr('d', (/**
         * @param {?} d
         * @return {?}
         */
        d => d.data.arc(d)))
            .attr('fill', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => i === 0 ? this.bg_color : 'none'));
        // 실제 데이터 바
        /** @type {?} */
        const g = this.svg.selectAll('.list')
            .data(pieData)
            .enter()
            .append('g').classed('list', true)
            .attr('transform', `translate( ${this.width / 2}, ${this.height / 2} ) rotate(0)`)
            .attr('fill-opacity', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => 2 / (i + 1)));
        g.selectAll('path').data((/**
         * @param {?} d
         * @return {?}
         */
        d => { return pie(d); }))
            .enter()
            .append('path')
            .attr('d', (/**
         * @param {?} d
         * @return {?}
         */
        d => d.data.arc(d)))
            .attr('fill', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => i === 0 ? this.line_color : 'none'));
        // 텍스트 부분 (데이터 값)
        this.svg.selectAll('.empty').each((/**
         * @param {?} d
         * @param {?} index
         * @param {?} _this
         * @return {?}
         */
        (d, index, _this) => {
            /** @type {?} */
            const el = d3.select(_this[index]);
            // console.log(el);
            el.selectAll('path').each((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => {
                if (i === 1) {
                    /** @type {?} */
                    const centroid = r[`data`].arc.centroid({ startAngle: r[`startAngle`] + 0.05, endAngle: r[`startAngle`] + 0.001 + 0.05 });
                    /** @type {?} */
                    const title_centroid = r[`data`].arc.centroid({ startAngle: 0, endAngle: 0 });
                    // console.log(`r=>`, r);
                    // console.log(`centroid1=>`, centroid);
                    // console.log(`centroid2=>`, centroid2);
                    // 비처리 전처리 항목의 제목 텍스트
                    g.append('text')
                        .text((/**
                     * @param {?} v
                     * @return {?}
                     */
                    (v) => {
                        return `${this.sampleTitleKr[index]}`;
                    }))
                        .attr('transform', `translate(${title_centroid[0] - 5},${title_centroid[1]})`) // 똑바로 서있는 텍스트
                        .attr('alignment-baseline', `middle`)
                        .attr('text-anchor', `end`);
                    // 각 항목 값 텍스트 20%, 50%
                    g.append('text')
                        .text((/**
                     * @param {?} v
                     * @return {?}
                     */
                    (v) => {
                        return `${this.sampleData[index]}%`;
                    }))
                        // .attr('transform', `translate(${centroid[0]},${centroid[1]}) rotate(${180 / Math.PI * (r[`startAngle`]) + 7})`)  // 바에 맞추어서 회전되어있는 텍스트
                        .attr('transform', `translate(${centroid[0] - 15},${centroid[1] - 5})`) // 똑바로 서있는 텍스트
                        .attr('alignment-baseline', `middle`);
                }
            }));
        }));
        // ****************************  가운데 원 부분  ********************************** //
        this.svg.selectAll('circle')
            .data(this.rawData)
            .enter()
            .append('circle')
            .attr('cx', this.width / 2)
            .attr('cy', this.height / 2)
            .attr('r', this.radius / 4.5)
            .attr('stroke', this.bg_color)
            .attr('fill', 'none')
            .attr('stroke-dasharray', '3')
            .attr('stroke-width', 2);
    }
}
NgxMultiGaugeComponent.decorators = [
    { type: Component, args: [{
                selector: 'NgxMultiGauge',
                template: "<div class=\"chart_container\">\r\n  <div class=\"chart1\" #chart1></div>\r\n  <div class=\"circle_text\" >\r\n    <div *ngFor = \"let list of rawData\"> {{list['title_kr']}} : {{list['value']}} </div>\r\n    <div>\uC885\uD569 : {{ totalValue }} </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".chart_container{width:500px;height:500px;--border:1px solid #ddd;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:relative;font-size:14px}.chart_container .chart1{display:-webkit-box;display:flex}.chart_container .circle_text{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:absolute;font-size:.8em;font-weight:700}"]
            }] }
];
/** @nocollapse */
NgxMultiGaugeComponent.ctorParameters = () => [];
NgxMultiGaugeComponent.propDecorators = {
    CHART1: [{ type: ViewChild, args: ['chart1',] }],
    rawData: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.CHART1;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.rawData;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.sampleTitleEn;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.sampleTitleKr;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.sampleData;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.totalValue;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.width;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.height;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.bg_color;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.line_color;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.radius;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.angle_max;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.list_margin;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.line_width;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.center_circle_size;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.svg;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.pie;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1nYXVnZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQVF6QixNQUFNLE9BQU8sc0JBQXNCO0lBSWpDO1FBRVMsWUFBTyxHQUFHLENBQUUsRUFBRSxRQUFRLEVBQUcsUUFBUSxFQUFHLFFBQVEsRUFBRyxLQUFLLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFHLFNBQVMsRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFFLEtBQUssRUFBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJJLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsZUFBVSxHQUFNLENBQUMsQ0FBQztRQUVsQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNiLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixXQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLGNBQWM7O1FBRWhDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0I7O1FBQ2hELGVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFFLE1BQU07O1FBQ3RDLHVCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsWUFBWTtJQWxCbkMsQ0FBQzs7OztJQXlCakIsUUFBUTtRQUVOLDRCQUE0QjtRQUM1Qiw2QkFBNkI7UUFFN0Isc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDO1FBRUgsU0FBUztRQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDOztjQUVHLE1BQU0sR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWE7UUFFekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Y0FJekIsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRzs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ2xDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFFOzs7a0JBQ3JJLFVBQVUsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7WUFFL0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFO2lCQUNaLFdBQVcsQ0FBRSxVQUFVLENBQUU7aUJBQ3pCLFdBQVcsQ0FBRSxVQUFVLENBQUU7aUJBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2lCQUM3QixRQUFRLENBQUMsR0FBRyxDQUFDO2lCQUNiLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDLEVBQUM7O2NBRUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRzs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoRCxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ1IsT0FBTztnQkFDTCxFQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBVSxHQUFHLEVBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNsRCxFQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ2xELEVBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQzthQUNuRCxDQUFDO1FBQ0osQ0FBQyxFQUFDOztjQUVJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsT0FBTztnQkFDTCxFQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBVSxHQUFHLEVBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNsRCxFQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ2xELEVBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQzthQUNuRCxDQUFDO1FBQ0osQ0FBQyxFQUFDOztjQUVJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFO2FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDVixLQUFLOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDVCxrQkFBa0I7WUFDbEIsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxFQUFDOzs7OztjQU9FLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUNsQixLQUFLLEVBQUU7YUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7YUFDbEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFlLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBRSxLQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBRSxjQUFjLENBQUU7YUFDdEYsSUFBSSxDQUFDLGNBQWM7Ozs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7UUFFOUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzthQUNyRCxLQUFLLEVBQUU7YUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2FBQzlCLElBQUksQ0FBQyxNQUFNOzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7OztjQUt2RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDYixLQUFLLEVBQUU7YUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFlLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBRSxLQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBRSxjQUFjLENBQUU7YUFDdEYsSUFBSSxDQUFDLGNBQWM7Ozs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7UUFFOUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzthQUM5QyxLQUFLLEVBQUU7YUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxD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RyxFQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2FBQzNCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUM3QixJQUFJLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQzthQUNuQixJQUFJLENBQUMsa0JBQWtCLEVBQUMsR0FBRyxDQUFDO2FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFHNUIsQ0FBQzs7O1lBekxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsa1NBQStDOzthQUVoRDs7Ozs7cUJBR0UsU0FBUyxTQUFDLFFBQVE7c0JBSWxCLEtBQUs7Ozs7SUFKTix3Q0FBNkM7O0lBSTdDLHlDQUFxSTs7SUFFckksK0NBQW1COztJQUNuQiwrQ0FBbUI7O0lBQ25CLDRDQUFtQjs7SUFDbkIsNENBQWtCOztJQUVsQix1Q0FBWTs7SUFDWix3Q0FBYTs7SUFDYiwwQ0FBcUI7O0lBQ3JCLDRDQUF1Qjs7SUFDdkIsd0NBQXlCOztJQUN6QiwyQ0FBaUI7O0lBRWpCLDZDQUErQjs7SUFDL0IsNENBQThCOztJQUM5QixvREFBc0M7O0lBR3RDLHFDQUFTOztJQUNULHFDQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnTmd4TXVsdGlHYXVnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50LnN0eWwnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNdWx0aUdhdWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAVmlld0NoaWxkKCdjaGFydDEnKSBDSEFSVDE6IEVsZW1lbnRSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIEBJbnB1dCgpIHJhd0RhdGEgPSBbIHsgdGl0bGVfZW4gOiAncHJlUHJvJyAsIHRpdGxlX2tyIDogJ+yghOyymOumrCcsIHZhbHVlIDogODcgfSwgeyB0aXRsZV9lbiA6ICdjYW50UHJvJywgdGl0bGVfa3IgOiAn67mE7LKY66asJywgdmFsdWUgOiA5MSB9XTtcblxuICBzYW1wbGVUaXRsZUVuID0gW107XG4gIHNhbXBsZVRpdGxlS3IgPSBbXTtcbiAgc2FtcGxlRGF0YSAgICA9IFtdO1xuICB0b3RhbFZhbHVlICAgID0gMDtcblxuICB3aWR0aCA9IDUwMDtcbiAgaGVpZ2h0ID0gNTAwO1xuICBiZ19jb2xvciA9IFwiI0U1RTVFNVwiO1xuICBsaW5lX2NvbG9yID0gXCIjMDA0QzkwXCI7XG4gIHJhZGl1cyA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgYW5nbGVfbWF4ID0gMC43NTsgLy8gMTAwJeydmCDquLDspIAg6ri47J20XG5cbiAgbGlzdF9tYXJnaW4gPSB0aGlzLmhlaWdodCAvIDE2OyAvLyDtla3rqqnqs7wg7ZWt66qpIOyCrOydtOydmCDqsbDrpqxcbiAgbGluZV93aWR0aCA9IHRoaXMuaGVpZ2h0IC8gNTA7ICAvLyDshKDrhJPsnbRcbiAgY2VudGVyX2NpcmNsZV9zaXplID0gdGhpcy5oZWlnaHQgLyAxMDsgLy8g6rCA7Jq0642wIOq1rOupjSDtgazquLBcblxuXG4gIHN2ZzogYW55O1xuICBwaWU6IGFueTtcblxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgLy8g7IOB7JyEIOy7tO2PrOuEjO2KuOyXkCBpbnB1dOuNsOydtO2EsOqwgCDsnojripTsp4Ag7ZmV7J24XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5yYXdEYXRhKTtcblxuICAgIC8vIOuwm+ydgCDrjbDsnbTthLDrpbwg6rCBIOu2gOu2hOycvOuhnCDrgpjriITslrTspIxcbiAgICB0aGlzLnJhd0RhdGEubWFwKCB2ID0+IHtcbiAgICAgIHRoaXMuc2FtcGxlVGl0bGVFbi5wdXNoKHYudGl0bGVfZW4pO1xuICAgICAgdGhpcy5zYW1wbGVUaXRsZUtyLnB1c2godi50aXRsZV9rcik7XG4gICAgICB0aGlzLnNhbXBsZURhdGEucHVzaCh2LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIC8vIOyihe2VqSDrjbDsnbTthLBcbiAgICB0aGlzLnRvdGFsVmFsdWUgPSAwO1xuICAgIHRoaXMuc2FtcGxlRGF0YS5tYXAodiA9PiB7XG4gICAgICB0aGlzLnRvdGFsVmFsdWUgKz0gdjtcbiAgICB9KTtcblxuICAgIGNvbnN0IF9DSEFSVCA9ICB0aGlzLkNIQVJUMS5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5zdmcgPSBkMy5zZWxlY3QoX0NIQVJUKVxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuXG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICDssKjtirjrtoDrtoQgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbiAgICBjb25zdCBhcmNzID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgodiwgaSkgPT4ge1xuICAgICAgY29uc3QgaW5uZXJfY2FsYyA9IHRoaXMuY2VudGVyX2NpcmNsZV9zaXplICsgKCBpICogdGhpcy5saXN0X21hcmdpbiArICgoaSAtIDEpICogdGhpcy5saW5lX3dpZHRoICkgKyAodGhpcy5saXN0X21hcmdpbiArIHRoaXMubGluZV93aWR0aCkgKTsgLy8gaSB4IOuniOynhCArICggKGktMSkgeCDshKDrhJPsnbQgKSArICjrp4jsp4Qr7ISg64ST7J20KVxuICAgICAgY29uc3Qgb3V0ZXJfY2FsYyA9IGlubmVyX2NhbGMgKyB0aGlzLmxpbmVfd2lkdGg7XG5cbiAgICAgIHJldHVybiBkMy5hcmMoKVxuICAgICAgICAuaW5uZXJSYWRpdXMoIGlubmVyX2NhbGMgKVxuICAgICAgICAub3V0ZXJSYWRpdXMoIG91dGVyX2NhbGMgKVxuICAgICAgICAuY29ybmVyUmFkaXVzKHRoaXMubGluZV93aWR0aClcbiAgICAgICAgLnBhZEFuZ2xlKC4wNylcbiAgICAgICAgLnBhZFJhZGl1cygxMDApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZW1wdHlQaWVEYXRhID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgodiwgaSkgPT4ge1xuICAgICAgdiA9IDEwMDtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHt2YWx1ZTogdiAqIHRoaXMuYW5nbGVfbWF4ICAgICAgICAsIGFyYyA6IGFyY3NbaV19LCAgIC8vIHZhbHVlXG4gICAgICAgIHt2YWx1ZTogKDEwMCAtIHYpICogdGhpcy5hbmdsZV9tYXgsIGFyYyA6IGFyY3NbaV19LCAgIC8vIOuCmOuouOyngFxuICAgICAgICB7dmFsdWU6IDEwMCAqICgxIC0gdGhpcy5hbmdsZV9tYXgpLCBhcmMgOiBhcmNzW2ldfSwgICAvLyDruYjqs7NcbiAgICAgIF07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwaWVEYXRhID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgodiwgaSkgPT4ge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAge3ZhbHVlOiB2ICogdGhpcy5hbmdsZV9tYXggICAgICAgICwgYXJjIDogYXJjc1tpXX0sICAgLy8gdmFsdWVcbiAgICAgICAge3ZhbHVlOiAoMTAwIC0gdikgKiB0aGlzLmFuZ2xlX21heCwgYXJjIDogYXJjc1tpXX0sICAgLy8g64KY66i47KeAXG4gICAgICAgIHt2YWx1ZTogMTAwICogKDEgLSB0aGlzLmFuZ2xlX21heCksIGFyYyA6IGFyY3NbaV19LCAgIC8vIOu5iOqzs1xuICAgICAgXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpXG4gICAgICAuc29ydChudWxsKVxuICAgICAgLnZhbHVlKGQgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgcmV0dXJuIGRbYHZhbHVlYF07XG4gICAgICB9KTtcblxuXG4gICAgLy8gY29uc3QgdGVzdDogYW55ID0gW3sgdmFsdWUgOiA4MCB9LCB7IHZhbHVlIDogMCB9LCB7IHZhbHVlIDogMjAgfV07XG4gICAgLy8gY29uc29sZS5sb2cocGllKHRlc3QpKTtcblxuICAgIC8vIOu5iCDrsLDqsr0g65287J2467CUXG4gICAgY29uc3QgZW1wdHlfYmcgPSB0aGlzLnN2Zy5zZWxlY3RBbGwoJy5lbXB0eScpXG4gICAgICAuZGF0YShlbXB0eVBpZURhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnZycpLmNsYXNzZWQoJ2VtcHR5JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCAkeyB0aGlzLndpZHRoIC8gMiB9LCAkeyB0aGlzLmhlaWdodCAvIDIgfSApIHJvdGF0ZSgwKWAgKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIChkLCBpKSA9PiAyIC8gKGkgKyAxKSk7XG5cbiAgICBlbXB0eV9iZy5zZWxlY3RBbGwoJ3BhdGgnKS5kYXRhKGQgPT4geyByZXR1cm4gcGllKGQpOyB9KVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IGQuZGF0YS5hcmMoZCkgKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4gaSA9PT0gMCA/IHRoaXMuYmdfY29sb3IgOiAnbm9uZScgKTtcblxuXG5cbiAgICAvLyDsi6TsoJwg642w7J207YSwIOuwlFxuICAgIGNvbnN0IGcgPSB0aGlzLnN2Zy5zZWxlY3RBbGwoJy5saXN0JylcbiAgICAgIC5kYXRhKHBpZURhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnZycpLmNsYXNzZWQoJ2xpc3QnLCB0cnVlKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoICR7IHRoaXMud2lkdGggLyAyIH0sICR7IHRoaXMuaGVpZ2h0IC8gMiB9ICkgcm90YXRlKDApYCApXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgKGQsIGkpID0+IDIgLyAoaSArIDEpKTtcblxuICAgIGcuc2VsZWN0QWxsKCdwYXRoJykuZGF0YShkID0+IHsgcmV0dXJuIHBpZShkKTsgfSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdkJywgZCA9PiBkLmRhdGEuYXJjKGQpIClcbiAgICAgIC5hdHRyKCdmaWxsJywgKGQsIGkpID0+IGkgPT09IDAgPyB0aGlzLmxpbmVfY29sb3IgOiAnbm9uZScgKTtcblxuXG5cbiAgICAvLyDthY3siqTtirgg67aA67aEICjrjbDsnbTthLAg6rCSKVxuICAgIHRoaXMuc3ZnLnNlbGVjdEFsbCgnLmVtcHR5JykuZWFjaCggKGQsIGluZGV4LCBfdGhpcykgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkMy5zZWxlY3QoX3RoaXNbaW5kZXhdKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVsKTtcbiAgICAgIGVsLnNlbGVjdEFsbCgncGF0aCcpLmVhY2goKHIsIGkpID0+IHtcbiAgICAgICAgaWYoIGkgPT09IDEgKSB7XG4gICAgICAgICAgY29uc3QgY2VudHJvaWQgID0gcltgZGF0YWBdLmFyYy5jZW50cm9pZCh7IHN0YXJ0QW5nbGU6IHJbYHN0YXJ0QW5nbGVgXSArIDAuMDUsIGVuZEFuZ2xlIDogcltgc3RhcnRBbmdsZWBdICsgMC4wMDEgKyAwLjA1IH0pO1xuICAgICAgICAgIGNvbnN0IHRpdGxlX2NlbnRyb2lkID0gcltgZGF0YWBdLmFyYy5jZW50cm9pZCh7IHN0YXJ0QW5nbGU6IDAsIGVuZEFuZ2xlIDogMCB9KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcj0+YCwgcik7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYGNlbnRyb2lkMT0+YCwgY2VudHJvaWQpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBjZW50cm9pZDI9PmAsIGNlbnRyb2lkMik7XG5cbiAgICAgICAgICAvLyDruYTsspjrpqwg7KCE7LKY66asIO2VreuqqeydmCDsoJzrqqkg7YWN7Iqk7Yq4XG4gICAgICAgICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLnRleHQoICh2KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBgJHsgdGhpcy5zYW1wbGVUaXRsZUtyW2luZGV4XSB9YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3RpdGxlX2NlbnRyb2lkWzBdIC0gNSB9LCR7dGl0bGVfY2VudHJvaWRbMV19KWApICAvLyDrmJHrsJTroZwg7ISc7J6I64qUIO2FjeyKpO2KuFxuICAgICAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsIGBtaWRkbGVgKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgYGVuZGApO1xuXG4gICAgICAgICAgLy8g6rCBIO2VreuqqSDqsJIg7YWN7Iqk7Yq4IDIwJSwgNTAlXG4gICAgICAgICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLnRleHQoICh2KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBgJHsgdGhpcy5zYW1wbGVEYXRhW2luZGV4XSB9JWA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHtjZW50cm9pZFswXX0sJHtjZW50cm9pZFsxXX0pIHJvdGF0ZSgkezE4MCAvIE1hdGguUEkgKiAocltgc3RhcnRBbmdsZWBdKSArIDd9KWApICAvLyDrsJTsl5Ag66ee7LaU7Ja07IScIO2ajOyghOuQmOyWtOyeiOuKlCDthY3siqTtirhcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7Y2VudHJvaWRbMF0gLSAxNX0sJHtjZW50cm9pZFsxXSAtIDUgfSlgKSAgLy8g65iR67CU66GcIOyEnOyeiOuKlCDthY3siqTtirhcbiAgICAgICAgICAgIC5hdHRyKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCBgbWlkZGxlYCk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9KTtcblxuXG5cblxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogIOqwgOyatOuNsCDsm5Ag67aA67aEICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4gICAgdGhpcy5zdmcuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgLmRhdGEodGhpcy5yYXdEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAuYXR0cignY3gnLHRoaXMud2lkdGggLyAyKVxuICAgICAgLmF0dHIoJ2N5Jyx0aGlzLmhlaWdodCAvIDIpXG4gICAgICAuYXR0cigncicsdGhpcy5yYWRpdXMgLyA0LjUpXG4gICAgICAuYXR0cignc3Ryb2tlJywgdGhpcy5iZ19jb2xvcilcbiAgICAgIC5hdHRyKCdmaWxsJywnbm9uZScpXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsJzMnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsMik7XG5cblxuICB9XG59XG4iXX0=