import LegendEVIComponent from './component';
import { connect } from 'react-redux';
import { setLayerSettings } from 'modules/layers/actions';

export default connect(null, {
  setLayerSettings,
})(LegendEVIComponent);
