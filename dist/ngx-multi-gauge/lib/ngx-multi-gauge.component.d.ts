import { OnInit, ElementRef } from '@angular/core';
export declare class NgxMultiGaugeComponent implements OnInit {
    CHART1: ElementRef<any>;
    constructor();
    rawData: {
        title_en: string;
        title_kr: string;
        value: number;
    }[];
    sampleTitleEn: any[];
    sampleTitleKr: any[];
    sampleData: any[];
    totalValue: number;
    width: number;
    height: number;
    bg_color: string;
    line_color: string;
    radius: number;
    angle_max: number;
    list_margin: number;
    line_width: number;
    center_circle_size: number;
    svg: any;
    pie: any;
    ngOnInit(): void;
}
