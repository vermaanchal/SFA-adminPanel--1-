// assets
import { DashboardOutlined } from '@ant-design/icons';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
// icons
const icons = {
  DashboardOutlined,DirectionsBikeOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const updateRides = {
  id: 'update-ride',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'add-deduct-ride',
      title: 'Add/Remove Ride',
      type: 'item',
      url: '/UserRide',
      icon: icons.DirectionsBikeOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default updateRides;
