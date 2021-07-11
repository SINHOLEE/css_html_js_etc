import Component from './core/Componet.js';
import { getItems, deleteItem } from '../api/index.js';

export default class Items extends Component {
	template() {
		const { items } = this.props;
		return `
      <ul>
        ${items
					.map(
						(item) =>
							`<li data-id=${item.id} class='item-li' style='color:${
								item.done ? 'red' : 'blue'
							}' ><span >${
								item.value
							}</span><button class='delete-btn' data-id=${
								item.id
							}>삭제</button></li>`
					)
					.join('')}
      </ul>
    `;
	}
	setEvent() {
		this.addEvent('click', '.delete-btn', (e) => {
			// e.stopProp÷agation();
			this.props.onDeleteItem(e.target.dataset.id);
		});
		this.addEvent('click', '[data-id]', (e) => {
			console.log(e.target);
			console.log(e);
			// this.props.onToggleItem(e.target.dataset.id);
		});
	}

	toggleEvent() {
		console.log('add event listener toggle');

		this.addEvent('click', '.item-li');
		this.$target.addEventListener('click', ({ target }) => {
			const li = target.closest('.item-li');
			if (!li) return;
			console.log(li);
		});
	}

	deleteEvent() {
		console.log('add event listener delete');
		this.$target.addEventListener('click', async ({ target }) => {
			if (!target.classList.contains('delete-btn')) return;
			const id = target.dataset.id;
			if (!id) return;
			target.setAttribute('disabled', true);
			target.innerHTML = '삭제중...';
			const res = await deleteItem.call(this, target.dataset.id);
			if (res) {
				const newItems = await getItems();
				this.setState({ items: [...newItems] });
			}
			target.setAttribute('disabled', false);
		});
	}

	// setEvent() {
	// 	console.log(this);
	// 	this.inputEvent();
	// 	this.deleteEvent();
	// 	this.toggleEvent();
	// }
}
