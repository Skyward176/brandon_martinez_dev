use leptos::prelude::*;
use leptos_meta::*;
use leptos_router::components::*;
use leptos_router::hooks::use_location;
use leptos_router::path;
use leptos_use::{
    use_color_mode_with_options, ColorMode,
    UseColorModeOptions, UseColorModeReturn,
};
use crate::pages::{
    HomePage, Stuff, WorkAbout
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
            <body class="font-serif theme-transition">
                <App/>
            </body>
        </html>
    }
}

#[component]
fn Navbar(
    theme: Signal<ColorMode>,
    set_mode: WriteSignal<ColorMode>,
    menu_open: RwSignal<bool>,
) -> impl IntoView {
    // 1. Create a local signal to control the button's immediate visual state
    let (visual_mode, set_visual_mode) = signal(theme.get_untracked());

    // 2. Keep the local state in sync if the theme is changed from somewhere else
    Effect::new(move |_| {
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
        
        set_visual_mode.set(next.clone());
        set_mode.set(next);
    };

    view! {
        <nav class="border-b border-zinc-800 dark:border-zinc-200 bg-zinc-900 dark:bg-zinc-100">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between gap-4 h-14">
                    <a
                        href="/"
                        aria-label="Iris Martinez"
                        class="text-2xl tracking-wide text-zinc-100 dark:text-zinc-900 origin-left transition-transform hover:scale-105 whitespace-nowrap"
                    >
                        "I"
                        <span class="brand-tail brand-tail-first">"ris "</span>
                        "M"
                        <span class="brand-tail brand-tail-last">"artinez"</span>
                    </a>
                    <div class="flex items-center gap-3 sm:gap-5">
                        <ul class="hidden sm:flex gap-4 text-base">
                            <NavLinks />
                        </ul>
                        <button
                            on:click=move |_| { cycle_mode() }
                            class="flex items-center gap-2 shrink-0 origin-center transition-transform hover:scale-105"
                            aria-label="Toggle color mode"
                        >
                            <span class="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-700 dark:bg-zinc-300 transition-colors">
                                <span
                                    class="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                    // Bind the classes to our instant local `visual_mode` instead of the global `theme`
                                    class=("bg-zinc-600", move || matches!(visual_mode.get(), ColorMode::Dark))
                                    class=("bg-zinc-900", move || matches!(visual_mode.get(), ColorMode::Auto))
                                    class=("translate-x-6", move || matches!(visual_mode.get(), ColorMode::Dark))
                                    class=("translate-x-0", move || !matches!(visual_mode.get(), ColorMode::Dark))
                                />
                            </span>
                        </button>
                        <button
                            type="button"
                            class="sm:hidden relative h-6 w-6 shrink-0"
                            aria-label="Toggle navigation menu"
                            aria-expanded=move || menu_open.get().to_string()
                            aria-controls="mobile-menu"
                            on:click=move |_| menu_open.update(|v| *v = !*v)
                        >
                            <span
                                class="absolute left-0 top-1 h-0.5 w-6 rounded bg-zinc-100 dark:bg-zinc-900"
                                class=("translate-y-[7px]", move || menu_open.get())
                                class=("rotate-45", move || menu_open.get())
                            />
                            <span
                                class="absolute left-0 top-[11px] h-0.5 w-6 rounded bg-zinc-100 dark:bg-zinc-900"
                                class=("opacity-0", move || menu_open.get())
                            />
                            <span
                                class="absolute left-0 top-[18px] h-0.5 w-6 rounded bg-zinc-100 dark:bg-zinc-900"
                                class=("-translate-y-[7px]", move || menu_open.get())
                                class=("-rotate-45", move || menu_open.get())
                            />
                        </button>
                    </div>
                </div>
            </div>
            // Unrolling mobile menu: animates its row height between 0fr and 1fr.
            <div
                id="mobile-menu"
                class="menu-panel sm:hidden"
                data-open=move || menu_open.get().to_string()
                inert=move || !menu_open.get()
            >
                <ul class="overflow-hidden flex flex-col max-w-6xl mx-auto px-4 text-lg">
                    <NavLinks />
                </ul>
            </div>
        </nav>
    }
}

/// The navigation links, shared by the desktop bar and the mobile menu.
#[component]
fn NavLinks() -> impl IntoView {
    const LINK: &str = "inline-block hover:underline underline-offset-4 px-1 py-2 sm:py-1 text-zinc-300 dark:text-zinc-700 aria-current:underline aria-current:underline-offset-4 aria-current:text-zinc-100 dark:aria-current:text-zinc-900 origin-center transition-transform hover:scale-105";
    view! {
        <li>
            <A href="/me" {..} class=LINK>"Me"</A>
        </li>
        <li>
            <A href="/what-i-do" {..} class=LINK>"My Work"</A>
        </li>
        <li>
            <A href="/stuff-i-do" {..} class=LINK>"Stuff I Do"</A>
        </li>
    }
}

/// Order of the top-level pages, used to pick the slide direction.
fn page_index(path: &str) -> usize {
    match path {
        "/what-i-do" => 1,
        "/stuff-i-do" => 2,
        _ => 0,
    }
}

/// Closes the mobile menu on navigation and records whether the page is moving
/// forward or backward through the nav order, for the page transition CSS.
#[component]
fn NavigationEffects(menu_open: RwSignal<bool>) -> impl IntoView {
    let pathname = use_location().pathname;
    let previous = StoredValue::new(None::<usize>);
    Effect::new(move |_| {
        let path = pathname.get();
        menu_open.set(false);
        let index = page_index(&path);
        let direction = match previous.get_value() {
            Some(prev) if index < prev => "nav-backward",
            _ => "nav-forward",
        };
        previous.set_value(Some(index));
        if let Some(root) = document().document_element() {
            let classes = root.class_list();
            _ = classes.remove_2("nav-forward", "nav-backward");
            _ = classes.add_1(direction);
        }
    });
}

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();
    let UseColorModeReturn { mode, set_mode, .. } =
        use_color_mode_with_options(UseColorModeOptions::default().cookie_enabled(true));

    let menu_open = RwSignal::new(false);

    view! {

        <Title text="Iris Martinez" />

        <Router>
            <NavigationEffects menu_open=menu_open/>
            <Navbar theme=mode set_mode=set_mode menu_open=menu_open/>
            <main class="page-outlet">
                <Routes fallback=|| "This page could not be found." transition=true>
                    <Route path=path!("") view=|| view! { <Redirect path="/me"/> } />
                    <Route path=path!("me") view=|| view! { <HomePage /> } />
                    <Route path=path!("what-i-do") view=|| view! { <WorkAbout /> } />
                    <Route path=path!("stuff-i-do") view=|| view! { <Stuff /> } />
                </Routes>
            </main>
        </Router>
    }
}