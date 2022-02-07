import React, { Component } from 'react';
import { getManifestoInstance } from 'mirador/dist/es/src/state/selectors/manifests';

class hideViewerNavigation extends Component {

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

    return (
      <></>
    );
  }

  componentDidUpdate() {
    let viewingHint = this.viewingHint();

    if (viewingHint == 'individuals') {
      const caption = window.document.getElementsByClassName("mirador-osd-info"); 
      const pager = window.document.getElementsByClassName("mirador-osd-navigation");
      const divider = window.document.getElementsByClassName("Connect(WithPlugins(ZoomControls))-divider-91");
      while(caption.length > 0){ 
        caption[0].parentNode.removeChild(caption[0]);
      }
      while(pager.length > 0){ 
          pager[0].parentNode.removeChild(pager[0]);
      }
      while(divider.length > 0){ 
        divider[0].parentNode.removeChild(divider[0]);
    }
    }
  }
}

const mapStateToProps = (state, { windowId }) => ({
  manifestId: (getManifestoInstance(state, { windowId }) || {}).id,
  manifest: getManifestoInstance(state, { windowId }),
});

export default {
  target: 'Window',
  mode: 'add',
  component: hideViewerNavigation,
  mapStateToProps,
}
