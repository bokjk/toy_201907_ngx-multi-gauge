/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
var NgxMultiGaugeComponent = /** @class */ (function () {
    function NgxMultiGaugeComponent() {
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
            _this_1.sampleDataName.push(v.data_name);
            _this_1.sampleTitle.push(v.title);
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
                        return "" + _this_1.sampleTitle[index];
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
                    template: "<div class=\"chart_container\">\r\n  <div class=\"chart1\" #chart1></div>\r\n  <div class=\"circle_text\" >\r\n    <div *ngFor = \"let list of rawData\"> {{list['title']}} : {{list['value']}} </div>\r\n    <div>\uC885\uD569 : {{ totalValue }} </div>\r\n  </div>\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1nYXVnZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbXVsdGktZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUd6QjtJQVNFO1FBRVMsWUFBTyxHQUFHLENBQUUsRUFBRSxTQUFTLEVBQUcsUUFBUSxFQUFHLEtBQUssRUFBRyxLQUFLLEVBQUUsS0FBSyxFQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFHLFNBQVMsRUFBRSxLQUFLLEVBQUcsS0FBSyxFQUFFLEtBQUssRUFBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpJLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsZUFBVSxHQUFNLENBQUMsQ0FBQztRQUVsQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNiLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixXQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekIsY0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLGNBQWM7O1FBRWhDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0I7O1FBQ2hELGVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFFLE1BQU07O1FBQ3RDLHVCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFD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LFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDO2FBQ25CLElBQUksQ0FBQyxrQkFBa0IsRUFBQyxHQUFHLENBQUM7YUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUc1QixDQUFDOztnQkF6TEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QiwrUkFBK0M7O2lCQUVoRDs7Ozs7eUJBR0UsU0FBUyxTQUFDLFFBQVE7MEJBSWxCLEtBQUs7O0lBK0tSLDZCQUFDO0NBQUEsQUExTEQsSUEwTEM7U0FyTFksc0JBQXNCOzs7SUFFakMsd0NBQTZDOztJQUk3Qyx5Q0FBaUk7O0lBRWpJLGdEQUFvQjs7SUFDcEIsNkNBQWlCOztJQUNqQiw0Q0FBbUI7O0lBQ25CLDRDQUFrQjs7SUFFbEIsdUNBQVk7O0lBQ1osd0NBQWE7O0lBQ2IsMENBQXFCOztJQUNyQiw0Q0FBdUI7O0lBQ3ZCLHdDQUF5Qjs7SUFDekIsMkNBQWlCOztJQUVqQiw2Q0FBK0I7O0lBQy9CLDRDQUE4Qjs7SUFDOUIsb0RBQXNDOztJQUd0QyxxQ0FBUzs7SUFDVCxxQ0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ05neE11bHRpR2F1Z2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LW11bHRpLWdhdWdlLmNvbXBvbmVudC5zdHlsJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4TXVsdGlHYXVnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQFZpZXdDaGlsZCgnY2hhcnQxJykgQ0hBUlQxOiBFbGVtZW50UmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBASW5wdXQoKSByYXdEYXRhID0gWyB7IGRhdGFfbmFtZSA6ICdwcmVQcm8nICwgdGl0bGUgOiAn7KCE7LKY66asJywgdmFsdWUgOiA4NyB9LCB7IGRhdGFfbmFtZSA6ICdjYW50UHJvJywgdGl0bGUgOiAn67mE7LKY66asJywgdmFsdWUgOiA5MSB9XTtcblxuICBzYW1wbGVEYXRhTmFtZSA9IFtdO1xuICBzYW1wbGVUaXRsZSA9IFtdO1xuICBzYW1wbGVEYXRhICAgID0gW107XG4gIHRvdGFsVmFsdWUgICAgPSAwO1xuXG4gIHdpZHRoID0gNTAwO1xuICBoZWlnaHQgPSA1MDA7XG4gIGJnX2NvbG9yID0gXCIjRTVFNUU1XCI7XG4gIGxpbmVfY29sb3IgPSBcIiMwMDRDOTBcIjtcbiAgcmFkaXVzID0gdGhpcy5oZWlnaHQgLyAyO1xuICBhbmdsZV9tYXggPSAwLjc1OyAvLyAxMDAl7J2YIOq4sOykgCDquLjsnbRcblxuICBsaXN0X21hcmdpbiA9IHRoaXMuaGVpZ2h0IC8gMTY7IC8vIO2VreuqqeqzvCDtla3rqqkg7IKs7J207J2YIOqxsOumrFxuICBsaW5lX3dpZHRoID0gdGhpcy5oZWlnaHQgLyA1MDsgIC8vIOyEoOuEk+ydtFxuICBjZW50ZXJfY2lyY2xlX3NpemUgPSB0aGlzLmhlaWdodCAvIDEwOyAvLyDqsIDsmrTrjbAg6rWs66mNIO2BrOq4sFxuXG5cbiAgc3ZnOiBhbnk7XG4gIHBpZTogYW55O1xuXG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICAvLyDsg4HsnIQg7Lu07Y+s64SM7Yq47JeQIGlucHV0642w7J207YSw6rCAIOyeiOuKlOyngCDtmZXsnbhcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJhd0RhdGEpO1xuXG4gICAgLy8g67Cb7J2AIOuNsOydtO2EsOulvCDqsIEg67aA67aE7Jy866GcIOuCmOuIhOyWtOykjFxuICAgIHRoaXMucmF3RGF0YS5tYXAoIHYgPT4ge1xuICAgICAgdGhpcy5zYW1wbGVEYXRhTmFtZS5wdXNoKHYuZGF0YV9uYW1lKTtcbiAgICAgIHRoaXMuc2FtcGxlVGl0bGUucHVzaCh2LnRpdGxlKTtcbiAgICAgIHRoaXMuc2FtcGxlRGF0YS5wdXNoKHYudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgLy8g7KKF7ZWpIOuNsOydtO2EsFxuICAgIHRoaXMudG90YWxWYWx1ZSA9IDA7XG4gICAgdGhpcy5zYW1wbGVEYXRhLm1hcCh2ID0+IHtcbiAgICAgIHRoaXMudG90YWxWYWx1ZSArPSB2O1xuICAgIH0pO1xuXG4gICAgY29uc3QgX0NIQVJUID0gIHRoaXMuQ0hBUlQxLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnN2ZyA9IGQzLnNlbGVjdChfQ0hBUlQpXG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XG5cblxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogIOywqO2KuOu2gOu2hCAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuICAgIGNvbnN0IGFyY3MgPSB0aGlzLnNhbXBsZURhdGEubWFwKCh2LCBpKSA9PiB7XG4gICAgICBjb25zdCBpbm5lcl9jYWxjID0gdGhpcy5jZW50ZXJfY2lyY2xlX3NpemUgKyAoIGkgKiB0aGlzLmxpc3RfbWFyZ2luICsgKChpIC0gMSkgKiB0aGlzLmxpbmVfd2lkdGggKSArICh0aGlzLmxpc3RfbWFyZ2luICsgdGhpcy5saW5lX3dpZHRoKSApOyAvLyBpIHgg66eI7KeEICsgKCAoaS0xKSB4IOyEoOuEk+ydtCApICsgKOuniOynhCvshKDrhJPsnbQpXG4gICAgICBjb25zdCBvdXRlcl9jYWxjID0gaW5uZXJfY2FsYyArIHRoaXMubGluZV93aWR0aDtcblxuICAgICAgcmV0dXJuIGQzLmFyYygpXG4gICAgICAgIC5pbm5lclJhZGl1cyggaW5uZXJfY2FsYyApXG4gICAgICAgIC5vdXRlclJhZGl1cyggb3V0ZXJfY2FsYyApXG4gICAgICAgIC5jb3JuZXJSYWRpdXModGhpcy5saW5lX3dpZHRoKVxuICAgICAgICAucGFkQW5nbGUoLjA3KVxuICAgICAgICAucGFkUmFkaXVzKDEwMCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbXB0eVBpZURhdGEgPSB0aGlzLnNhbXBsZURhdGEubWFwKCh2LCBpKSA9PiB7XG4gICAgICB2ID0gMTAwO1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAge3ZhbHVlOiB2ICogdGhpcy5hbmdsZV9tYXggICAgICAgICwgYXJjIDogYXJjc1tpXX0sICAgLy8gdmFsdWVcbiAgICAgICAge3ZhbHVlOiAoMTAwIC0gdikgKiB0aGlzLmFuZ2xlX21heCwgYXJjIDogYXJjc1tpXX0sICAgLy8g64KY66i47KeAXG4gICAgICAgIHt2YWx1ZTogMTAwICogKDEgLSB0aGlzLmFuZ2xlX21heCksIGFyYyA6IGFyY3NbaV19LCAgIC8vIOu5iOqzs1xuICAgICAgXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBpZURhdGEgPSB0aGlzLnNhbXBsZURhdGEubWFwKCh2LCBpKSA9PiB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7dmFsdWU6IHYgKiB0aGlzLmFuZ2xlX21heCAgICAgICAgLCBhcmMgOiBhcmNzW2ldfSwgICAvLyB2YWx1ZVxuICAgICAgICB7dmFsdWU6ICgxMDAgLSB2KSAqIHRoaXMuYW5nbGVfbWF4LCBhcmMgOiBhcmNzW2ldfSwgICAvLyDrgpjrqLjsp4BcbiAgICAgICAge3ZhbHVlOiAxMDAgKiAoMSAtIHRoaXMuYW5nbGVfbWF4KSwgYXJjIDogYXJjc1tpXX0sICAgLy8g67mI6rOzXG4gICAgICBdO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGllID0gZDMucGllKClcbiAgICAgIC5zb3J0KG51bGwpXG4gICAgICAudmFsdWUoZCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICByZXR1cm4gZFtgdmFsdWVgXTtcbiAgICAgIH0pO1xuXG5cbiAgICAvLyBjb25zdCB0ZXN0OiBhbnkgPSBbeyB2YWx1ZSA6IDgwIH0sIHsgdmFsdWUgOiAwIH0sIHsgdmFsdWUgOiAyMCB9XTtcbiAgICAvLyBjb25zb2xlLmxvZyhwaWUodGVzdCkpO1xuXG4gICAgLy8g67mIIOuwsOqyvSDrnbzsnbjrsJRcbiAgICBjb25zdCBlbXB0eV9iZyA9IHRoaXMuc3ZnLnNlbGVjdEFsbCgnLmVtcHR5JylcbiAgICAgIC5kYXRhKGVtcHR5UGllRGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdnJykuY2xhc3NlZCgnZW1wdHknLCB0cnVlKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoICR7IHRoaXMud2lkdGggLyAyIH0sICR7IHRoaXMuaGVpZ2h0IC8gMiB9ICkgcm90YXRlKDApYCApXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgKGQsIGkpID0+IDIgLyAoaSArIDEpKTtcblxuICAgIGVtcHR5X2JnLnNlbGVjdEFsbCgncGF0aCcpLmRhdGEoZCA9PiB7IHJldHVybiBwaWUoZCk7IH0pXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignZCcsIGQgPT4gZC5kYXRhLmFyYyhkKSApXG4gICAgICAuYXR0cignZmlsbCcsIChkLCBpKSA9PiBpID09PSAwID8gdGhpcy5iZ19jb2xvciA6ICdub25lJyApO1xuXG5cblxuICAgIC8vIOyLpOygnCDrjbDsnbTthLAg67CUXG4gICAgY29uc3QgZyA9IHRoaXMuc3ZnLnNlbGVjdEFsbCgnLmxpc3QnKVxuICAgICAgLmRhdGEocGllRGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdnJykuY2xhc3NlZCgnbGlzdCcsIHRydWUpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSggJHsgdGhpcy53aWR0aCAvIDIgfSwgJHsgdGhpcy5oZWlnaHQgLyAyIH0gKSByb3RhdGUoMClgIClcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAoZCwgaSkgPT4gMiAvIChpICsgMSkpO1xuXG4gICAgZy5zZWxlY3RBbGwoJ3BhdGgnKS5kYXRhKGQgPT4geyByZXR1cm4gcGllKGQpOyB9KVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IGQuZGF0YS5hcmMoZCkgKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCwgaSkgPT4gaSA9PT0gMCA/IHRoaXMubGluZV9jb2xvciA6ICdub25lJyApO1xuXG5cblxuICAgIC8vIO2FjeyKpO2KuCDrtoDrtoQgKOuNsOydtO2EsCDqsJIpXG4gICAgdGhpcy5zdmcuc2VsZWN0QWxsKCcuZW1wdHknKS5lYWNoKCAoZCwgaW5kZXgsIF90aGlzKSA9PiB7XG4gICAgICBjb25zdCBlbCA9IGQzLnNlbGVjdChfdGhpc1tpbmRleF0pO1xuICAgICAgLy8gY29uc29sZS5sb2coZWwpO1xuICAgICAgZWwuc2VsZWN0QWxsKCdwYXRoJykuZWFjaCgociwgaSkgPT4ge1xuICAgICAgICBpZiggaSA9PT0gMSApIHtcbiAgICAgICAgICBjb25zdCBjZW50cm9pZCAgPSByW2BkYXRhYF0uYXJjLmNlbnRyb2lkKHsgc3RhcnRBbmdsZTogcltgc3RhcnRBbmdsZWBdICsgMC4wNSwgZW5kQW5nbGUgOiByW2BzdGFydEFuZ2xlYF0gKyAwLjAwMSArIDAuMDUgfSk7XG4gICAgICAgICAgY29uc3QgdGl0bGVfY2VudHJvaWQgPSByW2BkYXRhYF0uYXJjLmNlbnRyb2lkKHsgc3RhcnRBbmdsZTogMCwgZW5kQW5nbGUgOiAwIH0pO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGByPT5gLCByKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgY2VudHJvaWQxPT5gLCBjZW50cm9pZCk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYGNlbnRyb2lkMj0+YCwgY2VudHJvaWQyKTtcblxuICAgICAgICAgIC8vIOu5hOyymOumrCDsoITsspjrpqwg7ZWt66qp7J2YIOygnOuqqSDthY3siqTtirhcbiAgICAgICAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAudGV4dCggKHYpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGAkeyB0aGlzLnNhbXBsZVRpdGxlW2luZGV4XSB9YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3RpdGxlX2NlbnRyb2lkWzBdIC0gNSB9LCR7dGl0bGVfY2VudHJvaWRbMV19KWApICAvLyDrmJHrsJTroZwg7ISc7J6I64qUIO2FjeyKpO2KuFxuICAgICAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsIGBtaWRkbGVgKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgYGVuZGApO1xuXG4gICAgICAgICAgLy8g6rCBIO2VreuqqSDqsJIg7YWN7Iqk7Yq4IDIwJSwgNTAlXG4gICAgICAgICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLnRleHQoICh2KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBgJHsgdGhpcy5zYW1wbGVEYXRhW2luZGV4XSB9JWA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHtjZW50cm9pZFswXX0sJHtjZW50cm9pZFsxXX0pIHJvdGF0ZSgkezE4MCAvIE1hdGguUEkgKiAocltgc3RhcnRBbmdsZWBdKSArIDd9KWApICAvLyDrsJTsl5Ag66ee7LaU7Ja07IScIO2ajOyghOuQmOyWtOyeiOuKlCDthY3siqTtirhcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7Y2VudHJvaWRbMF0gLSAxNX0sJHtjZW50cm9pZFsxXSAtIDUgfSlgKSAgLy8g65iR67CU66GcIOyEnOyeiOuKlCDthY3siqTtirhcbiAgICAgICAgICAgIC5hdHRyKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCBgbWlkZGxlYCk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9KTtcblxuXG5cblxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogIOqwgOyatOuNsCDsm5Ag67aA67aEICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4gICAgdGhpcy5zdmcuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgLmRhdGEodGhpcy5yYXdEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAuYXR0cignY3gnLHRoaXMud2lkdGggLyAyKVxuICAgICAgLmF0dHIoJ2N5Jyx0aGlzLmhlaWdodCAvIDIpXG4gICAgICAuYXR0cigncicsdGhpcy5yYWRpdXMgLyA0LjUpXG4gICAgICAuYXR0cignc3Ryb2tlJywgdGhpcy5iZ19jb2xvcilcbiAgICAgIC5hdHRyKCdmaWxsJywnbm9uZScpXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsJzMnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsMik7XG5cblxuICB9XG59XG4iXX0=