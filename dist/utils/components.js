import { debounceWithCancel } from "./debounce.js";
import { fetchInput } from "../api/fetchRecent.js";
import { fetchLanding } from "../api/fetchRecent.js";
class Component {
    state;
    element;
    props;
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = document.createElement('div');
    }
    // Обновление состояния → перерисовка
    setState(newState) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...newState };
        this.onStateChange(prevState, this.state);
        this.update();
    }
    // Жизненный цикл: состояние изменилось
    onStateChange(prevState, newState) { }
    // Жизненный цикл: компонент добавлен в DOM
    onMount() { }
    // Жизненный цикл: компонент удалён из DOM
    onUnmount() { }
    // Шаблон — переопределяется в дочернем классе
    render() {
        return '';
    }
    // Обновление DOM
    update() {
        this.element.innerHTML = this.render();
        this.afterRender();
    }
    // Привязка событий после рендера
    afterRender() { }
    // Монтирование в DOM
    mount(container) {
        this.update();
        container.appendChild(this.element);
        this.onMount();
    }
    // Удаление из DOM
    unmount() {
        this.onUnmount();
        this.element.remove();
    }
}
export class PodcastCard extends Component {
    render() {
        this.element.classList.add('podcast_card');
        const { imgUrl, podcastName, authorName, id } = this.props;
        this.element.dataset.id = id;
        return `<img class="podcast_card__img" src=${imgUrl} alt=${podcastName}>
			<p class="podcast_card__main_txt">${podcastName}</p>
			<p class="podcast_card__sec_txt">${authorName}</p>`;
    }
}
export class Header extends Component {
    searchDebounced;
    constructor(props = {}) {
        super(props);
        this.element = document.createElement('header');
        this.searchDebounced = debounceWithCancel((s) => fetchInput(s), 400);
    }
    async inputSearch(e) {
        const mainSec = Array.from(document.getElementsByClassName('podcast_card'));
        const input = e.target;
        const data = await this.searchDebounced(input.value);
        if (input.value == '') {
            let LendingData = await fetchLanding(1);
            LendingData.podcasts?.forEach((e) => {
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
            });
        }
        mainSec.forEach((e) => e.remove());
        data.results?.forEach((episode) => {
            if (input.value == '')
                return;
            let nameOfpodc = episode.title_original || episode.title_highlighted || 'Untitled';
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
            card.mount(document.getElementById('main_section'));
        });
    }
    render() {
        return `<div class="logo_div">
					<span>Maeb Podcast</span>
				</div>
				<div class="search" id='search_div'>
					<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
						<path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
					</svg>
					<input type="text" id='search'>
				</div>`;
    }
    deleteInput() {
        const search = document.getElementById('search');
        search?.removeEventListener('input', this.inputSearch.bind(this));
        const searchDiv = document.getElementById('search_div');
        searchDiv?.remove();
    }
    onMount() {
        const search = document.getElementById('search');
        if (search) {
            search?.addEventListener('input', this.inputSearch.bind(this));
        }
    }
    unmount() {
        this.element.remove();
        const search = document.getElementById('search');
        search?.removeEventListener('input', this.inputSearch.bind(this));
    }
}
export class EpisodeCard extends Component {
    render() {
        const { episodeName, duration, releaseDate, audio } = this.props;
        const date = new Date(releaseDate).toLocaleString('ru-RU');
        const durationString = `${Math.floor(duration / 60)}:${duration % 60}`;
        return `<div class="episode-row" data-audio="${audio}"
					<button class="episode-play-btn">▶</button>
					<div class="episode-info">
						<h3 class="episode-title">${episodeName}</h3>
						<p class="episode-release">Release: ${date} | Duration: ${durationString}</p>
					</div>
					<button class="episode-queue-btn" title="Add to playlist">+</button>
					</div>`;
    }
}
export class EpisodeContent extends Component {
    render() {
        const { EpisodesName, EpisodesAuthor, EpisodesImg, EpisodesLastPub } = this.props;
        const date = new Date(EpisodesLastPub).toLocaleString('ru-RU');
        return `
			<div class="detail__backbtn">
				<button class="backbtn">
					All podcasts
				</button>
			</div>
			<div class="page-content">
				<div class="description">
					<img class="detail__desc_img" src="${EpisodesImg}" alt="logo">
					<p class="main_desc">${EpisodesName}</p>
					<p class="little_desc">${EpisodesAuthor}</p>
					<p class="little_desc">Last release ${date}</p>
				</div>
				<div class="episodes-label">Last episodes</div>`;
    }
}
//# sourceMappingURL=components.js.map