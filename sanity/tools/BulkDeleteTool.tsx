
import { useCallback, useEffect, useState } from 'react'
import { TrashIcon, CheckmarkIcon } from '@sanity/icons'
import { Box, Button, Card, Checkbox, Code, Flex, Grid, Heading, Label, Stack, Text, ToastProvider, useToast } from '@sanity/ui'
import { useClient } from 'sanity'

// Define the shape of our data
type Post = {
    _id: string
    title: string
    _createdAt: string
}

export default function BulkDeleteTool() {
    const [posts, setPosts] = useState<Post[]>([])
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [isLoading, setIsLoading] = useState(false)
    const client = useClient({ apiVersion: '2025-12-09' })
    const toast = useToast()

    // Fetch posts on mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await client.fetch<Post[]>(`*[_type == "post"]|order(_createdAt desc){_id, title, _createdAt}`)
                setPosts(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchPosts()
    }, [client])

    const toggleSelect = (id: string) => {
        const next = new Set(selected)
        if (next.has(id)) {
            next.delete(id)
        } else {
            next.add(id)
        }
        setSelected(next)
    }

    const toggleAll = () => {
        if (selected.size === posts.length) {
            setSelected(new Set())
        } else {

            setSelected(new Set(posts.map(p => p._id)))
        }
    }

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selected.size} posts? This cannot be undone.`)) return

        setIsLoading(true)
        const tx = client.transaction()

        selected.forEach(id => {
            tx.delete(id)
        })

        try {
            await tx.commit()
            toast.push({
                status: 'success',
                title: 'Posts Deleted',
                description: `Successfully deleted ${selected.size} posts.`
            })
            // Refresh list
            const remaining = posts.filter(p => !selected.has(p._id))
            setPosts(remaining)
            setSelected(new Set())
        } catch (err) {
            toast.push({
                status: 'error',
                title: 'Deletion Failed',
                description: 'Check console for details.'
            })
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card padding={4} height="fill" tone="transparent">
            <Flex direction="column" height="fill" gap={4}>
                <Flex justify="space-between" align="center">
                    <Heading as="h1" size={2}>Bulk Delete Posts</Heading>
                    <Button
                        text={`Delete Selected (${selected.size})`}
                        tone="critical"
                        disabled={selected.size === 0 || isLoading}
                        loading={isLoading}
                        onClick={handleDelete}
                        icon={TrashIcon}
                    />
                </Flex>

                <Card border padding={0} radius={2} style={{ flex: 1, overflow: 'hidden' }} overflow="auto">
                    <Stack>
                        {/* Header */}
                        <Card padding={3} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <Flex align="center" gap={3}>
                                <Checkbox
                                    checked={posts.length > 0 && selected.size === posts.length}
                                    indeterminate={selected.size > 0 && selected.size < posts.length}
                                    onChange={toggleAll}
                                />
                                <Text weight="bold" size={1}>Select All ({posts.length} total)</Text>
                            </Flex>
                        </Card>

                        {/* List */}
                        {posts.map(post => (
                            <Card key={post._id} padding={3} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <Flex align="center" gap={3}>
                                    <Checkbox
                                        checked={selected.has(post._id)}
                                        onChange={() => toggleSelect(post._id)}
                                    />
                                    <Stack space={2}>
                                        <Text weight="semibold" size={2}>{post.title || 'Untitled'}</Text>
                                        <Code size={1}>{post._id}</Code>
                                    </Stack>
                                </Flex>
                            </Card>
                        ))}

                        {posts.length === 0 && (
                            <Box padding={5}>
                                <Text align="center" muted>No posts found.</Text>
                            </Box>
                        )}
                    </Stack>
                </Card>
            </Flex>
        </Card>
    )
}
