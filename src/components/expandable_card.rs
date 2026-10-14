use leptos::prelude::*;
use leptos::wasm_bindgen::JsCast;
use std::time::Duration;

const ANIM_MS: u64 = 400;

/// Where the card sat on screen when it was clicked, in viewport pixels.
#[derive(Clone, Copy)]
struct Origin {
    top: f64,
    left: f64,
    width: f64,
    height: f64,
}

/// Responsive grid for cards: one column on mobile, three at large widths.
#[component]
pub fn CardGrid(children: Children) -> impl IntoView {
    view! { <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">{children()}</div> }
}

/// A card floating above the background. Clicking it animates it open to fill the
/// viewport; the back button animates it closed onto its original spot.
///
/// `summary` is shown on the card face, `children` in the expanded view.
#[component]
pub fn ExpandableCard(
    /// Accessible name for the expanded dialog.
    #[prop(into)]
    label: String,
    #[prop(into)] summary: ViewFn,
    children: ChildrenFn,
) -> impl IntoView {
    let origin = RwSignal::new(None::<Origin>);
    // True while the overlay is at its full-page geometry.
    let expanded = RwSignal::new(false);

    let open = move |ev: leptos::ev::MouseEvent| {
        if origin.get_untracked().is_some() {
            return;
        }
        let Some(el) = ev
            .current_target()
            .and_then(|t| t.dyn_into::<leptos::web_sys::Element>().ok())
        else {
            return;
        };
        let r = el.get_bounding_client_rect();
        origin.set(Some(Origin {
            top: r.top(),
            left: r.left(),
            width: r.width(),
            height: r.height(),
        }));
        // Wait two frames so the collapsed geometry is painted before transitioning.
        request_animation_frame(move || {
            request_animation_frame(move || expanded.set(true));
        });
    };

    let close = move || {
        if !expanded.get_untracked() {
            return;
        }
        expanded.set(false);
        set_timeout(move || origin.set(None), Duration::from_millis(ANIM_MS));
    };

    // Inline `!important` transition: the site-wide `.theme-transition *` rule would override it.
    let overlay_style = move || {
        let transition = format!(
            "transition: top {ms}ms ease, left {ms}ms ease, width {ms}ms ease, height {ms}ms ease, border-radius {ms}ms ease !important;",
            ms = ANIM_MS
        );
        match origin.get() {
            None => String::new(),
            Some(_) if expanded.get() => {
                format!("top:0;left:0;width:100vw;height:100vh;border-radius:0;{transition}")
            }
            Some(o) => format!(
                "top:{}px;left:{}px;width:{}px;height:{}px;border-radius:0.75rem;{transition}",
                o.top, o.left, o.width, o.height
            ),
        }
    };

    view! {
        <button
            type="button"
            on:click=open
            class="text-left rounded-xl p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-2xl border border-zinc-200 dark:border-zinc-700 hover:-translate-y-1 cursor-pointer"
            class=("invisible", move || origin.get().is_some())
        >
            {summary.run()}
        </button>
        {move || {
            origin
                .get()
                .map(|_| {
                    view! {
                        <div
                            class="fixed z-50 overflow-y-auto bg-white dark:bg-zinc-800 shadow-2xl"
                            style=overlay_style
                            role="dialog"
                            aria-modal="true"
                            aria-label=label.clone()
                        >
                            <div
                                class="mx-auto max-w-3xl p-6 sm:p-10 transition-opacity"
                                class=("opacity-0", move || !expanded.get())
                                class=("opacity-100", move || expanded.get())
                            >
                                <button
                                    type="button"
                                    on:click=move |_| close()
                                    class="mb-6 inline-flex items-center rounded border border-teal-600 text-teal-700 px-4 py-2 text-base font-medium dark:border-teal-200 dark:text-teal-200"
                                >
                                    "← Back"
                                </button>
                                {children()}
                            </div>
                        </div>
                    }
                })
        }}
    }
}
