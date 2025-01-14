const getURL = chrome.runtime.getURL;

async function accessors() {
    const toggleButtonScript = getURL('accessors/toggle-button.js');
    await import(toggleButtonScript);
}

async function router() {
    const routerScript = getURL('scripts/router.js');
    const optionsScript = getURL('scripts/options.js');
    const historyScript = getURL('scripts/history.js');
    const blackListScript = getURL('scripts/black-list.js');
    const whiteListScript = getURL('scripts/white-list.js');
    const routes = {
        'options': {component: await import(optionsScript), template: '/templates/options.html'},
        'history': {component: await import(historyScript), template: '/templates/history.html'},
        'black-list': {component: await import(blackListScript), template: '/templates/black-list.html'},
        'white-list': {component: await import(whiteListScript), template: '/templates/white-list.html'}
    };
    const {Router} = await import(routerScript);
    new Router(routes, 'options');
}

(async function () {
    await accessors();
    await router();
})();
