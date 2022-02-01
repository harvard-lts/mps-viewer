import React, { Component } from 'react';
import { getManifestoInstance } from 'mirador/dist/es/src/state/selectors/manifests';
import Typography from '@material-ui/core/Typography';
import { LabelValueMetadata } from 'mirador/dist/es/src/components/LabelValueMetadata';

class customMetadata extends Component {
  viewingHint() {
    const { manifest } = this.props;
    if (!(
      manifest
      && manifest.getSequences()
      && manifest.getSequences()[0]
      && manifest.getSequences()[0].getProperty('viewingHint')
    )) return [''];

    return manifest.getSequences()[0].getProperty('viewingHint');
  }

  render() {
    const {
      manifestId,
    } = this.props;

    return (
        <div>
          <Typography variant="h5" component="h6">Custom metadata</Typography>
          <LabelValueMetadata labelValuePairs={[{ label: 'Manifest ID', values: [manifestId] }]} />
          <LabelValueMetadata labelValuePairs={[{ label: 'Viewing Hint', values: [this.viewingHint()] }]} />
        </div>
    );
  }

}

const mapStateToProps = (state, { windowId }) => ({
  manifestId: (getManifestoInstance(state, { windowId }) || {}).id,
  manifest: getManifestoInstance(state, { windowId }),
});

export default {
  target: 'Window',
  mode: 'add',
  component: customMetadata,
  mapStateToProps,
}
