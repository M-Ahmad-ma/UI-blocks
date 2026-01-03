import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import React from 'react'

function HeroBlock() {
    return (
        <div className="text-center space-y-6 mt-16 flex flex-col items-center justify-center">
            <div className='text-center w-fit'>
                <h1 className="text-3xl font-bold">The Foundation for you design System</h1>
                <p className="text-primary text-2xl       
              max-w-3xl text-center lg:ml-20">
                    A set of beautifully designed and customizable component that you can extend and build on.
                </p>
            </div>
            <div className="flex items-center justify-center  gap-6">
                <Button variant="secondary" asChild>
                    <Link
                        href="/Components"
                    >
                        Components
                    </Link>
                </Button>
                <Button variant="default" asChild>       
                    <Link
                        href="/cli"
                    >
                        CLI
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default HeroBlock
