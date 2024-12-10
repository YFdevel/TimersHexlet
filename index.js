const timers = document.querySelector(".timers");
const form = document.querySelector(".create");
const timerItemTemplate = document.querySelector('#timer-template').content.querySelector('.timers__item');

class Timer {
    initial;
    current;
    timerDescriptor;
    isPaused = false;
    pElement;
    stopElement;
    pauseElement;

    constructor(initial) {
        this.initial = initial;
    }

    init() {
        this.current = this.initial;
        return () => {
            this.run();
            return --this.current;
        }
    };

    createTimerNode() {
        const node = timerItemTemplate.cloneNode(true);
        this.pElement = node.querySelector('.timers__num');
        this.pElement.textContent = `${this.initial}`;
        this.pauseElement = node.querySelector(".timers__btn--pause");
        this.stopElement = node.querySelector(".timers__btn--stop");
        return node;
    };

    createList() {
        const li = this.createTimerNode();
        timers.append(li);
        this.pauseElement.addEventListener("click", () => {
            if (!this.isPaused) {
                this.clear();
                this.pauseElement.textContent = "START";
                this.isPaused = true;
            } else {
                this.run();
                this.pauseElement.textContent = "PAUSE";
                this.isPaused = false;
            }
        });
        this.stopElement.addEventListener("click", () => {
            this.remove();
        });
    };

    run() {
        this.timerDescriptor = setInterval(() => {
            this.pElement.textContent = `${--this.current}`;
            if (this.current <= 0) {
                this.remove();
            }
        }, 1000);
    };

    clear() {
        clearInterval(this.timerDescriptor);
    };

    remove() {
        this.clear();
        this.pElement.parentNode.remove();
    };
}

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const initial = Number(formData.get("create"));
    const timer = new Timer(initial);
    timer.createList();
    const startInterval = timer.init();
    startInterval();
    form.reset();
});




