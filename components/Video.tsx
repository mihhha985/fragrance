import { Lazy } from "./Lazy";

function Video() {
	return (
		<section className="bg-black">
			<h2 className="sr-only">Côte Royale Video Reel</h2>
			<Lazy
				rootMargin="1500px"
				className="relative h-screen overflow-hidden md:aspect-video md:h-auto"
			>
				<iframe
					src={`https://www.youtube-nocookie.com/embed/eTEsWseiDdg?autoplay=1&mute=1&loop=1&playlist=eTEsWseiDdg`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					className="pointer-events-none absolute left-1/2 aspect-video h-full -translate-x-1/2"
				/>
			</Lazy>
		</section>
	);
}

export { Video };
