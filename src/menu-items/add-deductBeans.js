// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const updateBeans = {
  id: 'update-beans',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'add-deduct-beans',
      title: 'Add/Deduct Beans ',
      type: 'item',
      url: '/BeanTransferView',
      icon: icons.DashboardOutlined,
      // breadcrumbs: false
    }
  ]
};

export default updateBeans;
