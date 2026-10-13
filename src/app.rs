use codee::string::FromToStringCodec;
use leptos::ev::{keypress, KeyboardEvent};
use leptos::prelude::*;
use leptos_meta::*;
use leptos_router::components::*;
use leptos_router::path;
use leptos_use::storage::{use_local_storage, use_local_storage_with_options, UseStorageOptions};
use leptos_use::{
    use_color_mode_with_options, use_cookie_with_options, use_preferred_dark,
    ColorMode, UseColorModeOptions, UseColorModeReturn, UseCookieOptions,
};
use crate::pages::HomePage;
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
                <link rel="stylesheet" id="leptos" href="/pkg/leptos_use_ssr.css" />
            </head>
            <body>
                <App />
            </body>
        </html>
    }
}

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/start-axum.css" />

        <Title text="Leptos-Use SSR Example" />

        <Router>
            <main>
                <Routes fallback=|| "This page could not be found.">
                    <Route path=path!("") view=|| view! { <HomePage /> } />
                </Routes>
            </main>
        </Router>
    }
}

#[server]
pub async fn set_a_cookie() -> Result<(), ServerFnError> {
    let cookie_name = "test_cookie";
    let cookie_value = "test_value";

    let (cookie, set_cookie) = leptos_use::use_cookie::<String, FromToStringCodec>("bla-cookie");

    set_cookie.set(Some("something not so important".to_string()));

    Ok(())
}