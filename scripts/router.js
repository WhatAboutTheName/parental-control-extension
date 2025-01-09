const routes = {
    "general": "/templates/general.html",
    "history": "/templates/history.html",
};

const locationHandler = async () => {
    const hash = window.location.hash.replace("#", "");
    const route = routes[hash] || routes['general'];
    document.getElementById('content').innerHTML = await fetch(route).then((data) => data.text());
    if (hash !== 'general') {
        const scriptTag = document.getElementsByTagName('script')[0];
        const script = await fetch(scriptTag.src).then((data) => data.text());
        eval(script);
    }
};

window.addEventListener("hashchange", locationHandler);

locationHandler();
