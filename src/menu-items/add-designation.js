// assets
import { DashboardOutlined } from '@ant-design/icons';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
// icons
const icons = {
  DashboardOutlined,PersonSearchOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const addDesignation = {
  id: 'update-ride',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'add-designation',
      title: 'Add Designation',
      type: 'item',
      url: '/CreateDesignation',
      icon: icons.PersonSearchOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default addDesignation;
