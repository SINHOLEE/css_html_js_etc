import { addItem, getItems } from '../api/index.js';
import Component from './core/Componet.js';

export default class Input extends Component {
	template() {
		return `
    <input class='item-input' />
    <button type='submit' class='item-submit-btn'>추가</button>
    `;
	}
	afterRender() {
		this.$input = this.$target.querySelector('.item-input');

		this.$input.focus();
	}

	setEvent() {
		const onAddItem = this.props.onAddItem;
		this.addEvent('keypress', '.item-input', ({ key, target }) => {
			if (key.toLocaleLowerCase() !== 'enter') return;
			if (!target.value) return;
			onAddItem(target.value);
		});
		this.addEvent('click', '.item-submit-btn', (e) => {
			e.preventDefault();
			if (!e.target.value) return;
			onAddItem(this.$input.value);
		});
	}
	// inputEvent() {
	// 	this.$target.addEventListener('click', (e) => {
	// 		e.preventDefault();
	// 		const target = e.target;
	// 		const input = this.$target.querySelector('.item-input');
	// 		if (!input.value) return;
	// 		if (!target.classList.contains('item-submit-btn')) return;
	// 		this._addItem(input, target);
	// 	});
	// }
}
