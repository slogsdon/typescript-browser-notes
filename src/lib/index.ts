export interface Item {
  title: string;
  content: string;
}

export interface State {
  currentItem: number | undefined;
  items: Item[];
}
