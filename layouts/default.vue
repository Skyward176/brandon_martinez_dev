<template>
    <div class="page-wrapper">
        <Navbar />
        <div>
            <slot />
        </div>
        <div>
            <ul>
                <li class="footer_item">
                    <a href="/">Home</a>
                </li>
                <li class="footer_item">
                    <p class="accent-color">|</p>
                </li>
                <li class="footer_item">
                    <a href="/projects">Projects</a>
                </li>
                <li class="footer_item">
                    <p><span class="accent-color">|</span> Find me:</p>
                </li>
                <li class="footer_item">
                    <p>
                        &nbsp;<a href="https://github.com/Skyward176">
                            Github
                        </a>
                    </p>
                </li>
                <li class="footer_item">
                    <p>
                        &nbsp;<a href="mailto:contact@brandonmartinez.dev">
                            eMail
                        </a>
                    </p>
                </li>
                <li class="footer_item">
                    <p>&nbsp;<a href="tel:+17328102978"> Phone</a></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style>
.page-wrapper {
    display: flex;
    min-height: 100vh;
}
.name {
    font-size: 2rem;
    padding: 0;
    margin: auto auto auto auto;
}
.accent-color {
    color: #5cb4c4;
}
.navbar-items {
    font-size: 1.25rem;
    float: right;
    display: block;
}
.navy-background {
    background-color: #001529;
}
.footer {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    color: #9cadb4;
}
.footer li {
    float: left;
}

.footer a {
    padding: 8px;
    font-size: 1.5 rem;
    color: inherit;
}
.footer a:hover {
    text-decoration: none;
    color: inherit;
}

.footer ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.footer_item {
    color: #9cadb4;
    font-size: 1.5 rem;
}
.footer div {
    display: flex;
    align-items: middle;
    justify-content: center;
}
.contact-text {
    color: #9cadb4;
}
</style>
