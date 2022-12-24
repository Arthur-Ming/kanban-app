import { RefObject, useEffect } from 'react';

class DraggingControl {
  private shiftX = 0;
  private shiftY = 0;
  private movingItem: HTMLElement | null = null;
  parent: HTMLElement | null = null;
  parentBorder = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  movingItemTopPointerDown = 0;
  element: HTMLDivElement;
  placeholder: HTMLDivElement | null = null;
  timerId: NodeJS.Timeout | null = null;

  onPointerDown = (event: PointerEvent): void => {
    event.preventDefault();

    this.timerId = setTimeout(() => {
      console.log('onPointerDown');
      const target: HTMLElement | null = (event?.target as HTMLElement)?.closest(
        '[data-grab-handle]'
      );

      if (target) {
        console.log(target);
        this.movingItem = target;

        this.parent = (event?.target as HTMLElement)?.closest('[data-drag-elem-parent]');
        console.log(this.parent);
        if (!this.parent) return;
        this.parentBorder = {
          left: this.parent.getBoundingClientRect().left,
          right: this.parent.getBoundingClientRect().left + this.parent.offsetWidth,
          top: this.parent.getBoundingClientRect().top + window.pageYOffset,
          bottom:
            this.parent.getBoundingClientRect().top + this.parent.offsetHeight + window.pageYOffset,
        };

        this.movingItemTopPointerDown =
          this.movingItem.getBoundingClientRect().top + window.pageYOffset;

        const hightOfMovingItem = this.movingItem.offsetHeight;
        const widthOfMovingItem = this.movingItem.offsetWidth;

        this.shiftX = event.clientX - this.movingItem.getBoundingClientRect().left;
        this.shiftY = event.clientY - this.movingItem.getBoundingClientRect().top;
        console.log(this.shiftX);
        console.log(this.shiftY);
        this.movingItem.classList.add('dragging-element');

        //  this.movingItem.style.minHeight = hightOfMovingItem + 'px';
        this.movingItem.style.width = widthOfMovingItem + 'px';

        this.placeholder = this.getPlaceholder(widthOfMovingItem, hightOfMovingItem);

        this.movingItem.after(this.placeholder);

        this.movingItem.parentNode && this.movingItem.parentNode.append(this.movingItem);

        this.moveAt(event);
        document.addEventListener('pointermove', this.onMouseMove);
      }
    }, 100);

    document.addEventListener('pointerup', this.onPointerUp);
  };

  onPointerUp = () => {
    this.timerId && clearTimeout(this.timerId);
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

    /* if (
      this.parentBorder.right < event.clientX ||
      this.parentBorder.left > event.clientX ||
      this.parentBorder.bottom < event.clientY + window.pageYOffset ||
      this.parentBorder.top > event.clientY + window.pageYOffset
    ) {
      return;
    }
 */
    if (!this.movingItem) return;

    this.movingItem.classList.add('hide');

    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    if (!elemBelow) return;
    this.movingItem.classList.remove('hide');

    const droppableBelow: HTMLDivElement | null = elemBelow.closest('[data-grab-handle]');

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

    const foo = elemBelow.closest('[data-drag-elem-parent]');
    if (foo) {
      Array.from(foo.querySelectorAll('[data-grab-handle]')).length === 0 &&
        foo.append(this.placeholder as Node);
    }
  };

  moveAt = (event: PointerEvent): void => {
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

  constructor({
    elem,
    outerContainer = null,
  }: {
    elem: HTMLDivElement;
    outerContainer?: HTMLElement | null;
  }) {
    this.parent = outerContainer;
    this.element = elem;
    this.initEventListeners();
    console.log('constructor');
  }

  dispatchOrderChanged() {
    console.log(
      Array.from(this.element.querySelectorAll('[data-id]')).map((item, index) => ({
        id: (item as HTMLDivElement).dataset.id,
        weight: index + 1,
      }))
    );
  }

  getPlaceholder(width: number, height: number) {
    const placeholder = document.createElement('div');

    placeholder.classList.add('sortable-list__placeholder');

    placeholder.style.width = width + 'px';
    placeholder.style.height = height + 'px';

    return placeholder;
  }

  private initEventListeners(): void {
    if (this.element) {
      this.element.addEventListener('pointerdown', this.onPointerDown as unknown as EventListener);
      // this.element.addEventListener('pointerup', this.onPointerDown as unknown as EventListener);
    }
  }
}

export function useDragging(draggableContainerRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    console.log('useEffect');
    const draggableContainerEL: HTMLDivElement | null = draggableContainerRef.current;
    draggableContainerEL && new DraggingControl({ elem: draggableContainerEL });
  });
}
