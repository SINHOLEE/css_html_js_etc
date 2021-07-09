import Component from './core/Componet.js';
import {addItem, getItems, deleteItem} from '../api/index.js';

export default class Items extends Component {
	constructor($target) {
		super($target);
		this.init();
	}

	async init() {
		this.loading();
		await this.setup();
		this.render();
	}
	loading() {
		this.$target.innerHTML = `<div>loading...</div>`;
	}
	afterRender() {
		const input = document.querySelector('.item-input');
		if (!input) return;
		input.focus();
		console.log(input);
	}

	async setup() {
		this.$state = {items: await getItems()};
	}
	template() {
		if (!this.$state?.items) return '';
		const {items} = this.$state;
		return `
        <input class='item-input' />
        <button type='submit' class='item-submit-btn'>추가</button>

      <ul>
        ${items
			.map(
				(item) =>
					`<li class='item-li' style='color:${item.done ? 'red' : 'blue'}' data-id=${
						item.id
					}><span>${item.value}</span><button class='delete-btn' data-id=${
						item.id
					}>삭제</button></li>`,
			)
			.join('')}
      </ul>
      <div class='modal hidden' style="display:none; width:100%; height:100%; position:fixed; z-index:10; top:0; left:0; background-color:rgb(0,0,0,0.4);"></div>
    `;
	}
	async _addItem(input, btn) {
		const {items} = this.$state;
		input.setAttribute('disabled', true);
		btn.setAttribute('disabled', true);
		const newItem = await addItem(input.value);
		const newItems = await getItems();
		this.setState({items: [...newItem]});
		btn.setAttribute('disabled', false);
		input.setAttribute('disabled', false);
		input.focus();
	}

	inputEvent() {
		console.log('add event listener input');
		this.$target.addEventListener('keypress', ({key, target}) => {
			if (key.toLocaleLowerCase() !== 'enter') return;
			if (!target.classList.contains('item-input')) return;
			if (!target.value) return;
			const btn = this.$target.querySelector('.item-submit-btn');
			this._addItem(target, btn);
		});
		this.$target.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target;
			const input = this.$target.querySelector('.item-input');
			if (!input.value) return;
			if (!target.classList.contains('item-submit-btn')) return;
			this._addItem(input, target);
		});
	}

	toggleEvent() {
		console.log('add event listener toggle');

		this.addEvent('click', '.item-li');
		this.$target.addEventListener('click', ({target}) => {
			const li = target.closest('.item-li');
			if (!li) return;
			console.log(li);
		});
	}

	deleteEvent() {
		console.log('add event listener delete');
		this.$target.addEventListener('click', async ({target}) => {
			if (!target.classList.contains('delete-btn')) return;
			const id = target.dataset.id;
			if (!id) return;
			target.setAttribute('disabled', true);
			target.innerHTML = '삭제중...';
			const res = await deleteItem.call(this, target.dataset.id);
			if (res) {
				const newItems = await getItems();
				this.setState({items: [...newItems]});
			}
			target.setAttribute('disabled', false);
		});
	}

	setEvent() {
		console.log(this);
		this.inputEvent();
		this.deleteEvent();
		this.toggleEvent();
	}
}
