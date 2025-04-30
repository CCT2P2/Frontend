import React, { useState, useRef, useEffect } from "react";

interface Props {
	onChange: (csvString: string) => void;
}

const options = [
	{
		category: "Programming Languages",
		tags: [
			"JavaScript",
			"TypeScript",
			"Python",
			"Java",
			"C#",
			"C++",
			"Go",
			"Rust",
			"Ruby",
			"PHP",
			"Swift",
			"Kotlin",
		],
	},
	{
		category: "Web Development",
		tags: [
			"HTML",
			"CSS",
			"Tailwind CSS",
			"React",
			"Next.js",
			"Angular",
			"Vue.js",
			"Svelte",
			"WebAssembly",
			"REST API",
			"GraphQL",
			"WebSockets",
		],
	},
	{
		category: "Frameworks & Libraries",
		tags: [
			"Express.js",
			"Django",
			"Flask",
			"ASP.NET",
			"Laravel",
			"Spring Boot",
			"Bootstrap",
			"jQuery",
			"Redux",
			"Zustand",
			"Prisma",
			"ORMs",
		],
	},
	{
		category: "Databases",
		tags: [
			"SQL",
			"PostgreSQL",
			"MySQL",
			"SQLite",
			"MongoDB",
			"Redis",
			"Firebase",
			"Supabase",
		],
	},
	{
		category: "AI / ML / Data",
		tags: [
			"Machine Learning",
			"Deep Learning",
			"TensorFlow",
			"PyTorch",
			"OpenAI",
			"LangChain",
			"LLM",
			"Pandas",
			"NumPy",
			"Scikit-learn",
			"Data Science",
			"Data Engineering",
		],
	},
	{
		category: "DevOps / Cloud",
		tags: [
			"Docker",
			"Kubernetes",
			"AWS",
			"Azure",
			"GCP",
			"CI/CD",
			"GitHub Actions",
			"Terraform",
			"Serverless",
		],
	},
	{
		category: "Testing",
		tags: [
			"Jest",
			"Vitest",
			"Cypress",
			"Playwright",
			"Selenium",
			"Unit Testing",
			"Integration Testing",
			"TDD",
		],
	},
	{
		category: "Tools & Misc",
		tags: [
			"Git",
			"GitHub",
			"GitLab",
			"VSCode",
			"Linux",
			"Bash",
			"Regex",
			"API Design",
			"Security",
			"Performance",
			"Design Patterns",
		],
	},
	{
		category: "Career / Learning",
		tags: [
			"Code Review",
			"Best Practices",
			"Interview Prep",
			"Career Advice",
			"Bootcamp",
			"Remote Work",
			"Freelancing",
			"Open Source",
		],
	},
	{
		category: "Exoteric / Esoteric Languages",
		tags: [
			"Brainfuck",
			"Befunge",
			"Malbolge",
			"Whitespace",
			"Piet",
			"Shakespeare",
			"INTERCAL",
			"Ook!",
			"Chef",
			"LOLCODE",
			"Thue",
			"FALSE",
			"Unlambda",
			"HQ9+",
			"ArnoldC",
			"Deadfish",
			"SMETANA",
			"L33t",
		],
	},
];

export default function TagDropdown({ onChange }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<string[]>([]);
	const dropdownRef = useRef(null);

	const toggleOption = (option: string) => {
		const updated = selected.includes(option)
			? selected.filter((item) => item !== option)
			: [...selected, option];

		setSelected(updated);
		onChange(updated.join(","));
	};

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!(
					dropdownRef.current as React.RefObject<HTMLDivElement>
				).current?.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<div className="relative w-full" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full px-4 py-2 border border-input rounded-xl text-left bg-background shadow-sm hover:bg-muted transition"
			>
				{selected.length > 0 ? selected.join(", ") : "Select tags..."}
			</button>

			{isOpen && (
				<div className="absolute z-20 mt-1 w-full bg-popover border border-border rounded-xl shadow-md max-h-80 overflow-y-auto p-2">
					{options.map(({ category, tags }) => (
						<div key={category} className="mb-2">
							<div className="font-semibold text-sm px-2 py-1 text-muted-foreground">
								{category}
							</div>
							{tags.map((tag) => (
								<label
									key={tag}
									className="flex items-center px-4 py-1 hover:bg-muted cursor-pointer rounded"
								>
									<input
										type="checkbox"
										checked={selected.includes(tag)}
										onChange={() => toggleOption(tag)}
										className="mr-2"
									/>
									{tag}
								</label>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
