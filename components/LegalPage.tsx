import { Bounded } from "@/components/Bounded";

type LegalSection = {
	title: string;
	paragraphs: string[];
};

type LegalPageProps = {
	eyebrow: string;
	title: string;
	intro: string;
	updated: string;
	sections: LegalSection[];
};

export const LegalPage = ({
	eyebrow,
	title,
	intro,
	updated,
	sections,
}: LegalPageProps) => (
	<Bounded className="min-h-[70vh] bg-neutral-950 py-20 md:py-28">
		<div className="mx-auto max-w-3xl">
			<p className="mb-5 text-sm tracking-[0.22em] text-gray-400 uppercase">
				{eyebrow}
			</p>
			<h1 className="text-5xl leading-tight md:text-7xl">{title}</h1>
			<p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">{intro}</p>
			<p className="mt-6 text-sm text-gray-500">{updated}</p>

			<div className="mt-16 space-y-12">
				{sections.map((section) => (
					<section
						key={section.title}
						className="border-t border-white/10 pt-8"
					>
						<h2 className="text-3xl leading-tight md:text-4xl">
							{section.title}
						</h2>
						<div className="mt-5 space-y-4 leading-7 text-gray-300">
							{section.paragraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	</Bounded>
);
