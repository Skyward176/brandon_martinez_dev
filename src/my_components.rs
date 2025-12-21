use leptos::*;
#[component]
pub fn Nav() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
      <p>"Hello from a component!"</p>
    }
}
