// assets
import ConnectedTvOutlinedIcon from '@mui/icons-material/ConnectedTvOutlined';
// icons
const icons = {
    ConnectedTvOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const endUserStream = {
  id: 'end-user-stream',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'end-user-stream',
      title: 'End User Stream',
      type: 'item',
      url: '/UserLiveDetails',
      icon: icons.ConnectedTvOutlinedIcon,
      // breadcrumbs: false
    }
  ]
};

export default endUserStream;
