import {
  GeneralConfigs,
  searchOptions,
  ComponentLabelConfigs,
  ComponentSearchConfigs,
  ComponentFilterConfigs,
} from './generalConfig.interface';

export const filtersConfig: GeneralConfigs[] = [
  {
    show: true,
    component: 'LabelComponent',
    componentConfigs: {
      text: `Create your query by entering choices in one of
        more filters below, click on ICONS:loop to clear your query.`,
    } as ComponentLabelConfigs,
  },{
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'ID',
      source: 'id.keyword',
      addInMainQuery: false,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SearchComponent',
    componentConfigs: {
      placeholder: 'Search for Title, keyword, description, etc...',
      type: searchOptions.allSearch,
    } as ComponentSearchConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'SLM Practices',
      source: 'slm_type.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select Region(s)',
      source: 'regions.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select Country(ies)',
      source: 'Country.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select Agro-climatic zone',
      source: 'Agro-climatic zone.keyword',
      addInMainQuery: false,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Institution(s)',
      source: 'Name of institution.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Main purpose(s) of the Technology',
      source: 'Main purpose(s) of the Technology (land user’s perspective).keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },

  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Land use type(s)',
      source: 'Land use type.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },

  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select Degradation type',
      source: 'Degradation type.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Goal of the Technology with regards to land degradation',
      source: 'Specify the goal of the Technology with regard to land degradation.keyword',
      addInMainQuery: false,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select SLM group',
      source: 'SLM group.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      helpText:'A, V, M, S in (i) ',
      placeholder: 'Select SLM measures',
      source: 'SLM measures.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },

  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Altitudinal zone',
      source: 'Altitudinal zone.keyword',
      addInMainQuery: false,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Annual rainfall',
      source: 'Average annual rainfall.keyword',
      addInMainQuery: false,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Slopes',
      source: 'Slopes on average.keyword',
      addInMainQuery: false,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Land use rights(s)',
      source: 'Land use rights.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Marked orientation of production system',
      source: 'Market orientation of production system.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: false,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'SLM specialists',
      source: 'SLM specialist.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  }
];
