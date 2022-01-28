import React, { Component } from 'react';

class customMetadata extends Component {
  render() {
    return (
        <h5 class="MuiTypography-root MuiTypography-h4">Custom metadata!</h5>
    );
  }
}

export default {
  target: 'Window',
  mode: 'add',
  component: customMetadata,
}