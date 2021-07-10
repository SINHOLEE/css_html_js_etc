import Component from './core/Componet.js';

export default class Modal extends Component {
	template() {
		const { isLoading } = this.props;
		console.log(this.props);
		return `
    <div class='modal ${isLoading ? '' : 'hidden'}' style="display:${
			isLoading ? 'block' : 'none'
		}; width:100%; height:100%; position:fixed; z-index:10; top:0; left:0; background-color:rgb(0,0,0,0.4);">
    <div class='modal__wrapper' >
      <div>
      loading...aaa
      </div>
    </div>
    </div>
    `;
	}
}
