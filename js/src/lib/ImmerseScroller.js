export default class ImmerseScroller {
    constructor(element, start = 0, end = -1) {
        window.requestAnimFrame =  window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame || 
            function( callback ) {
                window.setTimeout(callback, 1000 / 60);
             };
        this.latestKnownScrollY  = 0;
        this.lastScrollY = start;
        this.delta = 5;
        this.ticking = false;
        this.element = element;
        this.start = start;
        this.end = end;
    }

    init() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    onScroll() {
        this.latestKnownScrollY = window.scrollY;
        this.requestTick();
    }

    requestTick() {
        if(!this.ticking) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    }

    update() {
        let currentScrollY = this.latestKnownScrollY;
        let scrollOffset = currentScrollY - this.lastScrollY;
        this.ticking = false;
        const isInRegion = currentScrollY >= this.start  && (this.end == -1 || currentScrollY <= this.end)
        if (!isInRegion || Math.abs(scrollOffset) <= this.delta) {
            return;
        }
        if (scrollOffset < 0) {
            this.element.classList.remove('is-hidden');
            this.element.classList.add('is-inView');
        } else {
            this.element.classList.remove('is-inView');
            this.element.classList.add('is-hidden');
        }
        this.lastScrollY = currentScrollY;
    }
}