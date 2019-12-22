import { GeneralConfigs, Tour } from './generalConfig.interface';

/**
 * for the custom elements like welcome message
 * other components like counters and  charts
 * have tour: boolean attributes in the configs
 * which tells if this component should appear
 * in the tour
 */
export const tourConfig: GeneralConfigs[] = [
  {
    show: true,
    component: 'WelcomeComponent',
    componentConfigs: {
      id: 'welcome',
      description: 'Welcome to WOCAT - visualization tool',
      title: 'Greetings'
    } as Tour,
    tour: true
  }
];
