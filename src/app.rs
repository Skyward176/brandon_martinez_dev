use codee::string::FromToStringCodec;
use leptos::ev::{keypress, KeyboardEvent};
use leptos::prelude::*;
use leptos_meta::*;
use leptos_router::components::*;
use leptos_router::path;
use leptos_use::storage::{use_local_storage, use_local_storage_with_options, UseStorageOptions};
use leptos_use::{
    use_color_mode_with_options, use_cookie_with_options, use_preferred_dark,
    ColorMode, UseColorModeOptions, UseColorModeReturn, UseCookieOptions,
};
use crate::pages::HomePage;
pub fn shell(options: LeptosOptions) -> impl IntoView {
    view! {
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <MetaTags />
                <AutoReload options=options.clone() />
                <HydrationScripts options />
                <link rel="stylesheet" id="leptos" href="/pkg/leptos_use_ssr.css" />
            </head>
            <body>
                <App />
            </body>
        </html>
    }
}

#[component]
fn Navbar(
    theme: Signal<ColorMode>,
    set_mode: WriteSignal<ColorMode>,
) -> impl IntoView {
    let current_mode = move || theme.get();
    let cycle_mode = move || {
        let next = match current_mode() {
            ColorMode::Auto => ColorMode::Light,
            ColorMode::Light => ColorMode::Dark,
            ColorMode::Dark => ColorMode::Auto,
            ColorMode::Custom(_) => ColorMode::Light,
        };
        set_mode.set(next);
    };
    view! {
        <nav class="border-b border-zinc-200 dark:border-zinc-900">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between gap-4 h-14">
                    <a
                        href="/"
                        class="text-lg font-bold tracking-wide text-zinc-900 dark:text-zinc-900"
                    >
                        "Iris Martinez"
                    </a>
                    <div class="flex items-center gap-3 sm:gap-5">
                        <button
                            class="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-white text-zinc-900 dark:text-zinc-900 rounded hover:bg-zinc-200 dark:hover:bg-zinc-100 transition-colors"
                            on:click=move |_| { cycle_mode() }
                        >
                            {move || format!("Switch to {}", match current_mode() {
                                ColorMode::Auto => "Light",
                                ColorMode::Light => "Dark",
                                ColorMode::Dark => "Auto",
                                ColorMode::Custom(_) => "Light",
                            })}
                        </button>
                        <ul class="flex gap-2 sm:gap-4 text-sm sm:text-base">
                            <li>
                                <a
                                    href="/about"
                                    class="hover:underline underline-offset-4 px-1 py-1 text-zinc-700 dark:text-zinc-900"
                                >
                                    "About"
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/work"
                                    class="hover:underline underline-offset-4 px-1 py-1 text-zinc-700 dark:text-zinc-900"
                                >
                                    "My Work"
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    class="hover:underline underline-offset-4 px-1 py-1 text-zinc-700 dark:text-zinc-900"
                                >
                                    "Contact"
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    }
}
#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();
    let UseColorModeReturn { mode, set_mode, .. } =
        use_color_mode_with_options(UseColorModeOptions::default().cookie_enabled(true));

    let is_dark_preferred = use_preferred_dark();
    view! {
        <Stylesheet id="leptos" href="/app.css" />

        <Title text="Iris Martinez" />

        <Router>
            <Navbar theme=mode set_mode=set_mode/>
            <main>
                <Routes fallback=|| "This page could not be found.">
                    <Route path=path!("") view=|| view! { <HomePage /> } />
                </Routes>
            </main>
        </Router>
    }
}

#[server]
pub async fn set_a_cookie() -> Result<(), ServerFnError> {
    let cookie_name = "test_cookie";
    let cookie_value = "test_value";

    let (cookie, set_cookie) = leptos_use::use_cookie::<String, FromToStringCodec>("bla-cookie");

    set_cookie.set(Some("something not so important".to_string()));

    Ok(())
}