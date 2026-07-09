interface PodcastCardProps {
	imgUrl: string;
	podcastName: string;
	authorName: string;
}


class Component {
	state:object
	element:HTMLElement
	props:object

  constructor(props:object = {}) {
    this.props = props;
    this.state = {};
    this.element = document.createElement('div');
  }

  // Обновление состояния → перерисовка
  setState(newState:object):void {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.onStateChange(prevState, this.state);
    this.update();
  }

  // Жизненный цикл: состояние изменилось
  onStateChange(prevState:object, newState:object) {}

  // Жизненный цикл: компонент добавлен в DOM
  onMount():void  {}

  // Жизненный цикл: компонент удалён из DOM
  onUnmount():void  {}

  // Шаблон — переопределяется в дочернем классе
  render():string {
    return '';
  }

  // Обновление DOM
  update():void {
    this.element.innerHTML = this.render();
    this.afterRender();
  }

  // Привязка событий после рендера
  afterRender():void {}

  // Монтирование в DOM
  mount(container:HTMLElement):void {
    this.update();
    container.appendChild(this.element);
    this.onMount();
  }

  // Удаление из DOM
  unmount():void {
    this.onUnmount();
    this.element.remove();
  }
}

export class PodcastCard extends Component {
	declare props: PodcastCardProps;

	render(): string {
			const {imgUrl,podcastName,authorName} = this.props
			return `<div class="podcast_card">
			<img class="podcast_card__img" src=${imgUrl} alt=${podcastName}>
			<p class="podcast_card__main_txt">${podcastName}</p>
			<p class="podcast_card__sec_txt">${authorName}</p>
			</div>`
	}
}
