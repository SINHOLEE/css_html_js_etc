export default class Component {
	$target;
	$state;
	constructor($target) {
		this.$target = $target;
		this.setup();
		this.render();
	}
	async setup() {}
	template() {
		return '';
	}
	render() {
		const innerHTML = this.template();
		this.$target.innerHTML = innerHTML;
		this.setEvent();
	}
	setEvent() {}
	setState(newState) {
		this.$state = {...this.$state, ...newState};
		this.render();
	}
}
