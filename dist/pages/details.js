import { FetchDetails } from "../api/fetchRecent.js";
import { EpisodeCard } from "../utils/components.js";
import { EpisodeContent } from "../utils/components.js";
export class DetailPage {
    id;
    data;
    constructor(id) {
        this.id = id;
    }
    async render() {
        this.data = await FetchDetails(this.id);
        const ArrayOfEpisodes = this.data.episodes;
        let rendered = '';
        const EpisodesInfo = {
            EpisodesName: this.data.title,
            EpisodesAuthor: this.data.publisher,
            EpisodesImg: this.data.image,
            EpisodesLastPub: this.data.earliest_pub_date_ms,
        };
        const episode = new EpisodeContent(EpisodesInfo);
        rendered += episode.render();
        ArrayOfEpisodes.forEach((e) => {
            const EpisodeInfo = {
                audio: e.audio,
                episodeName: e.title,
                releaseDate: e.pub_date_ms,
                duration: e.audio_length_sec
            };
            const episodeDiv = new EpisodeCard(EpisodeInfo);
            rendered += episodeDiv.render();
        });
        return rendered;
    }
    async onmount() {
        const ParentElement = document.createElement('div');
        ParentElement.classList.add('page-content');
        const container = document.getElementById('main_section');
        if (container) {
            ParentElement.innerHTML = await this.render();
            container.append(ParentElement);
        }
    }
    unmount() {
        const container = document.getElementById('main_section');
        if (container) {
            container.innerHTML = '';
        }
    }
}
//# sourceMappingURL=details.js.map