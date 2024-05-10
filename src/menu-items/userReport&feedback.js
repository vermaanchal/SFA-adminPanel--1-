// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
// icons
const icons = {
  VideoCameraAddOutlined,ContactMailOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const userReportfeedback = {
  id: 'user-report-feedback',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'user-report-feedback',
      title: 'UserReport &Feedback',
      type: 'item',
      url: '/UserReport',
      icon: icons.ContactMailOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default userReportfeedback;
