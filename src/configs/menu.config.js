import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EditIcon from '@mui/icons-material/Edit';

const menuList = [
    {
        path: '/',
        title: 'Home',
        icon: <HomeOutlinedIcon />,
    },
    {
        title: 'Setting',
        icon: <SettingsIcon />,
        subMenu: [
            {
                path: '/edit',
                title: 'Edit profile',
                icon: <EditIcon />
            },
        ]
    },
]

export default menuList;