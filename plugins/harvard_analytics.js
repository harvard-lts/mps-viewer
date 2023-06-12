import React, { Component } from 'react';
import $ from "jquery";

class harvardAnalytics extends Component {
  render() {

    return (
      <></>
    );
  }

  componentDidMount() {
    $("head").prepend(
      "<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WSHSDQ5');</script><!-- End Google Tag Manager -->"
    );
    $("body").prepend(
      '<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WSHSDQ5"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->'
    );
  }
}

export default {
  target: 'Window',
  mode: 'add',
  component: harvardAnalytics,
}