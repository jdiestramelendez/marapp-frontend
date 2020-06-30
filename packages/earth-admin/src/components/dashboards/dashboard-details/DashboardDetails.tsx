import * as React from 'react';

import renderHTML from 'react-render-html';

import { DashboardProps } from '../model';
import { useState } from 'react';
import { ActionModal } from 'components/action-modal';
import { LinkWithOrg } from 'components/LinkWithOrg';
import { useAuth0 } from 'auth/auth0';
import { AuthzGuards } from 'auth/permissions';

export default function DashboardDetails(props: DashboardProps) {
  const {
    data: { id, slug, name, description, published, layers, widgets },
  } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { getPermissions } = useAuth0();

  const writePermissions = getPermissions(AuthzGuards.writeDashboardsGuard);

  const publishIcon = published ? 'check' : 'close';

  function handleDeleteToggle() {
    setShowDeleteModal(!showDeleteModal);
  }

  return (
    <div>
      {showDeleteModal && (
        <ActionModal
          id={id}
          navigateRoute={'dashboards'}
          name={name}
          toggleModal={handleDeleteToggle}
          visibility={showDeleteModal}
        />
      )}
      <div className="ng-flex ng-flex-space-between">
        <h2 className="ng-text-display-m ng-c-flex-grow-1">{name}</h2>
        <div className="ng-flex ng-align-center ng-flex-center ng-text-center ng-center">
          <span className="ng-padding-horizontal">
            Published
            <br />
            <i className={`ng-icon-${publishIcon}`}></i>
          </span>
        </div>
      </div>

      <div className="ng-padding-medium ng-background-white ng-margin-medium-bottom">
        <h3 className="ng-text-display-s">Dashboard details</h3>
        <p>
          <span className="ng-text-weight-medium">Dashboard description:</span>
        </p>
        {description && <div className="ng-border-add ng-padding">{renderHTML(description)}</div>}

        <p>
          <span className="ng-text-weight-medium">Dashboard slug: </span>
          {slug || '-'}
        </p>
      </div>

      {layers && layers.length > 0 && (
        <div className="ng-padding-medium ng-background-white ng-margin-medium-bottom">
          <span className="ng-text-weight-medium">Dashboard layers: </span>
          <div className="ng-flex ng-flex-wrap">
            {layers.map((layer) => (
              <LinkWithOrg
                to={`/layers/${layer.id}`}
                key={layer.id}
                className="ng-margin-medium-right"
              >
                {layer.name}
              </LinkWithOrg>
            ))}
          </div>
        </div>
      )}

      {widgets && widgets.length > 0 && (
        <div className="ng-padding-medium ng-background-white ng-margin-medium-bottom">
          <span className="ng-text-weight-medium">Dashboard widgets: </span>
          <div className="ng-flex ng-flex-wrap">
            {widgets.map((widget) => (
              <LinkWithOrg
                to={`/widgets/${widget.id}`}
                key={widget.id}
                className="ng-margin-medium-right"
              >
                {widget.name}
              </LinkWithOrg>
            ))}
          </div>
        </div>
      )}

      <div className="ng-padding-medium ng-background-white ng-margin-medium-bottom">
        {writePermissions && (
          <LinkWithOrg
            className="ng-button ng-button-primary ng-margin-medium-right"
            to={`/dashboards/${id}/edit`}
          >
            Edit dashboard
          </LinkWithOrg>
        )}
        <LinkWithOrg to="/dashboards" className="ng-button">
          Go back to dashboards list
        </LinkWithOrg>
      </div>
      {writePermissions && (
        <div className="ng-padding-medium ng-background-white ng-text-right">
          <button className="ng-button ng-button-primary" onClick={handleDeleteToggle}>
            Delete dashboard
          </button>
        </div>
      )}
    </div>
  );
}
