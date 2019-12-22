import {
  GeneralConfigs,
  ComponentDashboardConfigs
} from './generalConfig.interface';

/**
 * * componentConfigs.source determine where
 * * this component will get it's data from the store
 * * `search for getBuckets in the Store`
 * * IF you want to change the chart type
 *    * change the type
 * * IF you want to add new component add an id to it
 *    * in the `ComponentsIdsToScroll`
 */

export const dashboardConfig: GeneralConfigs[] = [
  // {
  //   show: false,
  //   class: 'col-md-3 no-side-padding',
  //   component: 'SimiCircleComponent',
  //   componentConfigs: {
  //     id: 'SimiCircle',
  //     title: 'Info Products by Type',
  //     source: 'status',
  //     chartType: 'pie',
  //     description: `
  //         All the available :${
  //           icons.export
  //         } to export this graphic, click on ICONS:${
  //       icons.arrowUp
  //     } to collapse it.
  //     `,
  //   } as ComponentDashboardConfigs,
  //   scroll: {
  //     linkedWith: 'topLists',
  //   },
  //   tour: true,
  // },
  // {
  //   show: false,
  //   class: 'col-md-9 no-side-padding',
  //   component: 'LineComponent',
  //   componentConfigs: {
  //     id: 'lineChart',
  //     title: 'Info Products by Type',
  //     source: 'status',
  //     chartType: 'line',
  //     description: `
  //         All the available :${
  //           icons.export
  //         } to export this graphic, click on ICONS:${
  //       icons.arrowUp
  //     } to collapse it.
  //     `,
  //   } as ComponentDashboardConfigs,
  //   scroll: {
  //     linkedWith: 'topLists',
  //   },
  //   tour: true,
  // },

  {
    show: true,
    class: 'col-md-6 mt-3 no-side-padding',
    component: 'MapComponent',
    componentConfigs: {
      id: 'map',
      source: 'Country',
      title: 'Nr. of case studies per country',
      description: `
          Geographic tags for all the SLM Practices found are represented here and disaggregated by
          country. The darker the color the higher the number of SLM Practices tagged to that specific
          country. Overall, the graphic shows the world areas targeted by research activities that produced
          SLM Practices. Click on ICONS:view_headline
          to export this graphic, click on ICONS:expand_less
          to collapse it.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      icon: 'map'
    },
    tour: true
  },
  {
    show: true,
    class: 'col-md-6 mt-3 no-side-padding',
    component: 'GoogleMapsComponent',
    componentConfigs: {
      id: 'google-map',
      source: 'map_points',
      title: 'Location of documented SLM',
      description: `
          Geographic tags for all the SLM Practices found are represented here and disaggregated by
          country. Orange: Approaches, Green: Technologies.
          SLM Practices. Click on ICONS:view_headline
          to export this graphic, click on ICONS:expand_less
          to collapse it.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      linkedWith: 'map'
    },
    tour: true
  },
  {
    show: true,
    class: 'col-md-6 no-side-padding',
    component: 'PieComponent',
    componentConfigs: {
      id: 'pie',
      title: 'Main purpose(s) of the Technology (land user’s perspective)',
      source: 'Main purpose(s) of the Technology (land user’s perspective)',
      description: `
          You can toggle on/off individual type of visualization in the list at the right side of
          the graphic. Click on ICONS:view_headline to export this graphic, click on ICONS:expand_less to collapse it.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      icon: 'pie_chart'
    },
    tour: true
  },
  {
    show: true,
    class: 'col-md-6 no-side-padding',
    component: 'PieComponent',
    componentConfigs: {
      id: 'pie2',
      title: 'Land use types',
      source: 'Land use type',
      description: `
          You can toggle on/off individual type of visualization in the list at the right side of
          the graphic. Click on ICONS:view_headline to export this graphic, click on ICONS:expand_less to collapse it.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      linkedWith: 'pie'
    },
    tour: true
  },
  {
    show: true,
    class: 'col-md-6 no-side-padding',
    component: 'PieComponent',
    componentConfigs: {
      id: 'pie3',
      title: 'Origin / Introduction',
      source: 'Specify how the Technology was introduced',
      description: `
          You can toggle on/off individual type of visualization in the list at the right side of
          the graphic. Click on ICONS:view_headline to export this graphic, click on ICONS:expand_less to collapse it.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      icon: 'pie_chart'
    },
    tour: true
  },
  {
    show: true,
    class: 'col-md-6 no-side-padding',
    component: 'ColumnComponent',
    componentConfigs: {
      id: 'pie4',
      title: 'Number of users in the area having adopted the technology',
      source: 'How many land users in the area have adopted/implemented the Technology?',
      description: `
          You can toggle on/off individual type of visualization in the list at the right side of
          the graphic. Click on ICONS:view_headline to export this graphic, click on ICONS:expand_less to collapse it.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      linkedWith: 'pie3'
    },
    tour: true
  },
  // {
  //   show: true,
  //   class: 'col-md-6 no-side-padding',
  //   component: 'PieComponent',
  //   componentConfigs: {
  //     id: 'pie2',
  //     title: 'Land use rights',
  //     source: 'Land use rights',
  //     description: `
  //         All the available SLM Practices are represented here and disaggregated by Type.
  //         You can toggle on/off individual type of visualization in the list at the right side of
  //         the graphic. Click on ICONS:view_headline to export this graphic, click on ICONS:expand_less to collapse it.
  //     `
  //   } as ComponentDashboardConfigs,
  //   scroll: {
  //     icon: 'pie_chart'

  //   },
  //   tour: true
  // },


  // {
  //   show: true,
  //   class: 'col-md-12 mt-3 no-side-padding',
  //   component: 'BarComponent',
  //   componentConfigs: {
  //     id: 'barchart',
  //     source: ['Specify how the Technology was introduced', 'Of all those who have adopted the Technology, how many have did so spontaneously, i.e. without receiving any material incentives/ payments?.keyword'],
  //     title: 'Info Products Analytics',
  //     chartType: 'column',
  //     description: `
  //           All SLM Practices are represented here and can be further disaggregated by two variables at the same time The
  //           filters automatically pre-select those options that have the most results, helping you to access your
  //           information faster. Click on ICONS:view_headline to export
  //           this graphic, click on ICONS:expand_less to collapse it.
  //     `
  //   } as ComponentDashboardConfigs,
  //   scroll: {
  //     icon: 'bar_chart'
  //   },
  //   tour: true
  // },
  // {
  //   class: 'col-md-6 mt-3 no-side-padding',
  //   show: true,
  //   component: 'ListComponent',
  //   componentConfigs: {
  //     id: 'topLists',
  //     title: 'SLM groups',
  //     source: 'SLM group',
  //     description: `
  //         The top twenty Authors by number of SLM Practices.
  //         Click on ICONS:expand_less to collapse the list.
  //     `
  //   } as ComponentDashboardConfigs,
  //   scroll: {
  //     icon: 'list_alt'
  //   },
  //   tour: true
  // },
  {
    class: 'col-md-6 mt-3 no-side-padding',
    show: true,
    component: 'ListComponent',
    componentConfigs: {
      id: 'SLMmeasures',
      title: 'SLM measures',
      source: 'SLM measures',
      description: `
          Click on ICONS:expand_less to collapse the list.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      icon: 'list_alt'

    },
    tour: true
  },
  {
    class: 'col-md-6 mt-3 no-side-padding',
    show: true,
    component: 'ListComponent',
    componentConfigs: {
      id: 'Degradation',
      title: 'Degradation type',
      source: 'Degradation type',
      description: `
      Click on ICONS:expand_less to collapse the list.
      `
    } as ComponentDashboardConfigs,
    scroll: {
      linkedWith: 'SLMmeasures'
    },
    tour: true
  },
  {
    class: 'col-md-12 mt-3 no-side-padding',
    show: true,
    component: 'ListComponent',
    componentConfigs: {
      id: 'paginatedList',
      title: 'Info Producs List of Results',
      description: `
          All SLM Practices found are represented here, You can sort this list by "Date".
          Click on ICONS:expand_less to collapse the list.
      `,
      content: {
        title: 'Name',
        icon: 'repo',
        identifierUri: '_id',
        altmetric: false,
        description: 'Definition of the Technology',
        tags: {
          "SLM specialists": 'SLM specialist',
          'Institution': 'Name of institution',
          'Compilation Date': 'date_documentation'

        },
        filterOptions: [
          { display: 'ID', value: 'id.keyword', sort: 'desc' },
          { display: 'Compilation Date', value: 'date_documentation', sort: 'desc' }

        ]
      }
    } as ComponentDashboardConfigs,
    scroll: {
      icon: 'view_list'
    },
    tour: true
  }
];
