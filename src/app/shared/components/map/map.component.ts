import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import Map from "ol/Map.js";
import View from "ol/View.js";
import * as olProj from "ol/proj";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import { Coords } from "../../../models/country";

@Component({
    selector: "app-map",
    imports: [],
    templateUrl: "./map.component.html",
    styleUrl: "./map.component.scss",
})
export class MapComponent implements AfterViewInit {
    @Input() location: Coords;
    @ViewChild("map") mapContainer: ElementRef;
    map: Map;

    ngAfterViewInit(): void {
        this.map = new Map({
            target: this.mapContainer.nativeElement,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                zoom: 5,
                center: olProj.fromLonLat([
                    this.location.longitude,
                    this.location.latitude,
                ]),
            }),
        });
    }
}
