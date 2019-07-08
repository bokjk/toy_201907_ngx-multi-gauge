import { select, arc, pie } from 'd3';
import { Injectable, NgModule, Component, ViewChild, Input, defineInjectable } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMultiGaugeService {
    constructor() { }
}
NgxMultiGaugeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxMultiGaugeService.ctorParameters = () => [];
/** @nocollapse */ NgxMultiGaugeService.ngInjectableDef = defineInjectable({ factory: function NgxMultiGaugeService_Factory() { return new NgxMultiGaugeService(); }, token: NgxMultiGaugeService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMultiGaugeComponent {
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
        this.svg = select(_CHART)
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
            return arc()
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
        const pie$$1 = pie()
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
        d => { return pie$$1(d); }))
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
        d => { return pie$$1(d); }))
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
            const el = select(_this[index]);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMultiGaugeModule {
}
NgxMultiGaugeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxMultiGaugeComponent],
                imports: [CommonModule],
                exports: [NgxMultiGaugeComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxMultiGaugeService, NgxMultiGaugeComponent, NgxMultiGaugeModule };

//# sourceMappingURL=ngx-multi-gauge.js.map