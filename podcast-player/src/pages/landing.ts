import { fetchLanding } from "../api/fetchRecent.js";
import { PodcastCard } from "../utils/components.js";
import { Header } from "../utils/components.js";
import type { LandingData } from "../utils/components.js";


export class Landing {
	data:LandingData;
	page:number;
	isLoading:boolean = false;
	private scrollHandler: () => void;
	header: any;

	constructor(){
		this.data = {
      podcasts: [],
      results: [],
      total: 0,
    };
		this.page = 1;
		this.scrollHandler = this.handleScroll.bind(this);
		this.initScrollListener();
		this.header = new Header;
	}

	private initScrollListener(){
		window.addEventListener('scroll',this.scrollHandler)
	}

	private handleScroll(){
			const windowHeight = window.innerHeight;
			const maxScroll = document.documentElement.scrollHeight - windowHeight;
			const input = document.getElementById('search') as HTMLInputElement
			if(maxScroll-window.scrollY<200 && input.value == ''){
				this.render()
			}
	}

	async render(){
		if(this.isLoading) return //Защита от множественной загрузки
		this.isLoading = true;
		if(this.page === 1){
			this.header.mount(document.getElementById('main_section') as HTMLElement)
		}
		
			this.data = await fetchLanding(this.page) // зачем лишний fetch)

		this.page += 1; //добавляем страницу при использовании render

		this.data.podcasts?.forEach(e=>{
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
		}) //создание и добавление карточек
		this.isLoading = false; //конец загрузки
	}

	unmount(){
		window.removeEventListener('scroll',this.scrollHandler);
		const container = document.getElementById('main_section')
		if(container) container.innerHTML=''
	}//удаление landing страницы
}


