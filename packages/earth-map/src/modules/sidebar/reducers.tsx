/*
  Copyright 2018-2020 National Geographic Society

  Use of this software does not constitute endorsement by National Geographic
  Society (NGS). The NGS name and NGS logo may not be used for any purpose without
  written permission from NGS.

  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed
  under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
  CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

import * as actions from './actions';
import { EPanels } from './model';

export default {
  [actions.setSidebar]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.setSidebarOpen]: (state, { payload }) => ({
    ...state,
    open: payload,
  }),
  [actions.setSidebarPanel]: (state, { payload }) => ({
    ...state,
    panel: payload,
    panelExpanded: payload === EPanels.LAYERS, // only expand search ui on layers panel
  }),
  [actions.setSidebarPanelExpanded]: (state, { payload }) => ({
    ...state,
    panelExpanded: payload,
  }),
};
