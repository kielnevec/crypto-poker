import {bindable, autoinject} from 'aurelia-framework';
  
  @autoinject
  export class SquareCustomAttribute {
    @bindable width: string;
  
    constructor(private element: Element){
    }
  
    widthChanged(newValue:string, oldValue:string){
    //   this.element.style.width = `${newValue}%`;
      this.element.setAttribute("style",`width:${newValue}; background: linear-gradient(270deg, #FAD55E 0%, #F7701F 100%);`)
    }

  
    
  }