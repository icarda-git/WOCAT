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
      id: 'Technologies',
      title: 'Technologies',
      source: 'slm_type.keyword',
      filter: 'technologies',
      description: `
        Total number of information products freely
        accessible and usable as by license applied.
      `,
      percentageFromTotal: true,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'Approaches',
      title: 'Approaches',
      source: 'slm_type.keyword',
      filter: 'approaches',
      description: `
        Total number of information products only
        accesible as by publisher's specifications.
      `,
      percentageFromTotal: true,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'Institutions',
      title: 'Institutions',
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
      title: 'people involved',
      source: 'Lastname / surname.keyword',
      description: `
        Total number of people involved with he information
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
