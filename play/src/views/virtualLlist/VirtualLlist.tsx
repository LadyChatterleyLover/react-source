import { CSSProperties } from 'react'
import { FixedSizeList } from '@dudu/react-virtual-list'
import VariableSizeListView from './VariableSizeListView'

const Item = ({ style, index }: { style: CSSProperties; index: number }) => {
  return (
    <div
      className="item"
      style={{
        ...style,
        backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue',
      }}
    >
      {index}
    </div>
  )
}

const VirtualLlist = () => {
  const list = new Array(10000).fill(0).map((item, i) => i)
  return (
    <div className="flex">
      <div className="flex-1 mr-10">
        <div className="text-base">固定高度</div>
        <div>
          <FixedSizeList
            containerHeight={300}
            itemCount={list.length}
            itemHeight={50}
          >
            {Item}
          </FixedSizeList>
        </div>
      </div>
      <div className="flex-1">
        <VariableSizeListView />
      </div>
    </div>
  )
}

export default VirtualLlist
