class DraggingState {
  private static instance: null | DraggingState = null;

  static getInstance() {
    if (!this.instance) this.instance = new DraggingState();
    return this.instance;
  }

  private isDragging: boolean;

  private constructor() {
    this.isDragging = false;
  }

  setIsDragging(value: boolean) {
    this.isDragging = value;
  }
  getIsDragging() {
    return this.isDragging;
  }
}

const draggingState = DraggingState.getInstance();

export default draggingState;
