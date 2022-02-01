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

const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeDialog: () => dispatch({ type: 'CLOSE_WINDOW_DIALOG', windowId }),
});

const mapStateToProps = (state, { windowId }) => ({
  canvases: getVisibleCanvases(state, { windowId }),
  canvasLabel: canvasId => (getCanvasLabel(state, { canvasId, windowId })),
  containerId: getContainerId(state),
  infoResponse: canvasId => (selectInfoResponse(state, { windowId, canvasId }) || {}),
  open: (state.windowDialogs[windowId] && state.windowDialogs[windowId].openDialog === 'template'),
  viewType: getWindowViewType(state, { windowId }),
});


/**
 * templateDialog ~
*/
export class templateDialog extends Component {
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
          <Typography variant="h2">Plugin Template</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a template for using dialog boxes from the top nav bar.
          </DialogContentText>
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

templateDialog.propTypes = {
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

templateDialog.defaultProps = {
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
  name: 'templateDialog',
  component: withStyles(styles)(templateDialog),
  mapDispatchToProps,
  mapStateToProps,
};
