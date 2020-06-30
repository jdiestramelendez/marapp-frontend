import * as React from 'react';
import { useEffect, useState } from 'react';
import { Router } from '@reach/router';

import { DashboardContext } from 'utils/contexts';
import { encodeQueryToURL } from 'utils';
import { getAllDashboards, getDashboard } from 'services/dashboards';
import { useRequest } from 'utils/hooks';

import Layout from 'layouts';
import { DashboardList, DashboardDetails, DashboardEdit } from 'components';
import { LinkWithOrg } from 'components/LinkWithOrg';
import { AuthzGuards } from '../auth/permissions';
import { useAuth0 } from '../auth/auth0';

const EXCLUDED_FIELDS = '-geojson,-bbox2d,-centroid';

const DASHBOARD_DETAIL_QUERY = {
  include: 'layers,widgets',
  select: 'layers.id,layers.name,layers.type,widgets.id,widgets.name,widgets.type',
  sort: 'layers.name,widgets.name',
};
const INIT_CURSOR_LOCATION = '-1';

export default function DashboardsPage(props) {
  return (
    <Router>
      <Page path="/" />
      <DetailsPage path="/:page" />
      <EditPage path="/:page/edit" newDashboard={false} />
      <EditPage path="/new" newDashboard={true} />
    </Router>
  );
}

function Page(path: any) {
  const [dashboards, setDashboards] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [pageCursor, setPageCursor] = useState('-1');
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoMore, setIsNoMore] = useState(false);

  const { selectedGroup, getPermissions } = useAuth0();

  const permissions = getPermissions(AuthzGuards.accessDashboardsGuard);
  const writePermissions = getPermissions(AuthzGuards.writeDashboardsGuard);

  const handleSearchValueChange = (newValue: string) => {
    setPageCursor('-1');
    setNextCursor(null);
    setSearchValue(newValue);
  };

  const handleCursorChange = () => {
    if (nextCursor) {
      setPageCursor(nextCursor);
    }
  };

  useEffect(() => {
    async function setupDashboards() {
      setIsLoading(true);

      const dataReset = !!path.location.state && !!path.location.state.refresh;
      const query = {
        search: searchValue,
        sort: 'name',
        page: { size: pageSize, cursor: dataReset ? INIT_CURSOR_LOCATION : pageCursor },
        select: EXCLUDED_FIELDS,
        group: selectedGroup,
      };
      const encodedQuery = encodeQueryToURL('dashboards', query);
      const res: any = await getAllDashboards(encodedQuery);

      if (dataReset) {
        path.location.state.refresh = false;
      }

      setDashboards(!nextCursor || dataReset ? res.data : [...dashboards, ...res.data]);
      setNextCursor(res.pagination.nextCursor ? res.pagination.nextCursor : null);
      setIsNoMore(!res.pagination.nextCursor);

      setIsLoading(false);
    }

    permissions && setupDashboards();
  }, [path.location, pageCursor, searchValue]);

  return (
    <DashboardContext.Provider
      value={{
        dashboards,
        handleSearchValueChange,
        handleCursorChange,
        pagination: { pageCursor },
        isLoading,
        isNoMore,
        searchValue,
      }}
    >
      <Layout permission={permissions}>
        {writePermissions && (
          <div className="ng-flex ng-align-right">
            <LinkWithOrg className="ng-button ng-button-overlay" to={`/dashboards/new`}>
              Add new dashboard
            </LinkWithOrg>
          </div>
        )}
        <DashboardList />
      </Layout>
    </DashboardContext.Provider>
  );
}

function DetailsPage(path: any) {
  const { selectedGroup } = useAuth0();
  const encodedQuery = encodeQueryToURL(`dashboards/${path.page}`, {
    ...DASHBOARD_DETAIL_QUERY,
    ...{ group: selectedGroup },
  });
  const { isLoading, errors, data } = useRequest(() => getDashboard(encodedQuery), {
    permissions: AuthzGuards.accessDashboardsGuard,
    query: encodedQuery,
  });

  return (
    <Layout errors={errors} backTo="/dashboards" isLoading={isLoading}>
      <DashboardDetails data={data} />
    </Layout>
  );
}

function EditPage(path: any) {
  const { selectedGroup } = useAuth0();
  const encodedQuery = encodeQueryToURL(`dashboards/${path.page}`, {
    ...DASHBOARD_DETAIL_QUERY,
    ...{ group: selectedGroup },
  });
  const { isLoading, errors, data } = useRequest(() => getDashboard(encodedQuery), {
    permissions: AuthzGuards.writeDashboardsGuard,
    skip: path.newDashboard,
  });

  return (
    <Layout errors={errors} backTo="/dashboards" isLoading={isLoading}>
      <DashboardEdit data={data} newDashboard={path.newDashboard} />
    </Layout>
  );
}
