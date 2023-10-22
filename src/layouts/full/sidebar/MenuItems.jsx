import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,IconFile,IconCloudUpload
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Analysis',
  },
  {
    id: uniqueId(),
    title: 'Fundamental ',
    icon: IconTypography,
    href: '/utilities/typography',
  },
  {
    id: uniqueId(),
    title: 'Technical ',
    icon: IconCopy,
    href: '/dashboard/technicalanalysis',
  },
  {
    navlabel: true,
    subheader: 'Portfolio',
  },
  {
    id: uniqueId(),
    title: 'Anaslysis',
    icon: IconLogin,
    href: '/authentication/login',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/authentication/signup',
  // },
  {
    navlabel: true,
    subheader: 'Upload',
  },
  {
    id: uniqueId(),
    title: 'My Files',
    icon: IconFile,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Upload File',
    icon: IconCloudUpload,
    href: '/upload',
  },
];

export default Menuitems;
