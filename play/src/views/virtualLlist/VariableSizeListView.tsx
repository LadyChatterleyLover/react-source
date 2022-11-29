import { useEffect, useRef, useState } from 'react'
import { VariableSizeList } from '@dudu/react-virtual-list'
import { faker } from '@faker-js/faker'

// 列表项组件
function Item({ index, data, setHeight }: any) {
  const itemRef = useRef<HTMLDivElement>()
  useEffect(() => {
    setHeight(index, itemRef.current?.getBoundingClientRect().height)
  }, [setHeight, index])

  return (
    <div
      ref={itemRef as any}
      style={{
        backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue',
      }}
    >
      {data[index]}
    </div>
  )
}

export default function App() {
  const [list] = useState(
    new Array(1000).fill(0).map(() => faker.lorem.paragraph())
  )
  const listRef = useRef()

  const heightsRef = useRef(new Array(100))
  // 预估高度
  const estimatedItemHeight = 40
  const getHeight = (index: number) => {
    return heightsRef.current[index] ?? estimatedItemHeight
  }

  const setHeight = (index: number, height: any) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height
      ;(listRef.current as any)?.resetHeight()
    }
  }

  return (
    <>
      <div className="text-base">列表项高度动态 - 虚拟列表实现</div>
      <VariableSizeList
        ref={listRef}
        containerHeight={300}
        itemCount={list.length}
        getItemHeight={getHeight}
        itemData={list}
      >
        {({ index, style, data }: any) => {
          return (
            <div style={style}>
              <Item {...{ index, data }} setHeight={setHeight} />
            </div>
          )
        }}
      </VariableSizeList>
    </>
  )
}
