import { fetchLanding } from "../api/fetchRecent.js";
import { PodcastCard } from "../utils/components.js";
import { Header } from "../utils/components.js";
export class Landing {
    data;
    page;
    isLoading = false;
    scrollHandler;
    header;
    constructor() {
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
    initScrollListener() {
        window.addEventListener('scroll', this.scrollHandler);
    }
    handleScroll() {
        const windowHeight = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - windowHeight;
        const input = document.getElementById('search');
        if (maxScroll - window.scrollY < 200 && input != null && input.value == '') {
            this.render();
        }
    }
    async render() {
        if (this.isLoading)
            return; //Защита от множественной загрузки
        this.isLoading = true;
        if (this.page === 1) {
            this.header.mount(document.getElementById('main_section'));
        }
        this.data = await fetchLanding(this.page); // зачем лишний fetch)
        this.page += 1; //добавляем страницу при использовании render
        this.data.podcasts?.forEach(e => {
            let nameOfpodc = e.title;
            if (e.title.length > 27) {
                nameOfpodc = e.title.slice(0, 29).padEnd(32, '.');
            }
            const card = new PodcastCard({
                imgUrl: e.image,
                podcastName: nameOfpodc,
                authorName: e.publisher,
                id: e.id
            });
            card.mount(document.getElementById('main_section'));
        }); //создание и добавление карточек
        this.isLoading = false; //конец загрузки
    }
    unmount() {
        this.page = 1;
        const container = document.getElementById('main_section');
        if (container)
            container.innerHTML = '';
    } //удаление landing страницы
}
//# sourceMappingURL=landing.js.map