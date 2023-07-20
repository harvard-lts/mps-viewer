import React, { Component } from 'react';

class harvardBranding extends Component {
  render() {
    return (
        <div class="WithPlugins(WorkspaceControlPanel)-branding-2">
            <p class="MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter">
              <img src="/images/shield_small_crimson.png" alt="" height="40px" width="40px"></img>
            </p>
        </div>
    );
  }
}

export default {
  target: 'Branding',
  mode: 'wrap',
  component: harvardBranding,
}
