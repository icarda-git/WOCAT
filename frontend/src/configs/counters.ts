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
        Including Technologies and Approaches
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
      An SLM Technology is a land management practice that controls land degradation and enhances productivity and/ or other ecosystem services.
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
      An SLM Approach defines the ways and means used to implement an SLM Technology, including the stakeholders involved and their roles.
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
      Institutions involved.
      `,
    } as ComponentCounterConfigs,
    tour: true,
  },
  {
    show: true,
    componentConfigs: {
      id: 'SLM_specialists',
      title: 'SLM specialists',
      source: 'SLM specialist.keyword',
      description: `
      Involved SLM Specialists registered in the WOCAT database
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
      Countries with documented Technologies and/or Approaches
      `,
    } as ComponentCounterConfigs,
    tour: true,
  }
];
