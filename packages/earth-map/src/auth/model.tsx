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

export interface Auth0 {
  domain?: any;
  isAuthenticated?: boolean;
  isAuthorized?: boolean;
  isLoading?: boolean;
  email?: string;
  userData?: User;
  // TODO: rename this to selectedGroups
  selectedGroup?: string[];
  groups?: string[];
  roles?: { [key: string]: any };
  permissions?: { [key: string]: any };
  logout?(o?): void;
  login?(o?): void;
  getUser?(o?): void;
  getToken?(o?): void;
  setupUserOrg?(org: string): void;
}

export interface User {
  name?: string;
  picture?: string;
  allGroups?: string[];
}
