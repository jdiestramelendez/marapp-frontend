import React from 'react';

import moment from 'moment';

import sumBy from 'lodash/sumBy';
import { format } from 'd3-format';

// Components
import WidgetTooltip from 'components/widget/tooltip';

// Helpers
import { getStats } from 'utils/widget';
import { replace, formatKM2 } from 'components/widget/utils';

import { IWidgetConfig } from 'modules/widget/model';
import { IPlace } from 'modules/places/model';
import { FireMetric } from './model';

interface FireConfig {
  metric: FireMetric;
}

export const CONFIG = {
  parse: ({ metric }: FireConfig, params, widgetConfig: IWidgetConfig, place: IPlace) => {
    if (!metric) {
      return {
        chart: [],
        noData: true,
        template: '',
      };
    }

    const { sentence } = widgetConfig;

    const chart = getStats(metric, '2001-01-01', '2018-12-31');
    const total = sumBy(chart, 'value');
    const mean = sumBy(chart, 'mean');

    return {
      chart,
      template: replace(
        sentence,
        {
          location: place.name,
          total: `${format(formatKM2(total))(total)} km²`,
          weeks: chart.filter(d => d.value > d.plusStdDev[1]).length,
          annualMean: `${format(formatKM2(mean))(mean)} km²`,
        },
        {},
        {
          className: 'ng-text-weight-bold',
        }
      ),
      config: {
        patterns: {
          diagonal: {
            attributes: {
              id: 'diagonal-stripe-1',
              patternUnits: 'userSpaceOnUse',
              patternTransform: 'rotate(-45)',
              width: 6,
              height: 6,
            },
            children: {
              rect2: {
                tag: 'rect',
                x: 0,
                y: 0,
                width: 6,
                height: 6,
                transform: 'translate(0,0)',
                fill: '#161616',
              },
              rect: {
                tag: 'rect',
                x: 0,
                y: 0,
                width: 2,
                height: 6,
                transform: 'translate(0,0)',
                fill: '#515153',
              },
            },
          },
        },
        margin: { top: 20, right: 0, left: 60, bottom: 0 },
        xKey: 'date',
        yKeys: {
          lines: {
            value: {
              stroke: '#F75353',
            },
          },
          areas: {
            plusStdDev: {
              fill: '#515153',
              stroke: '#515153',
              strokeWidth: 0,
              background: false,
              activeDot: false,
            },
            minusStdDev: {
              fill: '#515153',
              stroke: '#515153',
              strokeWidth: 0,
              background: false,
              activeDot: false,
            },
            twoPlusStdDev: {
              fill: 'url(#diagonal-stripe-1) #161616',
              stroke: '#161616',
              strokeWidth: 0,
              background: false,
              activeDot: false,
            },
            twoMinusStdDev: {
              fill: 'url(#diagonal-stripe-1) #161616',
              stroke: '#161616',
              strokeWidth: 0,
              background: false,
              activeDot: false,
            },
          },
        },

        xAxis: {
          tickCount: 12,
          interval: 4,
          tickFormatter: t => moment(t).format('MMM'),
        },

        yTitle: 'km²',
        yAxis: {
          domain: [0, 'auto'],
          allowDataOverflow: true,
        },

        cartesianGrid: {
          vertical: false,
          strokeDasharray: '6 6',
        },

        unitFormat: value => `${format(formatKM2(value))(value)}`,

        tooltip: {
          cursor: {
            opacity: 0.1,
            stroke: '#F75353',
            strokeWidth: 8,
          },
          content: (
            <WidgetTooltip
              style={{
                color: '#FFF',
                backgroundColor: '#F75353',
              }}
              settings={[
                {
                  key: 'value',
                  label: 'Area:',
                  suffix: ' km² burned',
                  format: value => format(formatKM2(value))(value),
                },
                { key: 'date', label: 'Date:' },
              ]}
            />
          ),
        },
      },
    };
  },
};

export default CONFIG;
