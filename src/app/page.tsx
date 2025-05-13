"use client"
import { buttonVariants } from '@/components/ui/button'
import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Link
        href={"/editor"}
        className={buttonVariants({ variant: "outline" })}
      >
        Go to Editor <ArrowBigRight className='text-red-500'/>
      </Link>
    </div>
  )
}

export default Page
