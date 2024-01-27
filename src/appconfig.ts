import { provideRouter } from "@angular/router";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { appRoutes } from "./appRoutes";
import { AngularYandexMapsModule, YaConfig } from "angular8-yandex-maps";
import { provideAnimations } from "@angular/platform-browser/animations";

const mapConfig: YaConfig = {
  apikey: "cd3af09d-12bb-4f94-afc1-66f70598c033",
  lang: "en_US",
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(AngularYandexMapsModule.forRoot(mapConfig)),
    provideAnimations(),
    provideAnimations()
],
};
