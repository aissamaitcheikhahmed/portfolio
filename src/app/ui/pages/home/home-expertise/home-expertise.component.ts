import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mTools = [

    // Frontend
    {
      "id": "8101",
      "name": "React",
      "logo": "assets/img/tools/react-svgrepo-com.svg",
      "link": "https://reactjs.org/",
      "tab": "frontend",
      "color": "#61DBFB"
    },
    {
      "id": "8102",
      "name": "React Native",
      "logo": "assets/img/tools/react-svgrepo-com.svg",
      "link": "https://reactnative.dev/",
      "tab": "frontend",
      "color": "#61DBFB"
    },
    {
      "id": "8103",
      "name": "TypeScript",
      "logo": "assets/img/tools/typescript.png",
      "link": "https://www.typescriptlang.org/",
      "tab": "frontend",
      "color": "#3178C6"
    },
    {
      "id": "8104",
      "name": "WPF",
      "logo": "assets/img/tools/wpf.png",
      "link": "https://docs.microsoft.com/en-us/dotnet/desktop/wpf/",
      "tab": "frontend",
      "color": "#512BD4"
    },
    {
      "id": "8105",
      "name": "Qt Designer",
      "logo": "assets/img/tools/qt-svgrepo-com.svg",
      "link": "https://doc.qt.io/qt-6/qtdesigner-manual.html",
      "tab": "frontend",
      "color": "#41CD52"
    },

    // Backend
    {
      "id": "7101",
      "name": "C#",
      "logo": "assets/img/tools/csharp-svgrepo-com.svg",
      "link": "https://docs.microsoft.com/en-us/dotnet/csharp/",
      "tab": "backend",
      "color": "#512BD4"
    },
    {
      "id": "7102",
      "name": ".NET Core",
      "logo": "assets/img/tools/dot-net-svgrepo-com.svg",
      "link": "https://dotnet.microsoft.com/",
      "tab": "backend",
      "color": "#512BD4"
    },
    {
      "id": "7103",
      "name": "Java Spring Boot",
      "logo": "assets/img/tools/spring-svgrepo-com.svg",
      "link": "https://spring.io/projects/spring-boot",
      "tab": "backend",
      "color": "#6DB33F"
    },
    {
      "id": "7104",
      "name": "Node.js",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "backend"
    },
    {
      "id": "7105",
      "name": "Express",
      "logo": "assets/img/tools/express.png",
      "link": "https://expressjs.com/",
      "tab": "backend"
    },
    {
      "id": "7106",
      "name": "REST APIs",
      "logo": "assets/img/tools/api.png",
      "link": "https://restfulapi.net/",
      "tab": "backend"
    },

    // Tools & Technologies
    {
      "id": "5101",
      "name": "PyQt5",
      "logo": "assets/img/tools/pyqt.png",
      "link": "https://www.riverbankcomputing.com/software/pyqt/",
      "tab": "tools",
      "color": "#41CD52"
    },
    {
      "id": "5102",
      "name": "Raspberry Pi",
      "logo": "assets/img/tools/raspberrypi-svgrepo-com.svg",
      "link": "https://www.raspberrypi.org/",
      "tab": "tools",
      "color": "#C51D4A"
    },

    // Cloud & DevOps
    {
      "id": "6101",
      "name": "Docker",
      "logo": "assets/img/tools/docker-svgrepo-com.svg",
      "link": "https://www.docker.com/",
      "tab": "cloud",
      "color": "#2496ED"
    },
    {
      "id": "6102",
      "name": "AWS",
      "logo": "assets/img/tools/aws-svgrepo-com.svg",
      "link": "https://aws.amazon.com/",
      "tab": "cloud",
      "color": "#FF9900"
    },
    {
      "id": "6103",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud",
      "color": "#0078D4"
    },
    {
      "id": "6104",
      "name": "Cosmos DB",
      "logo": "assets/img/tools/cosmos-db.png",
      "link": "https://azure.microsoft.com/en-us/services/cosmos-db/",
      "tab": "cloud",
      "color": "#0078D4"
    },

    // Design
    {
      "id": "4101",
      "name": "Figma",
      "logo": "assets/img/tools/figma.svg",
      "link": "https://www.figma.com/",
      "tab": "design"
    },
    {
      "id": "4102",
      "name": "Adobe Photoshop",
      "logo": "assets/img/tools/ps.png",
      "link": "https://www.adobe.com/products/photoshop.html",
      "tab": "design"
    },
    {
      "id": "4103",
      "name": "Adobe Illustrator",
      "logo": "assets/img/tools/ai.svg",
      "link": "https://www.adobe.com/products/illustrator.html",
      "tab": "design"
    }

  ]

}
