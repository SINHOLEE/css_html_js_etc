import { addItem, deleteItem, getItems, toggleItem } from '../api/index.js';
import Component from './core/Componet.js';
import Input from './Input.js';
import Items from './Items.js';
import Modal from './Modal.js';

export default class App extends Component {
	setup() {
		this.$state = {
			isLoading: true,
			items: [],
		};
		getItems().then((res) => this.setState({ isLoading: false, items: res }));
	}

	template() {
		return `
		<div data-component='input--component'></div>
		<div data-component='list--component'></div>	
		<div data-component='modal--component'></div>
		`;
	}

	async onAddItem(text) {
		this.setState({ ...this.$state, isLoading: true });
		this.setState({
			...this.$state,
			items: [...this.$state.items, await addItem(text)],
		});

		this.setState({ ...this.$state, isLoading: false });
	}
	async onToggleItem(id) {
		this.setState({ ...this.$state, isLoading: true });
		await toggleItem(id);
		this.setState({
			...this.$state,
			items: [
				...this.$state.items.map((item) =>
					item.id !== id ? item : { ...item, done: !item.done }
				),
			],
		});
		this.setState({ ...this.$state, isLoading: false });
	}
	async onDeleteItem(id) {
		this.setState({ ...this.$state, isLoading: true });
		await deleteItem(id);
		this.setState({
			...this.$state,
			items: [...this.$state.items.filter((item) => item.id !== id)],
		});
		this.setState({ ...this.$state, isLoading: false });
	}
	afterRender() {
		const $input = document.querySelector(
			'[data-component="input--component"]'
		);
		const $list = document.querySelector('[data-component="list--component"]');
		const $modal = document.querySelector(
			'[data-component="modal--component"]'
		);

		new Input($input, {
			onAddItem: this.onAddItem.bind(this),
		});
		new Modal($modal, { isLoading: this.$state.isLoading });
		new Items($list, {
			items: this.$state.items,
			onDeleteItem: this.onDeleteItem.bind(this),
			onToggleItem: this.onToggleItem.bind(this),
		});
	}
}
