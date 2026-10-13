use leptos::prelude::*;

/// Renders the home page of your application.
#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <section id="about" class="max-w-6xl mx-auto px-4 py-8 sm:py-12">
            <h1 class="text-3xl sm:text-4xl font-bold mb-2">"Welcome to Leptos!"</h1>
            <p class="text-slate-600 mb-6">
                "A responsive three-column layout built with Tailwind CSS."
            </p>

            // Mobile-friendly three-column flex layout:
            // stacks into a single column on small screens (flex-col) and becomes
            // three side-by-side columns on medium screens and up (md:flex-row).
            <div class="flex flex-col md:flex-row gap-4">
                <div
                    id="projects"
                    class="flex-1 bg-white rounded-lg shadow p-6 border border-slate-200"
                >
                    <h2 class="text-xl font-semibold mb-3">"Column One"</h2>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        "First card in the layout. On mobile the columns stack
                        vertically; on larger screens they sit side by side."
                    </p>
                </div>
                <div
                    class="flex-1 bg-white rounded-lg shadow p-6 border border-slate-200"
                >
                    <h2 class="text-xl font-semibold mb-3">"Column Two"</h2>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        "Second card. Each flex-1 item grows equally to fill the
                        row, keeping the three columns balanced."
                    </p>
                </div>
                <div
                    id="contact"
                    class="flex-1 bg-white rounded-lg shadow p-6 border border-slate-200"
                >
                    <h2 class="text-xl font-semibold mb-3">"Column Three"</h2>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        "Third card, anchored by the contact section used by the
                        navbar link."
                    </p>
                </div>
            </div>
        </section>
    }
}
