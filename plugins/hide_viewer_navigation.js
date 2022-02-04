import React, { Component } from 'react';

let search = window.location.search;
let params = new URLSearchParams(search);
let removePager = params.get('removePager');
let exportSettings = {};

class hideViewerNavigation extends Component {
  render() {
    return (
      <></>
    );
  }
}

if (removePager == 1) {
  exportSettings = {
    target: 'ViewerNavigation',
    mode: 'wrap',
    component: hideViewerNavigation,
  }
}
else {
  exportSettings = {}
}

export default exportSettings;
