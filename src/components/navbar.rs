use leptos::prelude::*;

/// A simple top navigation bar with links to each page.
#[component]
pub fn Navbar() -> impl IntoView {
    view! {
        <nav class="border-b border-zinc-200">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between gap-4 h-14">
                    <a
                        href="/"
                        class="text-lg font-bold tracking-wide"
                    >
                        "Iris Martinez"
                    </a>
                    <div class="flex items-center gap-3 sm:gap-5">
                        <ul class="flex gap-2 sm:gap-4 text-sm sm:text-base">
                            <li>
                                <a
                                    href="/about"
                                    class="hover:underline underline-offset-4 px-1 py-1"
                                >
                                    "About"
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/work"
                                    class="hover:underline underline-offset-4 px-1 py-1"
                                >
                                    "My Work"
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    class="hover:underline underline-offset-4 px-1 py-1"
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