import * as React from 'react';
import { ChangeEvent } from 'react';

import { Item } from '../lib';

import './ItemDetail.css';

interface ItemDetailProps {
  item: Item;
  updateItem: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default class ItemDetail extends React.Component<ItemDetailProps> {
  protected contentArea: HTMLTextAreaElement;

  componentDidMount() {
    this.contentArea.focus();
  }

  render() {
    return (
      <div className="ItemDetail">
        <h3 className="ItemDetail-title">{this.props.item.title}</h3>
        <div className="ItemDetail-content-container">
          <textarea
            className="ItemDetail-content"
            onChange={this.props.updateItem}
            value={this.props.item.content}
            ref={(ta) => { if (ta) { this.contentArea = ta; }}}
          />
        </div>
      </div>
    );
  }
}