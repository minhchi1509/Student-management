import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EditIcon from '@mui/icons-material/Edit';
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
                icon: <EditIcon />
            },
        ]
    },
]