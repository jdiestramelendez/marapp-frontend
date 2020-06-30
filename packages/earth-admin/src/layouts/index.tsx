import React from 'react';
import { Sidebar } from 'components';
import { ErrorMessages } from 'components/error-messages';
import { LinkWithOrg } from 'components/LinkWithOrg';
import { Spinner } from '@marapp/earth-components';
import Helmet from 'react-helmet'

//todo add react helmet
import '../styles/app.scss';
import { APP_NAME } from '../theme';

interface ILayoutProps {
  children: any;
  permission?: boolean;
  errors?: Object[];
  backTo?: string;
  isLoading?: boolean;
}

interface IUnauthorizedProps {
  message: string;
}

const Unauthorized = (props: IUnauthorizedProps) => {
  const { message } = props;

  return (
    <div className="ng-flex ng-flex-middle">
      <div className="ng-margin-medium-left">
        <h3 className="ng-text-edit-m">{message}</h3>
      </div>
    </div>
  );
};

export default function MainLayout(props: ILayoutProps) {
  const {
    permission = true, // backwards compatibility, permission moves to errors array
    errors = [],
    backTo = '/',
    isLoading,
  } = props;

  const Content = () => {
    if (isLoading) {
      return <Spinner size="medium" />;
    }
    if (!permission) {
      return <Unauthorized message="You are not authorized to view this page" />;
    }
    if (errors.length) {
      return (
        <div>
          <ErrorMessages errors={errors} />
          <LinkWithOrg className="ng-button" to={backTo}>
            Back
          </LinkWithOrg>
        </div>
      );
    }

    return props.children;
  };

  return (
    <div className="ng-flex">
      <Helmet>
        <link rel="icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=" />
        <title>{ APP_NAME }</title>
      </Helmet>
      <Sidebar />
      <div className="ng-page-container">
        <div className="ng-padding-large">
          <Content />
        </div>
      </div>
    </div>
  );
}
