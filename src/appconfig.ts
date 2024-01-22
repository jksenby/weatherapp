import { provideRouter } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import {appRoutes} from "./appRoutes"

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes)]
}