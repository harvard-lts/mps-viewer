import Mirador from 'mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from 'mirador-image-tools';
import miradorSharePlugin from 'mirador-share-plugin';
import miradorDownloadPlugin from 'mirador-dl-plugin';
import hideViewerNavigation from '@harvard-lts/mirador-hide-nav-plugin';
import miradorPdiiifPlugin from '@harvard-lts/mirador-pdiiif-plugin';
import harvardHelp from '@harvard-lts/mirador-help-plugin';
import miradorUrlSyncPlugin from '@harvard-lts/mirador-url-sync-plugin';
import miradorAnalyticsPlugin from '@harvard-lts/mirador-analytics-plugin';
import miradorHarvardCustomPlugin from "@harvard-lts/mirador-harvard-custom-plugin";

const viewerLocationArray = window.location.href.split('/viewer/');
const viewerLocation = viewerLocationArray[0];
const manifestId = window.miradorOptions['manifestId'];
const title = window.title;
const config = {
  id: 'demo',
  selectedTheme: 'light',
  windows: [{
    imageToolsEnabled: false,
    imageToolsOpen: false,
    manifestId: manifestId,
    // The canvasId options should be enough to open a specific canvas
    // If the canvasId doesn't exist, the URLSync plugin will resolve it to the first canvas
    canvasId: new URLSearchParams(window.location.search).get('canvasId')?.toString()
  }],
  workspace: {
    showZoomControls: true,
  },
  themes: {
    dark: {
      palette: {
        type: 'dark',
        primary: {
          main: '#0579B8',
          dark: '#2a5280'
        },
        secondary: {
          main: '#F8C21C',
          dark: '##008000',
          contrastText: '#ffff00'
        },
        error: {
          main: '#EB001B',
          dark: '#EB001B',
        },
        grey: {
          900: '#1e1e1e',
        },
        divider: '#C0C0C0',
      },
      typography: {
        fontFamily: ['Trueno','sans-serif'],
        button: {
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '1.17px',
          lineHeight: '16px',
          textTransform: 'uppercase',
          color: 'white',
          backgroundColor: '#1e1e1e',
          border: '1px solid transparent',
          padding: '5px 9px',
        },
        h2: {
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '2.1px',
          lineHeight: 1.5,
          textTransform: 'uppercase',
        },
        h3: {
          fontSize: '20px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          lineHeight: '30px',
          textTransform: 'uppercase',
        },
        caption: {
          fontSize: '14px'
        },
        overline: {
          fontSize: '12px'
        }
      }, 
      overrides: {
        MuiFab: {
          primary: {
            backgroundColor: '#A51C30',
            '&:hover': {
              backgroundColor: 'rgb(115, 19, 33)'
            }
          },
        },
        MuiTypography: {
          noWrap: {
            textTransform: 'none'
          }
        },
        MuiButton: {
          root: {
            padding: '5px 9px',
            '&:not(:first-child)': {
              marginLeft: '8px',
            },
          },
          outlined: {
            color: '#1E1E1E',
            backgroundColor: 'white',
            border: '1px solid #1E1E1E',
            padding: '5px 9px',
            '&:hover': {
              backgroundColor: '#6C6C6C',
              borderColor: '#6C6C6C'
            }
          },
          outlinedPrimary: {
            color: '#1E1E1E',
            backgroundColor: 'white',
            border: '1px solid #1E1E1E',
            '&:hover': {
              backgroundColor: '#6C6C6C',
              borderColor: '#6C6C6C'
            }
          },
          textPrimary: {
            border: '1px solid transparent',
            color: 'white',
            padding: '5px 9px',
            '&:hover': {
              backgroundColor: '#6C6C6C'
            }
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }
        },
        MuiLink: {
          root: {
            color: '#0579b8',
            borderBottom: '3px solid transparent',
            '&:hover': {
              borderBottom: '3px solid rgba(5, 121, 184, 0.3)'
            }
          },
          underlineHover: {
            textDecoration: 'none'
          },
          underlineAlways: {
            textDecoration: 'none'
          }
        },
        MuiDialogActions: {
          root: {
            padding: '20px 24px'
          }
        },
        MuiDivider: {
          root: {
            margin: '20px 0'
          }
        }
      },
    },
    light: {
      palette: {
        type: 'light',
        primary: {
          main: '#0579B8',
          dark: '#2a5280'
        },
        secondary: {
          main: '#A51C30',
          dark: '#008000',
          contrastText: '#ffff00'
        },
        error: {
          main: '#EB001B',
          dark: '#EB001B',
        },
        grey: {
          900: '#1e1e1e',
        },
        divider: '#C0C0C0',
      },
      typography: {
        fontFamily: ['Trueno','sans-serif'],
        button: {
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '1.17px',
          lineHeight: '16px',
          textTransform: 'uppercase',
          border: '1px solid transparent',
          padding: '5px 9px',
        },
        h2: {
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '2.1px',
          lineHeight: 1.5,
          textTransform: 'uppercase',
        },
        h3: {
          fontSize: '20px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          lineHeight: '30px',
          textTransform: 'uppercase',
        },
        caption: {
          fontSize: '14px'
        },
        overline: {
          fontSize: '12px'
        }
      },
      overrides: {
        MuiFab: {
          root: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          },
          extended: {
            borderRadius: '4px',
            padding: '12px 23px',
            fontSize: '14px',
            lineHeight: '19px'
          }
        },
        MuiPaper: {
          root: {
            color: '#1E1E1E'
          }
        },
        MuiTypography: {
          noWrap: {
            textTransform: 'none'
          }
        },
        MuiButton: {
          root: {
            padding: '5px 9px',
            '&:not(:first-child)': {
              marginLeft: '8px',
            },
          },
          outlined: {
            color: '#1E1E1E',
            backgroundColor: 'white',
            border: '1px solid #1E1E1E',
            padding: '5px 9px',
            '&:hover': {
              color: 'white',
              backgroundColor: '#6C6C6C',
              borderColor: '#6C6C6C'
            }
          },
          outlinedPrimary: {
            color: '#1E1E1E',
            backgroundColor: 'white',
            border: '1px solid #1E1E1E',
            '&:hover': {
              backgroundColor: '#6C6C6C',
              borderColor: '#6C6C6C'
            }
          },
          text: {
            color: 'white !important',
            backgroundColor: '#1E1E1E',
            padding: '5px 9px',
            '&:hover': {
              backgroundColor: '#6C6C6C'
            }
          },
          textPrimary: {
            '&:hover': {
              backgroundColor: '#6C6C6C'
            }
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          },
        },
        MuiLink: {
          root: {
            color: '#0579b8',
            borderBottom: '3px solid transparent',
            '&:hover': {
              borderBottom: '3px solid rgba(5, 121, 184, 0.3)'
            }
          },
          underlineHover: {
            textDecoration: 'none'
          },
          underlineAlways: {
            textDecoration: 'none'
          }
        },
        MuiDialogActions: {
          root: {
            padding: '20px 24px'
          }
        },
        MuiDivider: {
          root: {
            margin: '20px 0'
          }
        }
      },
    },
  },
  translations: { // list of these from mirador/src/locales/en/translation.json
    "en": {
      "cancel": "Close",
      "canvasIndex": "Table of Contents",
    }
  },
  miradorSharePlugin: {
    iiifInfoLink: 'https://iiif.io',
    embedOption: {
      enabled: true,
      embedIframeAttributes: "frameborder='0' marginwidth='0' marginheight='0' scrolling='no' allowfullscreen",
      embedIframeTitle: title,
      syncIframeDimensions: {
        height: { param: 'maxheight' },
      },
      embedUrlReplacePattern: [
        /.*/,
        viewerLocation+'/viewer/?manifestId='+manifestId,
      ],
    },
    shareLink: {
      enabled: true,
      manifestIdReplacePattern: [
        /.*/,
        viewerLocation+'/viewer/?manifestId='+manifestId,
      ],
    },
  },
  miradorPDIIIFPlugin: {
    // For the PDIIIF we need to pass where to access the mitm.html file for streamsaver
    // If it's an iframe embedded elsewhere, it will need the origin from frameElement.src
    // If it's viewed directly it will need origin from the address bar
    mitmPath: `${new URL(window?.frameElement?.src ?? window.origin).origin}/pdiiif/mitm.html`,
    coverPageEndpoint: process.env.PDIIIF_COVERPAGE_ENDPOINT,
  },
  miradorAnalyticsPlugin: {
    containerId:'GTM-WSHSDQ5',
  },
};

const plugins = [
  ...miradorDownloadPlugin,
  ...miradorPdiiifPlugin,
  ...miradorSharePlugin,
  ...miradorImageToolsPlugin,
  ...miradorAnalyticsPlugin,
  miradorUrlSyncPlugin,
  harvardHelp,
  hideViewerNavigation,
  miradorHarvardCustomPlugin,
]

Mirador.viewer(config, plugins);
