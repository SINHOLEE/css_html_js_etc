export default class Component {
	$target;
	$state;
	constructor($target) {
		this.$target = $target;
		this.setup();
		this.render();
		this.setEvent();
	}
	async setup() {}
	template() {
		return '';
	}
	render() {
		const innerHTML = this.template();
		this.$target.innerHTML = innerHTML;
		this.afterRender();
	}
	addEvent(eventType, selector, callback) {
		const children = [...this.$target.querySelectorAll(selector)];

		const isTarget = (target) => children.includes(target) || target.closest(selector);
		this.$target.addEventListener(eventType, (e) => {
			if (!isTarget(e.target)) return false;
			callback(e);
		});
	}
	afterRender() {}
	setEvent() {}
	setState(newState) {
		this.$state = {...this.$state, ...newState};
		this.render();
	}
}
