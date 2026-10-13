use leptos::prelude::*;
/// Renders the home page of your application.
#[component]
pub fn WorkAbout() -> impl IntoView {
    view! {
        <div class="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
            <main class="flex-1 mx-auto max-w-6xl w-full px-4">
                <div class="flex flex-row gap-6 py-8">
                    <div class="flex-row min-w-0">
                        <h1 class="w-full text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            What I do for money:
                        </h1>
                        <p class = "text-xl text-zinc-900 dark:text-zinc-100">
                            Pardon our appearance while under construction :D
                        </p>
                    </div>
                </div>
            </main>
        </div>
    }
}