import React, { Component } from 'react';

class harvardBranding extends Component {
  render() {
    return (
        <div class="WithPlugins(WorkspaceControlPanel)-branding-2">
            <p class="MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter">
                <a class="MuiButtonBase-root MuiIconButton-root" tabindex="0" aria-disabled="false" href="https://library.harvard.edu/" target="_blank" rel="noopener">
                    <span class="MuiIconButton-label">
                        <img src="./images/shield_small_crimson.png" width="100%"></img>
                    </span>
                    <span class="MuiTouchRipple-root"></span>
                </a>
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
