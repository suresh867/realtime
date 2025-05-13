import QuilEditor from '@/components/QuillEditor'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const Page = () => {
    return (
        <ScrollArea className='w-full h-[calc(100vh-4.8rem)] p-2'>
            <QuilEditor />
        </ScrollArea>
    )
}

export default Page
