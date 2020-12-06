import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  constructor() { }

  getPlatform() {
    console.log(navigator.platform);
    return navigator.platform;
  }
}
