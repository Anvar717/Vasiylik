import { $themeConfig } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
    MicroterritoryFilter : {
      oblastid : 0,
      regionid : 0,
      mfyid : 0,
      streetid : 0,
      Search : ''
    },
    StatementFilter : {
      oblastid : 0,
      regionid : 0,
      organizationid : 0,
      Search : '',
      statusid : 0
    }
  },
  getters: {},
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val
    },
  },
  actions: {},
}
