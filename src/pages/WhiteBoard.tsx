import { Tldraw, Editor, createShapeId, TLNoteShape, TLArrowShape } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'

const handleMount = (editor: Editor) => {
  const note1ID = createShapeId('note1')
  const note2ID = createShapeId('note2')
  const arrowID = createShapeId('arrow')

  editor.createShapes<TLNoteShape>([
    {
      id: note1ID,
      type: 'note',
      /* Starting coordinates: Top left-ish */
      x: 128,
      y: 128,
      props: {
        color: 'yellow',
        size: 'm',
        text: 'This whiteboard was created by TLDraw',
      },
    },
  ])

  editor.createShapes<TLNoteShape>([
    {
      id: note2ID,
      type: 'note',
      /* Starting coordinates: Down and to the right of the first note */
      x: 512,
      y: 512,
      props: {
        color: 'orange',
        size: 'm',
        text: 'These notes were created using code!',
      },
    },
  ])

  /* Draw an arrow from the first note to the second note */
  editor.createShapes<TLArrowShape>([
    {
      id: arrowID,
      type: 'arrow',
      props: {
        size: 'm',
        start: {
          type: 'binding',
          boundShapeId: note1ID,
          normalizedAnchor: { x: 1, y: 0.5 },
          isExact: true,
        },
        end: {
          type: 'binding',
          boundShapeId: note2ID,
          normalizedAnchor: { x: 0.0, y: 0 },
          isExact: true,
        },
      },
    },
  ])

  editor.zoomToFit()
}

export const WhiteBoard = () => {
  return (
    <div className="flex-grow h-screen">
      <Tldraw onMount={handleMount} />
    </div>
  )
}
