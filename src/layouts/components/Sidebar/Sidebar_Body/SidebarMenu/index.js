import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { List } from '@mui/material';
import SidebarItemCollapse from './SidebarItemCollapse';
import SidebarItemSingle from './SidebarItemSingle';

const menuItemList = [
    {
        to: '/',
        title: 'Home',
        icon: <HomeOutlinedIcon />,
    },
    {
        title: 'Setting',
        icon: <SettingsIcon />,
        subItemList: [
            {
                to: '/edit',
                title: 'Edit profile',
                icon: <EditIcon />
            },
        ]
    },
]

export default function SidebarItem() {
    return (
        <List className='flex flex-col gap-2'>
            {menuItemList.map((item, index) => (
                item.subItemList ? <SidebarItemCollapse key={index} item={item} /> : <SidebarItemSingle key={index} item={item} />
            ))}
        </List>
    )
}
