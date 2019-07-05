/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
var NgxMultiGaugeComponent = /** @class */ (function () {
    function NgxMultiGaugeComponent() {
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
    NgxMultiGaugeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // 상위 컴포넌트에 input데이터가 있는지 확인
        // console.log(this.rawData);
        var _this_1 = this;
        // 받은 데이터를 각 부분으로 나누어줌
        this.rawData.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this_1.sampleTitleEn.push(v.title_en);
            _this_1.sampleTitleKr.push(v.title_kr);
            _this_1.sampleData.push(v.value);
        }));
        // 종합 데이터
        this.totalValue = 0;
        this.sampleData.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this_1.totalValue += v;
        }));
        /** @type {?} */
        var _CHART = this.CHART1.nativeElement;
        this.svg = d3.select(_CHART)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        // ****************************  차트부분  ********************************** //
        /** @type {?} */
        var arcs = this.sampleData.map((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        function (v, i) {
            /** @type {?} */
            var inner_calc = _this_1.center_circle_size + (i * _this_1.list_margin + ((i - 1) * _this_1.line_width) + (_this_1.list_margin + _this_1.line_width));
            // i x 마진 + ( (i-1) x 선넓이 ) + (마진+선넓이)
            /** @type {?} */
            var outer_calc = inner_calc + _this_1.line_width;
            return d3.arc()
                .innerRadius(inner_calc)
                .outerRadius(outer_calc)
                .cornerRadius(_this_1.line_width)
                .padAngle(.07)
                .padRadius(100);
        }));
        /** @type {?} */
        var emptyPieData = this.sampleData.map((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        function (v, i) {
            v = 100;
            return [
                { value: v * _this_1.angle_max, arc: arcs[i] },
                { value: (100 - v) * _this_1.angle_max, arc: arcs[i] },
                { value: 100 * (1 - _this_1.angle_max), arc: arcs[i] },
            ];
        }));
        /** @type {?} */
        var pieData = this.sampleData.map((/**
         * @param {?} v
         * @param {?} i
         * @return {?}
         */
        function (v, i) {
            return [
                { value: v * _this_1.angle_max, arc: arcs[i] },
                { value: (100 - v) * _this_1.angle_max, arc: arcs[i] },
                { value: 100 * (1 - _this_1.angle_max), arc: arcs[i] },
            ];
        }));
        /** @type {?} */
        var pie = d3.pie()
            .sort(null)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            // console.log(d);
            return d["value"];
        }));
        // const test: any = [{ value : 80 }, { value : 0 }, { value : 20 }];
        // console.log(pie(test));
        // 빈 배경 라인바
        /** @type {?} */
        var empty_bg = this.svg.selectAll('.empty')
            .data(emptyPieData)
            .enter()
            .append('g').classed('empty', true)
            .attr('transform', "translate( " + this.width / 2 + ", " + this.height / 2 + " ) rotate(0)")
            .attr('fill-opacity', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) { return 2 / (i + 1); }));
        empty_bg.selectAll('path').data((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return pie(d); }))
            .enter()
            .append('path')
            .attr('d', (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.data.arc(d); }))
            .attr('fill', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) { return i === 0 ? _this_1.bg_color : 'none'; }));
        // 실제 데이터 바
        /** @type {?} */
        var g = this.svg.selectAll('.list')
            .data(pieData)
            .enter()
            .append('g').classed('list', true)
            .attr('transform', "translate( " + this.width / 2 + ", " + this.height / 2 + " ) rotate(0)")
            .attr('fill-opacity', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) { return 2 / (i + 1); }));
        g.selectAll('path').data((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return pie(d); }))
            .enter()
            .append('path')
            .attr('d', (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.data.arc(d); }))
            .attr('fill', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        function (d, i) { return i === 0 ? _this_1.line_color : 'none'; }));
        // 텍스트 부분 (데이터 값)
        this.svg.selectAll('.empty').each((/**
         * @param {?} d
         * @param {?} index
         * @param {?} _this
         * @return {?}
         */
        function (d, index, _this) {
            /** @type {?} */
            var el = d3.select(_this[index]);
            // console.log(el);
            el.selectAll('path').each((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) {
                if (i === 1) {
                    /** @type {?} */
                    var centroid = r["data"].arc.centroid({ startAngle: r["startAngle"] + 0.05, endAngle: r["startAngle"] + 0.001 + 0.05 });
                    /** @type {?} */
                    var title_centroid = r["data"].arc.centroid({ startAngle: 0, endAngle: 0 });
                    // console.log(`r=>`, r);
                    // console.log(`centroid1=>`, centroid);
                    // console.log(`centroid2=>`, centroid2);
                    // 비처리 전처리 항목의 제목 텍스트
                    g.append('text')
                        .text((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) {
                        return "" + _this_1.sampleTitleKr[index];
                    }))
                        .attr('transform', "translate(" + (title_centroid[0] - 5) + "," + title_centroid[1] + ")") // 똑바로 서있는 텍스트
                        .attr('alignment-baseline', "middle")
                        .attr('text-anchor', "end");
                    // 각 항목 값 텍스트 20%, 50%
                    g.append('text')
                        .text((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) {
                        return _this_1.sampleData[index] + "%";
                    }))
                        // .attr('transform', `translate(${centroid[0]},${centroid[1]}) rotate(${180 / Math.PI * (r[`startAngle`]) + 7})`)  // 바에 맞추어서 회전되어있는 텍스트
                        .attr('transform', "translate(" + (centroid[0] - 15) + "," + (centroid[1] - 5) + ")") // 똑바로 서있는 텍스트
                        .attr('alignment-baseline', "middle");
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
    };
    NgxMultiGaugeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'NgxMultiGauge',
                    template: "<div class=\"chart_container\">\r\n  <div class=\"chart1\" #chart1></div>\r\n  <div class=\"circle_text\" >\r\n    <div *ngFor = \"let list of rawData\"> {{list['title_kr']}} : {{list['value']}} </div>\r\n    <div>\uC885\uD569 : {{ totalValue }} </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [".chart_container{width:500px;height:500px;--border:1px solid #ddd;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:relative;font-size:14px}.chart_container .chart1{display:-webkit-box;display:flex}.chart_container .circle_text{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:absolute;font-size:.8em;font-weight:700}"]
                }] }
    ];
    /** @nocollapse */
    NgxMultiGaugeComponent.ctorParameters = function () { return []; };
    NgxMultiGaugeComponent.propDecorators = {
        CHART1: [{ type: ViewChild, args: ['chart1',] }],
        rawData: [{ type: Input }]
    };
    return NgxMultiGaugeComponent;
}());
export { NgxMultiGaugeComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1nYXVnZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUd6QjtJQVNFO1FBRVMsWUFBTyxHQUFHLENBQUUsRUFBRSxRQUFRLEVBQUcsUUFBUSxFQUFHLFFBQVEsRUFBRyxLQUFLLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFHLFNBQVMsRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFFLEtBQUssRUFBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJJLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsZUFBVSxHQUFNLENBQUMsQ0FBQztRQUVsQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNiLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixXQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLGNBQWM7O1FBRWhDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0I7O1FBQ2hELGVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFFLE1BQU07O1FBQ3RDLHVCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFD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LFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDO2FBQ25CLElBQUksQ0FBQyxrQkFBa0IsRUFBQyxHQUFHLENBQUM7YUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUc1QixDQUFDOztnQkF6TEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixrU0FBK0M7O2lCQUVoRDs7Ozs7eUJBR0UsU0FBUyxTQUFDLFFBQVE7MEJBSWxCLEtBQUs7O0lBK0tSLDZCQUFDO0NBQUEsQUExTEQsSUEwTEM7U0FyTFksc0JBQXNCOzs7SUFFakMsd0NBQTZDOztJQUk3Qyx5Q0FBcUk7O0lBRXJJLCtDQUFtQjs7SUFDbkIsK0NBQW1COztJQUNuQiw0Q0FBbUI7O0lBQ25CLDRDQUFrQjs7SUFFbEIsdUNBQVk7O0lBQ1osd0NBQWE7O0lBQ2IsMENBQXFCOztJQUNyQiw0Q0FBdUI7O0lBQ3ZCLHdDQUF5Qjs7SUFDekIsMkNBQWlCOztJQUVqQiw2Q0FBK0I7O0lBQy9CLDRDQUE4Qjs7SUFDOUIsb0RBQXNDOztJQUd0QyxxQ0FBUzs7SUFDVCxxQ0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ05neE11bHRpR2F1Z2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5zdHlsJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4TXVsdGlHYXVnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQFZpZXdDaGlsZCgnY2hhcnQxJykgQ0hBUlQxOiBFbGVtZW50UmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBASW5wdXQoKSByYXdEYXRhID0gWyB7IHRpdGxlX2VuIDogJ3ByZVBybycgLCB0aXRsZV9rciA6ICfsoITsspjrpqwnLCB2YWx1ZSA6IDg3IH0sIHsgdGl0bGVfZW4gOiAnY2FudFBybycsIHRpdGxlX2tyIDogJ+u5hOyymOumrCcsIHZhbHVlIDogOTEgfV07XG5cbiAgc2FtcGxlVGl0bGVFbiA9IFtdO1xuICBzYW1wbGVUaXRsZUtyID0gW107XG4gIHNhbXBsZURhdGEgICAgPSBbXTtcbiAgdG90YWxWYWx1ZSAgICA9IDA7XG5cbiAgd2lkdGggPSA1MDA7XG4gIGhlaWdodCA9IDUwMDtcbiAgYmdfY29sb3IgPSBcIiNFNUU1RTVcIjtcbiAgbGluZV9jb2xvciA9IFwiIzAwNEM5MFwiO1xuICByYWRpdXMgPSB0aGlzLmhlaWdodCAvIDI7XG4gIGFuZ2xlX21heCA9IDAuNzU7IC8vIDEwMCXsnZgg6riw7KSAIOq4uOydtFxuXG4gIGxpc3RfbWFyZ2luID0gdGhpcy5oZWlnaHQgLyAxNjsgLy8g7ZWt66qp6rO8IO2VreuqqSDsgqzsnbTsnZgg6rGw66asXG4gIGxpbmVfd2lkdGggPSB0aGlzLmhlaWdodCAvIDUwOyAgLy8g7ISg64ST7J20XG4gIGNlbnRlcl9jaXJjbGVfc2l6ZSA9IHRoaXMuaGVpZ2h0IC8gMTA7IC8vIOqwgOyatOuNsCDqtazrqY0g7YGs6riwXG5cblxuICBzdmc6IGFueTtcbiAgcGllOiBhbnk7XG5cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIC8vIOyDgeychCDsu7Ttj6zrhIztirjsl5AgaW5wdXTrjbDsnbTthLDqsIAg7J6I64qU7KeAIO2ZleyduFxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmF3RGF0YSk7XG5cbiAgICAvLyDrsJvsnYAg642w7J207YSw66W8IOqwgSDrtoDrtoTsnLzroZwg64KY64iE7Ja07KSMXG4gICAgdGhpcy5yYXdEYXRhLm1hcCggdiA9PiB7XG4gICAgICB0aGlzLnNhbXBsZVRpdGxlRW4ucHVzaCh2LnRpdGxlX2VuKTtcbiAgICAgIHRoaXMuc2FtcGxlVGl0bGVLci5wdXNoKHYudGl0bGVfa3IpO1xuICAgICAgdGhpcy5zYW1wbGVEYXRhLnB1c2godi52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICAvLyDsooXtlakg642w7J207YSwXG4gICAgdGhpcy50b3RhbFZhbHVlID0gMDtcbiAgICB0aGlzLnNhbXBsZURhdGEubWFwKHYgPT4ge1xuICAgICAgdGhpcy50b3RhbFZhbHVlICs9IHY7XG4gICAgfSk7XG5cbiAgICBjb25zdCBfQ0hBUlQgPSAgdGhpcy5DSEFSVDEubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuc3ZnID0gZDMuc2VsZWN0KF9DSEFSVClcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAg7LCo7Yq467aA67aEICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4gICAgY29uc3QgYXJjcyA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKHYsIGkpID0+IHtcbiAgICAgIGNvbnN0IGlubmVyX2NhbGMgPSB0aGlzLmNlbnRlcl9jaXJjbGVfc2l6ZSArICggaSAqIHRoaXMubGlzdF9tYXJnaW4gKyAoKGkgLSAxKSAqIHRoaXMubGluZV93aWR0aCApICsgKHRoaXMubGlzdF9tYXJnaW4gKyB0aGlzLmxpbmVfd2lkdGgpICk7IC8vIGkgeCDrp4jsp4QgKyAoIChpLTEpIHgg7ISg64ST7J20ICkgKyAo66eI7KeEK+yEoOuEk+ydtClcbiAgICAgIGNvbnN0IG91dGVyX2NhbGMgPSBpbm5lcl9jYWxjICsgdGhpcy5saW5lX3dpZHRoO1xuXG4gICAgICByZXR1cm4gZDMuYXJjKClcbiAgICAgICAgLmlubmVyUmFkaXVzKCBpbm5lcl9jYWxjIClcbiAgICAgICAgLm91dGVyUmFkaXVzKCBvdXRlcl9jYWxjIClcbiAgICAgICAgLmNvcm5lclJhZGl1cyh0aGlzLmxpbmVfd2lkdGgpXG4gICAgICAgIC5wYWRBbmdsZSguMDcpXG4gICAgICAgIC5wYWRSYWRpdXMoMTAwKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVtcHR5UGllRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKHYsIGkpID0+IHtcbiAgICAgIHYgPSAxMDA7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7dmFsdWU6IHYgKiB0aGlzLmFuZ2xlX21heCAgICAgICAgLCBhcmMgOiBhcmNzW2ldfSwgICAvLyB2YWx1ZVxuICAgICAgICB7dmFsdWU6ICgxMDAgLSB2KSAqIHRoaXMuYW5nbGVfbWF4LCBhcmMgOiBhcmNzW2ldfSwgICAvLyDrgpjrqLjsp4BcbiAgICAgICAge3ZhbHVlOiAxMDAgKiAoMSAtIHRoaXMuYW5nbGVfbWF4KSwgYXJjIDogYXJjc1tpXX0sICAgLy8g67mI6rOzXG4gICAgICBdO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGllRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKHYsIGkpID0+IHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHt2YWx1ZTogdiAqIHRoaXMuYW5nbGVfbWF4ICAgICAgICAsIGFyYyA6IGFyY3NbaV19LCAgIC8vIHZhbHVlXG4gICAgICAgIHt2YWx1ZTogKDEwMCAtIHYpICogdGhpcy5hbmdsZV9tYXgsIGFyYyA6IGFyY3NbaV19LCAgIC8vIOuCmOuouOyngFxuICAgICAgICB7dmFsdWU6IDEwMCAqICgxIC0gdGhpcy5hbmdsZV9tYXgpLCBhcmMgOiBhcmNzW2ldfSwgICAvLyDruYjqs7NcbiAgICAgIF07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwaWUgPSBkMy5waWUoKVxuICAgICAgLnNvcnQobnVsbClcbiAgICAgIC52YWx1ZShkID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZCk7XG4gICAgICAgIHJldHVybiBkW2B2YWx1ZWBdO1xuICAgICAgfSk7XG5cblxuICAgIC8vIGNvbnN0IHRlc3Q6IGFueSA9IFt7IHZhbHVlIDogODAgfSwgeyB2YWx1ZSA6IDAgfSwgeyB2YWx1ZSA6IDIwIH1dO1xuICAgIC8vIGNvbnNvbGUubG9nKHBpZSh0ZXN0KSk7XG5cbiAgICAvLyDruYgg67Cw6rK9IOudvOyduOuwlFxuICAgIGNvbnN0IGVtcHR5X2JnID0gdGhpcy5zdmcuc2VsZWN0QWxsKCcuZW1wdHknKVxuICAgICAgLmRhdGEoZW1wdHlQaWVEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdlbXB0eScsIHRydWUpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSggJHsgdGhpcy53aWR0aCAvIDIgfSwgJHsgdGhpcy5oZWlnaHQgLyAyIH0gKSByb3RhdGUoMClgIClcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAoZCwgaSkgPT4gMiAvIChpICsgMSkpO1xuXG4gICAgZW1wdHlfYmcuc2VsZWN0QWxsKCdwYXRoJykuZGF0YShkID0+IHsgcmV0dXJuIHBpZShkKTsgfSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdkJywgZCA9PiBkLmRhdGEuYXJjKGQpIClcbiAgICAgIC5hdHRyKCdmaWxsJywgKGQsIGkpID0+IGkgPT09IDAgPyB0aGlzLmJnX2NvbG9yIDogJ25vbmUnICk7XG5cblxuXG4gICAgLy8g7Iuk7KCcIOuNsOydtO2EsCDrsJRcbiAgICBjb25zdCBnID0gdGhpcy5zdmcuc2VsZWN0QWxsKCcubGlzdCcpXG4gICAgICAuZGF0YShwaWVEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdsaXN0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCAkeyB0aGlzLndpZHRoIC8gMiB9LCAkeyB0aGlzLmhlaWdodCAvIDIgfSApIHJvdGF0ZSgwKWAgKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIChkLCBpKSA9PiAyIC8gKGkgKyAxKSk7XG5cbiAgICBnLnNlbGVjdEFsbCgncGF0aCcpLmRhdGEoZCA9PiB7IHJldHVybiBwaWUoZCk7IH0pXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignZCcsIGQgPT4gZC5kYXRhLmFyYyhkKSApXG4gICAgICAuYXR0cignZmlsbCcsIChkLCBpKSA9PiBpID09PSAwID8gdGhpcy5saW5lX2NvbG9yIDogJ25vbmUnICk7XG5cblxuXG4gICAgLy8g7YWN7Iqk7Yq4IOu2gOu2hCAo642w7J207YSwIOqwkilcbiAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoJy5lbXB0eScpLmVhY2goIChkLCBpbmRleCwgX3RoaXMpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZDMuc2VsZWN0KF90aGlzW2luZGV4XSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlbCk7XG4gICAgICBlbC5zZWxlY3RBbGwoJ3BhdGgnKS5lYWNoKChyLCBpKSA9PiB7XG4gICAgICAgIGlmKCBpID09PSAxICkge1xuICAgICAgICAgIGNvbnN0IGNlbnRyb2lkICA9IHJbYGRhdGFgXS5hcmMuY2VudHJvaWQoeyBzdGFydEFuZ2xlOiByW2BzdGFydEFuZ2xlYF0gKyAwLjA1LCBlbmRBbmdsZSA6IHJbYHN0YXJ0QW5nbGVgXSArIDAuMDAxICsgMC4wNSB9KTtcbiAgICAgICAgICBjb25zdCB0aXRsZV9jZW50cm9pZCA9IHJbYGRhdGFgXS5hcmMuY2VudHJvaWQoeyBzdGFydEFuZ2xlOiAwLCBlbmRBbmdsZSA6IDAgfSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYHI9PmAsIHIpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBjZW50cm9pZDE9PmAsIGNlbnRyb2lkKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgY2VudHJvaWQyPT5gLCBjZW50cm9pZDIpO1xuXG4gICAgICAgICAgLy8g67mE7LKY66asIOyghOyymOumrCDtla3rqqnsnZgg7KCc66qpIO2FjeyKpO2KuFxuICAgICAgICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC50ZXh0KCAodikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYCR7IHRoaXMuc2FtcGxlVGl0bGVLcltpbmRleF0gfWA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt0aXRsZV9jZW50cm9pZFswXSAtIDUgfSwke3RpdGxlX2NlbnRyb2lkWzFdfSlgKSAgLy8g65iR67CU66GcIOyEnOyeiOuKlCDthY3siqTtirhcbiAgICAgICAgICAgIC5hdHRyKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCBgbWlkZGxlYClcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsIGBlbmRgKTtcblxuICAgICAgICAgIC8vIOqwgSDtla3rqqkg6rCSIO2FjeyKpO2KuCAyMCUsIDUwJVxuICAgICAgICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgIC50ZXh0KCAodikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYCR7IHRoaXMuc2FtcGxlRGF0YVtpbmRleF0gfSVgO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7Y2VudHJvaWRbMF19LCR7Y2VudHJvaWRbMV19KSByb3RhdGUoJHsxODAgLyBNYXRoLlBJICogKHJbYHN0YXJ0QW5nbGVgXSkgKyA3fSlgKSAgLy8g67CU7JeQIOunnuy2lOyWtOyEnCDtmozsoITrkJjslrTsnojripQg7YWN7Iqk7Yq4XG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke2NlbnRyb2lkWzBdIC0gMTV9LCR7Y2VudHJvaWRbMV0gLSA1IH0pYCkgIC8vIOuYkeuwlOuhnCDshJzsnojripQg7YWN7Iqk7Yq4XG4gICAgICAgICAgICAuYXR0cignYWxpZ25tZW50LWJhc2VsaW5lJywgYG1pZGRsZWApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSk7XG5cblxuXG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICDqsIDsmrTrjbAg7JuQIOu2gOu2hCAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuICAgIHRoaXMuc3ZnLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgIC5kYXRhKHRoaXMucmF3RGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgLmF0dHIoJ2N4Jyx0aGlzLndpZHRoIC8gMilcbiAgICAgIC5hdHRyKCdjeScsdGhpcy5oZWlnaHQgLyAyKVxuICAgICAgLmF0dHIoJ3InLHRoaXMucmFkaXVzIC8gNC41KVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIHRoaXMuYmdfY29sb3IpXG4gICAgICAuYXR0cignZmlsbCcsJ25vbmUnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCczJylcbiAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLDIpO1xuXG5cbiAgfVxufVxuIl19