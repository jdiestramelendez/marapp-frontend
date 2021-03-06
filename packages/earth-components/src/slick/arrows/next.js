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

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class NextArrow extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({}),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: "",
    style: {},
    onClick: null,
  };

  render() {
    const { className, style, onClick } = this.props;

    return (
      <div
        className={className}
        role="button"
        tabIndex="-1"
        style={{ ...style }}
        onClick={onClick}
      >
        <i className="ng-icon-directionright" />
      </div>
    );
  }
}

export default NextArrow;
