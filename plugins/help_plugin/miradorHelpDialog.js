import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { getCanvasLabel, getVisibleCanvases, selectInfoResponse } from 'mirador/dist/es/src/state/selectors/canvases';
import { getWindowViewType } from 'mirador/dist/es/src/state/selectors/windows';
import { getContainerId } from 'mirador/dist/es/src/state/selectors/config';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import DescriptionIcon from '@material-ui/icons/Description';
import ErrorIcon from '@material-ui/icons/Error';

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => dispatch({ type: 'CLOSE_WINDOW_DIALOG', windowId }),
});

const mapStateToProps = (state, { windowId }) => ({
  canvases: getVisibleCanvases(state, { windowId }),
  canvasLabel: canvasId => (getCanvasLabel(state, { canvasId, windowId })),
  containerId: getContainerId(state),
  infoResponse: canvasId => (selectInfoResponse(state, { windowId, canvasId }) || {}),
  open: (state.windowDialogs[windowId] && state.windowDialogs[windowId].openDialog === 'help'),
  viewType: getWindowViewType(state, { windowId }),
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

/**
 * harvardHelpDialog ~
*/
export class harvardHelpDialog extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      canvases,
      canvasLabel,
      classes,
      closeDialog,
      containerId,
      infoResponse,
      open,
      viewType,
      windowId,
    } = this.props;

    if (!open) return ('');

    return (
      <Dialog
        container={document.querySelector(`#${containerId} .mirador-viewer`)}
        disableEnforceFocus
        onClose={closeDialog}
        open={open}
        scroll="paper"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle disableTypography className={classes.h2}>
          <Typography variant="h2">Help</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            (optional text if need more description)
          </DialogContentText>
          
          <List>
            <ListItemLink href="#">
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText>Take a tour</ListItemText>
            </ListItemLink>
            <ListItemLink href="#">
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText>Read documentation</ListItemText>
            </ListItemLink>
            <ListItemLink href="#">
              <ListItemIcon>
                <ErrorIcon />
              </ListItemIcon>
              <ListItemText>Report a problem</ListItemText>
            </ListItemLink>
          </List>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

harvardHelpDialog.propTypes = {
  canvasLabel: PropTypes.func.isRequired,
  canvases: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, index: PropTypes.number }),
  ),
  classes: PropTypes.shape({
    h2: PropTypes.string,
    h3: PropTypes.string,
  }).isRequired,
  closeDialog: PropTypes.func.isRequired,
  containerId: PropTypes.string.isRequired,
  infoResponse: PropTypes.func.isRequired,
  open: PropTypes.bool,
  viewType: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};

harvardHelpDialog.defaultProps = {
  canvases: [],
  open: false,
};

const styles = () => ({
  h2: {
    paddingBottom: 0,
  },
  h3: {
    marginTop: '20px',
  },
});

export default {
  target: 'Window',
  mode: 'add',
  name: 'harvardHelpDialog',
  component: withStyles(styles)(harvardHelpDialog),
  mapDispatchToProps,
  mapStateToProps,
};
