// assets
import { StopOutlined } from '@ant-design/icons';
import AppBlockingOutlinedIcon from '@mui/icons-material/AppBlockingOutlined';
// icons
const icons = {
  StopOutlined,
  AppBlockingOutlinedIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const accountStatus = {
  id: 'account-status',
  title: 'Account Status',
  type: 'group',
  children: [
    {
      id: 'id-ban/unban',
      title: 'ID Ban/UnBan',
      type: 'item',
      url: '/IDBanUnBan',
      icon: icons.StopOutlined
    },
    {
      id: 'device-id',
      title: 'Device Id Block/UnBlock',
      type: 'item',
      url: '/DeviceBlock',
      icon: icons.AppBlockingOutlinedIcon,
    }
  ]
};

export default accountStatus;
