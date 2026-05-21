import menu from './menu';
import createElement from './createElement';
import SiteColorScheme from './site-color-scheme';
import { setupScrollspy } from './scrollspy';
import { setupSmoothAnchors } from './smoothAnchors';
import { setupPaginationJump } from './pagination';
import { setupCodeCopy } from './code-copy';

let SiteShell = {
    init: () => {
        menu();

        const articleContent = document.querySelector('.article-content') as HTMLElement;
        if (articleContent) {
            setupSmoothAnchors();
            setupScrollspy();
            setupCodeCopy();
        }

        setupPaginationJump();

        new SiteColorScheme(document.getElementById('dark-mode-toggle')!);
    }
}

window.addEventListener('load', () => {
    setTimeout(function () {
        SiteShell.init();
    }, 0);
})

declare global {
    interface Window {
        createElement: any;
        SiteShell: any
    }
}

window.SiteShell = SiteShell;
window.createElement = createElement;
