use leptos::prelude::*;
/// Renders the home page of your application.
#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <div class="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
            <main class="flex-1 mx-auto max-w-6xl w-full px-4">
                <div class="flex flex-row gap-6 py-8">

                    // Left column — sidebar
                    // Left column — main content
                    <div class="flex-1 min-w-0">
                        <h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            Welcome to my website! (WIP)
                        </h1>
                        <p class = "text-xl text-zinc-900 dark:text-zinc-100">
                            Pardon our appearance while under construction :D
                        </p>
                    </div>
                    <div>
                        <h2 class="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                            "Info"
                        </h2>

                        <div class="space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
                            <div>
                                <p class="mt-1">
                                    "This page is server-rendered for fast initial loads."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    }
}