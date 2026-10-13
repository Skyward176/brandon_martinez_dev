use std::time::Duration;

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
use crate::pages::{
    HomePage, WorkAbout
};
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
                <link rel="stylesheet" id="leptos" href="/pkg/iris_martinez_dev.css" />
            </head>
            <body class="font-serif">
                <App/>
            </body>
        </html>
    }
}

#[component]
fn Navbar(
    theme: Signal<ColorMode>,
    set_mode: WriteSignal<ColorMode>,
) -> impl IntoView {
    // 1. Create a local signal to control the button's immediate visual state
    let (visual_mode, set_visual_mode) = signal(theme.get_untracked());

    // 2. Keep the local state in sync if the theme is changed from somewhere else
    create_effect(move |_| {
        set_visual_mode.set(theme.get());
    });

    let cycle_mode = move || {
        let current = visual_mode.get();
        let next = match current {
            ColorMode::Auto => ColorMode::Light,
            ColorMode::Light => ColorMode::Dark,
            ColorMode::Dark => ColorMode::Auto,
            ColorMode::Custom(_) => ColorMode::Light,
        };
        
        // 3. Instantly update the button's visual state for a smooth animation
        set_visual_mode.set(next.clone());
        
        // 4. "Respond later" - delay the heavy global DOM repaint by 150ms 
        // to allow the toggle switch animation to finish first.
        set_timeout(
            move || {
                set_mode.set(next);
            },
            Duration::from_millis(150),
        );
    };

    view! {
        <nav class="border-b border-zinc-800 dark:border-zinc-200 bg-zinc-900 dark:bg-white h-md">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between gap-4 h-14">
                    <a
                        href="/"
                        class="text-2xl tracking-wide text-zinc-100 dark:text-zinc-900 origin-left transition-transform hover:scale-105"
                    >
                        "Iris Martinez"
                    </a>
                    <div class="flex items-center gap-3 sm:gap-5">
                        <ul class="flex gap-2 sm:gap-4 text-sm sm:text-base">
                            <li>
                                <A
                                    href="/me"
                                    {..}
                                    class="inline-block hover:underline underline-offset-4 px-1 py-1 text-zinc-300 dark:text-zinc-700 aria-current:underline aria-current:underline-offset-4 aria-current:text-zinc-100 dark:aria-current:text-zinc-900 origin-center transition-transform hover:scale-105"
                                >
                                    "Me"
                                </A>
                            </li>
                            <li>
                                <A
                                    href="/what-i-do"
                                    {..}
                                    class="inline-block hover:underline underline-offset-4 px-1 py-1 text-zinc-300 dark:text-zinc-700 aria-current:underline aria-current:underline-offset-4 aria-current:text-zinc-100 dark:aria-current:text-zinc-900 origin-center transition-transform hover:scale-105"
                                >
                                    "My Work"
                                </A>
                            </li>
                            <li>
                                <button
                                    on:click=move |_| { cycle_mode() }
                                    class="flex items-center gap-2 shrink-0 origin-center transition-transform hover:scale-105"
                                    aria-label="Toggle color mode"
                                >
                                    <span class="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-700 dark:bg-zinc-300 transition-colors">
                                        <span
                                            class="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                            // 5. Bind the classes to our instant local `visual_mode` instead of the global `theme`
                                            class=("bg-zinc-600", move || matches!(visual_mode.get(), ColorMode::Dark))
                                            class=("bg-zinc-900", move || matches!(visual_mode.get(), ColorMode::Auto))
                                            class=("translate-x-6", move || matches!(visual_mode.get(), ColorMode::Dark))
                                            class=("translate-x-0", move || !matches!(visual_mode.get(), ColorMode::Dark))
                                        />
                                    </span>
                                </button>
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

        <Title text="Iris Martinez" />

        <Router>
            <Navbar theme=mode set_mode=set_mode/>
            <main>
                <Routes fallback=|| "This page could not be found.">
                    <Route path=path!("") view=|| view! { <Redirect path="/me"/> } />
                    <Route path=path!("me") view=|| view! { <HomePage /> } />
                    <Route path=path!("what-i-do") view=|| view! { <WorkAbout /> } />
                </Routes>
            </main>
        </Router>
    }
}