import React, { ReactElement } from 'react'
import { useState, CSSProperties, UIEvent } from 'react'
import throttle from 'lodash/throttle'

interface Props {
  containerHeight: number
  itemHeight: number
  itemCount: number
  children: ({
    style,
    index,
  }: {
    style: CSSProperties
    index: number
    // eslint-disable-next-line no-undef
  }) => ReactElement
}

const FixedSizeList = (props: Props) => {
  const {
    containerHeight,
    itemHeight,
    itemCount,
    children: ChildrenComponent,
  } = props
  const contentHeight = itemHeight * itemCount
  const [scrollTop, setScrollTop] = useState(0)

  // 开始的索引
  let startIdx = Math.floor(scrollTop / itemHeight)
  // 结束的索引
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight)

  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const overscanCount = 2
  // 处理边界情况
  startIdx = Math.max(startIdx - overscanCount, 0)
  endIdx = Math.min(endIdx + overscanCount, itemCount - 1)

  const top = itemHeight * startIdx

  const items = []
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(
      <ChildrenComponent key={i} index={i} style={{ height: itemHeight }} />
    )
  }

  const onScroll = throttle((e: UIEvent<HTMLDivElement>) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop)
  }, 300)

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => {
        onScroll(e)
      }}
    >
      <div style={{ height: contentHeight }}>
        <div style={{ height: top }} />
        {items}
      </div>
    </div>
  )
}

export default FixedSizeList
