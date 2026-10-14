use crate::components::{CardGrid, ExpandableCard};
use leptos::prelude::*;

struct Project {
    title: &'static str,
    tagline: &'static str,
    status: &'static str,
    description: &'static str,
    tags: &'static [&'static str],
}

// Placeholder entries — replace with real projects.
const PROJECTS: &[Project] = &[
    Project {
        title: "iris_martinez_dev",
        tagline: "This website",
        status: "Ongoing",
        description: "My personal site, written in Rust with Leptos and styled with Tailwind. Server-side rendered and hydrated in WebAssembly.",
        tags: &["Rust", "Leptos", "Tailwind"],
    },
    Project {
        title: "Project Two",
        tagline: "A short summary",
        status: "Completed",
        description: "A longer description of what this project is, why I built it, and what I learned along the way.",
        tags: &["Systems", "C"],
    },
    Project {
        title: "Project Three",
        tagline: "A short summary",
        status: "In progress",
        description: "A longer description of what this project is, why I built it, and what I learned along the way.",
        tags: &["AI", "Python"],
    },
];

/// Renders the "stuff I do" page: a grid of project cards.
#[component]
pub fn Stuff() -> impl IntoView {
    view! {
        <div class="text-zinc-900 dark:text-zinc-100 min-h-screen bg-zinc-100 dark:bg-zinc-900">
            <div class="mx-auto max-w-6xl w-full px-4 py-8">
                <h1 class="text-3xl mb-2">"Stuff I do"</h1>
                <p class="text-xl font-light mb-8">
                    "Projects I'm working on, or have worked on. Tap a card to read more."
                </p>
                <CardGrid>
                    {PROJECTS
                        .iter()
                        .map(|p| {
                            view! {
                                <ExpandableCard
                                    label=p.title
                                    summary=move || {
                                        view! {
                                            <div class="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                                {p.status}
                                            </div>
                                            <h2 class="text-2xl mt-1">{p.title}</h2>
                                            <p class="text-lg font-light mt-2">{p.tagline}</p>
                                        }
                                    }
                                >
                                    <div class="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        {p.status}
                                    </div>
                                    <h2 class="text-4xl mt-1 mb-4">{p.title}</h2>
                                    <p class="text-xl font-light">{p.description}</p>
                                    <ul class="flex flex-wrap gap-2 mt-6">
                                        {p
                                            .tags
                                            .iter()
                                            .map(|t| {
                                                view! {
                                                    <li class="rounded-full bg-teal-600 text-white dark:bg-teal-500 dark:text-zinc-900 px-3 py-1 text-sm">
                                                        {*t}
                                                    </li>
                                                }
                                            })
                                            .collect_view()}
                                    </ul>
                                </ExpandableCard>
                            }
                        })
                        .collect_view()}
                </CardGrid>
            </div>
        </div>
    }
}
