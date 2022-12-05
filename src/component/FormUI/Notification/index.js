import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../component/Modal';

export default function Notification({ open, icon, head, details }) {
    const navigate = useNavigate();

    return (
        <Modal open={open} className='w-full max-w-sm bg-white rounded-lg p-10'>
            <div className='flex flex-col items-center'>
                <IconButton className='text-green-600 scale-[3]' size='large' disableRipple={true}>
                    {icon}
                </IconButton>
                <p className='text-2xl text-green-600 font-[500] mt-4'>{head}</p>
                <p
                    className='text-center text-md text-gray-500 font-[400] mt-7'
                >
                    {details}
                </p>
                <button
                    className='w-36 h-8 rounded-full bg-green-600 hover:bg-green-700 cursor-pointer text-white duration-300 mt-5'
                    onClick={() => navigate('/login')}
                >
                    Ok
                </button>
            </div>
        </Modal>
    )
}
