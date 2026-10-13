use leptos::prelude::*;

use leptos_use::{
    use_color_mode_with_options, use_cookie_with_options, use_preferred_dark,
    ColorMode, UseColorModeOptions, UseColorModeReturn, UseCookieOptions,
};
/// Renders the home page of your application.
#[component]
pub fn HomePage() -> impl IntoView {
    let UseColorModeReturn { mode, set_mode, .. } =
        use_color_mode_with_options(UseColorModeOptions::default().cookie_enabled(true));

    let is_dark_preferred = use_preferred_dark();

    view! {
        <h1>Leptos-Use SSR Example</h1>
        <p>Color mode: {move || format!("{:?}", mode.get())}</p>
        <button on:click=move |_| set_mode.set(ColorMode::Light)>Change to Light</button>
        <button on:click=move |_| set_mode.set(ColorMode::Dark)>Change to Dark</button>
        <button on:click=move |_| set_mode.set(ColorMode::Auto)>Change to Auto</button>
        <p>Dark preferred: {is_dark_preferred}</p>
    }
}