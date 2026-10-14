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
                        <li>
                            "Music. Alt Rock and J Rock and Emo stuff and Vocaloid and so much more. I just love music. You can follow me on Spotify if you wanna hear what my world sounds like."
                            <div class="mt-8">
                                <a
                                    href="https://open.spotify.com/user/brandonam04?si=f506d7a7a9964915"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex items-center gap-3 w-full max-w-xs rounded-lg bg-zinc-900 dark:bg-zinc-800 p-2.5 text-zinc-100 transition-transform hover:scale-105"
                                >
                                    <img
                                        class="h-10 w-10 rounded-full object-cover"
                                        src="https://i.scdn.co/image/ab6775700000ee85171ed245b21e413ef9123b4d"
                                        alt="Spotify profile picture"
                                        loading="lazy"
                                    />
                                    <div class="min-w-0 flex-1">
                                        <p class="truncate text-base font-semibold">"yoku."</p>
                                    </div>
                                    <svg
                                        class="h-6 w-6 shrink-0 text-[#1DB954]"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-label="Spotify"
                                    >
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.7 1.32.42.18.48.66.24 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-.99-.12-1.14-.6-.12-.48.12-.99.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
                                    </svg>
                                </a>
                            </div>
                        </li>
                        <li>
                            "Learning the piano and guitar. Don't ask me to play anything, I'm not good. But its refreshing to learn :)"
                        </li>
                        <li>
                            "Cars! I especially love Honda, BMW, and Porsche."
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    }
}