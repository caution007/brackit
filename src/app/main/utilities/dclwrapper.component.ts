// Adapted from: http://plnkr.co/edit/UGzoPTCHlXKWrn4p8gd1?p=preview //
//our root app component
import { NgModule, Component, Compiler, ViewContainerRef, ViewChild,
   Input, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

// Helper component to add dynamic components
@Component({
  selector: 'dcl-wrapper',
  template: `<div #target></div>`
})
export class DclWrapper {
  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;
  @Input() type;
  private _cmpRef: ComponentRef<Component>;
  private _isViewInitialized: Boolean = false;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver, 
                private _compiler: Compiler) {}

  updateComponent() {
    if(!this._isViewInitialized) {
      return;
    }
    
    if(this._cmpRef) {
      // when the `type` input changes we destroy a previously 
      // created component before creating the new one
      this._cmpRef.destroy();
    }

    let factory = this._componentFactoryResolver.resolveComponentFactory(this.type);
    this._cmpRef = this.target.createComponent(factory)
    // to access the created instance use
    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this._isViewInitialized = true;
    this.updateComponent();  
  }

  ngOnDestroy() {
    if(this._cmpRef) {
      this._cmpRef.destroy();
    }    
  }
}