import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import Logout from '@/components/(page)/setting/Logout'
import { settingNoticeData } from '@/data/settings/settingNoticeData'
import { settingUserData } from '@/data/settings/settingUserData'
import { SettingNoticeType } from '@/types/SettingNoticeType'
import { SettinguserType } from '@/types/SettinguserType'
import Link from 'next/link'
import React from 'react'

function settings() {
  return (
    <>
    <main>
    <BackbuttonHeader contents='설정'/>
        <li className='setting_notification list-none text-2xl font-semibold'>안내</li>
      {
        settingNoticeData.map((e:SettingNoticeType)=>(
      <ul key={e.id}>
        <li className="list-none border-t leading-[48px] tracking-tighter text-xl">
        <Link href={e.url}>
          {e.title}
          </Link>
        </li>
      </ul>
        ))
      }

        <li className='setting_2 mt-[10px] list-none text-2xl font-semibold'>사용자설정</li>
        {
        settingUserData.map((e:SettinguserType)=>(
      <ul key={e.id}>
        <li className="list-none items-center border-t leading-[48px] tracking-tighter text-xl">
        <Link href={e.url}>
          {e.title}
          </Link>
        </li>
      </ul>
        ))
      }
      <div>
        <Logout />
      </div>
    </main>
    </>
  )
}

export default settings