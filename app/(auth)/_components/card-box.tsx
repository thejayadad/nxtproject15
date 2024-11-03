import React from 'react'
import { Header } from './card-header';
import { Social } from './social';
import { BackButton } from './back-btn';


interface CardBoxProps {
    children: React.ReactNode;
    headerTitle: string;
    backButtonTitle: string;
    backButtonHref: string;
    showSocial?:boolean;
}

const CardBox = ({children, headerTitle, backButtonHref, backButtonTitle, showSocial}:
    CardBoxProps
) => {
  return (
    <div className='w-[400px] shadow-md bg-neutral-100 rounded-lg p-4'>
        <Header
        label={headerTitle}
        />
       <div className='p-4'>
       {children}
       {showSocial && (
        <div>
            <Social />
        </div>
       )}
       </div>
       <div className='p-4'>
            <BackButton
            label={backButtonTitle}
            href={backButtonHref}
            />
       </div>
    </div>
  )
}

export default CardBox