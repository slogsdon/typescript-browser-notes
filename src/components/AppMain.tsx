import * as React from 'react';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';

import { State } from '../lib';
import ItemDetail from './ItemDetail';
import ItemList from './ItemList';

import './AppMain.css';

const LS_STATE = 'notes-state';

export default class AppMain extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    let state: State = JSON.parse(localStorage.getItem(LS_STATE) || 'null');

    if (!state) {
      state = this.getDefaultState();
    }

    this.state = state;
    this.addItem = this.addItem.bind(this);
    this.resetState = this.resetState.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  render() {
    return (
      <main className="AppMain">
        <section className="AppMain-new">
          <div className="AppMain-new-title-container">
            <input
              type="text"
              className="AppMain-new-title"
              onKeyUp={this.addItem}
              placeholder="New Note"
            />
          </div>
        </section>
        <section className="AppMain-items">
          <div className="AppMain-item-detail">{this.getItemDetail()}</div>
          {this.hasNotes() && (
            <div className="AppMain-item-list">
              <h4 className="AppMain-item-list-heading">All Notes</h4>
              {this.getItemList()}
            </div>
          )}
        </section>
        <section className="AppMain-global-actions">
          {this.hasNotes() && (
            <a className="AppMain-global-actions-action" href="#" onClick={this.resetState}>
              Reset Notes
            </a>
          )}
        </section>
      </main>
    );
  }

  protected addItem(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 13) {
      return;
    }

    const target = e.target as HTMLInputElement;
    const title = target.value;
    target.value = '';

    this.persistState({
      currentItem: this.state.items.length,
      items: this.state.items.concat({
        title,
        content: '',
      }),
    });
  }

  protected getDefaultState() {
    return {
      currentItem: undefined,
      items: [],
    };
  }

  protected getItemDetail() {
    if (this.state.currentItem === undefined || !this.state.items[this.state.currentItem]) {
      return undefined;
    }

    const item = this.state.items[this.state.currentItem];

    return <ItemDetail item={item} updateItem={this.updateItem} />;
  }

  protected getItemList() {
    return (
      <ItemList
        items={this.state.items}
        onItemClick={(index) => (() => this.setState({currentItem: index}))}
      />
    );
  }

  protected hasNotes() {
    return this.state.items && this.state.items.length > 0;
  }

  protected persistState(state: State) {
    localStorage.setItem(LS_STATE, JSON.stringify(state));
    this.setState(state);
  }

  protected resetState(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    this.persistState(this.getDefaultState());
  }

  protected updateItem(e: ChangeEvent<HTMLTextAreaElement>) {
    if (this.state.currentItem === undefined || !this.state.items[this.state.currentItem]) {
      return;
    }

    const target = e.target as HTMLTextAreaElement;
    const items = this.state.items;
    const item = items[this.state.currentItem];
    item.content = target.value;
    items[this.state.currentItem] = item;

    this.persistState({
      currentItem: this.state.currentItem,
      items: items,
    });
  }
}
