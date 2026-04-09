import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TourService } from "../../services/tour.service";
import { ITour, IToursData, TourTypes } from "../../models/tour";
import { TourCardComponent } from "./tour-card/tour-card.component";
import { HighlightActiveDirective } from "../../shared/directives/highlight-active.directive";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { debounceTime, fromEvent, Subscription } from "rxjs";

@Component({
    selector: "app-tours",
    imports: [
        MatCardModule,
        TourCardComponent,
        HighlightActiveDirective,
        NgIf,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: "./tours.component.html",
    styleUrl: "./tours.component.scss",
})
export class ToursComponent implements OnInit, AfterViewInit, OnDestroy {
    private tourService = inject(TourService);
    private router = inject(Router);

    @ViewChild(HighlightActiveDirective)
    higlightActiveDirective: HighlightActiveDirective;
    @ViewChild("inputSearch")
    inputSearch: ElementRef;

    allTours: ITour[];
    renderedTours: ITour[];
    typeTourFilter: TourTypes = null;
    searchRegexp: RegExp = null;
    dateFilter: Date = null;

    subscriptions: Subscription[];

    ngOnInit(): void {
        this.tourService.getTours().subscribe((data: IToursData) => {
            this.allTours = data.tours;
            this.renderedTours = [...this.allTours];
        });

        const typeSubscription = this.tourService.tourType$.subscribe((type: TourTypes) => {
            this.typeTourFilter = type;
            this.initTourFilterLogic();
        });

        const dateSubscription = this.tourService.tourDate$.subscribe((date: Date) => {
            this.dateFilter = date;
            this.initTourFilterLogic();
        })
        this.subscriptions.push(typeSubscription, dateSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    

    initTourFilterLogic(): void {
        const filteredTours = [...this.allTours].filter((tour) => {
            let isValid;
            let isNameValid = true;
            let isTypeValid = this.typeTourFilter === 'all' || !this.typeTourFilter;
            let isDateValid = true;

            const tourTypeMapping = {
                group: "multi",
                single: "single",
            };

            if (this.searchRegexp) {
                isNameValid = this.searchRegexp.test(tour.name);
            }

            if (this.typeTourFilter !== 'all' && this.typeTourFilter) {
                isTypeValid = tour.type as TourTypes === tourTypeMapping[this.typeTourFilter];
            }

            if (this.dateFilter) {
                const tourDate = new Date(tour.date);
                isDateValid = this.dateFilter.setHours(0,0,0,0) === tourDate.setHours(0,0,0,0);
            }

            isValid = isNameValid && isTypeValid && isDateValid;

            return isValid;
        });

        this.renderedTours = [...filteredTours];
        this.updateView();
    }

    ngAfterViewInit(): void {
        fromEvent<InputEvent>(this.inputSearch.nativeElement, "input")
            .pipe(debounceTime(300))
            .subscribe((inputEv) => {
                this.searchTours(inputEv);
            });
    }

    searchTours(e: InputEvent): void {
        const searchValue = (e.target as HTMLInputElement).value.trim();
        this.searchRegexp = new RegExp(searchValue, "i");

        this.initTourFilterLogic();
    }

    updateView(): void {
        setTimeout(() => this.higlightActiveDirective.initItems(), 10);
    }

    onEnter(e: { el: HTMLElement; index: number }): void {
        const { el } = e;
        const tourId = el.getAttribute("data-tour-id");

        if (tourId) {
            this.router.navigate([`tour/${tourId}`]);
        }
    }
}
