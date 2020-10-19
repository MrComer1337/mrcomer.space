//----------------------------------Sett----------------------------------\\
const info = {
    build: "240920",
    version: 1
}

const dark = "#0a0a0a";
const light = "#fefefe";
const theme_default = "dark";
const debug_default = "0"; //Not true or false because localStorage cannot store boolean values
const language_default = "en-US";
const volume_default =  0.5;

//----------------------------------Core----------------------------------\\
let d = document;
let w = window;
let el = d.getElementById.bind(d);

let debug = {
    enabled: null,
    initializate() {
        this.enabled = localStorage.getItem("debug");
        if ((this.enabled != "0") && (this.enabled != "1")) {
            this.set(debug_default);
        } else {
            this.set(this.enabled);
        }
    },
    set(arg) {
        this.enabled = arg;
        localStorage.setItem("debug", this.enabled);
        debug.log("Set debug to " + arg, "#00c800");
    },
    log(text, color, background) {
        if (this.enabled == "1") {
            console.log("%c "+text+" ", "color: "+color+"; background: "+background);
        }
    }
};

let theme = {
    current: null,
    ignore: ["/ss/","/p/","/dev/tos/","/dev/credits/"],
    initializate() {
        this.current = localStorage.getItem("theme");
        if ((this.current != "dark") && (this.current != "light")) {
            this.set(theme_default);
        } else {
            this.set(this.current);
        }
    },
    set(arg) {
        if (this.ignore.includes(w.location.pathname)) {
            debug.log("Cant set theme, this page in ignore list", "red")
        } else {
            this.current = arg
            switch (arg) {
                case "light":
                    d.documentElement.style.setProperty("--first-color", light);
                    d.documentElement.style.setProperty("--second-color", dark);
                    break;
            
                default:
                    d.documentElement.style.setProperty("--first-color", dark);
                    d.documentElement.style.setProperty("--second-color", light);
                    break;
            }
            localStorage.setItem("theme", this.current);
            debug.log("Set theme to " + arg, "#00c800");
        }
    },
    change() {
        switch (this.current) {
            case "light":
                this.set("dark");      
                break;
        
            default:
                this.set("light");
                break;
        }
    }
};

let show = (element, interval, timeout) => {
    setTimeout(() => {
        let op = 0;
        debug.log("Showing up "+element.id, "#226dc9");
        let timer = setInterval(() => {
            if (op >= 1){
                clearInterval(timer);
                debug.log("Showing up for "+element.id+" complete", "#00c800");
            }
            element.style.setProperty("opacity", op);
            op+=0.01;
        }, interval/100);
    }, timeout)
};

let title = {
    timer(ticks, time, timeout) {
        setTimeout(() => {
            let tick = time/ticks;
            let cur = ticks
            debug.log("Title counter started for "+ticks+" ticks every "+tick+"ms", "#226dc9");
            let timer = setInterval(() => {
                if (cur <= 0) {
                    clearInterval(timer);
                    debug.log("Title counter complete", "#00c800");
                }
                d.title = cur;
                cur--; 
            }, tick)
        },timeout)
    },
    anim(text, time, timeout) {
        setTimeout(() => {
            let tick = time/text.length;
            let cur = 0
            let title = ""
            debug.log("Title animation started for \""+text+"\" every "+tick+"ms", "#226dc9");
            let timer = setInterval (() => { //still hate "for (let v of text) {};"
                if (cur >= text.length-1) {
                    clearInterval(timer);
                    debug.log("Title animation complete", "#00c800");
                }
                title = title + text[cur];
                d.title = title;
                cur++;
            }, tick)
        }, timeout)
    }
};

let start = () => {
    debug.log("Page loaded");
    over = el("overlay"); // Why javascript globals is 
    aud = el("audio"); // too fuckking hard (to understand)
    debug.log("Globals applied");
    if (!(aud.paused)) {debug.log("Music detected, starting main"); main()} else {
        debug.log("Music not detected, creating button");
        d.title = "Click";
        over.innerHTML = "<p>click</p>";
        over.classList.add("clickable");
        over.addEventListener("click", () => {debug.log("Button clicked, starting main"); main()})
    }
};

let main = () => {
    d.title = "Starting";
    over.remove();
    debug.log("Main started, restarting music");
    aud.volume = volume_default;
    aud.load();
    debug.log("Music restarted, starting marquee");
    c3.innerHTML = "<marquee>We're under construction now, follow development on trello</marquee>";
    debug.log("Marquee started, showing up elements");
    title.timer(3, 2000, 0);
    title.anim("Welcome",2200, 3000)
    show(el("c1"), 900, 3500);
    show(el("c2"), 900, 3650);
    show(el("c3"), 900, 3800);
    show(el("c4"), 900, 3950);
    show(el("c5"), 900, 4250);
    debug.log("Showing up started, FINALY")
};

//----------------------------------Main----------------------------------\\
debug.initializate();
debug.log("Build "+info.build+"v"+info.version, "#fff","#000");

//theme.initializate();
w.addEventListener("DOMContentLoaded", () => {
    debug.log("DOM loaded", "#fff","#000");
    switch (w.location.pathname) {
        case "/p/":
            d.title = "Loading";
            el("overlay").innerHTML = "<p>loading</p>";
            w.addEventListener("load", start);
            break;

        default:
            debug.log("Script for this page is not described", "#fff","#000");
            break;
    }
})
