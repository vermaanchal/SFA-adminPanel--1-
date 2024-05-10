// assets
import { UserSwitchOutlined } from '@ant-design/icons';
// icons
const icons = {
    UserSwitchOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const appUserDetail = {
  id: 'app-user',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'app-user-details',
      title: 'App User Details',
      type: 'item',
      url: '/appuserdetails',
      icon: icons.UserSwitchOutlined,
    //   breadcrumbs: false
    }
  ]
};

export default appUserDetail;
