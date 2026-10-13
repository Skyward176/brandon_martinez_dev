use leptos::prelude::*;
use leptos_meta::{provide_meta_context, MetaTags, Stylesheet, Title};
use leptos_router::{
    components::{Route, Router, Routes},
    StaticSegment,
};

use crate::components::Navbar;
use crate::pages::HomePage;

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