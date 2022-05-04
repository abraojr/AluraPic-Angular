import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';


@Directive({
  selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  currentDisplay: string;

  constructor(private el: ElementRef<any>, private renderer: Renderer2, private userService: UserService) { }

  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.el.nativeElement).display;
    this.userService.getUser().subscribe({
      next: user => {
        if (user) {
          this.renderer.setStyle(this.el.nativeElement, 'display', this.currentDisplay);
        } else {
          this.currentDisplay = getComputedStyle(this.el.nativeElement).display;
          this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
      }
    });
  }
}
