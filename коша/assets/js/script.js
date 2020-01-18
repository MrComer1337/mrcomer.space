! function() {
    "use strict";

    function t(e, o) {
        function i(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        var r;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) c[a[s]] = i(c[a[s]], c);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
            }, e.addEventListener = function(t, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t)
                }), o) : i.call(e, t, n, o)
            }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) {
                r(t)
            }, !1), e.onclick = null)
        }
    }
    var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
        n = navigator.userAgent.indexOf("Android") > 0 && !e,
        o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
        i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        r = o && /OS [6-7]_\d/.test(navigator.userAgent),
        a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled) return !0;
                break;
            case "input":
                if (o && "file" === t.type || t.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !n;
            case "input":
                switch (t.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function(t, e) {
        var n, o;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function(t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function(t) {
        var e;
        o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function(t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function(t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function(t) {
        var e, n, r;
        if (t.targetTouches.length > 1) return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
            if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function(t) {
        var e = t.changedTouches[0],
            n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
    }, t.prototype.onTouchMove = function(t) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, t.prototype.findControl = function(t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function(t) {
        var e, a, c, s, u, l = this.targetElement;
        if (!this.trackingClick) return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n) return !1;
                l = e
            }
        } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
        return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
    }, t.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function(t) {
        return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
    }, t.prototype.onClick = function(t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function() {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function(t) {
        var e, o, i, r;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n) return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
    }, t.attach = function(e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();
"use strict";
! function(e, t, a, n, c, s, o) {
    e.GoogleAnalyticsObject = c, e[c] = e[c] || function() {
        (e[c].q = e[c].q || []).push(arguments)
    }, e[c].l = 1 * new Date, s = t.createElement(a), o = t.getElementsByTagName(a)[0], s.async = 1, s.src = n, o.parentNode.insertBefore(s, o)
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-15240703-1"), ga("send", "pageview");
"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var o = t[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }
        return function(t, i, o) {
            return i && e(t.prototype, i), o && e(t, o), t
        }
    }(),
    TWO_COLUMN_GRID_THRESHOLD = 1300,
    ONE_COLUMN_GRID_THRESHOLD = 500,
    Hakim = function() {
        function e() {
            _classCallCheck(this, e), this.config = {
                history: !1,
                scrollEffects: !1,
                imageHost: "production" === window.HE_ENV ? "https://d1835mevib0k1p.cloudfront.net/portfolio/v2/images/" : "/images/"
            }, this.header = new Header, this.setupFocus(), this.setupScrolling(), this.setupHoverEffects(), this.setupVisitedLinks(), this.setupExpandableContent(), Util.isTouchDevice() ? this.setupTouch() : this.setupMouse(), this.bind(), this.layout(), this.show(), FastClick.attach(document.body)
        }
        return _createClass(e, [{
            key: "show",
            value: function() {
                var e = this.readURL();
                window.scrollY < 10 || e ? setTimeout(function() {
                    return document.body.classList.add("ready")
                }, 1) : (document.body.classList.add("skip-intro"), document.body.classList.add("ready"))
            }
        }, {
            key: "bind",
            value: function() {
                this.writeURL = Util.debounce(this.writeURL.bind(this), 100), window.addEventListener("resize", this.layout.bind(this))
            }
        }, {
            key: "layout",
            value: function() {
                this.padGrids()
            }
        }, {
            key: "setupFocus",
            value: function() {
                var e = document.createElement("style");
                document.querySelector("head").appendChild(e);
                var t = function(t) {
                    e.styleSheet ? e.styleSheet.cssText = t : e.innerHTML = t
                };
                document.addEventListener("mousedown", function() {
                    t("a, button, a:after, button:after { outline: none !important; }")
                }, !1), document.addEventListener("keydown", function() {
                    t("")
                }, !1)
            }
        }, {
            key: "setupVisitedLinks",
            value: function() {
                if (!Util.isTouchDevice() && Util.supportsLocalStorage()) {
                    var e;
                    try {
                        e = JSON.parse(localStorage.getItem("he-visit-hash") || "{}")
                    } catch (t) {
                        e = {}
                    }
                    Util.toArray(document.querySelectorAll(".he-text a, a.he-project")).forEach(function(t) {
                        var i = t.getAttribute("href");
                        i.length && "#" !== i && (e[i] && t.classList.add("visited"), t.addEventListener("click", function() {
                            t.classList.add("visited"), e[i] = !0, localStorage.setItem("he-visit-hash", JSON.stringify(e))
                        }, !1))
                    }, this)
                }
            }
        }, {
            key: "setupHoverEffects",
            value: function() {
                var e = this;
                Util.toArray(document.querySelectorAll(".he-text a, .he-expand-trigger")).forEach(function(e) {
                    e.classList.add("he-anchor"), e.innerHTML = '<span class="he-anchor-label">' + e.textContent + '</span><span class="he-anchor-background"></span>'
                }), Util.toArray(document.querySelectorAll(".he-anchor")).forEach(function(t) {
                    e.bindDirectionalHovers(t, ".he-anchor-background")
                }, this), Util.toArray(document.querySelectorAll(".he-project")).forEach(function(t) {
                    e.bindDirectionalHovers(t, "h3, p")
                }, this), Util.toArray(document.querySelectorAll(".he-social-button")).forEach(function(t) {
                    e.bindDirectionalHovers(t, ".he-social-button-background, .he-social-button-label")
                }, this)
            }
        }, {
            key: "setupTouch",
            value: function() {
                var e = this;
                document.body.classList.add("he-touch"), Util.toArray(document.querySelectorAll(".he-text a, a.he-project")).forEach(function(e) {
                    var t = e.getAttribute("href");
                    t.length && "#" !== t && e.removeAttribute("target")
                }), Util.toArray(document.querySelectorAll(".he-project")).forEach(function(t) {
                    var i = document.createElement("div");
                    i.className = "he-project-info-toggle", i.innerHTML = '<div class="icon i-icon"></div><div class="icon x-icon"></div>', t.appendChild(i);
                    var o = document.createElement("div");
                    o.className = "he-project-info-link", o.innerHTML = '<div class="icon link-icon"></div>', t.appendChild(o), t.addEventListener("click", e.onProjectClicked.bind(e), !1)
                }, this)
            }
        }, {
            key: "setupMouse",
            value: function() {
                var e = this;
                document.body.classList.add("he-mouse"), document.addEventListener("mousemove", function(t) {
                    if (e.lastMouseX && e.lastMouseY) {
                        var i = t.pageX - e.lastMouseX,
                            o = t.pageY - e.lastMouseY,
                            n = Math.max(Math.abs(i), Math.abs(o)),
                            a = i / n,
                            r = o / n;
                        e.pointerDirectionX = a, e.pointerDirectionY = r
                    }
                    e.lastMouseX = t.pageX, e.lastMouseY = t.pageY, e.lastScreenX = t.screenX, e.lastScreenY = t.screenY
                }.bind(this)), document.addEventListener("scroll", Util.throttle(function(t) {
                    e.lastMouseX = null, e.lastMouseY = null, e.pointerDirectionX = 0, e.pointerDirectionY = 0
                }, 50))
            }
        }, {
            key: "setupScrolling",
            value: function() {
                this.config.scrollEffects && Util.toArray(document.querySelectorAll(".he-project")).forEach(function(e) {
                    e.classList.add("he-scrollable")
                }), this.cacheScrollElements(), this.checkScrolling(), window.addEventListener("scroll", Util.throttle(this.checkScrolling.bind(this), 50)), window.addEventListener("resize", Util.throttle(this.checkScrolling.bind(this), 50))
            }
        }, {
            key: "setupExpandableContent",
            value: function() {
                Util.toArray(document.querySelectorAll(".he-expand")).forEach(function(e) {
                    e.addEventListener("click", function() {
                        if (e.hasAttribute("data-expand-target-id")) {
                            var t = document.getElementById(e.getAttribute("data-expand-target-id"));
                            t && (t.classList.add("expanded"), setTimeout(function() {
                                return t.classList.add("animate")
                            }, 10))
                        } else e.querySelector(".he-expand-target").style.minHeight = e.offsetHeight + "px", setTimeout(function() {
                            return e.classList.add("animate")
                        }, 10);
                        e.classList.add("expanded")
                    }, !1)
                })
            }
        }, {
            key: "cacheScrollElements",
            value: function() {
                this.sectionElements = Util.toArray(document.querySelectorAll("[data-section-id]")), this.scrollableElements = Util.toArray(document.querySelectorAll(".he-scrollable"))
            }
        }, {
            key: "checkScrolling",
            value: function() {
                var e = this;
                this.updateURL(), this.config.scrollEffects && this.scrollableElements.forEach(function(e) {
                    var t = Util.getViewPortRelation(e, 60);
                    e.classList.toggle("past", t.isAbove), e.classList.toggle("future", t.isBelow)
                });
                var t = document.querySelectorAll("[data-src]");
                t.length && Util.toArray(t).forEach(function(t) {
                    var i = Util.getViewPortRelation(t, .5 * -window.innerHeight);
                    if (!i.isAbove && !i.isBelow) {
                        t.addEventListener("load", function(e) {
                            return t.classList.add("loaded")
                        }), t.setAttribute("src", e.config.imageHost + t.getAttribute("data-src")), t.removeAttribute("data-src");
                        var o = document.createElement("div");
                        o.className = "he-project-image-loader", t.parentNode.appendChild(o)
                    }
                })
            }
        }, {
            key: "padGrids",
            value: function() {
                var e = this,
                    t = 3;
                window.innerWidth < TWO_COLUMN_GRID_THRESHOLD && (t = 2), window.innerWidth < ONE_COLUMN_GRID_THRESHOLD && (t = 1), t > 1 && t !== this.paddedColumns && (this.paddedColumns = t, Util.toArray(document.querySelectorAll(".he-grid")).forEach(function(i) {
                    Util.toArray(i.querySelectorAll(".he-project-placeholder")).forEach(function(e) {
                        return i.removeChild(e)
                    });
                    var o = t - i.querySelectorAll(".he-project").length % t;
                    if (o > 0 && t > o) {
                        for (; o-- > 0;) {
                            var n = document.createElement("div");
                            n.className = "he-project he-project-placeholder", n.innerHTML = '<div class="he-project-image-wrapper"></div>', i.appendChild(n)
                        }
                        e.cacheScrollElements()
                    }
                }))
            }
        }, {
            key: "bindDirectionalHovers",
            value: function(e, t) {
                var i = this,
                    o = Util.toArray(e.querySelectorAll(t));
                e.addEventListener("mouseenter", function(t) {
                    o.forEach(function(e) {
                        e.classList.add("no-transition"), Util.translate(e, -15 * i.pointerDirectionX, -15 * i.pointerDirectionY)
                    }, i), setTimeout(function() {
                        e.classList.add("hover"), o.forEach(function(e) {
                            e.classList.remove("no-transition"), Util.translate(e, 0, 0)
                        }, i)
                    }.bind(i), 1)
                }.bind(this), !1), e.addEventListener("mouseleave", function(t) {
                    e.classList.remove("hover"), o.forEach(function(e) {
                        Util.translate(e, 15 * i.pointerDirectionX, 15 * i.pointerDirectionY)
                    }, i)
                }.bind(this), !1)
            }
        }, {
            key: "updateURL",
            value: function() {
                if (this.config.history) {
                    var e, t = Number.MAX_VALUE;
                    this.sectionElements.forEach(function(i) {
                        var o = i.getBoundingClientRect(),
                            n = Math.abs(o.top);
                        t > n && o.top < window.innerHeight && (t = n, e = i)
                    }), e && e.hasAttribute("data-section-id") && this.writeURL(e.getAttribute("data-section-id"))
                }
            }
        }, {
            key: "getURLAnchorID",
            value: function() {
                return document.location.pathname.replace(/\//gi, "")
            }
        }, {
            key: "readURL",
            value: function() {
                if (this.config.history) {
                    this.hasReadURL = !0; {
                        var e = this.getURLAnchorID(),
                            t = document.querySelector('[data-section-id="' + e + '"]');
                        document.querySelector('[data-project-id="' + e + '"]')
                    }
                    if ("" !== e && t) return window.scroll(0, t.offsetTop - 100), !0
                }
            }
        }, {
            key: "writeURL",
            value: function(e) {
                this.config.history && this.hasReadURL && document.location.pathname !== "/" + e && window.history.replaceState({}, "", "/" + e)
            }
        }, {
            key: "toggleProjectInfo",
            value: function(e, t) {
                var i = !e.classList.contains("show-info");
                "boolean" == typeof t && (i = t), i ? (e.classList.add("show-info"), e.classList.remove("hide-info")) : (e.classList.remove("show-info"), e.classList.add("hide-info"))
            }
        }, {
            key: "onProjectClicked",
            value: function(e) {
                var t = this;
                if (e.target.classList.contains("he-project-info-toggle")) {
                    e.preventDefault();
                    var i = e.currentTarget;
                    this.toggleProjectInfo(i), e.target.classList.remove("push"), setTimeout(function() {
                        return e.target.classList.add("push")
                    }, 10), Util.toArray(document.querySelectorAll(".he-project.show-info")).forEach(function(e) {
                        e !== i && t.toggleProjectInfo(e, !1)
                    })
                }
            }
        }]), e
    }();
"use strict";

function _classCallCheck(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function t(t, i) {
            for (var e = 0; e < i.length; e++) {
                var a = i[e];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
            }
        }
        return function(i, e, a) {
            return e && t(i.prototype, e), a && t(i, a), i
        }
    }(),
    Header = function() {
        function t() {
            _classCallCheck(this, t), this.domElement = document.querySelector(".he-header"), this.paint = this.paint.bind(this), this.layout = this.layout.bind(this), this.canvas = document.querySelector(".he-header-canvas"), this.canvas && (this.context = this.canvas.getContext("2d"), this.time = .5, this.layout(), this.paint(), window.addEventListener("resize", this.layout))
        }
        return _createClass(t, [{
            key: "paint",
            value: function() {
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight), this.context.fillStyle = "#000", this.time += .1;
                for (var t = .13 * Math.min(this.canvasWidth, this.canvasHeight), i = t / 2; i < this.canvasWidth; i += t)
                    for (var e = t / 2; e < this.canvasHeight; e += t) {
                        var a = i + 5 * Math.cos(this.time / 4 + (i + e) / 20),
                            s = e + 5 * Math.sin(this.time / 4 + (i + e) / 20);
                        this.context.fillRect(a, s, 1, 1)
                    }
                window.requestAnimationFrame(this.paint)
            }
        }, {
            key: "layout",
            value: function() {
                this.canvasWidth = .2 * this.domElement.offsetWidth, this.canvasHeight = .2 * this.domElement.offsetHeight, this.canvas.width = this.canvasWidth, this.canvas.height = this.canvasHeight
            }
        }]), t
    }();
"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    Util = function() {
        function e() {
            _classCallCheck(this, e)
        }
        return _createClass(e, null, [{
            key: "isTouchDevice",
            value: function() {
                return /ipad|iphone|ipod|android|windows\sphone/gi.test(navigator.userAgent)
            }
        }, {
            key: "supportsLocalStorage",
            value: function() {
                var e = "he";
                try {
                    return localStorage.setItem(e, e), localStorage.removeItem(e), !0
                } catch (t) {
                    return !1
                }
            }
        }, {
            key: "toArray",
            value: function(e) {
                return Array.prototype.slice.call(e)
            }
        }, {
            key: "getViewPortRelation",
            value: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
                    n = e.getBoundingClientRect();
                return {
                    isAbove: n.bottom - t < 0,
                    isBelow: n.top + t > window.innerHeight
                }
            }
        }, {
            key: "translate",
            value: function(e, t, n) {
                e.style.webkitTransform = "translate(" + t + "px," + n + "px)", e.style.msProperty = "translate(" + t + "px," + n + "px)", e.style.transform = "translate(" + t + "px," + n + "px)"
            }
        }, {
            key: "wrapWords",
            value: function(e, t, n) {
                e.innerHTML = t + e.innerHTML.replace(/\s(?=[^[\>]*(\<|$))/g, n + " " + t) + n
            }
        }, {
            key: "typewriter",
            value: function(e, t) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2],
                    r = arguments.length <= 3 || void 0 === arguments[3] ? 10 : arguments[3];
                t = t.split("");
                var a = "",
                    o = setInterval(function() {
                        a += t.splice(0, n).join(""), e.innerHTML = a, 0 === t.length && clearInterval(o)
                    }, r)
            }
        }, {
            key: "debounce",
            value: function(e, t) {
                var n = null;
                return function() {
                    var r = this,
                        a = arguments;
                    clearTimeout(n), n = setTimeout(function() {
                        e.apply(r, a)
                    }, t)
                }
            }
        }, {
            key: "throttle",
            value: function(e, t, n) {
                t || (t = 250);
                var r, a;
                return function() {
                    var o = n || this,
                        u = +new Date,
                        i = arguments;
                    r && r + t > u ? (clearTimeout(a), a = setTimeout(function() {
                        r = u, e.apply(o, i)
                    }, t)) : (r = u, e.apply(o, i))
                }
            }
        }]), e
    }();
"use strict";
new Hakim;