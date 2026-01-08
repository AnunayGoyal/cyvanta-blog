import { Button, Card, Flex, Stack, Text, ToastProvider, useToast } from '@sanity/ui'
import { UploadIcon } from '@sanity/icons'
import { useCallback, useRef, useState } from 'react'
import { set, unset } from 'sanity'

export const PortableTextImporter = (props: any) => {
  const { elementProps, onChange, value } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      setIsLoading(true)
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const content = e.target?.result
          if (typeof content !== 'string') return

          const json = JSON.parse(content)

          if (!Array.isArray(json)) {
            toast.push({
              status: 'error',
              title: 'Invalid format',
              description: 'The uploaded file must be a JSON array of blocks.',
            })
            return
          }

          // Basic validation to ensure it looks like blocks
          if (json.some((item) => !item._type)) {
             toast.push({
              status: 'warning',
              title: 'Potential Issue',
              description: 'Some items in the array are missing _type. Import may fail or look wrong.',
            })
          }

          // Replace current content
          onChange(set(json))
          
          toast.push({
            status: 'success',
            title: 'Import Successful',
            description: `Imported ${json.length} blocks.`,
          })
        } catch (error) {
          console.error('Import error:', error)
          toast.push({
            status: 'error',
            title: 'Import Failed',
            description: 'Could not parse JSON file.',
          })
        } finally {
          setIsLoading(false)
          // Reset input
          if (fileInputRef.current) fileInputRef.current.value = ''
        }
      }

      reader.readAsText(file)
    },
    [onChange, toast]
  )

  return (
    <Stack space={3}>
      {/* File Input (Hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Header / Actions - Button aligned right, Label handled by default or we hide it and show our own? 
          Actually, simple fix: Just show button right aligned. The field label is rendered by renderDefault inside properties usually?
          No, renderDefault(props) renders the whole form field including label.
          If we want to fix "double heading" (User saw "Body Content" twice), it's because I added <Text>Body Content</Text> AND renderDefault showed it.
          So, remove <Text>.
      */}
      <Flex justify="flex-end" align="center" style={{ marginBottom: '-30px', position: 'relative', zIndex: 10 }}>
          <Button
            fontSize={1}
            icon={UploadIcon}
            mode="ghost"
            text={isLoading ? 'Importing...' : 'Import JSON'}
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          />
      </Flex>

      {/* Default Portable Text Editor - increased height */}
      <Card border padding={0} style={{ minHeight: '500px' }}>
          {props.renderDefault(props)} 
      </Card>
    </Stack>
  )
}
