// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
// icons
const icons = {
  AdminPanelSettingsOutlinedIcon,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  ContactPhoneOutlinedIcon,
  SupportAgentOutlinedIcon,
  SupervisorAccountOutlinedIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const requests = {
  id: 'requests',
  title: 'Requests',
  type: 'group',
  children: [
    {
      id: 'admin-request',
      title: 'Admin Request',
      type: 'item',
      url: '/AdminRequest',
      icon: icons.AdminPanelSettingsOutlinedIcon
    },
    {
      id: 'agency-request',
      title: 'Agency Request',
      type: 'item',
      url: '/AgencyRequest',
      icon: icons.SupportAgentOutlinedIcon
    },
    {
      id: 'host-request',
      title: 'Host Request',
      type: 'item',
      url: '/HostRequest',
      icon: icons.ContactPhoneOutlinedIcon
    },
    {
      id: 'admin-agency-host',
      title: ' Admin/Agency/Host',
      type: 'item',
      url: '/AdminAgencyHost',
      icon: icons.SupervisorAccountOutlinedIcon,
      // breadcrumbs: false
    },
   
  ]
};

export default requests;
