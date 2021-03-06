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

import { setup } from 'axios-cache-adapter';
import { encodeQueryToURL } from 'utils/query';
import Jsona, { SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';
import { AxiosInstance } from 'axios';

import { API_URL } from "config";

/**
 * Users service class.
 */
class UsersService {
  private dataFormatter: Jsona;
  private api: AxiosInstance;

  constructor() {
    this.configure();

    this.dataFormatter = new Jsona({
      modelPropertiesMapper: new SwitchCaseModelMapper(),
      jsonPropertiesMapper: new SwitchCaseJsonMapper(),
    });
  }

  configure = () => {
    this.api = setup({ baseURL: API_URL });
  };

  /**
   * request
   * Creates an axios request based on type an options.
   * @param {string} path - The path of the request.
   */
  request(path) {
    return new Promise((resolve, reject) => {
      this.api
        .get(path)
        .then(response => {
          resolve(this.dataFormatter.deserialize(response.data));
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export const service = new UsersService();

export function changeEmailConfirmation(options = {}) {
  const widgetsQuery = encodeQueryToURL(`/users/profile/change-email`, options);
  return service.request(widgetsQuery);
}

export default service;
