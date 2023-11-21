import React from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';


const CreateBtn = () => (
  <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
{/*     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      +
    </button> */}
    <div className='w-fit h-fit rounded-full bg-white'>
    <AddCircleRoundedIcon className='text-[70px] text-[#4338ca]'/>
    </div>
  </div>
);

export default CreateBtn;
