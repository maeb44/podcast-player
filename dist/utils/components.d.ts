export interface LandingData {
    podcasts?: any[];
    results?: any[];
    total?: number;
}
interface PodcastCardProps {
    imgUrl: string;
    podcastName: string;
    authorName: string;
    id: string;
}
interface EpisodesProps {
    EpisodesImg: string;
    EpisodesName: string;
    EpisodesAuthor: string;
    EpisodesLastPub: number;
}
interface EpisodeCardProps {
    audio: string;
    episodeName: string;
    releaseDate: number;
    duration: number;
}
declare class Component {
    state: object;
    element: HTMLElement;
    props: object;
    constructor(props?: object);
    setState(newState: object): void;
    onStateChange(prevState: object, newState: object): void;
    onMount(): void;
    onUnmount(): void;
    render(): string;
    update(): void;
    afterRender(): void;
    mount(container: HTMLElement): void;
    unmount(): void;
}
export declare class PodcastCard extends Component {
    props: PodcastCardProps;
    render(): string;
}
export declare class Header extends Component {
    private searchDebounced;
    constructor(props?: object);
    private inputSearch;
    render(): string;
    deleteInput(): void;
    onMount(): void;
    unmount(): void;
}
export declare class EpisodeCard extends Component {
    props: EpisodeCardProps;
    render(): string;
}
export declare class EpisodeContent extends Component {
    props: EpisodesProps;
    render(): string;
}
export {};
//# sourceMappingURL=components.d.ts.map