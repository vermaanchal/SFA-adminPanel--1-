// assets
import { VideoCameraAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  VideoCameraAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const VideoRecord = {
  id: 'video-record',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'video-record',
      title: 'Video Record',
      type: 'item',
      url: '/VideoUploadRecord',
      icon: icons.VideoCameraAddOutlined,
      // breadcrumbs: false
    }
  ]
};

export default VideoRecord;
