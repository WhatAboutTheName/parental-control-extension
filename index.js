import {Options} from "./scripts/options";
import {History} from "./scripts/history";
import {BlackList} from "./scripts/black-list";
import {WhiteList} from "./scripts/white-list";
import {Router} from "./scripts/router";
import {ToggleButton} from "./accessors/toggle-button.js";

function accessors() {
    new ToggleButton();
}

function router() {
    const routes = {
        'options': {component: Options, template: '/templates/options.html'},
        'history': {component: History, template: '/templates/history.html'},
        'black-list': {component: BlackList, template: '/templates/black-list.html'},
        'white-list': {component: WhiteList, template: '/templates/white-list.html'}
    };
    new Router(routes, 'options');
}

(function () {
    accessors();
    router();
})();
