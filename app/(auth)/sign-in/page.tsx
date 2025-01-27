'use client'

import Link from 'next/link'
import './styles.css'
import { Suspense } from 'react'
import { UserAuthForm } from './components/auth/user-auth-form'

export default function Page() {
  return (
    <div className='sign-in-page-container'>
      <div className='auth-form-wrapper'>
        <Suspense>
          <UserAuthForm />
        </Suspense>
        <div className={'grid-gap-container'}>
          <p className='magic-link-info-text'>We will send you a magic link</p>
        </div>
      </div>
    </div>
  )
}
