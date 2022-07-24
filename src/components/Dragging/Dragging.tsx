import styles from './styles.module.scss';
import React, { PointerEventHandler } from 'react';
import draggingState from './DraggingState';
import { Component } from 'react';

interface IProps {
  draggingElementSelector: string;
  parentSelector: string;
  children: React.ReactNode;
  onDropped?: (columnId: string, order: number, taskId?: string) => void;
}
class Dragging extends Component<IProps> {
  private shiftX = 0;
  private shiftY = 0;
  private movingItem: HTMLElement | null = null;
  parent: HTMLElement | null = null;
  movingItemTopPointerDown = 0;
  element: HTMLDivElement | null = null;
  placeholder: HTMLDivElement | null = null;
  timerId: NodeJS.Timeout | null = null;

  timeStart = 0;
  timeEnd = 0;

  onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    this.timeStart = Date.now();
    if (draggingState.getIsDragging()) return;
    draggingState.setIsDragging(true);

    this.timerId = setTimeout(() => {
      const target: HTMLElement | null = (event?.target as HTMLElement)?.closest(
        this.props.draggingElementSelector
      );

      if (target) {
        console.log(target);
        this.movingItem = target;

        this.parent = (event?.target as HTMLElement)?.closest(this.props.parentSelector);

        if (!this.parent) return;

        this.movingItemTopPointerDown =
          this.movingItem.getBoundingClientRect().top + window.pageYOffset;

        const hightOfMovingItem = this.movingItem.offsetHeight;
        const widthOfMovingItem = this.movingItem.offsetWidth;

        this.shiftX = event.clientX - this.movingItem.getBoundingClientRect().left;
        this.shiftY = event.clientY - this.movingItem.getBoundingClientRect().top;

        this.movingItem.classList.add('dragging-element');

        //  this.movingItem.style.minHeight = hightOfMovingItem + 'px';
        this.movingItem.style.width = widthOfMovingItem + 'px';

        this.placeholder = this.getPlaceholder(widthOfMovingItem, hightOfMovingItem);

        this.movingItem.after(this.placeholder);

        this.movingItem.parentNode && this.movingItem.parentNode.append(this.movingItem);

        this.moveAt(event);
        document.addEventListener('pointermove', this.onMouseMove);
      }
    }, 150);

    document.addEventListener('pointerup', this.onPointerUp);
  };

  onPointerUp = () => {
    this.timerId && clearTimeout(this.timerId);
    draggingState.setIsDragging(false);

    if (!this.placeholder || !this.movingItem) return;
    this.placeholder.replaceWith(this.movingItem);

    this.movingItem.style.left = 'auto';
    this.movingItem.style.top = 'auto';

    this.movingItem.classList.remove('dragging-element');
    const movingItemTopPointerUp =
      this.movingItem.getBoundingClientRect().left + window.pageXOffset;

    if (this.movingItemTopPointerDown !== movingItemTopPointerUp) {
      this.dispatchOrderChanged();
    }

    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onMouseMove);
  };

  onMouseMove = (event: PointerEvent): void => {
    this.moveAt(event);

    if (!this.movingItem) return;

    this.movingItem.classList.add('hide');

    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    if (!elemBelow) return;
    this.movingItem.classList.remove('hide');

    const droppableBelow: HTMLDivElement | null = elemBelow.closest(
      this.props.draggingElementSelector
    );

    if (droppableBelow) {
      if (
        droppableBelow.nextSibling &&
        (droppableBelow.nextSibling as HTMLElement).closest('.sortable-list__placeholder')
      ) {
        droppableBelow.before(this.placeholder as Node);
      } else {
        droppableBelow.after(this.placeholder as Node);
      }
      return;
    }

    const foo = elemBelow.closest(this.props.parentSelector);
    if (foo) {
      Array.from(foo.querySelectorAll(this.props.draggingElementSelector)).length === 0 &&
        foo.append(this.placeholder as Node);

      if (
        Array.from(foo.querySelectorAll(this.props.draggingElementSelector)).length === 1 &&
        foo.querySelector('.dragging-element')
      ) {
        foo.append(this.placeholder as Node);
      }
    }
  };

  moveAt = (event: PointerEvent | React.PointerEvent<HTMLDivElement>) => {
    if (event.clientY - this.shiftY < 0) {
      window.scrollBy(0, -10);
    }
    if (event.clientY + this.shiftY > document.documentElement.clientHeight) {
      window.scrollBy(0, 10);
    }

    if (!this.movingItem) return;
    this.movingItem.style.left = event.clientX - this.shiftX + 'px';
    this.movingItem.style.top = event.clientY - this.shiftY + 'px';
  };

  dispatchOrderChanged() {
    this.parent = (this.movingItem as HTMLElement)?.closest(this.props.parentSelector);

    const columnId = this.parent?.dataset.columnId || this.movingItem?.dataset.columnId;
    const taskId = this.movingItem?.dataset.taskId;
    let order = 0;
    if (taskId) {
      this.parent &&
        Array.from(this.parent.querySelectorAll(this.props.draggingElementSelector)).forEach(
          (item, index) => {
            if ((item as HTMLDivElement).dataset.taskId === taskId) order = index + 1;
          }
        );

      this.props.onDropped && columnId && this.props.onDropped(columnId, order, taskId);
      return;
    }
    this.parent &&
      Array.from(this.parent.querySelectorAll(this.props.draggingElementSelector)).forEach(
        (item, index) => {
          if ((item as HTMLDivElement).dataset.columnId === columnId) order = index + 1;
        }
      );
    console.log(order);
    console.log(columnId);
    this.props.onDropped && columnId && this.props.onDropped(columnId, order);
  }

  getPlaceholder(width: number, height: number) {
    const placeholder = document.createElement('div');

    placeholder.classList.add('sortable-list__placeholder');

    placeholder.style.width = width + 'px';
    placeholder.style.height = height + 'px';

    return placeholder;
  }

  render() {
    return <div onPointerDown={this.onPointerDown}>{this.props.children}</div>;
  }
}

/* 
const Dragging = ({ children }: IProps) => {
  const draggableContainerRef: RefObject<HTMLDivElement> = useRef(null);
  useDragging(draggableContainerRef);

  return <div ref={draggableContainerRef}>{children}</div>;
}; */

export default Dragging;
