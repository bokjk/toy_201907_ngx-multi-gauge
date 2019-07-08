/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
export class NgxMultiGaugeComponent {
    constructor() {
        this.rawData = [{ data_name: 'prePro', title: '전처리', value: 87 }, { data_name: 'cantPro', title: '비처리', value: 91 }];
        this.sampleDataName = [];
        this.sampleTitle = [];
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
            this.sampleDataName.push(v.data_name);
            this.sampleTitle.push(v.title);
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
                        return `${this.sampleTitle[index]}`;
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
                template: "<div class=\"chart_container\">\r\n  <div class=\"chart1\" #chart1></div>\r\n  <div class=\"circle_text\" >\r\n    <div *ngFor = \"let list of rawData\"> {{list['title']}} : {{list['value']}} </div>\r\n    <div>\uC885\uD569 : {{ totalValue }} </div>\r\n  </div>\r\n</div>\r\n",
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
    NgxMultiGaugeComponent.prototype.sampleDataName;
    /** @type {?} */
    NgxMultiGaugeComponent.prototype.sampleTitle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1nYXVnZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQVF6QixNQUFNLE9BQU8sc0JBQXNCO0lBSWpDO1FBRVMsWUFBTyxHQUFHLENBQUUsRUFBRSxTQUFTLEVBQUcsUUFBUSxFQUFHLEtBQUssRUFBRyxLQUFLLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFHLFNBQVMsRUFBRSxLQUFLLEVBQUcsS0FBSyxFQUFFLEtBQUssRUFBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpJLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsZUFBVSxHQUFNLENBQUMsQ0FBQztRQUVsQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNiLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixXQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLGNBQWM7O1FBRWhDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0I7O1FBQ2hELGVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFFLE1BQU07O1FBQ3RDLHVCQUFrQixHQUFHLElBQUksQ0FBQyxN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QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzthQUNyRCxLQUFLLEVBQUU7YUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2FBQzlCLElBQUksQ0FBQyxNQUFNOzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7OztjQUt2RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDYixLQUFLLEVBQUU7YUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFlLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBRSxLQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBRSxjQUFjLENBQUU7YUFDdEYsSUFBSSxDQUFDLGNBQWM7Ozs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7UUFFOUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzthQUM5QyxLQUFLLEVBQUU7YUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxD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RyxFQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2FBQzNCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUM3QixJQUFJLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQzthQUNuQixJQUFJLENBQUMsa0JBQWtCLEVBQUMsR0FBRyxDQUFDO2FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFHNUIsQ0FBQzs7O1lBekxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsK1JBQStDOzthQUVoRDs7Ozs7cUJBR0UsU0FBUyxTQUFDLFFBQVE7c0JBSWxCLEtBQUs7Ozs7SUFKTix3Q0FBNkM7O0lBSTdDLHlDQUFpSTs7SUFFakksZ0RBQW9COztJQUNwQiw2Q0FBaUI7O0lBQ2pCLDRDQUFtQjs7SUFDbkIsNENBQWtCOztJQUVsQix1Q0FBWTs7SUFDWix3Q0FBYTs7SUFDYiwwQ0FBcUI7O0lBQ3JCLDRDQUF1Qjs7SUFDdkIsd0NBQXlCOztJQUN6QiwyQ0FBaUI7O0lBRWpCLDZDQUErQjs7SUFDL0IsNENBQThCOztJQUM5QixvREFBc0M7O0lBR3RDLHFDQUFTOztJQUNULHFDQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnTmd4TXVsdGlHYXVnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50LnN0eWwnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNdWx0aUdhdWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAVmlld0NoaWxkKCdjaGFydDEnKSBDSEFSVDE6IEVsZW1lbnRSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIEBJbnB1dCgpIHJhd0RhdGEgPSBbIHsgZGF0YV9uYW1lIDogJ3ByZVBybycgLCB0aXRsZSA6ICfsoITsspjrpqwnLCB2YWx1ZSA6IDg3IH0sIHsgZGF0YV9uYW1lIDogJ2NhbnRQcm8nLCB0aXRsZSA6ICfruYTsspjrpqwnLCB2YWx1ZSA6IDkxIH1dO1xuXG4gIHNhbXBsZURhdGFOYW1lID0gW107XG4gIHNhbXBsZVRpdGxlID0gW107XG4gIHNhbXBsZURhdGEgICAgPSBbXTtcbiAgdG90YWxWYWx1ZSAgICA9IDA7XG5cbiAgd2lkdGggPSA1MDA7XG4gIGhlaWdodCA9IDUwMDtcbiAgYmdfY29sb3IgPSBcIiNFNUU1RTVcIjtcbiAgbGluZV9jb2xvciA9IFwiIzAwNEM5MFwiO1xuICByYWRpdXMgPSB0aGlzLmhlaWdodCAvIDI7XG4gIGFuZ2xlX21heCA9IDAuNzU7IC8vIDEwMCXsnZgg6riw7KSAIOq4uOydtFxuXG4gIGxpc3RfbWFyZ2luID0gdGhpcy5oZWlnaHQgLyAxNjsgLy8g7ZWt66qp6rO8IO2VreuqqSDsgqzsnbTsnZgg6rGw66asXG4gIGxpbmVfd2lkdGggPSB0aGlzLmhlaWdodCAvIDUwOyAgLy8g7ISg64ST7J20XG4gIGNlbnRlcl9jaXJjbGVfc2l6ZSA9IHRoaXMuaGVpZ2h0IC8gMTA7IC8vIOqwgOyatOuNsCDqtazrqY0g7YGs6riwXG5cblxuICBzdmc6IGFueTtcbiAgcGllOiBhbnk7XG5cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIC8vIOyDgeychCDsu7Ttj6zrhIztirjsl5AgaW5wdXTrjbDsnbTthLDqsIAg7J6I64qU7KeAIO2ZleyduFxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmF3RGF0YSk7XG5cbiAgICAvLyDrsJvsnYAg642w7J207YSw66W8IOqwgSDrtoDrtoTsnLzroZwg64KY64iE7Ja07KSMXG4gICAgdGhpcy5yYXdEYXRhLm1hcCggdiA9PiB7XG4gICAgICB0aGlzLnNhbXBsZURhdGFOYW1lLnB1c2godi5kYXRhX25hbWUpO1xuICAgICAgdGhpcy5zYW1wbGVUaXRsZS5wdXNoKHYudGl0bGUpO1xuICAgICAgdGhpcy5zYW1wbGVEYXRhLnB1c2godi52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICAvLyDsooXtlakg642w7J207YSwXG4gICAgdGhpcy50b3RhbFZhbHVlID0gMDtcbiAgICB0aGlzLnNhbXBsZURhdGEubWFwKHYgPT4ge1xuICAgICAgdGhpcy50b3RhbFZhbHVlICs9IHY7XG4gICAgfSk7XG5cbiAgICBjb25zdCBfQ0hBUlQgPSAgdGhpcy5DSEFSVDEubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuc3ZnID0gZDMuc2VsZWN0KF9DSEFSVClcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAg7LCo7Yq467aA67aEICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4gICAgY29uc3QgYXJjcyA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKHYsIGkpID0+IHtcbiAgICAgIGNvbnN0IGlubmVyX2NhbGMgPSB0aGlzLmNlbnRlcl9jaXJjbGVfc2l6ZSArICggaSAqIHRoaXMubGlzdF9tYXJnaW4gKyAoKGkgLSAxKSAqIHRoaXMubGluZV93aWR0aCApICsgKHRoaXMubGlzdF9tYXJnaW4gKyB0aGlzLmxpbmVfd2lkdGgpICk7IC8vIGkgeCDrp4jsp4QgKyAoIChpLTEpIHgg7ISg64ST7J20ICkgKyAo66eI7KeEK+yEoOuEk+ydtClcbiAgICAgIGNvbnN0IG91dGVyX2NhbGMgPSBpbm5lcl9jYWxjICsgdGhpcy5saW5lX3dpZHRoO1xuXG4gICAgICByZXR1cm4gZDMuYXJjKClcbiAgICAgICAgLmlubmVyUmFkaXVzKCBpbm5lcl9jYWxjIClcbiAgICAgICAgLm91dGVyUmFkaXVzKCBvdXRlcl9jYWxjIClcbiAgICAgICAgLmNvcm5lclJhZGl1cyh0aGlzLmxpbmVfd2lkdGgpXG4gICAgICAgIC5wYWRBbmdsZSguMDcpXG4gICAgICAgIC5wYWRSYWRpdXMoMTAwKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVtcHR5UGllRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKHYsIGkpID0+IHtcbiAgICAgIHYgPSAxMDA7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7dmFsdWU6IHYgKiB0aGlzLmFuZ2xlX21heCAgICAgICAgLCBhcmMgOiBhcmNzW2ldfSwgICAvLyB2YWx1ZVxuICAgICAgICB7dmFsdWU6ICgxMDAgLSB2KSAqIHRoaXMuYW5nbGVfbWF4LCBhcmMgOiBhcmNzW2ldfSwgICAvLyDrgpjrqLjsp4BcbiAgICAgICAge3ZhbHVlOiAxMDAgKiAoMSAtIHRoaXMuYW5nbGVfbWF4KSwgYXJjIDogYXJjc1tpXX0sICAgLy8g67mI6rOzXG4gICAgICBdO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGllRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKHYsIGkpID0+IHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHt2YWx1ZTogdiAqIHRoaXMuYW5nbGVfbWF4ICAgICAgICAsIGFyYyA6IGFyY3NbaV19LCAgIC8vIHZhbHVlXG4gICAgICAgIHt2YWx1ZTogKDEwMCAtIHYpICogdGhpcy5hbmdsZV9tYXgsIGFyYyA6IGFyY3NbaV19LCAgIC8vIOuCmOuouOyngFxuICAgICAgICB7dmFsdWU6IDEwMCAqICgxIC0gdGhpcy5hbmdsZV9tYXgpLCBhcmMgOiBhcmNzW2ldfSwgICAvLyDruYjqs7NcbiAgICAgIF07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgLnNvcnQobnVsbClcbiAgICAgIC52YWx1ZShkID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZCk7XG4gICAgICAgIHJldHVybiBkW2B2YWx1ZWBdO1xuICAgICAgfSk7XG5cblxuICAgIC8vIGNvbnN0IHRlc3Q6IGFueSA9IFt7IHZhbHVlIDogODAgfSwgeyB2YWx1ZSA6IDAgfSwgeyB2YWx1ZSA6IDIwIH1dO1xuICAgIC8vIGNvbnNvbGUubG9nKHBpZSh0ZXN0KSk7XG5cbiAgICAvLyDruYgg67Cw6rK9IOudvOyduOuwlFxuICAgIGNvbnN0IGVtcHR5X2JnID0gdGhpcy5zdmcuc2VsZWN0QWxsKCcuZW1wdHknKVxuICAgICAgLmRhdGEoZW1wdHlQaWVEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdlbXB0eScsIHRydWUpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSggJHsgdGhpcy53aWR0aCAvIDIgfSwgJHsgdGhpcy5oZWlnaHQgLyAyIH0gKSByb3RhdGUoMClgIClcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAoZCwgaSkgPT4gMiAvIChpICsgMSkpO1xuXG4gICAgZW1wdHlfYmcuc2VsZWN0QWxsKCdwYXRoJykuZGF0YShkID0+IHsgcmV0dXJuIHBpZShkKTsgfSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdkJywgZCA9PiBkLmRhdGEuYXJjKGQpIClcbiAgICAgIC5hdHRyKCdmaWxsJywgKGQsIGkpID0+IGkgPT09IDAgPyB0aGlzLmJnX2NvbG9yIDogJ25vbmUnICk7XG5cblxuXG4gICAgLy8g7Iuk7KCcIOuNsOydtO2EsCDrsJRcbiAgICBjb25zdCBnID0gdGhpcy5zdmcuc2VsZWN0QWxsKCcubGlzdCcpXG4gICAgICAuZGF0YShwaWVEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdsaXN0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCAkeyB0aGlzLndpZHRoIC8gMiB9LCAkeyB0aGlzLmhlaWdodCAvIDIgfSApIHJvdGF0ZSgwKWAgKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIChkLCBpKSA9PiAyIC8gKGkgKyAxKSk7XG5cbiAgICBnLnNlbGVjdEFsbCgncGF0aCcpLmRhdGEoZCA9PiB7IHJldHVybiBwaWUoZCk7IH0pXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignZCcsIGQgPT4gZC5kYXRhLmFyYyhkKSApXG4gICAgICAuYXR0cignZmlsbCcsIChkLCBpKSA9PiBpID09PSAwID8gdGhpcy5saW5lX2NvbG9yIDogJ25vbmUnICk7XG5cblxuXG4gICAgLy8g7YWN7Iqk7Yq4IOu2gOu2hCAo642w7J207YSwIOqwkilcbiAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoJy5lbXB0eScpLmVhY2goIChkLCBpbmRleCwgX3RoaXMpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZDMuc2VsZWN0KF90aGlzW2luZGV4XSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlbCk7XG4gICAgICBlbC5zZWxlY3RBbGwoJ3BhdGgnKS5lYWNoKChyLCBpKSA9PiB7XG4gICAgICAgIGlmKCBpID09PSAxICkge1xuICAgICAgICAgIGNvbnN0IGNlbnRyb2lkICA9IHJbYGRhdGFgXS5hcmMuY2VudHJvaWQoeyBzdGFydEFuZ2xlOiByW2BzdGFydEFuZ2xlYF0gKyAwLjA1LCBlbmRBbmdsZSA6IHJbYHN0YXJ0QW5nbGVgXSArIDAuMDAxICsgMC4wNSB9KTtcbiAgICAgICAgICBjb25zdCB0aXRsZV9jZW50cm9pZCA9IHJbYGRhdGFgXS5hcmMuY2VudHJvaWQoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZSA6IDAgfSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYHI9PmAsIHIpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBjZW50cm9pZDE9PmAsIGNlbnRyb2lkKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgY2VudHJvaWQyPT5gLCBjZW50cm9pZDIpO1xuXG4gICAgICAgICAgLy8g67mE7LKY66asIOyghOyymOumrCDtla3rqqnsnZgg7KCc66qpIO2FjeyKpO2KuFxuICAgICAgICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC50ZXh0KCAodikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYCR7IHRoaXMuc2FtcGxlVGl0bGVbaW5kZXhdIH1gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7dGl0bGVfY2VudHJvaWRbMF0gLSA1IH0sJHt0aXRsZV9jZW50cm9pZFsxXX0pYCkgIC8vIOuYkeuwlOuhnCDshJzsnojripQg7YWN7Iqk7Yq4XG4gICAgICAgICAgICAuYXR0cignYWxpZ25tZW50LWJhc2VsaW5lJywgYG1pZGRsZWApXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCBgZW5kYCk7XG5cbiAgICAgICAgICAvLyDqsIEg7ZWt66qpIOqwkiDthY3siqTtirggMjAlLCA1MCVcbiAgICAgICAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAudGV4dCggKHYpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGAkeyB0aGlzLnNhbXBsZURhdGFbaW5kZXhdIH0lYDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke2NlbnRyb2lkWzBdfSwke2NlbnRyb2lkWzFdfSkgcm90YXRlKCR7MTgwIC8gTWF0aC5QSSAqIChyW2BzdGFydEFuZ2xlYF0pICsgN30pYCkgIC8vIOuwlOyXkCDrp57stpTslrTshJwg7ZqM7KCE65CY7Ja07J6I64qUIO2FjeyKpO2KuFxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHtjZW50cm9pZFswXSAtIDE1fSwke2NlbnRyb2lkWzFdIC0gNSB9KWApICAvLyDrmJHrsJTroZwg7ISc7J6I64qUIO2FjeyKpO2KuFxuICAgICAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsIGBtaWRkbGVgKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAg6rCA7Jq0642wIOybkCDrtoDrtoQgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbiAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAuZGF0YSh0aGlzLnJhd0RhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgIC5hdHRyKCdjeCcsdGhpcy53aWR0aCAvIDIpXG4gICAgICAuYXR0cignY3knLHRoaXMuaGVpZ2h0IC8gMilcbiAgICAgIC5hdHRyKCdyJyx0aGlzLnJhZGl1cyAvIDQuNSlcbiAgICAgIC5hdHRyKCdzdHJva2UnLCB0aGlzLmJnX2NvbG9yKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCdub25lJylcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywnMycpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywyKTtcblxuXG4gIH1cbn1cbiJdfQ==