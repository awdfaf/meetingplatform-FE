'use client'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useState } from 'react';
import NcModal from '@/components/NcModal/NcModal';
import SaveIcon from '@mui/icons-material/Save';
import { useSession } from 'next-auth/react';

export default function HeaderMeetCreate() {

  const query = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()
  console.log(query?.get('step'));
  console.log(pathName);

  const session = useSession();

  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TempSave = async () => {
    // if (!token) {
    //   console.error("Token is not provided.");
    //   return;
    // }
    try {
      const response = await fetch(`https://moamoa-backend.duckdns.org/api/v1/meeting-feature/temp-meeting`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userUuid: session.data?.user.userUuid,
          tempUrl: `/meeting/create/?${searchParams?.toString()}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.isSuccess === true) {
        // router.push('/');
        console.log(data);
      }
      else {

      }

    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  const styles = {

    largeIcon: {
      width: 60,
      height: 60,
    },

  };

  return (
    <header className='w-full fixed top-0 bg-white z-50 backdrop:blur-md'>
      <nav className='container'>
        <NcModal
          isOpenProp={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          modalTitle="임시 저장 하시겠습니까?"
          renderContent={() => (
            <div className='flex flex-col items-center'>

              <SaveIcon className='text-[70px]' />

              <div className='flex justify-between mt-4 gap-10'>
                <button className='bg-[#4338ca] text-white font-semibold py-2 px-8 rounded-full'
                  onClick={() => {
                    // console.log(searchParams.toString())
                    TempSave()
                    router.push(`/`)
                  }}>예</button>

                <button className='bg-[#eef2ff] font-semibold py-2  rounded-full w-[80px] border border-[#4338ca]'
                  onClick={() => { router.push('/') }}>아니오</button>
              </div>
            </div>
          )}
        />
        <ul className='flex justify-between items-center py-5'>
          <li className='text-md font-bold text-[blue]'>
            모임생성
          </li>
          <li onClick={() => { setIsModalOpen(true) }} className='text-[gray] relative'>
            <CancelRoundedIcon fontSize='large' />
            <p className='w-6 h-6 rounded-full animate-ping bg-[blue] absolute right-[6px] top-[6px] opacity-30'></p>
          </li>
        </ul>
      </nav>
    </header>
  )
}
