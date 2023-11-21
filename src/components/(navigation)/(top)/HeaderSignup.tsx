'use client'
import Link from 'next/link'
import LogoSvg from '@/components/Logo/LogoSvg'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function HeaderSignup() {

  const query = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()
  console.log(query?.get('step'));
  console.log(pathName);

  return (
    <header className='w-full fixed top-0 bg-white z-50 backdrop:blur-md'>
      <nav className='container'>
        <ul className='flex justify-between items-center py-5'>
          {/* <li className='w-[50px] h-[20px] overflow-hidden animate-bounce'>
            <Link href='/'>
              <LogoSvg />
            </Link>
          </li> */}
          <li className='text-md font-bold text-[blue]'>
            { 
              pathName === '/signup' ? `회원가입 ${query?.get('step') === null ? "" : `STEP ${query?.get('step')}`}` : null
            }
          </li>
          <li onClick={()=>router.push('/')} className='text-[gray] relative'>
            <CancelRoundedIcon fontSize='large'/>
            <p className='w-6 h-6 rounded-full animate-ping bg-[blue] absolute right-[6px] top-[6px] opacity-30'></p>
          </li>
        </ul>
      </nav>
    </header>
  )
}
