import { Landing } from "./pages/landing.js";
import { DetailPage } from "./pages/details.js";
import { formatTime } from "./utils/formatTime.js";
export class App {
    landing;
    details = null;
    history = ['landing'];
    currentIndex = 0;
    track;
    constructor() {
        this.landing = new Landing();
        this.track = new Audio();
        this.showLanding();
        this.setupClickHandlers();
        this.setupPopState();
    }
    setupClickHandlers() {
        document.addEventListener('click', this.handleClick.bind(this));
    }
    setupPopState() {
        window.addEventListener('popstate', (event) => {
            if (event.state?.page === 'details' && event.state?.id) {
                this.showDetails(event.state.id);
            }
            else {
                this.showLanding();
            }
        });
    }
    async handleClick(e) {
        const playBtn = e.target.closest('#player-btn');
        const episodeRow = e.target.closest('.episode-row');
        const card = e.target.closest('.podcast_card');
        const homeBtn = e.target.closest('.backbtn');
        if (card?.dataset.id) {
            e.preventDefault();
            const id = card.dataset.id;
            // Сохраняем в историю браузера
            history.pushState({ page: 'details', id }, '', '');
            this.showDetails(id);
            return;
        }
        if (homeBtn) {
            e.preventDefault();
            // Сохраняем в историю браузера
            history.pushState({ page: 'landing' }, '', '');
            this.showLanding();
        }
        if (episodeRow) {
            this.track.src = episodeRow.dataset.audio;
            console.log(episodeRow);
        }
        if (playBtn && this.track.src) {
            const durTxt = document.getElementById('dur-txt');
            const curTrak = await this.track;
            if (durTxt) {
                const current = await formatTime(curTrak.currentTime);
                const total = await formatTime(curTrak.duration);
                durTxt.textContent = `${current}/${total}`;
            }
            if (playBtn.textContent !== '⏸') {
                curTrak.play();
                playBtn.textContent = '⏸';
            }
            else {
                if (curTrak.duration > 1) {
                    curTrak.pause();
                    playBtn.textContent = '▶';
                }
            }
        }
    }
    showDetails(id) {
        if (this.details) {
            this.details.unmount();
            this.details = null;
        }
        this.landing.unmount();
        this.details = new DetailPage(id);
        this.details.onmount();
    }
    showLanding() {
        if (this.details) {
            this.details.unmount();
            this.details = null;
        }
        this.landing.render();
    }
    start() {
        console.log('Хоть бы хоть бы');
    }
}
const app = new App;
app.start();
//# sourceMappingURL=main.js.map