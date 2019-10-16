import {
  GeneralConfigs,
  ComponentCounterConfigs,
} from './generalConfig.interface';

export const countersConfig: GeneralConfigs[] = [
  {
    show: true,
    componentConfigs: {
      id: 'counters',
      title: 'Total Items',
      source: 'total',
      description: `
        Total number of information product found
      `,
    } as ComponentCounterConfigs,
    scroll: {
      icon: 'dashboard',
    },
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'Iinstitutions',
      title: 'Iinstitutions',
      source: 'Name of institution.keyword',
      description: `
        Total number of information products only accessible
        as by publisher's specifications.
      `,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'Activity',
      title: 'Activities',
      source: 'Activity.keyword',
      description: `
        Total number of Authors involved with he information
        product found
      `,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'Location',
      title: 'Locations',
      source: 'Location.keyword',
      description: `
        Total number of information products only accessible
        as by Locations specifications.
      `,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'CRPs&Platforms',
      title: 'pepole involved',
      source: 'Lastname / surname.keyword',
      description: `
        Total number of pepole involved with he information
        product found
      `,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'Countries',
      title: 'Countries',
      source: 'Country.keyword',
      description: `
        Total number of information products only accessible
        as by rights specifications.
      `,
    } as ComponentCounterConfigs,
    tour: true,
  }
];
