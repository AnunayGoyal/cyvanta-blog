import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
// Simplified draft handler for Iframe usage
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const type = searchParams.get('type')

    if (!slug) {
        return new Response('Missing slug', { status: 400 })
    }

    // Enable draft mode
    (await draftMode()).enable()

    // Redirect to the correct path
    if (type === 'post') {
        redirect(`/blog/${slug}`)
    } else if (type === 'category') {
        redirect(`/blog/category/${slug}`)
    } else {
        redirect('/')
    }
}
