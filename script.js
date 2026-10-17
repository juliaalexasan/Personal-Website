const pageTransitionDuration = 220;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.addEventListener("click", (event) => {
    if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
        || prefersReducedMotion.matches
    ) {
        return;
    }

    const link = event.target.closest("a");
    if (!link || link.target || link.hasAttribute("download")) {
        return;
    }

    const destination = new URL(link.href, window.location.href);
    const isDifferentPage = destination.origin === window.location.origin
        && (destination.pathname !== window.location.pathname
            || destination.search !== window.location.search);

    if (!isDifferentPage) {
        return;
    }

    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => {
        window.location.assign(destination.href);
    }, pageTransitionDuration);
});