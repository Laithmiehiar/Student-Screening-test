import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appReviewTest]'
})
export class ReviewTestDirective implements OnInit{
  @Input() private appReviewTest: any;

  constructor(private element: ElementRef, private render2: Renderer2) { }


  ngOnInit(){
    if(this.appReviewTest !== 'answered'){
      console.log("test " + this.appReviewTest)
      this.element.nativeElement.disabled = true;
      }else{
        this.element.nativeElement.textContent = 'Review test'
      }
  }
}
