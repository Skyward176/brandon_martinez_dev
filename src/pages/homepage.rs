use leptos::prelude::*;
/// Renders the home page of your application.
#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <div class="text-zinc-900 dark:text-zinc-100 min-h-screen bg-zinc-100 dark:bg-zinc-900">
            <div class="mx-auto max-w-6xl w-full px-4 py-8 flex flex-col md:flex-row gap-8 md:gap-12">
                <section class="flex-1 min-w-0 md:max-w-md space-y-4">
                    <h1 class="text-3xl">"Hello, my name is Iris!"</h1>
                    <p class="text-xl font-light">
                        "Welcome to my little stand on the good ol' internet, it's nice to have you!!  ^_^ "
                    </p>
                    <p class="text-xl font-light">
                        "On this page, you'll find personal things about me. If you're interested professional things about me, checkout the 'My Work' section."
                    </p>
                </section>
                <section class="flex-1 min-w-0 md:max-w-xl">
                    <h2 class="text-3xl mb-4">"Things I care about:"</h2>
                    <ul class="list-disc list-outside pl-6 space-y-2 font-light text-xl">
                        <li>
                            "Overwatch! Check out my profile "
                            <a
                                class="text-teal-600 dark:text-teal-200 inline-block hover:scale-105 hover:underline"
                                target="_blank"
                                href="https://overwatch.blizzard.com/en-us/career/f357be83a064d6fcb8a623a9%7C0750d0071c160d2d84ca711b556c0944/"
                            >
                                "here"
                            </a>
                        </li>
                        <li>
                            "Writing about stuff. Look at my substack: "
                            <a
                                class="text-teal-600 dark:text-teal-200 inline-block hover:scale-105 hover:underline"
                                target="_blank"
                                href="https://substack.com/@laplusdaemon"
                            >
                                "@laplusdaemon"
                            </a>
                        </li>
                        <li>
                            "Reading, lots and lots of reading! Friend me on "
                            <a
                                class="text-teal-600 dark:text-teal-200 inline-block hover:scale-105 hover:underline"
                                target="_blank"
                                href="https://www.goodreads.com/user/show/183063261?ref=nav_profile_l"
                            >
                                "Goodreads"
                            </a>
                            " if you want :D"
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    }
}