// assets
import { AudioOutlined, VideoCameraOutlined } from '@ant-design/icons';

// icons
const icons = {
    AudioOutlined,
    VideoCameraOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const streamingDetail = {
  id: 'Streaming-details',
  title: 'Streaming Details',
  type: 'group',
  children: [
    {
      id: 'audio-streaming',
      title: 'Audio Streaming',
      type: 'item',
      url: '/audiostreaming',
      icon: icons.AudioOutlined
    },
    {
      id: 'video-streaming',
      title: 'Video Streaming',
      type: 'item',
      url: '/videostreaming',
      icon: icons.VideoCameraOutlined,
    }
  ]
};

export default streamingDetail;
