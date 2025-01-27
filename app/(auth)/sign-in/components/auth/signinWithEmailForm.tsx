
  'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import './styles.css'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MagicLinkAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const callbackUrl = useSearchParams()?.get('callbackUrl') as string
  const [email, setEmail] = useState<string>('')

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={'magin-link-container'} {...props}>
      <form onSubmit={onSubmit}>
        <div className='magic-grid-gap'>
          <input
            id='email'
            placeholder='Email address'
            type='email'
            className='magin-link-input'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect='off'
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className='magic-link-button'
            disabled={isLoading}
            onClick={async () => {
              const result = await signIn('email', {
                email,
                callbackUrl,
              })
            }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

