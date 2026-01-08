'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

const NextStudio = dynamic(() => import('next-sanity/studio').then((d) => d.NextStudio), {
    ssr: false,
})

export default function Studio() {
    return (
        <div id="sanity-studio-wrapper" style={{ height: '100vh', maxHeight: '100dvh', overscrollBehavior: 'none' }}>
            <NextStudio config={config} />
        </div>
    )
}
