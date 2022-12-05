import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export const menuList = [
    {
        to: '/',
        title: 'Home',
        icon: <HomeOutlinedIcon />,
    },
    {
        to: '/setting',
        title: 'Setting',
        icon: <SettingsIcon />,
        submenu: [
            {
                to: 'setting/edit',
                title: 'Edit profile',
            },
        ]
    },
]