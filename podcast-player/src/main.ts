import { Landing } from "./pages/landing.js";


class App{
	Lending: any
	constructor(){
		this.Lending = new Landing()
	}
	startLanding(){
		this.Lending.render()
		this.afterStartLanding()
	}
	afterStartLanding(){
		window.addEventListener('click',(e:any)=>{
			const card = e.target.closest('.podcast_card') as HTMLDivElement
			if(card){
				console.log(card.dataset.id)
			}
		})
	}
}

const app = new App()

app.startLanding()




