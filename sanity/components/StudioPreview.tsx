import { Card, Heading, Text, Stack, Box, Spinner, Flex } from '@sanity/ui'
import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useClient } from 'sanity'
import { useState, useEffect } from 'react'

const CodeBlock = ({ value }: any) => {
    if (!value || !value.code) return null;
    return (
        <div style={{ margin: '2rem 0', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0D0D0D' }}>
            {/* Terminal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)' }}></div>
                    <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid rgba(234, 179, 8, 0.5)' }}></div>
                    <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)' }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>{value.filename || 'Code'}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4b5563', textTransform: 'uppercase' }}>{value.language}</span>
            </div>
            {/* Syntax Highlighter */}
            <SyntaxHighlighter
                language={value.language || 'text'}
                style={atomDark}
                customStyle={{ background: 'transparent', margin: 0, padding: '1.5rem', fontSize: '0.875rem' }}
            >
                {value.code}
            </SyntaxHighlighter>
        </div>
    )
}

export default function StudioPreview({ document, options }: { document: { displayed: any }, options?: { type?: string, mode?: 'card' | 'normal' } }) {
    const doc = document.displayed
    const client = useClient({ apiVersion: '2024-01-01' })

    const [categoryData, setCategoryData] = useState<any>(null)
    const [tagsData, setTagsData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchIds = async () => {
            // Only fetch if we have references
            const catRef = doc.category?._ref
            const tagRefs = doc.tags?.map((t: any) => t._ref).filter(Boolean) || []

            if (!catRef && tagRefs.length === 0) {
                setCategoryData(null)
                setTagsData([])
                return
            }

            setLoading(true)
            try {
                // Fetch Category
                if (catRef) {
                    const cat = await client.fetch(`*[_id == $id][0]{title, tag, color, subtitle}`, { id: catRef })
                    setCategoryData(cat)
                } else {
                    setCategoryData(null)
                }

                // Fetch Tags
                if (tagRefs.length > 0) {
                    const tags = await client.fetch(`*[_id in $ids]{title, color, slug}`, { ids: tagRefs })
                    setTagsData(tags)
                } else {
                    setTagsData([])
                }
            } catch (err) {
                console.error("Error fetching preview data", err)
            } finally {
                setLoading(false)
            }
        }

        fetchIds()
    }, [doc.category, doc.tags, client])


    const resolveColor = (colorStr: string) => {
        if (!colorStr) return null

        // Hex
        if (/^#[0-9A-F]{6}$/i.test(colorStr) || /^#[0-9A-F]{3}$/i.test(colorStr)) return colorStr

        // Common Tailwind/CSS Names
        const colors: Record<string, string> = {
            emerald: '#34d399',
            green: '#4ade80',
            blue: '#60a5fa',
            red: '#ef4444',
            yellow: '#facc15',
            amber: '#fbbf24',
            orange: '#fb923c',
            purple: '#c084fc',
            indigo: '#818cf8',
            pink: '#f472b6',
            rose: '#fb7185',
            teal: '#2dd4bf',
            cyan: '#22d3ee',
            sky: '#38bdf8',
            lime: '#a3e635',
            violet: '#a78bfa',
            fuchsia: '#e879f9',
            slate: '#94a3b8',
            gray: '#9ca3af',
            zinc: '#a1a1aa',
            neutral: '#a3a3a3',
            stone: '#a8a29e',
            black: '#000000',
            white: '#ffffff'
        }

        return colors[colorStr.toLowerCase()] || colorStr
    }

    // --- RENDER HELPERS ---

    // Generic field mapping
    const title = doc.title || doc.name || 'Untitled'
    // Prioritize specific fields
    const summary = doc.summary || doc.description || doc.bio || doc.subtitle
    const content = doc.content

    // Category Badge Data
    const displayTag = categoryData?.tag || doc.tag || 'TAG'
    const displayTagColorRaw = categoryData?.color || doc.color
    const displayTagColor = resolveColor(displayTagColorRaw) || '#fff'

    // CARD MODE (Simplified for referencing same data)
    if (options?.mode === 'card') {
        const bgStyle = {
            background: '#050505',
            color: '#fff',
            backgroundImage: `
                radial-gradient(circle at 50% 0%, #1a1a1a 0%, transparent 70%),
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 20px 20px, 20px 20px',
            backgroundPosition: 'top center, 0 0, 0 0',
        }

        return (
            <Card padding={4} height="fill" tone="transparent" style={{ ...bgStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    width: '100%',
                    maxWidth: '350px',
                    height: '280px',
                    background: '#0a0a0a',
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: '2px',
                    padding: '1.25rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
                }}>
                    {/* Top Section */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'auto' }}>
                        <span style={{
                            color: displayTagColor,
                            borderColor: displayTagColor,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            padding: '3px 12px',
                            borderRadius: '2px',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            opacity: loading ? 0.5 : 1
                        }}>
                            {displayTag}
                        </span>
                        <span style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {categoryData?.subtitle || doc.subtitle}
                        </span>
                    </div>

                    {/* Bottom Section */}
                    <div style={{ marginTop: 'auto', position: 'relative', zIndex: 10 }}>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            lineHeight: '1.2',
                            marginBottom: '0.75rem',
                            color: '#fff',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {title} →
                        </h2>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#9ca3af',
                            lineHeight: '1.6',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {summary}
                        </p>
                    </div>
                </div>
            </Card>
        )
    }

    // NORMAL MODE
    return (
        <Card padding={4} height="fill" overflow="auto" tone="transparent" style={{
            background: '#050505',
            color: '#fff',
            backgroundImage: `
                radial-gradient(circle at 50% 0%, #1a1a1a 0%, transparent 70%),
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 20px 20px, 20px 20px',
            backgroundPosition: 'top center, 0 0, 0 0'
        }}>
            <Box padding={[3, 4, 5]}>
                <Stack space={5} style={{ maxWidth: '42rem', margin: '0 auto' }}>

                    {/* Header Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Category Badge */}
                            {(displayTag || categoryData?.subtitle) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        color: displayTagColor,
                                        borderColor: displayTagColor,
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        padding: '3px 12px',
                                        borderRadius: '2px',
                                        letterSpacing: '0.22em',
                                        textTransform: 'uppercase'
                                    }}>
                                        {displayTag}
                                    </span>
                                    {categoryData?.subtitle && (
                                        <span style={{ fontSize: '11px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {categoryData.subtitle}
                                        </span>
                                    )}
                                </div>
                            )}

                            {loading && <Spinner size={1} muted />}
                        </div>

                        <Heading size={5} style={{ fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                            {title}
                        </Heading>

                        {/* Tags Info */}
                        {tagsData.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {tagsData.map((tag: any, i: number) => {
                                    const c = resolveColor(tag.color)
                                    return (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '4px',
                                            padding: '2px 8px',
                                            background: 'rgba(255,255,255,0.03)'
                                        }}>
                                            <span style={{
                                                width: '6px', height: '6px', borderRadius: '50%',
                                                background: c || '#fff', marginRight: '6px'
                                            }} />
                                            <span style={{ fontSize: '12px', color: '#d4d4d8', fontFamily: 'monospace' }}>
                                                {tag.title}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {/* Fallback if no tags but we have extra details like explicit fields on the doc */}
                        {!tagsData.length && doc.slug?.current && (
                            <Text size={1} muted style={{ fontFamily: 'monospace', opacity: 0.5 }}>
                                /{doc.slug.current}
                            </Text>
                        )}

                    </div>

                    {summary && (
                        <Text size={3} style={{ color: '#a1a1aa', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                            {summary}
                        </Text>
                    )}

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)' }}></div>

                    {/* Content */}
                    <div style={{ fontSize: '1.125rem', lineHeight: 1.75, color: '#e4e4e7' }}>
                        {content ? (
                            <PortableText
                                value={content}
                                components={{
                                    types: {
                                        code: CodeBlock,
                                    },
                                    block: {
                                        h1: ({ children }) => <Heading as="h1" size={4} style={{ marginTop: '2em', marginBottom: '0.5em', fontWeight: 700 }}>{children}</Heading>,
                                        h2: ({ children }) => <Heading as="h2" size={3} style={{ marginTop: '1.5em', marginBottom: '0.5em', fontWeight: 600 }}>{children}</Heading>,
                                        h3: ({ children }) => <Heading as="h3" size={2} style={{ marginTop: '1.5em', marginBottom: '0.5em', fontWeight: 600 }}>{children}</Heading>,
                                        normal: ({ children }) => <p style={{ marginBottom: '1.25em', color: '#d4d4d8' }}>{children}</p>,
                                        blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #3f3f46', paddingLeft: '1em', fontStyle: 'italic', marginBottom: '1.25em', color: '#a1a1aa' }}>{children}</blockquote>
                                    },
                                    list: {
                                        bullet: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.6em', marginBottom: '1.25em', color: '#d4d4d8' }}>{children}</ul>,
                                        number: ({ children }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.6em', marginBottom: '1.25em', color: '#d4d4d8' }}>{children}</ol>,
                                    }
                                }}
                            />
                        ) : (
                            <Text muted size={1} style={{ fontStyle: 'italic', opacity: 0.5 }}>
                                Start writing content to preview...
                            </Text>
                        )}
                    </div>
                </Stack>
            </Box>
        </Card>
    )
}
