import { debounceWithCancel } from "./debounce.js";
import { fetchInput } from "../api/fetchRecent.js";
import { fetchLanding } from "../api/fetchRecent.js";

export interface LandingData {
    podcasts?: any[];
    results?: any[];
    total?: number;
}

interface PodcastCardProps {
	imgUrl: string;
	podcastName: string;
	authorName: string;
	id:string;
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
			this.element.classList.add('podcast_card')
			const {imgUrl,podcastName,authorName,id} = this.props
			this.element.dataset.id = id
			return `<img class="podcast_card__img" src=${imgUrl} alt=${podcastName}>
			<p class="podcast_card__main_txt">${podcastName}</p>
			<p class="podcast_card__sec_txt">${authorName}</p>`
	}
}
export class Header extends Component{
	private searchDebounced : any
	constructor(props:object={}){
		super(props)
		this.element = document.createElement('header');
		this.searchDebounced = debounceWithCancel((s:string)=>fetchInput(s),400)
	}

	private async inputSearch(e:Event):Promise<void> {
		const mainSec:any = Array.from(document.getElementsByClassName('podcast_card'))
		const input = e.target as HTMLInputElement;
		const data = await this.searchDebounced(input.value)
		if(input.value == ''){
			let LendingData = await fetchLanding(1)
			LendingData.podcasts?.forEach((e:any)=>{
			let nameOfpodc:string = e.title
			if(e.title.length>27){
				 nameOfpodc = e.title.slice(0,29).padEnd(32,'.')
			}
			const card = new PodcastCard({
				imgUrl:e.image,
				podcastName:nameOfpodc,
				authorName:e.publisher,
				id:e.id
			})
			card.mount(document.getElementById('main_section') as HTMLElement)
		})
		}
		
		mainSec.forEach((e:HTMLElement)=>e.remove())
		data.results?.forEach((episode: any) => {
			if(input.value == '') return
			let nameOfpodc: string = episode.title_original || episode.title_highlighted || 'Untitled';
			
			if (nameOfpodc.length > 27) {
				nameOfpodc = nameOfpodc.slice(0, 29).padEnd(32, '.');
			}
			
			const imageUrl = episode.image || episode.podcast?.image || '';
			
			const publisherName = episode.podcast?.publisher_original || 
													episode.podcast?.publisher || 
													'Unknown Publisher';
			
			const card = new PodcastCard({
				imgUrl: imageUrl,
				podcastName: nameOfpodc,
				authorName: publisherName,
				id: episode.id
			});
			
			card.mount(document.getElementById('main_section') as HTMLElement);
		});
	}

	render(): string {
		return `<div class="logo_div">
					<span>Maeb Podcast</span>
				</div>
				<div class="search" id='search_div'>
					<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
						<path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
					</svg>
					<input type="text" id='search'>
				</div>`
	}
	deleteInput():void{
		const search = document.getElementById('search')
		search?.removeEventListener('input',this.inputSearch.bind(this))
		const searchDiv = document.getElementById('search_div')
		searchDiv?.remove()
	}

	onMount(): void {
		const search = document.getElementById('search')
		if(search){		
			search?.addEventListener('input',this.inputSearch.bind(this))
		}
	}
	unmount(): void {
		this.element.remove()
		const search = document.getElementById('search')
		search?.removeEventListener('input',this.inputSearch.bind(this))
	}
	
}
