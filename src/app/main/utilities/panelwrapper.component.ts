import { NgModule, Component, Compiler, ViewContainerRef, ViewChild,
   Input, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

@Component({
  selector: 'panel-wrapper',
  template: `<div #view></div>`
})
export class PanelWrapper {
  @ViewChild('view', { read: ViewContainerRef }) view: ViewContainerRef;
  
  @Input() panel;
  
  private _component: ComponentRef<Component>;
  private _view = false;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver, 
                private _compiler: Compiler) {}

  changeComponent() {
    if (!this._view) {
      return;
    }
    
    if (this._component) {
      this._component.destroy();
    }

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.panel);
    this._component = this.view.createComponent(componentFactory)
  }

  ngAfterViewInit() {
      this._view = true;
      this.changeComponent();  
    }

  ngOnChanges() {
    this.changeComponent();
  }

  ngOnDestroy() {
    if (this._component) {
      this._component.destroy();
    }    
  }
}