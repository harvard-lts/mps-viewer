import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import HelpIcon from '@material-ui/icons/Help';

class harvardHelp extends Component {
  render() {
    return (
      <div>
        <MenuItem>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
            Help
          </ListItemText>
        </MenuItem>
      </div>
    );
  }
}

export default {
  mode: 'add',
  component: harvardHelp,
  name: 'harvardHelpPlugin',
  target: 'WindowTopBarPluginMenu',
}