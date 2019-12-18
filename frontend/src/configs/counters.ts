import {
  GeneralConfigs,
  ComponentCounterConfigs,
} from './generalConfig.interface';

export const countersConfig: GeneralConfigs[] = [
  {
    show: true,
    componentConfigs: {
      id: 'counters',
      title: 'Total SLM Practices',
      source: 'total',
      description: `
        Total number of SLM Data found
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
        Total number of SLM Data freely
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
        Total number of SLM Data only
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
        Total number of SLM Data only accessible
        as by publisher's specifications.
      `,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'CRPs&Platforms',
      title: 'SLM specialists',
      source: 'SLM specialist.keyword',
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
        Total number of SLM Data only accessible
        as by rights specifications.
      `,
    } as ComponentCounterConfigs,
    tour: true,
  }
];
