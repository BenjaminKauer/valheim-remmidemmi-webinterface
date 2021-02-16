import { Component, OnInit } from '@angular/core';
import { ControlService } from '../control.service';


@Component({
    selector: 'app-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

    constructor(private ctrlService: ControlService) { }

    ngOnInit(): void {
    }

    start(): void {
        this.ctrlService.start();
    }
    stop(): void {
        this.ctrlService.stop();
    }
    update(): void {
        this.ctrlService.update();
    }

}
