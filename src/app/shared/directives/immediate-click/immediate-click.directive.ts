import { Directive, ElementRef, OnInit } from '@angular/core';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(private el: ElementRef<any>, private platformDetector: PlatformDetectorService) { }

  ngOnInit(): void {
    this.platformDetector.isPlaformBrowser &&
      this.el.nativeElement.click();
  }
}
