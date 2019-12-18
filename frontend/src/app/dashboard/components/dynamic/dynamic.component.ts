import {
  Type,
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: '',
})
export class DynamicComponent implements OnInit {
  @Input() comp: string;
  @Input() componentConfigs: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const factories = Array.from(this.resolver['_factories'].keys());
    const factoryClass = <Type<any>>(
      factories.find((x: any) => x.name === this.comp)
    );

    if (factoryClass) {
      const factory = this.resolver.resolveComponentFactory(factoryClass);
      const compRef = this.vcRef.createComponent(factory);
      if (this.comp !== 'WelcomeComponent') {
        compRef.instance.componentConfigs = this.componentConfigs;
      }
    }
  }
}
