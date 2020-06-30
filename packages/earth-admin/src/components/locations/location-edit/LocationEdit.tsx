import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { navigate } from 'gatsby';

import { formatDate } from 'utils';

import { useForm, Controller } from 'react-hook-form';
import { JSHINT } from 'jshint';

import { LocationProps, LocationTypeEnum } from '../model';
import { handleLocationForm } from 'services/locations';
import { JsonEditor } from 'components/json-editor';
import { ErrorMessages } from 'components/error-messages';
import { LinkWithOrg } from 'components/LinkWithOrg';
import { Auth0Context } from 'utils/contexts';

const INPUT_SIZE_CLASSNAME = 'ng-width-1-1 ng-form-large';

export default function LocationEdit(props: LocationProps) {
  const {
    data: {
      id,
      slug,
      featured,
      geojson,
      published,
      bbox2d,
      areaKm2,
      centroid,
      type,
      name,
      description,
      createdAt,
      updatedAt,
    },
    newLocation,
  } = props;

  const { getValues, register, formState, triggerValidation, control } = useForm({
    mode: 'onChange',
  });

  const [geojsonValue, setGeojson] = useState();
  const [serverErrors, setServerErrors] = useState(null);
  const [jsonError, setJsonError] = useState(false);

  const { selectedGroup } = useContext(Auth0Context);

  useEffect(() => {
    setGeojson(newLocation ? {} : geojson);
    triggerValidation();
  }, [geojson]);

  async function onSubmit(e) {
    e.preventDefault();

    const formData = getValues();
    try {
      await handleLocationForm(props.newLocation, formData, id, selectedGroup);
      await navigate(`${selectedGroup}/locations`);
    } catch (error) {
      setServerErrors(error.data.errors);
    }
  }

  const handleJsonChange = (json) => {
    try {
      JSON.parse(json);
    } catch (err) {
      setJsonError(true);
    }
    if (!JSHINT.errors.length) {
      const parsedJson = JSON.parse(json);
      setGeojson(parsedJson);
      setJsonError(false);
      return parsedJson;
    }
    setJsonError(true);
  };

  return (
    <div>
      <div className="ng-flex ng-flex-space-between">
        <h2 className="ng-text-display-m">{ newLocation ? 'Add Location' : `Edit Location - ${name}` }</h2>

        <span>
          Last updated at: {formatDate(updatedAt)}; Created at: {formatDate(createdAt)}
        </span>
      </div>

      <div className="ng-padding-medium ng-background-white">
        <form className="ng-form ng-flex-column ng-width-4-5">
          <div className="ng-margin-medium-bottom ng-grid">
            <div className="ng-width-large-1-2 ng-width-1-1">
              <label className="ng-form-label" htmlFor="name">
                Location name*
              </label>
              <input
                ref={register({
                  required: true,
                })}
                name="name"
                type="text"
                defaultValue={name}
                placeholder="Location name"
                className={INPUT_SIZE_CLASSNAME}
              />
            </div>
            <div className="ng-width-large-1-2 ng-width-1-1">
              <label htmlFor="slug">Location slug*</label>
              <input
                ref={register({
                  required: true,
                })}
                name="slug"
                type="text"
                defaultValue={slug}
                placeholder="Location slug"
                className={INPUT_SIZE_CLASSNAME}
              />
            </div>
          </div>
          <div className="ng-margin-medium-bottom ng-grid">
            <div className="ng-width-large-1-1 ng-width-1-1">
              <label className="ng-form-label" htmlFor="description">
                Location description
              </label>
              <textarea
                ref={register}
                name="description"
                defaultValue={description}
                placeholder="Location description"
                className={INPUT_SIZE_CLASSNAME}
              />
            </div>
          </div>

          <div className="ng-margin-medium-bottom ng-grid">
            <div className="ng-width-large-1-2 ng-width-1-1">
              <label htmlFor="type">Location type</label>
              <select
                className="ng-width-1-1 ng-form-large"
                id="type"
                ref={register({
                  required: true,
                })}
                name="type"
                defaultValue={type}
              >
                {Object.keys(LocationTypeEnum).map((t, idx) => (
                  <option
                    key={idx}
                    value={LocationTypeEnum[t]}
                    selected={type === LocationTypeEnum[t]}
                  >
                    {LocationTypeEnum[t]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ng-margin-medium-bottom ng-grid">
            <div className="ng-width-large-1-2 ng-width-1-1">
              <div className="ng-margin-medium-bottom">
                <input
                  ref={register}
                  name="featured"
                  id="featured"
                  type="checkbox"
                  defaultChecked={featured}
                  className="ng-margin-right"
                />
                <label htmlFor="featured">Featured?</label>
              </div>

              <div className="ng-margin-medium-bottom">
                <input
                  ref={register}
                  name="published"
                  id="published"
                  type="checkbox"
                  defaultChecked={published}
                  className="ng-margin-right"
                />
                <label htmlFor="published">Published?</label>
              </div>
            </div>
          </div>

          <div className="ng-margin-medium-bottom">
            {!!geojsonValue && (
              <Controller
                name="geojson"
                control={control}
                defaultValue={geojsonValue}
                onChange={(layerConfig) => handleJsonChange(layerConfig)}
                as={<JsonEditor json={geojsonValue} />}
              />
            )}
          </div>

          <p>
            <span className="ng-text-weight-medium">Bbox2d: </span>
            {bbox2d || '-'}
          </p>
          <p>
            <span className="ng-text-weight-medium">AreaKm2: </span>
            {areaKm2 || '-'}
          </p>

          {serverErrors && <ErrorMessages errors={serverErrors} />}

          <div className="ng-flex">
            <button
              className="ng-button ng-button-primary ng-margin-medium-right"
              onClick={onSubmit}
              disabled={!formState.isValid || jsonError}
            >
              Save
            </button>

            <LinkWithOrg className="ng-button" to="/locations">
              Cancel
            </LinkWithOrg>
          </div>
        </form>
      </div>
    </div>
  );
}
