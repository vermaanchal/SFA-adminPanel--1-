// assets
import { DashboardOutlined } from '@ant-design/icons';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
// icons
const icons = {
  DashboardOutlined,MonetizationOnOutlinedIcon,PriceChangeOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const updateCoins = {
  id: 'update-coins',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'add-deduct-coins',
      title: 'Add/Deduct Coins',
      type: 'item',
      url: '/UpdateUserCoin',
      icon: icons.PriceChangeOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default updateCoins;
