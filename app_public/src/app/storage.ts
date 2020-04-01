import { InjectionToken } from '@angular/core';

export const BrowserStorage = new InjectionToken<Storage>('Browser Storage',{
    providedIn: 'root',
    factory: () => localStorage
});
