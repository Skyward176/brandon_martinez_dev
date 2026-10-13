use leptos::prelude::*;
/// Renders the home page of your application.
#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <div class="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
            <main class="flex-1 mx-auto w-full px-4">
                <div class="flex flex-row gap-6 py-8">

                    // Left column — sidebar
                    // Left column — main content
                    <div class="flex-1 min-w-0">
                        <h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            Iris Martinez
                        </h1>
                    </div>
                    <div class="flex">
                        <h2 class="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                            "Info"
                        </h2>

                        <div class="space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
                        <p class="text-zinc-600 dark:text-zinc-300 mb-2">
                            "Color mode:" 
                        </p>
                        <div class="flex flex-wrap gap-2 mb-6">
                            <button
                                class="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                "Change to Light"
                            </button>
                            <button
                                class="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                "Change to Dark"
                            </button>
                            <button
                                class="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                "Change to Auto"
                            </button>
                        </div>
                        <p class="text-zinc-600 dark:text-zinc-300">
                            "Dark preferred: "
                        </p>
                            <div>
                                <p class="font-medium text-zinc-900 dark:text-zinc-100">"Color Mode"</p>
                                <p class="mt-1">
                                    "Toggle between light, dark, and auto themes."
                                </p>
                            </div>
                            <div>
                                <p class="font-medium text-zinc-900 dark:text-zinc-100">"SSR"</p>
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