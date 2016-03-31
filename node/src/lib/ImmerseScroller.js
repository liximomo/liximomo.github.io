export default class ImmerseScroller {
    constructor() {
        window.requestAnimFrame =  window.requestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame || 
            function( callback ) {
                window.setTimeout(callback, 1000 / 60);
             };
        this.hooks  = [];
    }

    init() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    register(anims) {
        this.hooks.concat(anims);
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
        const isInRegion = currentScrollY >= this.start  && (this.end < 0 || currentScrollY <= (this.end - window.innerHeight) )
        if (Math.abs(scrollOffset) <= this.delta) {
            return;
        }

        if (isInRegion) {
            this.element.classList.add(this.inClass);
        } else {
            this.element.classList.remove(this.inClass);
        }

        if (scrollOffset < 0) {
            this.element.classList.remove(this.downClass);
            this.element.classList.add(this.upClass);
        } else {
            this.element.classList.remove(this.upClass);
            this.element.classList.add(this.downClass);
        }
        this.lastScrollY = currentScrollY;
    }
}