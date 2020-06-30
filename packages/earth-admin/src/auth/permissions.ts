export enum ScopesEnum {
  ReadAll = 'read:*',
  WriteAll = 'write:*',
  ReadLocations = 'read:locations',
  WriteLocations = 'write:locations',
  ReadMetrics = 'read:metrics',
  WriteMetrics = 'write:metrics',
  ReadCollections = 'read:collections',
  WriteCollections = 'write:collections',
  ReadLayers = 'read:layers',
  WriteLayers = 'write:layers',
  ReadWidgets = 'read:widgets',
  WriteWidgets = 'write:widgets',
  ReadDashboards = 'read:dashboards',
  WriteDashboards = 'write:dashboards',
  ReadUsers = 'read:users',
  WriteUsers = 'write:users',
}

export const AuthzGuards = {
  readAllGuard: [ScopesEnum.ReadAll],
  writeAllGuard: [ScopesEnum.WriteAll],
  readLocationsGuard: [[ScopesEnum.ReadLocations], [ScopesEnum.ReadAll]],
  writeLocationsGuard: [[ScopesEnum.WriteLocations], [ScopesEnum.WriteAll]],
  accessLocationsGuard: [
    [ScopesEnum.ReadLocations],
    [ScopesEnum.ReadAll],
    [ScopesEnum.WriteLocations],
    [ScopesEnum.WriteAll],
  ],
  readMetricsGuard: [[ScopesEnum.ReadMetrics], [ScopesEnum.ReadAll]],
  writeMetricsGuard: [[ScopesEnum.WriteMetrics], [ScopesEnum.WriteAll]],
  accessMetricsGuard: [
    [ScopesEnum.ReadMetrics],
    [ScopesEnum.ReadAll],
    [ScopesEnum.WriteMetrics],
    [ScopesEnum.WriteAll],
  ],
  readCollectionsGuard: [[ScopesEnum.ReadCollections], [ScopesEnum.ReadAll]],
  writeCollectionsGuard: [[ScopesEnum.WriteCollections], [ScopesEnum.WriteAll]],
  accessCollectionsGuard: [
    [ScopesEnum.ReadCollections],
    [ScopesEnum.ReadAll],
    [ScopesEnum.WriteCollections],
    [ScopesEnum.WriteAll],
  ],
  readLayersGuard: [[ScopesEnum.ReadLayers], [ScopesEnum.ReadAll]],
  writeLayersGuard: [[ScopesEnum.WriteLayers], [ScopesEnum.WriteAll]],
  accessLayersGuard: [
    [ScopesEnum.ReadLayers],
    [ScopesEnum.ReadAll],
    [ScopesEnum.WriteLayers],
    [ScopesEnum.WriteAll],
  ],
  readWidgetsGuard: [[ScopesEnum.ReadWidgets], [ScopesEnum.ReadAll]],
  writeWidgetsGuard: [[ScopesEnum.WriteWidgets], [ScopesEnum.WriteAll]],
  accessWidgetsGuard: [
    [ScopesEnum.ReadWidgets],
    [ScopesEnum.ReadAll],
    [ScopesEnum.WriteWidgets],
    [ScopesEnum.WriteAll],
  ],
  readWDashboardsGuard: [[ScopesEnum.ReadDashboards], [ScopesEnum.ReadAll]],
  writeDashboardsGuard: [[ScopesEnum.WriteDashboards], [ScopesEnum.WriteAll]],
  accessDashboardsGuard: [
    [ScopesEnum.ReadDashboards],
    [ScopesEnum.ReadAll],
    [ScopesEnum.WriteDashboards],
    [ScopesEnum.WriteAll],
  ],
  readUsersGuard: [[ScopesEnum.ReadUsers], [ScopesEnum.ReadAll]],
  writeUsersGuard: [[ScopesEnum.WriteUsers], [ScopesEnum.WriteAll]],
  accessUsersGuard: [
    [ScopesEnum.ReadUsers],
    [ScopesEnum.ReadAll],
    [ScopesEnum.WriteUsers],
    [ScopesEnum.WriteAll],
  ],
};
