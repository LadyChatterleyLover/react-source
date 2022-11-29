import { forwardRef, useState, UIEvent } from 'react'
import throttle from 'lodash/throttle'

interface Props {
  containerHeight: number
  getItemHeight: (i: number) => number
  itemCount: number
  itemData: any[]
  children: any
}

const VariableSizeList = forwardRef((props: Props, ref: any) => {
  const {
    containerHeight,
    getItemHeight,
    itemCount,
    itemData,
    children: Component,
  } = props
  ref.current = {
    resetHeight: () => {
      setOffsets(genOffsets())
    },
  }
  const [scrollTop, setScrollTop] = useState(0)

  const genOffsets = () => {
    const a = []
    a[0] = getItemHeight(0)
    for (let i = 1; i < itemCount; i++) {
      a[i] = getItemHeight(i) + a[i - 1]
    }
    return a
  }

  // 所有 items 的位置
  const [offsets, setOffsets] = useState(() => {
    return genOffsets()
  })

  let startIdx = offsets.findIndex((pos) => pos > scrollTop)
  let endIdx = offsets.findIndex((pos) => pos > scrollTop + containerHeight)
  if (endIdx === -1) endIdx = itemCount

  const overscanCount = 2
  startIdx = Math.max(startIdx - overscanCount, 0)
  endIdx = Math.min(endIdx + overscanCount, itemCount - 1)

  const contentHeight = offsets[offsets.length - 1]

  const items = []
  for (let i = startIdx; i <= endIdx; i++) {
    const top = i === 0 ? 0 : offsets[i - 1]
    const height = i === 0 ? offsets[0] : offsets[i] - offsets[i - 1]
    items.push(
      <Component
        key={i}
        index={i}
        style={{
          position: 'absolute',
          left: 0,
          top,
          width: '100%',
          height,
        }}
        data={itemData}
      />
    )
  }

  const onScroll = throttle((e: UIEvent<HTMLDivElement>) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop)
  }, 300)

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
      onScroll={(e) => {
        onScroll(e)
      }}
    >
      <div style={{ height: contentHeight }}>{items}</div>
    </div>
  )
})

export default VariableSizeList
