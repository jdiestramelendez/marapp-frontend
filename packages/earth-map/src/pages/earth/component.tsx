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

import React from 'react';
import { Icons as VizzIcons } from 'vizzuality-components';

import Layers from 'components/layers';
import Places from 'components/places';
import Url from 'components/url';
import Map from 'components/map';
import Sidebar from 'components/sidebar';
import Place from 'components/place';
import Fullscreen from 'components/fullscreen';
import { URL_PROPS } from './url';
import { EPanels } from 'modules/sidebar/model';

interface IEarth {
  setFullscreen?: (p: { data: {}; open: boolean }) => void;
  setMapInteractions?: (p: {}) => void;
  panel?: EPanels;
  layersPanel?: boolean;
  selected?: string;
}

class EarthPage extends React.Component<IEarth> {
  render() {
    const { setFullscreen, setMapInteractions, selected, panel } = this.props;

    return (
      <main className="l-page marapp-qa-pageearth" role="main">
        <VizzIcons />

        <Url type="EARTH" urlProps={URL_PROPS} />

        <Fullscreen
          onClose={() => {
            setFullscreen({ open: false, data: {} });
            setMapInteractions({});
          }}
        />

        <Sidebar>
          {panel === EPanels.PLACES && (
            <Places selected={!!selected} />
          )}
          {panel === EPanels.LAYERS && (
            <Layers selected={!!selected} />
          )}
        </Sidebar>

        <div className="l-content">
          <Map />
          <Place />
        </div>
      </main>
    );
  }
}

export default EarthPage;
