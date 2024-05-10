// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';
import ReduceCapacityOutlinedIcon from '@mui/icons-material/ReduceCapacityOutlined';
// icons
const icons = {
  VideoCameraAddOutlined,ReduceCapacityOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const assignrole = {
  id: 'assign-role',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'assign-role',
      title: 'Assign Role',
      type: 'item',
      url: '/AssignRole',
      icon: icons.ReduceCapacityOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default assignrole;
