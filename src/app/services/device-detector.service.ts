import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {

  constructor() { }

  isMobile(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
    return mobileKeywords.some(keyword => userAgent.includes(keyword));
  }
}
