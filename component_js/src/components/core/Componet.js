export default class Component {
	$target;
	$state;
	constructor($target, props = {}) {
		this.$target = $target;
		this.props = props; // 안하면 어떻게 되지?
		this.setup();
		this.render();
		this.setEvent();
	}
	setup() {}
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

		const isTarget = (target) =>
			children.includes(target) || target.closest(selector);
		this.$target.addEventListener(eventType, (e) => {
			if (!isTarget(e.target)) return false;
			callback(e);
		});
	}
	afterRender() {}
	setEvent() {}
	setState(newState) {
		this.$state = { ...this.$state, ...newState };
		this.render();
	}
}
