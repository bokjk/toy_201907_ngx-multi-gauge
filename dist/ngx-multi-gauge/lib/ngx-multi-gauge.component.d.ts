import { OnInit, ElementRef } from '@angular/core';
export declare class NgxMultiGaugeComponent implements OnInit {
    CHART1: ElementRef<any>;
    constructor();
    rawData: {
        data_name: string;
        title: string;
        value: number;
    }[];
    sampleDataName: any[];
    sampleTitle: any[];
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
