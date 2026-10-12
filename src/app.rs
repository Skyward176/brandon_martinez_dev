use leptos::prelude::*;
use leptos_meta::{provide_meta_context, MetaTags, Stylesheet, Title};
use leptos_router::{
    components::{Route, Router, Routes},
    StaticSegment,
};

pub fn shell(options: LeptosOptions) -> impl IntoView {
    view! {
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <AutoReload options=options.clone() />
                <HydrationScripts options/>
                <MetaTags/>
            </head>
            <body>
                <App/>
            </body>
        </html>
    }
}

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
        <Stylesheet id="leptos" href="/pkg/iris_martinez_dev.css"/>

        // Compiled Tailwind CSS (Sass source in style/tailwind.scss, built to
        // public/app.css by `npm run build:css`, which cargo-leptos copies into
        // the served site root).
        <Stylesheet id="tailwind" href="/app.css"/>

        // sets the document title
        <Title text="Iris Martinez"/>

        // content for this welcome page
        <Router>
            <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">
                <Navbar/>
                <main class="flex-1">
                    <Routes fallback=|| "Page not found.".into_view()>
                        <Route path=StaticSegment("") view=HomePage/>
                    </Routes>
                </main>
            </div>
        </Router>
    }
}

/// A simple top navigation bar.
#[component]
fn Navbar() -> impl IntoView {
    view! {
        <nav class="bg-slate-900 text-slate-100 shadow-md">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between h-14">
                    <a
                        href="/"
                        class="text-lg font-semibold tracking-wide hover:text-sky-400 transition-colors"
                    >
                        "Iris Martinez"
                    </a>
                    <ul class="flex gap-2 sm:gap-4 text-sm sm:text-base">
                        <li>
                            <a
                                href="/#about"
                                class="hover:text-sky-400 transition-colors px-1 py-1"
                            >
                                "About"
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#projects"
                                class="hover:text-sky-400 transition-colors px-1 py-1"
                            >
                                "Projects"
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#contact"
                                class="hover:text-sky-400 transition-colors px-1 py-1"
                            >
                                "Contact"
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    }
}

/// Renders the home page of your application.
#[component]
fn HomePage() -> impl IntoView {
    // Creates a reactive value to update the button
    let count = RwSignal::new(0);
    let on_click = move |_| *count.write() += 1;

    view! {
        <section id="about" class="max-w-6xl mx-auto px-4 py-8 sm:py-12">
            <h1 class="text-3xl sm:text-4xl font-bold mb-2">"Welcome to Leptos!"</h1>
            <p class="text-slate-600 mb-6">
                "A responsive three-column layout built with Tailwind CSS."
            </p>

            // Mobile-friendly three-column flex layout:
            // stacks into a single column on small screens (flex-col) and becomes
            // three side-by-side columns on medium screens and up (md:flex-row).
            <div class="flex flex-col md:flex-row gap-4">
                <div
                    id="projects"
                    class="flex-1 bg-white rounded-lg shadow p-6 border border-slate-200"
                >
                    <h2 class="text-xl font-semibold mb-3">"Column One"</h2>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        "First card in the layout. On mobile the columns stack
                        vertically; on larger screens they sit side by side."
                    </p>
                </div>
                <div
                    class="flex-1 bg-white rounded-lg shadow p-6 border border-slate-200"
                >
                    <h2 class="text-xl font-semibold mb-3">"Column Two"</h2>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        "Second card. Each flex-1 item grows equally to fill the
                        row, keeping the three columns balanced."
                    </p>
                    <button
                        on:click=on_click
                        class="mt-3 inline-block rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
                    >
                        "Click Me: " {count}
                    </button>
                </div>
                <div
                    id="contact"
                    class="flex-1 bg-white rounded-lg shadow p-6 border border-slate-200"
                >
                    <h2 class="text-xl font-semibold mb-3">"Column Three"</h2>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        "Third card, anchored by the contact section used by the
                        navbar link."
                    </p>
                </div>
            </div>
        </section>
    }
}
