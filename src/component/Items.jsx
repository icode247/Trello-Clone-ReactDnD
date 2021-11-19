import { Fragment, useRef, useState } from "react";
import { useDrag, useDrop } from 'react-dnd';
import Window from './Window';
import ITEM_TYPES from '../data/types'

const Item = ({ item, index, moveItem, status }) => {
    const ref = useRef(null)
    const [, drop ] = useDrop({
        accept: ITEM_TYPES,
        hover({ item, monitor }) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = item.hover;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hovererdRect = ref.current.getBoundClientRect();
            const hoverMiddleY = (hovererdRect.bottom - hovererdRect.top)/2;
            const mousePostion = monitor.getClientOffest();
            const hoverClientY = mousePostion.y - hovererdRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })
    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPES, ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false)

    drag(drop(ref))

    return (
        <Fragment >
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={'item'}
                onClick={onOpen}
            >
                <div className={'color-bar'} style={{ backgroundColor: status.color }}
                ></div>
                <p className={'item-title'}>{item.content}</p> 
            </div>
            <Window 
               item = {item} 
               onClose = {onClose}
               show = {show}
            />
    
        </Fragment>
    )
}
export default Item