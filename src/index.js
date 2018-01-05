import React from 'react'
import ReactDOM from 'react-dom'

import { DragDropContext, DropTarget, DragSource } from 'react-dnd'
import ReactDnDHTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(ReactDnDHTML5Backend)

class Sortable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { id: 0.282827191, text: 'こんばんわ' },
        { id: 0.2828191027191, text: 'radio1' },
        { id: 0.282827092921191, text: 'radio2' },
        { id: 0.28281234527191, text: 'radio3' },
        { id: 0.28282393827191, text: 'voluptas numquam aliquam cum eaque?' },
      ],
    }
  }
  change(toId, fromId) {
    const items = this.state.items.slice()
    const toIndex = items.findIndex(i => i.id === toId)
    const fromIndex = items.findIndex(i => i.id === fromId)
    const toItem = items[toIndex]
    const fromItem = items[fromIndex]
    items[toIndex] = fromItem
    items[fromIndex] = toItem
    this.setState({ items })
  }

  render() {
    return (
      <ul>
        {
          this.state.items.map((item, i) =>
            <Item id={item.id} key={i} onDrop={(toId, fromId) => this.change(toId, fromId)}>{item.text}</Item>
          )
        }
      </ul>
    )
  }
}

@DropTarget("item", {
  drop(dropProps, monitor, dropComponent) {
    const dragProps = monitor.getItem()
    if (dropProps.id !== dragProps.id) {
      dragProps.onDrop(dragProps.id, dropProps.id);
    }
  }
}, connect => {
  return {
    connectDropTarget: connect.dropTarget()
  };
})
@DragSource("item", {
  beginDrag(props) {
    return props;
  }
}, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
})

class Item extends React.Component {
  render() {
    return (
      <div>
        {
          (() => {
            this.props.connectDragSource(this.props.connectDropTarget(
              <div>
                {console.log(this.props.children, this.props.connectDropTarget)}
              </div>
            ))
          })()
        }
      </div>
    )
  }
}

addEventListener('load', () => {
  ReactDOM.render(<Sortable />, document.querySelector('main'))
})