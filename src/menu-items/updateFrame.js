// assets
import { DashboardOutlined } from '@ant-design/icons';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
// icons
const icons = {
  DashboardOutlined,FilterFramesOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const updateFrame = {
  id: 'update-coins',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'update-frame',
      title: 'Add/Remove Frame',
      type: 'item',
      url: '/updateFrame',
      icon: icons.FilterFramesOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default updateFrame;
