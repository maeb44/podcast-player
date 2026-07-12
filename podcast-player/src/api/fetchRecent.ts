

// interface SearchApiJson{
// 	took:number,
// 	count:number,
// 	total:number,
// 	results:Array<PodcastsEpisodes>
// }
// interface PodcastsEpisodes{
// 	id:string,
// 	rss:string,
// 	link:string,
// 	audio:string,
// 	image:string,
// 	podcast:Podcast,
// 	itunes_id:number,
// 	thumbnail:string,
// 	pub_date_ms:number,
// 	guild_from_rss:string,
// 	title_original:string,
// 	listennotes_url:string,
// 	audio_length_sec: number,
//   explicit_content: boolean,
//   title_highlighted: string,
//   description_original: string,
//   description_highlighted: string,
//   transcripts_highlighted: [],
// }
// interface Podcast{
// 	id: string,
// 	image: string,
// 	genre_ids:Array<number>,
// 	thumbnail:string,
// 	listen_score:number,
// 	title_original:string,
// 	listennotes_url: string,
//   title_highlighted: string,
//   publisher_original: string,
//   publisher_highlighted: string,
//   listen_score_global_rank: string
// }

// interface BestPodcastsJson{
// 	id:number,
// 	name:string,
// 	total:string,
// 	has_next:boolean,
// 	podcasts:Array<>
// }
// interface podcast{
//       id: string,
//       rss: string,
//       type: string,
//       email: string,
//       extra: [Object],
//       image: string,
//       title: string,
//       country: string,
//       website: string,
//       language: string,
//       genre_ids: [Array],
//       itunes_id: 1181233130,
//       publisher: 'Ed Mylett | Cumulus Podcast Network',
//       thumbnail: 'https://cdn-images-3.listennotes.com/podcasts/the-ed-mylett-show-ed-mylett-cumulus-vQDCWVsEFw2-PEUIT9RBhZD.300x300.jpg',
//       is_claimed: false,
//       description: "The Ed Mylett Show showcases the greatest peak-performers across all industries in one place, sharing their journey, knowledge and thought leadership. With Ed Mylett and featured guests in almost every industry including business, health, collegiate and professional sports, politics, entrepreneurship, science, and entertainment, you'll find motivation, inspiration and practical steps to help you become the best version of you!",
//       looking_for: [Object],
//       has_sponsors: true,
//       listen_score: 74,
//       total_episodes: 391,
//       listennotes_url: 'https://www.listennotes.com/c/ee84d7d11875465fb89487675ff5425d/',
//       audio_length_sec: 3083,
//       explicit_content: false,
//       latest_episode_id: 'f2cfeaefe882460aa8069b858544d0c2',
//       latest_pub_date_ms: 1713427200000,
//       earliest_pub_date_ms: 1480363465361,
//       has_guest_interviews: true,
//       update_frequency_hours: 83,
//       listen_score_global_rank: '0.01%'
// }

export async function fetchLanding(page:number=1){

	const params = new URLSearchParams({
		page:String(page),
		sort:"recent_published_first",
	})

	const URL:string = `https://listen-api-test.listennotes.com/api/v2/best_podcasts?${params}`

	try{
		const response: Response = await fetch(URL,{
			method:"GET",
			headers:{
				Accept:'application/json',
				"X-ListenAPI-Key": '',
			}
		});
		if(!response.ok){
			throw new Error(`HTTP ${response.status}:${response.statusText}`)
		}
		const data = await response.json()
		return data;
	}catch(error){
		console.error("Error:",error)
		return null;
	}
}
export async function fetchInput(searchText:string) {
	const params = new URLSearchParams({
		searchText:`${searchText}`
	})
		const URL:string = `https://listen-api-test.listennotes.com/api/v2/search?${params}`

	try{
		const response: Response = await fetch(URL,{
			method:"GET",
			headers:{
				Accept:'application/json',
				"X-ListenAPI-Key": '',
			}
		});
		if(!response.ok){
			throw new Error(`HTTP ${response.status}:${response.statusText}`)
		}
		const data = await response.json()
		return data;
	}catch(error){
		console.error("Error:",error)
		return null;
	}
	
}