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

        this.latestKnownScrollY = 0;
        this.ticking = false;
    }

    init() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    register(anims) {
        let animsArray = [].concat(anims);
        this.hooks = this.hooks.concat(animsArray);
        animsArray.forEach(anim => anim.lastScrollY = window.scrollY);
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
        this.ticking = false;

        this.hooks.forEach(anim => {
            let scrollOffset = currentScrollY - anim.lastScrollY;
            if(anim.animate(currentScrollY, scrollOffset)) {
                anim.lastScrollY = currentScrollY;
            }
        });

        
        // const isInRegion = currentScrollY >= this.start  && (this.end < 0 || currentScrollY <= (this.end - window.innerHeight) )
        // if (Math.abs(scrollOffset) <= this.delta) {
        //     return;
        // }

        // if (isInRegion) {
        //     this.element.classList.add(this.inClass);
        // } else {
        //     this.element.classList.remove(this.inClass);
        // }

        // if (scrollOffset < 0) {
        //     this.element.classList.remove(this.downClass);
        //     this.element.classList.add(this.upClass);
        // } else {
        //     this.element.classList.remove(this.upClass);
        //     this.element.classList.add(this.downClass);
        // }
    }
}

ImmerseScroller.createScroller = () => {
    const instance = ImmerseScroller._instance 
        ? ImmerseScroller._instance 
        : new ImmerseScroller();
    return instance;
}