import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import EventIcon from '@material-ui/icons/Event';
import SchoolIcon from '@material-ui/icons/School';
import ExploreIcon from '@material-ui/icons/Explore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WebAssetIcon from '@material-ui/icons/WebAsset';


export const linksListItems = (
    <div>
        <ListSubheader inset>
            Links to Related Sites
        </ListSubheader>
        <ListItem button component="a" href="http://affectsociety.com">
            <ListItemIcon>
                <WebAssetIcon />
            </ListItemIcon>
            <ListItemText primary="#SSASS" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Site 2" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Site 3" />
        </ListItem>
    </div>
);

export const how2Join = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="How to Joint Us" />
        </ListItem>
    </div>
);
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Recent Events</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Event 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Event 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Event 3" />
    </ListItem>
  </div>
);