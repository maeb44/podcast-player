import { fetchLanding } from "../api/fetchRecent.js";
import { PodcastCard } from "../utils/components.js";

interface LandingData {
    podcasts?: any[];
    results?: any[];
    total?: number;
}

export class Landing {
	data:LandingData;
	page:number;
	isLoading:boolean = false;
	private scrollHandler: () => void;

	constructor(data:LandingData){
		this.data = data;
		this.page = 1;
		this.scrollHandler = this.handleScroll.bind(this);
		this.initScrollListener();
	}

	private initScrollListener(){
		window.addEventListener('scroll',this.scrollHandler)
	}

	private handleScroll(){
			const windowHeight = window.innerHeight;
			const maxScroll = document.documentElement.scrollHeight - windowHeight;
			if(maxScroll-window.scrollY<200){
				this.render()
			}
	}

	async render(){

		if(this.isLoading) return //Защита от множественной загрузки
		this.isLoading = true;

		if(this.page>1){
			this.data = await fetchLanding(this.page) // зачем лишний fetch)
		}
		this.page += 1; //добавляем страницу при использовании render

		this.data.podcasts?.forEach(e=>{
			let nameOfpodc:string = e.title
			if(e.title.length>27){
				 nameOfpodc = e.title.slice(0,29).padEnd(32,'.')
			}
			const card = new PodcastCard({
				imgUrl:e.image,
				podcastName:nameOfpodc,
				authorName:e.publisher
			})
			card.mount(document.getElementById('main_section') as HTMLElement)
		}) //создание и добавление карточек

		this.isLoading = false; //конец загрузки
	}

	destroy(){
		window.removeEventListener('scroll',this.scrollHandler); //удаление обработчика во избежание ошибок
	}

	unmount(){
		this.destroy();
		const container = document.getElementById('main_section')
		if(container) container.innerHTML=''
	}//удаление landing страницы
}

const data = await fetchLanding()

export const landing = new Landing(data)


