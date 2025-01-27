
  'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import './styles.css'
import { MagicLinkAuthForm } from './signinWithEmailForm'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const callbackUrl = useSearchParams()?.get('callbackUrl') as string

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={'grid-gap-container'} {...props}>
      
      <h1 className='header'>Welcome to Kindgi Viz</h1>
      <MagicLinkAuthForm />
    </div>
  )
}

  