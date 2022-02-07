import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

// select an icon from material icons to import and use: https://v4.mui.com/components/material-icons/
import StarIcon from '@material-ui/icons/Star';


const templateDialogReducer = (state = {}, action) => {
  if (action.type === 'OPEN_WINDOW_DIALOG') {
    return {
      ...state,
      [action.windowId]: {
        openDialog: action.dialogType,
      },
    };
  }

  if (action.type === 'CLOSE_WINDOW_DIALOG') {
    return {
      ...state,
      [action.windowId]: {
        openDialog: null,
      },
    };
  }
  return state;
};

const mapDispatchToProps = (dispatch, { windowId }) => ({
  openDialog: () => dispatch({ type: 'OPEN_WINDOW_DIALOG', windowId, dialogType: 'template' }),
});

class template extends Component {
  openDialogAndCloseMenu() {
    const { handleClose, openDialog } = this.props;

    openDialog();
    handleClose();
  }

  render() {
    return (
      <div>
        <MenuItem onClick={() => this.openDialogAndCloseMenu()}>
          <ListItemIcon>
            {/* insert icon of choise; make sure icons is included in top of this file */}
            <StarIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: 'body1' }}>
            Plugin Template
          </ListItemText>
        </MenuItem>
      </div>
    );
  }
}

template.propTypes = {
  handleClose: PropTypes.func,
  openTemplateDialog: PropTypes.func,
};

template.defaultProps = {
  handleClose: () => {},
  openTemplateDialog: () => {},
};

export default {
  target: 'WindowTopBarPluginMenu',
  mode: 'add',
  name: 'templatePlugin',
  component: template,
  mapDispatchToProps,
  reducers: {
    windowDialogs: templateDialogReducer,
  },
}