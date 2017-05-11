import { NgModule, Component, Compiler, ViewContainerRef, ViewChild,
   Input, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'panel-wrapper',
  template: `<div #view></div>`
})
export class PanelWrapper {
  @ViewChild('view', {read: ViewContainerRef}) target: ViewContainerRef;
  @Input() panel;
  
  private _compRef: ComponentRef<Component>;
  private _isViewInitialized: Boolean = false;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver, 
                private _compiler: Compiler) {}

  updateComponent() {
    if (!this._isViewInitialized) {
      return;
    }
    
    if (this._compRef) {
      this._compRef.destroy();
    }

    let factory = this._componentFactoryResolver.resolveComponentFactory(this.panel);
    this._compRef = this.target.createComponent(factory)
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this._isViewInitialized = true;
    this.updateComponent();  
  }

  ngOnDestroy() {
    if (this._compRef) {
      this._compRef.destroy();
    }    
  }
}