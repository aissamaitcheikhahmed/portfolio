import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AppType } from 'src/app/types/apps_type';
import { UiUtilsColor } from 'src/app/ui/utils/color.utils';

@Component({
  selector: 'app-myapp-item',
  templateUrl: './myapp-item.component.html',
  styleUrls: ['./myapp-item.component.scss']
})
export class MyappItemComponent implements OnInit {
  

  _mModel?: AppType;

  // Carousel support for Rubric System
  rubricImages: string[] = [
    'assets/img/apps/Rubricproject/1.jpg',
    'assets/img/apps/Rubricproject/2.jpg',
    'assets/img/apps/Rubricproject/3.jpg',
    'assets/img/apps/Rubricproject/4.jpg',
    'assets/img/apps/Rubricproject/5.jpg',
    'assets/img/apps/Rubricproject/6.jpg',
    'assets/img/apps/Rubricproject/7.png',
  ];
  rubricCurrentIndex = 0;

  get isRubricSystem(): boolean {
    return this._mModel?.image?.includes('Rubricproject.png') ?? false;
  }

  nextRubricImage() {
    this.rubricCurrentIndex = (this.rubricCurrentIndex + 1) % this.rubricImages.length;
  }

  prevRubricImage() {
    this.rubricCurrentIndex = (this.rubricCurrentIndex - 1 + this.rubricImages.length) % this.rubricImages.length;
  }

  @Input('data') set model(data: AppType){
    if(data){
      this._mModel = data;
    }
  };

  // @Input('caption') set caption(data: string){
  //   if(data){
  //     this._mCaption = data;
  //   }
  // };
  
  // @Input('name') set name(data: string){
  //   if(data){
  //     this._mName = data;
  //   }
  // };

  // // @Input() parts: String[] = [];

  // @Input('link') set link(data: string) {
  //   if (data) {
  //     this._mAppUrl = data

  //     // this._mMeta = data.meta      
  //   }
  // }

  
  // @Input('image') set image(data: string) {
  //   if (data) {
  //     this._mImage = data

  //     // this._mMeta = data.meta      
  //   }
  // }

  // @Input('background') set background(data: string | undefined) {
  //   if (data) {
  //     this._mBackground = data 
  //   }
  // }

  // @Input('primary') set primary(data: string | undefined) {
  //   if (data) {
  //     this._mPrimary = data 
  //   }
  // }
  
  // _mAppUrl: string  = ""
  // _mName: string = ""
  // _mCaption: string = ""
  // _mImage?: string
  // _mBackground: string = '#FFFFFF';
  // _mPrimary?: string ;

  constructor(public el: ElementRef) { }


  ngOnInit(): void {
    this.bindColor();
  }

  bindColor() {
    var element = this.el.nativeElement

    // element.style.setProperty('--app-primary', this._mPrimary);
    // element.style.setProperty('--app-primary--rgb', UiUtilsColor.hexToRgb( this._mPrimary));
    
    // element.style.setProperty('--app-secondary', this._mColorSecondary);
    // element.style.setProperty('--app-secondary--rgb', UiUtilsColor.hexToRgb( this._mColorSecondary));
  }

}
