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

import { createAction } from 'vizzuality-redux-tools';

/* Places actions */
export const setPlace = createAction('PLACES/setPlace');

export const setPlacesCache = createAction('PLACES/setPlacesCache');

// Featured
export const resetPlacesFeatured = createAction('PLACES/resetPlacesFeatured');

// Selected
export const setPlaceData = createAction('PLACES/setPlaceData');
export const setPlacesLoading = createAction('PLACES/setPlacesLoading');
export const setPlacesError = createAction('PLACES/setPlacesError');
export const setPlaceSelectedOpen = createAction('PLACES/setPlaceSelectedOpen');
export const setPlaceSelectedSearch = createAction('PLACES/setPlaceSelectedSearch');
export const setPlaceSelectedFilter = createAction('PLACES/setPlaceSelectedFilter');
export const setPlaceSelectedId = createAction('PLACES/setPlaceSelectedId');

// Search
export const setPlacesSearch = createAction('PLACES/setPlacesSearch');
export const setPlacesSearchOpen = createAction('PLACES/setPlacesSearchOpen');
export const setPlacesSearchLoading = createAction('PLACES/setPlacesSearchLoading');
export const setPlacesSearchFilters = createAction('PLACES/setPlacesSearchFilters');
export const setPlacesSearchAvailableFilters = createAction('PLACES/setPlacesSearchAvailableFilters');
export const setPlacesSearchResults = createAction('PLACES/setPlacesSearchResults');
export const nextPlacesPage = createAction('PLACES/nextPlacesPage');

export const resetPlacesResults = createAction('PLACES/resetPlacesResults');
export const resetPlace = createAction('PLACES/resetPlace');