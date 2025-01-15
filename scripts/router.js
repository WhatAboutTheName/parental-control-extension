export class Router {
    static contentElement = document.getElementById('content');
    _prevTarget;
    _defaultRouteName;

    constructor(routes, defaultRouteName) {
        this.addEvents();
        this._routes = routes;
        this._defaultRouteName = defaultRouteName;
        this.locationHandler();
    }

    addEvents() {
        const elements = document.querySelectorAll('[routerLink]');
        this._prevTarget = elements[0];
        elements.forEach((el) => {
            if (el.getAttribute('routerLink') === this._defaultRouteName) {
                this.setStyle(el);
            }
            el.addEventListener('click', (ev) => {
                ev.stopPropagation();
                this.locationHandler(ev.target.getAttribute('routerLink'));
                this.setStyle(ev.target);
            });
        });
    }

    setStyle(target) {
        this._prevTarget?.classList.remove('selected-route');
        this._prevTarget = target;
        this._prevTarget.classList.add('selected-route');
    }

    locationHandler = async (pathname) => {
        const route = this._routes[pathname] || this._routes[this._defaultRouteName];
        new route.component();
        Router.contentElement.innerHTML = await fetch(route.template).then((data) => data.text());
    };
}
