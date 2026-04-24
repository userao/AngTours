import { inject, Injectable } from "@angular/core";
import { TourApiService } from "./api/tour-api.service";
import { ITour, IToursData, TourTypes } from "../models/tour";
import {
    BehaviorSubject,
    catchError,
    delay,
    finalize,
    forkJoin,
    map,
    Observable,
    of,
    Subject,
    withLatestFrom,
} from "rxjs";
import { ICountry, ICountryWeather } from "../models/country";
import { LoaderService } from "./loader.service";
import { IOrder } from "../models/order";

@Injectable({
    providedIn: "root",
})
export class TourService {
    private toursApi = inject(TourApiService);
    private loaderService = inject(LoaderService);

    private tourTypeSubject = new Subject<TourTypes>();
    readonly tourType$ = this.tourTypeSubject.asObservable();

    private tourDateSubject = new Subject<Date>();
    readonly tourDate$ = this.tourDateSubject.asObservable();

    cart: ITour[] = [];
    private cartItemsSubject = new BehaviorSubject<ITour[]>(this.cart);
    readonly cartItems$ = this.cartItemsSubject.asObservable();

    tour: ITour;

    constructor() {
        const tourString = localStorage.getItem("orderedTour");
        if (tourString) {
            this.tour = JSON.parse(tourString);
        }
    }

    addTourToCart(tour: ITour): void {
        this.cart.push(tour);
        tour.inBasket = true;
        this.cartItemsSubject.next(this.cart);
    }

    removeTourFromCart(tourToRemove: ITour): void {
        const tourIndex = this.cart.findIndex(
            (tour) => tour.id === tourToRemove.id,
        );
        if (tourIndex > -1) {
            this.cart.splice(tourIndex, 1);
            tourToRemove.inBasket = false;
            this.cartItemsSubject.next(this.cart);
        }
    }

    getTours(): Observable<ITour[]> {
        const countries$ = this.toursApi.getCountries();
        const tours$ = this.toursApi.getTours();
        this.loaderService.setLoader(true);

        return forkJoin<[ICountry[], IToursData]>([countries$, tours$]).pipe(
            delay(1000),
            withLatestFrom(this.cartItems$),
            map(([data, cartItems]) => {
                const [countries, { tours }] = data;
                const countriesMap = new Map();
                const toursWithCountries = [] as ITour[];

                countries.forEach((country) =>
                    countriesMap.set(country.iso_code2, country),
                );

                if (Array.isArray(tours)) {
                    tours.forEach((tour) => {
                        let tourWithCountry: ITour;
                        const cartIndex = cartItems.findIndex(
                            (cartItem) => cartItem.id === tour.id,
                        );

                        if (cartIndex > -1) {
                            tourWithCountry = cartItems[cartIndex];
                        } else {
                            tourWithCountry = {
                                ...tour,
                                country: countriesMap.get(tour.code) || null,
                            };
                        }

                        toursWithCountries.push(tourWithCountry);
                    });
                }

                return toursWithCountries;
            }),
            catchError((err) => {
                console.log(err);
                return of([]);
            }),
            finalize(() => {
                this.loaderService.setLoader(false);
            }),
        );
    }

    getTour(id: string) {
        return this.toursApi.getTour(id);
    }

    setTourType(type: TourTypes): void {
        this.tourTypeSubject.next(type);
    }

    setTourDate(date: Date): void {
        this.tourDateSubject.next(date);
    }

    saveTour(tour: ITour) {
        this.tour = tour;
        localStorage.setItem("orderedTour", JSON.stringify(this.tour));
    }

    getSavedTour(): ITour {
        return this.tour;
    }

    getCountryByCode(name: string, code: string): Observable<ICountryWeather> {
        return this.toursApi.getCountryByCode(name, code);
    }

    placeOrder(order: IOrder): Observable<IOrder> {
        return this.toursApi.postOrder(order);
    }
}
