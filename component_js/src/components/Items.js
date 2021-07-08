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

	async setup() {
		this.$state = {items: await getItems()};
	}
	template() {
		console.log('temp this: ', this);
		if (!this.$state?.items) return '';
		const {items} = this.$state;
		return `
        <input id='item-input'/>
        <button>추가</button>

      <ul>
        ${items
			.map(
				(item) =>
					`<li style='color:${item.done ? 'red' : 'blue'}' data-id=${item.id}><span>${
						item.value
					}</span><button class='delete-btn' data-id=${item.id}>삭제</button></li>`,
			)
			.join('')}
      </ul>
    `;
	}
	async _addItem(input, btn) {
		const {items} = this.$state;
		input.setAttribute('disabled', true);
		btn.setAttribute('disabled', true);
		const newItem = await addItem(input.value);
		this.setState({items: [...items, newItem]});
		btn.setAttribute('disabled', false);
		input.setAttribute('disabled', false);
		input.focus();
	}

	inputEvent() {
		console.log('input', this);
		const btn = this.$target.querySelector('button');
		const input = document.querySelector('#item-input');
		if (!input) return;
		input.addEventListener('keypress', ({key}) => {
			if (key.toLocaleLowerCase() !== 'enter') return;
			this._addItem(input, btn);
		});
		if (!btn) return;
		btn.addEventListener('click', () => {
			this._addItem(input, btn);
		});
	}

	toggleEvent() {
		if (!this.$target) return;
		console.log(this);
		this.$target.addEventListener('click', (e) => {
			console.log(e);
			const target = e.target.closest('[data-id]');
			console.log(target);
		});
	}

	deleteEvent() {
		const deleteBtns = this.$target.querySelectorAll('.delete-btn');
		if (!deleteBtns) return;
		deleteBtns.forEach((delBtn) => {
			delBtn.addEventListener('click', async (e) => {
				const id = e.target.dataset.id;
				if (!id) return;
				e.target.setAttribute('disabled', true);
				e.target.innerHTML = '삭제중...';
				const res = await deleteItem.call(this, e.target.dataset.id);
				if (res) {
					const newItems = this.$state.items.filter((item) => item.id !== res);
					this.setState({items: newItems});
				}
				e.target.setAttribute('disabled', false);
			});
		});
	}

	setEvent() {
		this.inputEvent();
		this.deleteEvent();
		this.toggleEvent();
	}
}
