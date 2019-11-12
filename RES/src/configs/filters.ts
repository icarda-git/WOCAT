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
  },
  // {
  //   show: true,
  //   component: 'SearchComponent',
  //   componentConfigs: {
  //     placeholder: 'Search for Title, Author, etc',
  //     type: searchOptions.allSearch,
  //   } as ComponentSearchConfigs,
  // },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'SLM Type)',
      source: 'slm_type.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Activity(ies)',
      source: 'Activity.keyword',
      addInMainQuery: true,
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
      placeholder: 'Main purpose(s)',
      source: 'Main purpose(s) of the Technology (land user’s perspective).keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  // {
  //   show: true,
  //   component: 'LabelComponent',
  //   componentConfigs: {
  //     text: 'Year(s)',
  //   } as ComponentLabelConfigs,
  // },
  // {
  //   show: true,
  //   component: 'RangeComponent',
  //   componentConfigs: {
  //     source: 'year.keyword',
  //     addInMainQuery: false,
  //   } as ComponentFilterConfigs,
  // },
  // {
  //   show: true,
  //   component: 'SearchComponent',
  //   componentConfigs: {
  //     placeholder: 'Title',
  //     type: searchOptions.titleSearch,
  //   } as ComponentSearchConfigs,
  // },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Location(s)',
      source: 'Location.keyword',
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
      placeholder: 'Lastname / surname',
      source: 'Lastname / surname.keyword',
      addInMainQuery: true,
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
      placeholder: 'Select SLM measures',
      source: 'SLM measures.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select type(s)',
      source: 'type.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  // {
  //   show: true,
  //   component: 'LabelComponent',
  //   componentConfigs: {
  //     text: 'Affiliation and Donors',
  //     border: true,
  //   } as ComponentLabelConfigs,
  // },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select Slopes on average',
      source: 'Slopes on average.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'Select Landforms',
      source: 'Landforms.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  {
    show: true,
    component: 'SelectComponent',
    componentConfigs: {
      placeholder: 'select Degradation type',
      source: 'Degradation type.keyword',
      addInMainQuery: true,
    } as ComponentFilterConfigs,
  },
  // {
  //   show: true,
  //   component: 'LabelComponent',
  //   componentConfigs: {
  //     text: 'Sources',
  //     border: true,
  //     description: `
  //       Select specific repositories to look up, leave it blank to
  //       loop up in all available repositories. Select specific
  //       CGSpace communities and MELSpace collecions to look up,
  //       leave it blank to look up in all available communities
  //       and collections.
  //     `,
  //   } as ComponentLabelConfigs,
  // },
  // {
  //   show: true,
  //   component: 'SelectComponent',
  //   componentConfigs: {
  //     expandPosition: 'top',
  //     placeholder: 'Select repository(ies)',
  //     source: 'repo.keyword',
  //     addInMainQuery: false,
  //   } as ComponentFilterConfigs,
  // },
  // {
  //   show: true,
  //   component: 'SelectComponent',
  //   componentConfigs: {
  //     expandPosition: 'top',
  //     placeholder: 'Select Community(ies)',
  //     source: 'community.keyword',
  //     addInMainQuery: false,
  //   } as ComponentFilterConfigs,
  // },
];
