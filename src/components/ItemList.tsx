import * as React from 'react';
import { MouseEvent } from 'react';

import { Item } from '../lib';

import './ItemList.css';

interface ItemListProps {
  items: Item[];
  onItemClick: (index: number) => ((e: MouseEvent<HTMLLIElement>) => void);
}
// tslint:disable:no-console
export default function ItemList({ items, onItemClick }: ItemListProps) {
  return (
    <ul className="ItemList">
      {items.map((value, index) => (
        <li className="ItemList-item" key={value.title} onClick={onItemClick(index)}>
          {value.title}
        </li>
      ))}
    </ul>
  );
}