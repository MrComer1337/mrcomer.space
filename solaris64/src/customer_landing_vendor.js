function sendRequest(e, t, i, n, a, r, s) {
    void 0 === r && (r = !0), clearFields(), $(n).html("");
    try {
        ["POST", "post", "DELETE", "delete", "PUT", "put"].indexOf(t) >= 0 && window.token && !i._token && (Array.isArray(i) ? i.push({
            name: "_token",
            value: window.token
        }) : i._token = window.token)
    } catch (e) {
        console.warn(e)
    }
    $.ajax({
        url: e,
        type: t,
        data: i,
        success: function(e) {
            preloader(!1, n, s), void 0 !== e.operation_status && "success" == e.operation_status.status ? (viewSuccessResult(e.operation_status.message, n), a(e), hideConfirmPopup(s, !0, n)) : (viewErrorResult(e, n), hideConfirmPopup(s, !1, n))
        },
        error: function(e, t, i) {
            preloader(!1, n, s), viewErrorResult(e.responseJSON, n), viewErrors(e.responseJSON), hideConfirmPopup(s, !1, n)
        },
        fail: function() {
            preloader(!1, n, s), viewError(n, i18next.t("common.server_error")), hideConfirmPopup(s, !1, n)
        },
        beforeSend: function(e) {
            this.beforeSendHeaders && this.beforeSendHeaders(e), r && preloader(!0, n, s)
        }
    })
}

function viewErrors(e) {
    var t = e.errors || e.validation_errors;
    $.each(t, function(e, t) {
        $("[name='" + e + "']").parents(".form-item-container").addClass("field-error"), $("[name='" + e + "']").parents(".form-item-container").children(".errorText").show().html("<p>" + t[0] + "</p>")
    })
}

function viewSuccessResult(e, t) {
    viewSuccess(t, e)
}

function viewErrorResult(e, t) {
    if (!e.validation_errors) {
        var i = "";
        void 0 !== e.operation_status && "error" == e.operation_status.status && (i = e.operation_status.message + "<br>"), $.each(e.errors, function(e, t) {
            i += t + "<br>"
        }), "" == i && (i = i18next.t("common.server_error")), viewError(t, i)
    }
}

function clearFields() {
    $(".errorText").html(""), $(".field-error").removeClass("field-error")
}

function viewError(e, t) {
    $(e).html('<div class="alert alert-danger">' + t + "</div>")
}

function viewSuccess(e, t) {
    $(e).html('<div class="alert alert-success">' + t + "</div>")
}! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, i, n, a, r, s, o = "Close",
        d = "BeforeClose",
        u = "MarkupParse",
        l = "Open",
        c = "Change",
        _ = "mfp",
        m = "." + _,
        h = "mfp-ready",
        p = "mfp-removing",
        f = "mfp-prevent-close",
        g = function() {},
        y = !!window.jQuery,
        M = e(window),
        v = function(e, i) {
            t.ev.on(_ + e + m, i)
        },
        L = function(t, i, n, a) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, n && (r.innerHTML = n), a ? i && i.appendChild(r) : (r = e(r), i && r.appendTo(i)), r
        },
        w = function(i, n) {
            t.ev.triggerHandler(_ + i, n), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]))
        },
        b = function(i) {
            return i === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = i), t.currTemplate.closeBtn
        },
        k = function() {
            e.magnificPopup.instance || ((t = new g).init(), e.magnificPopup.instance = t)
        };
    g.prototype = {
        constructor: g,
        init: function() {
            var i = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = function() {
                var e = document.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition) return !0;
                for (; t.length;)
                    if (t.pop() + "Transition" in e) return !0;
                return !1
            }(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = e(document), t.popupsCache = {}
        },
        open: function(i) {
            var a;
            if (!1 === i.isObj) {
                t.items = i.items.toArray(), t.index = 0;
                var s, o = i.items;
                for (a = 0; a < o.length; a++)
                    if ((s = o[a]).parsed && (s = s.el[0]), s === i.el[0]) {
                        t.index = a;
                        break
                    }
            } else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
            if (!t.isOpen) {
                t.types = [], r = "", i.mainEl && i.mainEl.length ? t.ev = i.mainEl.eq(0) : t.ev = n, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = L("bg").on("click" + m, function() {
                    t.close()
                }), t.wrap = L("wrap").attr("tabindex", -1).on("click" + m, function(e) {
                    t._checkIfClose(e.target) && t.close()
                }), t.container = L("container", t.wrap)), t.contentContainer = L("content"), t.st.preloader && (t.preloader = L("preloader", t.container, t.st.tLoading));
                var d = e.magnificPopup.modules;
                for (a = 0; a < d.length; a++) {
                    var c = d[a];
                    c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
                }
                w("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (v(u, function(e, t, i, n) {
                    i.close_replaceWith = b(n.type)
                }), r += " mfp-close-btn-in") : t.wrap.append(b())), t.st.alignTop && (r += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                }) : t.wrap.css({
                    top: M.scrollTop(),
                    position: "absolute"
                }), (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                    height: n.height(),
                    position: "absolute"
                }), t.st.enableEscapeKey && n.on("keyup" + m, function(e) {
                    27 === e.keyCode && t.close()
                }), M.on("resize" + m, function() {
                    t.updateSize()
                }), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
                var _ = t.wH = M.height(),
                    p = {};
                if (t.fixedContentPos && t._hasScrollBar(_)) {
                    var f = t._getScrollbarSize();
                    f && (p.marginRight = f)
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : p.overflow = "hidden");
                var g = t.st.mainClass;
                return t.isIE7 && (g += " mfp-ie7"), g && t._addClassToMFP(g), t.updateItemHTML(), w("BuildControls"), e("html").css(p), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                    t.content ? (t._addClassToMFP(h), t._setFocus()) : t.bgOverlay.addClass(h), n.on("focusin" + m, t._onFocusIn)
                }, 16), t.isOpen = !0, t.updateSize(_), w(l), i
            }
            t.updateItemHTML()
        },
        close: function() {
            t.isOpen && (w(d), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(p), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            w(o);
            var i = p + " " + h + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
                var a = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : a.overflow = "", e("html").css(a)
            }
            n.off("keyup.mfp focusin" + m), t.ev.off(m), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, w("AfterClose")
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * i;
                t.wrap.css("height", n), t.wH = n
            } else t.wH = e || M.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), w("Resize")
        },
        updateItemHTML: function() {
            var i = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
            var n = i.type;
            if (w("BeforeChange", [t.currItem ? t.currItem.type : "", n]), t.currItem = i, !t.currTemplate[n]) {
                var r = !!t.st[n] && t.st[n].markup;
                w("FirstMarkupParse", r), t.currTemplate[n] = !r || e(r)
            }
            a && a !== i.type && t.container.removeClass("mfp-" + a + "-holder");
            var s = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, t.currTemplate[n]);
            t.appendContent(s, n), i.preloaded = !0, w(c, i), a = i.type, t.container.prepend(t.contentContainer), w("AfterChange")
        },
        appendContent: function(e, i) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[i] ? t.content.find(".mfp-close").length || t.content.append(b()) : t.content = e : t.content = "", w("BeforeAppend"), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(i) {
            var n, a = t.items[i];
            if (a.tagName ? a = {
                    el: e(a)
                } : (n = a.type, a = {
                    data: a,
                    src: a.src
                }), a.el) {
                for (var r = t.types, s = 0; s < r.length; s++)
                    if (a.el.hasClass("mfp-" + r[s])) {
                        n = r[s];
                        break
                    }
                a.src = a.el.attr("data-mfp-src"), a.src || (a.src = a.el.attr("href"))
            }
            return a.type = n || t.st.type || "inline", a.index = i, a.parsed = !0, t.items[i] = a, w("ElementParse", a), t.items[i]
        },
        addGroup: function(e, i) {
            var n = function(n) {
                n.mfpEl = this, t._openClick(n, e, i)
            };
            i || (i = {});
            var a = "click.magnificPopup";
            i.mainEl = e, i.items ? (i.isObj = !0, e.off(a).on(a, n)) : (i.isObj = !1, i.delegate ? e.off(a).on(a, i.delegate, n) : (i.items = e, e.off(a).on(a, n)))
        },
        _openClick: function(i, n, a) {
            if ((void 0 !== a.midClick ? a.midClick : e.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var r = void 0 !== a.disableOn ? a.disableOn : e.magnificPopup.defaults.disableOn;
                if (r)
                    if (e.isFunction(r)) {
                        if (!r.call(t)) return !0
                    } else if (M.width() < r) return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), a.el = e(i.mfpEl), a.delegate && (a.items = n.find(a.delegate)), t.open(a)
            }
        },
        updateStatus: function(e, n) {
            if (t.preloader) {
                i !== e && t.container.removeClass("mfp-s-" + i), n || "loading" !== e || (n = t.st.tLoading);
                var a = {
                    status: e,
                    text: n
                };
                w("UpdateStatus", a), e = a.status, n = a.text, t.preloader.html(n), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), i = e
            }
        },
        _checkIfClose: function(i) {
            if (!e(i).hasClass(f)) {
                var n = t.st.closeOnContentClick,
                    a = t.st.closeOnBgClick;
                if (n && a) return !0;
                if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                if (i === t.content[0] || e.contains(t.content[0], i)) {
                    if (n) return !0
                } else if (a && e.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? n.height() : document.body.scrollHeight) > (e || M.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(i) {
            return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, i, n) {
            var a;
            n.data && (i = e.extend(n.data, i)), w(u, [t, i, n]), e.each(i, function(i, n) {
                if (void 0 === n || !1 === n) return !0;
                if ((a = i.split("_")).length > 1) {
                    var r = t.find(m + "-" + a[0]);
                    if (r.length > 0) {
                        var s = a[1];
                        "replaceWith" === s ? r[0] !== n[0] && r.replaceWith(n) : "img" === s ? r.is("img") ? r.attr("src", n) : r.replaceWith(e("<img>").attr("src", n).attr("class", r.attr("class"))) : r.attr(a[1], n)
                    }
                } else t.find(m + "-" + i).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: g.prototype,
        modules: [],
        open: function(t, i) {
            return k(), (t = t ? e.extend(!0, {}, t) : {}).isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, i) {
            i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function(i) {
        k();
        var n = e(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var a, r = y ? n.data("magnificPopup") : n[0].magnificPopup,
                    s = parseInt(arguments[1], 10) || 0;
                r.items ? a = r.items[s] : (a = n, r.delegate && (a = a.find(r.delegate)), a = a.eq(s)), t._openClick({
                    mfpEl: a
                }, n, r)
            } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
        else i = e.extend(!0, {}, i), y ? n.data("magnificPopup", i) : n[0].magnificPopup = i, t.addGroup(n, i);
        return n
    };
    var Y, T, D, A = "inline",
        S = function() {
            D && (T.after(D.addClass(Y)).detach(), D = null)
        };
    e.magnificPopup.registerModule(A, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(A), v(o + "." + A, function() {
                    S()
                })
            },
            getInline: function(i, n) {
                if (S(), i.src) {
                    var a = t.st.inline,
                        r = e(i.src);
                    if (r.length) {
                        var s = r[0].parentNode;
                        s && s.tagName && (T || (Y = a.hiddenClass, T = L(Y), Y = "mfp-" + Y), D = r.after(T).detach().removeClass(Y)), t.updateStatus("ready")
                    } else t.updateStatus("error", a.tNotFound), r = e("<div>");
                    return i.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(n, {}, i), n
            }
        }
    });
    var x, E = "ajax",
        H = function() {
            x && e(document.body).removeClass(x)
        },
        O = function() {
            H(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(E, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(E), x = t.st.ajax.cursor, v(o + "." + E, O), v("BeforeChange." + E, O)
            },
            getAjax: function(i) {
                x && e(document.body).addClass(x), t.updateStatus("loading");
                var n = e.extend({
                    url: i.src,
                    success: function(n, a, r) {
                        var s = {
                            data: n,
                            xhr: r
                        };
                        w("ParseAjax", s), t.appendContent(e(s.data), E), i.finished = !0, H(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(h)
                        }, 16), t.updateStatus("ready"), w("AjaxContentAdded")
                    },
                    error: function() {
                        H(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(n), ""
            }
        }
    });
    var C, P = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = t.st.image.titleSrc;
        if (n) {
            if (e.isFunction(n)) return n.call(t, i);
            if (i.el) return i.el.attr(n) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = t.st.image,
                    n = ".image";
                t.types.push("image"), v(l + n, function() {
                    "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                }), v(o + n, function() {
                    i.cursor && e(document.body).removeClass(i.cursor), M.off("resize" + m)
                }), v("Resize" + n, t.resizeImage), t.isLowIE && v("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var i = 0;
                    t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, C && clearInterval(C), e.isCheckingImgSize = !1, w("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var i = 0,
                    n = e.img[0],
                    a = function(r) {
                        C && clearInterval(C), C = setInterval(function() {
                            return n.naturalWidth > 0 ? void t._onImageHasSize(e) : (i > 200 && clearInterval(C), void(3 === ++i ? a(10) : 40 === i ? a(50) : 100 === i && a(500)))
                        }, r)
                    };
                a(1)
            },
            getImage: function(i, n) {
                var a = 0,
                    r = function() {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, w("ImageLoadComplete")) : 200 > ++a ? setTimeout(r, 100) : s())
                    },
                    s = function() {
                        i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", o.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    o = t.st.image,
                    d = n.find(".mfp-img");
                if (d.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img", i.el && i.el.find("img").length && (u.alt = i.el.find("img").attr("alt")), i.img = e(u).on("load.mfploader", r).on("error.mfploader", s), u.src = i.src, d.is("img") && (i.img = i.img.clone()), (u = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : u.width || (i.hasSize = !1)
                }
                return t._parseMarkup(n, {
                    title: P(i),
                    img_replaceWith: i.img
                }, i), t.resizeImage(), i.hasSize ? (C && clearInterval(C), i.loadError ? (n.addClass("mfp-loading"), t.updateStatus("error", o.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), t.updateStatus("ready")), n) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), t.findImageSize(i)), n)
            }
        }
    });
    var z;
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, i = t.st.zoom,
                    n = ".zoom";
                if (i.enabled && t.supportsTransition) {
                    var a, r, s = i.duration,
                        u = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + i.duration / 1e3 + "s " + i.easing,
                                a = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return a["-webkit-" + r] = a["-moz-" + r] = a["-o-" + r] = a[r] = n, t.css(a), t
                        },
                        l = function() {
                            t.content.css("visibility", "visible")
                        };
                    v("BuildControls" + n, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(a), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom())) return void l();
                            (r = u(e)).css(t._getOffset()), t.wrap.append(r), a = setTimeout(function() {
                                r.css(t._getOffset(!0)), a = setTimeout(function() {
                                    l(), setTimeout(function() {
                                        r.remove(), e = r = null, w("ZoomAnimationEnded")
                                    }, 16)
                                }, s)
                            }, 16)
                        }
                    }), v(d + n, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(a), t.st.removalDelay = s, !e) {
                                if (!(e = t._getItemToZoom())) return;
                                r = u(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), v(o + n, function() {
                        t._allowZoom() && (l(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return !!t.currItem.hasSize && t.currItem.img
            },
            _getOffset: function(i) {
                var n, a = (n = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                    r = parseInt(n.css("padding-top"), 10),
                    s = parseInt(n.css("padding-bottom"), 10);
                a.top -= e(window).scrollTop() - r;
                var o = {
                    width: n.width(),
                    height: (y ? n.innerHeight() : n[0].offsetHeight) - s - r
                };
                return void 0 === z && (z = void 0 !== document.createElement("p").style.MozTransform), z ? o["-moz-transform"] = o.transform = "translate(" + a.left + "px," + a.top + "px)" : (o.left = a.left, o.top = a.top), o
            }
        }
    });
    var j = "iframe",
        R = function(e) {
            if (t.currTemplate[j]) {
                var i = t.currTemplate[j].find("iframe");
                i.length && (e || (i[0].src = "//about:blank"), t.isIE8 && i.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(j, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(j), v("BeforeChange", function(e, t, i) {
                    t !== i && (t === j ? R() : i === j && R(!0))
                }), v(o + "." + j, function() {
                    R()
                })
            },
            getIframe: function(i, n) {
                var a = i.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() {
                    return a.indexOf(this.index) > -1 ? (this.id && (a = "string" == typeof this.id ? a.substr(a.lastIndexOf(this.id) + this.id.length, a.length) : this.id.call(this, a)), a = this.src.replace("%id%", a), !1) : void 0
                });
                var s = {};
                return r.srcAction && (s[r.srcAction] = a), t._parseMarkup(n, s, i), t.updateStatus("ready"), n
            }
        }
    });
    var I = function(e) {
            var i = t.items.length;
            return e > i - 1 ? e - i : 0 > e ? i + e : e
        },
        F = function(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = t.st.gallery,
                    a = ".mfp-gallery";
                return t.direction = !0, !(!i || !i.enabled) && (r += " mfp-gallery", v(l + a, function() {
                    i.navigateByImgClick && t.wrap.on("click" + a, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), n.on("keydown" + a, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), v("UpdateStatus" + a, function(e, i) {
                    i.text && (i.text = F(i.text, t.currItem.index, t.items.length))
                }), v(u + a, function(e, n, a, r) {
                    var s = t.items.length;
                    a.counter = s > 1 ? F(i.tCounter, r.index, s) : ""
                }), v("BuildControls" + a, function() {
                    if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                        var n = i.arrowMarkup,
                            a = t.arrowLeft = e(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(f),
                            r = t.arrowRight = e(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(f);
                        a.click(function() {
                            t.prev()
                        }), r.click(function() {
                            t.next()
                        }), t.container.append(a.add(r))
                    }
                }), v(c + a, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), void v(o + a, function() {
                    n.off(a), t.wrap.off("click" + a), t.arrowRight = t.arrowLeft = null
                }))
            },
            next: function() {
                t.direction = !0, t.index = I(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = I(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, i = t.st.gallery.preload,
                    n = Math.min(i[0], t.items.length),
                    a = Math.min(i[1], t.items.length);
                for (e = 1; e <= (t.direction ? a : n); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? n : a); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(i) {
                if (i = I(i), !t.items[i].preloaded) {
                    var n = t.items[i];
                    n.parsed || (n = t.parseEl(i)), w("LazyLoad", n), "image" === n.type && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        n.hasSize = !0
                    }).on("error.mfploader", function() {
                        n.hasSize = !0, n.loadError = !0, w("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var $ = "retina";
    e.magnificPopup.registerModule($, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        i = e.ratio;
                    (i = isNaN(i) ? i() : i) > 1 && (v("ImageHasSize." + $, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / i,
                            width: "100%"
                        })
                    }), v("ElementParse." + $, function(t, n) {
                        n.src = e.replaceSrc(n, i)
                    }))
                }
            }
        }
    }), k()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return t(e)
    }) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(0, function(e) {
    function t(e) {
        this.$container, this.constraints = null, this.__$tooltip, this.__init(e)
    }

    function i(t, i) {
        var n = !0;
        return e.each(t, function(e, a) {
            return void 0 === i[e] || t[e] !== i[e] ? (n = !1, !1) : void 0
        }), n
    }

    function n(t) {
        var i = t.attr("id"),
            n = i ? s.window.document.getElementById(i) : null;
        return n ? n === t[0] : e.contains(s.window.document.body, t[0])
    }
    var a = {
            animation: "fade",
            animationDuration: 350,
            content: null,
            contentAsHTML: !1,
            contentCloning: !1,
            debug: !0,
            delay: 300,
            delayTouch: [300, 500],
            functionInit: null,
            functionBefore: null,
            functionReady: null,
            functionAfter: null,
            functionFormat: null,
            IEmin: 6,
            interactive: !1,
            multiple: !1,
            parent: null,
            plugins: ["sideTip"],
            repositionOnScroll: !1,
            restoration: "none",
            selfDestruction: !0,
            theme: [],
            timer: 0,
            trackerInterval: 500,
            trackOrigin: !1,
            trackTooltip: !1,
            trigger: "hover",
            triggerClose: {
                click: !1,
                mouseleave: !1,
                originClick: !1,
                scroll: !1,
                tap: !1,
                touchleave: !1
            },
            triggerOpen: {
                click: !1,
                mouseenter: !1,
                tap: !1,
                touchstart: !1
            },
            updateAnimation: "rotate",
            zIndex: 9999999
        },
        r = "undefined" != typeof window ? window : null,
        s = {
            hasTouchCapability: !(!r || !("ontouchstart" in r || r.DocumentTouch && r.document instanceof r.DocumentTouch || r.navigator.maxTouchPoints)),
            hasTransitions: function() {
                if (!r) return !1;
                var e = (r.document.body || r.document.documentElement).style,
                    t = "transition",
                    i = ["Moz", "Webkit", "Khtml", "O", "ms"];
                if ("string" == typeof e[t]) return !0;
                t = t.charAt(0).toUpperCase() + t.substr(1);
                for (var n = 0; n < i.length; n++)
                    if ("string" == typeof e[i[n] + t]) return !0;
                return !1
            }(),
            IE: !1,
            semVer: "4.2.5",
            window: r
        },
        o = function() {
            this.__$emitterPrivate = e({}), this.__$emitterPublic = e({}), this.__instancesLatestArr = [], this.__plugins = {}, this._env = s
        };
    o.prototype = {
        __bridge: function(t, i, n) {
            if (!i[n]) {
                var r = function() {};
                r.prototype = t;
                var s = new r;
                s.__init && s.__init(i), e.each(t, function(e, t) {
                    0 != e.indexOf("__") && (i[e] ? a.debug && console.log("The " + e + " method of the " + n + " plugin conflicts with another plugin or native methods") : (i[e] = function() {
                        return s[e].apply(s, Array.prototype.slice.apply(arguments))
                    }, i[e].bridged = s))
                }), i[n] = s
            }
            return this
        },
        __setWindow: function(e) {
            return s.window = e, this
        },
        _getRuler: function(e) {
            return new t(e)
        },
        _off: function() {
            return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _on: function() {
            return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _one: function() {
            return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _plugin: function(t) {
            var i = this;
            if ("string" == typeof t) {
                var n = t,
                    a = null;
                return n.indexOf(".") > 0 ? a = i.__plugins[n] : e.each(i.__plugins, function(e, t) {
                    return t.name.substring(t.name.length - n.length - 1) == "." + n ? (a = t, !1) : void 0
                }), a
            }
            if (t.name.indexOf(".") < 0) throw new Error("Plugins must be namespaced");
            return i.__plugins[t.name] = t, t.core && i.__bridge(t.core, i, t.name), this
        },
        _trigger: function() {
            var e = Array.prototype.slice.apply(arguments);
            return "string" == typeof e[0] && (e[0] = {
                type: e[0]
            }), this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, e), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, e), this
        },
        instances: function(t) {
            var i = [];
            return e(t || ".tooltipstered").each(function() {
                var t = e(this),
                    n = t.data("tooltipster-ns");
                n && e.each(n, function(e, n) {
                    i.push(t.data(n))
                })
            }), i
        },
        instancesLatest: function() {
            return this.__instancesLatestArr
        },
        off: function() {
            return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        on: function() {
            return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        one: function() {
            return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        origins: function(t) {
            return e((t ? t + " " : "") + ".tooltipstered").toArray()
        },
        setDefaults: function(t) {
            return e.extend(a, t), this
        },
        triggerHandler: function() {
            return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        }
    }, e.tooltipster = new o, e.Tooltipster = function(t, i) {
        this.__callbacks = {
            close: [],
            open: []
        }, this.__closingTime, this.__Content, this.__contentBcr, this.__destroyed = !1, this.__$emitterPrivate = e({}), this.__$emitterPublic = e({}), this.__enabled = !0, this.__garbageCollector, this.__Geometry, this.__lastPosition, this.__namespace = "tooltipster-" + Math.round(1e6 * Math.random()), this.__options, this.__$originParents, this.__pointerIsOverOrigin = !1, this.__previousThemes = [], this.__state = "closed", this.__timeouts = {
            close: [],
            open: null
        }, this.__touchEvents = [], this.__tracker = null, this._$origin, this._$tooltip, this.__init(t, i)
    }, e.Tooltipster.prototype = {
        __init: function(t, i) {
            var n = this;
            if (n._$origin = e(t), n.__options = e.extend(!0, {}, a, i), n.__optionsFormat(), !s.IE || s.IE >= n.__options.IEmin) {
                var r = null;
                if (void 0 === n._$origin.data("tooltipster-initialTitle") && (void 0 === (r = n._$origin.attr("title")) && (r = null), n._$origin.data("tooltipster-initialTitle", r)), null !== n.__options.content) n.__contentSet(n.__options.content);
                else {
                    var o, d = n._$origin.attr("data-tooltip-content");
                    d && (o = e(d)), o && o[0] ? n.__contentSet(o.first()) : n.__contentSet(r)
                }
                n._$origin.removeAttr("title").addClass("tooltipstered"), n.__prepareOrigin(), n.__prepareGC(), e.each(n.__options.plugins, function(e, t) {
                    n._plug(t)
                }), s.hasTouchCapability && e(s.window.document.body).on("touchmove." + n.__namespace + "-triggerOpen", function(e) {
                    n._touchRecordEvent(e)
                }), n._on("created", function() {
                    n.__prepareTooltip()
                })._on("repositioned", function(e) {
                    n.__lastPosition = e.position
                })
            } else n.__options.disabled = !0
        },
        __contentInsert: function() {
            var e = this,
                t = e._$tooltip.find(".tooltipster-content"),
                i = e.__Content;
            return e._trigger({
                type: "format",
                content: e.__Content,
                format: function(e) {
                    i = e
                }
            }), e.__options.functionFormat && (i = e.__options.functionFormat.call(e, e, {
                origin: e._$origin[0]
            }, e.__Content)), "string" != typeof i || e.__options.contentAsHTML ? t.empty().append(i) : t.text(i), e
        },
        __contentSet: function(t) {
            return t instanceof e && this.__options.contentCloning && (t = t.clone(!0)), this.__Content = t, this._trigger({
                type: "updated",
                content: t
            }), this
        },
        __destroyError: function() {
            throw new Error("This tooltip has been destroyed and cannot execute your method call.")
        },
        __geometry: function() {
            var t = this,
                i = t._$origin,
                n = t._$origin.is("area");
            if (n) {
                var a = t._$origin.parent().attr("name");
                i = e('img[usemap="#' + a + '"]')
            }
            var r = i[0].getBoundingClientRect(),
                o = e(s.window.document),
                d = e(s.window),
                u = i,
                l = {
                    available: {
                        document: null,
                        window: null
                    },
                    document: {
                        size: {
                            height: o.height(),
                            width: o.width()
                        }
                    },
                    window: {
                        scroll: {
                            left: s.window.scrollX || s.window.document.documentElement.scrollLeft,
                            top: s.window.scrollY || s.window.document.documentElement.scrollTop
                        },
                        size: {
                            height: d.height(),
                            width: d.width()
                        }
                    },
                    origin: {
                        fixedLineage: !1,
                        offset: {},
                        size: {
                            height: r.bottom - r.top,
                            width: r.right - r.left
                        },
                        usemapImage: n ? i[0] : null,
                        windowOffset: {
                            bottom: r.bottom,
                            left: r.left,
                            right: r.right,
                            top: r.top
                        }
                    }
                };
            if (n) {
                var c = t._$origin.attr("shape"),
                    _ = t._$origin.attr("coords");
                if (_ && (_ = _.split(","), e.map(_, function(e, t) {
                        _[t] = parseInt(e)
                    })), "default" != c) switch (c) {
                    case "circle":
                        var m = _[0],
                            h = _[1],
                            p = _[2],
                            f = h - p,
                            g = m - p;
                        l.origin.size.height = 2 * p, l.origin.size.width = l.origin.size.height, l.origin.windowOffset.left += g, l.origin.windowOffset.top += f;
                        break;
                    case "rect":
                        var y = _[0],
                            M = _[1],
                            v = _[2],
                            L = _[3];
                        l.origin.size.height = L - M, l.origin.size.width = v - y, l.origin.windowOffset.left += y, l.origin.windowOffset.top += M;
                        break;
                    case "poly":
                        for (var w = 0, b = 0, k = 0, Y = 0, T = "even", D = 0; D < _.length; D++) {
                            var A = _[D];
                            "even" == T ? (A > k && (k = A, 0 === D && (w = k)), w > A && (w = A), T = "odd") : (A > Y && (Y = A, 1 == D && (b = Y)), b > A && (b = A), T = "even")
                        }
                        l.origin.size.height = Y - b, l.origin.size.width = k - w, l.origin.windowOffset.left += w, l.origin.windowOffset.top += b
                }
            }
            for (t._trigger({
                    type: "geometry",
                    edit: function(e) {
                        l.origin.size.height = e.height, l.origin.windowOffset.left = e.left, l.origin.windowOffset.top = e.top, l.origin.size.width = e.width
                    },
                    geometry: {
                        height: l.origin.size.height,
                        left: l.origin.windowOffset.left,
                        top: l.origin.windowOffset.top,
                        width: l.origin.size.width
                    }
                }), l.origin.windowOffset.right = l.origin.windowOffset.left + l.origin.size.width, l.origin.windowOffset.bottom = l.origin.windowOffset.top + l.origin.size.height, l.origin.offset.left = l.origin.windowOffset.left + l.window.scroll.left, l.origin.offset.top = l.origin.windowOffset.top + l.window.scroll.top, l.origin.offset.bottom = l.origin.offset.top + l.origin.size.height, l.origin.offset.right = l.origin.offset.left + l.origin.size.width, l.available.document = {
                    bottom: {
                        height: l.document.size.height - l.origin.offset.bottom,
                        width: l.document.size.width
                    },
                    left: {
                        height: l.document.size.height,
                        width: l.origin.offset.left
                    },
                    right: {
                        height: l.document.size.height,
                        width: l.document.size.width - l.origin.offset.right
                    },
                    top: {
                        height: l.origin.offset.top,
                        width: l.document.size.width
                    }
                }, l.available.window = {
                    bottom: {
                        height: Math.max(l.window.size.height - Math.max(l.origin.windowOffset.bottom, 0), 0),
                        width: l.window.size.width
                    },
                    left: {
                        height: l.window.size.height,
                        width: Math.max(l.origin.windowOffset.left, 0)
                    },
                    right: {
                        height: l.window.size.height,
                        width: Math.max(l.window.size.width - Math.max(l.origin.windowOffset.right, 0), 0)
                    },
                    top: {
                        height: Math.max(l.origin.windowOffset.top, 0),
                        width: l.window.size.width
                    }
                };
                "html" != u[0].tagName.toLowerCase();) {
                if ("fixed" == u.css("position")) {
                    l.origin.fixedLineage = !0;
                    break
                }
                u = u.parent()
            }
            return l
        },
        __optionsFormat: function() {
            return "number" == typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]), "number" == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]), "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]), "string" == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]), null === this.__options.parent ? this.__options.parent = e(s.window.document.body) : "string" == typeof this.__options.parent && (this.__options.parent = e(this.__options.parent)), "hover" == this.__options.trigger ? (this.__options.triggerOpen = {
                mouseenter: !0,
                touchstart: !0
            }, this.__options.triggerClose = {
                mouseleave: !0,
                originClick: !0,
                touchleave: !0
            }) : "click" == this.__options.trigger && (this.__options.triggerOpen = {
                click: !0,
                tap: !0
            }, this.__options.triggerClose = {
                click: !0,
                tap: !0
            }), this._trigger("options"), this
        },
        __prepareGC: function() {
            var t = this;
            return t.__options.selfDestruction ? t.__garbageCollector = setInterval(function() {
                var i = (new Date).getTime();
                t.__touchEvents = e.grep(t.__touchEvents, function(e, t) {
                    return i - e.time > 6e4
                }), n(t._$origin) || t.close(function() {
                    t.destroy()
                })
            }, 2e4) : clearInterval(t.__garbageCollector), t
        },
        __prepareOrigin: function() {
            var e = this;
            if (e._$origin.off("." + e.__namespace + "-triggerOpen"), s.hasTouchCapability && e._$origin.on("touchstart." + e.__namespace + "-triggerOpen touchend." + e.__namespace + "-triggerOpen touchcancel." + e.__namespace + "-triggerOpen", function(t) {
                    e._touchRecordEvent(t)
                }), e.__options.triggerOpen.click || e.__options.triggerOpen.tap && s.hasTouchCapability) {
                var t = "";
                e.__options.triggerOpen.click && (t += "click." + e.__namespace + "-triggerOpen "), e.__options.triggerOpen.tap && s.hasTouchCapability && (t += "touchend." + e.__namespace + "-triggerOpen"), e._$origin.on(t, function(t) {
                    e._touchIsMeaningfulEvent(t) && e._open(t)
                })
            }
            if (e.__options.triggerOpen.mouseenter || e.__options.triggerOpen.touchstart && s.hasTouchCapability) {
                t = "";
                e.__options.triggerOpen.mouseenter && (t += "mouseenter." + e.__namespace + "-triggerOpen "), e.__options.triggerOpen.touchstart && s.hasTouchCapability && (t += "touchstart." + e.__namespace + "-triggerOpen"), e._$origin.on(t, function(t) {
                    !e._touchIsTouchEvent(t) && e._touchIsEmulatedEvent(t) || (e.__pointerIsOverOrigin = !0, e._openShortly(t))
                })
            }
            if (e.__options.triggerClose.mouseleave || e.__options.triggerClose.touchleave && s.hasTouchCapability) {
                t = "";
                e.__options.triggerClose.mouseleave && (t += "mouseleave." + e.__namespace + "-triggerOpen "), e.__options.triggerClose.touchleave && s.hasTouchCapability && (t += "touchend." + e.__namespace + "-triggerOpen touchcancel." + e.__namespace + "-triggerOpen"), e._$origin.on(t, function(t) {
                    e._touchIsMeaningfulEvent(t) && (e.__pointerIsOverOrigin = !1)
                })
            }
            return e
        },
        __prepareTooltip: function() {
            var t = this,
                i = t.__options.interactive ? "auto" : "";
            return t._$tooltip.attr("id", t.__namespace).css({
                "pointer-events": i,
                zIndex: t.__options.zIndex
            }), e.each(t.__previousThemes, function(e, i) {
                t._$tooltip.removeClass(i)
            }), e.each(t.__options.theme, function(e, i) {
                t._$tooltip.addClass(i)
            }), t.__previousThemes = e.merge([], t.__options.theme), t
        },
        __scrollHandler: function(t) {
            var i = this;
            if (i.__options.triggerClose.scroll) i._close(t);
            else if (n(i._$origin) && n(i._$tooltip)) {
                var a = null;
                if (t.target === s.window.document) i.__Geometry.origin.fixedLineage || i.__options.repositionOnScroll && i.reposition(t);
                else {
                    a = i.__geometry();
                    var r = !1;
                    if ("fixed" != i._$origin.css("position") && i.__$originParents.each(function(t, i) {
                            var n = e(i),
                                s = n.css("overflow-x"),
                                o = n.css("overflow-y");
                            if ("visible" != s || "visible" != o) {
                                var d = i.getBoundingClientRect();
                                if ("visible" != s && (a.origin.windowOffset.left < d.left || a.origin.windowOffset.right > d.right)) return r = !0, !1;
                                if ("visible" != o && (a.origin.windowOffset.top < d.top || a.origin.windowOffset.bottom > d.bottom)) return r = !0, !1
                            }
                            return "fixed" != n.css("position") && void 0
                        }), r) i._$tooltip.css("visibility", "hidden");
                    else if (i._$tooltip.css("visibility", "visible"), i.__options.repositionOnScroll) i.reposition(t);
                    else {
                        var o = a.origin.offset.left - i.__Geometry.origin.offset.left,
                            d = a.origin.offset.top - i.__Geometry.origin.offset.top;
                        i._$tooltip.css({
                            left: i.__lastPosition.coord.left + o,
                            top: i.__lastPosition.coord.top + d
                        })
                    }
                }
                i._trigger({
                    type: "scroll",
                    event: t,
                    geo: a
                })
            }
            return i
        },
        __stateSet: function(e) {
            return this.__state = e, this._trigger({
                type: "state",
                state: e
            }), this
        },
        __timeoutsClear: function() {
            return clearTimeout(this.__timeouts.open), this.__timeouts.open = null, e.each(this.__timeouts.close, function(e, t) {
                clearTimeout(t)
            }), this.__timeouts.close = [], this
        },
        __trackerStart: function() {
            var e = this,
                t = e._$tooltip.find(".tooltipster-content");
            return e.__options.trackTooltip && (e.__contentBcr = t[0].getBoundingClientRect()), e.__tracker = setInterval(function() {
                if (n(e._$origin) && n(e._$tooltip)) {
                    if (e.__options.trackOrigin) {
                        var a = e.__geometry(),
                            r = !1;
                        i(a.origin.size, e.__Geometry.origin.size) && (e.__Geometry.origin.fixedLineage ? i(a.origin.windowOffset, e.__Geometry.origin.windowOffset) && (r = !0) : i(a.origin.offset, e.__Geometry.origin.offset) && (r = !0)), r || (e.__options.triggerClose.mouseleave ? e._close() : e.reposition())
                    }
                    if (e.__options.trackTooltip) {
                        var s = t[0].getBoundingClientRect();
                        s.height === e.__contentBcr.height && s.width === e.__contentBcr.width || (e.reposition(), e.__contentBcr = s)
                    }
                } else e._close()
            }, e.__options.trackerInterval), e
        },
        _close: function(t, i, n) {
            var a = this,
                r = !0;
            if (a._trigger({
                    type: "close",
                    event: t,
                    stop: function() {
                        r = !1
                    }
                }), r || n) {
                i && a.__callbacks.close.push(i), a.__callbacks.open = [], a.__timeoutsClear();
                var o = function() {
                    e.each(a.__callbacks.close, function(e, i) {
                        i.call(a, a, {
                            event: t,
                            origin: a._$origin[0]
                        })
                    }), a.__callbacks.close = []
                };
                if ("closed" != a.__state) {
                    var d = !0,
                        u = (new Date).getTime() + a.__options.animationDuration[1];
                    if ("disappearing" == a.__state && u > a.__closingTime && a.__options.animationDuration[1] > 0 && (d = !1), d) {
                        a.__closingTime = u, "disappearing" != a.__state && a.__stateSet("disappearing");
                        var l = function() {
                            clearInterval(a.__tracker), a._trigger({
                                type: "closing",
                                event: t
                            }), a._$tooltip.off("." + a.__namespace + "-triggerClose").removeClass("tooltipster-dying"), e(s.window).off("." + a.__namespace + "-triggerClose"), a.__$originParents.each(function(t, i) {
                                e(i).off("scroll." + a.__namespace + "-triggerClose")
                            }), a.__$originParents = null, e(s.window.document.body).off("." + a.__namespace + "-triggerClose"), a._$origin.off("." + a.__namespace + "-triggerClose"), a._off("dismissable"), a.__stateSet("closed"), a._trigger({
                                type: "after",
                                event: t
                            }), a.__options.functionAfter && a.__options.functionAfter.call(a, a, {
                                event: t,
                                origin: a._$origin[0]
                            }), o()
                        };
                        s.hasTransitions ? (a._$tooltip.css({
                            "-moz-animation-duration": a.__options.animationDuration[1] + "ms",
                            "-ms-animation-duration": a.__options.animationDuration[1] + "ms",
                            "-o-animation-duration": a.__options.animationDuration[1] + "ms",
                            "-webkit-animation-duration": a.__options.animationDuration[1] + "ms",
                            "animation-duration": a.__options.animationDuration[1] + "ms",
                            "transition-duration": a.__options.animationDuration[1] + "ms"
                        }), a._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"), a.__options.animationDuration[1] > 0 && a._$tooltip.delay(a.__options.animationDuration[1]), a._$tooltip.queue(l)) : a._$tooltip.stop().fadeOut(a.__options.animationDuration[1], l)
                    }
                } else o()
            }
            return a
        },
        _off: function() {
            return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _on: function() {
            return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _one: function() {
            return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), this
        },
        _open: function(t, i) {
            var a = this;
            if (!a.__destroying && n(a._$origin) && a.__enabled) {
                var r = !0;
                if ("closed" == a.__state && (a._trigger({
                        type: "before",
                        event: t,
                        stop: function() {
                            r = !1
                        }
                    }), r && a.__options.functionBefore && (r = a.__options.functionBefore.call(a, a, {
                        event: t,
                        origin: a._$origin[0]
                    }))), !1 !== r && null !== a.__Content) {
                    i && a.__callbacks.open.push(i), a.__callbacks.close = [], a.__timeoutsClear();
                    var o, d = function() {
                        "stable" != a.__state && a.__stateSet("stable"), e.each(a.__callbacks.open, function(e, t) {
                            t.call(a, a, {
                                origin: a._$origin[0],
                                tooltip: a._$tooltip[0]
                            })
                        }), a.__callbacks.open = []
                    };
                    if ("closed" !== a.__state) o = 0, "disappearing" === a.__state ? (a.__stateSet("appearing"), s.hasTransitions ? (a._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"), a.__options.animationDuration[0] > 0 && a._$tooltip.delay(a.__options.animationDuration[0]), a._$tooltip.queue(d)) : a._$tooltip.stop().fadeIn(d)) : "stable" == a.__state && d();
                    else {
                        if (a.__stateSet("appearing"), o = a.__options.animationDuration[0], a.__contentInsert(), a.reposition(t, !0), s.hasTransitions ? (a._$tooltip.addClass("tooltipster-" + a.__options.animation).addClass("tooltipster-initial").css({
                                "-moz-animation-duration": a.__options.animationDuration[0] + "ms",
                                "-ms-animation-duration": a.__options.animationDuration[0] + "ms",
                                "-o-animation-duration": a.__options.animationDuration[0] + "ms",
                                "-webkit-animation-duration": a.__options.animationDuration[0] + "ms",
                                "animation-duration": a.__options.animationDuration[0] + "ms",
                                "transition-duration": a.__options.animationDuration[0] + "ms"
                            }), setTimeout(function() {
                                "closed" != a.__state && (a._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"), a.__options.animationDuration[0] > 0 && a._$tooltip.delay(a.__options.animationDuration[0]), a._$tooltip.queue(d))
                            }, 0)) : a._$tooltip.css("display", "none").fadeIn(a.__options.animationDuration[0], d), a.__trackerStart(), e(s.window).on("resize." + a.__namespace + "-triggerClose", function(t) {
                                var i = e(document.activeElement);
                                (i.is("input") || i.is("textarea")) && e.contains(a._$tooltip[0], i[0]) || a.reposition(t)
                            }).on("scroll." + a.__namespace + "-triggerClose", function(e) {
                                a.__scrollHandler(e)
                            }), a.__$originParents = a._$origin.parents(), a.__$originParents.each(function(t, i) {
                                e(i).on("scroll." + a.__namespace + "-triggerClose", function(e) {
                                    a.__scrollHandler(e)
                                })
                            }), a.__options.triggerClose.mouseleave || a.__options.triggerClose.touchleave && s.hasTouchCapability) {
                            a._on("dismissable", function(e) {
                                e.dismissable ? e.delay ? (_ = setTimeout(function() {
                                    a._close(e.event)
                                }, e.delay), a.__timeouts.close.push(_)) : a._close(e) : clearTimeout(_)
                            });
                            var u = a._$origin,
                                l = "",
                                c = "",
                                _ = null;
                            a.__options.interactive && (u = u.add(a._$tooltip)), a.__options.triggerClose.mouseleave && (l += "mouseenter." + a.__namespace + "-triggerClose ", c += "mouseleave." + a.__namespace + "-triggerClose "), a.__options.triggerClose.touchleave && s.hasTouchCapability && (l += "touchstart." + a.__namespace + "-triggerClose", c += "touchend." + a.__namespace + "-triggerClose touchcancel." + a.__namespace + "-triggerClose"), u.on(c, function(e) {
                                if (a._touchIsTouchEvent(e) || !a._touchIsEmulatedEvent(e)) {
                                    var t = "mouseleave" == e.type ? a.__options.delay : a.__options.delayTouch;
                                    a._trigger({
                                        delay: t[1],
                                        dismissable: !0,
                                        event: e,
                                        type: "dismissable"
                                    })
                                }
                            }).on(l, function(e) {
                                !a._touchIsTouchEvent(e) && a._touchIsEmulatedEvent(e) || a._trigger({
                                    dismissable: !1,
                                    event: e,
                                    type: "dismissable"
                                })
                            })
                        }
                        a.__options.triggerClose.originClick && a._$origin.on("click." + a.__namespace + "-triggerClose", function(e) {
                            a._touchIsTouchEvent(e) || a._touchIsEmulatedEvent(e) || a._close(e)
                        }), (a.__options.triggerClose.click || a.__options.triggerClose.tap && s.hasTouchCapability) && setTimeout(function() {
                            if ("closed" != a.__state) {
                                var t = "",
                                    i = e(s.window.document.body);
                                a.__options.triggerClose.click && (t += "click." + a.__namespace + "-triggerClose "), a.__options.triggerClose.tap && s.hasTouchCapability && (t += "touchend." + a.__namespace + "-triggerClose"), i.on(t, function(t) {
                                    a._touchIsMeaningfulEvent(t) && (a._touchRecordEvent(t), a.__options.interactive && e.contains(a._$tooltip[0], t.target) || a._close(t))
                                }), a.__options.triggerClose.tap && s.hasTouchCapability && i.on("touchstart." + a.__namespace + "-triggerClose", function(e) {
                                    a._touchRecordEvent(e)
                                })
                            }
                        }, 0), a._trigger("ready"), a.__options.functionReady && a.__options.functionReady.call(a, a, {
                            origin: a._$origin[0],
                            tooltip: a._$tooltip[0]
                        })
                    }
                    if (a.__options.timer > 0) {
                        _ = setTimeout(function() {
                            a._close()
                        }, a.__options.timer + o);
                        a.__timeouts.close.push(_)
                    }
                }
            }
            return a
        },
        _openShortly: function(e) {
            var t = this,
                i = !0;
            if ("stable" != t.__state && "appearing" != t.__state && !t.__timeouts.open && (t._trigger({
                    type: "start",
                    event: e,
                    stop: function() {
                        i = !1
                    }
                }), i)) {
                var n = 0 == e.type.indexOf("touch") ? t.__options.delayTouch : t.__options.delay;
                n[0] ? t.__timeouts.open = setTimeout(function() {
                    t.__timeouts.open = null, t.__pointerIsOverOrigin && t._touchIsMeaningfulEvent(e) ? (t._trigger("startend"), t._open(e)) : t._trigger("startcancel")
                }, n[0]) : (t._trigger("startend"), t._open(e))
            }
            return t
        },
        _optionsExtract: function(t, i) {
            var n = this,
                a = e.extend(!0, {}, i),
                r = n.__options[t];
            return r || (r = {}, e.each(i, function(e, t) {
                var i = n.__options[e];
                void 0 !== i && (r[e] = i)
            })), e.each(a, function(t, i) {
                void 0 !== r[t] && ("object" != typeof i || i instanceof Array || null == i || "object" != typeof r[t] || r[t] instanceof Array || null == r[t] ? a[t] = r[t] : e.extend(a[t], r[t]))
            }), a
        },
        _plug: function(t) {
            var i = e.tooltipster._plugin(t);
            if (!i) throw new Error('The "' + t + '" plugin is not defined');
            return i.instance && e.tooltipster.__bridge(i.instance, this, i.name), this
        },
        _touchIsEmulatedEvent: function(e) {
            for (var t = !1, i = (new Date).getTime(), n = this.__touchEvents.length - 1; n >= 0; n--) {
                var a = this.__touchEvents[n];
                if (!(i - a.time < 500)) break;
                a.target === e.target && (t = !0)
            }
            return t
        },
        _touchIsMeaningfulEvent: function(e) {
            return this._touchIsTouchEvent(e) && !this._touchSwiped(e.target) || !this._touchIsTouchEvent(e) && !this._touchIsEmulatedEvent(e)
        },
        _touchIsTouchEvent: function(e) {
            return 0 == e.type.indexOf("touch")
        },
        _touchRecordEvent: function(e) {
            return this._touchIsTouchEvent(e) && (e.time = (new Date).getTime(), this.__touchEvents.push(e)), this
        },
        _touchSwiped: function(e) {
            for (var t = !1, i = this.__touchEvents.length - 1; i >= 0; i--) {
                var n = this.__touchEvents[i];
                if ("touchmove" == n.type) {
                    t = !0;
                    break
                }
                if ("touchstart" == n.type && e === n.target) break
            }
            return t
        },
        _trigger: function() {
            var t = Array.prototype.slice.apply(arguments);
            return "string" == typeof t[0] && (t[0] = {
                type: t[0]
            }), t[0].instance = this, t[0].origin = this._$origin ? this._$origin[0] : null, t[0].tooltip = this._$tooltip ? this._$tooltip[0] : null, this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, t), e.tooltipster._trigger.apply(e.tooltipster, t), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, t), this
        },
        _unplug: function(t) {
            var i = this;
            if (i[t]) {
                var n = e.tooltipster._plugin(t);
                n.instance && e.each(n.instance, function(e, n) {
                    i[e] && i[e].bridged === i[t] && delete i[e]
                }), i[t].__destroy && i[t].__destroy(), delete i[t]
            }
            return i
        },
        close: function(e) {
            return this.__destroyed ? this.__destroyError() : this._close(null, e), this
        },
        content: function(e) {
            var t = this;
            if (void 0 === e) return t.__Content;
            if (t.__destroyed) t.__destroyError();
            else if (t.__contentSet(e), null !== t.__Content) {
                if ("closed" !== t.__state && (t.__contentInsert(), t.reposition(), t.__options.updateAnimation))
                    if (s.hasTransitions) {
                        var i = t.__options.updateAnimation;
                        t._$tooltip.addClass("tooltipster-update-" + i), setTimeout(function() {
                            "closed" != t.__state && t._$tooltip.removeClass("tooltipster-update-" + i)
                        }, 1e3)
                    } else t._$tooltip.fadeTo(200, .5, function() {
                        "closed" != t.__state && t._$tooltip.fadeTo(200, 1)
                    })
            } else t._close();
            return t
        },
        destroy: function() {
            var t = this;
            if (t.__destroyed) t.__destroyError();
            else {
                "closed" != t.__state ? t.option("animationDuration", 0)._close(null, null, !0) : t.__timeoutsClear(), t._trigger("destroy"), t.__destroyed = !0, t._$origin.removeData(t.__namespace).off("." + t.__namespace + "-triggerOpen"), e(s.window.document.body).off("." + t.__namespace + "-triggerOpen");
                var i = t._$origin.data("tooltipster-ns");
                if (i)
                    if (1 === i.length) {
                        var n = null;
                        "previous" == t.__options.restoration ? n = t._$origin.data("tooltipster-initialTitle") : "current" == t.__options.restoration && (n = "string" == typeof t.__Content ? t.__Content : e("<div></div>").append(t.__Content).html()), n && t._$origin.attr("title", n), t._$origin.removeClass("tooltipstered"), t._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
                    } else i = e.grep(i, function(e, i) {
                        return e !== t.__namespace
                    }), t._$origin.data("tooltipster-ns", i);
                t._trigger("destroyed"), t._off(), t.off(), t.__Content = null, t.__$emitterPrivate = null, t.__$emitterPublic = null, t.__options.parent = null, t._$origin = null, t._$tooltip = null, e.tooltipster.__instancesLatestArr = e.grep(e.tooltipster.__instancesLatestArr, function(e, i) {
                    return t !== e
                }), clearInterval(t.__garbageCollector)
            }
            return t
        },
        disable: function() {
            return this.__destroyed ? (this.__destroyError(), this) : (this._close(), this.__enabled = !1, this)
        },
        elementOrigin: function() {
            return this.__destroyed ? void this.__destroyError() : this._$origin[0]
        },
        elementTooltip: function() {
            return this._$tooltip ? this._$tooltip[0] : null
        },
        enable: function() {
            return this.__enabled = !0, this
        },
        hide: function(e) {
            return this.close(e)
        },
        instance: function() {
            return this
        },
        off: function() {
            return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        on: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        one: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        },
        open: function(e) {
            return this.__destroyed ? this.__destroyError() : this._open(null, e), this
        },
        option: function(t, i) {
            return void 0 === i ? this.__options[t] : (this.__destroyed ? this.__destroyError() : (this.__options[t] = i, this.__optionsFormat(), e.inArray(t, ["trigger", "triggerClose", "triggerOpen"]) >= 0 && this.__prepareOrigin(), "selfDestruction" === t && this.__prepareGC()), this)
        },
        reposition: function(e, t) {
            var i = this;
            return i.__destroyed ? i.__destroyError() : "closed" != i.__state && n(i._$origin) && (t || n(i._$tooltip)) && (t || i._$tooltip.detach(), i.__Geometry = i.__geometry(), i._trigger({
                type: "reposition",
                event: e,
                helper: {
                    geo: i.__Geometry
                }
            })), i
        },
        show: function(e) {
            return this.open(e)
        },
        status: function() {
            return {
                destroyed: this.__destroyed,
                enabled: this.__enabled,
                open: "closed" !== this.__state,
                state: this.__state
            }
        },
        triggerHandler: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), this
        }
    }, e.fn.tooltipster = function() {
        var t = Array.prototype.slice.apply(arguments),
            i = "You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";
        if (0 === this.length) return this;
        if ("string" == typeof t[0]) {
            var n = "#*$~&";
            return this.each(function() {
                var a = e(this).data("tooltipster-ns"),
                    r = a ? e(this).data(a[0]) : null;
                if (!r) throw new Error("You called Tooltipster's \"" + t[0] + '" method on an uninitialized element');
                if ("function" != typeof r[t[0]]) throw new Error('Unknown method "' + t[0] + '"');
                this.length > 1 && "content" == t[0] && (t[1] instanceof e || "object" == typeof t[1] && null != t[1] && t[1].tagName) && !r.__options.contentCloning && r.__options.debug && console.log(i);
                var s = r[t[0]](t[1], t[2]);
                return s !== r || "instance" === t[0] ? (n = s, !1) : void 0
            }), "#*$~&" !== n ? n : this
        }
        e.tooltipster.__instancesLatestArr = [];
        var r = t[0] && void 0 !== t[0].multiple,
            s = r && t[0].multiple || !r && a.multiple,
            o = t[0] && void 0 !== t[0].content,
            d = o && t[0].content || !o && a.content,
            u = t[0] && void 0 !== t[0].contentCloning,
            l = u && t[0].contentCloning || !u && a.contentCloning,
            c = t[0] && void 0 !== t[0].debug,
            _ = c && t[0].debug || !c && a.debug;
        return this.length > 1 && (d instanceof e || "object" == typeof d && null != d && d.tagName) && !l && _ && console.log(i), this.each(function() {
            var i = !1,
                n = e(this),
                a = n.data("tooltipster-ns"),
                r = null;
            a ? s ? i = !0 : _ && (console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."), console.log(this)) : i = !0, i && (r = new e.Tooltipster(this, t[0]), a || (a = []), a.push(r.__namespace), n.data("tooltipster-ns", a), n.data(r.__namespace, r), r.__options.functionInit && r.__options.functionInit.call(r, r, {
                origin: this
            }), r._trigger("init")), e.tooltipster.__instancesLatestArr.push(r)
        }), this
    }, t.prototype = {
        __init: function(t) {
            this.__$tooltip = t, this.__$tooltip.css({
                left: 0,
                overflow: "hidden",
                position: "absolute",
                top: 0
            }).find(".tooltipster-content").css("overflow", "auto"), this.$container = e('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(s.window.document.body)
        },
        __forceRedraw: function() {
            var e = this.__$tooltip.parent();
            this.__$tooltip.detach(), this.__$tooltip.appendTo(e)
        },
        constrain: function(e, t) {
            return this.constraints = {
                width: e,
                height: t
            }, this.__$tooltip.css({
                display: "block",
                height: "",
                overflow: "auto",
                width: e
            }), this
        },
        destroy: function() {
            this.__$tooltip.detach().find(".tooltipster-content").css({
                display: "",
                overflow: ""
            }), this.$container.remove()
        },
        free: function() {
            return this.constraints = null, this.__$tooltip.css({
                display: "",
                height: "",
                overflow: "visible",
                width: ""
            }), this
        },
        measure: function() {
            this.__forceRedraw();
            var e = this.__$tooltip[0].getBoundingClientRect(),
                t = {
                    size: {
                        height: e.height || e.bottom - e.top,
                        width: e.width || e.right - e.left
                    }
                };
            if (this.constraints) {
                var i = this.__$tooltip.find(".tooltipster-content"),
                    n = this.__$tooltip.outerHeight(),
                    a = i[0].getBoundingClientRect(),
                    r = {
                        height: n <= this.constraints.height,
                        width: e.width <= this.constraints.width && a.width >= i[0].scrollWidth - 1
                    };
                t.fits = r.height && r.width
            }
            return s.IE && s.IE <= 11 && t.size.width !== s.window.document.documentElement.clientWidth && (t.size.width = Math.ceil(t.size.width) + 1), t
        }
    };
    var d = navigator.userAgent.toLowerCase(); - 1 != d.indexOf("msie") ? s.IE = parseInt(d.split("msie")[1]) : -1 !== d.toLowerCase().indexOf("trident") && -1 !== d.indexOf(" rv:11") ? s.IE = 11 : -1 != d.toLowerCase().indexOf("edge/") && (s.IE = parseInt(d.toLowerCase().split("edge/")[1]));
    var u = "tooltipster.sideTip";
    return e.tooltipster._plugin({
        name: u,
        instance: {
            __defaults: function() {
                return {
                    arrow: !0,
                    distance: 6,
                    functionPosition: null,
                    maxWidth: null,
                    minIntersection: 16,
                    minWidth: 0,
                    position: null,
                    side: "top",
                    viewportAware: !0
                }
            },
            __init: function(e) {
                var t = this;
                t.__instance = e, t.__namespace = "tooltipster-sideTip-" + Math.round(1e6 * Math.random()), t.__previousState = "closed", t.__options, t.__optionsFormat(), t.__instance._on("state." + t.__namespace, function(e) {
                    "closed" == e.state ? t.__close() : "appearing" == e.state && "closed" == t.__previousState && t.__create(), t.__previousState = e.state
                }), t.__instance._on("options." + t.__namespace, function() {
                    t.__optionsFormat()
                }), t.__instance._on("reposition." + t.__namespace, function(e) {
                    t.__reposition(e.event, e.helper)
                })
            },
            __close: function() {
                this.__instance.content() instanceof e && this.__instance.content().detach(), this.__instance._$tooltip.remove(), this.__instance._$tooltip = null
            },
            __create: function() {
                var t = e('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');
                this.__options.arrow || t.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide(), this.__options.minWidth && t.css("min-width", this.__options.minWidth + "px"), this.__options.maxWidth && t.css("max-width", this.__options.maxWidth + "px"), this.__instance._$tooltip = t, this.__instance._trigger("created")
            },
            __destroy: function() {
                this.__instance._off("." + self.__namespace)
            },
            __optionsFormat: function() {
                var t = this;
                if (t.__options = t.__instance._optionsExtract(u, t.__defaults()), t.__options.position && (t.__options.side = t.__options.position), "object" != typeof t.__options.distance && (t.__options.distance = [t.__options.distance]), t.__options.distance.length < 4 && (void 0 === t.__options.distance[1] && (t.__options.distance[1] = t.__options.distance[0]), void 0 === t.__options.distance[2] && (t.__options.distance[2] = t.__options.distance[0]), void 0 === t.__options.distance[3] && (t.__options.distance[3] = t.__options.distance[1]), t.__options.distance = {
                        top: t.__options.distance[0],
                        right: t.__options.distance[1],
                        bottom: t.__options.distance[2],
                        left: t.__options.distance[3]
                    }), "string" == typeof t.__options.side) {
                    t.__options.side = [t.__options.side, {
                        top: "bottom",
                        right: "left",
                        bottom: "top",
                        left: "right"
                    }[t.__options.side]], "left" == t.__options.side[0] || "right" == t.__options.side[0] ? t.__options.side.push("top", "bottom") : t.__options.side.push("right", "left")
                }
                6 === e.tooltipster._env.IE && !0 !== t.__options.arrow && (t.__options.arrow = !1)
            },
            __reposition: function(t, i) {
                var n, a = this,
                    r = a.__targetFind(i),
                    s = [];
                a.__instance._$tooltip.detach();
                var o = a.__instance._$tooltip.clone(),
                    d = e.tooltipster._getRuler(o),
                    u = !1,
                    l = a.__instance.option("animation");
                switch (l && o.removeClass("tooltipster-" + l), e.each(["window", "document"], function(n, l) {
                    var c = null;
                    if (a.__instance._trigger({
                            container: l,
                            helper: i,
                            satisfied: u,
                            takeTest: function(e) {
                                c = e
                            },
                            results: s,
                            type: "positionTest"
                        }), 1 == c || 0 != c && 0 == u && ("window" != l || a.__options.viewportAware))
                        for (n = 0; n < a.__options.side.length; n++) {
                            var _ = {
                                    horizontal: 0,
                                    vertical: 0
                                },
                                m = a.__options.side[n];
                            "top" == m || "bottom" == m ? _.vertical = a.__options.distance[m] : _.horizontal = a.__options.distance[m], a.__sideChange(o, m), e.each(["natural", "constrained"], function(e, n) {
                                if (c = null, a.__instance._trigger({
                                        container: l,
                                        event: t,
                                        helper: i,
                                        mode: n,
                                        results: s,
                                        satisfied: u,
                                        side: m,
                                        takeTest: function(e) {
                                            c = e
                                        },
                                        type: "positionTest"
                                    }), 1 == c || 0 != c && 0 == u) {
                                    var o = {
                                            container: l,
                                            distance: _,
                                            fits: null,
                                            mode: n,
                                            outerSize: null,
                                            side: m,
                                            size: null,
                                            target: r[m],
                                            whole: null
                                        },
                                        h = ("natural" == n ? d.free() : d.constrain(i.geo.available[l][m].width - _.horizontal, i.geo.available[l][m].height - _.vertical)).measure();
                                    if (o.size = h.size, o.outerSize = {
                                            height: h.size.height + _.vertical,
                                            width: h.size.width + _.horizontal
                                        }, "natural" == n ? i.geo.available[l][m].width >= o.outerSize.width && i.geo.available[l][m].height >= o.outerSize.height ? o.fits = !0 : o.fits = !1 : o.fits = h.fits, "window" == l && (o.fits ? o.whole = "top" == m || "bottom" == m ? i.geo.origin.windowOffset.right >= a.__options.minIntersection && i.geo.window.size.width - i.geo.origin.windowOffset.left >= a.__options.minIntersection : i.geo.origin.windowOffset.bottom >= a.__options.minIntersection && i.geo.window.size.height - i.geo.origin.windowOffset.top >= a.__options.minIntersection : o.whole = !1), s.push(o), o.whole) u = !0;
                                    else if ("natural" == o.mode && (o.fits || o.size.width <= i.geo.available[l][m].width)) return !1
                                }
                            })
                        }
                }), a.__instance._trigger({
                    edit: function(e) {
                        s = e
                    },
                    event: t,
                    helper: i,
                    results: s,
                    type: "positionTested"
                }), s.sort(function(e, t) {
                    if (e.whole && !t.whole) return -1;
                    if (!e.whole && t.whole) return 1;
                    if (e.whole && t.whole) {
                        var i = a.__options.side.indexOf(e.side);
                        return (n = a.__options.side.indexOf(t.side)) > i ? -1 : i > n ? 1 : "natural" == e.mode ? -1 : 1
                    }
                    if (e.fits && !t.fits) return -1;
                    if (!e.fits && t.fits) return 1;
                    if (e.fits && t.fits) {
                        var n;
                        i = a.__options.side.indexOf(e.side);
                        return (n = a.__options.side.indexOf(t.side)) > i ? -1 : i > n ? 1 : "natural" == e.mode ? -1 : 1
                    }
                    return "document" == e.container && "bottom" == e.side && "natural" == e.mode ? -1 : 1
                }), (n = s[0]).coord = {}, n.side) {
                    case "left":
                    case "right":
                        n.coord.top = Math.floor(n.target - n.size.height / 2);
                        break;
                    case "bottom":
                    case "top":
                        n.coord.left = Math.floor(n.target - n.size.width / 2)
                }
                switch (n.side) {
                    case "left":
                        n.coord.left = i.geo.origin.windowOffset.left - n.outerSize.width;
                        break;
                    case "right":
                        n.coord.left = i.geo.origin.windowOffset.right + n.distance.horizontal;
                        break;
                    case "top":
                        n.coord.top = i.geo.origin.windowOffset.top - n.outerSize.height;
                        break;
                    case "bottom":
                        n.coord.top = i.geo.origin.windowOffset.bottom + n.distance.vertical
                }
                "window" == n.container ? "top" == n.side || "bottom" == n.side ? n.coord.left < 0 ? i.geo.origin.windowOffset.right - this.__options.minIntersection >= 0 ? n.coord.left = 0 : n.coord.left = i.geo.origin.windowOffset.right - this.__options.minIntersection - 1 : n.coord.left > i.geo.window.size.width - n.size.width && (i.geo.origin.windowOffset.left + this.__options.minIntersection <= i.geo.window.size.width ? n.coord.left = i.geo.window.size.width - n.size.width : n.coord.left = i.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - n.size.width) : n.coord.top < 0 ? i.geo.origin.windowOffset.bottom - this.__options.minIntersection >= 0 ? n.coord.top = 0 : n.coord.top = i.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1 : n.coord.top > i.geo.window.size.height - n.size.height && (i.geo.origin.windowOffset.top + this.__options.minIntersection <= i.geo.window.size.height ? n.coord.top = i.geo.window.size.height - n.size.height : n.coord.top = i.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - n.size.height) : (n.coord.left > i.geo.window.size.width - n.size.width && (n.coord.left = i.geo.window.size.width - n.size.width), n.coord.left < 0 && (n.coord.left = 0)), a.__sideChange(o, n.side), i.tooltipClone = o[0], i.tooltipParent = a.__instance.option("parent").parent[0], i.mode = n.mode, i.whole = n.whole, i.origin = a.__instance._$origin[0], i.tooltip = a.__instance._$tooltip[0], delete n.container, delete n.fits, delete n.mode, delete n.outerSize, delete n.whole, n.distance = n.distance.horizontal || n.distance.vertical;
                var c, _, m, h = e.extend(!0, {}, n);
                if (a.__instance._trigger({
                        edit: function(e) {
                            n = e
                        },
                        event: t,
                        helper: i,
                        position: h,
                        type: "position"
                    }), a.__options.functionPosition) {
                    var p = a.__options.functionPosition.call(a, a.__instance, i, h);
                    p && (n = p)
                }
                d.destroy(), "top" == n.side || "bottom" == n.side ? (c = {
                    prop: "left",
                    val: n.target - n.coord.left
                }, _ = n.size.width - this.__options.minIntersection) : (c = {
                    prop: "top",
                    val: n.target - n.coord.top
                }, _ = n.size.height - this.__options.minIntersection), c.val < this.__options.minIntersection ? c.val = this.__options.minIntersection : c.val > _ && (c.val = _), m = i.geo.origin.fixedLineage ? i.geo.origin.windowOffset : {
                    left: i.geo.origin.windowOffset.left + i.geo.window.scroll.left,
                    top: i.geo.origin.windowOffset.top + i.geo.window.scroll.top
                }, n.coord = {
                    left: m.left + (n.coord.left - i.geo.origin.windowOffset.left),
                    top: m.top + (n.coord.top - i.geo.origin.windowOffset.top)
                }, a.__sideChange(a.__instance._$tooltip, n.side), i.geo.origin.fixedLineage ? a.__instance._$tooltip.css("position", "fixed") : a.__instance._$tooltip.css("position", ""), a.__instance._$tooltip.css({
                    left: n.coord.left,
                    top: n.coord.top,
                    height: n.size.height,
                    width: n.size.width
                }).find(".tooltipster-arrow").css({
                    left: "",
                    top: ""
                }).css(c.prop, c.val), a.__instance._$tooltip.appendTo(a.__instance.option("parent")), a.__instance._trigger({
                    type: "repositioned",
                    event: t,
                    position: n
                })
            },
            __sideChange: function(e, t) {
                e.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-" + t)
            },
            __targetFind: function(e) {
                var t = {},
                    i = this.__instance._$origin[0].getClientRects();
                i.length > 1 && (1 == this.__instance._$origin.css("opacity") && (this.__instance._$origin.css("opacity", .99), i = this.__instance._$origin[0].getClientRects(), this.__instance._$origin.css("opacity", 1)));
                if (i.length < 2) t.top = Math.floor(e.geo.origin.windowOffset.left + e.geo.origin.size.width / 2), t.bottom = t.top, t.left = Math.floor(e.geo.origin.windowOffset.top + e.geo.origin.size.height / 2), t.right = t.left;
                else {
                    var n = i[0];
                    t.top = Math.floor(n.left + (n.right - n.left) / 2), n = i.length > 2 ? i[Math.ceil(i.length / 2) - 1] : i[0], t.right = Math.floor(n.top + (n.bottom - n.top) / 2), n = i[i.length - 1], t.bottom = Math.floor(n.left + (n.right - n.left) / 2), n = i.length > 2 ? i[Math.ceil((i.length + 1) / 2) - 1] : i[i.length - 1], t.left = Math.floor(n.top + (n.bottom - n.top) / 2)
                }
                return t
            }
        }
    }), e
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["tooltipster"], function(e) {
        return t(e)
    }) : "object" == typeof exports ? module.exports = t(require("tooltipster")) : t(jQuery)
}(0, function(e) {
    var t = "laa.follower";
    return e.tooltipster._plugin({
        name: t,
        instance: {
            __defaults: function() {
                return {
                    anchor: "top-left",
                    maxWidth: null,
                    minWidth: 0,
                    offset: [15, -15]
                }
            },
            __init: function(e) {
                var t = this;
                return t.__displayed, t.__helper, t.__initialROS = e.option("repositionOnScroll"), t.__instance = e, t.__latestMouseEvent, t.__namespace = "tooltipster-follower-" + Math.round(1e6 * Math.random()), t.__openingTouchEnded, t.__pointerPosition, t.__previousState = "closed", t.__size, t.__options, t.__initialROS || t.__instance.option("repositionOnScroll", !0), t.__optionsFormat(), t.__instance._on("destroy." + t.__namespace, function() {
                    t.__destroy()
                }), t.__instance._on("options." + t.__namespace, function() {
                    t.__optionsFormat()
                }), t.__instance._on("reposition." + t.__namespace, function(e) {
                    t.__reposition(e.event, e.helper)
                }), t.__instance._on("start." + t.__namespace, function(e) {
                    t.__instance._$origin.on("mousemove." + t.__namespace, function(e) {
                        t.__latestMouseEvent = e
                    })
                }), t.__instance._one("startend." + t.__namespace + " startcancel." + t.__namespace, function(e) {
                    t.__instance._$origin.off("mousemove." + t.__namespace), "startcancel" == e.type && (t.__latestMouseEvent = null)
                }), t.__instance._on("state." + t.__namespace, function(e) {
                    "closed" == e.state ? t.__close() : "appearing" == e.state && "closed" == t.__previousState && t.__create(), t.__previousState = e.state
                }), t
            },
            __close: function() {
                return "object" == typeof this.__instance.content() && null !== this.__instance.content() && this.__instance.content().detach(), this.__instance._$tooltip.remove(), this.__instance._$tooltip = null, e(e.tooltipster._env.window.document).off("." + this.__namespace), this.__latestMouseEvent = null, this
            },
            __create: function() {
                var t = this,
                    i = e('<div class="tooltipster-base tooltipster-follower"><div class="tooltipster-box"><div class="tooltipster-content"></div></div></div>'),
                    n = e(e.tooltipster._env.window.document);
                return t.__options.minWidth && i.css("min-width", t.__options.minWidth + "px"), t.__options.maxWidth && i.css("max-width", t.__options.maxWidth + "px"), t.__instance._$tooltip = i, t.__displayed = !1, t.__openingTouchEnded = !1, n.on("mousemove." + t.__namespace, function(e) {
                    t.__openingTouchEnded && t.__displayed || t.__follow(e)
                }), t.__instance.option("triggerClose").tap && n.on("touchend." + t.__namespace + " touchcancel." + t.__namespace, function(e) {
                    t.__openingTouchEnded = !0
                }), t.__instance._trigger("created"), t
            },
            __destroy: function() {
                return this.__instance._off("." + this.__namespace), this.__initialROS || this.__instance.option("repositionOnScroll", !1), this
            },
            __follow: function(t) {
                if (t ? this.__latestMouseEvent = t : this.__latestMouseEvent && (t = this.__latestMouseEvent), t) {
                    this.__displayed = !0;
                    var i = {},
                        n = this.__options.anchor,
                        a = e.merge([], this.__options.offset);
                    switch (this.__helper.geo.window.scroll = {
                        left: e.tooltipster._env.window.scrollX || e.tooltipster._env.window.document.documentElement.scrollLeft,
                        top: e.tooltipster._env.window.scrollY || e.tooltipster._env.window.document.documentElement.scrollTop
                    }, n) {
                        case "top-left":
                        case "left-center":
                        case "bottom-left":
                            i.left = t.pageX + a[0];
                            break;
                        case "top-center":
                        case "bottom-center":
                            i.left = t.pageX + a[0] - this.__size.width / 2;
                            break;
                        case "top-right":
                        case "right-center":
                        case "bottom-right":
                            i.left = t.pageX + a[0] - this.__size.width;
                            break;
                        default:
                            console.log("Wrong anchor value")
                    }
                    switch (n) {
                        case "top-left":
                        case "top-center":
                        case "top-right":
                            i.top = t.pageY - a[1];
                            break;
                        case "left-center":
                        case "right-center":
                            i.top = t.pageY - a[1] - this.__size.height / 2;
                            break;
                        case "bottom-left":
                        case "bottom-center":
                        case "bottom-right":
                            i.top = t.pageY - a[1] - this.__size.height
                    }
                    if ("left-center" == n || "right-center" == n) {
                        if ("right-center" == n) i.left < this.__helper.geo.window.scroll.left && (t.pageX - a[0] + this.__size.width <= this.__helper.geo.window.scroll.left + this.__helper.geo.window.size.width ? (n = "left-center", a[0] = -a[0], i.left = t.pageX + a[0]) : (n = "top-right", a[1] = a[0], i = {
                            left: 0,
                            top: t.pageY - a[1]
                        }));
                        else if (i.left + this.__size.width > this.__helper.geo.window.scroll.left + this.__helper.geo.window.size.width) {
                            var r = t.pageX - a[0] - this.__size.width;
                            r >= 0 ? (n = "right-center", a[0] = -a[0], i.left = r) : (n = "top-left", a[1] = -a[0], i = {
                                left: t.pageX + a[0],
                                top: t.pageY - a[1]
                            })
                        }
                        i.top + this.__size.height > this.__helper.geo.window.scroll.top + this.__helper.geo.window.size.height && (i.top = this.__helper.geo.window.scroll.top + this.__helper.geo.window.size.height - this.__size.height), i.top < this.__helper.geo.window.scroll.top && (i.top = this.__helper.geo.window.scroll.top), i.top + this.__size.height > this.__helper.geo.document.size.height && (i.top = this.__helper.geo.document.size.height - this.__size.height), i.top < 0 && (i.top = 0)
                    }
                    if ("left-center" != n && "right-center" != n) {
                        i.left + this.__size.width > this.__helper.geo.window.scroll.left + this.__helper.geo.window.size.width && (i.left = this.__helper.geo.window.scroll.left + this.__helper.geo.window.size.width - this.__size.width), i.left < 0 && (i.left = 0);
                        var s = t.pageY - this.__helper.geo.window.scroll.top;
                        if (0 == n.indexOf("bottom")) i.top < this.__helper.geo.window.scroll.top && (i.top < 0 || s < this.__helper.geo.window.size.height - s && t.pageY + a[1] + this.__size.height <= this.__helper.geo.document.size.height) && (i.top = t.pageY + a[1]);
                        else if (i.top + this.__size.height > this.__helper.geo.window.scroll.top + this.__helper.geo.window.size.height && (s > this.__helper.geo.window.size.height - s || s - a[1] + this.__size.height <= this.__helper.geo.document.size.height)) {
                            var o = t.pageY + a[1] - this.__size.height;
                            o >= 0 && (i.top = o)
                        }
                    }
                    this.__helper.geo.origin.fixedLineage && (i.left -= this.__helper.geo.window.scroll.left, i.top -= this.__helper.geo.window.scroll.top);
                    var d = {
                        coord: i
                    };
                    this.__instance._trigger({
                        edit: function(e) {
                            d = e
                        },
                        event: t,
                        helper: this.__helper,
                        position: e.extend(!0, {}, d),
                        type: "follow"
                    }), this.__instance._$tooltip.css({
                        left: d.coord.left,
                        top: d.coord.top
                    }).show()
                } else this.__instance._$tooltip.hide();
                return this
            },
            __optionsFormat: function() {
                return this.__options = this.__instance._optionsExtract(t, this.__defaults()), this
            },
            __reposition: function(t, i) {
                var n = this,
                    a = n.__instance._$tooltip.clone(),
                    r = e.tooltipster._getRuler(a),
                    s = n.__instance.option("animation");
                s && a.removeClass("tooltipster-" + s);
                var o = {
                    size: r.free().measure().size
                };
                i.geo.origin.fixedLineage ? n.__instance._$tooltip.css("position", "fixed") : n.__instance._$tooltip.css("position", ""), n.__instance._trigger({
                    edit: function(e) {
                        o = e
                    },
                    event: t,
                    helper: i,
                    position: e.extend(!0, {}, o),
                    tooltipClone: a[0],
                    type: "position"
                }), r.destroy(), n.__helper = i, n.__size = o.size, n.__instance._$tooltip.css({
                    height: o.size.height,
                    width: o.size.width
                });
                var d = e.tooltipster._env.IE && "click" === t.type ? t : null;
                return n.__follow(d), n.__instance._$tooltip.appendTo(n.__instance.option("parent")), n.__instance._trigger({
                    type: "repositioned",
                    event: t,
                    position: {
                        coord: {
                            left: 0,
                            top: 0
                        },
                        size: o.size
                    }
                }), this
            }
        }
    }), e
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    (t = function() {
        var t = 0;
        return function(i, n) {
            var a, r = this;
            r.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(i),
                appendDots: e(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, r.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(i), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, a = e(i).data("slick") || {}, r.options = e.extend({}, r.defaults, n, a), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = t++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, t.prototype.addSlide = t.prototype.slickAdd = function(t, i, n) {
        var a = this;
        if ("boolean" == typeof i) n = i, i = null;
        else if (i < 0 || i >= a.slideCount) return !1;
        a.unload(), "number" == typeof i ? 0 === i && 0 === a.$slides.length ? e(t).appendTo(a.$slideTrack) : n ? e(t).insertBefore(a.$slides.eq(i)) : e(t).insertAfter(a.$slides.eq(i)) : !0 === n ? e(t).prependTo(a.$slideTrack) : e(t).appendTo(a.$slideTrack), a.$slides = a.$slideTrack.children(this.options.slide), a.$slideTrack.children(this.options.slide).detach(), a.$slideTrack.append(a.$slides), a.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t)
        }), a.$slidesCache = a.$slides, a.reinit()
    }, t.prototype.animateHeight = function() {
        var e = this;
        if (!0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, t.prototype.animateSlide = function(t, i) {
        var n = {},
            a = this;
        a.animateHeight(), !0 === a.options.rtl && !1 === a.options.vertical && (t = -t), !1 === a.transformsEnabled ? !1 === a.options.vertical ? a.$slideTrack.animate({
            left: t
        }, a.options.speed, a.options.easing, i) : a.$slideTrack.animate({
            top: t
        }, a.options.speed, a.options.easing, i) : !1 === a.cssTransitions ? (!0 === a.options.rtl && (a.currentLeft = -a.currentLeft), e({
            animStart: a.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: a.options.speed,
            easing: a.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === a.options.vertical ? (n[a.animType] = "translate(" + e + "px, 0px)", a.$slideTrack.css(n)) : (n[a.animType] = "translate(0px," + e + "px)", a.$slideTrack.css(n))
            },
            complete: function() {
                i && i.call()
            }
        })) : (a.applyTransition(), t = Math.ceil(t), !1 === a.options.vertical ? n[a.animType] = "translate3d(" + t + "px, 0px, 0px)" : n[a.animType] = "translate3d(0px," + t + "px, 0px)", a.$slideTrack.css(n), i && setTimeout(function() {
            a.disableTransition(), i.call()
        }, a.options.speed))
    }, t.prototype.getNavTarget = function() {
        var t = this.options.asNavFor;
        return t && null !== t && (t = e(t).not(this.$slider)), t
    }, t.prototype.asNavFor = function(t) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, t.prototype.buildDots = function() {
        var t, i, n = this;
        if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
            for (n.$slider.addClass("slick-dotted"), i = e("<ul />").addClass(n.options.dotsClass), t = 0; t <= n.getDotCount(); t += 1) i.append(e("<li />").append(n.options.customPaging.call(this, n, t)));
            n.$dots = i.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
        var e, t, i, n, a, r, s, o = this;
        if (n = document.createDocumentFragment(), r = o.$slider.children(), o.options.rows > 1) {
            for (s = o.options.slidesPerRow * o.options.rows, a = Math.ceil(r.length / s), e = 0; e < a; e++) {
                var d = document.createElement("div");
                for (t = 0; t < o.options.rows; t++) {
                    var u = document.createElement("div");
                    for (i = 0; i < o.options.slidesPerRow; i++) {
                        var l = e * s + (t * o.options.slidesPerRow + i);
                        r.get(l) && u.appendChild(r.get(l))
                    }
                    d.appendChild(u)
                }
                n.appendChild(d)
            }
            o.$slider.empty().append(n), o.$slider.children().children().children().css({
                width: 100 / o.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function(t, i) {
        var n, a, r, s = this,
            o = !1,
            d = s.$slider.width(),
            u = window.innerWidth || e(window).width();
        if ("window" === s.respondTo ? r = u : "slider" === s.respondTo ? r = d : "min" === s.respondTo && (r = Math.min(u, d)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
            for (n in a = null, s.breakpoints) s.breakpoints.hasOwnProperty(n) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[n] && (a = s.breakpoints[n]) : r > s.breakpoints[n] && (a = s.breakpoints[n]));
            null !== a ? null !== s.activeBreakpoint ? (a !== s.activeBreakpoint || i) && (s.activeBreakpoint = a, "unslick" === s.breakpointSettings[a] ? s.unslick(a) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[a]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), o = a) : (s.activeBreakpoint = a, "unslick" === s.breakpointSettings[a] ? s.unslick(a) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[a]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), o = a) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t), o = a), t || !1 === o || s.$slider.trigger("breakpoint", [s, o])
        }
    }, t.prototype.changeSlide = function(t, i) {
        var n, a, r = this,
            s = e(t.currentTarget);
        switch (s.is("a") && t.preventDefault(), s.is("li") || (s = s.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
            case "previous":
                a = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - a, !1, i);
                break;
            case "next":
                a = 0 === n ? r.options.slidesToScroll : n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + a, !1, i);
                break;
            case "index":
                var o = 0 === t.data.index ? 0 : t.data.index || s.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(o), !1, i), s.children().trigger("focus");
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function(e) {
        var t, i;
        if (i = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
        else
            for (var n in t) {
                if (e < t[n]) {
                    e = i;
                    break
                }
                i = t[n]
            }
        return e
    }, t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), e(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, t || i.$slider.trigger("destroy", [i])
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            i = {};
        i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function() {
            i.disableTransition(e), t.call()
        }, i.options.speed))
    }, t.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
            i.stopImmediatePropagation();
            var n = e(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = n.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            i = 0,
            n = 0;
        if (!0 === e.options.infinite)
            for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) n = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return n - 1
    }, t.prototype.getLeft = function(e) {
        var t, i, n, a = this,
            r = 0;
        return a.slideOffset = 0, i = a.$slides.first().outerHeight(!0), !0 === a.options.infinite ? (a.slideCount > a.options.slidesToShow && (a.slideOffset = a.slideWidth * a.options.slidesToShow * -1, r = i * a.options.slidesToShow * -1), a.slideCount % a.options.slidesToScroll != 0 && e + a.options.slidesToScroll > a.slideCount && a.slideCount > a.options.slidesToShow && (e > a.slideCount ? (a.slideOffset = (a.options.slidesToShow - (e - a.slideCount)) * a.slideWidth * -1, r = (a.options.slidesToShow - (e - a.slideCount)) * i * -1) : (a.slideOffset = a.slideCount % a.options.slidesToScroll * a.slideWidth * -1, r = a.slideCount % a.options.slidesToScroll * i * -1))) : e + a.options.slidesToShow > a.slideCount && (a.slideOffset = (e + a.options.slidesToShow - a.slideCount) * a.slideWidth, r = (e + a.options.slidesToShow - a.slideCount) * i), a.slideCount <= a.options.slidesToShow && (a.slideOffset = 0, r = 0), !0 === a.options.centerMode && a.slideCount <= a.options.slidesToShow ? a.slideOffset = a.slideWidth * Math.floor(a.options.slidesToShow) / 2 - a.slideWidth * a.slideCount / 2 : !0 === a.options.centerMode && !0 === a.options.infinite ? a.slideOffset += a.slideWidth * Math.floor(a.options.slidesToShow / 2) - a.slideWidth : !0 === a.options.centerMode && (a.slideOffset = 0, a.slideOffset += a.slideWidth * Math.floor(a.options.slidesToShow / 2)), t = !1 === a.options.vertical ? e * a.slideWidth * -1 + a.slideOffset : e * i * -1 + r, !0 === a.options.variableWidth && (n = a.slideCount <= a.options.slidesToShow || !1 === a.options.infinite ? a.$slideTrack.children(".slick-slide").eq(e) : a.$slideTrack.children(".slick-slide").eq(e + a.options.slidesToShow), t = !0 === a.options.rtl ? n[0] ? -1 * (a.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === a.options.centerMode && (n = a.slideCount <= a.options.slidesToShow || !1 === a.options.infinite ? a.$slideTrack.children(".slick-slide").eq(e) : a.$slideTrack.children(".slick-slide").eq(e + a.options.slidesToShow + 1), t = !0 === a.options.rtl ? n[0] ? -1 * (a.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, t += (a.$list.width() - n.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        return this.options[e]
    }, t.prototype.getNavigableIndexes = function() {
        var e, t = this,
            i = 0,
            n = 0,
            a = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, n = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); i < e;) a.push(i), i = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return a
    }, t.prototype.getSlick = function() {
        return this
    }, t.prototype.getSlideCount = function() {
        var t, i, n = this;
        return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(a, r) {
            var s = r.offsetLeft;
            if (n.options.vertical && (s = r.offsetTop), s - i + e(r).outerWidth() / 2 > -1 * n.swipeLeft) return t = r, !1
        }), Math.abs(e(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, t.prototype.init = function(t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
    }, t.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            e(this).attr("role", "option");
            var n = t.options.centerMode ? i : Math.floor(i / t.options.slidesToShow);
            !0 === t.options.dots && e(this).attr("aria-describedby", "slick-slide" + t.instanceUid + n)
        }), null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(i) {
            e(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + t.instanceUid + i,
                id: "slick-slide" + t.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).ready(t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }, t.prototype.lazyLoad = function() {
        var t, i, n, a = this;

        function r(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this),
                    i = e(this).attr("data-lazy"),
                    n = e(this).attr("data-srcset"),
                    r = e(this).attr("data-sizes") || a.$slider.attr("data-sizes"),
                    s = document.createElement("img");
                s.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        n && (t.attr("srcset", n), r && t.attr("sizes", r)), t.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), a.$slider.trigger("lazyLoaded", [a, t, i])
                    })
                }, s.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, t, i])
                }, s.src = i
            })
        }
        if (!0 === a.options.centerMode ? !0 === a.options.infinite ? n = (i = a.currentSlide + (a.options.slidesToShow / 2 + 1)) + a.options.slidesToShow + 2 : (i = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1)), n = a.options.slidesToShow / 2 + 1 + 2 + a.currentSlide) : (i = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide, n = Math.ceil(i + a.options.slidesToShow), !0 === a.options.fade && (i > 0 && i--, n <= a.slideCount && n++)), t = a.$slider.find(".slick-slide").slice(i, n), "anticipated" === a.options.lazyLoad)
            for (var s = i - 1, o = n, d = a.$slider.find(".slick-slide"), u = 0; u < a.options.slidesToScroll; u++) s < 0 && (s = a.slideCount - 1), t = (t = t.add(d.eq(s))).add(d.eq(o)), s--, o++;
        r(t), a.slideCount <= a.options.slidesToShow ? r(a.$slider.find(".slick-slide")) : a.currentSlide >= a.slideCount - a.options.slidesToShow ? r(a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow)) : 0 === a.currentSlide && r(a.$slider.find(".slick-cloned").slice(-1 * a.options.slidesToShow))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && t.initADA())
    }, t.prototype.prev = t.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var i, n, a, r, s, o = this,
            d = e("img[data-lazy]", o.$slider);
        d.length ? (i = d.first(), n = i.attr("data-lazy"), a = i.attr("data-srcset"), r = i.attr("data-sizes") || o.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
            a && (i.attr("srcset", a), r && i.attr("sizes", r)), i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === o.options.adaptiveHeight && o.setPosition(), o.$slider.trigger("lazyLoaded", [o, i, n]), o.progressiveLazyLoad()
        }, s.onerror = function() {
            t < 3 ? setTimeout(function() {
                o.progressiveLazyLoad(t + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), o.$slider.trigger("lazyLoadError", [o, i, n]), o.progressiveLazyLoad())
        }, s.src = n) : o.$slider.trigger("allImagesLoaded", [o])
    }, t.prototype.refresh = function(t) {
        var i, n, a = this;
        n = a.slideCount - a.options.slidesToShow, !a.options.infinite && a.currentSlide > n && (a.currentSlide = n), a.slideCount <= a.options.slidesToShow && (a.currentSlide = 0), i = a.currentSlide, a.destroy(!0), e.extend(a, a.initials, {
            currentSlide: i
        }), a.init(), t || a.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, t.prototype.registerBreakpoints = function() {
        var t, i, n, a = this,
            r = a.options.responsive || null;
        if ("array" === e.type(r) && r.length) {
            for (t in a.respondTo = a.options.respondTo || "window", r)
                if (n = a.breakpoints.length - 1, r.hasOwnProperty(t)) {
                    for (i = r[t].breakpoint; n >= 0;) a.breakpoints[n] && a.breakpoints[n] === i && a.breakpoints.splice(n, 1), n--;
                    a.breakpoints.push(i), a.breakpointSettings[i] = r[t].settings
                }
            a.breakpoints.sort(function(e, t) {
                return a.options.mobileFirst ? e - t : t - e
            })
        }
    }, t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
        var n = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e, n.slideCount < 1 || e < 0 || e > n.slideCount - 1) return !1;
        n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(e).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
    }, t.prototype.setCSS = function(e) {
        var t, i, n = this,
            a = {};
        !0 === n.options.rtl && (e = -e), t = "left" == n.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(e) + "px" : "0px", a[n.positionProp] = e, !1 === n.transformsEnabled ? n.$slideTrack.css(a) : (a = {}, !1 === n.cssTransitions ? (a[n.animType] = "translate(" + t + ", " + i + ")", n.$slideTrack.css(a)) : (a[n.animType] = "translate3d(" + t + ", " + i + ", 0px)", n.$slideTrack.css(a)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
        var t, i = this;
        i.$slides.each(function(n, a) {
            t = i.slideWidth * n * -1, !0 === i.options.rtl ? e(a).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : e(a).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, t.prototype.setHeight = function() {
        var e = this;
        if (!0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, i, n, a, r, s = this,
            o = !1;
        if ("object" === e.type(arguments[0]) ? (n = arguments[0], o = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (n = arguments[0], a = arguments[1], o = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) s.options[n] = a;
        else if ("multiple" === r) e.each(n, function(e, t) {
            s.options[e] = t
        });
        else if ("responsive" === r)
            for (i in a)
                if ("array" !== e.type(s.options.responsive)) s.options.responsive = [a[i]];
                else {
                    for (t = s.options.responsive.length - 1; t >= 0;) s.options.responsive[t].breakpoint === a[i].breakpoint && s.options.responsive.splice(t, 1), t--;
                    s.options.responsive.push(a[i])
                }
        o && (s.unload(), s.reinit())
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, t.prototype.setSlideClasses = function(e) {
        var t, i, n, a, r = this;
        i = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode ? (t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = r.options.slidesToShow + e, i.slice(n - t + 1, n + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && i.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= r.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (a = r.slideCount % r.options.slidesToShow, n = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? i.slice(n - (r.options.slidesToShow - a), n + a).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t, i, n, a = this;
        if (!0 === a.options.fade && (a.options.centerMode = !1), !0 === a.options.infinite && !1 === a.options.fade && (i = null, a.slideCount > a.options.slidesToShow)) {
            for (n = !0 === a.options.centerMode ? a.options.slidesToShow + 1 : a.options.slidesToShow, t = a.slideCount; t > a.slideCount - n; t -= 1) i = t - 1, e(a.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - a.slideCount).prependTo(a.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < n; t += 1) i = t, e(a.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + a.slideCount).appendTo(a.$slideTrack).addClass("slick-cloned");
            a.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }, t.prototype.interrupt = function(e) {
        e || this.autoPlay(), this.interrupted = e
    }, t.prototype.selectHandler = function(t) {
        var i = this,
            n = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            a = parseInt(n.attr("data-slick-index"));
        if (a || (a = 0), i.slideCount <= i.options.slidesToShow) return i.setSlideClasses(a), void i.asNavFor(a);
        i.slideHandler(a)
    }, t.prototype.slideHandler = function(e, t, i) {
        var n, a, r, s, o, d, u = this;
        if (t = t || !1, (!0 !== u.animating || !0 !== u.options.waitForAnimate) && !(!0 === u.options.fade && u.currentSlide === e || u.slideCount <= u.options.slidesToShow))
            if (!1 === t && u.asNavFor(e), n = e, o = u.getLeft(n), s = u.getLeft(u.currentSlide), u.currentLeft = null === u.swipeLeft ? s : u.swipeLeft, !1 === u.options.infinite && !1 === u.options.centerMode && (e < 0 || e > u.getDotCount() * u.options.slidesToScroll)) !1 === u.options.fade && (n = u.currentSlide, !0 !== i ? u.animateSlide(s, function() {
                u.postSlide(n)
            }) : u.postSlide(n));
            else if (!1 === u.options.infinite && !0 === u.options.centerMode && (e < 0 || e > u.slideCount - u.options.slidesToScroll)) !1 === u.options.fade && (n = u.currentSlide, !0 !== i ? u.animateSlide(s, function() {
            u.postSlide(n)
        }) : u.postSlide(n));
        else {
            if (u.options.autoplay && clearInterval(u.autoPlayTimer), a = n < 0 ? u.slideCount % u.options.slidesToScroll != 0 ? u.slideCount - u.slideCount % u.options.slidesToScroll : u.slideCount + n : n >= u.slideCount ? u.slideCount % u.options.slidesToScroll != 0 ? 0 : n - u.slideCount : n, u.animating = !0, u.$slider.trigger("beforeChange", [u, u.currentSlide, a]), r = u.currentSlide, u.currentSlide = a, u.setSlideClasses(u.currentSlide), u.options.asNavFor && (d = (d = u.getNavTarget()).slick("getSlick")).slideCount <= d.options.slidesToShow && d.setSlideClasses(u.currentSlide), u.updateDots(), u.updateArrows(), !0 === u.options.fade) return !0 !== i ? (u.fadeSlideOut(r), u.fadeSlide(a, function() {
                u.postSlide(a)
            })) : u.postSlide(a), void u.animateHeight();
            !0 !== i ? u.animateSlide(o, function() {
                u.postSlide(a)
            }) : u.postSlide(a)
        }
    }, t.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, i, n, a = this;
        return e = a.touchObject.startX - a.touchObject.curX, t = a.touchObject.startY - a.touchObject.curY, i = Math.atan2(t, e), (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? !1 === a.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === a.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === a.options.rtl ? "right" : "left" : !0 === a.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
        var t, i, n = this;
        if (n.dragging = !1, n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
                case "left":
                case "down":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t, i, n, a, r, s = this;
        return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!s.dragging || r && 1 !== r.length) && (t = s.getLeft(s.currentSlide), s.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, s.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curX - s.touchObject.startX, 2))), !0 === s.options.verticalSwiping && (s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curY - s.touchObject.startY, 2)))), "vertical" !== (i = s.swipeDirection()) ? (void 0 !== e.originalEvent && s.touchObject.swipeLength > 4 && e.preventDefault(), a = (!1 === s.options.rtl ? 1 : -1) * (s.touchObject.curX > s.touchObject.startX ? 1 : -1), !0 === s.options.verticalSwiping && (a = s.touchObject.curY > s.touchObject.startY ? 1 : -1), n = s.touchObject.swipeLength, s.touchObject.edgeHit = !1, !1 === s.options.infinite && (0 === s.currentSlide && "right" === i || s.currentSlide >= s.getDotCount() && "left" === i) && (n = s.touchObject.swipeLength * s.options.edgeFriction, s.touchObject.edgeHit = !0), !1 === s.options.vertical ? s.swipeLeft = t + n * a : s.swipeLeft = t + n * (s.$list.height() / s.listWidth) * a, !0 === s.options.verticalSwiping && (s.swipeLeft = t + n * a), !0 !== s.options.fade && !1 !== s.options.touchMove && (!0 === s.animating ? (s.swipeLeft = null, !1) : void s.setCSS(s.swipeLeft))) : void 0)
    }, t.prototype.swipeStart = function(e) {
        var t, i = this;
        if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function() {
        var e, i, n = this,
            a = arguments[0],
            r = Array.prototype.slice.call(arguments, 1),
            s = n.length;
        for (e = 0; e < s; e++)
            if ("object" == typeof a || void 0 === a ? n[e].slick = new t(n[e], a) : i = n[e].slick[a].apply(n[e].slick, r), void 0 !== i) return i;
        return n
    }
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";
    var e, t;

    function i() {
        return e.apply(null, arguments)
    }

    function n(e) {
        return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
    }

    function a(e) {
        return null != e && "[object Object]" === Object.prototype.toString.call(e)
    }

    function r(e) {
        return void 0 === e
    }

    function s(e) {
        return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
    }

    function o(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    }

    function d(e, t) {
        var i, n = [];
        for (i = 0; i < e.length; ++i) n.push(t(e[i], i));
        return n
    }

    function u(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function l(e, t) {
        for (var i in t) u(t, i) && (e[i] = t[i]);
        return u(t, "toString") && (e.toString = t.toString), u(t, "valueOf") && (e.valueOf = t.valueOf), e
    }

    function c(e, t, i, n) {
        return Yt(e, t, i, n, !0).utc()
    }

    function _(e) {
        return null == e._pf && (e._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }), e._pf
    }

    function m(e) {
        if (null == e._isValid) {
            var i = _(e),
                n = t.call(i.parsedDateParts, function(e) {
                    return null != e
                }),
                a = !isNaN(e._d.getTime()) && i.overflow < 0 && !i.empty && !i.invalidMonth && !i.invalidWeekday && !i.weekdayMismatch && !i.nullInput && !i.invalidFormat && !i.userInvalidated && (!i.meridiem || i.meridiem && n);
            if (e._strict && (a = a && 0 === i.charsLeftOver && 0 === i.unusedTokens.length && void 0 === i.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return a;
            e._isValid = a
        }
        return e._isValid
    }

    function h(e) {
        var t = c(NaN);
        return null != e ? l(_(t), e) : _(t).userInvalidated = !0, t
    }
    t = Array.prototype.some ? Array.prototype.some : function(e) {
        for (var t = Object(this), i = t.length >>> 0, n = 0; n < i; n++)
            if (n in t && e.call(this, t[n], n, t)) return !0;
        return !1
    };
    var p = i.momentProperties = [];

    function f(e, t) {
        var i, n, a;
        if (r(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), r(t._i) || (e._i = t._i), r(t._f) || (e._f = t._f), r(t._l) || (e._l = t._l), r(t._strict) || (e._strict = t._strict), r(t._tzm) || (e._tzm = t._tzm), r(t._isUTC) || (e._isUTC = t._isUTC), r(t._offset) || (e._offset = t._offset), r(t._pf) || (e._pf = _(t)), r(t._locale) || (e._locale = t._locale), 0 < p.length)
            for (i = 0; i < p.length; i++) r(a = t[n = p[i]]) || (e[n] = a);
        return e
    }
    var g = !1;

    function y(e) {
        f(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === g && (g = !0, i.updateOffset(this), g = !1)
    }

    function M(e) {
        return e instanceof y || null != e && null != e._isAMomentObject
    }

    function v(e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
    }

    function L(e) {
        var t = +e,
            i = 0;
        return 0 !== t && isFinite(t) && (i = v(t)), i
    }

    function w(e, t, i) {
        var n, a = Math.min(e.length, t.length),
            r = Math.abs(e.length - t.length),
            s = 0;
        for (n = 0; n < a; n++)(i && e[n] !== t[n] || !i && L(e[n]) !== L(t[n])) && s++;
        return s + r
    }

    function b(e) {
        !1 === i.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
    }

    function k(e, t) {
        var n = !0;
        return l(function() {
            if (null != i.deprecationHandler && i.deprecationHandler(null, e), n) {
                for (var a, r = [], s = 0; s < arguments.length; s++) {
                    if (a = "", "object" == typeof arguments[s]) {
                        for (var o in a += "\n[" + s + "] ", arguments[0]) a += o + ": " + arguments[0][o] + ", ";
                        a = a.slice(0, -2)
                    } else a = arguments[s];
                    r.push(a)
                }
                b(e + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), n = !1
            }
            return t.apply(this, arguments)
        }, t)
    }
    var Y, T = {};

    function D(e, t) {
        null != i.deprecationHandler && i.deprecationHandler(e, t), T[e] || (b(t), T[e] = !0)
    }

    function A(e) {
        return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
    }

    function S(e, t) {
        var i, n = l({}, e);
        for (i in t) u(t, i) && (a(e[i]) && a(t[i]) ? (n[i] = {}, l(n[i], e[i]), l(n[i], t[i])) : null != t[i] ? n[i] = t[i] : delete n[i]);
        for (i in e) u(e, i) && !u(t, i) && a(e[i]) && (n[i] = l({}, n[i]));
        return n
    }

    function x(e) {
        null != e && this.set(e)
    }
    i.suppressDeprecationWarnings = !1, i.deprecationHandler = null, Y = Object.keys ? Object.keys : function(e) {
        var t, i = [];
        for (t in e) u(e, t) && i.push(t);
        return i
    };
    var E = {};

    function H(e, t) {
        var i = e.toLowerCase();
        E[i] = E[i + "s"] = E[t] = e
    }

    function O(e) {
        return "string" == typeof e ? E[e] || E[e.toLowerCase()] : void 0
    }

    function C(e) {
        var t, i, n = {};
        for (i in e) u(e, i) && (t = O(i)) && (n[t] = e[i]);
        return n
    }
    var P = {};

    function z(e, t) {
        P[e] = t
    }

    function j(e, t, i) {
        var n = "" + Math.abs(e),
            a = t - n.length;
        return (0 <= e ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + n
    }
    var R = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        I = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        F = {},
        $ = {};

    function N(e, t, i, n) {
        var a = n;
        "string" == typeof n && (a = function() {
            return this[n]()
        }), e && ($[e] = a), t && ($[t[0]] = function() {
            return j(a.apply(this, arguments), t[1], t[2])
        }), i && ($[i] = function() {
            return this.localeData().ordinal(a.apply(this, arguments), e)
        })
    }

    function W(e, t) {
        return e.isValid() ? (t = B(t, e.localeData()), F[t] = F[t] || function(e) {
            var t, i, n, a = e.match(R);
            for (t = 0, i = a.length; t < i; t++) $[a[t]] ? a[t] = $[a[t]] : a[t] = (n = a[t]).match(/\[[\s\S]/) ? n.replace(/^\[|\]$/g, "") : n.replace(/\\/g, "");
            return function(t) {
                var n, r = "";
                for (n = 0; n < i; n++) r += A(a[n]) ? a[n].call(t, e) : a[n];
                return r
            }
        }(t), F[t](e)) : e.localeData().invalidDate()
    }

    function B(e, t) {
        var i = 5;

        function n(e) {
            return t.longDateFormat(e) || e
        }
        for (I.lastIndex = 0; 0 <= i && I.test(e);) e = e.replace(I, n), I.lastIndex = 0, i -= 1;
        return e
    }
    var U = /\d/,
        q = /\d\d/,
        G = /\d{3}/,
        J = /\d{4}/,
        V = /[+-]?\d{6}/,
        X = /\d\d?/,
        K = /\d\d\d\d?/,
        Z = /\d\d\d\d\d\d?/,
        Q = /\d{1,3}/,
        ee = /\d{1,4}/,
        te = /[+-]?\d{1,6}/,
        ie = /\d+/,
        ne = /[+-]?\d+/,
        ae = /Z|[+-]\d\d:?\d\d/gi,
        re = /Z|[+-]\d\d(?::?\d\d)?/gi,
        se = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        oe = {};

    function de(e, t, i) {
        oe[e] = A(t) ? t : function(e, n) {
            return e && i ? i : t
        }
    }

    function ue(e, t) {
        return u(oe, e) ? oe[e](t._strict, t._locale) : new RegExp(le(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, i, n, a) {
            return t || i || n || a
        })))
    }

    function le(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    var ce = {};

    function _e(e, t) {
        var i, n = t;
        for ("string" == typeof e && (e = [e]), s(t) && (n = function(e, i) {
                i[t] = L(e)
            }), i = 0; i < e.length; i++) ce[e[i]] = n
    }

    function me(e, t) {
        _e(e, function(e, i, n, a) {
            n._w = n._w || {}, t(e, n._w, n, a)
        })
    }
    var he = 0,
        pe = 1,
        fe = 2,
        ge = 3,
        ye = 4,
        Me = 5,
        ve = 6,
        Le = 7,
        we = 8;

    function be(e) {
        return ke(e) ? 366 : 365
    }

    function ke(e) {
        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
    }
    N("Y", 0, 0, function() {
        var e = this.year();
        return e <= 9999 ? "" + e : "+" + e
    }), N(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), N(0, ["YYYY", 4], 0, "year"), N(0, ["YYYYY", 5], 0, "year"), N(0, ["YYYYYY", 6, !0], 0, "year"), H("year", "y"), z("year", 1), de("Y", ne), de("YY", X, q), de("YYYY", ee, J), de("YYYYY", te, V), de("YYYYYY", te, V), _e(["YYYYY", "YYYYYY"], he), _e("YYYY", function(e, t) {
        t[he] = 2 === e.length ? i.parseTwoDigitYear(e) : L(e)
    }), _e("YY", function(e, t) {
        t[he] = i.parseTwoDigitYear(e)
    }), _e("Y", function(e, t) {
        t[he] = parseInt(e, 10)
    }), i.parseTwoDigitYear = function(e) {
        return L(e) + (68 < L(e) ? 1900 : 2e3)
    };
    var Ye, Te = De("FullYear", !0);

    function De(e, t) {
        return function(n) {
            return null != n ? (Se(this, e, n), i.updateOffset(this, t), this) : Ae(this, e)
        }
    }

    function Ae(e, t) {
        return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
    }

    function Se(e, t, i) {
        e.isValid() && !isNaN(i) && ("FullYear" === t && ke(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](i, e.month(), xe(i, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](i))
    }

    function xe(e, t) {
        if (isNaN(e) || isNaN(t)) return NaN;
        var i = (t % 12 + 12) % 12;
        return e += (t - i) / 12, 1 === i ? ke(e) ? 29 : 28 : 31 - i % 7 % 2
    }
    Ye = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
        var t;
        for (t = 0; t < this.length; ++t)
            if (this[t] === e) return t;
        return -1
    }, N("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), N("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }), N("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }), H("month", "M"), z("month", 8), de("M", X), de("MM", X, q), de("MMM", function(e, t) {
        return t.monthsShortRegex(e)
    }), de("MMMM", function(e, t) {
        return t.monthsRegex(e)
    }), _e(["M", "MM"], function(e, t) {
        t[pe] = L(e) - 1
    }), _e(["MMM", "MMMM"], function(e, t, i, n) {
        var a = i._locale.monthsParse(e, n, i._strict);
        null != a ? t[pe] = a : _(i).invalidMonth = e
    });
    var Ee = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        He = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        Oe = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

    function Ce(e, t) {
        var i;
        if (!e.isValid()) return e;
        if ("string" == typeof t)
            if (/^\d+$/.test(t)) t = L(t);
            else if (!s(t = e.localeData().monthsParse(t))) return e;
        return i = Math.min(e.date(), xe(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, i), e
    }

    function Pe(e) {
        return null != e ? (Ce(this, e), i.updateOffset(this, !0), this) : Ae(this, "Month")
    }
    var ze = se,
        je = se;

    function Re() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, i, n = [],
            a = [],
            r = [];
        for (t = 0; t < 12; t++) i = c([2e3, t]), n.push(this.monthsShort(i, "")), a.push(this.months(i, "")), r.push(this.months(i, "")), r.push(this.monthsShort(i, ""));
        for (n.sort(e), a.sort(e), r.sort(e), t = 0; t < 12; t++) n[t] = le(n[t]), a[t] = le(a[t]);
        for (t = 0; t < 24; t++) r[t] = le(r[t]);
        this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")
    }

    function Ie(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        return e < 100 && 0 <= e && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t
    }

    function Fe(e, t, i) {
        var n = 7 + t - i;
        return -(7 + Ie(e, 0, n).getUTCDay() - t) % 7 + n - 1
    }

    function $e(e, t, i, n, a) {
        var r, s, o = 1 + 7 * (t - 1) + (7 + i - n) % 7 + Fe(e, n, a);
        return o <= 0 ? s = be(r = e - 1) + o : o > be(e) ? (r = e + 1, s = o - be(e)) : (r = e, s = o), {
            year: r,
            dayOfYear: s
        }
    }

    function Ne(e, t, i) {
        var n, a, r = Fe(e.year(), t, i),
            s = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
        return s < 1 ? n = s + We(a = e.year() - 1, t, i) : s > We(e.year(), t, i) ? (n = s - We(e.year(), t, i), a = e.year() + 1) : (a = e.year(), n = s), {
            week: n,
            year: a
        }
    }

    function We(e, t, i) {
        var n = Fe(e, t, i),
            a = Fe(e + 1, t, i);
        return (be(e) - n + a) / 7
    }
    N("w", ["ww", 2], "wo", "week"), N("W", ["WW", 2], "Wo", "isoWeek"), H("week", "w"), H("isoWeek", "W"), z("week", 5), z("isoWeek", 5), de("w", X), de("ww", X, q), de("W", X), de("WW", X, q), me(["w", "ww", "W", "WW"], function(e, t, i, n) {
        t[n.substr(0, 1)] = L(e)
    }), N("d", 0, "do", "day"), N("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }), N("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }), N("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }), N("e", 0, 0, "weekday"), N("E", 0, 0, "isoWeekday"), H("day", "d"), H("weekday", "e"), H("isoWeekday", "E"), z("day", 11), z("weekday", 11), z("isoWeekday", 11), de("d", X), de("e", X), de("E", X), de("dd", function(e, t) {
        return t.weekdaysMinRegex(e)
    }), de("ddd", function(e, t) {
        return t.weekdaysShortRegex(e)
    }), de("dddd", function(e, t) {
        return t.weekdaysRegex(e)
    }), me(["dd", "ddd", "dddd"], function(e, t, i, n) {
        var a = i._locale.weekdaysParse(e, n, i._strict);
        null != a ? t.d = a : _(i).invalidWeekday = e
    }), me(["d", "e", "E"], function(e, t, i, n) {
        t[n] = L(e)
    });
    var Be = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        Ue = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        qe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        Ge = se,
        Je = se,
        Ve = se;

    function Xe() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, i, n, a, r, s = [],
            o = [],
            d = [],
            u = [];
        for (t = 0; t < 7; t++) i = c([2e3, 1]).day(t), n = this.weekdaysMin(i, ""), a = this.weekdaysShort(i, ""), r = this.weekdays(i, ""), s.push(n), o.push(a), d.push(r), u.push(n), u.push(a), u.push(r);
        for (s.sort(e), o.sort(e), d.sort(e), u.sort(e), t = 0; t < 7; t++) o[t] = le(o[t]), d[t] = le(d[t]), u[t] = le(u[t]);
        this._weekdaysRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")
    }

    function Ke() {
        return this.hours() % 12 || 12
    }

    function Ze(e, t) {
        N(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }

    function Qe(e, t) {
        return t._meridiemParse
    }
    N("H", ["HH", 2], 0, "hour"), N("h", ["hh", 2], 0, Ke), N("k", ["kk", 2], 0, function() {
        return this.hours() || 24
    }), N("hmm", 0, 0, function() {
        return "" + Ke.apply(this) + j(this.minutes(), 2)
    }), N("hmmss", 0, 0, function() {
        return "" + Ke.apply(this) + j(this.minutes(), 2) + j(this.seconds(), 2)
    }), N("Hmm", 0, 0, function() {
        return "" + this.hours() + j(this.minutes(), 2)
    }), N("Hmmss", 0, 0, function() {
        return "" + this.hours() + j(this.minutes(), 2) + j(this.seconds(), 2)
    }), Ze("a", !0), Ze("A", !1), H("hour", "h"), z("hour", 13), de("a", Qe), de("A", Qe), de("H", X), de("h", X), de("k", X), de("HH", X, q), de("hh", X, q), de("kk", X, q), de("hmm", K), de("hmmss", Z), de("Hmm", K), de("Hmmss", Z), _e(["H", "HH"], ge), _e(["k", "kk"], function(e, t, i) {
        var n = L(e);
        t[ge] = 24 === n ? 0 : n
    }), _e(["a", "A"], function(e, t, i) {
        i._isPm = i._locale.isPM(e), i._meridiem = e
    }), _e(["h", "hh"], function(e, t, i) {
        t[ge] = L(e), _(i).bigHour = !0
    }), _e("hmm", function(e, t, i) {
        var n = e.length - 2;
        t[ge] = L(e.substr(0, n)), t[ye] = L(e.substr(n)), _(i).bigHour = !0
    }), _e("hmmss", function(e, t, i) {
        var n = e.length - 4,
            a = e.length - 2;
        t[ge] = L(e.substr(0, n)), t[ye] = L(e.substr(n, 2)), t[Me] = L(e.substr(a)), _(i).bigHour = !0
    }), _e("Hmm", function(e, t, i) {
        var n = e.length - 2;
        t[ge] = L(e.substr(0, n)), t[ye] = L(e.substr(n))
    }), _e("Hmmss", function(e, t, i) {
        var n = e.length - 4,
            a = e.length - 2;
        t[ge] = L(e.substr(0, n)), t[ye] = L(e.substr(n, 2)), t[Me] = L(e.substr(a))
    });
    var et, tt = De("Hours", !0),
        it = {
            calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            longDateFormat: {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            invalidDate: "Invalid date",
            ordinal: "%d",
            dayOfMonthOrdinalParse: /\d{1,2}/,
            relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            months: He,
            monthsShort: Oe,
            week: {
                dow: 0,
                doy: 6
            },
            weekdays: Be,
            weekdaysMin: qe,
            weekdaysShort: Ue,
            meridiemParse: /[ap]\.?m?\.?/i
        },
        nt = {},
        at = {};

    function rt(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }

    function st(e) {
        var t = null;
        if (!nt[e] && "undefined" != typeof module && module && module.exports) try {
            t = et._abbr, require("./locale/" + e), ot(t)
        } catch (e) {}
        return nt[e]
    }

    function ot(e, t) {
        var i;
        return e && ((i = r(t) ? ut(e) : dt(e, t)) ? et = i : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), et._abbr
    }

    function dt(e, t) {
        if (null !== t) {
            var i, n = it;
            if (t.abbr = e, null != nt[e]) D("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = nt[e]._config;
            else if (null != t.parentLocale)
                if (null != nt[t.parentLocale]) n = nt[t.parentLocale]._config;
                else {
                    if (null == (i = st(t.parentLocale))) return at[t.parentLocale] || (at[t.parentLocale] = []), at[t.parentLocale].push({
                        name: e,
                        config: t
                    }), null;
                    n = i._config
                }
            return nt[e] = new x(S(n, t)), at[e] && at[e].forEach(function(e) {
                dt(e.name, e.config)
            }), ot(e), nt[e]
        }
        return delete nt[e], null
    }

    function ut(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return et;
        if (!n(e)) {
            if (t = st(e)) return t;
            e = [e]
        }
        return function(e) {
            for (var t, i, n, a, r = 0; r < e.length;) {
                for (t = (a = rt(e[r]).split("-")).length, i = (i = rt(e[r + 1])) ? i.split("-") : null; 0 < t;) {
                    if (n = st(a.slice(0, t).join("-"))) return n;
                    if (i && i.length >= t && w(a, i, !0) >= t - 1) break;
                    t--
                }
                r++
            }
            return et
        }(e)
    }

    function lt(e) {
        var t, i = e._a;
        return i && -2 === _(e).overflow && (t = i[pe] < 0 || 11 < i[pe] ? pe : i[fe] < 1 || i[fe] > xe(i[he], i[pe]) ? fe : i[ge] < 0 || 24 < i[ge] || 24 === i[ge] && (0 !== i[ye] || 0 !== i[Me] || 0 !== i[ve]) ? ge : i[ye] < 0 || 59 < i[ye] ? ye : i[Me] < 0 || 59 < i[Me] ? Me : i[ve] < 0 || 999 < i[ve] ? ve : -1, _(e)._overflowDayOfYear && (t < he || fe < t) && (t = fe), _(e)._overflowWeeks && -1 === t && (t = Le), _(e)._overflowWeekday && -1 === t && (t = we), _(e).overflow = t), e
    }

    function ct(e, t, i) {
        return null != e ? e : null != t ? t : i
    }

    function _t(e) {
        var t, n, a, r, s, o = [];
        if (!e._d) {
            var d, u;
            for (d = e, u = new Date(i.now()), a = d._useUTC ? [u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()] : [u.getFullYear(), u.getMonth(), u.getDate()], e._w && null == e._a[fe] && null == e._a[pe] && function(e) {
                    var t, i, n, a, r, s, o, d;
                    if (null != (t = e._w).GG || null != t.W || null != t.E) r = 1, s = 4, i = ct(t.GG, e._a[he], Ne(Tt(), 1, 4).year), n = ct(t.W, 1), ((a = ct(t.E, 1)) < 1 || 7 < a) && (d = !0);
                    else {
                        r = e._locale._week.dow, s = e._locale._week.doy;
                        var u = Ne(Tt(), r, s);
                        i = ct(t.gg, e._a[he], u.year), n = ct(t.w, u.week), null != t.d ? ((a = t.d) < 0 || 6 < a) && (d = !0) : null != t.e ? (a = t.e + r, (t.e < 0 || 6 < t.e) && (d = !0)) : a = r
                    }
                    n < 1 || n > We(i, r, s) ? _(e)._overflowWeeks = !0 : null != d ? _(e)._overflowWeekday = !0 : (o = $e(i, n, a, r, s), e._a[he] = o.year, e._dayOfYear = o.dayOfYear)
                }(e), null != e._dayOfYear && (s = ct(e._a[he], a[he]), (e._dayOfYear > be(s) || 0 === e._dayOfYear) && (_(e)._overflowDayOfYear = !0), n = Ie(s, 0, e._dayOfYear), e._a[pe] = n.getUTCMonth(), e._a[fe] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = o[t] = a[t];
            for (; t < 7; t++) e._a[t] = o[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[ge] && 0 === e._a[ye] && 0 === e._a[Me] && 0 === e._a[ve] && (e._nextDay = !0, e._a[ge] = 0), e._d = (e._useUTC ? Ie : function(e, t, i, n, a, r, s) {
                var o = new Date(e, t, i, n, a, r, s);
                return e < 100 && 0 <= e && isFinite(o.getFullYear()) && o.setFullYear(e), o
            }).apply(null, o), r = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[ge] = 24), e._w && void 0 !== e._w.d && e._w.d !== r && (_(e).weekdayMismatch = !0)
        }
    }
    var mt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        ht = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        pt = /Z|[+-]\d\d(?::?\d\d)?/,
        ft = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/]
        ],
        gt = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        yt = /^\/?Date\((\-?\d+)/i;

    function Mt(e) {
        var t, i, n, a, r, s, o = e._i,
            d = mt.exec(o) || ht.exec(o);
        if (d) {
            for (_(e).iso = !0, t = 0, i = ft.length; t < i; t++)
                if (ft[t][1].exec(d[1])) {
                    a = ft[t][0], n = !1 !== ft[t][2];
                    break
                }
            if (null == a) return void(e._isValid = !1);
            if (d[3]) {
                for (t = 0, i = gt.length; t < i; t++)
                    if (gt[t][1].exec(d[3])) {
                        r = (d[2] || " ") + gt[t][0];
                        break
                    }
                if (null == r) return void(e._isValid = !1)
            }
            if (!n && null != r) return void(e._isValid = !1);
            if (d[4]) {
                if (!pt.exec(d[4])) return void(e._isValid = !1);
                s = "Z"
            }
            e._f = a + (r || "") + (s || ""), bt(e)
        } else e._isValid = !1
    }
    var vt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
    var Lt = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    };

    function wt(e) {
        var t, i, n, a = vt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
        if (a) {
            var r = function(e, t, i, n, a, r) {
                var s = [function(e) {
                    var t = parseInt(e, 10);
                    return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t
                }(e), Oe.indexOf(t), parseInt(i, 10), parseInt(n, 10), parseInt(a, 10)];
                return r && s.push(parseInt(r, 10)), s
            }(a[4], a[3], a[2], a[5], a[6], a[7]);
            if (i = r, n = e, (t = a[1]) && Ue.indexOf(t) !== new Date(i[0], i[1], i[2]).getDay() && (_(n).weekdayMismatch = !0, !(n._isValid = !1))) return;
            e._a = r, e._tzm = function(e, t, i) {
                if (e) return Lt[e];
                if (t) return 0;
                var n = parseInt(i, 10),
                    a = n % 100;
                return (n - a) / 100 * 60 + a
            }(a[8], a[9], a[10]), e._d = Ie.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), _(e).rfc2822 = !0
        } else e._isValid = !1
    }

    function bt(e) {
        if (e._f !== i.ISO_8601)
            if (e._f !== i.RFC_2822) {
                e._a = [], _(e).empty = !0;
                var t, n, a, r, s, o, d, l, c = "" + e._i,
                    m = c.length,
                    h = 0;
                for (a = B(e._f, e._locale).match(R) || [], t = 0; t < a.length; t++) r = a[t], (n = (c.match(ue(r, e)) || [])[0]) && (0 < (s = c.substr(0, c.indexOf(n))).length && _(e).unusedInput.push(s), c = c.slice(c.indexOf(n) + n.length), h += n.length), $[r] ? (n ? _(e).empty = !1 : _(e).unusedTokens.push(r), o = r, l = e, null != (d = n) && u(ce, o) && ce[o](d, l._a, l, o)) : e._strict && !n && _(e).unusedTokens.push(r);
                _(e).charsLeftOver = m - h, 0 < c.length && _(e).unusedInput.push(c), e._a[ge] <= 12 && !0 === _(e).bigHour && 0 < e._a[ge] && (_(e).bigHour = void 0), _(e).parsedDateParts = e._a.slice(0), _(e).meridiem = e._meridiem, e._a[ge] = function(e, t, i) {
                    var n;
                    return null == i ? t : null != e.meridiemHour ? e.meridiemHour(t, i) : (null != e.isPM && ((n = e.isPM(i)) && t < 12 && (t += 12), n || 12 !== t || (t = 0)), t)
                }(e._locale, e._a[ge], e._meridiem), _t(e), lt(e)
            } else wt(e);
        else Mt(e)
    }

    function kt(e) {
        var t, u, c, p, g = e._i,
            v = e._f;
        return e._locale = e._locale || ut(e._l), null === g || void 0 === v && "" === g ? h({
            nullInput: !0
        }) : ("string" == typeof g && (e._i = g = e._locale.preparse(g)), M(g) ? new y(lt(g)) : (o(g) ? e._d = g : n(v) ? function(e) {
            var t, i, n, a, r;
            if (0 === e._f.length) return _(e).invalidFormat = !0, e._d = new Date(NaN);
            for (a = 0; a < e._f.length; a++) r = 0, t = f({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[a], bt(t), m(t) && (r += _(t).charsLeftOver, r += 10 * _(t).unusedTokens.length, _(t).score = r, (null == n || r < n) && (n = r, i = t));
            l(e, i || t)
        }(e) : v ? bt(e) : r(u = (t = e)._i) ? t._d = new Date(i.now()) : o(u) ? t._d = new Date(u.valueOf()) : "string" == typeof u ? (c = t, null === (p = yt.exec(c._i)) ? (Mt(c), !1 === c._isValid && (delete c._isValid, wt(c), !1 === c._isValid && (delete c._isValid, i.createFromInputFallback(c)))) : c._d = new Date(+p[1])) : n(u) ? (t._a = d(u.slice(0), function(e) {
            return parseInt(e, 10)
        }), _t(t)) : a(u) ? function(e) {
            if (!e._d) {
                var t = C(e._i);
                e._a = d([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                    return e && parseInt(e, 10)
                }), _t(e)
            }
        }(t) : s(u) ? t._d = new Date(u) : i.createFromInputFallback(t), m(e) || (e._d = null), e))
    }

    function Yt(e, t, i, r, s) {
        var o, d = {};
        return !0 !== i && !1 !== i || (r = i, i = void 0), (a(e) && function(e) {
            if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
            var t;
            for (t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }(e) || n(e) && 0 === e.length) && (e = void 0), d._isAMomentObject = !0, d._useUTC = d._isUTC = s, d._l = i, d._i = e, d._f = t, d._strict = r, (o = new y(lt(kt(d))))._nextDay && (o.add(1, "d"), o._nextDay = void 0), o
    }

    function Tt(e, t, i, n) {
        return Yt(e, t, i, n, !1)
    }
    i.createFromInputFallback = k("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }), i.ISO_8601 = function() {}, i.RFC_2822 = function() {};
    var Dt = k("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = Tt.apply(null, arguments);
            return this.isValid() && e.isValid() ? e < this ? this : e : h()
        }),
        At = k("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var e = Tt.apply(null, arguments);
            return this.isValid() && e.isValid() ? this < e ? this : e : h()
        });

    function St(e, t) {
        var i, a;
        if (1 === t.length && n(t[0]) && (t = t[0]), !t.length) return Tt();
        for (i = t[0], a = 1; a < t.length; ++a) t[a].isValid() && !t[a][e](i) || (i = t[a]);
        return i
    }
    var xt = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

    function Et(e) {
        var t = C(e),
            i = t.year || 0,
            n = t.quarter || 0,
            a = t.month || 0,
            r = t.week || 0,
            s = t.day || 0,
            o = t.hour || 0,
            d = t.minute || 0,
            u = t.second || 0,
            l = t.millisecond || 0;
        this._isValid = function(e) {
            for (var t in e)
                if (-1 === Ye.call(xt, t) || null != e[t] && isNaN(e[t])) return !1;
            for (var i = !1, n = 0; n < xt.length; ++n)
                if (e[xt[n]]) {
                    if (i) return !1;
                    parseFloat(e[xt[n]]) !== L(e[xt[n]]) && (i = !0)
                }
            return !0
        }(t), this._milliseconds = +l + 1e3 * u + 6e4 * d + 1e3 * o * 60 * 60, this._days = +s + 7 * r, this._months = +a + 3 * n + 12 * i, this._data = {}, this._locale = ut(), this._bubble()
    }

    function Ht(e) {
        return e instanceof Et
    }

    function Ot(e) {
        return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
    }

    function Ct(e, t) {
        N(e, 0, 0, function() {
            var e = this.utcOffset(),
                i = "+";
            return e < 0 && (e = -e, i = "-"), i + j(~~(e / 60), 2) + t + j(~~e % 60, 2)
        })
    }
    Ct("Z", ":"), Ct("ZZ", ""), de("Z", re), de("ZZ", re), _e(["Z", "ZZ"], function(e, t, i) {
        i._useUTC = !0, i._tzm = zt(re, e)
    });
    var Pt = /([\+\-]|\d\d)/gi;

    function zt(e, t) {
        var i = (t || "").match(e);
        if (null === i) return null;
        var n = ((i[i.length - 1] || []) + "").match(Pt) || ["-", 0, 0],
            a = 60 * n[1] + L(n[2]);
        return 0 === a ? 0 : "+" === n[0] ? a : -a
    }

    function jt(e, t) {
        var n, a;
        return t._isUTC ? (n = t.clone(), a = (M(e) || o(e) ? e.valueOf() : Tt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + a), i.updateOffset(n, !1), n) : Tt(e).local()
    }

    function Rt(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
    }

    function It() {
        return !!this.isValid() && this._isUTC && 0 === this._offset
    }
    i.updateOffset = function() {};
    var Ft = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        $t = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function Nt(e, t) {
        var i, n, a, r = e,
            o = null;
        return Ht(e) ? r = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : s(e) ? (r = {}, t ? r[t] = e : r.milliseconds = e) : (o = Ft.exec(e)) ? (i = "-" === o[1] ? -1 : 1, r = {
            y: 0,
            d: L(o[fe]) * i,
            h: L(o[ge]) * i,
            m: L(o[ye]) * i,
            s: L(o[Me]) * i,
            ms: L(Ot(1e3 * o[ve])) * i
        }) : (o = $t.exec(e)) ? (i = "-" === o[1] ? -1 : (o[1], 1), r = {
            y: Wt(o[2], i),
            M: Wt(o[3], i),
            w: Wt(o[4], i),
            d: Wt(o[5], i),
            h: Wt(o[6], i),
            m: Wt(o[7], i),
            s: Wt(o[8], i)
        }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (a = function(e, t) {
            var i;
            return e.isValid() && t.isValid() ? (t = jt(t, e), e.isBefore(t) ? i = Bt(e, t) : ((i = Bt(t, e)).milliseconds = -i.milliseconds, i.months = -i.months), i) : {
                milliseconds: 0,
                months: 0
            }
        }(Tt(r.from), Tt(r.to)), (r = {}).ms = a.milliseconds, r.M = a.months), n = new Et(r), Ht(e) && u(e, "_locale") && (n._locale = e._locale), n
    }

    function Wt(e, t) {
        var i = e && parseFloat(e.replace(",", "."));
        return (isNaN(i) ? 0 : i) * t
    }

    function Bt(e, t) {
        var i = {
            milliseconds: 0,
            months: 0
        };
        return i.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(i.months, "M").isAfter(t) && --i.months, i.milliseconds = +t - +e.clone().add(i.months, "M"), i
    }

    function Ut(e, t) {
        return function(i, n) {
            var a;
            return null === n || isNaN(+n) || (D(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), a = i, i = n, n = a), qt(this, Nt(i = "string" == typeof i ? +i : i, n), e), this
        }
    }

    function qt(e, t, n, a) {
        var r = t._milliseconds,
            s = Ot(t._days),
            o = Ot(t._months);
        e.isValid() && (a = null == a || a, o && Ce(e, Ae(e, "Month") + o * n), s && Se(e, "Date", Ae(e, "Date") + s * n), r && e._d.setTime(e._d.valueOf() + r * n), a && i.updateOffset(e, s || o))
    }
    Nt.fn = Et.prototype, Nt.invalid = function() {
        return Nt(NaN)
    };
    var Gt = Ut(1, "add"),
        Jt = Ut(-1, "subtract");

    function Vt(e, t) {
        var i = 12 * (t.year() - e.year()) + (t.month() - e.month()),
            n = e.clone().add(i, "months");
        return -(i + (t - n < 0 ? (t - n) / (n - e.clone().add(i - 1, "months")) : (t - n) / (e.clone().add(i + 1, "months") - n))) || 0
    }

    function Xt(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (null != (t = ut(e)) && (this._locale = t), this)
    }
    i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", i.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var Kt = k("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });

    function Zt() {
        return this._locale
    }

    function Qt(e, t) {
        N(0, [e, e.length], 0, t)
    }

    function ei(e, t, i, n, a) {
        var r;
        return null == e ? Ne(this, n, a).year : ((r = We(e, n, a)) < t && (t = r), function(e, t, i, n, a) {
            var r = $e(e, t, i, n, a),
                s = Ie(r.year, 0, r.dayOfYear);
            return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this
        }.call(this, e, t, i, n, a))
    }
    N(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), N(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), Qt("gggg", "weekYear"), Qt("ggggg", "weekYear"), Qt("GGGG", "isoWeekYear"), Qt("GGGGG", "isoWeekYear"), H("weekYear", "gg"), H("isoWeekYear", "GG"), z("weekYear", 1), z("isoWeekYear", 1), de("G", ne), de("g", ne), de("GG", X, q), de("gg", X, q), de("GGGG", ee, J), de("gggg", ee, J), de("GGGGG", te, V), de("ggggg", te, V), me(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, i, n) {
        t[n.substr(0, 2)] = L(e)
    }), me(["gg", "GG"], function(e, t, n, a) {
        t[a] = i.parseTwoDigitYear(e)
    }), N("Q", 0, "Qo", "quarter"), H("quarter", "Q"), z("quarter", 7), de("Q", U), _e("Q", function(e, t) {
        t[pe] = 3 * (L(e) - 1)
    }), N("D", ["DD", 2], "Do", "date"), H("date", "D"), z("date", 9), de("D", X), de("DD", X, q), de("Do", function(e, t) {
        return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
    }), _e(["D", "DD"], fe), _e("Do", function(e, t) {
        t[fe] = L(e.match(X)[0])
    });
    var ti = De("Date", !0);
    N("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), H("dayOfYear", "DDD"), z("dayOfYear", 4), de("DDD", Q), de("DDDD", G), _e(["DDD", "DDDD"], function(e, t, i) {
        i._dayOfYear = L(e)
    }), N("m", ["mm", 2], 0, "minute"), H("minute", "m"), z("minute", 14), de("m", X), de("mm", X, q), _e(["m", "mm"], ye);
    var ii = De("Minutes", !1);
    N("s", ["ss", 2], 0, "second"), H("second", "s"), z("second", 15), de("s", X), de("ss", X, q), _e(["s", "ss"], Me);
    var ni, ai = De("Seconds", !1);
    for (N("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }), N(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }), N(0, ["SSS", 3], 0, "millisecond"), N(0, ["SSSS", 4], 0, function() {
            return 10 * this.millisecond()
        }), N(0, ["SSSSS", 5], 0, function() {
            return 100 * this.millisecond()
        }), N(0, ["SSSSSS", 6], 0, function() {
            return 1e3 * this.millisecond()
        }), N(0, ["SSSSSSS", 7], 0, function() {
            return 1e4 * this.millisecond()
        }), N(0, ["SSSSSSSS", 8], 0, function() {
            return 1e5 * this.millisecond()
        }), N(0, ["SSSSSSSSS", 9], 0, function() {
            return 1e6 * this.millisecond()
        }), H("millisecond", "ms"), z("millisecond", 16), de("S", Q, U), de("SS", Q, q), de("SSS", Q, G), ni = "SSSS"; ni.length <= 9; ni += "S") de(ni, ie);

    function ri(e, t) {
        t[ve] = L(1e3 * ("0." + e))
    }
    for (ni = "S"; ni.length <= 9; ni += "S") _e(ni, ri);
    var si = De("Milliseconds", !1);
    N("z", 0, 0, "zoneAbbr"), N("zz", 0, 0, "zoneName");
    var oi = y.prototype;

    function di(e) {
        return e
    }
    oi.add = Gt, oi.calendar = function(e, t) {
        var n = e || Tt(),
            a = jt(n, this).startOf("day"),
            r = i.calendarFormat(this, a) || "sameElse",
            s = t && (A(t[r]) ? t[r].call(this, n) : t[r]);
        return this.format(s || this.localeData().calendar(r, this, Tt(n)))
    }, oi.clone = function() {
        return new y(this)
    }, oi.diff = function(e, t, i) {
        var n, a, r;
        if (!this.isValid()) return NaN;
        if (!(n = jt(e, this)).isValid()) return NaN;
        switch (a = 6e4 * (n.utcOffset() - this.utcOffset()), t = O(t)) {
            case "year":
                r = Vt(this, n) / 12;
                break;
            case "month":
                r = Vt(this, n);
                break;
            case "quarter":
                r = Vt(this, n) / 3;
                break;
            case "second":
                r = (this - n) / 1e3;
                break;
            case "minute":
                r = (this - n) / 6e4;
                break;
            case "hour":
                r = (this - n) / 36e5;
                break;
            case "day":
                r = (this - n - a) / 864e5;
                break;
            case "week":
                r = (this - n - a) / 6048e5;
                break;
            default:
                r = this - n
        }
        return i ? r : v(r)
    }, oi.endOf = function(e) {
        return void 0 === (e = O(e)) || "millisecond" === e ? this : ("date" === e && (e = "day"), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
    }, oi.format = function(e) {
        e || (e = this.isUtc() ? i.defaultFormatUtc : i.defaultFormat);
        var t = W(this, e);
        return this.localeData().postformat(t)
    }, oi.from = function(e, t) {
        return this.isValid() && (M(e) && e.isValid() || Tt(e).isValid()) ? Nt({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, oi.fromNow = function(e) {
        return this.from(Tt(), e)
    }, oi.to = function(e, t) {
        return this.isValid() && (M(e) && e.isValid() || Tt(e).isValid()) ? Nt({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, oi.toNow = function(e) {
        return this.to(Tt(), e)
    }, oi.get = function(e) {
        return A(this[e = O(e)]) ? this[e]() : this
    }, oi.invalidAt = function() {
        return _(this).overflow
    }, oi.isAfter = function(e, t) {
        var i = M(e) ? e : Tt(e);
        return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = O(r(t) ? "millisecond" : t)) ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(t).valueOf())
    }, oi.isBefore = function(e, t) {
        var i = M(e) ? e : Tt(e);
        return !(!this.isValid() || !i.isValid()) && ("millisecond" === (t = O(r(t) ? "millisecond" : t)) ? this.valueOf() < i.valueOf() : this.clone().endOf(t).valueOf() < i.valueOf())
    }, oi.isBetween = function(e, t, i, n) {
        return ("(" === (n = n || "()")[0] ? this.isAfter(e, i) : !this.isBefore(e, i)) && (")" === n[1] ? this.isBefore(t, i) : !this.isAfter(t, i))
    }, oi.isSame = function(e, t) {
        var i, n = M(e) ? e : Tt(e);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = O(t || "millisecond")) ? this.valueOf() === n.valueOf() : (i = n.valueOf(), this.clone().startOf(t).valueOf() <= i && i <= this.clone().endOf(t).valueOf()))
    }, oi.isSameOrAfter = function(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t)
    }, oi.isSameOrBefore = function(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t)
    }, oi.isValid = function() {
        return m(this)
    }, oi.lang = Kt, oi.locale = Xt, oi.localeData = Zt, oi.max = At, oi.min = Dt, oi.parsingFlags = function() {
        return l({}, _(this))
    }, oi.set = function(e, t) {
        if ("object" == typeof e)
            for (var i = function(e) {
                    var t = [];
                    for (var i in e) t.push({
                        unit: i,
                        priority: P[i]
                    });
                    return t.sort(function(e, t) {
                        return e.priority - t.priority
                    }), t
                }(e = C(e)), n = 0; n < i.length; n++) this[i[n].unit](e[i[n].unit]);
        else if (A(this[e = O(e)])) return this[e](t);
        return this
    }, oi.startOf = function(e) {
        switch (e = O(e)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this
    }, oi.subtract = Jt, oi.toArray = function() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
    }, oi.toObject = function() {
        var e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        }
    }, oi.toDate = function() {
        return new Date(this.valueOf())
    }, oi.toISOString = function(e) {
        if (!this.isValid()) return null;
        var t = !0 !== e,
            i = t ? this.clone().utc() : this;
        return i.year() < 0 || 9999 < i.year() ? W(i, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : A(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", W(i, "Z")) : W(i, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
    }, oi.inspect = function() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var e = "moment",
            t = "";
        this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
        var i = "[" + e + '("]',
            n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            a = t + '[")]';
        return this.format(i + n + "-MM-DD[T]HH:mm:ss.SSS" + a)
    }, oi.toJSON = function() {
        return this.isValid() ? this.toISOString() : null
    }, oi.toString = function() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, oi.unix = function() {
        return Math.floor(this.valueOf() / 1e3)
    }, oi.valueOf = function() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }, oi.creationData = function() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }, oi.year = Te, oi.isLeapYear = function() {
        return ke(this.year())
    }, oi.weekYear = function(e) {
        return ei.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }, oi.isoWeekYear = function(e) {
        return ei.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
    }, oi.quarter = oi.quarters = function(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }, oi.month = Pe, oi.daysInMonth = function() {
        return xe(this.year(), this.month())
    }, oi.week = oi.weeks = function(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }, oi.isoWeek = oi.isoWeeks = function(e) {
        var t = Ne(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }, oi.weeksInYear = function() {
        var e = this.localeData()._week;
        return We(this.year(), e.dow, e.doy)
    }, oi.isoWeeksInYear = function() {
        return We(this.year(), 1, 4)
    }, oi.date = ti, oi.day = oi.days = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t, i, n = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (t = e, i = this.localeData(), e = "string" != typeof t ? t : isNaN(t) ? "number" == typeof(t = i.weekdaysParse(t)) ? t : null : parseInt(t, 10), this.add(e - n, "d")) : n
    }, oi.weekday = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
    }, oi.isoWeekday = function(e) {
        if (!this.isValid()) return null != e ? this : NaN;
        if (null != e) {
            var t = (i = e, n = this.localeData(), "string" == typeof i ? n.weekdaysParse(i) % 7 || 7 : isNaN(i) ? null : i);
            return this.day(this.day() % 7 ? t : t - 7)
        }
        return this.day() || 7;
        var i, n
    }, oi.dayOfYear = function(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }, oi.hour = oi.hours = tt, oi.minute = oi.minutes = ii, oi.second = oi.seconds = ai, oi.millisecond = oi.milliseconds = si, oi.utcOffset = function(e, t, n) {
        var a, r = this._offset || 0;
        if (!this.isValid()) return null != e ? this : NaN;
        if (null != e) {
            if ("string" == typeof e) {
                if (null === (e = zt(re, e))) return this
            } else Math.abs(e) < 16 && !n && (e *= 60);
            return !this._isUTC && t && (a = Rt(this)), this._offset = e, this._isUTC = !0, null != a && this.add(a, "m"), r !== e && (!t || this._changeInProgress ? qt(this, Nt(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, i.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? r : Rt(this)
    }, oi.utc = function(e) {
        return this.utcOffset(0, e)
    }, oi.local = function(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Rt(this), "m")), this
    }, oi.parseZone = function() {
        if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
        else if ("string" == typeof this._i) {
            var e = zt(ae, this._i);
            null != e ? this.utcOffset(e) : this.utcOffset(0, !0)
        }
        return this
    }, oi.hasAlignedHourOffset = function(e) {
        return !!this.isValid() && (e = e ? Tt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
    }, oi.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }, oi.isLocal = function() {
        return !!this.isValid() && !this._isUTC
    }, oi.isUtcOffset = function() {
        return !!this.isValid() && this._isUTC
    }, oi.isUtc = It, oi.isUTC = It, oi.zoneAbbr = function() {
        return this._isUTC ? "UTC" : ""
    }, oi.zoneName = function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, oi.dates = k("dates accessor is deprecated. Use date instead.", ti), oi.months = k("months accessor is deprecated. Use month instead", Pe), oi.years = k("years accessor is deprecated. Use year instead", Te), oi.zone = k("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
        return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset()
    }), oi.isDSTShifted = k("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
        if (!r(this._isDSTShifted)) return this._isDSTShifted;
        var e = {};
        if (f(e, this), (e = kt(e))._a) {
            var t = e._isUTC ? c(e._a) : Tt(e._a);
            this._isDSTShifted = this.isValid() && 0 < w(e._a, t.toArray())
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    });
    var ui = x.prototype;

    function li(e, t, i, n) {
        var a = ut(),
            r = c().set(n, t);
        return a[i](r, e)
    }

    function ci(e, t, i) {
        if (s(e) && (t = e, e = void 0), e = e || "", null != t) return li(e, t, i, "month");
        var n, a = [];
        for (n = 0; n < 12; n++) a[n] = li(e, n, i, "month");
        return a
    }

    function _i(e, t, i, n) {
        "boolean" == typeof e ? s(t) && (i = t, t = void 0) : (t = e, e = !1, s(i = t) && (i = t, t = void 0)), t = t || "";
        var a, r = ut(),
            o = e ? r._week.dow : 0;
        if (null != i) return li(t, (i + o) % 7, n, "day");
        var d = [];
        for (a = 0; a < 7; a++) d[a] = li(t, (a + o) % 7, n, "day");
        return d
    }
    ui.calendar = function(e, t, i) {
        var n = this._calendar[e] || this._calendar.sameElse;
        return A(n) ? n.call(t, i) : n
    }, ui.longDateFormat = function(e) {
        var t = this._longDateFormat[e],
            i = this._longDateFormat[e.toUpperCase()];
        return t || !i ? t : (this._longDateFormat[e] = i.replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1)
        }), this._longDateFormat[e])
    }, ui.invalidDate = function() {
        return this._invalidDate
    }, ui.ordinal = function(e) {
        return this._ordinal.replace("%d", e)
    }, ui.preparse = di, ui.postformat = di, ui.relativeTime = function(e, t, i, n) {
        var a = this._relativeTime[i];
        return A(a) ? a(e, t, i, n) : a.replace(/%d/i, e)
    }, ui.pastFuture = function(e, t) {
        var i = this._relativeTime[0 < e ? "future" : "past"];
        return A(i) ? i(t) : i.replace(/%s/i, t)
    }, ui.set = function(e) {
        var t, i;
        for (i in e) A(t = e[i]) ? this[i] = t : this["_" + i] = t;
        this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }, ui.months = function(e, t) {
        return e ? n(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ee).test(t) ? "format" : "standalone"][e.month()] : n(this._months) ? this._months : this._months.standalone
    }, ui.monthsShort = function(e, t) {
        return e ? n(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ee.test(t) ? "format" : "standalone"][e.month()] : n(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }, ui.monthsParse = function(e, t, i) {
        var n, a, r;
        if (this._monthsParseExact) return function(e, t, i) {
            var n, a, r, s = e.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n) r = c([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[n] = this.months(r, "").toLocaleLowerCase();
            return i ? "MMM" === t ? -1 !== (a = Ye.call(this._shortMonthsParse, s)) ? a : null : -1 !== (a = Ye.call(this._longMonthsParse, s)) ? a : null : "MMM" === t ? -1 !== (a = Ye.call(this._shortMonthsParse, s)) ? a : -1 !== (a = Ye.call(this._longMonthsParse, s)) ? a : null : -1 !== (a = Ye.call(this._longMonthsParse, s)) ? a : -1 !== (a = Ye.call(this._shortMonthsParse, s)) ? a : null
        }.call(this, e, t, i);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
            if (a = c([2e3, n]), i && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(a, "").replace(".", "") + "$", "i"), this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(a, "").replace(".", "") + "$", "i")), i || this._monthsParse[n] || (r = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[n] = new RegExp(r.replace(".", ""), "i")), i && "MMMM" === t && this._longMonthsParse[n].test(e)) return n;
            if (i && "MMM" === t && this._shortMonthsParse[n].test(e)) return n;
            if (!i && this._monthsParse[n].test(e)) return n
        }
    }, ui.monthsRegex = function(e) {
        return this._monthsParseExact ? (u(this, "_monthsRegex") || Re.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (u(this, "_monthsRegex") || (this._monthsRegex = je), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
    }, ui.monthsShortRegex = function(e) {
        return this._monthsParseExact ? (u(this, "_monthsRegex") || Re.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (u(this, "_monthsShortRegex") || (this._monthsShortRegex = ze), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }, ui.week = function(e) {
        return Ne(e, this._week.dow, this._week.doy).week
    }, ui.firstDayOfYear = function() {
        return this._week.doy
    }, ui.firstDayOfWeek = function() {
        return this._week.dow
    }, ui.weekdays = function(e, t) {
        return e ? n(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : n(this._weekdays) ? this._weekdays : this._weekdays.standalone
    }, ui.weekdaysMin = function(e) {
        return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
    }, ui.weekdaysShort = function(e) {
        return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
    }, ui.weekdaysParse = function(e, t, i) {
        var n, a, r;
        if (this._weekdaysParseExact) return function(e, t, i) {
            var n, a, r, s = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n) r = c([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(r, "").toLocaleLowerCase();
            return i ? "dddd" === t ? -1 !== (a = Ye.call(this._weekdaysParse, s)) ? a : null : "ddd" === t ? -1 !== (a = Ye.call(this._shortWeekdaysParse, s)) ? a : null : -1 !== (a = Ye.call(this._minWeekdaysParse, s)) ? a : null : "dddd" === t ? -1 !== (a = Ye.call(this._weekdaysParse, s)) ? a : -1 !== (a = Ye.call(this._shortWeekdaysParse, s)) ? a : -1 !== (a = Ye.call(this._minWeekdaysParse, s)) ? a : null : "ddd" === t ? -1 !== (a = Ye.call(this._shortWeekdaysParse, s)) ? a : -1 !== (a = Ye.call(this._weekdaysParse, s)) ? a : -1 !== (a = Ye.call(this._minWeekdaysParse, s)) ? a : null : -1 !== (a = Ye.call(this._minWeekdaysParse, s)) ? a : -1 !== (a = Ye.call(this._weekdaysParse, s)) ? a : -1 !== (a = Ye.call(this._shortWeekdaysParse, s)) ? a : null
        }.call(this, e, t, i);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
            if (a = c([2e3, 1]).day(n), i && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(a, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(a, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(a, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[n] || (r = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[n] = new RegExp(r.replace(".", ""), "i")), i && "dddd" === t && this._fullWeekdaysParse[n].test(e)) return n;
            if (i && "ddd" === t && this._shortWeekdaysParse[n].test(e)) return n;
            if (i && "dd" === t && this._minWeekdaysParse[n].test(e)) return n;
            if (!i && this._weekdaysParse[n].test(e)) return n
        }
    }, ui.weekdaysRegex = function(e) {
        return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || Xe.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (u(this, "_weekdaysRegex") || (this._weekdaysRegex = Ge), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }, ui.weekdaysShortRegex = function(e) {
        return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || Xe.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (u(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Je), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }, ui.weekdaysMinRegex = function(e) {
        return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || Xe.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (u(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ve), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }, ui.isPM = function(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }, ui.meridiem = function(e, t, i) {
        return 11 < e ? i ? "pm" : "PM" : i ? "am" : "AM"
    }, ot("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 === L(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        }
    }), i.lang = k("moment.lang is deprecated. Use moment.locale instead.", ot), i.langData = k("moment.langData is deprecated. Use moment.localeData instead.", ut);
    var mi = Math.abs;

    function hi(e, t, i, n) {
        var a = Nt(t, i);
        return e._milliseconds += n * a._milliseconds, e._days += n * a._days, e._months += n * a._months, e._bubble()
    }

    function pi(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e)
    }

    function fi(e) {
        return 4800 * e / 146097
    }

    function gi(e) {
        return 146097 * e / 4800
    }

    function yi(e) {
        return function() {
            return this.as(e)
        }
    }
    var Mi = yi("ms"),
        vi = yi("s"),
        Li = yi("m"),
        wi = yi("h"),
        bi = yi("d"),
        ki = yi("w"),
        Yi = yi("M"),
        Ti = yi("y");

    function Di(e) {
        return function() {
            return this.isValid() ? this._data[e] : NaN
        }
    }
    var Ai = Di("milliseconds"),
        Si = Di("seconds"),
        xi = Di("minutes"),
        Ei = Di("hours"),
        Hi = Di("days"),
        Oi = Di("months"),
        Ci = Di("years"),
        Pi = Math.round,
        zi = {
            ss: 44,
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        ji = Math.abs;

    function Ri(e) {
        return (0 < e) - (e < 0) || +e
    }

    function Ii() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var e, t, i = ji(this._milliseconds) / 1e3,
            n = ji(this._days),
            a = ji(this._months);
        t = v((e = v(i / 60)) / 60), i %= 60, e %= 60;
        var r = v(a / 12),
            s = a %= 12,
            o = n,
            d = t,
            u = e,
            l = i ? i.toFixed(3).replace(/\.?0+$/, "") : "",
            c = this.asSeconds();
        if (!c) return "P0D";
        var _ = c < 0 ? "-" : "",
            m = Ri(this._months) !== Ri(c) ? "-" : "",
            h = Ri(this._days) !== Ri(c) ? "-" : "",
            p = Ri(this._milliseconds) !== Ri(c) ? "-" : "";
        return _ + "P" + (r ? m + r + "Y" : "") + (s ? m + s + "M" : "") + (o ? h + o + "D" : "") + (d || u || l ? "T" : "") + (d ? p + d + "H" : "") + (u ? p + u + "M" : "") + (l ? p + l + "S" : "")
    }
    var Fi = Et.prototype;
    Fi.isValid = function() {
        return this._isValid
    }, Fi.abs = function() {
        var e = this._data;
        return this._milliseconds = mi(this._milliseconds), this._days = mi(this._days), this._months = mi(this._months), e.milliseconds = mi(e.milliseconds), e.seconds = mi(e.seconds), e.minutes = mi(e.minutes), e.hours = mi(e.hours), e.months = mi(e.months), e.years = mi(e.years), this
    }, Fi.add = function(e, t) {
        return hi(this, e, t, 1)
    }, Fi.subtract = function(e, t) {
        return hi(this, e, t, -1)
    }, Fi.as = function(e) {
        if (!this.isValid()) return NaN;
        var t, i, n = this._milliseconds;
        if ("month" === (e = O(e)) || "year" === e) return t = this._days + n / 864e5, i = this._months + fi(t), "month" === e ? i : i / 12;
        switch (t = this._days + Math.round(gi(this._months)), e) {
            case "week":
                return t / 7 + n / 6048e5;
            case "day":
                return t + n / 864e5;
            case "hour":
                return 24 * t + n / 36e5;
            case "minute":
                return 1440 * t + n / 6e4;
            case "second":
                return 86400 * t + n / 1e3;
            case "millisecond":
                return Math.floor(864e5 * t) + n;
            default:
                throw new Error("Unknown unit " + e)
        }
    }, Fi.asMilliseconds = Mi, Fi.asSeconds = vi, Fi.asMinutes = Li, Fi.asHours = wi, Fi.asDays = bi, Fi.asWeeks = ki, Fi.asMonths = Yi, Fi.asYears = Ti, Fi.valueOf = function() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * L(this._months / 12) : NaN
    }, Fi._bubble = function() {
        var e, t, i, n, a, r = this._milliseconds,
            s = this._days,
            o = this._months,
            d = this._data;
        return 0 <= r && 0 <= s && 0 <= o || r <= 0 && s <= 0 && o <= 0 || (r += 864e5 * pi(gi(o) + s), o = s = 0), d.milliseconds = r % 1e3, e = v(r / 1e3), d.seconds = e % 60, t = v(e / 60), d.minutes = t % 60, i = v(t / 60), d.hours = i % 24, o += a = v(fi(s += v(i / 24))), s -= pi(gi(a)), n = v(o / 12), o %= 12, d.days = s, d.months = o, d.years = n, this
    }, Fi.clone = function() {
        return Nt(this)
    }, Fi.get = function(e) {
        return e = O(e), this.isValid() ? this[e + "s"]() : NaN
    }, Fi.milliseconds = Ai, Fi.seconds = Si, Fi.minutes = xi, Fi.hours = Ei, Fi.days = Hi, Fi.weeks = function() {
        return v(this.days() / 7)
    }, Fi.months = Oi, Fi.years = Ci, Fi.humanize = function(e) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var t, i, n, a, r, s, o, d, u, l, c = this.localeData(),
            _ = (t = !e, i = c, n = Nt(this).abs(), a = Pi(n.as("s")), r = Pi(n.as("m")), s = Pi(n.as("h")), o = Pi(n.as("d")), d = Pi(n.as("M")), u = Pi(n.as("y")), (l = a <= zi.ss && ["s", a] || a < zi.s && ["ss", a] || r <= 1 && ["m"] || r < zi.m && ["mm", r] || s <= 1 && ["h"] || s < zi.h && ["hh", s] || o <= 1 && ["d"] || o < zi.d && ["dd", o] || d <= 1 && ["M"] || d < zi.M && ["MM", d] || u <= 1 && ["y"] || ["yy", u])[2] = t, l[3] = 0 < +this, l[4] = i, function(e, t, i, n, a) {
                return a.relativeTime(t || 1, !!i, e, n)
            }.apply(null, l));
        return e && (_ = c.pastFuture(+this, _)), c.postformat(_)
    }, Fi.toISOString = Ii, Fi.toString = Ii, Fi.toJSON = Ii, Fi.locale = Xt, Fi.localeData = Zt, Fi.toIsoString = k("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Ii), Fi.lang = Kt, N("X", 0, 0, "unix"), N("x", 0, 0, "valueOf"), de("x", ne), de("X", /[+-]?\d+(\.\d{1,3})?/), _e("X", function(e, t, i) {
        i._d = new Date(1e3 * parseFloat(e, 10))
    }), _e("x", function(e, t, i) {
        i._d = new Date(L(e))
    }), i.version = "2.22.2", e = Tt, i.fn = oi, i.min = function() {
        return St("isBefore", [].slice.call(arguments, 0))
    }, i.max = function() {
        return St("isAfter", [].slice.call(arguments, 0))
    }, i.now = function() {
        return Date.now ? Date.now() : +new Date
    }, i.utc = c, i.unix = function(e) {
        return Tt(1e3 * e)
    }, i.months = function(e, t) {
        return ci(e, t, "months")
    }, i.isDate = o, i.locale = ot, i.invalid = h, i.duration = Nt, i.isMoment = M, i.weekdays = function(e, t, i) {
        return _i(e, t, i, "weekdays")
    }, i.parseZone = function() {
        return Tt.apply(null, arguments).parseZone()
    }, i.localeData = ut, i.isDuration = Ht, i.monthsShort = function(e, t) {
        return ci(e, t, "monthsShort")
    }, i.weekdaysMin = function(e, t, i) {
        return _i(e, t, i, "weekdaysMin")
    }, i.defineLocale = dt, i.updateLocale = function(e, t) {
        if (null != t) {
            var i, n, a = it;
            null != (n = st(e)) && (a = n._config), (i = new x(t = S(a, t))).parentLocale = nt[e], nt[e] = i, ot(e)
        } else null != nt[e] && (null != nt[e].parentLocale ? nt[e] = nt[e].parentLocale : null != nt[e] && delete nt[e]);
        return nt[e]
    }, i.locales = function() {
        return Y(nt)
    }, i.weekdaysShort = function(e, t, i) {
        return _i(e, t, i, "weekdaysShort")
    }, i.normalizeUnits = O, i.relativeTimeRounding = function(e) {
        return void 0 === e ? Pi : "function" == typeof e && (Pi = e, !0)
    }, i.relativeTimeThreshold = function(e, t) {
        return void 0 !== zi[e] && (void 0 === t ? zi[e] : (zi[e] = t, "s" === e && (zi.ss = t - 1), !0))
    }, i.calendarFormat = function(e, t) {
        var i = e.diff(t, "days", !0);
        return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse"
    }, i.prototype = oi, i.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "YYYY-[W]WW",
        MONTH: "YYYY-MM"
    }, i.defineLocale("af", {
        months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
        weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
        weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
        meridiemParse: /vm|nm/i,
        isPM: function(e) {
            return /^nm$/i.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 12 ? i ? "vm" : "VM" : i ? "nm" : "NM"
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Vandag om] LT",
            nextDay: "[MÃ´re om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[Gister om] LT",
            lastWeek: "[Laas] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "oor %s",
            past: "%s gelede",
            s: "'n paar sekondes",
            ss: "%d sekondes",
            m: "'n minuut",
            mm: "%d minute",
            h: "'n uur",
            hh: "%d ure",
            d: "'n dag",
            dd: "%d dae",
            M: "'n maand",
            MM: "%d maande",
            y: "'n jaar",
            yy: "%d jaar"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(e) {
            return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("ar-dz", {
        months: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
        monthsShort: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
        weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
        weekdaysShort: "Ø§Ø­Ø¯_Ø§Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
        weekdaysMin: "Ø£Ø­_Ø¥Ø«_Ø«Ù„Ø§_Ø£Ø±_Ø®Ù…_Ø¬Ù…_Ø³Ø¨".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ÙÙŠ %s",
            past: "Ù…Ù†Ø° %s",
            s: "Ø«ÙˆØ§Ù†",
            ss: "%d Ø«Ø§Ù†ÙŠØ©",
            m: "Ø¯Ù‚ÙŠÙ‚Ø©",
            mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
            h: "Ø³Ø§Ø¹Ø©",
            hh: "%d Ø³Ø§Ø¹Ø§Øª",
            d: "ÙŠÙˆÙ…",
            dd: "%d Ø£ÙŠØ§Ù…",
            M: "Ø´Ù‡Ø±",
            MM: "%d Ø£Ø´Ù‡Ø±",
            y: "Ø³Ù†Ø©",
            yy: "%d Ø³Ù†ÙˆØ§Øª"
        },
        week: {
            dow: 0,
            doy: 4
        }
    }), i.defineLocale("ar-kw", {
        months: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"),
        monthsShort: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"),
        weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥ØªÙ†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
        weekdaysShort: "Ø§Ø­Ø¯_Ø§ØªÙ†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
        weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ÙÙŠ %s",
            past: "Ù…Ù†Ø° %s",
            s: "Ø«ÙˆØ§Ù†",
            ss: "%d Ø«Ø§Ù†ÙŠØ©",
            m: "Ø¯Ù‚ÙŠÙ‚Ø©",
            mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
            h: "Ø³Ø§Ø¹Ø©",
            hh: "%d Ø³Ø§Ø¹Ø§Øª",
            d: "ÙŠÙˆÙ…",
            dd: "%d Ø£ÙŠØ§Ù…",
            M: "Ø´Ù‡Ø±",
            MM: "%d Ø£Ø´Ù‡Ø±",
            y: "Ø³Ù†Ø©",
            yy: "%d Ø³Ù†ÙˆØ§Øª"
        },
        week: {
            dow: 0,
            doy: 12
        }
    });
    var $i = {
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            0: "0"
        },
        Ni = function(e) {
            return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 <= e % 100 && e % 100 <= 10 ? 3 : 11 <= e % 100 ? 4 : 5
        },
        Wi = {
            s: ["Ø£Ù‚Ù„ Ù…Ù† Ø«Ø§Ù†ÙŠØ©", "Ø«Ø§Ù†ÙŠØ© ÙˆØ§Ø­Ø¯Ø©", ["Ø«Ø§Ù†ÙŠØªØ§Ù†", "Ø«Ø§Ù†ÙŠØªÙŠÙ†"], "%d Ø«ÙˆØ§Ù†", "%d Ø«Ø§Ù†ÙŠØ©", "%d Ø«Ø§Ù†ÙŠØ©"],
            m: ["Ø£Ù‚Ù„ Ù…Ù† Ø¯Ù‚ÙŠÙ‚Ø©", "Ø¯Ù‚ÙŠÙ‚Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø¯Ù‚ÙŠÙ‚ØªØ§Ù†", "Ø¯Ù‚ÙŠÙ‚ØªÙŠÙ†"], "%d Ø¯Ù‚Ø§Ø¦Ù‚", "%d Ø¯Ù‚ÙŠÙ‚Ø©", "%d Ø¯Ù‚ÙŠÙ‚Ø©"],
            h: ["Ø£Ù‚Ù„ Ù…Ù† Ø³Ø§Ø¹Ø©", "Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø³Ø§Ø¹ØªØ§Ù†", "Ø³Ø§Ø¹ØªÙŠÙ†"], "%d Ø³Ø§Ø¹Ø§Øª", "%d Ø³Ø§Ø¹Ø©", "%d Ø³Ø§Ø¹Ø©"],
            d: ["Ø£Ù‚Ù„ Ù…Ù† ÙŠÙˆÙ…", "ÙŠÙˆÙ… ÙˆØ§Ø­Ø¯", ["ÙŠÙˆÙ…Ø§Ù†", "ÙŠÙˆÙ…ÙŠÙ†"], "%d Ø£ÙŠØ§Ù…", "%d ÙŠÙˆÙ…Ù‹Ø§", "%d ÙŠÙˆÙ…"],
            M: ["Ø£Ù‚Ù„ Ù…Ù† Ø´Ù‡Ø±", "Ø´Ù‡Ø± ÙˆØ§Ø­Ø¯", ["Ø´Ù‡Ø±Ø§Ù†", "Ø´Ù‡Ø±ÙŠÙ†"], "%d Ø£Ø´Ù‡Ø±", "%d Ø´Ù‡Ø±Ø§", "%d Ø´Ù‡Ø±"],
            y: ["Ø£Ù‚Ù„ Ù…Ù† Ø¹Ø§Ù…", "Ø¹Ø§Ù… ÙˆØ§Ø­Ø¯", ["Ø¹Ø§Ù…Ø§Ù†", "Ø¹Ø§Ù…ÙŠÙ†"], "%d Ø£Ø¹ÙˆØ§Ù…", "%d Ø¹Ø§Ù…Ù‹Ø§", "%d Ø¹Ø§Ù…"]
        },
        Bi = function(e) {
            return function(t, i, n, a) {
                var r = Ni(t),
                    s = Wi[e][Ni(t)];
                return 2 === r && (s = s[i ? 0 : 1]), s.replace(/%d/i, t)
            }
        },
        Ui = ["ÙŠÙ†Ø§ÙŠØ±", "ÙØ¨Ø±Ø§ÙŠØ±", "Ù…Ø§Ø±Ø³", "Ø£Ø¨Ø±ÙŠÙ„", "Ù…Ø§ÙŠÙˆ", "ÙŠÙˆÙ†ÙŠÙˆ", "ÙŠÙˆÙ„ÙŠÙˆ", "Ø£ØºØ³Ø·Ø³", "Ø³Ø¨ØªÙ…Ø¨Ø±", "Ø£ÙƒØªÙˆØ¨Ø±", "Ù†ÙˆÙÙ…Ø¨Ø±", "Ø¯ÙŠØ³Ù…Ø¨Ø±"];
    i.defineLocale("ar-ly", {
        months: Ui,
        monthsShort: Ui,
        weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
        weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
        weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/â€M/â€YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0635|\u0645/,
        isPM: function(e) {
            return "Ù…" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "Øµ" : "Ù…"
        },
        calendar: {
            sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextDay: "[ØºØ¯Ù‹Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastDay: "[Ø£Ù…Ø³ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "Ø¨Ø¹Ø¯ %s",
            past: "Ù…Ù†Ø° %s",
            s: Bi("s"),
            ss: Bi("s"),
            m: Bi("m"),
            mm: Bi("m"),
            h: Bi("h"),
            hh: Bi("h"),
            d: Bi("d"),
            dd: Bi("d"),
            M: Bi("M"),
            MM: Bi("M"),
            y: Bi("y"),
            yy: Bi("y")
        },
        preparse: function(e) {
            return e.replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return $i[e]
            }).replace(/,/g, "ØŒ")
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), i.defineLocale("ar-ma", {
        months: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"),
        monthsShort: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"),
        weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥ØªÙ†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
        weekdaysShort: "Ø§Ø­Ø¯_Ø§ØªÙ†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
        weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ÙÙŠ %s",
            past: "Ù…Ù†Ø° %s",
            s: "Ø«ÙˆØ§Ù†",
            ss: "%d Ø«Ø§Ù†ÙŠØ©",
            m: "Ø¯Ù‚ÙŠÙ‚Ø©",
            mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
            h: "Ø³Ø§Ø¹Ø©",
            hh: "%d Ø³Ø§Ø¹Ø§Øª",
            d: "ÙŠÙˆÙ…",
            dd: "%d Ø£ÙŠØ§Ù…",
            M: "Ø´Ù‡Ø±",
            MM: "%d Ø£Ø´Ù‡Ø±",
            y: "Ø³Ù†Ø©",
            yy: "%d Ø³Ù†ÙˆØ§Øª"
        },
        week: {
            dow: 6,
            doy: 12
        }
    });
    var qi = {
            1: "Ù¡",
            2: "Ù¢",
            3: "Ù£",
            4: "Ù¤",
            5: "Ù¥",
            6: "Ù¦",
            7: "Ù§",
            8: "Ù¨",
            9: "Ù©",
            0: "Ù "
        },
        Gi = {
            "Ù¡": "1",
            "Ù¢": "2",
            "Ù£": "3",
            "Ù¤": "4",
            "Ù¥": "5",
            "Ù¦": "6",
            "Ù§": "7",
            "Ù¨": "8",
            "Ù©": "9",
            "Ù ": "0"
        };
    i.defineLocale("ar-sa", {
        months: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠÙˆ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆ_Ø£ØºØ³Ø·Ø³_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
        monthsShort: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠÙˆ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆ_Ø£ØºØ³Ø·Ø³_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
        weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
        weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
        weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0635|\u0645/,
        isPM: function(e) {
            return "Ù…" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "Øµ" : "Ù…"
        },
        calendar: {
            sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ÙÙŠ %s",
            past: "Ù…Ù†Ø° %s",
            s: "Ø«ÙˆØ§Ù†",
            ss: "%d Ø«Ø§Ù†ÙŠØ©",
            m: "Ø¯Ù‚ÙŠÙ‚Ø©",
            mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
            h: "Ø³Ø§Ø¹Ø©",
            hh: "%d Ø³Ø§Ø¹Ø§Øª",
            d: "ÙŠÙˆÙ…",
            dd: "%d Ø£ÙŠØ§Ù…",
            M: "Ø´Ù‡Ø±",
            MM: "%d Ø£Ø´Ù‡Ø±",
            y: "Ø³Ù†Ø©",
            yy: "%d Ø³Ù†ÙˆØ§Øª"
        },
        preparse: function(e) {
            return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function(e) {
                return Gi[e]
            }).replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return qi[e]
            }).replace(/,/g, "ØŒ")
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("ar-tn", {
        months: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
        monthsShort: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"),
        weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
        weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
        weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ÙÙŠ %s",
            past: "Ù…Ù†Ø° %s",
            s: "Ø«ÙˆØ§Ù†",
            ss: "%d Ø«Ø§Ù†ÙŠØ©",
            m: "Ø¯Ù‚ÙŠÙ‚Ø©",
            mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚",
            h: "Ø³Ø§Ø¹Ø©",
            hh: "%d Ø³Ø§Ø¹Ø§Øª",
            d: "ÙŠÙˆÙ…",
            dd: "%d Ø£ÙŠØ§Ù…",
            M: "Ø´Ù‡Ø±",
            MM: "%d Ø£Ø´Ù‡Ø±",
            y: "Ø³Ù†Ø©",
            yy: "%d Ø³Ù†ÙˆØ§Øª"
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Ji = {
            1: "Ù¡",
            2: "Ù¢",
            3: "Ù£",
            4: "Ù¤",
            5: "Ù¥",
            6: "Ù¦",
            7: "Ù§",
            8: "Ù¨",
            9: "Ù©",
            0: "Ù "
        },
        Vi = {
            "Ù¡": "1",
            "Ù¢": "2",
            "Ù£": "3",
            "Ù¤": "4",
            "Ù¥": "5",
            "Ù¦": "6",
            "Ù§": "7",
            "Ù¨": "8",
            "Ù©": "9",
            "Ù ": "0"
        },
        Xi = function(e) {
            return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 <= e % 100 && e % 100 <= 10 ? 3 : 11 <= e % 100 ? 4 : 5
        },
        Ki = {
            s: ["Ø£Ù‚Ù„ Ù…Ù† Ø«Ø§Ù†ÙŠØ©", "Ø«Ø§Ù†ÙŠØ© ÙˆØ§Ø­Ø¯Ø©", ["Ø«Ø§Ù†ÙŠØªØ§Ù†", "Ø«Ø§Ù†ÙŠØªÙŠÙ†"], "%d Ø«ÙˆØ§Ù†", "%d Ø«Ø§Ù†ÙŠØ©", "%d Ø«Ø§Ù†ÙŠØ©"],
            m: ["Ø£Ù‚Ù„ Ù…Ù† Ø¯Ù‚ÙŠÙ‚Ø©", "Ø¯Ù‚ÙŠÙ‚Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø¯Ù‚ÙŠÙ‚ØªØ§Ù†", "Ø¯Ù‚ÙŠÙ‚ØªÙŠÙ†"], "%d Ø¯Ù‚Ø§Ø¦Ù‚", "%d Ø¯Ù‚ÙŠÙ‚Ø©", "%d Ø¯Ù‚ÙŠÙ‚Ø©"],
            h: ["Ø£Ù‚Ù„ Ù…Ù† Ø³Ø§Ø¹Ø©", "Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø³Ø§Ø¹ØªØ§Ù†", "Ø³Ø§Ø¹ØªÙŠÙ†"], "%d Ø³Ø§Ø¹Ø§Øª", "%d Ø³Ø§Ø¹Ø©", "%d Ø³Ø§Ø¹Ø©"],
            d: ["Ø£Ù‚Ù„ Ù…Ù† ÙŠÙˆÙ…", "ÙŠÙˆÙ… ÙˆØ§Ø­Ø¯", ["ÙŠÙˆÙ…Ø§Ù†", "ÙŠÙˆÙ…ÙŠÙ†"], "%d Ø£ÙŠØ§Ù…", "%d ÙŠÙˆÙ…Ù‹Ø§", "%d ÙŠÙˆÙ…"],
            M: ["Ø£Ù‚Ù„ Ù…Ù† Ø´Ù‡Ø±", "Ø´Ù‡Ø± ÙˆØ§Ø­Ø¯", ["Ø´Ù‡Ø±Ø§Ù†", "Ø´Ù‡Ø±ÙŠÙ†"], "%d Ø£Ø´Ù‡Ø±", "%d Ø´Ù‡Ø±Ø§", "%d Ø´Ù‡Ø±"],
            y: ["Ø£Ù‚Ù„ Ù…Ù† Ø¹Ø§Ù…", "Ø¹Ø§Ù… ÙˆØ§Ø­Ø¯", ["Ø¹Ø§Ù…Ø§Ù†", "Ø¹Ø§Ù…ÙŠÙ†"], "%d Ø£Ø¹ÙˆØ§Ù…", "%d Ø¹Ø§Ù…Ù‹Ø§", "%d Ø¹Ø§Ù…"]
        },
        Zi = function(e) {
            return function(t, i, n, a) {
                var r = Xi(t),
                    s = Ki[e][Xi(t)];
                return 2 === r && (s = s[i ? 0 : 1]), s.replace(/%d/i, t)
            }
        },
        Qi = ["ÙŠÙ†Ø§ÙŠØ±", "ÙØ¨Ø±Ø§ÙŠØ±", "Ù…Ø§Ø±Ø³", "Ø£Ø¨Ø±ÙŠÙ„", "Ù…Ø§ÙŠÙˆ", "ÙŠÙˆÙ†ÙŠÙˆ", "ÙŠÙˆÙ„ÙŠÙˆ", "Ø£ØºØ³Ø·Ø³", "Ø³Ø¨ØªÙ…Ø¨Ø±", "Ø£ÙƒØªÙˆØ¨Ø±", "Ù†ÙˆÙÙ…Ø¨Ø±", "Ø¯ÙŠØ³Ù…Ø¨Ø±"];
    i.defineLocale("ar", {
        months: Qi,
        monthsShort: Qi,
        weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"),
        weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"),
        weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/â€M/â€YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0635|\u0645/,
        isPM: function(e) {
            return "Ù…" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "Øµ" : "Ù…"
        },
        calendar: {
            sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextDay: "[ØºØ¯Ù‹Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            nextWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastDay: "[Ø£Ù…Ø³ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            lastWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "Ø¨Ø¹Ø¯ %s",
            past: "Ù…Ù†Ø° %s",
            s: Zi("s"),
            ss: Zi("s"),
            m: Zi("m"),
            mm: Zi("m"),
            h: Zi("h"),
            hh: Zi("h"),
            d: Zi("d"),
            dd: Zi("d"),
            M: Zi("M"),
            MM: Zi("M"),
            y: Zi("y"),
            yy: Zi("y")
        },
        preparse: function(e) {
            return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g, function(e) {
                return Vi[e]
            }).replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return Ji[e]
            }).replace(/,/g, "ØŒ")
        },
        week: {
            dow: 6,
            doy: 12
        }
    });
    var en = {
        1: "-inci",
        5: "-inci",
        8: "-inci",
        70: "-inci",
        80: "-inci",
        2: "-nci",
        7: "-nci",
        20: "-nci",
        50: "-nci",
        3: "-Ã¼ncÃ¼",
        4: "-Ã¼ncÃ¼",
        100: "-Ã¼ncÃ¼",
        6: "-ncÄ±",
        9: "-uncu",
        10: "-uncu",
        30: "-uncu",
        60: "-Ä±ncÄ±",
        90: "-Ä±ncÄ±"
    };

    function tn(e, t, i) {
        var n, a;
        return "m" === i ? t ? "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ð°" : "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñƒ" : "h" === i ? t ? "Ð³Ð°Ð´Ð·Ñ–Ð½Ð°" : "Ð³Ð°Ð´Ð·Ñ–Ð½Ñƒ" : e + " " + (n = +e, a = {
            ss: t ? "ÑÐµÐºÑƒÐ½Ð´Ð°_ÑÐµÐºÑƒÐ½Ð´Ñ‹_ÑÐµÐºÑƒÐ½Ð´" : "ÑÐµÐºÑƒÐ½Ð´Ñƒ_ÑÐµÐºÑƒÐ½Ð´Ñ‹_ÑÐµÐºÑƒÐ½Ð´",
            mm: t ? "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ð°_Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñ‹_Ñ…Ð²Ñ–Ð»Ñ–Ð½" : "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñƒ_Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñ‹_Ñ…Ð²Ñ–Ð»Ñ–Ð½",
            hh: t ? "Ð³Ð°Ð´Ð·Ñ–Ð½Ð°_Ð³Ð°Ð´Ð·Ñ–Ð½Ñ‹_Ð³Ð°Ð´Ð·Ñ–Ð½" : "Ð³Ð°Ð´Ð·Ñ–Ð½Ñƒ_Ð³Ð°Ð´Ð·Ñ–Ð½Ñ‹_Ð³Ð°Ð´Ð·Ñ–Ð½",
            dd: "Ð´Ð·ÐµÐ½ÑŒ_Ð´Ð½Ñ–_Ð´Ð·Ñ‘Ð½",
            MM: "Ð¼ÐµÑÑÑ†_Ð¼ÐµÑÑÑ†Ñ‹_Ð¼ÐµÑÑÑ†Ð°Ñž",
            yy: "Ð³Ð¾Ð´_Ð³Ð°Ð´Ñ‹_Ð³Ð°Ð´Ð¾Ñž"
        }[i].split("_"), n % 10 == 1 && n % 100 != 11 ? a[0] : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 10 || 20 <= n % 100) ? a[1] : a[2])
    }
    i.defineLocale("az", {
        months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
        monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
        weekdays: "Bazar_Bazar ertÉ™si_Ã‡É™rÅŸÉ™nbÉ™ axÅŸamÄ±_Ã‡É™rÅŸÉ™nbÉ™_CÃ¼mÉ™ axÅŸamÄ±_CÃ¼mÉ™_ÅžÉ™nbÉ™".split("_"),
        weekdaysShort: "Baz_BzE_Ã‡Ax_Ã‡É™r_CAx_CÃ¼m_ÅžÉ™n".split("_"),
        weekdaysMin: "Bz_BE_Ã‡A_Ã‡É™_CA_CÃ¼_ÅžÉ™".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[bugÃ¼n saat] LT",
            nextDay: "[sabah saat] LT",
            nextWeek: "[gÉ™lÉ™n hÉ™ftÉ™] dddd [saat] LT",
            lastDay: "[dÃ¼nÉ™n] LT",
            lastWeek: "[keÃ§É™n hÉ™ftÉ™] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s É™vvÉ™l",
            s: "birneÃ§É™ saniyÉ™",
            ss: "%d saniyÉ™",
            m: "bir dÉ™qiqÉ™",
            mm: "%d dÉ™qiqÉ™",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gÃ¼n",
            dd: "%d gÃ¼n",
            M: "bir ay",
            MM: "%d ay",
            y: "bir il",
            yy: "%d il"
        },
        meridiemParse: /gec\u0259|s\u0259h\u0259r|g\xfcnd\xfcz|ax\u015fam/,
        isPM: function(e) {
            return /^(g\xfcnd\xfcz|ax\u015fam)$/.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "gecÉ™" : e < 12 ? "sÉ™hÉ™r" : e < 17 ? "gÃ¼ndÃ¼z" : "axÅŸam"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0131nc\u0131|inci|nci|\xfcnc\xfc|nc\u0131|uncu)/,
        ordinal: function(e) {
            if (0 === e) return e + "-Ä±ncÄ±";
            var t = e % 10;
            return e + (en[t] || en[e % 100 - t] || en[100 <= e ? 100 : null])
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("be", {
        months: {
            format: "ÑÑ‚ÑƒÐ´Ð·ÐµÐ½Ñ_Ð»ÑŽÑ‚Ð°Ð³Ð°_ÑÐ°ÐºÐ°Ð²Ñ–ÐºÐ°_ÐºÑ€Ð°ÑÐ°Ð²Ñ–ÐºÐ°_Ñ‚Ñ€Ð°ÑžÐ½Ñ_Ñ‡ÑÑ€Ð²ÐµÐ½Ñ_Ð»Ñ–Ð¿ÐµÐ½Ñ_Ð¶Ð½Ñ–ÑžÐ½Ñ_Ð²ÐµÑ€Ð°ÑÐ½Ñ_ÐºÐ°ÑÑ‚Ñ€Ñ‹Ñ‡Ð½Ñ–ÐºÐ°_Ð»Ñ–ÑÑ‚Ð°Ð¿Ð°Ð´Ð°_ÑÐ½ÐµÐ¶Ð½Ñ".split("_"),
            standalone: "ÑÑ‚ÑƒÐ´Ð·ÐµÐ½ÑŒ_Ð»ÑŽÑ‚Ñ‹_ÑÐ°ÐºÐ°Ð²Ñ–Ðº_ÐºÑ€Ð°ÑÐ°Ð²Ñ–Ðº_Ñ‚Ñ€Ð°Ð²ÐµÐ½ÑŒ_Ñ‡ÑÑ€Ð²ÐµÐ½ÑŒ_Ð»Ñ–Ð¿ÐµÐ½ÑŒ_Ð¶Ð½Ñ–Ð²ÐµÐ½ÑŒ_Ð²ÐµÑ€Ð°ÑÐµÐ½ÑŒ_ÐºÐ°ÑÑ‚Ñ€Ñ‹Ñ‡Ð½Ñ–Ðº_Ð»Ñ–ÑÑ‚Ð°Ð¿Ð°Ð´_ÑÐ½ÐµÐ¶Ð°Ð½ÑŒ".split("_")
        },
        monthsShort: "ÑÑ‚ÑƒÐ´_Ð»ÑŽÑ‚_ÑÐ°Ðº_ÐºÑ€Ð°Ñ_Ñ‚Ñ€Ð°Ð²_Ñ‡ÑÑ€Ð²_Ð»Ñ–Ð¿_Ð¶Ð½Ñ–Ð²_Ð²ÐµÑ€_ÐºÐ°ÑÑ‚_Ð»Ñ–ÑÑ‚_ÑÐ½ÐµÐ¶".split("_"),
        weekdays: {
            format: "Ð½ÑÐ´Ð·ÐµÐ»ÑŽ_Ð¿Ð°Ð½ÑÐ´Ð·ÐµÐ»Ð°Ðº_Ð°ÑžÑ‚Ð¾Ñ€Ð°Ðº_ÑÐµÑ€Ð°Ð´Ñƒ_Ñ‡Ð°Ñ†Ð²ÐµÑ€_Ð¿ÑÑ‚Ð½Ñ–Ñ†Ñƒ_ÑÑƒÐ±Ð¾Ñ‚Ñƒ".split("_"),
            standalone: "Ð½ÑÐ´Ð·ÐµÐ»Ñ_Ð¿Ð°Ð½ÑÐ´Ð·ÐµÐ»Ð°Ðº_Ð°ÑžÑ‚Ð¾Ñ€Ð°Ðº_ÑÐµÑ€Ð°Ð´Ð°_Ñ‡Ð°Ñ†Ð²ÐµÑ€_Ð¿ÑÑ‚Ð½Ñ–Ñ†Ð°_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"),
            isFormat: /\[ ?[\u0423\u0443\u045e] ?(?:\u043c\u0456\u043d\u0443\u043b\u0443\u044e|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0443\u044e)? ?\] ?dddd/
        },
        weekdaysShort: "Ð½Ð´_Ð¿Ð½_Ð°Ñ‚_ÑÑ€_Ñ‡Ñ†_Ð¿Ñ‚_ÑÐ±".split("_"),
        weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð°Ñ‚_ÑÑ€_Ñ‡Ñ†_Ð¿Ñ‚_ÑÐ±".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY Ð³.",
            LLL: "D MMMM YYYY Ð³., HH:mm",
            LLLL: "dddd, D MMMM YYYY Ð³., HH:mm"
        },
        calendar: {
            sameDay: "[Ð¡Ñ‘Ð½Ð½Ñ Ñž] LT",
            nextDay: "[Ð—Ð°ÑžÑ‚Ñ€Ð° Ñž] LT",
            lastDay: "[Ð£Ñ‡Ð¾Ñ€Ð° Ñž] LT",
            nextWeek: function() {
                return "[Ð£] dddd [Ñž] LT"
            },
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return "[Ð£ Ð¼Ñ–Ð½ÑƒÐ»ÑƒÑŽ] dddd [Ñž] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[Ð£ Ð¼Ñ–Ð½ÑƒÐ»Ñ‹] dddd [Ñž] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "Ð¿Ñ€Ð°Ð· %s",
            past: "%s Ñ‚Ð°Ð¼Ñƒ",
            s: "Ð½ÐµÐºÐ°Ð»ÑŒÐºÑ– ÑÐµÐºÑƒÐ½Ð´",
            m: tn,
            mm: tn,
            h: tn,
            hh: tn,
            d: "Ð´Ð·ÐµÐ½ÑŒ",
            dd: tn,
            M: "Ð¼ÐµÑÑÑ†",
            MM: tn,
            y: "Ð³Ð¾Ð´",
            yy: tn
        },
        meridiemParse: /\u043d\u043e\u0447\u044b|\u0440\u0430\u043d\u0456\u0446\u044b|\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430/,
        isPM: function(e) {
            return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430)$/.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "Ð½Ð¾Ñ‡Ñ‹" : e < 12 ? "Ñ€Ð°Ð½Ñ–Ñ†Ñ‹" : e < 17 ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡Ð°Ñ€Ð°"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0456|\u044b|\u0433\u0430)/,
        ordinal: function(e, t) {
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return e % 10 != 2 && e % 10 != 3 || e % 100 == 12 || e % 100 == 13 ? e + "-Ñ‹" : e + "-Ñ–";
                case "D":
                    return e + "-Ð³Ð°";
                default:
                    return e
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("bg", {
        months: "ÑÐ½ÑƒÐ°Ñ€Ð¸_Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»Ð¸_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸_Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸".split("_"),
        monthsShort: "ÑÐ½Ñ€_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»Ð¸_Ð°Ð²Ð³_ÑÐµÐ¿_Ð¾ÐºÑ‚_Ð½Ð¾Ðµ_Ð´ÐµÐº".split("_"),
        weekdays: "Ð½ÐµÐ´ÐµÐ»Ñ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÑÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÑŠÑ€Ñ‚ÑŠÐº_Ð¿ÐµÑ‚ÑŠÐº_ÑÑŠÐ±Ð¾Ñ‚Ð°".split("_"),
        weekdaysShort: "Ð½ÐµÐ´_Ð¿Ð¾Ð½_Ð²Ñ‚Ð¾_ÑÑ€Ñ_Ñ‡ÐµÑ‚_Ð¿ÐµÑ‚_ÑÑŠÐ±".split("_"),
        weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Ð”Ð½ÐµÑ Ð²] LT",
            nextDay: "[Ð£Ñ‚Ñ€Ðµ Ð²] LT",
            nextWeek: "dddd [Ð²] LT",
            lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return "[Ð’ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð°Ñ‚Ð°] dddd [Ð²] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Ð’ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð¸Ñ] dddd [Ð²] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "ÑÐ»ÐµÐ´ %s",
            past: "Ð¿Ñ€ÐµÐ´Ð¸ %s",
            s: "Ð½ÑÐºÐ¾Ð»ÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´Ð¸",
            ss: "%d ÑÐµÐºÑƒÐ½Ð´Ð¸",
            m: "Ð¼Ð¸Ð½ÑƒÑ‚Ð°",
            mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚Ð¸",
            h: "Ñ‡Ð°Ñ",
            hh: "%d Ñ‡Ð°ÑÐ°",
            d: "Ð´ÐµÐ½",
            dd: "%d Ð´Ð½Ð¸",
            M: "Ð¼ÐµÑÐµÑ†",
            MM: "%d Ð¼ÐµÑÐµÑ†Ð°",
            y: "Ð³Ð¾Ð´Ð¸Ð½Ð°",
            yy: "%d Ð³Ð¾Ð´Ð¸Ð½Ð¸"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,
        ordinal: function(e) {
            var t = e % 10,
                i = e % 100;
            return 0 === e ? e + "-ÐµÐ²" : 0 === i ? e + "-ÐµÐ½" : 10 < i && i < 20 ? e + "-Ñ‚Ð¸" : 1 === t ? e + "-Ð²Ð¸" : 2 === t ? e + "-Ñ€Ð¸" : 7 === t || 8 === t ? e + "-Ð¼Ð¸" : e + "-Ñ‚Ð¸"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("bm", {
        months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_MÉ›kalo_ZuwÉ›nkalo_Zuluyekalo_Utikalo_SÉ›tanburukalo_É”kutÉ”burukalo_Nowanburukalo_Desanburukalo".split("_"),
        monthsShort: "Zan_Few_Mar_Awi_MÉ›_Zuw_Zul_Uti_SÉ›t_É”ku_Now_Des".split("_"),
        weekdays: "Kari_NtÉ›nÉ›n_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),
        weekdaysShort: "Kar_NtÉ›_Tar_Ara_Ala_Jum_Sib".split("_"),
        weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "MMMM [tile] D [san] YYYY",
            LLL: "MMMM [tile] D [san] YYYY [lÉ›rÉ›] HH:mm",
            LLLL: "dddd MMMM [tile] D [san] YYYY [lÉ›rÉ›] HH:mm"
        },
        calendar: {
            sameDay: "[Bi lÉ›rÉ›] LT",
            nextDay: "[Sini lÉ›rÉ›] LT",
            nextWeek: "dddd [don lÉ›rÉ›] LT",
            lastDay: "[Kunu lÉ›rÉ›] LT",
            lastWeek: "dddd [tÉ›mÉ›nen lÉ›rÉ›] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s kÉ”nÉ”",
            past: "a bÉ› %s bÉ”",
            s: "sanga dama dama",
            ss: "sekondi %d",
            m: "miniti kelen",
            mm: "miniti %d",
            h: "lÉ›rÉ› kelen",
            hh: "lÉ›rÉ› %d",
            d: "tile kelen",
            dd: "tile %d",
            M: "kalo kelen",
            MM: "kalo %d",
            y: "san kelen",
            yy: "san %d"
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var nn = {
            1: "à§§",
            2: "à§¨",
            3: "à§©",
            4: "à§ª",
            5: "à§«",
            6: "à§¬",
            7: "à§­",
            8: "à§®",
            9: "à§¯",
            0: "à§¦"
        },
        an = {
            "à§§": "1",
            "à§¨": "2",
            "à§©": "3",
            "à§ª": "4",
            "à§«": "5",
            "à§¬": "6",
            "à§­": "7",
            "à§®": "8",
            "à§¯": "9",
            "à§¦": "0"
        };
    i.defineLocale("bn", {
        months: "à¦œà¦¾à¦¨à§à§Ÿà¦¾à¦°à§€_à¦«à§‡à¦¬à§à¦°à§à§Ÿà¦¾à¦°à¦¿_à¦®à¦¾à¦°à§à¦š_à¦à¦ªà§à¦°à¦¿à¦²_à¦®à§‡_à¦œà§à¦¨_à¦œà§à¦²à¦¾à¦‡_à¦†à¦—à¦¸à§à¦Ÿ_à¦¸à§‡à¦ªà§à¦Ÿà§‡à¦®à§à¦¬à¦°_à¦…à¦•à§à¦Ÿà§‹à¦¬à¦°_à¦¨à¦­à§‡à¦®à§à¦¬à¦°_à¦¡à¦¿à¦¸à§‡à¦®à§à¦¬à¦°".split("_"),
        monthsShort: "à¦œà¦¾à¦¨à§_à¦«à§‡à¦¬_à¦®à¦¾à¦°à§à¦š_à¦à¦ªà§à¦°_à¦®à§‡_à¦œà§à¦¨_à¦œà§à¦²_à¦†à¦—_à¦¸à§‡à¦ªà§à¦Ÿ_à¦…à¦•à§à¦Ÿà§‹_à¦¨à¦­à§‡_à¦¡à¦¿à¦¸à§‡".split("_"),
        weekdays: "à¦°à¦¬à¦¿à¦¬à¦¾à¦°_à¦¸à§‹à¦®à¦¬à¦¾à¦°_à¦®à¦™à§à¦—à¦²à¦¬à¦¾à¦°_à¦¬à§à¦§à¦¬à¦¾à¦°_à¦¬à§ƒà¦¹à¦¸à§à¦ªà¦¤à¦¿à¦¬à¦¾à¦°_à¦¶à§à¦•à§à¦°à¦¬à¦¾à¦°_à¦¶à¦¨à¦¿à¦¬à¦¾à¦°".split("_"),
        weekdaysShort: "à¦°à¦¬à¦¿_à¦¸à§‹à¦®_à¦®à¦™à§à¦—à¦²_à¦¬à§à¦§_à¦¬à§ƒà¦¹à¦¸à§à¦ªà¦¤à¦¿_à¦¶à§à¦•à§à¦°_à¦¶à¦¨à¦¿".split("_"),
        weekdaysMin: "à¦°à¦¬à¦¿_à¦¸à§‹à¦®_à¦®à¦™à§à¦—_à¦¬à§à¦§_à¦¬à§ƒà¦¹à¦ƒ_à¦¶à§à¦•à§à¦°_à¦¶à¦¨à¦¿".split("_"),
        longDateFormat: {
            LT: "A h:mm à¦¸à¦®à§Ÿ",
            LTS: "A h:mm:ss à¦¸à¦®à§Ÿ",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm à¦¸à¦®à§Ÿ",
            LLLL: "dddd, D MMMM YYYY, A h:mm à¦¸à¦®à§Ÿ"
        },
        calendar: {
            sameDay: "[à¦†à¦œ] LT",
            nextDay: "[à¦†à¦—à¦¾à¦®à§€à¦•à¦¾à¦²] LT",
            nextWeek: "dddd, LT",
            lastDay: "[à¦—à¦¤à¦•à¦¾à¦²] LT",
            lastWeek: "[à¦—à¦¤] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à¦ªà¦°à§‡",
            past: "%s à¦†à¦—à§‡",
            s: "à¦•à§Ÿà§‡à¦• à¦¸à§‡à¦•à§‡à¦¨à§à¦¡",
            ss: "%d à¦¸à§‡à¦•à§‡à¦¨à§à¦¡",
            m: "à¦à¦• à¦®à¦¿à¦¨à¦¿à¦Ÿ",
            mm: "%d à¦®à¦¿à¦¨à¦¿à¦Ÿ",
            h: "à¦à¦• à¦˜à¦¨à§à¦Ÿà¦¾",
            hh: "%d à¦˜à¦¨à§à¦Ÿà¦¾",
            d: "à¦à¦• à¦¦à¦¿à¦¨",
            dd: "%d à¦¦à¦¿à¦¨",
            M: "à¦à¦• à¦®à¦¾à¦¸",
            MM: "%d à¦®à¦¾à¦¸",
            y: "à¦à¦• à¦¬à¦›à¦°",
            yy: "%d à¦¬à¦›à¦°"
        },
        preparse: function(e) {
            return e.replace(/[\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef\u09e6]/g, function(e) {
                return an[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return nn[e]
            })
        },
        meridiemParse: /\u09b0\u09be\u09a4|\u09b8\u0995\u09be\u09b2|\u09a6\u09c1\u09aa\u09c1\u09b0|\u09ac\u09bf\u0995\u09be\u09b2|\u09b0\u09be\u09a4/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à¦°à¦¾à¦¤" === t && 4 <= e || "à¦¦à§à¦ªà§à¦°" === t && e < 5 || "à¦¬à¦¿à¦•à¦¾à¦²" === t ? e + 12 : e
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à¦°à¦¾à¦¤" : e < 10 ? "à¦¸à¦•à¦¾à¦²" : e < 17 ? "à¦¦à§à¦ªà§à¦°" : e < 20 ? "à¦¬à¦¿à¦•à¦¾à¦²" : "à¦°à¦¾à¦¤"
        },
        week: {
            dow: 0,
            doy: 6
        }
    });
    var rn = {
            1: "à¼¡",
            2: "à¼¢",
            3: "à¼£",
            4: "à¼¤",
            5: "à¼¥",
            6: "à¼¦",
            7: "à¼§",
            8: "à¼¨",
            9: "à¼©",
            0: "à¼ "
        },
        sn = {
            "à¼¡": "1",
            "à¼¢": "2",
            "à¼£": "3",
            "à¼¤": "4",
            "à¼¥": "5",
            "à¼¦": "6",
            "à¼§": "7",
            "à¼¨": "8",
            "à¼©": "9",
            "à¼ ": "0"
        };

    function on(e, t, i) {
        return e + " " + function(e, t) {
            return 2 === t ? function(e) {
                var t = {
                    m: "v",
                    b: "v",
                    d: "z"
                };
                return void 0 === t[e.charAt(0)] ? e : t[e.charAt(0)] + e.substring(1)
            }(e) : e
        }({
            mm: "munutenn",
            MM: "miz",
            dd: "devezh"
        }[i], e)
    }

    function dn(e, t, i) {
        var n = e + " ";
        switch (i) {
            case "ss":
                return n + (1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi");
            case "m":
                return t ? "jedna minuta" : "jedne minute";
            case "mm":
                return n + (1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta");
            case "h":
                return t ? "jedan sat" : "jednog sata";
            case "hh":
                return n + (1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati");
            case "dd":
                return n + (1 === e ? "dan" : "dana");
            case "MM":
                return n + (1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci");
            case "yy":
                return n + (1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina")
        }
    }
    i.defineLocale("bo", {
        months: "à½Ÿà¾³à¼‹à½–à¼‹à½‘à½„à¼‹à½”à½¼_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½‰à½²à½¦à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½¦à½´à½˜à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½žà½²à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½£à¾”à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à¾²à½´à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½‘à½´à½“à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½¢à¾’à¾±à½‘à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à½‚à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½…à½²à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½‰à½²à½¦à¼‹à½”".split("_"),
        monthsShort: "à½Ÿà¾³à¼‹à½–à¼‹à½‘à½„à¼‹à½”à½¼_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½‰à½²à½¦à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½¦à½´à½˜à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½žà½²à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½£à¾”à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à¾²à½´à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½‘à½´à½“à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½¢à¾’à¾±à½‘à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à½‚à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½…à½²à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½‰à½²à½¦à¼‹à½”".split("_"),
        weekdays: "à½‚à½Ÿà½ à¼‹à½‰à½²à¼‹à½˜à¼‹_à½‚à½Ÿà½ à¼‹à½Ÿà¾³à¼‹à½–à¼‹_à½‚à½Ÿà½ à¼‹à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½‚à½Ÿà½ à¼‹à½£à¾·à½‚à¼‹à½”à¼‹_à½‚à½Ÿà½ à¼‹à½•à½´à½¢à¼‹à½–à½´_à½‚à½Ÿà½ à¼‹à½”à¼‹à½¦à½„à½¦à¼‹_à½‚à½Ÿà½ à¼‹à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"),
        weekdaysShort: "à½‰à½²à¼‹à½˜à¼‹_à½Ÿà¾³à¼‹à½–à¼‹_à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½£à¾·à½‚à¼‹à½”à¼‹_à½•à½´à½¢à¼‹à½–à½´_à½”à¼‹à½¦à½„à½¦à¼‹_à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"),
        weekdaysMin: "à½‰à½²à¼‹à½˜à¼‹_à½Ÿà¾³à¼‹à½–à¼‹_à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½£à¾·à½‚à¼‹à½”à¼‹_à½•à½´à½¢à¼‹à½–à½´_à½”à¼‹à½¦à½„à½¦à¼‹_à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"),
        longDateFormat: {
            LT: "A h:mm",
            LTS: "A h:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm",
            LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        calendar: {
            sameDay: "[à½‘à½²à¼‹à½¢à½²à½„] LT",
            nextDay: "[à½¦à½„à¼‹à½‰à½²à½“] LT",
            nextWeek: "[à½–à½‘à½´à½“à¼‹à½•à¾²à½‚à¼‹à½¢à¾—à½ºà½¦à¼‹à½˜], LT",
            lastDay: "[à½à¼‹à½¦à½„] LT",
            lastWeek: "[à½–à½‘à½´à½“à¼‹à½•à¾²à½‚à¼‹à½˜à½à½ à¼‹à½˜] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à½£à¼‹",
            past: "%s à½¦à¾”à½“à¼‹à½£",
            s: "à½£à½˜à¼‹à½¦à½„",
            ss: "%d à½¦à¾à½¢à¼‹à½†à¼",
            m: "à½¦à¾à½¢à¼‹à½˜à¼‹à½‚à½…à½²à½‚",
            mm: "%d à½¦à¾à½¢à¼‹à½˜",
            h: "à½†à½´à¼‹à½šà½¼à½‘à¼‹à½‚à½…à½²à½‚",
            hh: "%d à½†à½´à¼‹à½šà½¼à½‘",
            d: "à½‰à½²à½“à¼‹à½‚à½…à½²à½‚",
            dd: "%d à½‰à½²à½“à¼‹",
            M: "à½Ÿà¾³à¼‹à½–à¼‹à½‚à½…à½²à½‚",
            MM: "%d à½Ÿà¾³à¼‹à½–",
            y: "à½£à½¼à¼‹à½‚à½…à½²à½‚",
            yy: "%d à½£à½¼"
        },
        preparse: function(e) {
            return e.replace(/[\u0f21\u0f22\u0f23\u0f24\u0f25\u0f26\u0f27\u0f28\u0f29\u0f20]/g, function(e) {
                return sn[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return rn[e]
            })
        },
        meridiemParse: /\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c|\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66|\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44|\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42|\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à½˜à½šà½“à¼‹à½˜à½¼" === t && 4 <= e || "à½‰à½²à½“à¼‹à½‚à½´à½„" === t && e < 5 || "à½‘à½‚à½¼à½„à¼‹à½‘à½‚" === t ? e + 12 : e
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à½˜à½šà½“à¼‹à½˜à½¼" : e < 10 ? "à½žà½¼à½‚à½¦à¼‹à½€à½¦" : e < 17 ? "à½‰à½²à½“à¼‹à½‚à½´à½„" : e < 20 ? "à½‘à½‚à½¼à½„à¼‹à½‘à½‚" : "à½˜à½šà½“à¼‹à½˜à½¼"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("br", {
        months: "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
        monthsShort: "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
        weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
        weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h[e]mm A",
            LTS: "h[e]mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D [a viz] MMMM YYYY",
            LLL: "D [a viz] MMMM YYYY h[e]mm A",
            LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A"
        },
        calendar: {
            sameDay: "[Hiziv da] LT",
            nextDay: "[Warc'hoazh da] LT",
            nextWeek: "dddd [da] LT",
            lastDay: "[Dec'h da] LT",
            lastWeek: "dddd [paset da] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "a-benn %s",
            past: "%s 'zo",
            s: "un nebeud segondennoÃ¹",
            ss: "%d eilenn",
            m: "ur vunutenn",
            mm: on,
            h: "un eur",
            hh: "%d eur",
            d: "un devezh",
            dd: on,
            M: "ur miz",
            MM: on,
            y: "ur bloaz",
            yy: function(e) {
                switch (function e(t) {
                    return 9 < t ? e(t % 10) : t
                }(e)) {
                    case 1:
                    case 3:
                    case 4:
                    case 5:
                    case 9:
                        return e + " bloaz";
                    default:
                        return e + " vloaz"
                }
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}(a\xf1|vet)/,
        ordinal: function(e) {
            return e + (1 === e ? "aÃ±" : "vet")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("bs", {
        months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return "[proÅ¡lu] dddd [u] LT";
                    case 6:
                        return "[proÅ¡le] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[proÅ¡li] dddd [u] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "par sekundi",
            ss: dn,
            m: dn,
            mm: dn,
            h: dn,
            hh: dn,
            d: "dan",
            dd: dn,
            M: "mjesec",
            MM: dn,
            y: "godinu",
            yy: dn
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("ca", {
        months: {
            standalone: "gener_febrer_marÃ§_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
            format: "de gener_de febrer_de marÃ§_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"),
            isFormat: /D[oD]?(\s)+MMMM/
        },
        monthsShort: "gen._febr._marÃ§_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"),
        monthsParseExact: !0,
        weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
        weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
        weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM [de] YYYY",
            ll: "D MMM YYYY",
            LLL: "D MMMM [de] YYYY [a les] H:mm",
            lll: "D MMM YYYY, H:mm",
            LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
            llll: "ddd D MMM YYYY, H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            nextDay: function() {
                return "[demÃ  a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            lastDay: function() {
                return "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [passat a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "d'aquÃ­ %s",
            past: "fa %s",
            s: "uns segons",
            ss: "%d segons",
            m: "un minut",
            mm: "%d minuts",
            h: "una hora",
            hh: "%d hores",
            d: "un dia",
            dd: "%d dies",
            M: "un mes",
            MM: "%d mesos",
            y: "un any",
            yy: "%d anys"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|\xe8|a)/,
        ordinal: function(e, t) {
            var i = 1 === e ? "r" : 2 === e ? "n" : 3 === e ? "r" : 4 === e ? "t" : "Ã¨";
            return "w" !== t && "W" !== t || (i = "a"), e + i
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var un = "leden_Ãºnor_bÅ™ezen_duben_kvÄ›ten_Äerven_Äervenec_srpen_zÃ¡Å™Ã­_Å™Ã­jen_listopad_prosinec".split("_"),
        ln = "led_Ãºno_bÅ™e_dub_kvÄ›_Ävn_Ävc_srp_zÃ¡Å™_Å™Ã­j_lis_pro".split("_");

    function cn(e) {
        return 1 < e && e < 5 && 1 != ~~(e / 10)
    }

    function _n(e, t, i, n) {
        var a = e + " ";
        switch (i) {
            case "s":
                return t || n ? "pÃ¡r sekund" : "pÃ¡r sekundami";
            case "ss":
                return t || n ? a + (cn(e) ? "sekundy" : "sekund") : a + "sekundami";
            case "m":
                return t ? "minuta" : n ? "minutu" : "minutou";
            case "mm":
                return t || n ? a + (cn(e) ? "minuty" : "minut") : a + "minutami";
            case "h":
                return t ? "hodina" : n ? "hodinu" : "hodinou";
            case "hh":
                return t || n ? a + (cn(e) ? "hodiny" : "hodin") : a + "hodinami";
            case "d":
                return t || n ? "den" : "dnem";
            case "dd":
                return t || n ? a + (cn(e) ? "dny" : "dnÃ­") : a + "dny";
            case "M":
                return t || n ? "mÄ›sÃ­c" : "mÄ›sÃ­cem";
            case "MM":
                return t || n ? a + (cn(e) ? "mÄ›sÃ­ce" : "mÄ›sÃ­cÅ¯") : a + "mÄ›sÃ­ci";
            case "y":
                return t || n ? "rok" : "rokem";
            case "yy":
                return t || n ? a + (cn(e) ? "roky" : "let") : a + "lety"
        }
    }

    function mn(e, t, i, n) {
        var a = {
            m: ["eine Minute", "einer Minute"],
            h: ["eine Stunde", "einer Stunde"],
            d: ["ein Tag", "einem Tag"],
            dd: [e + " Tage", e + " Tagen"],
            M: ["ein Monat", "einem Monat"],
            MM: [e + " Monate", e + " Monaten"],
            y: ["ein Jahr", "einem Jahr"],
            yy: [e + " Jahre", e + " Jahren"]
        };
        return t ? a[i][0] : a[i][1]
    }

    function hn(e, t, i, n) {
        var a = {
            m: ["eine Minute", "einer Minute"],
            h: ["eine Stunde", "einer Stunde"],
            d: ["ein Tag", "einem Tag"],
            dd: [e + " Tage", e + " Tagen"],
            M: ["ein Monat", "einem Monat"],
            MM: [e + " Monate", e + " Monaten"],
            y: ["ein Jahr", "einem Jahr"],
            yy: [e + " Jahre", e + " Jahren"]
        };
        return t ? a[i][0] : a[i][1]
    }

    function pn(e, t, i, n) {
        var a = {
            m: ["eine Minute", "einer Minute"],
            h: ["eine Stunde", "einer Stunde"],
            d: ["ein Tag", "einem Tag"],
            dd: [e + " Tage", e + " Tagen"],
            M: ["ein Monat", "einem Monat"],
            MM: [e + " Monate", e + " Monaten"],
            y: ["ein Jahr", "einem Jahr"],
            yy: [e + " Jahre", e + " Jahren"]
        };
        return t ? a[i][0] : a[i][1]
    }
    i.defineLocale("cs", {
        months: un,
        monthsShort: ln,
        monthsParse: function(e, t) {
            var i, n = [];
            for (i = 0; i < 12; i++) n[i] = new RegExp("^" + e[i] + "$|^" + t[i] + "$", "i");
            return n
        }(un, ln),
        shortMonthsParse: function(e) {
            var t, i = [];
            for (t = 0; t < 12; t++) i[t] = new RegExp("^" + e[t] + "$", "i");
            return i
        }(ln),
        longMonthsParse: function(e) {
            var t, i = [];
            for (t = 0; t < 12; t++) i[t] = new RegExp("^" + e[t] + "$", "i");
            return i
        }(un),
        weekdays: "nedÄ›le_pondÄ›lÃ­_ÃºterÃ½_stÅ™eda_Ätvrtek_pÃ¡tek_sobota".split("_"),
        weekdaysShort: "ne_po_Ãºt_st_Ät_pÃ¡_so".split("_"),
        weekdaysMin: "ne_po_Ãºt_st_Ät_pÃ¡_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd D. MMMM YYYY H:mm",
            l: "D. M. YYYY"
        },
        calendar: {
            sameDay: "[dnes v] LT",
            nextDay: "[zÃ­tra v] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v nedÄ›li v] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [v] LT";
                    case 3:
                        return "[ve stÅ™edu v] LT";
                    case 4:
                        return "[ve Ätvrtek v] LT";
                    case 5:
                        return "[v pÃ¡tek v] LT";
                    case 6:
                        return "[v sobotu v] LT"
                }
            },
            lastDay: "[vÄera v] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[minulou nedÄ›li v] LT";
                    case 1:
                    case 2:
                        return "[minulÃ©] dddd [v] LT";
                    case 3:
                        return "[minulou stÅ™edu v] LT";
                    case 4:
                    case 5:
                        return "[minulÃ½] dddd [v] LT";
                    case 6:
                        return "[minulou sobotu v] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "pÅ™ed %s",
            s: _n,
            ss: _n,
            m: _n,
            mm: _n,
            h: _n,
            hh: _n,
            d: _n,
            dd: _n,
            M: _n,
            MM: _n,
            y: _n,
            yy: _n
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("cv", {
        months: "ÐºÓ‘Ñ€Ð»Ð°Ñ‡_Ð½Ð°Ñ€Ó‘Ñ_Ð¿ÑƒÑˆ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó—Ñ€Ñ‚Ð¼Ðµ_ÑƒÑ‚Ó‘_Ò«ÑƒÑ€Ð»Ð°_Ð°Ð²Ó‘Ð½_ÑŽÐ¿Ð°_Ñ‡Ó³Ðº_Ñ€Ð°ÑˆÑ‚Ð°Ð²".split("_"),
        monthsShort: "ÐºÓ‘Ñ€_Ð½Ð°Ñ€_Ð¿ÑƒÑˆ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó—Ñ€_ÑƒÑ‚Ó‘_Ò«ÑƒÑ€_Ð°Ð²Ð½_ÑŽÐ¿Ð°_Ñ‡Ó³Ðº_Ñ€Ð°Ñˆ".split("_"),
        weekdays: "Ð²Ñ‹Ñ€ÑÐ°Ñ€Ð½Ð¸ÐºÑƒÐ½_Ñ‚ÑƒÐ½Ñ‚Ð¸ÐºÑƒÐ½_Ñ‹Ñ‚Ð»Ð°Ñ€Ð¸ÐºÑƒÐ½_ÑŽÐ½ÐºÑƒÐ½_ÐºÓ—Ò«Ð½ÐµÑ€Ð½Ð¸ÐºÑƒÐ½_ÑÑ€Ð½ÐµÐºÑƒÐ½_ÑˆÓ‘Ð¼Ð°Ñ‚ÐºÑƒÐ½".split("_"),
        weekdaysShort: "Ð²Ñ‹Ñ€_Ñ‚ÑƒÐ½_Ñ‹Ñ‚Ð»_ÑŽÐ½_ÐºÓ—Ò«_ÑÑ€Ð½_ÑˆÓ‘Ð¼".split("_"),
        weekdaysMin: "Ð²Ñ€_Ñ‚Ð½_Ñ‹Ñ‚_ÑŽÐ½_ÐºÒ«_ÑÑ€_ÑˆÐ¼".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—]",
            LLL: "YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—], HH:mm",
            LLLL: "dddd, YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—], HH:mm"
        },
        calendar: {
            sameDay: "[ÐŸÐ°ÑÐ½] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
            nextDay: "[Ð«Ñ€Ð°Ð½] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
            lastDay: "[Ó–Ð½ÐµÑ€] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
            nextWeek: "[ÒªÐ¸Ñ‚ÐµÑ] dddd LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
            lastWeek: "[Ð˜Ñ€Ñ‚Ð½Ó—] dddd LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]",
            sameElse: "L"
        },
        relativeTime: {
            future: function(e) {
                return e + (/\u0441\u0435\u0445\u0435\u0442$/i.exec(e) ? "Ñ€ÐµÐ½" : /\u04ab\u0443\u043b$/i.exec(e) ? "Ñ‚Ð°Ð½" : "Ñ€Ð°Ð½")
            },
            past: "%s ÐºÐ°ÑÐ»Ð»Ð°",
            s: "Ð¿Ó—Ñ€-Ð¸Ðº Ò«ÐµÐºÐºÑƒÐ½Ñ‚",
            ss: "%d Ò«ÐµÐºÐºÑƒÐ½Ñ‚",
            m: "Ð¿Ó—Ñ€ Ð¼Ð¸Ð½ÑƒÑ‚",
            mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚",
            h: "Ð¿Ó—Ñ€ ÑÐµÑ…ÐµÑ‚",
            hh: "%d ÑÐµÑ…ÐµÑ‚",
            d: "Ð¿Ó—Ñ€ ÐºÑƒÐ½",
            dd: "%d ÐºÑƒÐ½",
            M: "Ð¿Ó—Ñ€ ÑƒÐ¹Ó‘Ñ…",
            MM: "%d ÑƒÐ¹Ó‘Ñ…",
            y: "Ð¿Ó—Ñ€ Ò«ÑƒÐ»",
            yy: "%d Ò«ÑƒÐ»"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-\u043c\u04d7\u0448/,
        ordinal: "%d-Ð¼Ó—Ñˆ",
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("cy", {
        months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
        weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Heddiw am] LT",
            nextDay: "[Yfory am] LT",
            nextWeek: "dddd [am] LT",
            lastDay: "[Ddoe am] LT",
            lastWeek: "dddd [diwethaf am] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "mewn %s",
            past: "%s yn Ã´l",
            s: "ychydig eiliadau",
            ss: "%d eiliad",
            m: "munud",
            mm: "%d munud",
            h: "awr",
            hh: "%d awr",
            d: "diwrnod",
            dd: "%d diwrnod",
            M: "mis",
            MM: "%d mis",
            y: "blwyddyn",
            yy: "%d flynedd"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        ordinal: function(e) {
            var t = "";
            return 20 < e ? t = 40 === e || 50 === e || 60 === e || 80 === e || 100 === e ? "fed" : "ain" : 0 < e && (t = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"][e]), e + t
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("da", {
        months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag_lÃ¸rdag".split("_"),
        weekdaysShort: "sÃ¸n_man_tir_ons_tor_fre_lÃ¸r".split("_"),
        weekdaysMin: "sÃ¸_ma_ti_on_to_fr_lÃ¸".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
        },
        calendar: {
            sameDay: "[i dag kl.] LT",
            nextDay: "[i morgen kl.] LT",
            nextWeek: "pÃ¥ dddd [kl.] LT",
            lastDay: "[i gÃ¥r kl.] LT",
            lastWeek: "[i] dddd[s kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s siden",
            s: "fÃ¥ sekunder",
            ss: "%d sekunder",
            m: "et minut",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dage",
            M: "en mÃ¥ned",
            MM: "%d mÃ¥neder",
            y: "et Ã¥r",
            yy: "%d Ã¥r"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("de-at", {
        months: "JÃ¤nner_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "JÃ¤n._Feb._MÃ¤rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            ss: "%d Sekunden",
            m: mn,
            mm: "%d Minuten",
            h: mn,
            hh: "%d Stunden",
            d: mn,
            dd: mn,
            M: mn,
            MM: mn,
            y: mn,
            yy: mn
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("de-ch", {
        months: "Januar_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Feb._MÃ¤rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            ss: "%d Sekunden",
            m: hn,
            mm: "%d Minuten",
            h: hn,
            hh: "%d Stunden",
            d: hn,
            dd: hn,
            M: hn,
            MM: hn,
            y: hn,
            yy: hn
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("de", {
        months: "Januar_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Feb._MÃ¤rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            ss: "%d Sekunden",
            m: pn,
            mm: "%d Minuten",
            h: pn,
            hh: "%d Stunden",
            d: pn,
            dd: pn,
            M: pn,
            MM: pn,
            y: pn,
            yy: pn
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var fn = ["Þ–Þ¬Þ‚ÞªÞ‡Þ¦ÞƒÞ©", "ÞŠÞ¬Þ„Þ°ÞƒÞªÞ‡Þ¦ÞƒÞ©", "Þ‰Þ§ÞƒÞ¨Þ—Þª", "Þ‡Þ­Þ•Þ°ÞƒÞ©ÞÞª", "Þ‰Þ­", "Þ–Þ«Þ‚Þ°", "Þ–ÞªÞÞ¦Þ‡Þ¨", "Þ‡Þ¯ÞŽÞ¦ÞÞ°Þ“Þª", "ÞÞ¬Þ•Þ°Þ“Þ¬Þ‰Þ°Þ„Þ¦ÞƒÞª", "Þ‡Þ®Þ†Þ°Þ“Þ¯Þ„Þ¦ÞƒÞª", "Þ‚Þ®ÞˆÞ¬Þ‰Þ°Þ„Þ¦ÞƒÞª", "Þ‘Þ¨ÞÞ¬Þ‰Þ°Þ„Þ¦ÞƒÞª"],
        gn = ["Þ‡Þ§Þ‹Þ¨Þ‡Þ°ÞŒÞ¦", "Þ€Þ¯Þ‰Þ¦", "Þ‡Þ¦Þ‚Þ°ÞŽÞ§ÞƒÞ¦", "Þ„ÞªÞ‹Þ¦", "Þ„ÞªÞƒÞ§ÞÞ°ÞŠÞ¦ÞŒÞ¨", "Þ€ÞªÞ†ÞªÞƒÞª", "Þ€Þ®Þ‚Þ¨Þ€Þ¨ÞƒÞª"];
    i.defineLocale("dv", {
        months: fn,
        monthsShort: fn,
        weekdays: gn,
        weekdaysShort: gn,
        weekdaysMin: "Þ‡Þ§Þ‹Þ¨_Þ€Þ¯Þ‰Þ¦_Þ‡Þ¦Þ‚Þ°_Þ„ÞªÞ‹Þ¦_Þ„ÞªÞƒÞ§_Þ€ÞªÞ†Þª_Þ€Þ®Þ‚Þ¨".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/M/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0789\u0786|\u0789\u078a/,
        isPM: function(e) {
            return "Þ‰ÞŠ" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "Þ‰Þ†" : "Þ‰ÞŠ"
        },
        calendar: {
            sameDay: "[Þ‰Þ¨Þ‡Þ¦Þ‹Þª] LT",
            nextDay: "[Þ‰Þ§Þ‹Þ¦Þ‰Þ§] LT",
            nextWeek: "dddd LT",
            lastDay: "[Þ‡Þ¨Þ‡Þ°Þ”Þ¬] LT",
            lastWeek: "[ÞŠÞ§Þ‡Þ¨ÞŒÞªÞˆÞ¨] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ÞŒÞ¬ÞƒÞ­ÞŽÞ¦Þ‡Þ¨ %s",
            past: "Þ†ÞªÞƒÞ¨Þ‚Þ° %s",
            s: "ÞÞ¨Þ†ÞªÞ‚Þ°ÞŒÞªÞ†Þ®Þ…Þ¬Þ‡Þ°",
            ss: "d% ÞÞ¨Þ†ÞªÞ‚Þ°ÞŒÞª",
            m: "Þ‰Þ¨Þ‚Þ¨Þ“Þ¬Þ‡Þ°",
            mm: "Þ‰Þ¨Þ‚Þ¨Þ“Þª %d",
            h: "ÞŽÞ¦Þ‘Þ¨Þ‡Þ¨ÞƒÞ¬Þ‡Þ°",
            hh: "ÞŽÞ¦Þ‘Þ¨Þ‡Þ¨ÞƒÞª %d",
            d: "Þ‹ÞªÞˆÞ¦Þ€Þ¬Þ‡Þ°",
            dd: "Þ‹ÞªÞˆÞ¦ÞÞ° %d",
            M: "Þ‰Þ¦Þ€Þ¬Þ‡Þ°",
            MM: "Þ‰Þ¦ÞÞ° %d",
            y: "Þ‡Þ¦Þ€Þ¦ÞƒÞ¬Þ‡Þ°",
            yy: "Þ‡Þ¦Þ€Þ¦ÞƒÞª %d"
        },
        preparse: function(e) {
            return e.replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/,/g, "ØŒ")
        },
        week: {
            dow: 7,
            doy: 12
        }
    }), i.defineLocale("el", {
        monthsNominativeEl: "Î™Î±Î½Î¿Ï…Î¬ÏÎ¹Î¿Ï‚_Î¦ÎµÎ²ÏÎ¿Ï…Î¬ÏÎ¹Î¿Ï‚_ÎœÎ¬ÏÏ„Î¹Î¿Ï‚_Î‘Ï€ÏÎ¯Î»Î¹Î¿Ï‚_ÎœÎ¬Î¹Î¿Ï‚_Î™Î¿ÏÎ½Î¹Î¿Ï‚_Î™Î¿ÏÎ»Î¹Î¿Ï‚_Î‘ÏÎ³Î¿Ï…ÏƒÏ„Î¿Ï‚_Î£ÎµÏ€Ï„Î­Î¼Î²ÏÎ¹Î¿Ï‚_ÎŸÎºÏ„ÏŽÎ²ÏÎ¹Î¿Ï‚_ÎÎ¿Î­Î¼Î²ÏÎ¹Î¿Ï‚_Î”ÎµÎºÎ­Î¼Î²ÏÎ¹Î¿Ï‚".split("_"),
        monthsGenitiveEl: "Î™Î±Î½Î¿Ï…Î±ÏÎ¯Î¿Ï…_Î¦ÎµÎ²ÏÎ¿Ï…Î±ÏÎ¯Î¿Ï…_ÎœÎ±ÏÏ„Î¯Î¿Ï…_Î‘Ï€ÏÎ¹Î»Î¯Î¿Ï…_ÎœÎ±ÎÎ¿Ï…_Î™Î¿Ï…Î½Î¯Î¿Ï…_Î™Î¿Ï…Î»Î¯Î¿Ï…_Î‘Ï…Î³Î¿ÏÏƒÏ„Î¿Ï…_Î£ÎµÏ€Ï„ÎµÎ¼Î²ÏÎ¯Î¿Ï…_ÎŸÎºÏ„Ï‰Î²ÏÎ¯Î¿Ï…_ÎÎ¿ÎµÎ¼Î²ÏÎ¯Î¿Ï…_Î”ÎµÎºÎµÎ¼Î²ÏÎ¯Î¿Ï…".split("_"),
        months: function(e, t) {
            return e ? "string" == typeof t && /D/.test(t.substring(0, t.indexOf("MMMM"))) ? this._monthsGenitiveEl[e.month()] : this._monthsNominativeEl[e.month()] : this._monthsNominativeEl
        },
        monthsShort: "Î™Î±Î½_Î¦ÎµÎ²_ÎœÎ±Ï_Î‘Ï€Ï_ÎœÎ±ÏŠ_Î™Î¿Ï…Î½_Î™Î¿Ï…Î»_Î‘Ï…Î³_Î£ÎµÏ€_ÎŸÎºÏ„_ÎÎ¿Îµ_Î”ÎµÎº".split("_"),
        weekdays: "ÎšÏ…ÏÎ¹Î±ÎºÎ®_Î”ÎµÏ…Ï„Î­ÏÎ±_Î¤ÏÎ¯Ï„Î·_Î¤ÎµÏ„Î¬ÏÏ„Î·_Î Î­Î¼Ï€Ï„Î·_Î Î±ÏÎ±ÏƒÎºÎµÏ…Î®_Î£Î¬Î²Î²Î±Ï„Î¿".split("_"),
        weekdaysShort: "ÎšÏ…Ï_Î”ÎµÏ…_Î¤ÏÎ¹_Î¤ÎµÏ„_Î ÎµÎ¼_Î Î±Ï_Î£Î±Î²".split("_"),
        weekdaysMin: "ÎšÏ…_Î”Îµ_Î¤Ï_Î¤Îµ_Î Îµ_Î Î±_Î£Î±".split("_"),
        meridiem: function(e, t, i) {
            return 11 < e ? i ? "Î¼Î¼" : "ÎœÎœ" : i ? "Ï€Î¼" : "Î Îœ"
        },
        isPM: function(e) {
            return "Î¼" === (e + "").toLowerCase()[0]
        },
        meridiemParse: /[\u03a0\u039c]\.?\u039c?\.?/i,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendarEl: {
            sameDay: "[Î£Î®Î¼ÎµÏÎ± {}] LT",
            nextDay: "[Î‘ÏÏÎ¹Î¿ {}] LT",
            nextWeek: "dddd [{}] LT",
            lastDay: "[Î§Î¸ÎµÏ‚ {}] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 6:
                        return "[Ï„Î¿ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î¿] dddd [{}] LT";
                    default:
                        return "[Ï„Î·Î½ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î·] dddd [{}] LT"
                }
            },
            sameElse: "L"
        },
        calendar: function(e, t) {
            var i = this._calendarEl[e],
                n = t && t.hours();
            return A(i) && (i = i.apply(t)), i.replace("{}", n % 12 == 1 ? "ÏƒÏ„Î·" : "ÏƒÏ„Î¹Ï‚")
        },
        relativeTime: {
            future: "ÏƒÎµ %s",
            past: "%s Ï€ÏÎ¹Î½",
            s: "Î»Î¯Î³Î± Î´ÎµÏ…Ï„ÎµÏÏŒÎ»ÎµÏ€Ï„Î±",
            ss: "%d Î´ÎµÏ…Ï„ÎµÏÏŒÎ»ÎµÏ€Ï„Î±",
            m: "Î­Î½Î± Î»ÎµÏ€Ï„ÏŒ",
            mm: "%d Î»ÎµÏ€Ï„Î¬",
            h: "Î¼Î¯Î± ÏŽÏÎ±",
            hh: "%d ÏŽÏÎµÏ‚",
            d: "Î¼Î¯Î± Î¼Î­ÏÎ±",
            dd: "%d Î¼Î­ÏÎµÏ‚",
            M: "Î­Î½Î±Ï‚ Î¼Î®Î½Î±Ï‚",
            MM: "%d Î¼Î®Î½ÎµÏ‚",
            y: "Î­Î½Î±Ï‚ Ï‡ÏÏŒÎ½Î¿Ï‚",
            yy: "%d Ï‡ÏÏŒÎ½Î¹Î±"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\u03b7/,
        ordinal: "%dÎ·",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("en-au", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("en-ca", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "YYYY-MM-DD",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        }
    }), i.defineLocale("en-gb", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("en-ie", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("en-il", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        }
    }), i.defineLocale("en-nz", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("eo", {
        months: "januaro_februaro_marto_aprilo_majo_junio_julio_aÅ­gusto_septembro_oktobro_novembro_decembro".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aÅ­g_sep_okt_nov_dec".split("_"),
        weekdays: "dimanÄ‰o_lundo_mardo_merkredo_ÄµaÅ­do_vendredo_sabato".split("_"),
        weekdaysShort: "dim_lun_mard_merk_ÄµaÅ­_ven_sab".split("_"),
        weekdaysMin: "di_lu_ma_me_Äµa_ve_sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D[-a de] MMMM, YYYY",
            LLL: "D[-a de] MMMM, YYYY HH:mm",
            LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm"
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function(e) {
            return "p" === e.charAt(0).toLowerCase()
        },
        meridiem: function(e, t, i) {
            return 11 < e ? i ? "p.t.m." : "P.T.M." : i ? "a.t.m." : "A.T.M."
        },
        calendar: {
            sameDay: "[HodiaÅ­ je] LT",
            nextDay: "[MorgaÅ­ je] LT",
            nextWeek: "dddd [je] LT",
            lastDay: "[HieraÅ­ je] LT",
            lastWeek: "[pasinta] dddd [je] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "post %s",
            past: "antaÅ­ %s",
            s: "sekundoj",
            ss: "%d sekundoj",
            m: "minuto",
            mm: "%d minutoj",
            h: "horo",
            hh: "%d horoj",
            d: "tago",
            dd: "%d tagoj",
            M: "monato",
            MM: "%d monatoj",
            y: "jaro",
            yy: "%d jaroj"
        },
        dayOfMonthOrdinalParse: /\d{1,2}a/,
        ordinal: "%da",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var yn = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        Mn = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        vn = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
        Ln = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
    i.defineLocale("es-do", {
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: function(e, t) {
            return e ? /-MMM-/.test(t) ? Mn[e.month()] : yn[e.month()] : yn
        },
        monthsRegex: Ln,
        monthsShortRegex: Ln,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: vn,
        longMonthsParse: vn,
        shortMonthsParse: vn,
        weekdays: "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split("_"),
        weekdaysShort: "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sÃ¡".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY h:mm A",
            LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextDay: function() {
                return "[maÃ±ana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un dÃ­a",
            dd: "%d dÃ­as",
            M: "un mes",
            MM: "%d meses",
            y: "un aÃ±o",
            yy: "%d aÃ±os"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var wn = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        bn = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
    i.defineLocale("es-us", {
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: function(e, t) {
            return e ? /-MMM-/.test(t) ? bn[e.month()] : wn[e.month()] : wn
        },
        monthsParseExact: !0,
        weekdays: "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split("_"),
        weekdaysShort: "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sÃ¡".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "MM/DD/YYYY",
            LL: "MMMM [de] D [de] YYYY",
            LLL: "MMMM [de] D [de] YYYY h:mm A",
            LLLL: "dddd, MMMM [de] D [de] YYYY h:mm A"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextDay: function() {
                return "[maÃ±ana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un dÃ­a",
            dd: "%d dÃ­as",
            M: "un mes",
            MM: "%d meses",
            y: "un aÃ±o",
            yy: "%d aÃ±os"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 0,
            doy: 6
        }
    });
    var kn = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        Yn = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        Tn = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
        Dn = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

    function An(e, t, i, n) {
        var a = {
            s: ["mÃµne sekundi", "mÃµni sekund", "paar sekundit"],
            ss: [e + "sekundi", e + "sekundit"],
            m: ["Ã¼he minuti", "Ã¼ks minut"],
            mm: [e + " minuti", e + " minutit"],
            h: ["Ã¼he tunni", "tund aega", "Ã¼ks tund"],
            hh: [e + " tunni", e + " tundi"],
            d: ["Ã¼he pÃ¤eva", "Ã¼ks pÃ¤ev"],
            M: ["kuu aja", "kuu aega", "Ã¼ks kuu"],
            MM: [e + " kuu", e + " kuud"],
            y: ["Ã¼he aasta", "aasta", "Ã¼ks aasta"],
            yy: [e + " aasta", e + " aastat"]
        };
        return t ? a[i][2] ? a[i][2] : a[i][1] : n ? a[i][0] : a[i][1]
    }
    i.defineLocale("es", {
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: function(e, t) {
            return e ? /-MMM-/.test(t) ? Yn[e.month()] : kn[e.month()] : kn
        },
        monthsRegex: Dn,
        monthsShortRegex: Dn,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: Tn,
        longMonthsParse: Tn,
        shortMonthsParse: Tn,
        weekdays: "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split("_"),
        weekdaysShort: "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sÃ¡".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextDay: function() {
                return "[maÃ±ana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un dÃ­a",
            dd: "%d dÃ­as",
            M: "un mes",
            MM: "%d meses",
            y: "un aÃ±o",
            yy: "%d aÃ±os"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("et", {
        months: "jaanuar_veebruar_mÃ¤rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
        monthsShort: "jaan_veebr_mÃ¤rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
        weekdays: "pÃ¼hapÃ¤ev_esmaspÃ¤ev_teisipÃ¤ev_kolmapÃ¤ev_neljapÃ¤ev_reede_laupÃ¤ev".split("_"),
        weekdaysShort: "P_E_T_K_N_R_L".split("_"),
        weekdaysMin: "P_E_T_K_N_R_L".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[TÃ¤na,] LT",
            nextDay: "[Homme,] LT",
            nextWeek: "[JÃ¤rgmine] dddd LT",
            lastDay: "[Eile,] LT",
            lastWeek: "[Eelmine] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s pÃ¤rast",
            past: "%s tagasi",
            s: An,
            ss: An,
            m: An,
            mm: An,
            h: An,
            hh: An,
            d: An,
            dd: "%d pÃ¤eva",
            M: An,
            MM: An,
            y: An,
            yy: An
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("eu", {
        months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
        monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
        monthsParseExact: !0,
        weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
        weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
        weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY[ko] MMMM[ren] D[a]",
            LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
            LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
            l: "YYYY-M-D",
            ll: "YYYY[ko] MMM D[a]",
            lll: "YYYY[ko] MMM D[a] HH:mm",
            llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
        },
        calendar: {
            sameDay: "[gaur] LT[etan]",
            nextDay: "[bihar] LT[etan]",
            nextWeek: "dddd LT[etan]",
            lastDay: "[atzo] LT[etan]",
            lastWeek: "[aurreko] dddd LT[etan]",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s barru",
            past: "duela %s",
            s: "segundo batzuk",
            ss: "%d segundo",
            m: "minutu bat",
            mm: "%d minutu",
            h: "ordu bat",
            hh: "%d ordu",
            d: "egun bat",
            dd: "%d egun",
            M: "hilabete bat",
            MM: "%d hilabete",
            y: "urte bat",
            yy: "%d urte"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Sn = {
            1: "Û±",
            2: "Û²",
            3: "Û³",
            4: "Û´",
            5: "Ûµ",
            6: "Û¶",
            7: "Û·",
            8: "Û¸",
            9: "Û¹",
            0: "Û°"
        },
        xn = {
            "Û±": "1",
            "Û²": "2",
            "Û³": "3",
            "Û´": "4",
            "Ûµ": "5",
            "Û¶": "6",
            "Û·": "7",
            "Û¸": "8",
            "Û¹": "9",
            "Û°": "0"
        };
    i.defineLocale("fa", {
        months: "Ú˜Ø§Ù†ÙˆÛŒÙ‡_ÙÙˆØ±ÛŒÙ‡_Ù…Ø§Ø±Ø³_Ø¢ÙˆØ±ÛŒÙ„_Ù…Ù‡_Ú˜ÙˆØ¦Ù†_Ú˜ÙˆØ¦ÛŒÙ‡_Ø§ÙˆØª_Ø³Ù¾ØªØ§Ù…Ø¨Ø±_Ø§Ú©ØªØ¨Ø±_Ù†ÙˆØ§Ù…Ø¨Ø±_Ø¯Ø³Ø§Ù…Ø¨Ø±".split("_"),
        monthsShort: "Ú˜Ø§Ù†ÙˆÛŒÙ‡_ÙÙˆØ±ÛŒÙ‡_Ù…Ø§Ø±Ø³_Ø¢ÙˆØ±ÛŒÙ„_Ù…Ù‡_Ú˜ÙˆØ¦Ù†_Ú˜ÙˆØ¦ÛŒÙ‡_Ø§ÙˆØª_Ø³Ù¾ØªØ§Ù…Ø¨Ø±_Ø§Ú©ØªØ¨Ø±_Ù†ÙˆØ§Ù…Ø¨Ø±_Ø¯Ø³Ø§Ù…Ø¨Ø±".split("_"),
        weekdays: "ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡_Ø¯ÙˆØ´Ù†Ø¨Ù‡_Ø³Ù‡â€ŒØ´Ù†Ø¨Ù‡_Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡_Ù¾Ù†Ø¬â€ŒØ´Ù†Ø¨Ù‡_Ø¬Ù…Ø¹Ù‡_Ø´Ù†Ø¨Ù‡".split("_"),
        weekdaysShort: "ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡_Ø¯ÙˆØ´Ù†Ø¨Ù‡_Ø³Ù‡â€ŒØ´Ù†Ø¨Ù‡_Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡_Ù¾Ù†Ø¬â€ŒØ´Ù†Ø¨Ù‡_Ø¬Ù…Ø¹Ù‡_Ø´Ù†Ø¨Ù‡".split("_"),
        weekdaysMin: "ÛŒ_Ø¯_Ø³_Ú†_Ù¾_Ø¬_Ø´".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631|\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/,
        isPM: function(e) {
            return /\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "Ù‚Ø¨Ù„ Ø§Ø² Ø¸Ù‡Ø±" : "Ø¨Ø¹Ø¯ Ø§Ø² Ø¸Ù‡Ø±"
        },
        calendar: {
            sameDay: "[Ø§Ù…Ø±ÙˆØ² Ø³Ø§Ø¹Øª] LT",
            nextDay: "[ÙØ±Ø¯Ø§ Ø³Ø§Ø¹Øª] LT",
            nextWeek: "dddd [Ø³Ø§Ø¹Øª] LT",
            lastDay: "[Ø¯ÛŒØ±ÙˆØ² Ø³Ø§Ø¹Øª] LT",
            lastWeek: "dddd [Ù¾ÛŒØ´] [Ø³Ø§Ø¹Øª] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "Ø¯Ø± %s",
            past: "%s Ù¾ÛŒØ´",
            s: "Ú†Ù†Ø¯ Ø«Ø§Ù†ÛŒÙ‡",
            ss: "Ø«Ø§Ù†ÛŒÙ‡ d%",
            m: "ÛŒÚ© Ø¯Ù‚ÛŒÙ‚Ù‡",
            mm: "%d Ø¯Ù‚ÛŒÙ‚Ù‡",
            h: "ÛŒÚ© Ø³Ø§Ø¹Øª",
            hh: "%d Ø³Ø§Ø¹Øª",
            d: "ÛŒÚ© Ø±ÙˆØ²",
            dd: "%d Ø±ÙˆØ²",
            M: "ÛŒÚ© Ù…Ø§Ù‡",
            MM: "%d Ù…Ø§Ù‡",
            y: "ÛŒÚ© Ø³Ø§Ù„",
            yy: "%d Ø³Ø§Ù„"
        },
        preparse: function(e) {
            return e.replace(/[\u06f0-\u06f9]/g, function(e) {
                return xn[e]
            }).replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return Sn[e]
            }).replace(/,/g, "ØŒ")
        },
        dayOfMonthOrdinalParse: /\d{1,2}\u0645/,
        ordinal: "%dÙ…",
        week: {
            dow: 6,
            doy: 12
        }
    });
    var En = "nolla yksi kaksi kolme neljÃ¤ viisi kuusi seitsemÃ¤n kahdeksan yhdeksÃ¤n".split(" "),
        Hn = ["nolla", "yhden", "kahden", "kolmen", "neljÃ¤n", "viiden", "kuuden", En[7], En[8], En[9]];

    function On(e, t, i, n) {
        var a, r = "";
        switch (i) {
            case "s":
                return n ? "muutaman sekunnin" : "muutama sekunti";
            case "ss":
                return n ? "sekunnin" : "sekuntia";
            case "m":
                return n ? "minuutin" : "minuutti";
            case "mm":
                r = n ? "minuutin" : "minuuttia";
                break;
            case "h":
                return n ? "tunnin" : "tunti";
            case "hh":
                r = n ? "tunnin" : "tuntia";
                break;
            case "d":
                return n ? "pÃ¤ivÃ¤n" : "pÃ¤ivÃ¤";
            case "dd":
                r = n ? "pÃ¤ivÃ¤n" : "pÃ¤ivÃ¤Ã¤";
                break;
            case "M":
                return n ? "kuukauden" : "kuukausi";
            case "MM":
                r = n ? "kuukauden" : "kuukautta";
                break;
            case "y":
                return n ? "vuoden" : "vuosi";
            case "yy":
                r = n ? "vuoden" : "vuotta"
        }
        return ((a = e) < 10 ? n ? Hn[a] : En[a] : a) + " " + r
    }
    i.defineLocale("fi", {
        months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesÃ¤kuu_heinÃ¤kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
        monthsShort: "tammi_helmi_maalis_huhti_touko_kesÃ¤_heinÃ¤_elo_syys_loka_marras_joulu".split("_"),
        weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
        weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
        weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD.MM.YYYY",
            LL: "Do MMMM[ta] YYYY",
            LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
            LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
            l: "D.M.YYYY",
            ll: "Do MMM YYYY",
            lll: "Do MMM YYYY, [klo] HH.mm",
            llll: "ddd, Do MMM YYYY, [klo] HH.mm"
        },
        calendar: {
            sameDay: "[tÃ¤nÃ¤Ã¤n] [klo] LT",
            nextDay: "[huomenna] [klo] LT",
            nextWeek: "dddd [klo] LT",
            lastDay: "[eilen] [klo] LT",
            lastWeek: "[viime] dddd[na] [klo] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s pÃ¤Ã¤stÃ¤",
            past: "%s sitten",
            s: On,
            ss: On,
            m: On,
            mm: On,
            h: On,
            hh: On,
            d: On,
            dd: On,
            M: On,
            MM: On,
            y: On,
            yy: On
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("fo", {
        months: "januar_februar_mars_aprÃ­l_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "sunnudagur_mÃ¡nadagur_tÃ½sdagur_mikudagur_hÃ³sdagur_frÃ­ggjadagur_leygardagur".split("_"),
        weekdaysShort: "sun_mÃ¡n_tÃ½s_mik_hÃ³s_frÃ­_ley".split("_"),
        weekdaysMin: "su_mÃ¡_tÃ½_mi_hÃ³_fr_le".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D. MMMM, YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ã dag kl.] LT",
            nextDay: "[Ã morgin kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[Ã gjÃ¡r kl.] LT",
            lastWeek: "[sÃ­Ã°stu] dddd [kl] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "um %s",
            past: "%s sÃ­Ã°ani",
            s: "fÃ¡ sekund",
            ss: "%d sekundir",
            m: "ein minutt",
            mm: "%d minuttir",
            h: "ein tÃ­mi",
            hh: "%d tÃ­mar",
            d: "ein dagur",
            dd: "%d dagar",
            M: "ein mÃ¡naÃ°i",
            MM: "%d mÃ¡naÃ°ir",
            y: "eitt Ã¡r",
            yy: "%d Ã¡r"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("fr-ca", {
        months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"),
        monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"),
        monthsParseExact: !0,
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourdâ€™hui Ã ] LT",
            nextDay: "[Demain Ã ] LT",
            nextWeek: "dddd [Ã ] LT",
            lastDay: "[Hier Ã ] LT",
            lastWeek: "dddd [dernier Ã ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            ss: "%d secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function(e, t) {
            switch (t) {
                default:
                    case "M":
                    case "Q":
                    case "D":
                    case "DDD":
                    case "d":
                    return e + (1 === e ? "er" : "e");
                case "w":
                        case "W":
                        return e + (1 === e ? "re" : "e")
            }
        }
    }), i.defineLocale("fr-ch", {
        months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"),
        monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"),
        monthsParseExact: !0,
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourdâ€™hui Ã ] LT",
            nextDay: "[Demain Ã ] LT",
            nextWeek: "dddd [Ã ] LT",
            lastDay: "[Hier Ã ] LT",
            lastWeek: "dddd [dernier Ã ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            ss: "%d secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function(e, t) {
            switch (t) {
                default:
                    case "M":
                    case "Q":
                    case "D":
                    case "DDD":
                    case "d":
                    return e + (1 === e ? "er" : "e");
                case "w":
                        case "W":
                        return e + (1 === e ? "re" : "e")
            }
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("fr", {
        months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"),
        monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"),
        monthsParseExact: !0,
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourdâ€™hui Ã ] LT",
            nextDay: "[Demain Ã ] LT",
            nextWeek: "dddd [Ã ] LT",
            lastDay: "[Hier Ã ] LT",
            lastWeek: "dddd [dernier Ã ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            ss: "%d secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal: function(e, t) {
            switch (t) {
                case "D":
                    return e + (1 === e ? "er" : "");
                default:
                case "M":
                case "Q":
                case "DDD":
                case "d":
                    return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                    return e + (1 === e ? "re" : "e")
            }
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Cn = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),
        Pn = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");

    function zn(e, t, i, n) {
        var a = {
            s: ["thodde secondanim", "thodde second"],
            ss: [e + " secondanim", e + " second"],
            m: ["eka mintan", "ek minute"],
            mm: [e + " mintanim", e + " mintam"],
            h: ["eka horan", "ek hor"],
            hh: [e + " horanim", e + " horam"],
            d: ["eka disan", "ek dis"],
            dd: [e + " disanim", e + " dis"],
            M: ["eka mhoinean", "ek mhoino"],
            MM: [e + " mhoineanim", e + " mhoine"],
            y: ["eka vorsan", "ek voros"],
            yy: [e + " vorsanim", e + " vorsam"]
        };
        return t ? a[i][0] : a[i][1]
    }
    i.defineLocale("fy", {
        months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
        monthsShort: function(e, t) {
            return e ? /-MMM-/.test(t) ? Pn[e.month()] : Cn[e.month()] : Cn
        },
        monthsParseExact: !0,
        weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
        weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
        weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[hjoed om] LT",
            nextDay: "[moarn om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[juster om] LT",
            lastWeek: "[Ã´frÃ»ne] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "oer %s",
            past: "%s lyn",
            s: "in pear sekonden",
            ss: "%d sekonden",
            m: "ien minÃºt",
            mm: "%d minuten",
            h: "ien oere",
            hh: "%d oeren",
            d: "ien dei",
            dd: "%d dagen",
            M: "ien moanne",
            MM: "%d moannen",
            y: "ien jier",
            yy: "%d jierren"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(e) {
            return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("gd", {
        months: ["Am Faoilleach", "An Gearran", "Am MÃ rt", "An Giblean", "An CÃ¨itean", "An t-Ã’gmhios", "An t-Iuchar", "An LÃ¹nastal", "An t-Sultain", "An DÃ mhair", "An t-Samhain", "An DÃ¹bhlachd"],
        monthsShort: ["Faoi", "Gear", "MÃ rt", "Gibl", "CÃ¨it", "Ã’gmh", "Iuch", "LÃ¹n", "Sult", "DÃ mh", "Samh", "DÃ¹bh"],
        monthsParseExact: !0,
        weekdays: ["DidÃ²mhnaich", "Diluain", "DimÃ irt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"],
        weekdaysShort: ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
        weekdaysMin: ["DÃ²", "Lu", "MÃ ", "Ci", "Ar", "Ha", "Sa"],
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[An-diugh aig] LT",
            nextDay: "[A-mÃ ireach aig] LT",
            nextWeek: "dddd [aig] LT",
            lastDay: "[An-dÃ¨ aig] LT",
            lastWeek: "dddd [seo chaidh] [aig] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ann an %s",
            past: "bho chionn %s",
            s: "beagan diogan",
            ss: "%d diogan",
            m: "mionaid",
            mm: "%d mionaidean",
            h: "uair",
            hh: "%d uairean",
            d: "latha",
            dd: "%d latha",
            M: "mÃ¬os",
            MM: "%d mÃ¬osan",
            y: "bliadhna",
            yy: "%d bliadhna"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
        ordinal: function(e) {
            return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("gl", {
        months: "xaneiro_febreiro_marzo_abril_maio_xuÃ±o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
        monthsShort: "xan._feb._mar._abr._mai._xuÃ±._xul._ago._set._out._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "domingo_luns_martes_mÃ©rcores_xoves_venres_sÃ¡bado".split("_"),
        weekdaysShort: "dom._lun._mar._mÃ©r._xov._ven._sÃ¡b.".split("_"),
        weekdaysMin: "do_lu_ma_mÃ©_xo_ve_sÃ¡".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoxe " + (1 !== this.hours() ? "Ã¡s" : "Ã¡") + "] LT"
            },
            nextDay: function() {
                return "[maÃ±Ã¡ " + (1 !== this.hours() ? "Ã¡s" : "Ã¡") + "] LT"
            },
            nextWeek: function() {
                return "dddd [" + (1 !== this.hours() ? "Ã¡s" : "a") + "] LT"
            },
            lastDay: function() {
                return "[onte " + (1 !== this.hours() ? "Ã¡" : "a") + "] LT"
            },
            lastWeek: function() {
                return "[o] dddd [pasado " + (1 !== this.hours() ? "Ã¡s" : "a") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: function(e) {
                return 0 === e.indexOf("un") ? "n" + e : "en " + e
            },
            past: "hai %s",
            s: "uns segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "unha hora",
            hh: "%d horas",
            d: "un dÃ­a",
            dd: "%d dÃ­as",
            M: "un mes",
            MM: "%d meses",
            y: "un ano",
            yy: "%d anos"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("gom-latn", {
        months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),
        monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),
        weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
        weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "A h:mm [vazta]",
            LTS: "A h:mm:ss [vazta]",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY A h:mm [vazta]",
            LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",
            llll: "ddd, D MMM YYYY, A h:mm [vazta]"
        },
        calendar: {
            sameDay: "[Aiz] LT",
            nextDay: "[Faleam] LT",
            nextWeek: "[Ieta to] dddd[,] LT",
            lastDay: "[Kal] LT",
            lastWeek: "[Fatlo] dddd[,] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s",
            past: "%s adim",
            s: zn,
            ss: zn,
            m: zn,
            mm: zn,
            h: zn,
            hh: zn,
            d: zn,
            dd: zn,
            M: zn,
            MM: zn,
            y: zn,
            yy: zn
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er)/,
        ordinal: function(e, t) {
            switch (t) {
                case "D":
                    return e + "er";
                default:
                case "M":
                case "Q":
                case "DDD":
                case "d":
                case "w":
                case "W":
                    return e
            }
        },
        week: {
            dow: 1,
            doy: 4
        },
        meridiemParse: /rati|sokalli|donparam|sanje/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "rati" === t ? e < 4 ? e : e + 12 : "sokalli" === t ? e : "donparam" === t ? 12 < e ? e : e + 12 : "sanje" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "rati" : e < 12 ? "sokalli" : e < 16 ? "donparam" : e < 20 ? "sanje" : "rati"
        }
    });
    var jn = {
            1: "à«§",
            2: "à«¨",
            3: "à«©",
            4: "à«ª",
            5: "à««",
            6: "à«¬",
            7: "à«­",
            8: "à«®",
            9: "à«¯",
            0: "à«¦"
        },
        Rn = {
            "à«§": "1",
            "à«¨": "2",
            "à«©": "3",
            "à«ª": "4",
            "à««": "5",
            "à«¬": "6",
            "à«­": "7",
            "à«®": "8",
            "à«¯": "9",
            "à«¦": "0"
        };
    i.defineLocale("gu", {
        months: "àªœàª¾àª¨à«àª¯à«àª†àª°à«€_àª«à«‡àª¬à«àª°à«àª†àª°à«€_àª®àª¾àª°à«àªš_àªàªªà«àª°àª¿àª²_àª®à«‡_àªœà«‚àª¨_àªœà«àª²àª¾àªˆ_àª‘àª—àª¸à«àªŸ_àª¸àªªà«àªŸà«‡àª®à«àª¬àª°_àª‘àª•à«àªŸà«àª¬àª°_àª¨àªµà«‡àª®à«àª¬àª°_àª¡àª¿àª¸à«‡àª®à«àª¬àª°".split("_"),
        monthsShort: "àªœàª¾àª¨à«àª¯à«._àª«à«‡àª¬à«àª°à«._àª®àª¾àª°à«àªš_àªàªªà«àª°àª¿._àª®à«‡_àªœà«‚àª¨_àªœà«àª²àª¾._àª‘àª—._àª¸àªªà«àªŸà«‡._àª‘àª•à«àªŸà«._àª¨àªµà«‡._àª¡àª¿àª¸à«‡.".split("_"),
        monthsParseExact: !0,
        weekdays: "àª°àªµàª¿àªµàª¾àª°_àª¸à«‹àª®àªµàª¾àª°_àª®àª‚àª—àª³àªµàª¾àª°_àª¬à«àª§à«àªµàª¾àª°_àª—à«àª°à«àªµàª¾àª°_àª¶à«àª•à«àª°àªµàª¾àª°_àª¶àª¨àª¿àªµàª¾àª°".split("_"),
        weekdaysShort: "àª°àªµàª¿_àª¸à«‹àª®_àª®àª‚àª—àª³_àª¬à«àª§à«_àª—à«àª°à«_àª¶à«àª•à«àª°_àª¶àª¨àª¿".split("_"),
        weekdaysMin: "àª°_àª¸à«‹_àª®àª‚_àª¬à«_àª—à«_àª¶à«_àª¶".split("_"),
        longDateFormat: {
            LT: "A h:mm àªµàª¾àª—à«àª¯à«‡",
            LTS: "A h:mm:ss àªµàª¾àª—à«àª¯à«‡",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm àªµàª¾àª—à«àª¯à«‡",
            LLLL: "dddd, D MMMM YYYY, A h:mm àªµàª¾àª—à«àª¯à«‡"
        },
        calendar: {
            sameDay: "[àª†àªœ] LT",
            nextDay: "[àª•àª¾àª²à«‡] LT",
            nextWeek: "dddd, LT",
            lastDay: "[àª—àª‡àª•àª¾àª²à«‡] LT",
            lastWeek: "[àªªàª¾àª›àª²àª¾] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s àª®àª¾",
            past: "%s àªªà«‡àª¹àª²àª¾",
            s: "àª…àª®à«àª• àªªàª³à«‹",
            ss: "%d àª¸à«‡àª•àª‚àª¡",
            m: "àªàª• àª®àª¿àª¨àª¿àªŸ",
            mm: "%d àª®àª¿àª¨àª¿àªŸ",
            h: "àªàª• àª•àª²àª¾àª•",
            hh: "%d àª•àª²àª¾àª•",
            d: "àªàª• àª¦àª¿àªµàª¸",
            dd: "%d àª¦àª¿àªµàª¸",
            M: "àªàª• àª®àª¹àª¿àª¨à«‹",
            MM: "%d àª®àª¹àª¿àª¨à«‹",
            y: "àªàª• àªµàª°à«àª·",
            yy: "%d àªµàª°à«àª·"
        },
        preparse: function(e) {
            return e.replace(/[\u0ae7\u0ae8\u0ae9\u0aea\u0aeb\u0aec\u0aed\u0aee\u0aef\u0ae6]/g, function(e) {
                return Rn[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return jn[e]
            })
        },
        meridiemParse: /\u0ab0\u0abe\u0aa4|\u0aac\u0aaa\u0acb\u0ab0|\u0ab8\u0ab5\u0abe\u0ab0|\u0ab8\u0abe\u0a82\u0a9c/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "àª°àª¾àª¤" === t ? e < 4 ? e : e + 12 : "àª¸àªµàª¾àª°" === t ? e : "àª¬àªªà«‹àª°" === t ? 10 <= e ? e : e + 12 : "àª¸àª¾àª‚àªœ" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "àª°àª¾àª¤" : e < 10 ? "àª¸àªµàª¾àª°" : e < 17 ? "àª¬àªªà«‹àª°" : e < 20 ? "àª¸àª¾àª‚àªœ" : "àª°àª¾àª¤"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("he", {
        months: "×™× ×•××¨_×¤×‘×¨×•××¨_×ž×¨×¥_××¤×¨×™×œ_×ž××™_×™×•× ×™_×™×•×œ×™_××•×’×•×¡×˜_×¡×¤×˜×ž×‘×¨_××•×§×˜×•×‘×¨_× ×•×‘×ž×‘×¨_×“×¦×ž×‘×¨".split("_"),
        monthsShort: "×™× ×•×³_×¤×‘×¨×³_×ž×¨×¥_××¤×¨×³_×ž××™_×™×•× ×™_×™×•×œ×™_××•×’×³_×¡×¤×˜×³_××•×§×³_× ×•×‘×³_×“×¦×ž×³".split("_"),
        weekdays: "×¨××©×•×Ÿ_×©× ×™_×©×œ×™×©×™_×¨×‘×™×¢×™_×—×ž×™×©×™_×©×™×©×™_×©×‘×ª".split("_"),
        weekdaysShort: "××³_×‘×³_×’×³_×“×³_×”×³_×•×³_×©×³".split("_"),
        weekdaysMin: "×_×‘_×’_×“_×”_×•_×©".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [×‘]MMMM YYYY",
            LLL: "D [×‘]MMMM YYYY HH:mm",
            LLLL: "dddd, D [×‘]MMMM YYYY HH:mm",
            l: "D/M/YYYY",
            ll: "D MMM YYYY",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd, D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[×”×™×•× ×‘Ö¾]LT",
            nextDay: "[×ž×—×¨ ×‘Ö¾]LT",
            nextWeek: "dddd [×‘×©×¢×”] LT",
            lastDay: "[××ª×ž×•×œ ×‘Ö¾]LT",
            lastWeek: "[×‘×™×•×] dddd [×”××—×¨×•×Ÿ ×‘×©×¢×”] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "×‘×¢×•×“ %s",
            past: "×œ×¤× ×™ %s",
            s: "×ž×¡×¤×¨ ×©× ×™×•×ª",
            ss: "%d ×©× ×™×•×ª",
            m: "×“×§×”",
            mm: "%d ×“×§×•×ª",
            h: "×©×¢×”",
            hh: function(e) {
                return 2 === e ? "×©×¢×ª×™×™×" : e + " ×©×¢×•×ª"
            },
            d: "×™×•×",
            dd: function(e) {
                return 2 === e ? "×™×•×ž×™×™×" : e + " ×™×ž×™×"
            },
            M: "×—×•×“×©",
            MM: function(e) {
                return 2 === e ? "×—×•×“×©×™×™×" : e + " ×—×•×“×©×™×"
            },
            y: "×©× ×”",
            yy: function(e) {
                return 2 === e ? "×©× ×ª×™×™×" : e % 10 == 0 && 10 !== e ? e + " ×©× ×”" : e + " ×©× ×™×"
            }
        },
        meridiemParse: /\u05d0\u05d7\u05d4"\u05e6|\u05dc\u05e4\u05e0\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8|\u05d1\u05d1\u05d5\u05e7\u05e8|\u05d1\u05e2\u05e8\u05d1/i,
        isPM: function(e) {
            return /^(\u05d0\u05d7\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05d1\u05e2\u05e8\u05d1)$/.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 5 ? "×œ×¤× ×•×ª ×‘×•×§×¨" : e < 10 ? "×‘×‘×•×§×¨" : e < 12 ? i ? '×œ×¤× ×”"×¦' : "×œ×¤× ×™ ×”×¦×”×¨×™×™×" : e < 18 ? i ? '××—×”"×¦' : "××—×¨×™ ×”×¦×”×¨×™×™×" : "×‘×¢×¨×‘"
        }
    });
    var In = {
            1: "à¥§",
            2: "à¥¨",
            3: "à¥©",
            4: "à¥ª",
            5: "à¥«",
            6: "à¥¬",
            7: "à¥­",
            8: "à¥®",
            9: "à¥¯",
            0: "à¥¦"
        },
        Fn = {
            "à¥§": "1",
            "à¥¨": "2",
            "à¥©": "3",
            "à¥ª": "4",
            "à¥«": "5",
            "à¥¬": "6",
            "à¥­": "7",
            "à¥®": "8",
            "à¥¯": "9",
            "à¥¦": "0"
        };

    function $n(e, t, i) {
        var n = e + " ";
        switch (i) {
            case "ss":
                return n + (1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi");
            case "m":
                return t ? "jedna minuta" : "jedne minute";
            case "mm":
                return n + (1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta");
            case "h":
                return t ? "jedan sat" : "jednog sata";
            case "hh":
                return n + (1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati");
            case "dd":
                return n + (1 === e ? "dan" : "dana");
            case "MM":
                return n + (1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci");
            case "yy":
                return n + (1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina")
        }
    }
    i.defineLocale("hi", {
        months: "à¤œà¤¨à¤µà¤°à¥€_à¤«à¤¼à¤°à¤µà¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¥ˆà¤²_à¤®à¤ˆ_à¤œà¥‚à¤¨_à¤œà¥à¤²à¤¾à¤ˆ_à¤…à¤—à¤¸à¥à¤¤_à¤¸à¤¿à¤¤à¤®à¥à¤¬à¤°_à¤…à¤•à¥à¤Ÿà¥‚à¤¬à¤°_à¤¨à¤µà¤®à¥à¤¬à¤°_à¤¦à¤¿à¤¸à¤®à¥à¤¬à¤°".split("_"),
        monthsShort: "à¤œà¤¨._à¤«à¤¼à¤°._à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¥ˆ._à¤®à¤ˆ_à¤œà¥‚à¤¨_à¤œà¥à¤²._à¤…à¤—._à¤¸à¤¿à¤¤._à¤…à¤•à¥à¤Ÿà¥‚._à¤¨à¤µ._à¤¦à¤¿à¤¸.".split("_"),
        monthsParseExact: !0,
        weekdays: "à¤°à¤µà¤¿à¤µà¤¾à¤°_à¤¸à¥‹à¤®à¤µà¤¾à¤°_à¤®à¤‚à¤—à¤²à¤µà¤¾à¤°_à¤¬à¥à¤§à¤µà¤¾à¤°_à¤—à¥à¤°à¥‚à¤µà¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°_à¤¶à¤¨à¤¿à¤µà¤¾à¤°".split("_"),
        weekdaysShort: "à¤°à¤µà¤¿_à¤¸à¥‹à¤®_à¤®à¤‚à¤—à¤²_à¤¬à¥à¤§_à¤—à¥à¤°à¥‚_à¤¶à¥à¤•à¥à¤°_à¤¶à¤¨à¤¿".split("_"),
        weekdaysMin: "à¤°_à¤¸à¥‹_à¤®à¤‚_à¤¬à¥_à¤—à¥_à¤¶à¥_à¤¶".split("_"),
        longDateFormat: {
            LT: "A h:mm à¤¬à¤œà¥‡",
            LTS: "A h:mm:ss à¤¬à¤œà¥‡",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm à¤¬à¤œà¥‡",
            LLLL: "dddd, D MMMM YYYY, A h:mm à¤¬à¤œà¥‡"
        },
        calendar: {
            sameDay: "[à¤†à¤œ] LT",
            nextDay: "[à¤•à¤²] LT",
            nextWeek: "dddd, LT",
            lastDay: "[à¤•à¤²] LT",
            lastWeek: "[à¤ªà¤¿à¤›à¤²à¥‡] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à¤®à¥‡à¤‚",
            past: "%s à¤ªà¤¹à¤²à¥‡",
            s: "à¤•à¥à¤› à¤¹à¥€ à¤•à¥à¤·à¤£",
            ss: "%d à¤¸à¥‡à¤•à¤‚à¤¡",
            m: "à¤à¤• à¤®à¤¿à¤¨à¤Ÿ",
            mm: "%d à¤®à¤¿à¤¨à¤Ÿ",
            h: "à¤à¤• à¤˜à¤‚à¤Ÿà¤¾",
            hh: "%d à¤˜à¤‚à¤Ÿà¥‡",
            d: "à¤à¤• à¤¦à¤¿à¤¨",
            dd: "%d à¤¦à¤¿à¤¨",
            M: "à¤à¤• à¤®à¤¹à¥€à¤¨à¥‡",
            MM: "%d à¤®à¤¹à¥€à¤¨à¥‡",
            y: "à¤à¤• à¤µà¤°à¥à¤·",
            yy: "%d à¤µà¤°à¥à¤·"
        },
        preparse: function(e) {
            return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function(e) {
                return Fn[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return In[e]
            })
        },
        meridiemParse: /\u0930\u093e\u0924|\u0938\u0941\u092c\u0939|\u0926\u094b\u092a\u0939\u0930|\u0936\u093e\u092e/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à¤°à¤¾à¤¤" === t ? e < 4 ? e : e + 12 : "à¤¸à¥à¤¬à¤¹" === t ? e : "à¤¦à¥‹à¤ªà¤¹à¤°" === t ? 10 <= e ? e : e + 12 : "à¤¶à¤¾à¤®" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à¤°à¤¾à¤¤" : e < 10 ? "à¤¸à¥à¤¬à¤¹" : e < 17 ? "à¤¦à¥‹à¤ªà¤¹à¤°" : e < 20 ? "à¤¶à¤¾à¤®" : "à¤°à¤¾à¤¤"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("hr", {
        months: {
            format: "sijeÄnja_veljaÄe_oÅ¾ujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),
            standalone: "sijeÄanj_veljaÄa_oÅ¾ujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")
        },
        monthsShort: "sij._velj._oÅ¾u._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return "[proÅ¡lu] dddd [u] LT";
                    case 6:
                        return "[proÅ¡le] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[proÅ¡li] dddd [u] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "par sekundi",
            ss: $n,
            m: $n,
            mm: $n,
            h: $n,
            hh: $n,
            d: "dan",
            dd: $n,
            M: "mjesec",
            MM: $n,
            y: "godinu",
            yy: $n
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Nn = "vasÃ¡rnap hÃ©tfÅ‘n kedden szerdÃ¡n csÃ¼tÃ¶rtÃ¶kÃ¶n pÃ©nteken szombaton".split(" ");

    function Wn(e, t, i, n) {
        var a = e;
        switch (i) {
            case "s":
                return n || t ? "nÃ©hÃ¡ny mÃ¡sodperc" : "nÃ©hÃ¡ny mÃ¡sodperce";
            case "ss":
                return a + (n || t) ? " mÃ¡sodperc" : " mÃ¡sodperce";
            case "m":
                return "egy" + (n || t ? " perc" : " perce");
            case "mm":
                return a + (n || t ? " perc" : " perce");
            case "h":
                return "egy" + (n || t ? " Ã³ra" : " Ã³rÃ¡ja");
            case "hh":
                return a + (n || t ? " Ã³ra" : " Ã³rÃ¡ja");
            case "d":
                return "egy" + (n || t ? " nap" : " napja");
            case "dd":
                return a + (n || t ? " nap" : " napja");
            case "M":
                return "egy" + (n || t ? " hÃ³nap" : " hÃ³napja");
            case "MM":
                return a + (n || t ? " hÃ³nap" : " hÃ³napja");
            case "y":
                return "egy" + (n || t ? " Ã©v" : " Ã©ve");
            case "yy":
                return a + (n || t ? " Ã©v" : " Ã©ve")
        }
        return ""
    }

    function Bn(e) {
        return (e ? "" : "[mÃºlt] ") + "[" + Nn[this.day()] + "] LT[-kor]"
    }

    function Un(e) {
        return e % 100 == 11 || e % 10 != 1
    }

    function qn(e, t, i, n) {
        var a = e + " ";
        switch (i) {
            case "s":
                return t || n ? "nokkrar sekÃºndur" : "nokkrum sekÃºndum";
            case "ss":
                return Un(e) ? a + (t || n ? "sekÃºndur" : "sekÃºndum") : a + "sekÃºnda";
            case "m":
                return t ? "mÃ­nÃºta" : "mÃ­nÃºtu";
            case "mm":
                return Un(e) ? a + (t || n ? "mÃ­nÃºtur" : "mÃ­nÃºtum") : t ? a + "mÃ­nÃºta" : a + "mÃ­nÃºtu";
            case "hh":
                return Un(e) ? a + (t || n ? "klukkustundir" : "klukkustundum") : a + "klukkustund";
            case "d":
                return t ? "dagur" : n ? "dag" : "degi";
            case "dd":
                return Un(e) ? t ? a + "dagar" : a + (n ? "daga" : "dÃ¶gum") : t ? a + "dagur" : a + (n ? "dag" : "degi");
            case "M":
                return t ? "mÃ¡nuÃ°ur" : n ? "mÃ¡nuÃ°" : "mÃ¡nuÃ°i";
            case "MM":
                return Un(e) ? t ? a + "mÃ¡nuÃ°ir" : a + (n ? "mÃ¡nuÃ°i" : "mÃ¡nuÃ°um") : t ? a + "mÃ¡nuÃ°ur" : a + (n ? "mÃ¡nuÃ°" : "mÃ¡nuÃ°i");
            case "y":
                return t || n ? "Ã¡r" : "Ã¡ri";
            case "yy":
                return Un(e) ? a + (t || n ? "Ã¡r" : "Ã¡rum") : a + (t || n ? "Ã¡r" : "Ã¡ri")
        }
    }
    i.defineLocale("hu", {
        months: "januÃ¡r_februÃ¡r_mÃ¡rcius_Ã¡prilis_mÃ¡jus_jÃºnius_jÃºlius_augusztus_szeptember_oktÃ³ber_november_december".split("_"),
        monthsShort: "jan_feb_mÃ¡rc_Ã¡pr_mÃ¡j_jÃºn_jÃºl_aug_szept_okt_nov_dec".split("_"),
        weekdays: "vasÃ¡rnap_hÃ©tfÅ‘_kedd_szerda_csÃ¼tÃ¶rtÃ¶k_pÃ©ntek_szombat".split("_"),
        weekdaysShort: "vas_hÃ©t_kedd_sze_csÃ¼t_pÃ©n_szo".split("_"),
        weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "YYYY.MM.DD.",
            LL: "YYYY. MMMM D.",
            LLL: "YYYY. MMMM D. H:mm",
            LLLL: "YYYY. MMMM D., dddd H:mm"
        },
        meridiemParse: /de|du/i,
        isPM: function(e) {
            return "u" === e.charAt(1).toLowerCase()
        },
        meridiem: function(e, t, i) {
            return e < 12 ? !0 === i ? "de" : "DE" : !0 === i ? "du" : "DU"
        },
        calendar: {
            sameDay: "[ma] LT[-kor]",
            nextDay: "[holnap] LT[-kor]",
            nextWeek: function() {
                return Bn.call(this, !0)
            },
            lastDay: "[tegnap] LT[-kor]",
            lastWeek: function() {
                return Bn.call(this, !1)
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "%s mÃºlva",
            past: "%s",
            s: Wn,
            ss: Wn,
            m: Wn,
            mm: Wn,
            h: Wn,
            hh: Wn,
            d: Wn,
            dd: Wn,
            M: Wn,
            MM: Wn,
            y: Wn,
            yy: Wn
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("hy-am", {
        months: {
            format: "Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€Õ«_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€Õ«_Õ´Õ¡Ö€Õ¿Õ«_Õ¡ÕºÖ€Õ«Õ¬Õ«_Õ´Õ¡ÕµÕ«Õ½Õ«_Õ°Õ¸Ö‚Õ¶Õ«Õ½Õ«_Õ°Õ¸Ö‚Õ¬Õ«Õ½Õ«_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½Õ«_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«".split("_"),
            standalone: "Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€_Õ´Õ¡Ö€Õ¿_Õ¡ÕºÖ€Õ«Õ¬_Õ´Õ¡ÕµÕ«Õ½_Õ°Õ¸Ö‚Õ¶Õ«Õ½_Õ°Õ¸Ö‚Õ¬Õ«Õ½_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€".split("_")
        },
        monthsShort: "Õ°Õ¶Õ¾_ÖƒÕ¿Ö€_Õ´Ö€Õ¿_Õ¡ÕºÖ€_Õ´ÕµÕ½_Õ°Õ¶Õ½_Õ°Õ¬Õ½_Ö…Õ£Õ½_Õ½ÕºÕ¿_Õ°Õ¯Õ¿_Õ¶Õ´Õ¢_Õ¤Õ¯Õ¿".split("_"),
        weekdays: "Õ¯Õ«Ö€Õ¡Õ¯Õ«_Õ¥Ö€Õ¯Õ¸Ö‚Õ·Õ¡Õ¢Õ©Õ«_Õ¥Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ¹Õ¸Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ°Õ«Õ¶Õ£Õ·Õ¡Õ¢Õ©Õ«_Õ¸Ö‚Ö€Õ¢Õ¡Õ©_Õ·Õ¡Õ¢Õ¡Õ©".split("_"),
        weekdaysShort: "Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©".split("_"),
        weekdaysMin: "Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY Õ©.",
            LLL: "D MMMM YYYY Õ©., HH:mm",
            LLLL: "dddd, D MMMM YYYY Õ©., HH:mm"
        },
        calendar: {
            sameDay: "[Õ¡ÕµÕ½Ö…Ö€] LT",
            nextDay: "[Õ¾Õ¡Õ²Õ¨] LT",
            lastDay: "[Õ¥Ö€Õ¥Õ¯] LT",
            nextWeek: function() {
                return "dddd [Ö…Ö€Õ¨ ÕªÕ¡Õ´Õ¨] LT"
            },
            lastWeek: function() {
                return "[Õ¡Õ¶ÖÕ¡Õ®] dddd [Ö…Ö€Õ¨ ÕªÕ¡Õ´Õ¨] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "%s Õ°Õ¥Õ¿Õ¸",
            past: "%s Õ¡Õ¼Õ¡Õ»",
            s: "Õ´Õ« Ö„Õ¡Õ¶Õ« Õ¾Õ¡ÕµÖ€Õ¯ÕµÕ¡Õ¶",
            ss: "%d Õ¾Õ¡ÕµÖ€Õ¯ÕµÕ¡Õ¶",
            m: "Ö€Õ¸ÕºÕ¥",
            mm: "%d Ö€Õ¸ÕºÕ¥",
            h: "ÕªÕ¡Õ´",
            hh: "%d ÕªÕ¡Õ´",
            d: "Ö…Ö€",
            dd: "%d Ö…Ö€",
            M: "Õ¡Õ´Õ«Õ½",
            MM: "%d Õ¡Õ´Õ«Õ½",
            y: "Õ¿Õ¡Ö€Õ«",
            yy: "%d Õ¿Õ¡Ö€Õ«"
        },
        meridiemParse: /\u0563\u056b\u0577\u0565\u0580\u057e\u0561|\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561|\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576/,
        isPM: function(e) {
            return /^(\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576)$/.test(e)
        },
        meridiem: function(e) {
            return e < 4 ? "Õ£Õ«Õ·Õ¥Ö€Õ¾Õ¡" : e < 12 ? "Õ¡Õ¼Õ¡Õ¾Õ¸Õ¿Õ¾Õ¡" : e < 17 ? "ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡" : "Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶"
        },
        dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(\u056b\u0576|\u0580\u0564)/,
        ordinal: function(e, t) {
            switch (t) {
                case "DDD":
                case "w":
                case "W":
                case "DDDo":
                    return 1 === e ? e + "-Õ«Õ¶" : e + "-Ö€Õ¤";
                default:
                    return e
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("id", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "pagi" === t ? e : "siang" === t ? 11 <= e ? e : e + 12 : "sore" === t || "malam" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 11 ? "pagi" : e < 15 ? "siang" : e < 19 ? "sore" : "malam"
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Besok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kemarin pukul] LT",
            lastWeek: "dddd [lalu pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lalu",
            s: "beberapa detik",
            ss: "%d detik",
            m: "semenit",
            mm: "%d menit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("is", {
        months: "janÃºar_febrÃºar_mars_aprÃ­l_maÃ­_jÃºnÃ­_jÃºlÃ­_Ã¡gÃºst_september_oktÃ³ber_nÃ³vember_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_maÃ­_jÃºn_jÃºl_Ã¡gÃº_sep_okt_nÃ³v_des".split("_"),
        weekdays: "sunnudagur_mÃ¡nudagur_Ã¾riÃ°judagur_miÃ°vikudagur_fimmtudagur_fÃ¶studagur_laugardagur".split("_"),
        weekdaysShort: "sun_mÃ¡n_Ã¾ri_miÃ°_fim_fÃ¶s_lau".split("_"),
        weekdaysMin: "Su_MÃ¡_Ãžr_Mi_Fi_FÃ¶_La".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] H:mm",
            LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
        },
        calendar: {
            sameDay: "[Ã­ dag kl.] LT",
            nextDay: "[Ã¡ morgun kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[Ã­ gÃ¦r kl.] LT",
            lastWeek: "[sÃ­Ã°asta] dddd [kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "eftir %s",
            past: "fyrir %s sÃ­Ã°an",
            s: qn,
            ss: qn,
            m: qn,
            mm: qn,
            h: "klukkustund",
            hh: qn,
            d: qn,
            dd: qn,
            M: qn,
            MM: qn,
            y: qn,
            yy: qn
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("it", {
        months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        weekdays: "domenica_lunedÃ¬_martedÃ¬_mercoledÃ¬_giovedÃ¬_venerdÃ¬_sabato".split("_"),
        weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
        weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Oggi alle] LT",
            nextDay: "[Domani alle] LT",
            nextWeek: "dddd [alle] LT",
            lastDay: "[Ieri alle] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[la scorsa] dddd [alle] LT";
                    default:
                        return "[lo scorso] dddd [alle] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: function(e) {
                return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e
            },
            past: "%s fa",
            s: "alcuni secondi",
            ss: "%d secondi",
            m: "un minuto",
            mm: "%d minuti",
            h: "un'ora",
            hh: "%d ore",
            d: "un giorno",
            dd: "%d giorni",
            M: "un mese",
            MM: "%d mesi",
            y: "un anno",
            yy: "%d anni"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("ja", {
        months: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
        monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
        weekdays: "æ—¥æ›œæ—¥_æœˆæ›œæ—¥_ç«æ›œæ—¥_æ°´æ›œæ—¥_æœ¨æ›œæ—¥_é‡‘æ›œæ—¥_åœŸæ›œæ—¥".split("_"),
        weekdaysShort: "æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ".split("_"),
        weekdaysMin: "æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYYå¹´MæœˆDæ—¥",
            LLL: "YYYYå¹´MæœˆDæ—¥ HH:mm",
            LLLL: "YYYYå¹´MæœˆDæ—¥ dddd HH:mm",
            l: "YYYY/MM/DD",
            ll: "YYYYå¹´MæœˆDæ—¥",
            lll: "YYYYå¹´MæœˆDæ—¥ HH:mm",
            llll: "YYYYå¹´MæœˆDæ—¥(ddd) HH:mm"
        },
        meridiemParse: /\u5348\u524d|\u5348\u5f8c/i,
        isPM: function(e) {
            return "åˆå¾Œ" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "åˆå‰" : "åˆå¾Œ"
        },
        calendar: {
            sameDay: "[ä»Šæ—¥] LT",
            nextDay: "[æ˜Žæ—¥] LT",
            nextWeek: function(e) {
                return e.week() < this.week() ? "[æ¥é€±]dddd LT" : "dddd LT"
            },
            lastDay: "[æ˜¨æ—¥] LT",
            lastWeek: function(e) {
                return this.week() < e.week() ? "[å…ˆé€±]dddd LT" : "dddd LT"
            },
            sameElse: "L"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\u65e5/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "æ—¥";
                default:
                    return e
            }
        },
        relativeTime: {
            future: "%så¾Œ",
            past: "%så‰",
            s: "æ•°ç§’",
            ss: "%dç§’",
            m: "1åˆ†",
            mm: "%dåˆ†",
            h: "1æ™‚é–“",
            hh: "%dæ™‚é–“",
            d: "1æ—¥",
            dd: "%dæ—¥",
            M: "1ãƒ¶æœˆ",
            MM: "%dãƒ¶æœˆ",
            y: "1å¹´",
            yy: "%då¹´"
        }
    }), i.defineLocale("jv", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
        weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "enjing" === t ? e : "siyang" === t ? 11 <= e ? e : e + 12 : "sonten" === t || "ndalu" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 11 ? "enjing" : e < 15 ? "siyang" : e < 19 ? "sonten" : "ndalu"
        },
        calendar: {
            sameDay: "[Dinten puniko pukul] LT",
            nextDay: "[Mbenjang pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kala wingi pukul] LT",
            lastWeek: "dddd [kepengker pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "wonten ing %s",
            past: "%s ingkang kepengker",
            s: "sawetawis detik",
            ss: "%d detik",
            m: "setunggal menit",
            mm: "%d menit",
            h: "setunggal jam",
            hh: "%d jam",
            d: "sedinten",
            dd: "%d dinten",
            M: "sewulan",
            MM: "%d wulan",
            y: "setaun",
            yy: "%d taun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("ka", {
        months: {
            standalone: "áƒ˜áƒáƒœáƒ•áƒáƒ áƒ˜_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ˜_áƒ›áƒáƒ áƒ¢áƒ˜_áƒáƒžáƒ áƒ˜áƒšáƒ˜_áƒ›áƒáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ˜_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ˜_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜".split("_"),
            format: "áƒ˜áƒáƒœáƒ•áƒáƒ áƒ¡_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ¡_áƒ›áƒáƒ áƒ¢áƒ¡_áƒáƒžáƒ áƒ˜áƒšáƒ˜áƒ¡_áƒ›áƒáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ¡_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ¡_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ¡_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡".split("_")
        },
        monthsShort: "áƒ˜áƒáƒœ_áƒ—áƒ”áƒ‘_áƒ›áƒáƒ _áƒáƒžáƒ _áƒ›áƒáƒ˜_áƒ˜áƒ•áƒœ_áƒ˜áƒ•áƒš_áƒáƒ’áƒ•_áƒ¡áƒ”áƒ¥_áƒáƒ¥áƒ¢_áƒœáƒáƒ”_áƒ“áƒ”áƒ™".split("_"),
        weekdays: {
            standalone: "áƒ™áƒ•áƒ˜áƒ áƒ_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ˜_áƒ¨áƒáƒ‘áƒáƒ—áƒ˜".split("_"),
            format: "áƒ™áƒ•áƒ˜áƒ áƒáƒ¡_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ¡_áƒ¨áƒáƒ‘áƒáƒ—áƒ¡".split("_"),
            isFormat: /(\u10ec\u10d8\u10dc\u10d0|\u10e8\u10d4\u10db\u10d3\u10d4\u10d2)/
        },
        weekdaysShort: "áƒ™áƒ•áƒ˜_áƒáƒ áƒ¨_áƒ¡áƒáƒ›_áƒáƒ—áƒ®_áƒ®áƒ£áƒ—_áƒžáƒáƒ _áƒ¨áƒáƒ‘".split("_"),
        weekdaysMin: "áƒ™áƒ•_áƒáƒ _áƒ¡áƒ_áƒáƒ—_áƒ®áƒ£_áƒžáƒ_áƒ¨áƒ".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[áƒ“áƒ¦áƒ”áƒ¡] LT[-áƒ–áƒ”]",
            nextDay: "[áƒ®áƒ•áƒáƒš] LT[-áƒ–áƒ”]",
            lastDay: "[áƒ’áƒ£áƒ¨áƒ˜áƒœ] LT[-áƒ–áƒ”]",
            nextWeek: "[áƒ¨áƒ”áƒ›áƒ“áƒ”áƒ’] dddd LT[-áƒ–áƒ”]",
            lastWeek: "[áƒ¬áƒ˜áƒœáƒ] dddd LT-áƒ–áƒ”",
            sameElse: "L"
        },
        relativeTime: {
            future: function(e) {
                return /(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10ec\u10d4\u10da\u10d8)/.test(e) ? e.replace(/\u10d8$/, "áƒ¨áƒ˜") : e + "áƒ¨áƒ˜"
            },
            past: function(e) {
                return /(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10d3\u10e6\u10d4|\u10d7\u10d5\u10d4)/.test(e) ? e.replace(/(\u10d8|\u10d4)$/, "áƒ˜áƒ¡ áƒ¬áƒ˜áƒœ") : /\u10ec\u10d4\u10da\u10d8/.test(e) ? e.replace(/\u10ec\u10d4\u10da\u10d8$/, "áƒ¬áƒšáƒ˜áƒ¡ áƒ¬áƒ˜áƒœ") : void 0
            },
            s: "áƒ áƒáƒ›áƒ“áƒ”áƒœáƒ˜áƒ›áƒ” áƒ¬áƒáƒ›áƒ˜",
            ss: "%d áƒ¬áƒáƒ›áƒ˜",
            m: "áƒ¬áƒ£áƒ—áƒ˜",
            mm: "%d áƒ¬áƒ£áƒ—áƒ˜",
            h: "áƒ¡áƒáƒáƒ—áƒ˜",
            hh: "%d áƒ¡áƒáƒáƒ—áƒ˜",
            d: "áƒ“áƒ¦áƒ”",
            dd: "%d áƒ“áƒ¦áƒ”",
            M: "áƒ—áƒ•áƒ”",
            MM: "%d áƒ—áƒ•áƒ”",
            y: "áƒ¬áƒ”áƒšáƒ˜",
            yy: "%d áƒ¬áƒ”áƒšáƒ˜"
        },
        dayOfMonthOrdinalParse: /0|1-\u10da\u10d8|\u10db\u10d4-\d{1,2}|\d{1,2}-\u10d4/,
        ordinal: function(e) {
            return 0 === e ? e : 1 === e ? e + "-áƒšáƒ˜" : e < 20 || e <= 100 && e % 20 == 0 || e % 100 == 0 ? "áƒ›áƒ”-" + e : e + "-áƒ”"
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Gn = {
        0: "-ÑˆÑ–",
        1: "-ÑˆÑ–",
        2: "-ÑˆÑ–",
        3: "-ÑˆÑ–",
        4: "-ÑˆÑ–",
        5: "-ÑˆÑ–",
        6: "-ÑˆÑ‹",
        7: "-ÑˆÑ–",
        8: "-ÑˆÑ–",
        9: "-ÑˆÑ‹",
        10: "-ÑˆÑ‹",
        20: "-ÑˆÑ‹",
        30: "-ÑˆÑ‹",
        40: "-ÑˆÑ‹",
        50: "-ÑˆÑ–",
        60: "-ÑˆÑ‹",
        70: "-ÑˆÑ–",
        80: "-ÑˆÑ–",
        90: "-ÑˆÑ‹",
        100: "-ÑˆÑ–"
    };
    i.defineLocale("kk", {
        months: "Ò›Ð°Ò£Ñ‚Ð°Ñ€_Ð°Ò›Ð¿Ð°Ð½_Ð½Ð°ÑƒÑ€Ñ‹Ð·_ÑÓ™ÑƒÑ–Ñ€_Ð¼Ð°Ð¼Ñ‹Ñ€_Ð¼Ð°ÑƒÑÑ‹Ð¼_ÑˆÑ–Ð»Ð´Ðµ_Ñ‚Ð°Ð¼Ñ‹Ð·_Ò›Ñ‹Ñ€ÐºÒ¯Ð¹ÐµÐº_Ò›Ð°Ð·Ð°Ð½_Ò›Ð°Ñ€Ð°ÑˆÐ°_Ð¶ÐµÐ»Ñ‚Ð¾Ò›ÑÐ°Ð½".split("_"),
        monthsShort: "Ò›Ð°Ò£_Ð°Ò›Ð¿_Ð½Ð°Ñƒ_ÑÓ™Ñƒ_Ð¼Ð°Ð¼_Ð¼Ð°Ñƒ_ÑˆÑ–Ð»_Ñ‚Ð°Ð¼_Ò›Ñ‹Ñ€_Ò›Ð°Ð·_Ò›Ð°Ñ€_Ð¶ÐµÐ»".split("_"),
        weekdays: "Ð¶ÐµÐºÑÐµÐ½Ð±Ñ–_Ð´Ò¯Ð¹ÑÐµÐ½Ð±Ñ–_ÑÐµÐ¹ÑÐµÐ½Ð±Ñ–_ÑÓ™Ñ€ÑÐµÐ½Ð±Ñ–_Ð±ÐµÐ¹ÑÐµÐ½Ð±Ñ–_Ð¶Ò±Ð¼Ð°_ÑÐµÐ½Ð±Ñ–".split("_"),
        weekdaysShort: "Ð¶ÐµÐº_Ð´Ò¯Ð¹_ÑÐµÐ¹_ÑÓ™Ñ€_Ð±ÐµÐ¹_Ð¶Ò±Ð¼_ÑÐµÐ½".split("_"),
        weekdaysMin: "Ð¶Ðº_Ð´Ð¹_ÑÐ¹_ÑÑ€_Ð±Ð¹_Ð¶Ð¼_ÑÐ½".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ð‘Ò¯Ð³Ñ–Ð½ ÑÐ°Ò“Ð°Ñ‚] LT",
            nextDay: "[Ð•Ñ€Ñ‚ÐµÒ£ ÑÐ°Ò“Ð°Ñ‚] LT",
            nextWeek: "dddd [ÑÐ°Ò“Ð°Ñ‚] LT",
            lastDay: "[ÐšÐµÑˆÐµ ÑÐ°Ò“Ð°Ñ‚] LT",
            lastWeek: "[Ó¨Ñ‚ÐºÐµÐ½ Ð°Ð¿Ñ‚Ð°Ð½Ñ‹Ò£] dddd [ÑÐ°Ò“Ð°Ñ‚] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s Ñ–ÑˆÑ–Ð½Ð´Ðµ",
            past: "%s Ð±Ò±Ñ€Ñ‹Ð½",
            s: "Ð±Ñ–Ñ€Ð½ÐµÑˆÐµ ÑÐµÐºÑƒÐ½Ð´",
            ss: "%d ÑÐµÐºÑƒÐ½Ð´",
            m: "Ð±Ñ–Ñ€ Ð¼Ð¸Ð½ÑƒÑ‚",
            mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚",
            h: "Ð±Ñ–Ñ€ ÑÐ°Ò“Ð°Ñ‚",
            hh: "%d ÑÐ°Ò“Ð°Ñ‚",
            d: "Ð±Ñ–Ñ€ ÐºÒ¯Ð½",
            dd: "%d ÐºÒ¯Ð½",
            M: "Ð±Ñ–Ñ€ Ð°Ð¹",
            MM: "%d Ð°Ð¹",
            y: "Ð±Ñ–Ñ€ Ð¶Ñ‹Ð»",
            yy: "%d Ð¶Ñ‹Ð»"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0448\u0456|\u0448\u044b)/,
        ordinal: function(e) {
            return e + (Gn[e] || Gn[e % 10] || Gn[100 <= e ? 100 : null])
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Jn = {
            1: "áŸ¡",
            2: "áŸ¢",
            3: "áŸ£",
            4: "áŸ¤",
            5: "áŸ¥",
            6: "áŸ¦",
            7: "áŸ§",
            8: "áŸ¨",
            9: "áŸ©",
            0: "áŸ "
        },
        Vn = {
            "áŸ¡": "1",
            "áŸ¢": "2",
            "áŸ£": "3",
            "áŸ¤": "4",
            "áŸ¥": "5",
            "áŸ¦": "6",
            "áŸ§": "7",
            "áŸ¨": "8",
            "áŸ©": "9",
            "áŸ ": "0"
        };
    i.defineLocale("km", {
        months: "áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž¸áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼".split("_"),
        monthsShort: "áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž¸áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼".split("_"),
        weekdays: "áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ".split("_"),
        weekdaysShort: "áž¢áž¶_áž…_áž¢_áž–_áž–áŸ’ážš_ážŸáž»_ážŸ".split("_"),
        weekdaysMin: "áž¢áž¶_áž…_áž¢_áž–_áž–áŸ’ážš_ážŸáž»_ážŸ".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u1796\u17d2\u179a\u17b9\u1780|\u179b\u17d2\u1784\u17b6\u1785/,
        isPM: function(e) {
            return "áž›áŸ’áž„áž¶áž…" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "áž–áŸ’ážšáž¹áž€" : "áž›áŸ’áž„áž¶áž…"
        },
        calendar: {
            sameDay: "[ážáŸ’áž„áŸƒáž“áŸáŸ‡ áž˜áŸ‰áŸ„áž„] LT",
            nextDay: "[ážŸáŸ’áž¢áŸ‚áž€ áž˜áŸ‰áŸ„áž„] LT",
            nextWeek: "dddd [áž˜áŸ‰áŸ„áž„] LT",
            lastDay: "[áž˜áŸ’ážŸáž·áž›áž˜áž·áž‰ áž˜áŸ‰áŸ„áž„] LT",
            lastWeek: "dddd [ážŸáž”áŸ’ážáž¶áž áŸáž˜áž»áž“] [áž˜áŸ‰áŸ„áž„] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sáž‘áŸ€áž",
            past: "%sáž˜áž»áž“",
            s: "áž”áŸ‰áž»áž“áŸ’áž˜áž¶áž“ážœáž·áž“áž¶áž‘áž¸",
            ss: "%d ážœáž·áž“áž¶áž‘áž¸",
            m: "áž˜áž½áž™áž“áž¶áž‘áž¸",
            mm: "%d áž“áž¶áž‘áž¸",
            h: "áž˜áž½áž™áž˜áŸ‰áŸ„áž„",
            hh: "%d áž˜áŸ‰áŸ„áž„",
            d: "áž˜áž½áž™ážáŸ’áž„áŸƒ",
            dd: "%d ážáŸ’áž„áŸƒ",
            M: "áž˜áž½áž™ážáŸ‚",
            MM: "%d ážáŸ‚",
            y: "áž˜áž½áž™áž†áŸ’áž“áž¶áŸ†",
            yy: "%d áž†áŸ’áž“áž¶áŸ†"
        },
        dayOfMonthOrdinalParse: /\u1791\u17b8\d{1,2}/,
        ordinal: "áž‘áž¸%d",
        preparse: function(e) {
            return e.replace(/[\u17e1\u17e2\u17e3\u17e4\u17e5\u17e6\u17e7\u17e8\u17e9\u17e0]/g, function(e) {
                return Vn[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return Jn[e]
            })
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Xn = {
            1: "à³§",
            2: "à³¨",
            3: "à³©",
            4: "à³ª",
            5: "à³«",
            6: "à³¬",
            7: "à³­",
            8: "à³®",
            9: "à³¯",
            0: "à³¦"
        },
        Kn = {
            "à³§": "1",
            "à³¨": "2",
            "à³©": "3",
            "à³ª": "4",
            "à³«": "5",
            "à³¬": "6",
            "à³­": "7",
            "à³®": "8",
            "à³¯": "9",
            "à³¦": "0"
        };
    i.defineLocale("kn", {
        months: "à²œà²¨à²µà²°à²¿_à²«à³†à²¬à³à²°à²µà²°à²¿_à²®à²¾à²°à³à²šà³_à²à²ªà³à²°à²¿à²²à³_à²®à³†à³•_à²œà³‚à²¨à³_à²œà³à²²à³†à³–_à²†à²—à²¸à³à²Ÿà³_à²¸à³†à²ªà³à²Ÿà³†à²‚à²¬à²°à³_à²…à²•à³à²Ÿà³†à³‚à³•à²¬à²°à³_à²¨à²µà³†à²‚à²¬à²°à³_à²¡à²¿à²¸à³†à²‚à²¬à²°à³".split("_"),
        monthsShort: "à²œà²¨_à²«à³†à²¬à³à²°_à²®à²¾à²°à³à²šà³_à²à²ªà³à²°à²¿à²²à³_à²®à³†à³•_à²œà³‚à²¨à³_à²œà³à²²à³†à³–_à²†à²—à²¸à³à²Ÿà³_à²¸à³†à²ªà³à²Ÿà³†à²‚_à²…à²•à³à²Ÿà³†à³‚à³•_à²¨à²µà³†à²‚_à²¡à²¿à²¸à³†à²‚".split("_"),
        monthsParseExact: !0,
        weekdays: "à²­à²¾à²¨à³à²µà²¾à²°_à²¸à³†à³‚à³•à²®à²µà²¾à²°_à²®à²‚à²—à²³à²µà²¾à²°_à²¬à³à²§à²µà²¾à²°_à²—à³à²°à³à²µà²¾à²°_à²¶à³à²•à³à²°à²µà²¾à²°_à²¶à²¨à²¿à²µà²¾à²°".split("_"),
        weekdaysShort: "à²­à²¾à²¨à³_à²¸à³†à³‚à³•à²®_à²®à²‚à²—à²³_à²¬à³à²§_à²—à³à²°à³_à²¶à³à²•à³à²°_à²¶à²¨à²¿".split("_"),
        weekdaysMin: "à²­à²¾_à²¸à³†à³‚à³•_à²®à²‚_à²¬à³_à²—à³_à²¶à³_à²¶".split("_"),
        longDateFormat: {
            LT: "A h:mm",
            LTS: "A h:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm",
            LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        calendar: {
            sameDay: "[à²‡à²‚à²¦à³] LT",
            nextDay: "[à²¨à²¾à²³à³†] LT",
            nextWeek: "dddd, LT",
            lastDay: "[à²¨à²¿à²¨à³à²¨à³†] LT",
            lastWeek: "[à²•à³†à³‚à²¨à³†à²¯] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à²¨à²‚à²¤à²°",
            past: "%s à²¹à²¿à²‚à²¦à³†",
            s: "à²•à³†à²²à²µà³ à²•à³à²·à²£à²—à²³à³",
            ss: "%d à²¸à³†à²•à³†à²‚à²¡à³à²—à²³à³",
            m: "à²’à²‚à²¦à³ à²¨à²¿à²®à²¿à²·",
            mm: "%d à²¨à²¿à²®à²¿à²·",
            h: "à²’à²‚à²¦à³ à²—à²‚à²Ÿà³†",
            hh: "%d à²—à²‚à²Ÿà³†",
            d: "à²’à²‚à²¦à³ à²¦à²¿à²¨",
            dd: "%d à²¦à²¿à²¨",
            M: "à²’à²‚à²¦à³ à²¤à²¿à²‚à²—à²³à³",
            MM: "%d à²¤à²¿à²‚à²—à²³à³",
            y: "à²’à²‚à²¦à³ à²µà²°à³à²·",
            yy: "%d à²µà²°à³à²·"
        },
        preparse: function(e) {
            return e.replace(/[\u0ce7\u0ce8\u0ce9\u0cea\u0ceb\u0cec\u0ced\u0cee\u0cef\u0ce6]/g, function(e) {
                return Kn[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return Xn[e]
            })
        },
        meridiemParse: /\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf|\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6|\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8|\u0cb8\u0c82\u0c9c\u0cc6/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à²°à²¾à²¤à³à²°à²¿" === t ? e < 4 ? e : e + 12 : "à²¬à³†à²³à²¿à²—à³à²—à³†" === t ? e : "à²®à²§à³à²¯à²¾à²¹à³à²¨" === t ? 10 <= e ? e : e + 12 : "à²¸à²‚à²œà³†" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à²°à²¾à²¤à³à²°à²¿" : e < 10 ? "à²¬à³†à²³à²¿à²—à³à²—à³†" : e < 17 ? "à²®à²§à³à²¯à²¾à²¹à³à²¨" : e < 20 ? "à²¸à²‚à²œà³†" : "à²°à²¾à²¤à³à²°à²¿"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(\u0ca8\u0cc6\u0cd5)/,
        ordinal: function(e) {
            return e + "à²¨à³†à³•"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("ko", {
        months: "1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”".split("_"),
        monthsShort: "1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”".split("_"),
        weekdays: "ì¼ìš”ì¼_ì›”ìš”ì¼_í™”ìš”ì¼_ìˆ˜ìš”ì¼_ëª©ìš”ì¼_ê¸ˆìš”ì¼_í† ìš”ì¼".split("_"),
        weekdaysShort: "ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† ".split("_"),
        weekdaysMin: "ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† ".split("_"),
        longDateFormat: {
            LT: "A h:mm",
            LTS: "A h:mm:ss",
            L: "YYYY.MM.DD.",
            LL: "YYYYë…„ MMMM Dì¼",
            LLL: "YYYYë…„ MMMM Dì¼ A h:mm",
            LLLL: "YYYYë…„ MMMM Dì¼ dddd A h:mm",
            l: "YYYY.MM.DD.",
            ll: "YYYYë…„ MMMM Dì¼",
            lll: "YYYYë…„ MMMM Dì¼ A h:mm",
            llll: "YYYYë…„ MMMM Dì¼ dddd A h:mm"
        },
        calendar: {
            sameDay: "ì˜¤ëŠ˜ LT",
            nextDay: "ë‚´ì¼ LT",
            nextWeek: "dddd LT",
            lastDay: "ì–´ì œ LT",
            lastWeek: "ì§€ë‚œì£¼ dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s í›„",
            past: "%s ì „",
            s: "ëª‡ ì´ˆ",
            ss: "%dì´ˆ",
            m: "1ë¶„",
            mm: "%dë¶„",
            h: "í•œ ì‹œê°„",
            hh: "%dì‹œê°„",
            d: "í•˜ë£¨",
            dd: "%dì¼",
            M: "í•œ ë‹¬",
            MM: "%dë‹¬",
            y: "ì¼ ë…„",
            yy: "%dë…„"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(\uc77c|\uc6d4|\uc8fc)/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "ì¼";
                case "M":
                    return e + "ì›”";
                case "w":
                case "W":
                    return e + "ì£¼";
                default:
                    return e
            }
        },
        meridiemParse: /\uc624\uc804|\uc624\ud6c4/,
        isPM: function(e) {
            return "ì˜¤í›„" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "ì˜¤ì „" : "ì˜¤í›„"
        }
    });
    var Zn = {
        0: "-Ñ‡Ò¯",
        1: "-Ñ‡Ð¸",
        2: "-Ñ‡Ð¸",
        3: "-Ñ‡Ò¯",
        4: "-Ñ‡Ò¯",
        5: "-Ñ‡Ð¸",
        6: "-Ñ‡Ñ‹",
        7: "-Ñ‡Ð¸",
        8: "-Ñ‡Ð¸",
        9: "-Ñ‡Ñƒ",
        10: "-Ñ‡Ñƒ",
        20: "-Ñ‡Ñ‹",
        30: "-Ñ‡Ñƒ",
        40: "-Ñ‡Ñ‹",
        50: "-Ñ‡Ò¯",
        60: "-Ñ‡Ñ‹",
        70: "-Ñ‡Ð¸",
        80: "-Ñ‡Ð¸",
        90: "-Ñ‡Ñƒ",
        100: "-Ñ‡Ò¯"
    };

    function Qn(e, t, i, n) {
        var a = {
            m: ["eng Minutt", "enger Minutt"],
            h: ["eng Stonn", "enger Stonn"],
            d: ["een Dag", "engem Dag"],
            M: ["ee Mount", "engem Mount"],
            y: ["ee Joer", "engem Joer"]
        };
        return t ? a[i][0] : a[i][1]
    }

    function ea(e) {
        if (e = parseInt(e, 10), isNaN(e)) return !1;
        if (e < 0) return !0;
        if (e < 10) return 4 <= e && e <= 7;
        if (e < 100) {
            var t = e % 10;
            return ea(0 === t ? e / 10 : t)
        }
        if (e < 1e4) {
            for (; 10 <= e;) e /= 10;
            return ea(e)
        }
        return ea(e /= 1e3)
    }
    i.defineLocale("ky", {
        months: "ÑÐ½Ð²Ð°Ñ€ÑŒ_Ñ„ÐµÐ²Ñ€Ð°Ð»ÑŒ_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»ÑŒ_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ_Ð¾ÐºÑ‚ÑÐ±Ñ€ÑŒ_Ð½Ð¾ÑÐ±Ñ€ÑŒ_Ð´ÐµÐºÐ°Ð±Ñ€ÑŒ".split("_"),
        monthsShort: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_"),
        weekdays: "Ð–ÐµÐºÑˆÐµÐ¼Ð±Ð¸_Ð”Ò¯Ð¹ÑˆÓ©Ð¼Ð±Ò¯_Ð¨ÐµÐ¹ÑˆÐµÐ¼Ð±Ð¸_Ð¨Ð°Ñ€ÑˆÐµÐ¼Ð±Ð¸_Ð‘ÐµÐ¹ÑˆÐµÐ¼Ð±Ð¸_Ð–ÑƒÐ¼Ð°_Ð˜ÑˆÐµÐ¼Ð±Ð¸".split("_"),
        weekdaysShort: "Ð–ÐµÐº_Ð”Ò¯Ð¹_Ð¨ÐµÐ¹_Ð¨Ð°Ñ€_Ð‘ÐµÐ¹_Ð–ÑƒÐ¼_Ð˜ÑˆÐµ".split("_"),
        weekdaysMin: "Ð–Ðº_Ð”Ð¹_Ð¨Ð¹_Ð¨Ñ€_Ð‘Ð¹_Ð–Ð¼_Ð˜Ñˆ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ð‘Ò¯Ð³Ò¯Ð½ ÑÐ°Ð°Ñ‚] LT",
            nextDay: "[Ð­Ñ€Ñ‚ÐµÒ£ ÑÐ°Ð°Ñ‚] LT",
            nextWeek: "dddd [ÑÐ°Ð°Ñ‚] LT",
            lastDay: "[ÐšÐµÑ‡Ðµ ÑÐ°Ð°Ñ‚] LT",
            lastWeek: "[Ó¨Ñ‚ÐºÐµÐ½ Ð°Ð¿Ñ‚Ð°Ð½Ñ‹Ð½] dddd [ÐºÒ¯Ð½Ò¯] [ÑÐ°Ð°Ñ‚] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s Ð¸Ñ‡Ð¸Ð½Ð´Ðµ",
            past: "%s Ð¼ÑƒÑ€ÑƒÐ½",
            s: "Ð±Ð¸Ñ€Ð½ÐµÑ‡Ðµ ÑÐµÐºÑƒÐ½Ð´",
            ss: "%d ÑÐµÐºÑƒÐ½Ð´",
            m: "Ð±Ð¸Ñ€ Ð¼Ò¯Ð½Ó©Ñ‚",
            mm: "%d Ð¼Ò¯Ð½Ó©Ñ‚",
            h: "Ð±Ð¸Ñ€ ÑÐ°Ð°Ñ‚",
            hh: "%d ÑÐ°Ð°Ñ‚",
            d: "Ð±Ð¸Ñ€ ÐºÒ¯Ð½",
            dd: "%d ÐºÒ¯Ð½",
            M: "Ð±Ð¸Ñ€ Ð°Ð¹",
            MM: "%d Ð°Ð¹",
            y: "Ð±Ð¸Ñ€ Ð¶Ñ‹Ð»",
            yy: "%d Ð¶Ñ‹Ð»"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0447\u0438|\u0447\u044b|\u0447\u04af|\u0447\u0443)/,
        ordinal: function(e) {
            return e + (Zn[e] || Zn[e % 10] || Zn[100 <= e ? 100 : null])
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("lb", {
        months: "Januar_Februar_MÃ¤erz_AbrÃ«ll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Sonndeg_MÃ©indeg_DÃ«nschdeg_MÃ«ttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
        weekdaysShort: "So._MÃ©._DÃ«._MÃ«._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_MÃ©_DÃ«_MÃ«_Do_Fr_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm [Auer]",
            LTS: "H:mm:ss [Auer]",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm [Auer]",
            LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
        },
        calendar: {
            sameDay: "[Haut um] LT",
            sameElse: "L",
            nextDay: "[Muer um] LT",
            nextWeek: "dddd [um] LT",
            lastDay: "[GÃ«schter um] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 2:
                    case 4:
                        return "[Leschten] dddd [um] LT";
                    default:
                        return "[Leschte] dddd [um] LT"
                }
            }
        },
        relativeTime: {
            future: function(e) {
                return ea(e.substr(0, e.indexOf(" "))) ? "a " + e : "an " + e
            },
            past: function(e) {
                return ea(e.substr(0, e.indexOf(" "))) ? "viru " + e : "virun " + e
            },
            s: "e puer Sekonnen",
            ss: "%d Sekonnen",
            m: Qn,
            mm: "%d Minutten",
            h: Qn,
            hh: "%d Stonnen",
            d: Qn,
            dd: "%d Deeg",
            M: Qn,
            MM: "%d MÃ©int",
            y: Qn,
            yy: "%d Joer"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("lo", {
        months: "àº¡àº±àº‡àºàº­àº™_àºàº¸àº¡àºžàº²_àº¡àºµàº™àº²_à»€àº¡àºªàº²_àºžàº¶àº”àºªàº°àºžàº²_àº¡àº´àº–àº¸àº™àº²_àºà»àº¥àº°àºàº»àº”_àºªàº´àº‡àº«àº²_àºàº±àº™àºàº²_àº•àº¸àº¥àº²_àºžàº°àºˆàº´àº_àº—àº±àº™àº§àº²".split("_"),
        monthsShort: "àº¡àº±àº‡àºàº­àº™_àºàº¸àº¡àºžàº²_àº¡àºµàº™àº²_à»€àº¡àºªàº²_àºžàº¶àº”àºªàº°àºžàº²_àº¡àº´àº–àº¸àº™àº²_àºà»àº¥àº°àºàº»àº”_àºªàº´àº‡àº«àº²_àºàº±àº™àºàº²_àº•àº¸àº¥àº²_àºžàº°àºˆàº´àº_àº—àº±àº™àº§àº²".split("_"),
        weekdays: "àº­àº²àº—àº´àº”_àºˆàº±àº™_àº­àº±àº‡àº„àº²àº™_àºžàº¸àº”_àºžàº°àº«àº±àº”_àºªàº¸àº_à»€àºªàº»àº²".split("_"),
        weekdaysShort: "àº—àº´àº”_àºˆàº±àº™_àº­àº±àº‡àº„àº²àº™_àºžàº¸àº”_àºžàº°àº«àº±àº”_àºªàº¸àº_à»€àºªàº»àº²".split("_"),
        weekdaysMin: "àº—_àºˆ_àº­àº„_àºž_àºžàº«_àºªàº_àºª".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "àº§àº±àº™dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2|\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87/,
        isPM: function(e) {
            return "àº•àº­àº™à»àº¥àº‡" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "àº•àº­àº™à»€àºŠàº»à»‰àº²" : "àº•àº­àº™à»àº¥àº‡"
        },
        calendar: {
            sameDay: "[àº¡àº·à»‰àº™àºµà»‰à»€àº§àº¥àº²] LT",
            nextDay: "[àº¡àº·à»‰àº­àº·à»ˆàº™à»€àº§àº¥àº²] LT",
            nextWeek: "[àº§àº±àº™]dddd[à»œà»‰àº²à»€àº§àº¥àº²] LT",
            lastDay: "[àº¡àº·à»‰àº§àº²àº™àº™àºµà»‰à»€àº§àº¥àº²] LT",
            lastWeek: "[àº§àº±àº™]dddd[à»àº¥à»‰àº§àº™àºµà»‰à»€àº§àº¥àº²] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "àº­àºµàº %s",
            past: "%sàºœà»ˆàº²àº™àº¡àº²",
            s: "àºšà»à»ˆà»€àº—àº»à»ˆàº²à»ƒàº”àº§àº´àº™àº²àº—àºµ",
            ss: "%d àº§àº´àº™àº²àº—àºµ",
            m: "1 àº™àº²àº—àºµ",
            mm: "%d àº™àº²àº—àºµ",
            h: "1 àºŠàº»à»ˆàº§à»‚àº¡àº‡",
            hh: "%d àºŠàº»à»ˆàº§à»‚àº¡àº‡",
            d: "1 àº¡àº·à»‰",
            dd: "%d àº¡àº·à»‰",
            M: "1 à»€àº”àº·àº­àº™",
            MM: "%d à»€àº”àº·àº­àº™",
            y: "1 àº›àºµ",
            yy: "%d àº›àºµ"
        },
        dayOfMonthOrdinalParse: /(\u0e97\u0eb5\u0ec8)\d{1,2}/,
        ordinal: function(e) {
            return "àº—àºµà»ˆ" + e
        }
    });
    var ta = {
        ss: "sekundÄ—_sekundÅ¾iÅ³_sekundes",
        m: "minutÄ—_minutÄ—s_minutÄ™",
        mm: "minutÄ—s_minuÄiÅ³_minutes",
        h: "valanda_valandos_valandÄ…",
        hh: "valandos_valandÅ³_valandas",
        d: "diena_dienos_dienÄ…",
        dd: "dienos_dienÅ³_dienas",
        M: "mÄ—nuo_mÄ—nesio_mÄ—nesÄ¯",
        MM: "mÄ—nesiai_mÄ—nesiÅ³_mÄ—nesius",
        y: "metai_metÅ³_metus",
        yy: "metai_metÅ³_metus"
    };

    function ia(e, t, i, n) {
        return t ? aa(i)[0] : n ? aa(i)[1] : aa(i)[2]
    }

    function na(e) {
        return e % 10 == 0 || 10 < e && e < 20
    }

    function aa(e) {
        return ta[e].split("_")
    }

    function ra(e, t, i, n) {
        var a = e + " ";
        return 1 === e ? a + ia(0, t, i[0], n) : t ? a + (na(e) ? aa(i)[1] : aa(i)[0]) : n ? a + aa(i)[1] : a + (na(e) ? aa(i)[1] : aa(i)[2])
    }
    i.defineLocale("lt", {
        months: {
            format: "sausio_vasario_kovo_balandÅ¾io_geguÅ¾Ä—s_birÅ¾elio_liepos_rugpjÅ«Äio_rugsÄ—jo_spalio_lapkriÄio_gruodÅ¾io".split("_"),
            standalone: "sausis_vasaris_kovas_balandis_geguÅ¾Ä—_birÅ¾elis_liepa_rugpjÅ«tis_rugsÄ—jis_spalis_lapkritis_gruodis".split("_"),
            isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
        },
        monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
        weekdays: {
            format: "sekmadienÄ¯_pirmadienÄ¯_antradienÄ¯_treÄiadienÄ¯_ketvirtadienÄ¯_penktadienÄ¯_Å¡eÅ¡tadienÄ¯".split("_"),
            standalone: "sekmadienis_pirmadienis_antradienis_treÄiadienis_ketvirtadienis_penktadienis_Å¡eÅ¡tadienis".split("_"),
            isFormat: /dddd HH:mm/
        },
        weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Å eÅ¡".split("_"),
        weekdaysMin: "S_P_A_T_K_Pn_Å ".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY [m.] MMMM D [d.]",
            LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
            l: "YYYY-MM-DD",
            ll: "YYYY [m.] MMMM D [d.]",
            lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
        },
        calendar: {
            sameDay: "[Å iandien] LT",
            nextDay: "[Rytoj] LT",
            nextWeek: "dddd LT",
            lastDay: "[Vakar] LT",
            lastWeek: "[PraÄ—jusÄ¯] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "po %s",
            past: "prieÅ¡ %s",
            s: function(e, t, i, n) {
                return t ? "kelios sekundÄ—s" : n ? "keliÅ³ sekundÅ¾iÅ³" : "kelias sekundes"
            },
            ss: ra,
            m: ia,
            mm: ra,
            h: ia,
            hh: ra,
            d: ia,
            dd: ra,
            M: ia,
            MM: ra,
            y: ia,
            yy: ra
        },
        dayOfMonthOrdinalParse: /\d{1,2}-oji/,
        ordinal: function(e) {
            return e + "-oji"
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var sa = {
        ss: "sekundes_sekundÄ“m_sekunde_sekundes".split("_"),
        m: "minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes".split("_"),
        mm: "minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes".split("_"),
        h: "stundas_stundÄm_stunda_stundas".split("_"),
        hh: "stundas_stundÄm_stunda_stundas".split("_"),
        d: "dienas_dienÄm_diena_dienas".split("_"),
        dd: "dienas_dienÄm_diena_dienas".split("_"),
        M: "mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i".split("_"),
        MM: "mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i".split("_"),
        y: "gada_gadiem_gads_gadi".split("_"),
        yy: "gada_gadiem_gads_gadi".split("_")
    };

    function oa(e, t, i) {
        return i ? t % 10 == 1 && t % 100 != 11 ? e[2] : e[3] : t % 10 == 1 && t % 100 != 11 ? e[0] : e[1]
    }

    function da(e, t, i) {
        return e + " " + oa(sa[i], e, t)
    }

    function ua(e, t, i) {
        return oa(sa[i], e, t)
    }
    i.defineLocale("lv", {
        months: "janvÄris_februÄris_marts_aprÄ«lis_maijs_jÅ«nijs_jÅ«lijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jÅ«n_jÅ«l_aug_sep_okt_nov_dec".split("_"),
        weekdays: "svÄ“tdiena_pirmdiena_otrdiena_treÅ¡diena_ceturtdiena_piektdiena_sestdiena".split("_"),
        weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
        weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY.",
            LL: "YYYY. [gada] D. MMMM",
            LLL: "YYYY. [gada] D. MMMM, HH:mm",
            LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
        },
        calendar: {
            sameDay: "[Å odien pulksten] LT",
            nextDay: "[RÄ«t pulksten] LT",
            nextWeek: "dddd [pulksten] LT",
            lastDay: "[Vakar pulksten] LT",
            lastWeek: "[PagÄjuÅ¡Ä] dddd [pulksten] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "pÄ“c %s",
            past: "pirms %s",
            s: function(e, t) {
                return t ? "daÅ¾as sekundes" : "daÅ¾Äm sekundÄ“m"
            },
            ss: da,
            m: ua,
            mm: da,
            h: ua,
            hh: da,
            d: ua,
            dd: da,
            M: ua,
            MM: da,
            y: ua,
            yy: da
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var la = {
        words: {
            ss: ["sekund", "sekunda", "sekundi"],
            m: ["jedan minut", "jednog minuta"],
            mm: ["minut", "minuta", "minuta"],
            h: ["jedan sat", "jednog sata"],
            hh: ["sat", "sata", "sati"],
            dd: ["dan", "dana", "dana"],
            MM: ["mjesec", "mjeseca", "mjeseci"],
            yy: ["godina", "godine", "godina"]
        },
        correctGrammaticalCase: function(e, t) {
            return 1 === e ? t[0] : 2 <= e && e <= 4 ? t[1] : t[2]
        },
        translate: function(e, t, i) {
            var n = la.words[i];
            return 1 === i.length ? t ? n[0] : n[1] : e + " " + la.correctGrammaticalCase(e, n)
        }
    };

    function ca(e, t, i, n) {
        switch (i) {
            case "s":
                return t ? "Ñ…ÑÐ´Ñ…ÑÐ½ ÑÐµÐºÑƒÐ½Ð´" : "Ñ…ÑÐ´Ñ…ÑÐ½ ÑÐµÐºÑƒÐ½Ð´Ñ‹Ð½";
            case "ss":
                return e + (t ? " ÑÐµÐºÑƒÐ½Ð´" : " ÑÐµÐºÑƒÐ½Ð´Ñ‹Ð½");
            case "m":
            case "mm":
                return e + (t ? " Ð¼Ð¸Ð½ÑƒÑ‚" : " Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹Ð½");
            case "h":
            case "hh":
                return e + (t ? " Ñ†Ð°Ð³" : " Ñ†Ð°Ð³Ð¸Ð¹Ð½");
            case "d":
            case "dd":
                return e + (t ? " Ó©Ð´Ó©Ñ€" : " Ó©Ð´Ñ€Ð¸Ð¹Ð½");
            case "M":
            case "MM":
                return e + (t ? " ÑÐ°Ñ€" : " ÑÐ°Ñ€Ñ‹Ð½");
            case "y":
            case "yy":
                return e + (t ? " Ð¶Ð¸Ð»" : " Ð¶Ð¸Ð»Ð¸Ð¹Ð½");
            default:
                return e
        }
    }
    i.defineLocale("me", {
        months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sjutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄe u] LT",
            lastWeek: function() {
                return ["[proÅ¡le] [nedjelje] [u] LT", "[proÅ¡log] [ponedjeljka] [u] LT", "[proÅ¡log] [utorka] [u] LT", "[proÅ¡le] [srijede] [u] LT", "[proÅ¡log] [Äetvrtka] [u] LT", "[proÅ¡log] [petka] [u] LT", "[proÅ¡le] [subote] [u] LT"][this.day()]
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "nekoliko sekundi",
            ss: la.translate,
            m: la.translate,
            mm: la.translate,
            h: la.translate,
            hh: la.translate,
            d: "dan",
            dd: la.translate,
            M: "mjesec",
            MM: la.translate,
            y: "godinu",
            yy: la.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("mi", {
        months: "Kohi-tÄte_Hui-tanguru_PoutÅ«-te-rangi_Paenga-whÄwhÄ_Haratua_Pipiri_HÅngoingoi_Here-turi-kÅkÄ_Mahuru_Whiringa-Ä-nuku_Whiringa-Ä-rangi_Hakihea".split("_"),
        monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_HÅngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),
        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
        weekdays: "RÄtapu_Mane_TÅ«rei_Wenerei_TÄite_Paraire_HÄtarei".split("_"),
        weekdaysShort: "Ta_Ma_TÅ«_We_TÄi_Pa_HÄ".split("_"),
        weekdaysMin: "Ta_Ma_TÅ«_We_TÄi_Pa_HÄ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [i] HH:mm",
            LLLL: "dddd, D MMMM YYYY [i] HH:mm"
        },
        calendar: {
            sameDay: "[i teie mahana, i] LT",
            nextDay: "[apopo i] LT",
            nextWeek: "dddd [i] LT",
            lastDay: "[inanahi i] LT",
            lastWeek: "dddd [whakamutunga i] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "i roto i %s",
            past: "%s i mua",
            s: "te hÄ“kona ruarua",
            ss: "%d hÄ“kona",
            m: "he meneti",
            mm: "%d meneti",
            h: "te haora",
            hh: "%d haora",
            d: "he ra",
            dd: "%d ra",
            M: "he marama",
            MM: "%d marama",
            y: "he tau",
            yy: "%d tau"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("mk", {
        months: "Ñ˜Ð°Ð½ÑƒÐ°Ñ€Ð¸_Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½Ð¸_Ñ˜ÑƒÐ»Ð¸_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸_Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸".split("_"),
        monthsShort: "Ñ˜Ð°Ð½_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³_ÑÐµÐ¿_Ð¾ÐºÑ‚_Ð½Ð¾Ðµ_Ð´ÐµÐº".split("_"),
        weekdays: "Ð½ÐµÐ´ÐµÐ»Ð°_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð¾Ðº_Ð¿ÐµÑ‚Ð¾Ðº_ÑÐ°Ð±Ð¾Ñ‚Ð°".split("_"),
        weekdaysShort: "Ð½ÐµÐ´_Ð¿Ð¾Ð½_Ð²Ñ‚Ð¾_ÑÑ€Ðµ_Ñ‡ÐµÑ‚_Ð¿ÐµÑ‚_ÑÐ°Ð±".split("_"),
        weekdaysMin: "Ð½e_Ð¿o_Ð²Ñ‚_ÑÑ€_Ñ‡Ðµ_Ð¿Ðµ_Ña".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Ð”ÐµÐ½ÐµÑ Ð²Ð¾] LT",
            nextDay: "[Ð£Ñ‚Ñ€Ðµ Ð²Ð¾] LT",
            nextWeek: "[Ð’Ð¾] dddd [Ð²Ð¾] LT",
            lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²Ð¾] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return "[Ð˜Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð°Ñ‚Ð°] dddd [Ð²Ð¾] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Ð˜Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð¸Ð¾Ñ‚] dddd [Ð²Ð¾] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "Ð¿Ð¾ÑÐ»Ðµ %s",
            past: "Ð¿Ñ€ÐµÐ´ %s",
            s: "Ð½ÐµÐºÐ¾Ð»ÐºÑƒ ÑÐµÐºÑƒÐ½Ð´Ð¸",
            ss: "%d ÑÐµÐºÑƒÐ½Ð´Ð¸",
            m: "Ð¼Ð¸Ð½ÑƒÑ‚Ð°",
            mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚Ð¸",
            h: "Ñ‡Ð°Ñ",
            hh: "%d Ñ‡Ð°ÑÐ°",
            d: "Ð´ÐµÐ½",
            dd: "%d Ð´ÐµÐ½Ð°",
            M: "Ð¼ÐµÑÐµÑ†",
            MM: "%d Ð¼ÐµÑÐµÑ†Ð¸",
            y: "Ð³Ð¾Ð´Ð¸Ð½Ð°",
            yy: "%d Ð³Ð¾Ð´Ð¸Ð½Ð¸"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,
        ordinal: function(e) {
            var t = e % 10,
                i = e % 100;
            return 0 === e ? e + "-ÐµÐ²" : 0 === i ? e + "-ÐµÐ½" : 10 < i && i < 20 ? e + "-Ñ‚Ð¸" : 1 === t ? e + "-Ð²Ð¸" : 2 === t ? e + "-Ñ€Ð¸" : 7 === t || 8 === t ? e + "-Ð¼Ð¸" : e + "-Ñ‚Ð¸"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("ml", {
        months: "à´œà´¨àµà´µà´°à´¿_à´«àµ†à´¬àµà´°àµà´µà´°à´¿_à´®à´¾àµ¼à´šàµà´šàµ_à´à´ªàµà´°à´¿àµ½_à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ_à´“à´—à´¸àµà´±àµà´±àµ_à´¸àµ†à´ªàµà´±àµà´±à´‚à´¬àµ¼_à´’à´•àµà´Ÿàµ‹à´¬àµ¼_à´¨à´µà´‚à´¬àµ¼_à´¡à´¿à´¸à´‚à´¬àµ¼".split("_"),
        monthsShort: "à´œà´¨àµ._à´«àµ†à´¬àµà´°àµ._à´®à´¾àµ¼._à´à´ªàµà´°à´¿._à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ._à´“à´—._à´¸àµ†à´ªàµà´±àµà´±._à´’à´•àµà´Ÿàµ‹._à´¨à´µà´‚._à´¡à´¿à´¸à´‚.".split("_"),
        monthsParseExact: !0,
        weekdays: "à´žà´¾à´¯à´±à´¾à´´àµà´š_à´¤à´¿à´™àµà´•à´³à´¾à´´àµà´š_à´šàµŠà´µàµà´µà´¾à´´àµà´š_à´¬àµà´§à´¨à´¾à´´àµà´š_à´µàµà´¯à´¾à´´à´¾à´´àµà´š_à´µàµ†à´³àµà´³à´¿à´¯à´¾à´´àµà´š_à´¶à´¨à´¿à´¯à´¾à´´àµà´š".split("_"),
        weekdaysShort: "à´žà´¾à´¯àµ¼_à´¤à´¿à´™àµà´•àµ¾_à´šàµŠà´µàµà´µ_à´¬àµà´§àµ»_à´µàµà´¯à´¾à´´à´‚_à´µàµ†à´³àµà´³à´¿_à´¶à´¨à´¿".split("_"),
        weekdaysMin: "à´žà´¾_à´¤à´¿_à´šàµŠ_à´¬àµ_à´µàµà´¯à´¾_à´µàµ†_à´¶".split("_"),
        longDateFormat: {
            LT: "A h:mm -à´¨àµ",
            LTS: "A h:mm:ss -à´¨àµ",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm -à´¨àµ",
            LLLL: "dddd, D MMMM YYYY, A h:mm -à´¨àµ"
        },
        calendar: {
            sameDay: "[à´‡à´¨àµà´¨àµ] LT",
            nextDay: "[à´¨à´¾à´³àµ†] LT",
            nextWeek: "dddd, LT",
            lastDay: "[à´‡à´¨àµà´¨à´²àµ†] LT",
            lastWeek: "[à´•à´´à´¿à´žàµà´ž] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à´•à´´à´¿à´žàµà´žàµ",
            past: "%s à´®àµàµ»à´ªàµ",
            s: "à´…àµ½à´ª à´¨à´¿à´®à´¿à´·à´™àµà´™àµ¾",
            ss: "%d à´¸àµ†à´•àµà´•àµ»à´¡àµ",
            m: "à´’à´°àµ à´®à´¿à´¨à´¿à´±àµà´±àµ",
            mm: "%d à´®à´¿à´¨à´¿à´±àµà´±àµ",
            h: "à´’à´°àµ à´®à´£à´¿à´•àµà´•àµ‚àµ¼",
            hh: "%d à´®à´£à´¿à´•àµà´•àµ‚àµ¼",
            d: "à´’à´°àµ à´¦à´¿à´µà´¸à´‚",
            dd: "%d à´¦à´¿à´µà´¸à´‚",
            M: "à´’à´°àµ à´®à´¾à´¸à´‚",
            MM: "%d à´®à´¾à´¸à´‚",
            y: "à´’à´°àµ à´µàµ¼à´·à´‚",
            yy: "%d à´µàµ¼à´·à´‚"
        },
        meridiemParse: /\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f|\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46|\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d|\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02|\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f/i,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à´°à´¾à´¤àµà´°à´¿" === t && 4 <= e || "à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ" === t || "à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚" === t ? e + 12 : e
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à´°à´¾à´¤àµà´°à´¿" : e < 12 ? "à´°à´¾à´µà´¿à´²àµ†" : e < 17 ? "à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ" : e < 20 ? "à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚" : "à´°à´¾à´¤àµà´°à´¿"
        }
    }), i.defineLocale("mn", {
        months: "ÐÑÐ³Ð´Ò¯Ð³ÑÑÑ€ ÑÐ°Ñ€_Ð¥Ð¾Ñ‘Ñ€Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€_Ð“ÑƒÑ€Ð°Ð²Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€_Ð”Ó©Ñ€Ó©Ð²Ð´Ò¯Ð³ÑÑÑ€ ÑÐ°Ñ€_Ð¢Ð°Ð²Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€_Ð—ÑƒÑ€Ð³Ð°Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€_Ð”Ð¾Ð»Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€_ÐÐ°Ð¹Ð¼Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€_Ð•ÑÐ´Ò¯Ð³ÑÑÑ€ ÑÐ°Ñ€_ÐÑ€Ð°Ð²Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€_ÐÑ€Ð²Ð°Ð½ Ð½ÑÐ³Ð´Ò¯Ð³ÑÑÑ€ ÑÐ°Ñ€_ÐÑ€Ð²Ð°Ð½ Ñ…Ð¾Ñ‘Ñ€Ð´ÑƒÐ³Ð°Ð°Ñ€ ÑÐ°Ñ€".split("_"),
        monthsShort: "1 ÑÐ°Ñ€_2 ÑÐ°Ñ€_3 ÑÐ°Ñ€_4 ÑÐ°Ñ€_5 ÑÐ°Ñ€_6 ÑÐ°Ñ€_7 ÑÐ°Ñ€_8 ÑÐ°Ñ€_9 ÑÐ°Ñ€_10 ÑÐ°Ñ€_11 ÑÐ°Ñ€_12 ÑÐ°Ñ€".split("_"),
        monthsParseExact: !0,
        weekdays: "ÐÑÐ¼_Ð”Ð°Ð²Ð°Ð°_ÐœÑÐ³Ð¼Ð°Ñ€_Ð›Ñ…Ð°Ð³Ð²Ð°_ÐŸÒ¯Ñ€ÑÐ²_Ð‘Ð°Ð°ÑÐ°Ð½_Ð‘ÑÐ¼Ð±Ð°".split("_"),
        weekdaysShort: "ÐÑÐ¼_Ð”Ð°Ð²_ÐœÑÐ³_Ð›Ñ…Ð°_ÐŸÒ¯Ñ€_Ð‘Ð°Ð°_Ð‘ÑÐ¼".split("_"),
        weekdaysMin: "ÐÑ_Ð”Ð°_ÐœÑ_Ð›Ñ…_ÐŸÒ¯_Ð‘Ð°_Ð‘Ñ".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY Ð¾Ð½Ñ‹ MMMMÑ‹Ð½ D",
            LLL: "YYYY Ð¾Ð½Ñ‹ MMMMÑ‹Ð½ D HH:mm",
            LLLL: "dddd, YYYY Ð¾Ð½Ñ‹ MMMMÑ‹Ð½ D HH:mm"
        },
        meridiemParse: /\u04ae\u04e8|\u04ae\u0425/i,
        isPM: function(e) {
            return "Ò®Ð¥" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "Ò®Ó¨" : "Ò®Ð¥"
        },
        calendar: {
            sameDay: "[Ó¨Ð½Ó©Ó©Ð´Ó©Ñ€] LT",
            nextDay: "[ÐœÐ°Ñ€Ð³Ð°Ð°Ñˆ] LT",
            nextWeek: "[Ð˜Ñ€ÑÑ…] dddd LT",
            lastDay: "[Ó¨Ñ‡Ð¸Ð³Ð´Ó©Ñ€] LT",
            lastWeek: "[Ó¨Ð½Ð³Ó©Ñ€ÑÓ©Ð½] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s Ð´Ð°Ñ€Ð°Ð°",
            past: "%s Ó©Ð¼Ð½Ó©",
            s: ca,
            ss: ca,
            m: ca,
            mm: ca,
            h: ca,
            hh: ca,
            d: ca,
            dd: ca,
            M: ca,
            MM: ca,
            y: ca,
            yy: ca
        },
        dayOfMonthOrdinalParse: /\d{1,2} \u04e9\u0434\u04e9\u0440/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + " Ó©Ð´Ó©Ñ€";
                default:
                    return e
            }
        }
    });
    var _a = {
            1: "à¥§",
            2: "à¥¨",
            3: "à¥©",
            4: "à¥ª",
            5: "à¥«",
            6: "à¥¬",
            7: "à¥­",
            8: "à¥®",
            9: "à¥¯",
            0: "à¥¦"
        },
        ma = {
            "à¥§": "1",
            "à¥¨": "2",
            "à¥©": "3",
            "à¥ª": "4",
            "à¥«": "5",
            "à¥¬": "6",
            "à¥­": "7",
            "à¥®": "8",
            "à¥¯": "9",
            "à¥¦": "0"
        };

    function ha(e, t, i, n) {
        var a = "";
        if (t) switch (i) {
            case "s":
                a = "à¤•à¤¾à¤¹à¥€ à¤¸à¥‡à¤•à¤‚à¤¦";
                break;
            case "ss":
                a = "%d à¤¸à¥‡à¤•à¤‚à¤¦";
                break;
            case "m":
                a = "à¤à¤• à¤®à¤¿à¤¨à¤¿à¤Ÿ";
                break;
            case "mm":
                a = "%d à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡";
                break;
            case "h":
                a = "à¤à¤• à¤¤à¤¾à¤¸";
                break;
            case "hh":
                a = "%d à¤¤à¤¾à¤¸";
                break;
            case "d":
                a = "à¤à¤• à¤¦à¤¿à¤µà¤¸";
                break;
            case "dd":
                a = "%d à¤¦à¤¿à¤µà¤¸";
                break;
            case "M":
                a = "à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾";
                break;
            case "MM":
                a = "%d à¤®à¤¹à¤¿à¤¨à¥‡";
                break;
            case "y":
                a = "à¤à¤• à¤µà¤°à¥à¤·";
                break;
            case "yy":
                a = "%d à¤µà¤°à¥à¤·à¥‡"
        } else switch (i) {
            case "s":
                a = "à¤•à¤¾à¤¹à¥€ à¤¸à¥‡à¤•à¤‚à¤¦à¤¾à¤‚";
                break;
            case "ss":
                a = "%d à¤¸à¥‡à¤•à¤‚à¤¦à¤¾à¤‚";
                break;
            case "m":
                a = "à¤à¤•à¤¾ à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾";
                break;
            case "mm":
                a = "%d à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚";
                break;
            case "h":
                a = "à¤à¤•à¤¾ à¤¤à¤¾à¤¸à¤¾";
                break;
            case "hh":
                a = "%d à¤¤à¤¾à¤¸à¤¾à¤‚";
                break;
            case "d":
                a = "à¤à¤•à¤¾ à¤¦à¤¿à¤µà¤¸à¤¾";
                break;
            case "dd":
                a = "%d à¤¦à¤¿à¤µà¤¸à¤¾à¤‚";
                break;
            case "M":
                a = "à¤à¤•à¤¾ à¤®à¤¹à¤¿à¤¨à¥à¤¯à¤¾";
                break;
            case "MM":
                a = "%d à¤®à¤¹à¤¿à¤¨à¥à¤¯à¤¾à¤‚";
                break;
            case "y":
                a = "à¤à¤•à¤¾ à¤µà¤°à¥à¤·à¤¾";
                break;
            case "yy":
                a = "%d à¤µà¤°à¥à¤·à¤¾à¤‚"
        }
        return a.replace(/%d/i, e)
    }
    i.defineLocale("mr", {
        months: "à¤œà¤¾à¤¨à¥‡à¤µà¤¾à¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤¾à¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤à¤ªà¥à¤°à¤¿à¤²_à¤®à¥‡_à¤œà¥‚à¤¨_à¤œà¥à¤²à¥ˆ_à¤‘à¤—à¤¸à¥à¤Ÿ_à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚à¤¬à¤°_à¤‘à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤‚à¤¬à¤°".split("_"),
        monthsShort: "à¤œà¤¾à¤¨à¥‡._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š._à¤à¤ªà¥à¤°à¤¿._à¤®à¥‡._à¤œà¥‚à¤¨._à¤œà¥à¤²à¥ˆ._à¤‘à¤—._à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚._à¤‘à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚._à¤¡à¤¿à¤¸à¥‡à¤‚.".split("_"),
        monthsParseExact: !0,
        weekdays: "à¤°à¤µà¤¿à¤µà¤¾à¤°_à¤¸à¥‹à¤®à¤µà¤¾à¤°_à¤®à¤‚à¤—à¤³à¤µà¤¾à¤°_à¤¬à¥à¤§à¤µà¤¾à¤°_à¤—à¥à¤°à¥‚à¤µà¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°_à¤¶à¤¨à¤¿à¤µà¤¾à¤°".split("_"),
        weekdaysShort: "à¤°à¤µà¤¿_à¤¸à¥‹à¤®_à¤®à¤‚à¤—à¤³_à¤¬à¥à¤§_à¤—à¥à¤°à¥‚_à¤¶à¥à¤•à¥à¤°_à¤¶à¤¨à¤¿".split("_"),
        weekdaysMin: "à¤°_à¤¸à¥‹_à¤®à¤‚_à¤¬à¥_à¤—à¥_à¤¶à¥_à¤¶".split("_"),
        longDateFormat: {
            LT: "A h:mm à¤µà¤¾à¤œà¤¤à¤¾",
            LTS: "A h:mm:ss à¤µà¤¾à¤œà¤¤à¤¾",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾",
            LLLL: "dddd, D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾"
        },
        calendar: {
            sameDay: "[à¤†à¤œ] LT",
            nextDay: "[à¤‰à¤¦à¥à¤¯à¤¾] LT",
            nextWeek: "dddd, LT",
            lastDay: "[à¤•à¤¾à¤²] LT",
            lastWeek: "[à¤®à¤¾à¤—à¥€à¤²] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sà¤®à¤§à¥à¤¯à¥‡",
            past: "%sà¤ªà¥‚à¤°à¥à¤µà¥€",
            s: ha,
            ss: ha,
            m: ha,
            mm: ha,
            h: ha,
            hh: ha,
            d: ha,
            dd: ha,
            M: ha,
            MM: ha,
            y: ha,
            yy: ha
        },
        preparse: function(e) {
            return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function(e) {
                return ma[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return _a[e]
            })
        },
        meridiemParse: /\u0930\u093e\u0924\u094d\u0930\u0940|\u0938\u0915\u093e\u0933\u0940|\u0926\u0941\u092a\u093e\u0930\u0940|\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à¤°à¤¾à¤¤à¥à¤°à¥€" === t ? e < 4 ? e : e + 12 : "à¤¸à¤•à¤¾à¤³à¥€" === t ? e : "à¤¦à¥à¤ªà¤¾à¤°à¥€" === t ? 10 <= e ? e : e + 12 : "à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à¤°à¤¾à¤¤à¥à¤°à¥€" : e < 10 ? "à¤¸à¤•à¤¾à¤³à¥€" : e < 17 ? "à¤¦à¥à¤ªà¤¾à¤°à¥€" : e < 20 ? "à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€" : "à¤°à¤¾à¤¤à¥à¤°à¥€"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("ms-my", {
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "pagi" === t ? e : "tengahari" === t ? 11 <= e ? e : e + 12 : "petang" === t || "malam" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam"
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Esok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kelmarin pukul] LT",
            lastWeek: "dddd [lepas pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lepas",
            s: "beberapa saat",
            ss: "%d saat",
            m: "seminit",
            mm: "%d minit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("ms", {
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "pagi" === t ? e : "tengahari" === t ? 11 <= e ? e : e + 12 : "petang" === t || "malam" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam"
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Esok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kelmarin pukul] LT",
            lastWeek: "dddd [lepas pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lepas",
            s: "beberapa saat",
            ss: "%d saat",
            m: "seminit",
            mm: "%d minit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("mt", {
        months: "Jannar_Frar_Marzu_April_Mejju_Ä unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_DiÄ‹embru".split("_"),
        monthsShort: "Jan_Fra_Mar_Apr_Mej_Ä un_Lul_Aww_Set_Ott_Nov_DiÄ‹".split("_"),
        weekdays: "Il-Ä¦add_It-Tnejn_It-Tlieta_L-ErbgÄ§a_Il-Ä¦amis_Il-Ä imgÄ§a_Is-Sibt".split("_"),
        weekdaysShort: "Ä¦ad_Tne_Tli_Erb_Ä¦am_Ä im_Sib".split("_"),
        weekdaysMin: "Ä¦a_Tn_Tl_Er_Ä¦a_Ä i_Si".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Illum fil-]LT",
            nextDay: "[GÄ§ada fil-]LT",
            nextWeek: "dddd [fil-]LT",
            lastDay: "[Il-bieraÄ§ fil-]LT",
            lastWeek: "dddd [li gÄ§adda] [fil-]LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "fâ€™ %s",
            past: "%s ilu",
            s: "ftit sekondi",
            ss: "%d sekondi",
            m: "minuta",
            mm: "%d minuti",
            h: "siegÄ§a",
            hh: "%d siegÄ§at",
            d: "Ä¡urnata",
            dd: "%d Ä¡ranet",
            M: "xahar",
            MM: "%d xhur",
            y: "sena",
            yy: "%d sni"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var pa = {
            1: "á",
            2: "á‚",
            3: "áƒ",
            4: "á„",
            5: "á…",
            6: "á†",
            7: "á‡",
            8: "áˆ",
            9: "á‰",
            0: "á€"
        },
        fa = {
            "á": "1",
            "á‚": "2",
            "áƒ": "3",
            "á„": "4",
            "á…": "5",
            "á†": "6",
            "á‡": "7",
            "áˆ": "8",
            "á‰": "9",
            "á€": "0"
        };
    i.defineLocale("my", {
        months: "á€‡á€”á€ºá€”á€á€«á€›á€®_á€–á€±á€–á€±á€¬á€ºá€á€«á€›á€®_á€™á€á€º_á€§á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€‡á€°á€œá€­á€¯á€„á€º_á€žá€¼á€‚á€¯á€á€º_á€…á€€á€ºá€á€„á€ºá€˜á€¬_á€¡á€±á€¬á€€á€ºá€á€­á€¯á€˜á€¬_á€”á€­á€¯á€á€„á€ºá€˜á€¬_á€’á€®á€‡á€„á€ºá€˜á€¬".split("_"),
        monthsShort: "á€‡á€”á€º_á€–á€±_á€™á€á€º_á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€œá€­á€¯á€„á€º_á€žá€¼_á€…á€€á€º_á€¡á€±á€¬á€€á€º_á€”á€­á€¯_á€’á€®".split("_"),
        weekdays: "á€á€”á€„á€ºá€¹á€‚á€”á€½á€±_á€á€”á€„á€ºá€¹á€œá€¬_á€¡á€„á€ºá€¹á€‚á€«_á€—á€¯á€’á€¹á€“á€Ÿá€°á€¸_á€€á€¼á€¬á€žá€•á€á€±á€¸_á€žá€±á€¬á€€á€¼á€¬_á€…á€”á€±".split("_"),
        weekdaysShort: "á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±".split("_"),
        weekdaysMin: "á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[á€šá€”á€±.] LT [á€™á€¾á€¬]",
            nextDay: "[á€™á€”á€€á€ºá€–á€¼á€”á€º] LT [á€™á€¾á€¬]",
            nextWeek: "dddd LT [á€™á€¾á€¬]",
            lastDay: "[á€™á€”á€±.á€€] LT [á€™á€¾á€¬]",
            lastWeek: "[á€•á€¼á€®á€¸á€á€²á€·á€žá€±á€¬] dddd LT [á€™á€¾á€¬]",
            sameElse: "L"
        },
        relativeTime: {
            future: "á€œá€¬á€™á€Šá€ºá€· %s á€™á€¾á€¬",
            past: "á€œá€½á€”á€ºá€á€²á€·á€žá€±á€¬ %s á€€",
            s: "á€…á€€á€¹á€€á€”á€º.á€¡á€”á€Šá€ºá€¸á€„á€šá€º",
            ss: "%d á€…á€€á€¹á€€á€”á€·á€º",
            m: "á€á€…á€ºá€™á€­á€”á€…á€º",
            mm: "%d á€™á€­á€”á€…á€º",
            h: "á€á€…á€ºá€”á€¬á€›á€®",
            hh: "%d á€”á€¬á€›á€®",
            d: "á€á€…á€ºá€›á€€á€º",
            dd: "%d á€›á€€á€º",
            M: "á€á€…á€ºá€œ",
            MM: "%d á€œ",
            y: "á€á€…á€ºá€”á€¾á€…á€º",
            yy: "%d á€”á€¾á€…á€º"
        },
        preparse: function(e) {
            return e.replace(/[\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040]/g, function(e) {
                return fa[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return pa[e]
            })
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("nb", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
        monthsParseExact: !0,
        weekdays: "sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag_lÃ¸rdag".split("_"),
        weekdaysShort: "sÃ¸._ma._ti._on._to._fr._lÃ¸.".split("_"),
        weekdaysMin: "sÃ¸_ma_ti_on_to_fr_lÃ¸".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] HH:mm",
            LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
        },
        calendar: {
            sameDay: "[i dag kl.] LT",
            nextDay: "[i morgen kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[i gÃ¥r kl.] LT",
            lastWeek: "[forrige] dddd [kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s siden",
            s: "noen sekunder",
            ss: "%d sekunder",
            m: "ett minutt",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dager",
            M: "en mÃ¥ned",
            MM: "%d mÃ¥neder",
            y: "ett Ã¥r",
            yy: "%d Ã¥r"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var ga = {
            1: "à¥§",
            2: "à¥¨",
            3: "à¥©",
            4: "à¥ª",
            5: "à¥«",
            6: "à¥¬",
            7: "à¥­",
            8: "à¥®",
            9: "à¥¯",
            0: "à¥¦"
        },
        ya = {
            "à¥§": "1",
            "à¥¨": "2",
            "à¥©": "3",
            "à¥ª": "4",
            "à¥«": "5",
            "à¥¬": "6",
            "à¥­": "7",
            "à¥®": "8",
            "à¥¯": "9",
            "à¥¦": "0"
        };
    i.defineLocale("ne", {
        months: "à¤œà¤¨à¤µà¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿à¤²_à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ_à¤…à¤—à¤·à¥à¤Ÿ_à¤¸à¥‡à¤ªà¥à¤Ÿà¥‡à¤®à¥à¤¬à¤°_à¤…à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤­à¥‡à¤®à¥à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤®à¥à¤¬à¤°".split("_"),
        monthsShort: "à¤œà¤¨._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿._à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ._à¤…à¤—._à¤¸à¥‡à¤ªà¥à¤Ÿ._à¤…à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤­à¥‡._à¤¡à¤¿à¤¸à¥‡.".split("_"),
        monthsParseExact: !0,
        weekdays: "à¤†à¤‡à¤¤à¤¬à¤¾à¤°_à¤¸à¥‹à¤®à¤¬à¤¾à¤°_à¤®à¤™à¥à¤—à¤²à¤¬à¤¾à¤°_à¤¬à¥à¤§à¤¬à¤¾à¤°_à¤¬à¤¿à¤¹à¤¿à¤¬à¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤¬à¤¾à¤°_à¤¶à¤¨à¤¿à¤¬à¤¾à¤°".split("_"),
        weekdaysShort: "à¤†à¤‡à¤¤._à¤¸à¥‹à¤®._à¤®à¤™à¥à¤—à¤²._à¤¬à¥à¤§._à¤¬à¤¿à¤¹à¤¿._à¤¶à¥à¤•à¥à¤°._à¤¶à¤¨à¤¿.".split("_"),
        weekdaysMin: "à¤†._à¤¸à¥‹._à¤®à¤‚._à¤¬à¥._à¤¬à¤¿._à¤¶à¥._à¤¶.".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡",
            LTS: "Aà¤•à¥‹ h:mm:ss à¤¬à¤œà¥‡",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡",
            LLLL: "dddd, D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡"
        },
        preparse: function(e) {
            return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function(e) {
                return ya[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return ga[e]
            })
        },
        meridiemParse: /\u0930\u093e\u0924\u093f|\u092c\u093f\u0939\u093e\u0928|\u0926\u093f\u0909\u0901\u0938\u094b|\u0938\u093e\u0901\u091d/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à¤°à¤¾à¤¤à¤¿" === t ? e < 4 ? e : e + 12 : "à¤¬à¤¿à¤¹à¤¾à¤¨" === t ? e : "à¤¦à¤¿à¤‰à¤à¤¸à¥‹" === t ? 10 <= e ? e : e + 12 : "à¤¸à¤¾à¤à¤" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 3 ? "à¤°à¤¾à¤¤à¤¿" : e < 12 ? "à¤¬à¤¿à¤¹à¤¾à¤¨" : e < 16 ? "à¤¦à¤¿à¤‰à¤à¤¸à¥‹" : e < 20 ? "à¤¸à¤¾à¤à¤" : "à¤°à¤¾à¤¤à¤¿"
        },
        calendar: {
            sameDay: "[à¤†à¤œ] LT",
            nextDay: "[à¤­à¥‹à¤²à¤¿] LT",
            nextWeek: "[à¤†à¤‰à¤à¤¦à¥‹] dddd[,] LT",
            lastDay: "[à¤¹à¤¿à¤œà¥‹] LT",
            lastWeek: "[à¤—à¤à¤•à¥‹] dddd[,] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sà¤®à¤¾",
            past: "%s à¤…à¤—à¤¾à¤¡à¤¿",
            s: "à¤•à¥‡à¤¹à¥€ à¤•à¥à¤·à¤£",
            ss: "%d à¤¸à¥‡à¤•à¥‡à¤£à¥à¤¡",
            m: "à¤à¤• à¤®à¤¿à¤¨à¥‡à¤Ÿ",
            mm: "%d à¤®à¤¿à¤¨à¥‡à¤Ÿ",
            h: "à¤à¤• à¤˜à¤£à¥à¤Ÿà¤¾",
            hh: "%d à¤˜à¤£à¥à¤Ÿà¤¾",
            d: "à¤à¤• à¤¦à¤¿à¤¨",
            dd: "%d à¤¦à¤¿à¤¨",
            M: "à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾",
            MM: "%d à¤®à¤¹à¤¿à¤¨à¤¾",
            y: "à¤à¤• à¤¬à¤°à¥à¤·",
            yy: "%d à¤¬à¤°à¥à¤·"
        },
        week: {
            dow: 0,
            doy: 6
        }
    });
    var Ma = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        va = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
        La = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
        wa = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
    i.defineLocale("nl-be", {
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: function(e, t) {
            return e ? /-MMM-/.test(t) ? va[e.month()] : Ma[e.month()] : Ma
        },
        monthsRegex: wa,
        monthsShortRegex: wa,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
        monthsParse: La,
        longMonthsParse: La,
        shortMonthsParse: La,
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            ss: "%d seconden",
            m: "Ã©Ã©n minuut",
            mm: "%d minuten",
            h: "Ã©Ã©n uur",
            hh: "%d uur",
            d: "Ã©Ã©n dag",
            dd: "%d dagen",
            M: "Ã©Ã©n maand",
            MM: "%d maanden",
            y: "Ã©Ã©n jaar",
            yy: "%d jaar"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(e) {
            return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var ba = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        ka = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
        Ya = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
        Ta = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
    i.defineLocale("nl", {
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: function(e, t) {
            return e ? /-MMM-/.test(t) ? ka[e.month()] : ba[e.month()] : ba
        },
        monthsRegex: Ta,
        monthsShortRegex: Ta,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
        monthsParse: Ya,
        longMonthsParse: Ya,
        shortMonthsParse: Ya,
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            ss: "%d seconden",
            m: "Ã©Ã©n minuut",
            mm: "%d minuten",
            h: "Ã©Ã©n uur",
            hh: "%d uur",
            d: "Ã©Ã©n dag",
            dd: "%d dagen",
            M: "Ã©Ã©n maand",
            MM: "%d maanden",
            y: "Ã©Ã©n jaar",
            yy: "%d jaar"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(e) {
            return e + (1 === e || 8 === e || 20 <= e ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("nn", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "sundag_mÃ¥ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
        weekdaysShort: "sun_mÃ¥n_tys_ons_tor_fre_lau".split("_"),
        weekdaysMin: "su_mÃ¥_ty_on_to_fr_lÃ¸".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] H:mm",
            LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
        },
        calendar: {
            sameDay: "[I dag klokka] LT",
            nextDay: "[I morgon klokka] LT",
            nextWeek: "dddd [klokka] LT",
            lastDay: "[I gÃ¥r klokka] LT",
            lastWeek: "[FÃ¸regÃ¥ande] dddd [klokka] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s sidan",
            s: "nokre sekund",
            ss: "%d sekund",
            m: "eit minutt",
            mm: "%d minutt",
            h: "ein time",
            hh: "%d timar",
            d: "ein dag",
            dd: "%d dagar",
            M: "ein mÃ¥nad",
            MM: "%d mÃ¥nader",
            y: "eit Ã¥r",
            yy: "%d Ã¥r"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Da = {
            1: "à©§",
            2: "à©¨",
            3: "à©©",
            4: "à©ª",
            5: "à©«",
            6: "à©¬",
            7: "à©­",
            8: "à©®",
            9: "à©¯",
            0: "à©¦"
        },
        Aa = {
            "à©§": "1",
            "à©¨": "2",
            "à©©": "3",
            "à©ª": "4",
            "à©«": "5",
            "à©¬": "6",
            "à©­": "7",
            "à©®": "8",
            "à©¯": "9",
            "à©¦": "0"
        };
    i.defineLocale("pa-in", {
        months: "à¨œà¨¨à¨µà¨°à©€_à¨«à¨¼à¨°à¨µà¨°à©€_à¨®à¨¾à¨°à¨š_à¨…à¨ªà©à¨°à©ˆà¨²_à¨®à¨ˆ_à¨œà©‚à¨¨_à¨œà©à¨²à¨¾à¨ˆ_à¨…à¨—à¨¸à¨¤_à¨¸à¨¤à©°à¨¬à¨°_à¨…à¨•à¨¤à©‚à¨¬à¨°_à¨¨à¨µà©°à¨¬à¨°_à¨¦à¨¸à©°à¨¬à¨°".split("_"),
        monthsShort: "à¨œà¨¨à¨µà¨°à©€_à¨«à¨¼à¨°à¨µà¨°à©€_à¨®à¨¾à¨°à¨š_à¨…à¨ªà©à¨°à©ˆà¨²_à¨®à¨ˆ_à¨œà©‚à¨¨_à¨œà©à¨²à¨¾à¨ˆ_à¨…à¨—à¨¸à¨¤_à¨¸à¨¤à©°à¨¬à¨°_à¨…à¨•à¨¤à©‚à¨¬à¨°_à¨¨à¨µà©°à¨¬à¨°_à¨¦à¨¸à©°à¨¬à¨°".split("_"),
        weekdays: "à¨à¨¤à¨µà¨¾à¨°_à¨¸à©‹à¨®à¨µà¨¾à¨°_à¨®à©°à¨—à¨²à¨µà¨¾à¨°_à¨¬à©à¨§à¨µà¨¾à¨°_à¨µà©€à¨°à¨µà¨¾à¨°_à¨¸à¨¼à©à©±à¨•à¨°à¨µà¨¾à¨°_à¨¸à¨¼à¨¨à©€à¨šà¨°à¨µà¨¾à¨°".split("_"),
        weekdaysShort: "à¨à¨¤_à¨¸à©‹à¨®_à¨®à©°à¨—à¨²_à¨¬à©à¨§_à¨µà©€à¨°_à¨¸à¨¼à©à¨•à¨°_à¨¸à¨¼à¨¨à©€".split("_"),
        weekdaysMin: "à¨à¨¤_à¨¸à©‹à¨®_à¨®à©°à¨—à¨²_à¨¬à©à¨§_à¨µà©€à¨°_à¨¸à¨¼à©à¨•à¨°_à¨¸à¨¼à¨¨à©€".split("_"),
        longDateFormat: {
            LT: "A h:mm à¨µà¨œà©‡",
            LTS: "A h:mm:ss à¨µà¨œà©‡",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm à¨µà¨œà©‡",
            LLLL: "dddd, D MMMM YYYY, A h:mm à¨µà¨œà©‡"
        },
        calendar: {
            sameDay: "[à¨…à¨œ] LT",
            nextDay: "[à¨•à¨²] LT",
            nextWeek: "[à¨…à¨—à¨²à¨¾] dddd, LT",
            lastDay: "[à¨•à¨²] LT",
            lastWeek: "[à¨ªà¨¿à¨›à¨²à©‡] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à¨µà¨¿à©±à¨š",
            past: "%s à¨ªà¨¿à¨›à¨²à©‡",
            s: "à¨•à©à¨ à¨¸à¨•à¨¿à©°à¨Ÿ",
            ss: "%d à¨¸à¨•à¨¿à©°à¨Ÿ",
            m: "à¨‡à¨• à¨®à¨¿à©°à¨Ÿ",
            mm: "%d à¨®à¨¿à©°à¨Ÿ",
            h: "à¨‡à©±à¨• à¨˜à©°à¨Ÿà¨¾",
            hh: "%d à¨˜à©°à¨Ÿà©‡",
            d: "à¨‡à©±à¨• à¨¦à¨¿à¨¨",
            dd: "%d à¨¦à¨¿à¨¨",
            M: "à¨‡à©±à¨• à¨®à¨¹à©€à¨¨à¨¾",
            MM: "%d à¨®à¨¹à©€à¨¨à©‡",
            y: "à¨‡à©±à¨• à¨¸à¨¾à¨²",
            yy: "%d à¨¸à¨¾à¨²"
        },
        preparse: function(e) {
            return e.replace(/[\u0a67\u0a68\u0a69\u0a6a\u0a6b\u0a6c\u0a6d\u0a6e\u0a6f\u0a66]/g, function(e) {
                return Aa[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return Da[e]
            })
        },
        meridiemParse: /\u0a30\u0a3e\u0a24|\u0a38\u0a35\u0a47\u0a30|\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30|\u0a38\u0a3c\u0a3e\u0a2e/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à¨°à¨¾à¨¤" === t ? e < 4 ? e : e + 12 : "à¨¸à¨µà©‡à¨°" === t ? e : "à¨¦à©à¨ªà¨¹à¨¿à¨°" === t ? 10 <= e ? e : e + 12 : "à¨¸à¨¼à¨¾à¨®" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à¨°à¨¾à¨¤" : e < 10 ? "à¨¸à¨µà©‡à¨°" : e < 17 ? "à¨¦à©à¨ªà¨¹à¨¿à¨°" : e < 20 ? "à¨¸à¨¼à¨¾à¨®" : "à¨°à¨¾à¨¤"
        },
        week: {
            dow: 0,
            doy: 6
        }
    });
    var Sa = "styczeÅ„_luty_marzec_kwiecieÅ„_maj_czerwiec_lipiec_sierpieÅ„_wrzesieÅ„_paÅºdziernik_listopad_grudzieÅ„".split("_"),
        xa = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrzeÅ›nia_paÅºdziernika_listopada_grudnia".split("_");

    function Ea(e) {
        return e % 10 < 5 && 1 < e % 10 && ~~(e / 10) % 10 != 1
    }

    function Ha(e, t, i) {
        var n = e + " ";
        switch (i) {
            case "ss":
                return n + (Ea(e) ? "sekundy" : "sekund");
            case "m":
                return t ? "minuta" : "minutÄ™";
            case "mm":
                return n + (Ea(e) ? "minuty" : "minut");
            case "h":
                return t ? "godzina" : "godzinÄ™";
            case "hh":
                return n + (Ea(e) ? "godziny" : "godzin");
            case "MM":
                return n + (Ea(e) ? "miesiÄ…ce" : "miesiÄ™cy");
            case "yy":
                return n + (Ea(e) ? "lata" : "lat")
        }
    }

    function Oa(e, t, i) {
        var n = " ";
        return (20 <= e % 100 || 100 <= e && e % 100 == 0) && (n = " de "), e + n + {
            ss: "secunde",
            mm: "minute",
            hh: "ore",
            dd: "zile",
            MM: "luni",
            yy: "ani"
        }[i]
    }

    function Ca(e, t, i) {
        var n, a;
        return "m" === i ? t ? "Ð¼Ð¸Ð½ÑƒÑ‚Ð°" : "Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ" : e + " " + (n = +e, a = {
            ss: t ? "ÑÐµÐºÑƒÐ½Ð´Ð°_ÑÐµÐºÑƒÐ½Ð´Ñ‹_ÑÐµÐºÑƒÐ½Ð´" : "ÑÐµÐºÑƒÐ½Ð´Ñƒ_ÑÐµÐºÑƒÐ½Ð´Ñ‹_ÑÐµÐºÑƒÐ½Ð´",
            mm: t ? "Ð¼Ð¸Ð½ÑƒÑ‚Ð°_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚" : "Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚",
            hh: "Ñ‡Ð°Ñ_Ñ‡Ð°ÑÐ°_Ñ‡Ð°ÑÐ¾Ð²",
            dd: "Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ_Ð´Ð½ÐµÐ¹",
            MM: "Ð¼ÐµÑÑÑ†_Ð¼ÐµÑÑÑ†Ð°_Ð¼ÐµÑÑÑ†ÐµÐ²",
            yy: "Ð³Ð¾Ð´_Ð³Ð¾Ð´Ð°_Ð»ÐµÑ‚"
        }[i].split("_"), n % 10 == 1 && n % 100 != 11 ? a[0] : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 10 || 20 <= n % 100) ? a[1] : a[2])
    }
    i.defineLocale("pl", {
        months: function(e, t) {
            return e ? "" === t ? "(" + xa[e.month()] + "|" + Sa[e.month()] + ")" : /D MMMM/.test(t) ? xa[e.month()] : Sa[e.month()] : Sa
        },
        monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paÅº_lis_gru".split("_"),
        weekdays: "niedziela_poniedziaÅ‚ek_wtorek_Å›roda_czwartek_piÄ…tek_sobota".split("_"),
        weekdaysShort: "ndz_pon_wt_Å›r_czw_pt_sob".split("_"),
        weekdaysMin: "Nd_Pn_Wt_Åšr_Cz_Pt_So".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[DziÅ› o] LT",
            nextDay: "[Jutro o] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[W niedzielÄ™ o] LT";
                    case 2:
                        return "[We wtorek o] LT";
                    case 3:
                        return "[W Å›rodÄ™ o] LT";
                    case 6:
                        return "[W sobotÄ™ o] LT";
                    default:
                        return "[W] dddd [o] LT"
                }
            },
            lastDay: "[Wczoraj o] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[W zeszÅ‚Ä… niedzielÄ™ o] LT";
                    case 3:
                        return "[W zeszÅ‚Ä… Å›rodÄ™ o] LT";
                    case 6:
                        return "[W zeszÅ‚Ä… sobotÄ™ o] LT";
                    default:
                        return "[W zeszÅ‚y] dddd [o] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "%s temu",
            s: "kilka sekund",
            ss: Ha,
            m: Ha,
            mm: Ha,
            h: Ha,
            hh: Ha,
            d: "1 dzieÅ„",
            dd: "%d dni",
            M: "miesiÄ…c",
            MM: Ha,
            y: "rok",
            yy: Ha
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("pt-br", {
        months: "janeiro_fevereiro_marÃ§o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
        weekdays: "Domingo_Segunda-feira_TerÃ§a-feira_Quarta-feira_Quinta-feira_Sexta-feira_SÃ¡bado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b".split("_"),
        weekdaysMin: "Do_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY [Ã s] HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY [Ã s] HH:mm"
        },
        calendar: {
            sameDay: "[Hoje Ã s] LT",
            nextDay: "[AmanhÃ£ Ã s] LT",
            nextWeek: "dddd [Ã s] LT",
            lastDay: "[Ontem Ã s] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Ãšltimo] dddd [Ã s] LT" : "[Ãšltima] dddd [Ã s] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "hÃ¡ %s",
            s: "poucos segundos",
            ss: "%d segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mÃªs",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº"
    }), i.defineLocale("pt", {
        months: "janeiro_fevereiro_marÃ§o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
        weekdays: "Domingo_Segunda-feira_TerÃ§a-feira_Quarta-feira_Quinta-feira_Sexta-feira_SÃ¡bado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b".split("_"),
        weekdaysMin: "Do_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Hoje Ã s] LT",
            nextDay: "[AmanhÃ£ Ã s] LT",
            nextWeek: "dddd [Ã s] LT",
            lastDay: "[Ontem Ã s] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Ãšltimo] dddd [Ã s] LT" : "[Ãšltima] dddd [Ã s] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "hÃ¡ %s",
            s: "segundos",
            ss: "%d segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mÃªs",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\xba/,
        ordinal: "%dÂº",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("ro", {
        months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
        monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "duminicÄƒ_luni_marÈ›i_miercuri_joi_vineri_sÃ¢mbÄƒtÄƒ".split("_"),
        weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_SÃ¢m".split("_"),
        weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_SÃ¢".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[azi la] LT",
            nextDay: "[mÃ¢ine la] LT",
            nextWeek: "dddd [la] LT",
            lastDay: "[ieri la] LT",
            lastWeek: "[fosta] dddd [la] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "peste %s",
            past: "%s Ã®n urmÄƒ",
            s: "cÃ¢teva secunde",
            ss: Oa,
            m: "un minut",
            mm: Oa,
            h: "o orÄƒ",
            hh: Oa,
            d: "o zi",
            dd: Oa,
            M: "o lunÄƒ",
            MM: Oa,
            y: "un an",
            yy: Oa
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Pa = [/^\u044f\u043d\u0432/i, /^\u0444\u0435\u0432/i, /^\u043c\u0430\u0440/i, /^\u0430\u043f\u0440/i, /^\u043c\u0430[\u0439\u044f]/i, /^\u0438\u044e\u043d/i, /^\u0438\u044e\u043b/i, /^\u0430\u0432\u0433/i, /^\u0441\u0435\u043d/i, /^\u043e\u043a\u0442/i, /^\u043d\u043e\u044f/i, /^\u0434\u0435\u043a/i];
    i.defineLocale("ru", {
        months: {
            format: "ÑÐ½Ð²Ð°Ñ€Ñ_Ñ„ÐµÐ²Ñ€Ð°Ð»Ñ_Ð¼Ð°Ñ€Ñ‚Ð°_Ð°Ð¿Ñ€ÐµÐ»Ñ_Ð¼Ð°Ñ_Ð¸ÑŽÐ½Ñ_Ð¸ÑŽÐ»Ñ_Ð°Ð²Ð³ÑƒÑÑ‚Ð°_ÑÐµÐ½Ñ‚ÑÐ±Ñ€Ñ_Ð¾ÐºÑ‚ÑÐ±Ñ€Ñ_Ð½Ð¾ÑÐ±Ñ€Ñ_Ð´ÐµÐºÐ°Ð±Ñ€Ñ".split("_"),
            standalone: "ÑÐ½Ð²Ð°Ñ€ÑŒ_Ñ„ÐµÐ²Ñ€Ð°Ð»ÑŒ_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»ÑŒ_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ_Ð¾ÐºÑ‚ÑÐ±Ñ€ÑŒ_Ð½Ð¾ÑÐ±Ñ€ÑŒ_Ð´ÐµÐºÐ°Ð±Ñ€ÑŒ".split("_")
        },
        monthsShort: {
            format: "ÑÐ½Ð²._Ñ„ÐµÐ²Ñ€._Ð¼Ð°Ñ€._Ð°Ð¿Ñ€._Ð¼Ð°Ñ_Ð¸ÑŽÐ½Ñ_Ð¸ÑŽÐ»Ñ_Ð°Ð²Ð³._ÑÐµÐ½Ñ‚._Ð¾ÐºÑ‚._Ð½Ð¾ÑÐ±._Ð´ÐµÐº.".split("_"),
            standalone: "ÑÐ½Ð²._Ñ„ÐµÐ²Ñ€._Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€._Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³._ÑÐµÐ½Ñ‚._Ð¾ÐºÑ‚._Ð½Ð¾ÑÐ±._Ð´ÐµÐº.".split("_")
        },
        weekdays: {
            standalone: "Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³_Ð¿ÑÑ‚Ð½Ð¸Ñ†Ð°_ÑÑƒÐ±Ð±Ð¾Ñ‚Ð°".split("_"),
            format: "Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ñƒ_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³_Ð¿ÑÑ‚Ð½Ð¸Ñ†Ñƒ_ÑÑƒÐ±Ð±Ð¾Ñ‚Ñƒ".split("_"),
            isFormat: /\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e|\u044d\u0442\u0443)? ?\] ?dddd/
        },
        weekdaysShort: "Ð²Ñ_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        weekdaysMin: "Ð²Ñ_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        monthsParse: Pa,
        longMonthsParse: Pa,
        shortMonthsParse: Pa,
        monthsRegex: /^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i,
        monthsShortRegex: /^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i,
        monthsStrictRegex: /^(\u044f\u043d\u0432\u0430\u0440[\u044f\u044c]|\u0444\u0435\u0432\u0440\u0430\u043b[\u044f\u044c]|\u043c\u0430\u0440\u0442\u0430?|\u0430\u043f\u0440\u0435\u043b[\u044f\u044c]|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044f\u044c]|\u0438\u044e\u043b[\u044f\u044c]|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043e\u043a\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043d\u043e\u044f\u0431\u0440[\u044f\u044c]|\u0434\u0435\u043a\u0430\u0431\u0440[\u044f\u044c])/i,
        monthsShortStrictRegex: /^(\u044f\u043d\u0432\.|\u0444\u0435\u0432\u0440?\.|\u043c\u0430\u0440[\u0442.]|\u0430\u043f\u0440\.|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044c\u044f.]|\u0438\u044e\u043b[\u044c\u044f.]|\u0430\u0432\u0433\.|\u0441\u0435\u043d\u0442?\.|\u043e\u043a\u0442\.|\u043d\u043e\u044f\u0431?\.|\u0434\u0435\u043a\.)/i,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY Ð³.",
            LLL: "D MMMM YYYY Ð³., H:mm",
            LLLL: "dddd, D MMMM YYYY Ð³., H:mm"
        },
        calendar: {
            sameDay: "[Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ, Ð²] LT",
            nextDay: "[Ð—Ð°Ð²Ñ‚Ñ€Ð°, Ð²] LT",
            lastDay: "[Ð’Ñ‡ÐµÑ€Ð°, Ð²] LT",
            nextWeek: function(e) {
                if (e.week() === this.week()) return 2 === this.day() ? "[Ð’Ð¾] dddd, [Ð²] LT" : "[Ð’] dddd, [Ð²] LT";
                switch (this.day()) {
                    case 0:
                        return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÐµÐµ] dddd, [Ð²] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ð¹] dddd, [Ð²] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÑƒÑŽ] dddd, [Ð²] LT"
                }
            },
            lastWeek: function(e) {
                if (e.week() === this.week()) return 2 === this.day() ? "[Ð’Ð¾] dddd, [Ð²] LT" : "[Ð’] dddd, [Ð²] LT";
                switch (this.day()) {
                    case 0:
                        return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ðµ] dddd, [Ð²] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ñ‹Ð¹] dddd, [Ð²] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»ÑƒÑŽ] dddd, [Ð²] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "Ñ‡ÐµÑ€ÐµÐ· %s",
            past: "%s Ð½Ð°Ð·Ð°Ð´",
            s: "Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´",
            ss: Ca,
            m: Ca,
            mm: Ca,
            h: "Ñ‡Ð°Ñ",
            hh: Ca,
            d: "Ð´ÐµÐ½ÑŒ",
            dd: Ca,
            M: "Ð¼ÐµÑÑÑ†",
            MM: Ca,
            y: "Ð³Ð¾Ð´",
            yy: Ca
        },
        meridiemParse: /\u043d\u043e\u0447\u0438|\u0443\u0442\u0440\u0430|\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430/i,
        isPM: function(e) {
            return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430)$/.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "Ð½Ð¾Ñ‡Ð¸" : e < 12 ? "ÑƒÑ‚Ñ€Ð°" : e < 17 ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡ÐµÑ€Ð°"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0439|\u0433\u043e|\u044f)/,
        ordinal: function(e, t) {
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                    return e + "-Ð¹";
                case "D":
                    return e + "-Ð³Ð¾";
                case "w":
                case "W":
                    return e + "-Ñ";
                default:
                    return e
            }
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var za = ["Ø¬Ù†ÙˆØ±ÙŠ", "ÙÙŠØ¨Ø±ÙˆØ±ÙŠ", "Ù…Ø§Ø±Ú†", "Ø§Ù¾Ø±ÙŠÙ„", "Ù…Ø¦ÙŠ", "Ø¬ÙˆÙ†", "Ø¬ÙˆÙ„Ø§Ø¡Ù", "Ø¢Ú¯Ø³Ù½", "Ø³ÙŠÙ¾Ù½Ù…Ø¨Ø±", "Ø¢ÚªÙ½ÙˆØ¨Ø±", "Ù†ÙˆÙ…Ø¨Ø±", "ÚŠØ³Ù…Ø¨Ø±"],
        ja = ["Ø¢Ú†Ø±", "Ø³ÙˆÙ…Ø±", "Ø§Ú±Ø§Ø±Ùˆ", "Ø§Ø±Ø¨Ø¹", "Ø®Ù…ÙŠØ³", "Ø¬Ù…Ø¹", "Ú‡Ù†Ú‡Ø±"];
    i.defineLocale("sd", {
        months: za,
        monthsShort: za,
        weekdays: ja,
        weekdaysShort: ja,
        weekdaysMin: ja,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "ddddØŒ D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0635\u0628\u062d|\u0634\u0627\u0645/,
        isPM: function(e) {
            return "Ø´Ø§Ù…" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "ØµØ¨Ø­" : "Ø´Ø§Ù…"
        },
        calendar: {
            sameDay: "[Ø§Ú„] LT",
            nextDay: "[Ø³Ú€Ø§Ú»ÙŠ] LT",
            nextWeek: "dddd [Ø§Ú³ÙŠÙ† Ù‡ÙØªÙŠ ØªÙŠ] LT",
            lastDay: "[ÚªØ§Ù„Ù‡Ù‡] LT",
            lastWeek: "[Ú¯Ø²Ø±ÙŠÙ„ Ù‡ÙØªÙŠ] dddd [ØªÙŠ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s Ù¾ÙˆØ¡",
            past: "%s Ø§Ú³",
            s: "Ú†Ù†Ø¯ Ø³ÙŠÚªÙ†ÚŠ",
            ss: "%d Ø³ÙŠÚªÙ†ÚŠ",
            m: "Ù‡Úª Ù…Ù†Ù½",
            mm: "%d Ù…Ù†Ù½",
            h: "Ù‡Úª ÚªÙ„Ø§Úª",
            hh: "%d ÚªÙ„Ø§Úª",
            d: "Ù‡Úª ÚÙŠÙ†Ù‡Ù†",
            dd: "%d ÚÙŠÙ†Ù‡Ù†",
            M: "Ù‡Úª Ù…Ù‡ÙŠÙ†Ùˆ",
            MM: "%d Ù…Ù‡ÙŠÙ†Ø§",
            y: "Ù‡Úª Ø³Ø§Ù„",
            yy: "%d Ø³Ø§Ù„"
        },
        preparse: function(e) {
            return e.replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/,/g, "ØŒ")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("se", {
        months: "oÄ‘Ä‘ajagemÃ¡nnu_guovvamÃ¡nnu_njukÄamÃ¡nnu_cuoÅ‹omÃ¡nnu_miessemÃ¡nnu_geassemÃ¡nnu_suoidnemÃ¡nnu_borgemÃ¡nnu_ÄakÄamÃ¡nnu_golggotmÃ¡nnu_skÃ¡bmamÃ¡nnu_juovlamÃ¡nnu".split("_"),
        monthsShort: "oÄ‘Ä‘j_guov_njuk_cuo_mies_geas_suoi_borg_ÄakÄ_golg_skÃ¡b_juov".split("_"),
        weekdays: "sotnabeaivi_vuossÃ¡rga_maÅ‹Å‹ebÃ¡rga_gaskavahkku_duorastat_bearjadat_lÃ¡vvardat".split("_"),
        weekdaysShort: "sotn_vuos_maÅ‹_gask_duor_bear_lÃ¡v".split("_"),
        weekdaysMin: "s_v_m_g_d_b_L".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "MMMM D. [b.] YYYY",
            LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
            LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
        },
        calendar: {
            sameDay: "[otne ti] LT",
            nextDay: "[ihttin ti] LT",
            nextWeek: "dddd [ti] LT",
            lastDay: "[ikte ti] LT",
            lastWeek: "[ovddit] dddd [ti] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s geaÅ¾es",
            past: "maÅ‹it %s",
            s: "moadde sekunddat",
            ss: "%d sekunddat",
            m: "okta minuhta",
            mm: "%d minuhtat",
            h: "okta diimmu",
            hh: "%d diimmut",
            d: "okta beaivi",
            dd: "%d beaivvit",
            M: "okta mÃ¡nnu",
            MM: "%d mÃ¡nut",
            y: "okta jahki",
            yy: "%d jagit"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("si", {
        months: "à¶¢à¶±à·€à·à¶»à·’_à¶´à·™à¶¶à¶»à·€à·à¶»à·’_à¶¸à·à¶»à·Šà¶­à·”_à¶…à¶´à·Šâ€à¶»à·šà¶½à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·à·ƒà·Šà¶­à·”_à·ƒà·à¶´à·Šà¶­à·à¶¸à·Šà¶¶à¶»à·Š_à¶”à¶šà·Šà¶­à·à¶¶à¶»à·Š_à¶±à·œà·€à·à¶¸à·Šà¶¶à¶»à·Š_à¶¯à·™à·ƒà·à¶¸à·Šà¶¶à¶»à·Š".split("_"),
        monthsShort: "à¶¢à¶±_à¶´à·™à¶¶_à¶¸à·à¶»à·Š_à¶…à¶´à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·_à·ƒà·à¶´à·Š_à¶”à¶šà·Š_à¶±à·œà·€à·_à¶¯à·™à·ƒà·".split("_"),
        weekdays: "à¶‰à¶»à·’à¶¯à·_à·ƒà¶³à·”à¶¯à·_à¶…à¶Ÿà·„à¶»à·”à·€à·à¶¯à·_à¶¶à¶¯à·à¶¯à·_à¶¶à·Šâ€à¶»à·„à·ƒà·Šà¶´à¶­à·’à¶±à·Šà¶¯à·_à·ƒà·’à¶šà·”à¶»à·à¶¯à·_à·ƒà·™à¶±à·ƒà·”à¶»à·à¶¯à·".split("_"),
        weekdaysShort: "à¶‰à¶»à·’_à·ƒà¶³à·”_à¶…à¶Ÿ_à¶¶à¶¯à·_à¶¶à·Šâ€à¶»à·„_à·ƒà·’à¶šà·”_à·ƒà·™à¶±".split("_"),
        weekdaysMin: "à¶‰_à·ƒ_à¶…_à¶¶_à¶¶à·Šâ€à¶»_à·ƒà·’_à·ƒà·™".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "a h:mm",
            LTS: "a h:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYY MMMM D",
            LLL: "YYYY MMMM D, a h:mm",
            LLLL: "YYYY MMMM D [à·€à·à¶±à·’] dddd, a h:mm:ss"
        },
        calendar: {
            sameDay: "[à¶…à¶¯] LT[à¶§]",
            nextDay: "[à·„à·™à¶§] LT[à¶§]",
            nextWeek: "dddd LT[à¶§]",
            lastDay: "[à¶Šà¶ºà·š] LT[à¶§]",
            lastWeek: "[à¶´à·ƒà·”à¶œà·’à¶º] dddd LT[à¶§]",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sà¶šà·’à¶±à·Š",
            past: "%sà¶šà¶§ à¶´à·™à¶»",
            s: "à¶­à¶­à·Šà¶´à¶» à¶šà·’à·„à·’à¶´à¶º",
            ss: "à¶­à¶­à·Šà¶´à¶» %d",
            m: "à¶¸à·’à¶±à·’à¶­à·Šà¶­à·”à·€",
            mm: "à¶¸à·’à¶±à·’à¶­à·Šà¶­à·” %d",
            h: "à¶´à·à¶º",
            hh: "à¶´à·à¶º %d",
            d: "à¶¯à·’à¶±à¶º",
            dd: "à¶¯à·’à¶± %d",
            M: "à¶¸à·à·ƒà¶º",
            MM: "à¶¸à·à·ƒ %d",
            y: "à·€à·ƒà¶»",
            yy: "à·€à·ƒà¶» %d"
        },
        dayOfMonthOrdinalParse: /\d{1,2} \u0dc0\u0dd0\u0db1\u0dd2/,
        ordinal: function(e) {
            return e + " à·€à·à¶±à·’"
        },
        meridiemParse: /\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4|\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4|\u0db4\u0dd9.\u0dc0|\u0db4.\u0dc0./,
        isPM: function(e) {
            return "à¶´.à·€." === e || "à¶´à·ƒà·Š à·€à¶»à·”" === e
        },
        meridiem: function(e, t, i) {
            return 11 < e ? i ? "à¶´.à·€." : "à¶´à·ƒà·Š à·€à¶»à·”" : i ? "à¶´à·™.à·€." : "à¶´à·™à¶» à·€à¶»à·”"
        }
    });
    var Ra = "januÃ¡r_februÃ¡r_marec_aprÃ­l_mÃ¡j_jÃºn_jÃºl_august_september_oktÃ³ber_november_december".split("_"),
        Ia = "jan_feb_mar_apr_mÃ¡j_jÃºn_jÃºl_aug_sep_okt_nov_dec".split("_");

    function Fa(e) {
        return 1 < e && e < 5
    }

    function $a(e, t, i, n) {
        var a = e + " ";
        switch (i) {
            case "s":
                return t || n ? "pÃ¡r sekÃºnd" : "pÃ¡r sekundami";
            case "ss":
                return t || n ? a + (Fa(e) ? "sekundy" : "sekÃºnd") : a + "sekundami";
            case "m":
                return t ? "minÃºta" : n ? "minÃºtu" : "minÃºtou";
            case "mm":
                return t || n ? a + (Fa(e) ? "minÃºty" : "minÃºt") : a + "minÃºtami";
            case "h":
                return t ? "hodina" : n ? "hodinu" : "hodinou";
            case "hh":
                return t || n ? a + (Fa(e) ? "hodiny" : "hodÃ­n") : a + "hodinami";
            case "d":
                return t || n ? "deÅˆ" : "dÅˆom";
            case "dd":
                return t || n ? a + (Fa(e) ? "dni" : "dnÃ­") : a + "dÅˆami";
            case "M":
                return t || n ? "mesiac" : "mesiacom";
            case "MM":
                return t || n ? a + (Fa(e) ? "mesiace" : "mesiacov") : a + "mesiacmi";
            case "y":
                return t || n ? "rok" : "rokom";
            case "yy":
                return t || n ? a + (Fa(e) ? "roky" : "rokov") : a + "rokmi"
        }
    }

    function Na(e, t, i, n) {
        var a = e + " ";
        switch (i) {
            case "s":
                return t || n ? "nekaj sekund" : "nekaj sekundami";
            case "ss":
                return a + (1 === e ? t ? "sekundo" : "sekundi" : 2 === e ? t || n ? "sekundi" : "sekundah" : e < 5 ? t || n ? "sekunde" : "sekundah" : "sekund");
            case "m":
                return t ? "ena minuta" : "eno minuto";
            case "mm":
                return a + (1 === e ? t ? "minuta" : "minuto" : 2 === e ? t || n ? "minuti" : "minutama" : e < 5 ? t || n ? "minute" : "minutami" : t || n ? "minut" : "minutami");
            case "h":
                return t ? "ena ura" : "eno uro";
            case "hh":
                return a + (1 === e ? t ? "ura" : "uro" : 2 === e ? t || n ? "uri" : "urama" : e < 5 ? t || n ? "ure" : "urami" : t || n ? "ur" : "urami");
            case "d":
                return t || n ? "en dan" : "enim dnem";
            case "dd":
                return a + (1 === e ? t || n ? "dan" : "dnem" : 2 === e ? t || n ? "dni" : "dnevoma" : t || n ? "dni" : "dnevi");
            case "M":
                return t || n ? "en mesec" : "enim mesecem";
            case "MM":
                return a + (1 === e ? t || n ? "mesec" : "mesecem" : 2 === e ? t || n ? "meseca" : "mesecema" : e < 5 ? t || n ? "mesece" : "meseci" : t || n ? "mesecev" : "meseci");
            case "y":
                return t || n ? "eno leto" : "enim letom";
            case "yy":
                return a + (1 === e ? t || n ? "leto" : "letom" : 2 === e ? t || n ? "leti" : "letoma" : e < 5 ? t || n ? "leta" : "leti" : t || n ? "let" : "leti")
        }
    }
    i.defineLocale("sk", {
        months: Ra,
        monthsShort: Ia,
        weekdays: "nedeÄ¾a_pondelok_utorok_streda_Å¡tvrtok_piatok_sobota".split("_"),
        weekdaysShort: "ne_po_ut_st_Å¡t_pi_so".split("_"),
        weekdaysMin: "ne_po_ut_st_Å¡t_pi_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[dnes o] LT",
            nextDay: "[zajtra o] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v nedeÄ¾u o] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [o] LT";
                    case 3:
                        return "[v stredu o] LT";
                    case 4:
                        return "[vo Å¡tvrtok o] LT";
                    case 5:
                        return "[v piatok o] LT";
                    case 6:
                        return "[v sobotu o] LT"
                }
            },
            lastDay: "[vÄera o] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[minulÃº nedeÄ¾u o] LT";
                    case 1:
                    case 2:
                        return "[minulÃ½] dddd [o] LT";
                    case 3:
                        return "[minulÃº stredu o] LT";
                    case 4:
                    case 5:
                        return "[minulÃ½] dddd [o] LT";
                    case 6:
                        return "[minulÃº sobotu o] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "pred %s",
            s: $a,
            ss: $a,
            m: $a,
            mm: $a,
            h: $a,
            hh: $a,
            d: $a,
            dd: $a,
            M: $a,
            MM: $a,
            y: $a,
            yy: $a
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("sl", {
        months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedelja_ponedeljek_torek_sreda_Äetrtek_petek_sobota".split("_"),
        weekdaysShort: "ned._pon._tor._sre._Äet._pet._sob.".split("_"),
        weekdaysMin: "ne_po_to_sr_Äe_pe_so".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danes ob] LT",
            nextDay: "[jutri ob] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v] [nedeljo] [ob] LT";
                    case 3:
                        return "[v] [sredo] [ob] LT";
                    case 6:
                        return "[v] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[v] dddd [ob] LT"
                }
            },
            lastDay: "[vÄeraj ob] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[prejÅ¡njo] [nedeljo] [ob] LT";
                    case 3:
                        return "[prejÅ¡njo] [sredo] [ob] LT";
                    case 6:
                        return "[prejÅ¡njo] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prejÅ¡nji] dddd [ob] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "Äez %s",
            past: "pred %s",
            s: Na,
            ss: Na,
            m: Na,
            mm: Na,
            h: Na,
            hh: Na,
            d: Na,
            dd: Na,
            M: Na,
            MM: Na,
            y: Na,
            yy: Na
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("sq", {
        months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_NÃ«ntor_Dhjetor".split("_"),
        monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_NÃ«n_Dhj".split("_"),
        weekdays: "E Diel_E HÃ«nÃ«_E MartÃ«_E MÃ«rkurÃ«_E Enjte_E Premte_E ShtunÃ«".split("_"),
        weekdaysShort: "Die_HÃ«n_Mar_MÃ«r_Enj_Pre_Sht".split("_"),
        weekdaysMin: "D_H_Ma_MÃ«_E_P_Sh".split("_"),
        weekdaysParseExact: !0,
        meridiemParse: /PD|MD/,
        isPM: function(e) {
            return "M" === e.charAt(0)
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "PD" : "MD"
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Sot nÃ«] LT",
            nextDay: "[NesÃ«r nÃ«] LT",
            nextWeek: "dddd [nÃ«] LT",
            lastDay: "[Dje nÃ«] LT",
            lastWeek: "dddd [e kaluar nÃ«] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "nÃ« %s",
            past: "%s mÃ« parÃ«",
            s: "disa sekonda",
            ss: "%d sekonda",
            m: "njÃ« minutÃ«",
            mm: "%d minuta",
            h: "njÃ« orÃ«",
            hh: "%d orÃ«",
            d: "njÃ« ditÃ«",
            dd: "%d ditÃ«",
            M: "njÃ« muaj",
            MM: "%d muaj",
            y: "njÃ« vit",
            yy: "%d vite"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Wa = {
        words: {
            ss: ["ÑÐµÐºÑƒÐ½Ð´Ð°", "ÑÐµÐºÑƒÐ½Ð´Ðµ", "ÑÐµÐºÑƒÐ½Ð´Ð¸"],
            m: ["Ñ˜ÐµÐ´Ð°Ð½ Ð¼Ð¸Ð½ÑƒÑ‚", "Ñ˜ÐµÐ´Ð½Ðµ Ð¼Ð¸Ð½ÑƒÑ‚Ðµ"],
            mm: ["Ð¼Ð¸Ð½ÑƒÑ‚", "Ð¼Ð¸Ð½ÑƒÑ‚Ðµ", "Ð¼Ð¸Ð½ÑƒÑ‚Ð°"],
            h: ["Ñ˜ÐµÐ´Ð°Ð½ ÑÐ°Ñ‚", "Ñ˜ÐµÐ´Ð½Ð¾Ð³ ÑÐ°Ñ‚Ð°"],
            hh: ["ÑÐ°Ñ‚", "ÑÐ°Ñ‚Ð°", "ÑÐ°Ñ‚Ð¸"],
            dd: ["Ð´Ð°Ð½", "Ð´Ð°Ð½Ð°", "Ð´Ð°Ð½Ð°"],
            MM: ["Ð¼ÐµÑÐµÑ†", "Ð¼ÐµÑÐµÑ†Ð°", "Ð¼ÐµÑÐµÑ†Ð¸"],
            yy: ["Ð³Ð¾Ð´Ð¸Ð½Ð°", "Ð³Ð¾Ð´Ð¸Ð½Ðµ", "Ð³Ð¾Ð´Ð¸Ð½Ð°"]
        },
        correctGrammaticalCase: function(e, t) {
            return 1 === e ? t[0] : 2 <= e && e <= 4 ? t[1] : t[2]
        },
        translate: function(e, t, i) {
            var n = Wa.words[i];
            return 1 === i.length ? t ? n[0] : n[1] : e + " " + Wa.correctGrammaticalCase(e, n)
        }
    };
    i.defineLocale("sr-cyrl", {
        months: "Ñ˜Ð°Ð½ÑƒÐ°Ñ€_Ñ„ÐµÐ±Ñ€ÑƒÐ°Ñ€_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð±Ð°Ñ€_Ð¾ÐºÑ‚Ð¾Ð±Ð°Ñ€_Ð½Ð¾Ð²ÐµÐ¼Ð±Ð°Ñ€_Ð´ÐµÑ†ÐµÐ¼Ð±Ð°Ñ€".split("_"),
        monthsShort: "Ñ˜Ð°Ð½._Ñ„ÐµÐ±._Ð¼Ð°Ñ€._Ð°Ð¿Ñ€._Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³._ÑÐµÐ¿._Ð¾ÐºÑ‚._Ð½Ð¾Ð²._Ð´ÐµÑ†.".split("_"),
        monthsParseExact: !0,
        weekdays: "Ð½ÐµÐ´ÐµÑ™Ð°_Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™Ð°Ðº_ÑƒÑ‚Ð¾Ñ€Ð°Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð°Ðº_Ð¿ÐµÑ‚Ð°Ðº_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"),
        weekdaysShort: "Ð½ÐµÐ´._Ð¿Ð¾Ð½._ÑƒÑ‚Ð¾._ÑÑ€Ðµ._Ñ‡ÐµÑ‚._Ð¿ÐµÑ‚._ÑÑƒÐ±.".split("_"),
        weekdaysMin: "Ð½Ðµ_Ð¿Ð¾_ÑƒÑ‚_ÑÑ€_Ñ‡Ðµ_Ð¿Ðµ_ÑÑƒ".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Ð´Ð°Ð½Ð°Ñ Ñƒ] LT",
            nextDay: "[ÑÑƒÑ‚Ñ€Ð° Ñƒ] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[Ñƒ] [Ð½ÐµÐ´ÐµÑ™Ñƒ] [Ñƒ] LT";
                    case 3:
                        return "[Ñƒ] [ÑÑ€ÐµÐ´Ñƒ] [Ñƒ] LT";
                    case 6:
                        return "[Ñƒ] [ÑÑƒÐ±Ð¾Ñ‚Ñƒ] [Ñƒ] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Ñƒ] dddd [Ñƒ] LT"
                }
            },
            lastDay: "[Ñ˜ÑƒÑ‡Ðµ Ñƒ] LT",
            lastWeek: function() {
                return ["[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [Ð½ÐµÐ´ÐµÑ™Ðµ] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [ÑƒÑ‚Ð¾Ñ€ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑ€ÐµÐ´Ðµ] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿ÐµÑ‚ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑƒÐ±Ð¾Ñ‚Ðµ] [Ñƒ] LT"][this.day()]
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "Ð·Ð° %s",
            past: "Ð¿Ñ€Ðµ %s",
            s: "Ð½ÐµÐºÐ¾Ð»Ð¸ÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´Ð¸",
            ss: Wa.translate,
            m: Wa.translate,
            mm: Wa.translate,
            h: Wa.translate,
            hh: Wa.translate,
            d: "Ð´Ð°Ð½",
            dd: Wa.translate,
            M: "Ð¼ÐµÑÐµÑ†",
            MM: Wa.translate,
            y: "Ð³Ð¾Ð´Ð¸Ð½Ñƒ",
            yy: Wa.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Ba = {
        words: {
            ss: ["sekunda", "sekunde", "sekundi"],
            m: ["jedan minut", "jedne minute"],
            mm: ["minut", "minute", "minuta"],
            h: ["jedan sat", "jednog sata"],
            hh: ["sat", "sata", "sati"],
            dd: ["dan", "dana", "dana"],
            MM: ["mesec", "meseca", "meseci"],
            yy: ["godina", "godine", "godina"]
        },
        correctGrammaticalCase: function(e, t) {
            return 1 === e ? t[0] : 2 <= e && e <= 4 ? t[1] : t[2]
        },
        translate: function(e, t, i) {
            var n = Ba.words[i];
            return 1 === i.length ? t ? n[0] : n[1] : e + " " + Ba.correctGrammaticalCase(e, n)
        }
    };
    i.defineLocale("sr", {
        months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedelja_ponedeljak_utorak_sreda_Äetvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sre._Äet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedelju] [u] LT";
                    case 3:
                        return "[u] [sredu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄe u] LT",
            lastWeek: function() {
                return ["[proÅ¡le] [nedelje] [u] LT", "[proÅ¡log] [ponedeljka] [u] LT", "[proÅ¡log] [utorka] [u] LT", "[proÅ¡le] [srede] [u] LT", "[proÅ¡log] [Äetvrtka] [u] LT", "[proÅ¡log] [petka] [u] LT", "[proÅ¡le] [subote] [u] LT"][this.day()]
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "pre %s",
            s: "nekoliko sekundi",
            ss: Ba.translate,
            m: Ba.translate,
            mm: Ba.translate,
            h: Ba.translate,
            hh: Ba.translate,
            d: "dan",
            dd: Ba.translate,
            M: "mesec",
            MM: Ba.translate,
            y: "godinu",
            yy: Ba.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("ss", {
        months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
        monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
        weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
        weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
        weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Namuhla nga] LT",
            nextDay: "[Kusasa nga] LT",
            nextWeek: "dddd [nga] LT",
            lastDay: "[Itolo nga] LT",
            lastWeek: "dddd [leliphelile] [nga] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "nga %s",
            past: "wenteka nga %s",
            s: "emizuzwana lomcane",
            ss: "%d mzuzwana",
            m: "umzuzu",
            mm: "%d emizuzu",
            h: "lihora",
            hh: "%d emahora",
            d: "lilanga",
            dd: "%d emalanga",
            M: "inyanga",
            MM: "%d tinyanga",
            y: "umnyaka",
            yy: "%d iminyaka"
        },
        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
        meridiem: function(e, t, i) {
            return e < 11 ? "ekuseni" : e < 15 ? "emini" : e < 19 ? "entsambama" : "ebusuku"
        },
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "ekuseni" === t ? e : "emini" === t ? 11 <= e ? e : e + 12 : "entsambama" === t || "ebusuku" === t ? 0 === e ? 0 : e + 12 : void 0
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: "%d",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("sv", {
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "sÃ¶ndag_mÃ¥ndag_tisdag_onsdag_torsdag_fredag_lÃ¶rdag".split("_"),
        weekdaysShort: "sÃ¶n_mÃ¥n_tis_ons_tor_fre_lÃ¶r".split("_"),
        weekdaysMin: "sÃ¶_mÃ¥_ti_on_to_fr_lÃ¶".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [kl.] HH:mm",
            LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Idag] LT",
            nextDay: "[Imorgon] LT",
            lastDay: "[IgÃ¥r] LT",
            nextWeek: "[PÃ¥] dddd LT",
            lastWeek: "[I] dddd[s] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "fÃ¶r %s sedan",
            s: "nÃ¥gra sekunder",
            ss: "%d sekunder",
            m: "en minut",
            mm: "%d minuter",
            h: "en timme",
            hh: "%d timmar",
            d: "en dag",
            dd: "%d dagar",
            M: "en mÃ¥nad",
            MM: "%d mÃ¥nader",
            y: "ett Ã¥r",
            yy: "%d Ã¥r"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "e" : 1 === t ? "a" : 2 === t ? "a" : "e")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("sw", {
        months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
        weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
        weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[leo saa] LT",
            nextDay: "[kesho saa] LT",
            nextWeek: "[wiki ijayo] dddd [saat] LT",
            lastDay: "[jana] LT",
            lastWeek: "[wiki iliyopita] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s baadaye",
            past: "tokea %s",
            s: "hivi punde",
            ss: "sekunde %d",
            m: "dakika moja",
            mm: "dakika %d",
            h: "saa limoja",
            hh: "masaa %d",
            d: "siku moja",
            dd: "masiku %d",
            M: "mwezi mmoja",
            MM: "miezi %d",
            y: "mwaka mmoja",
            yy: "miaka %d"
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Ua = {
            1: "à¯§",
            2: "à¯¨",
            3: "à¯©",
            4: "à¯ª",
            5: "à¯«",
            6: "à¯¬",
            7: "à¯­",
            8: "à¯®",
            9: "à¯¯",
            0: "à¯¦"
        },
        qa = {
            "à¯§": "1",
            "à¯¨": "2",
            "à¯©": "3",
            "à¯ª": "4",
            "à¯«": "5",
            "à¯¬": "6",
            "à¯­": "7",
            "à¯®": "8",
            "à¯¯": "9",
            "à¯¦": "0"
        };
    i.defineLocale("ta", {
        months: "à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯".split("_"),
        monthsShort: "à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯".split("_"),
        weekdays: "à®žà®¾à®¯à®¿à®±à¯à®±à¯à®•à¯à®•à®¿à®´à®®à¯ˆ_à®¤à®¿à®™à¯à®•à®Ÿà¯à®•à®¿à®´à®®à¯ˆ_à®šà¯†à®µà¯à®µà®¾à®¯à¯à®•à®¿à®´à®®à¯ˆ_à®ªà¯à®¤à®©à¯à®•à®¿à®´à®®à¯ˆ_à®µà®¿à®¯à®¾à®´à®•à¯à®•à®¿à®´à®®à¯ˆ_à®µà¯†à®³à¯à®³à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ_à®šà®©à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ".split("_"),
        weekdaysShort: "à®žà®¾à®¯à®¿à®±à¯_à®¤à®¿à®™à¯à®•à®³à¯_à®šà¯†à®µà¯à®µà®¾à®¯à¯_à®ªà¯à®¤à®©à¯_à®µà®¿à®¯à®¾à®´à®©à¯_à®µà¯†à®³à¯à®³à®¿_à®šà®©à®¿".split("_"),
        weekdaysMin: "à®žà®¾_à®¤à®¿_à®šà¯†_à®ªà¯_à®µà®¿_à®µà¯†_à®š".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, HH:mm",
            LLLL: "dddd, D MMMM YYYY, HH:mm"
        },
        calendar: {
            sameDay: "[à®‡à®©à¯à®±à¯] LT",
            nextDay: "[à®¨à®¾à®³à¯ˆ] LT",
            nextWeek: "dddd, LT",
            lastDay: "[à®¨à¯‡à®±à¯à®±à¯] LT",
            lastWeek: "[à®•à®Ÿà®¨à¯à®¤ à®µà®¾à®°à®®à¯] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à®‡à®²à¯",
            past: "%s à®®à¯à®©à¯",
            s: "à®’à®°à¯ à®šà®¿à®² à®µà®¿à®¨à®¾à®Ÿà®¿à®•à®³à¯",
            ss: "%d à®µà®¿à®¨à®¾à®Ÿà®¿à®•à®³à¯",
            m: "à®’à®°à¯ à®¨à®¿à®®à®¿à®Ÿà®®à¯",
            mm: "%d à®¨à®¿à®®à®¿à®Ÿà®™à¯à®•à®³à¯",
            h: "à®’à®°à¯ à®®à®£à®¿ à®¨à¯‡à®°à®®à¯",
            hh: "%d à®®à®£à®¿ à®¨à¯‡à®°à®®à¯",
            d: "à®’à®°à¯ à®¨à®¾à®³à¯",
            dd: "%d à®¨à®¾à®Ÿà¯à®•à®³à¯",
            M: "à®’à®°à¯ à®®à®¾à®¤à®®à¯",
            MM: "%d à®®à®¾à®¤à®™à¯à®•à®³à¯",
            y: "à®’à®°à¯ à®µà®°à¯à®Ÿà®®à¯",
            yy: "%d à®†à®£à¯à®Ÿà¯à®•à®³à¯"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\u0bb5\u0ba4\u0bc1/,
        ordinal: function(e) {
            return e + "à®µà®¤à¯"
        },
        preparse: function(e) {
            return e.replace(/[\u0be7\u0be8\u0be9\u0bea\u0beb\u0bec\u0bed\u0bee\u0bef\u0be6]/g, function(e) {
                return qa[e]
            })
        },
        postformat: function(e) {
            return e.replace(/\d/g, function(e) {
                return Ua[e]
            })
        },
        meridiemParse: /\u0baf\u0bbe\u0bae\u0bae\u0bcd|\u0bb5\u0bc8\u0b95\u0bb1\u0bc8|\u0b95\u0bbe\u0bb2\u0bc8|\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd|\u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1|\u0bae\u0bbe\u0bb2\u0bc8/,
        meridiem: function(e, t, i) {
            return e < 2 ? " à®¯à®¾à®®à®®à¯" : e < 6 ? " à®µà¯ˆà®•à®±à¯ˆ" : e < 10 ? " à®•à®¾à®²à¯ˆ" : e < 14 ? " à®¨à®£à¯à®ªà®•à®²à¯" : e < 18 ? " à®Žà®±à¯à®ªà®¾à®Ÿà¯" : e < 22 ? " à®®à®¾à®²à¯ˆ" : " à®¯à®¾à®®à®®à¯"
        },
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à®¯à®¾à®®à®®à¯" === t ? e < 2 ? e : e + 12 : "à®µà¯ˆà®•à®±à¯ˆ" === t || "à®•à®¾à®²à¯ˆ" === t ? e : "à®¨à®£à¯à®ªà®•à®²à¯" === t && 10 <= e ? e : e + 12
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("te", {
        months: "à°œà°¨à°µà°°à°¿_à°«à°¿à°¬à±à°°à°µà°°à°¿_à°®à°¾à°°à±à°šà°¿_à°à°ªà±à°°à°¿à°²à±_à°®à±‡_à°œà±‚à°¨à±_à°œà±‚à°²à±†à±–_à°†à°—à°¸à±à°Ÿà±_à°¸à±†à°ªà±à°Ÿà±†à°‚à°¬à°°à±_à°…à°•à±à°Ÿà±‹à°¬à°°à±_à°¨à°µà°‚à°¬à°°à±_à°¡à°¿à°¸à±†à°‚à°¬à°°à±".split("_"),
        monthsShort: "à°œà°¨._à°«à°¿à°¬à±à°°._à°®à°¾à°°à±à°šà°¿_à°à°ªà±à°°à°¿._à°®à±‡_à°œà±‚à°¨à±_à°œà±‚à°²à±†à±–_à°†à°—._à°¸à±†à°ªà±._à°…à°•à±à°Ÿà±‹._à°¨à°µ._à°¡à°¿à°¸à±†.".split("_"),
        monthsParseExact: !0,
        weekdays: "à°†à°¦à°¿à°µà°¾à°°à°‚_à°¸à±‹à°®à°µà°¾à°°à°‚_à°®à°‚à°—à°³à°µà°¾à°°à°‚_à°¬à±à°§à°µà°¾à°°à°‚_à°—à±à°°à±à°µà°¾à°°à°‚_à°¶à±à°•à±à°°à°µà°¾à°°à°‚_à°¶à°¨à°¿à°µà°¾à°°à°‚".split("_"),
        weekdaysShort: "à°†à°¦à°¿_à°¸à±‹à°®_à°®à°‚à°—à°³_à°¬à±à°§_à°—à±à°°à±_à°¶à±à°•à±à°°_à°¶à°¨à°¿".split("_"),
        weekdaysMin: "à°†_à°¸à±‹_à°®à°‚_à°¬à±_à°—à±_à°¶à±_à°¶".split("_"),
        longDateFormat: {
            LT: "A h:mm",
            LTS: "A h:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm",
            LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        calendar: {
            sameDay: "[à°¨à±‡à°¡à±] LT",
            nextDay: "[à°°à±‡à°ªà±] LT",
            nextWeek: "dddd, LT",
            lastDay: "[à°¨à°¿à°¨à±à°¨] LT",
            lastWeek: "[à°—à°¤] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s à°²à±‹",
            past: "%s à°•à±à°°à°¿à°¤à°‚",
            s: "à°•à±Šà°¨à±à°¨à°¿ à°•à±à°·à°£à°¾à°²à±",
            ss: "%d à°¸à±†à°•à°¨à±à°²à±",
            m: "à°’à°• à°¨à°¿à°®à°¿à°·à°‚",
            mm: "%d à°¨à°¿à°®à°¿à°·à°¾à°²à±",
            h: "à°’à°• à°—à°‚à°Ÿ",
            hh: "%d à°—à°‚à°Ÿà°²à±",
            d: "à°’à°• à°°à±‹à°œà±",
            dd: "%d à°°à±‹à°œà±à°²à±",
            M: "à°’à°• à°¨à±†à°²",
            MM: "%d à°¨à±†à°²à°²à±",
            y: "à°’à°• à°¸à°‚à°µà°¤à±à°¸à°°à°‚",
            yy: "%d à°¸à°‚à°µà°¤à±à°¸à°°à°¾à°²à±"
        },
        dayOfMonthOrdinalParse: /\d{1,2}\u0c35/,
        ordinal: "%dà°µ",
        meridiemParse: /\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f|\u0c09\u0c26\u0c2f\u0c02|\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02|\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "à°°à°¾à°¤à±à°°à°¿" === t ? e < 4 ? e : e + 12 : "à°‰à°¦à°¯à°‚" === t ? e : "à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚" === t ? 10 <= e ? e : e + 12 : "à°¸à°¾à°¯à°‚à°¤à±à°°à°‚" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "à°°à°¾à°¤à±à°°à°¿" : e < 10 ? "à°‰à°¦à°¯à°‚" : e < 17 ? "à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚" : e < 20 ? "à°¸à°¾à°¯à°‚à°¤à±à°°à°‚" : "à°°à°¾à°¤à±à°°à°¿"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), i.defineLocale("tet", {
        months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_JuÃ±u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"),
        weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),
        weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ohin iha] LT",
            nextDay: "[Aban iha] LT",
            nextWeek: "dddd [iha] LT",
            lastDay: "[Horiseik iha] LT",
            lastWeek: "dddd [semana kotuk] [iha] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "iha %s",
            past: "%s liuba",
            s: "minutu balun",
            ss: "minutu %d",
            m: "minutu ida",
            mm: "minutu %d",
            h: "oras ida",
            hh: "oras %d",
            d: "loron ida",
            dd: "loron %d",
            M: "fulan ida",
            MM: "fulan %d",
            y: "tinan ida",
            yy: "tinan %d"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Ga = {
        0: "-ÑƒÐ¼",
        1: "-ÑƒÐ¼",
        2: "-ÑŽÐ¼",
        3: "-ÑŽÐ¼",
        4: "-ÑƒÐ¼",
        5: "-ÑƒÐ¼",
        6: "-ÑƒÐ¼",
        7: "-ÑƒÐ¼",
        8: "-ÑƒÐ¼",
        9: "-ÑƒÐ¼",
        10: "-ÑƒÐ¼",
        12: "-ÑƒÐ¼",
        13: "-ÑƒÐ¼",
        20: "-ÑƒÐ¼",
        30: "-ÑŽÐ¼",
        40: "-ÑƒÐ¼",
        50: "-ÑƒÐ¼",
        60: "-ÑƒÐ¼",
        70: "-ÑƒÐ¼",
        80: "-ÑƒÐ¼",
        90: "-ÑƒÐ¼",
        100: "-ÑƒÐ¼"
    };
    i.defineLocale("tg", {
        months: "ÑÐ½Ð²Ð°Ñ€_Ñ„ÐµÐ²Ñ€Ð°Ð»_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€_Ð¾ÐºÑ‚ÑÐ±Ñ€_Ð½Ð¾ÑÐ±Ñ€_Ð´ÐµÐºÐ°Ð±Ñ€".split("_"),
        monthsShort: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_"),
        weekdays: "ÑÐºÑˆÐ°Ð½Ð±Ðµ_Ð´ÑƒÑˆÐ°Ð½Ð±Ðµ_ÑÐµÑˆÐ°Ð½Ð±Ðµ_Ñ‡Ð¾Ñ€ÑˆÐ°Ð½Ð±Ðµ_Ð¿Ð°Ð½Ò·ÑˆÐ°Ð½Ð±Ðµ_Ò·ÑƒÐ¼ÑŠÐ°_ÑˆÐ°Ð½Ð±Ðµ".split("_"),
        weekdaysShort: "ÑÑˆÐ±_Ð´ÑˆÐ±_ÑÑˆÐ±_Ñ‡ÑˆÐ±_Ð¿ÑˆÐ±_Ò·ÑƒÐ¼_ÑˆÐ½Ð±".split("_"),
        weekdaysMin: "ÑÑˆ_Ð´Ñˆ_ÑÑˆ_Ñ‡Ñˆ_Ð¿Ñˆ_Ò·Ð¼_ÑˆÐ±".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ð˜Ð¼Ñ€Ó¯Ð· ÑÐ¾Ð°Ñ‚Ð¸] LT",
            nextDay: "[ÐŸÐ°Ð³Ð¾Ò³ ÑÐ¾Ð°Ñ‚Ð¸] LT",
            lastDay: "[Ð”Ð¸Ñ€Ó¯Ð· ÑÐ¾Ð°Ñ‚Ð¸] LT",
            nextWeek: "dddd[Ð¸] [Ò³Ð°Ñ„Ñ‚Ð°Ð¸ Ð¾ÑÐ½Ð´Ð° ÑÐ¾Ð°Ñ‚Ð¸] LT",
            lastWeek: "dddd[Ð¸] [Ò³Ð°Ñ„Ñ‚Ð°Ð¸ Ð³ÑƒÐ·Ð°ÑˆÑ‚Ð° ÑÐ¾Ð°Ñ‚Ð¸] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "Ð±Ð°ÑŠÐ´Ð¸ %s",
            past: "%s Ð¿ÐµÑˆ",
            s: "ÑÐºÑ‡Ð°Ð½Ð´ ÑÐ¾Ð½Ð¸Ñ",
            m: "ÑÐº Ð´Ð°Ò›Ð¸Ò›Ð°",
            mm: "%d Ð´Ð°Ò›Ð¸Ò›Ð°",
            h: "ÑÐº ÑÐ¾Ð°Ñ‚",
            hh: "%d ÑÐ¾Ð°Ñ‚",
            d: "ÑÐº Ñ€Ó¯Ð·",
            dd: "%d Ñ€Ó¯Ð·",
            M: "ÑÐº Ð¼Ð¾Ò³",
            MM: "%d Ð¼Ð¾Ò³",
            y: "ÑÐº ÑÐ¾Ð»",
            yy: "%d ÑÐ¾Ð»"
        },
        meridiemParse: /\u0448\u0430\u0431|\u0441\u0443\u0431\u04b3|\u0440\u04ef\u0437|\u0431\u0435\u0433\u043e\u04b3/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "ÑˆÐ°Ð±" === t ? e < 4 ? e : e + 12 : "ÑÑƒÐ±Ò³" === t ? e : "Ñ€Ó¯Ð·" === t ? 11 <= e ? e : e + 12 : "Ð±ÐµÐ³Ð¾Ò³" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "ÑˆÐ°Ð±" : e < 11 ? "ÑÑƒÐ±Ò³" : e < 16 ? "Ñ€Ó¯Ð·" : e < 19 ? "Ð±ÐµÐ³Ð¾Ò³" : "ÑˆÐ°Ð±"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0443\u043c|\u044e\u043c)/,
        ordinal: function(e) {
            return e + (Ga[e] || Ga[e % 10] || Ga[100 <= e ? 100 : null])
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("th", {
        months: "à¸¡à¸à¸£à¸²à¸„à¸¡_à¸à¸¸à¸¡à¸ à¸²à¸žà¸±à¸™à¸˜à¹Œ_à¸¡à¸µà¸™à¸²à¸„à¸¡_à¹€à¸¡à¸©à¸²à¸¢à¸™_à¸žà¸¤à¸©à¸ à¸²à¸„à¸¡_à¸¡à¸´à¸–à¸¸à¸™à¸²à¸¢à¸™_à¸à¸£à¸à¸Žà¸²à¸„à¸¡_à¸ªà¸´à¸‡à¸«à¸²à¸„à¸¡_à¸à¸±à¸™à¸¢à¸²à¸¢à¸™_à¸•à¸¸à¸¥à¸²à¸„à¸¡_à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²à¸¢à¸™_à¸˜à¸±à¸™à¸§à¸²à¸„à¸¡".split("_"),
        monthsShort: "à¸¡.à¸„._à¸.à¸ž._à¸¡à¸µ.à¸„._à¹€à¸¡.à¸¢._à¸ž.à¸„._à¸¡à¸´.à¸¢._à¸.à¸„._à¸ª.à¸„._à¸.à¸¢._à¸•.à¸„._à¸ž.à¸¢._à¸˜.à¸„.".split("_"),
        monthsParseExact: !0,
        weekdays: "à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ªà¸šà¸”à¸µ_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ".split("_"),
        weekdaysShort: "à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ª_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ".split("_"),
        weekdaysMin: "à¸­à¸²._à¸ˆ._à¸­._à¸ž._à¸žà¸¤._à¸¨._à¸ª.".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY à¹€à¸§à¸¥à¸² H:mm",
            LLLL: "à¸§à¸±à¸™ddddà¸—à¸µà¹ˆ D MMMM YYYY à¹€à¸§à¸¥à¸² H:mm"
        },
        meridiemParse: /\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07|\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07/,
        isPM: function(e) {
            return "à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "à¸à¹ˆà¸­à¸™à¹€à¸—à¸µà¹ˆà¸¢à¸‡" : "à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡"
        },
        calendar: {
            sameDay: "[à¸§à¸±à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT",
            nextDay: "[à¸žà¸£à¸¸à¹ˆà¸‡à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT",
            nextWeek: "dddd[à¸«à¸™à¹‰à¸² à¹€à¸§à¸¥à¸²] LT",
            lastDay: "[à¹€à¸¡à¸·à¹ˆà¸­à¸§à¸²à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT",
            lastWeek: "[à¸§à¸±à¸™]dddd[à¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§ à¹€à¸§à¸¥à¸²] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "à¸­à¸µà¸ %s",
            past: "%sà¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§",
            s: "à¹„à¸¡à¹ˆà¸à¸µà¹ˆà¸§à¸´à¸™à¸²à¸—à¸µ",
            ss: "%d à¸§à¸´à¸™à¸²à¸—à¸µ",
            m: "1 à¸™à¸²à¸—à¸µ",
            mm: "%d à¸™à¸²à¸—à¸µ",
            h: "1 à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡",
            hh: "%d à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡",
            d: "1 à¸§à¸±à¸™",
            dd: "%d à¸§à¸±à¸™",
            M: "1 à¹€à¸”à¸·à¸­à¸™",
            MM: "%d à¹€à¸”à¸·à¸­à¸™",
            y: "1 à¸›à¸µ",
            yy: "%d à¸›à¸µ"
        }
    }), i.defineLocale("tl-ph", {
        months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
        monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
        weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
        weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
        weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "MM/D/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY HH:mm",
            LLLL: "dddd, MMMM DD, YYYY HH:mm"
        },
        calendar: {
            sameDay: "LT [ngayong araw]",
            nextDay: "[Bukas ng] LT",
            nextWeek: "LT [sa susunod na] dddd",
            lastDay: "LT [kahapon]",
            lastWeek: "LT [noong nakaraang] dddd",
            sameElse: "L"
        },
        relativeTime: {
            future: "sa loob ng %s",
            past: "%s ang nakalipas",
            s: "ilang segundo",
            ss: "%d segundo",
            m: "isang minuto",
            mm: "%d minuto",
            h: "isang oras",
            hh: "%d oras",
            d: "isang araw",
            dd: "%d araw",
            M: "isang buwan",
            MM: "%d buwan",
            y: "isang taon",
            yy: "%d taon"
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function(e) {
            return e
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Ja = "pagh_waâ€™_chaâ€™_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");

    function Va(e, t, i, n) {
        var a = function(e) {
            var t = Math.floor(e % 1e3 / 100),
                i = Math.floor(e % 100 / 10),
                n = e % 10,
                a = "";
            return 0 < t && (a += Ja[t] + "vatlh"), 0 < i && (a += ("" !== a ? " " : "") + Ja[i] + "maH"), 0 < n && (a += ("" !== a ? " " : "") + Ja[n]), "" === a ? "pagh" : a
        }(e);
        switch (i) {
            case "ss":
                return a + " lup";
            case "mm":
                return a + " tup";
            case "hh":
                return a + " rep";
            case "dd":
                return a + " jaj";
            case "MM":
                return a + " jar";
            case "yy":
                return a + " DIS"
        }
    }
    i.defineLocale("tlh", {
        months: "teraâ€™ jar waâ€™_teraâ€™ jar chaâ€™_teraâ€™ jar wej_teraâ€™ jar loS_teraâ€™ jar vagh_teraâ€™ jar jav_teraâ€™ jar Soch_teraâ€™ jar chorgh_teraâ€™ jar Hut_teraâ€™ jar waâ€™maH_teraâ€™ jar waâ€™maH waâ€™_teraâ€™ jar waâ€™maH chaâ€™".split("_"),
        monthsShort: "jar waâ€™_jar chaâ€™_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar waâ€™maH_jar waâ€™maH waâ€™_jar waâ€™maH chaâ€™".split("_"),
        monthsParseExact: !0,
        weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[DaHjaj] LT",
            nextDay: "[waâ€™leS] LT",
            nextWeek: "LLL",
            lastDay: "[waâ€™Huâ€™] LT",
            lastWeek: "LLL",
            sameElse: "L"
        },
        relativeTime: {
            future: function(e) {
                var t = e;
                return -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "leS" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "waQ" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "nem" : t + " pIq"
            },
            past: function(e) {
                var t = e;
                return -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "Huâ€™" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "wen" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "ben" : t + " ret"
            },
            s: "puS lup",
            ss: Va,
            m: "waâ€™ tup",
            mm: Va,
            h: "waâ€™ rep",
            hh: Va,
            d: "waâ€™ jaj",
            dd: Va,
            M: "waâ€™ jar",
            MM: Va,
            y: "waâ€™ DIS",
            yy: Va
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Xa = {
        1: "'inci",
        5: "'inci",
        8: "'inci",
        70: "'inci",
        80: "'inci",
        2: "'nci",
        7: "'nci",
        20: "'nci",
        50: "'nci",
        3: "'Ã¼ncÃ¼",
        4: "'Ã¼ncÃ¼",
        100: "'Ã¼ncÃ¼",
        6: "'ncÄ±",
        9: "'uncu",
        10: "'uncu",
        30: "'uncu",
        60: "'Ä±ncÄ±",
        90: "'Ä±ncÄ±"
    };

    function Ka(e, t, i, n) {
        var a = {
            s: ["viensas secunds", "'iensas secunds"],
            ss: [e + " secunds", e + " secunds"],
            m: ["'n mÃ­ut", "'iens mÃ­ut"],
            mm: [e + " mÃ­uts", e + " mÃ­uts"],
            h: ["'n Ã¾ora", "'iensa Ã¾ora"],
            hh: [e + " Ã¾oras", e + " Ã¾oras"],
            d: ["'n ziua", "'iensa ziua"],
            dd: [e + " ziuas", e + " ziuas"],
            M: ["'n mes", "'iens mes"],
            MM: [e + " mesen", e + " mesen"],
            y: ["'n ar", "'iens ar"],
            yy: [e + " ars", e + " ars"]
        };
        return n ? a[i][0] : t ? a[i][0] : a[i][1]
    }

    function Za(e, t, i) {
        var n, a;
        return "m" === i ? t ? "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°" : "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ñƒ" : "h" === i ? t ? "Ð³Ð¾Ð´Ð¸Ð½Ð°" : "Ð³Ð¾Ð´Ð¸Ð½Ñƒ" : e + " " + (n = +e, a = {
            ss: t ? "ÑÐµÐºÑƒÐ½Ð´Ð°_ÑÐµÐºÑƒÐ½Ð´Ð¸_ÑÐµÐºÑƒÐ½Ð´" : "ÑÐµÐºÑƒÐ½Ð´Ñƒ_ÑÐµÐºÑƒÐ½Ð´Ð¸_ÑÐµÐºÑƒÐ½Ð´",
            mm: t ? "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°_Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð¸_Ñ…Ð²Ð¸Ð»Ð¸Ð½" : "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ñƒ_Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð¸_Ñ…Ð²Ð¸Ð»Ð¸Ð½",
            hh: t ? "Ð³Ð¾Ð´Ð¸Ð½Ð°_Ð³Ð¾Ð´Ð¸Ð½Ð¸_Ð³Ð¾Ð´Ð¸Ð½" : "Ð³Ð¾Ð´Ð¸Ð½Ñƒ_Ð³Ð¾Ð´Ð¸Ð½Ð¸_Ð³Ð¾Ð´Ð¸Ð½",
            dd: "Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ–_Ð´Ð½Ñ–Ð²",
            MM: "Ð¼Ñ–ÑÑÑ†ÑŒ_Ð¼Ñ–ÑÑÑ†Ñ–_Ð¼Ñ–ÑÑÑ†Ñ–Ð²",
            yy: "Ñ€Ñ–Ðº_Ñ€Ð¾ÐºÐ¸_Ñ€Ð¾ÐºÑ–Ð²"
        }[i].split("_"), n % 10 == 1 && n % 100 != 11 ? a[0] : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 10 || 20 <= n % 100) ? a[1] : a[2])
    }

    function Qa(e) {
        return function() {
            return e + "Ð¾" + (11 === this.hours() ? "Ð±" : "") + "] LT"
        }
    }
    i.defineLocale("tr", {
        months: "Ocak_Åžubat_Mart_Nisan_MayÄ±s_Haziran_Temmuz_AÄŸustos_EylÃ¼l_Ekim_KasÄ±m_AralÄ±k".split("_"),
        monthsShort: "Oca_Åžub_Mar_Nis_May_Haz_Tem_AÄŸu_Eyl_Eki_Kas_Ara".split("_"),
        weekdays: "Pazar_Pazartesi_SalÄ±_Ã‡arÅŸamba_PerÅŸembe_Cuma_Cumartesi".split("_"),
        weekdaysShort: "Paz_Pts_Sal_Ã‡ar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_Ã‡a_Pe_Cu_Ct".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[bugÃ¼n saat] LT",
            nextDay: "[yarÄ±n saat] LT",
            nextWeek: "[gelecek] dddd [saat] LT",
            lastDay: "[dÃ¼n] LT",
            lastWeek: "[geÃ§en] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s Ã¶nce",
            s: "birkaÃ§ saniye",
            ss: "%d saniye",
            m: "bir dakika",
            mm: "%d dakika",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gÃ¼n",
            dd: "%d gÃ¼n",
            M: "bir ay",
            MM: "%d ay",
            y: "bir yÄ±l",
            yy: "%d yÄ±l"
        },
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "Do":
                case "DD":
                    return e;
                default:
                    if (0 === e) return e + "'Ä±ncÄ±";
                    var i = e % 10;
                    return e + (Xa[i] || Xa[e % 100 - i] || Xa[100 <= e ? 100 : null])
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("tzl", {
        months: "Januar_Fevraglh_MarÃ§_AvrÃ¯u_Mai_GÃ¼n_Julia_Guscht_Setemvar_ListopÃ¤ts_Noemvar_Zecemvar".split("_"),
        monthsShort: "Jan_Fev_Mar_Avr_Mai_GÃ¼n_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
        weekdays: "SÃºladi_LÃºneÃ§i_Maitzi_MÃ¡rcuri_XhÃºadi_ViÃ©nerÃ§i_SÃ¡turi".split("_"),
        weekdaysShort: "SÃºl_LÃºn_Mai_MÃ¡r_XhÃº_ViÃ©_SÃ¡t".split("_"),
        weekdaysMin: "SÃº_LÃº_Ma_MÃ¡_Xh_Vi_SÃ¡".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM [dallas] YYYY",
            LLL: "D. MMMM [dallas] YYYY HH.mm",
            LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
        },
        meridiemParse: /d\'o|d\'a/i,
        isPM: function(e) {
            return "d'o" === e.toLowerCase()
        },
        meridiem: function(e, t, i) {
            return 11 < e ? i ? "d'o" : "D'O" : i ? "d'a" : "D'A"
        },
        calendar: {
            sameDay: "[oxhi Ã ] LT",
            nextDay: "[demÃ  Ã ] LT",
            nextWeek: "dddd [Ã ] LT",
            lastDay: "[ieiri Ã ] LT",
            lastWeek: "[sÃ¼r el] dddd [lasteu Ã ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "osprei %s",
            past: "ja%s",
            s: Ka,
            ss: Ka,
            m: Ka,
            mm: Ka,
            h: Ka,
            hh: Ka,
            d: Ka,
            dd: Ka,
            M: Ka,
            MM: Ka,
            y: Ka,
            yy: Ka
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("tzm-latn", {
        months: "innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir".split("_"),
        monthsShort: "innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir".split("_"),
        weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"),
        weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"),
        weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[asdkh g] LT",
            nextDay: "[aska g] LT",
            nextWeek: "dddd [g] LT",
            lastDay: "[assant g] LT",
            lastWeek: "dddd [g] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dadkh s yan %s",
            past: "yan %s",
            s: "imik",
            ss: "%d imik",
            m: "minuá¸",
            mm: "%d minuá¸",
            h: "saÉ›a",
            hh: "%d tassaÉ›in",
            d: "ass",
            dd: "%d ossan",
            M: "ayowr",
            MM: "%d iyyirn",
            y: "asgas",
            yy: "%d isgasn"
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), i.defineLocale("tzm", {
        months: "âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”".split("_"),
        monthsShort: "âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”".split("_"),
        weekdays: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"),
        weekdaysShort: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"),
        weekdaysMin: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[â´°âµ™â´·âµ… â´´] LT",
            nextDay: "[â´°âµ™â´½â´° â´´] LT",
            nextWeek: "dddd [â´´] LT",
            lastDay: "[â´°âµšâ´°âµâµœ â´´] LT",
            lastWeek: "dddd [â´´] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "â´·â´°â´·âµ… âµ™ âµ¢â´°âµ %s",
            past: "âµ¢â´°âµ %s",
            s: "âµ‰âµŽâµ‰â´½",
            ss: "%d âµ‰âµŽâµ‰â´½",
            m: "âµŽâµ‰âµâµ“â´º",
            mm: "%d âµŽâµ‰âµâµ“â´º",
            h: "âµ™â´°âµ„â´°",
            hh: "%d âµœâ´°âµ™âµ™â´°âµ„âµ‰âµ",
            d: "â´°âµ™âµ™",
            dd: "%d oâµ™âµ™â´°âµ",
            M: "â´°âµ¢oâµ“âµ”",
            MM: "%d âµ‰âµ¢âµ¢âµ‰âµ”âµ",
            y: "â´°âµ™â´³â´°âµ™",
            yy: "%d âµ‰âµ™â´³â´°âµ™âµ"
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), i.defineLocale("ug-cn", {
        months: "ÙŠØ§Ù†Û‹Ø§Ø±_ÙÛÛ‹Ø±Ø§Ù„_Ù…Ø§Ø±Øª_Ø¦Ø§Ù¾Ø±ÛÙ„_Ù…Ø§ÙŠ_Ø¦Ù‰ÙŠÛ‡Ù†_Ø¦Ù‰ÙŠÛ‡Ù„_Ø¦Ø§Û‹ØºÛ‡Ø³Øª_Ø³ÛÙ†ØªÛ•Ø¨Ù‰Ø±_Ø¦Û†ÙƒØªÛ•Ø¨Ù‰Ø±_Ù†ÙˆÙŠØ§Ø¨Ù‰Ø±_Ø¯ÛÙƒØ§Ø¨Ù‰Ø±".split("_"),
        monthsShort: "ÙŠØ§Ù†Û‹Ø§Ø±_ÙÛÛ‹Ø±Ø§Ù„_Ù…Ø§Ø±Øª_Ø¦Ø§Ù¾Ø±ÛÙ„_Ù…Ø§ÙŠ_Ø¦Ù‰ÙŠÛ‡Ù†_Ø¦Ù‰ÙŠÛ‡Ù„_Ø¦Ø§Û‹ØºÛ‡Ø³Øª_Ø³ÛÙ†ØªÛ•Ø¨Ù‰Ø±_Ø¦Û†ÙƒØªÛ•Ø¨Ù‰Ø±_Ù†ÙˆÙŠØ§Ø¨Ù‰Ø±_Ø¯ÛÙƒØ§Ø¨Ù‰Ø±".split("_"),
        weekdays: "ÙŠÛ•ÙƒØ´Û•Ù†Ø¨Û•_Ø¯ÛˆØ´Û•Ù†Ø¨Û•_Ø³Û•ÙŠØ´Û•Ù†Ø¨Û•_Ú†Ø§Ø±Ø´Û•Ù†Ø¨Û•_Ù¾Û•ÙŠØ´Û•Ù†Ø¨Û•_Ø¬ÛˆÙ…Û•_Ø´Û•Ù†Ø¨Û•".split("_"),
        weekdaysShort: "ÙŠÛ•_Ø¯Ûˆ_Ø³Û•_Ú†Ø§_Ù¾Û•_Ø¬Ûˆ_Ø´Û•".split("_"),
        weekdaysMin: "ÙŠÛ•_Ø¯Ûˆ_Ø³Û•_Ú†Ø§_Ù¾Û•_Ø¬Ûˆ_Ø´Û•".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY-ÙŠÙ‰Ù„Ù‰M-Ø¦Ø§ÙŠÙ†Ù‰Ú­D-ÙƒÛˆÙ†Ù‰",
            LLL: "YYYY-ÙŠÙ‰Ù„Ù‰M-Ø¦Ø§ÙŠÙ†Ù‰Ú­D-ÙƒÛˆÙ†Ù‰ØŒ HH:mm",
            LLLL: "ddddØŒ YYYY-ÙŠÙ‰Ù„Ù‰M-Ø¦Ø§ÙŠÙ†Ù‰Ú­D-ÙƒÛˆÙ†Ù‰ØŒ HH:mm"
        },
        meridiemParse: /\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5|\u0633\u06d5\u06be\u06d5\u0631|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646|\u0686\u06c8\u0634|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646|\u0643\u06d5\u0686/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "ÙŠÛØ±Ù‰Ù… ÙƒÛÚ†Û•" === t || "Ø³Û•Ú¾Û•Ø±" === t || "Ú†ÛˆØ´ØªÙ‰Ù† Ø¨Û‡Ø±Û‡Ù†" === t ? e : "Ú†ÛˆØ´ØªÙ‰Ù† ÙƒÛÙŠÙ‰Ù†" === t || "ÙƒÛ•Ú†" === t ? e + 12 : 11 <= e ? e : e + 12
        },
        meridiem: function(e, t, i) {
            var n = 100 * e + t;
            return n < 600 ? "ÙŠÛØ±Ù‰Ù… ÙƒÛÚ†Û•" : n < 900 ? "Ø³Û•Ú¾Û•Ø±" : n < 1130 ? "Ú†ÛˆØ´ØªÙ‰Ù† Ø¨Û‡Ø±Û‡Ù†" : n < 1230 ? "Ú†ÛˆØ´" : n < 1800 ? "Ú†ÛˆØ´ØªÙ‰Ù† ÙƒÛÙŠÙ‰Ù†" : "ÙƒÛ•Ú†"
        },
        calendar: {
            sameDay: "[Ø¨ÛˆÚ¯ÛˆÙ† Ø³Ø§Ø¦Û•Øª] LT",
            nextDay: "[Ø¦Û•ØªÛ• Ø³Ø§Ø¦Û•Øª] LT",
            nextWeek: "[ÙƒÛÙ„Û•Ø±ÙƒÙ‰] dddd [Ø³Ø§Ø¦Û•Øª] LT",
            lastDay: "[ØªÛ†Ù†ÛˆÚ¯ÛˆÙ†] LT",
            lastWeek: "[Ø¦Ø§Ù„Ø¯Ù‰Ù†Ù‚Ù‰] dddd [Ø³Ø§Ø¦Û•Øª] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s ÙƒÛÙŠÙ‰Ù†",
            past: "%s Ø¨Û‡Ø±Û‡Ù†",
            s: "Ù†Û•Ú†Ú†Û• Ø³ÛÙƒÙˆÙ†Øª",
            ss: "%d Ø³ÛÙƒÙˆÙ†Øª",
            m: "Ø¨Ù‰Ø± Ù…Ù‰Ù†Û‡Øª",
            mm: "%d Ù…Ù‰Ù†Û‡Øª",
            h: "Ø¨Ù‰Ø± Ø³Ø§Ø¦Û•Øª",
            hh: "%d Ø³Ø§Ø¦Û•Øª",
            d: "Ø¨Ù‰Ø± ÙƒÛˆÙ†",
            dd: "%d ÙƒÛˆÙ†",
            M: "Ø¨Ù‰Ø± Ø¦Ø§ÙŠ",
            MM: "%d Ø¦Ø§ÙŠ",
            y: "Ø¨Ù‰Ø± ÙŠÙ‰Ù„",
            yy: "%d ÙŠÙ‰Ù„"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(-\u0643\u06c8\u0646\u0649|-\u0626\u0627\u064a|-\u06be\u06d5\u067e\u062a\u06d5)/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "-ÙƒÛˆÙ†Ù‰";
                case "w":
                case "W":
                    return e + "-Ú¾Û•Ù¾ØªÛ•";
                default:
                    return e
            }
        },
        preparse: function(e) {
            return e.replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/,/g, "ØŒ")
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("uk", {
        months: {
            format: "ÑÑ–Ñ‡Ð½Ñ_Ð»ÑŽÑ‚Ð¾Ð³Ð¾_Ð±ÐµÑ€ÐµÐ·Ð½Ñ_ÐºÐ²Ñ–Ñ‚Ð½Ñ_Ñ‚Ñ€Ð°Ð²Ð½Ñ_Ñ‡ÐµÑ€Ð²Ð½Ñ_Ð»Ð¸Ð¿Ð½Ñ_ÑÐµÑ€Ð¿Ð½Ñ_Ð²ÐµÑ€ÐµÑÐ½Ñ_Ð¶Ð¾Ð²Ñ‚Ð½Ñ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´Ð°_Ð³Ñ€ÑƒÐ´Ð½Ñ".split("_"),
            standalone: "ÑÑ–Ñ‡ÐµÐ½ÑŒ_Ð»ÑŽÑ‚Ð¸Ð¹_Ð±ÐµÑ€ÐµÐ·ÐµÐ½ÑŒ_ÐºÐ²Ñ–Ñ‚ÐµÐ½ÑŒ_Ñ‚Ñ€Ð°Ð²ÐµÐ½ÑŒ_Ñ‡ÐµÑ€Ð²ÐµÐ½ÑŒ_Ð»Ð¸Ð¿ÐµÐ½ÑŒ_ÑÐµÑ€Ð¿ÐµÐ½ÑŒ_Ð²ÐµÑ€ÐµÑÐµÐ½ÑŒ_Ð¶Ð¾Ð²Ñ‚ÐµÐ½ÑŒ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´_Ð³Ñ€ÑƒÐ´ÐµÐ½ÑŒ".split("_")
        },
        monthsShort: "ÑÑ–Ñ‡_Ð»ÑŽÑ‚_Ð±ÐµÑ€_ÐºÐ²Ñ–Ñ‚_Ñ‚Ñ€Ð°Ð²_Ñ‡ÐµÑ€Ð²_Ð»Ð¸Ð¿_ÑÐµÑ€Ð¿_Ð²ÐµÑ€_Ð¶Ð¾Ð²Ñ‚_Ð»Ð¸ÑÑ‚_Ð³Ñ€ÑƒÐ´".split("_"),
        weekdays: function(e, t) {
            var i = {
                nominative: "Ð½ÐµÐ´Ñ–Ð»Ñ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"),
                accusative: "Ð½ÐµÐ´Ñ–Ð»ÑŽ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ñƒ_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†ÑŽ_ÑÑƒÐ±Ð¾Ñ‚Ñƒ".split("_"),
                genitive: "Ð½ÐµÐ´Ñ–Ð»Ñ–_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»ÐºÐ°_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€ÐºÐ°_ÑÐµÑ€ÐµÐ´Ð¸_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³Ð°_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ–_ÑÑƒÐ±Ð¾Ñ‚Ð¸".split("_")
            };
            return e ? i[/(\[[\u0412\u0432\u0423\u0443]\]) ?dddd/.test(t) ? "accusative" : /\[?(?:\u043c\u0438\u043d\u0443\u043b\u043e\u0457|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0457)? ?\] ?dddd/.test(t) ? "genitive" : "nominative"][e.day()] : i.nominative
        },
        weekdaysShort: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY Ñ€.",
            LLL: "D MMMM YYYY Ñ€., HH:mm",
            LLLL: "dddd, D MMMM YYYY Ñ€., HH:mm"
        },
        calendar: {
            sameDay: Qa("[Ð¡ÑŒÐ¾Ð³Ð¾Ð´Ð½Ñ– "),
            nextDay: Qa("[Ð—Ð°Ð²Ñ‚Ñ€Ð° "),
            lastDay: Qa("[Ð’Ñ‡Ð¾Ñ€Ð° "),
            nextWeek: Qa("[Ð£] dddd ["),
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return Qa("[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ñ—] dddd [").call(this);
                    case 1:
                    case 2:
                    case 4:
                        return Qa("[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ð³Ð¾] dddd [").call(this)
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "Ð·Ð° %s",
            past: "%s Ñ‚Ð¾Ð¼Ñƒ",
            s: "Ð´ÐµÐºÑ–Ð»ÑŒÐºÐ° ÑÐµÐºÑƒÐ½Ð´",
            ss: Za,
            m: Za,
            mm: Za,
            h: "Ð³Ð¾Ð´Ð¸Ð½Ñƒ",
            hh: Za,
            d: "Ð´ÐµÐ½ÑŒ",
            dd: Za,
            M: "Ð¼Ñ–ÑÑÑ†ÑŒ",
            MM: Za,
            y: "Ñ€Ñ–Ðº",
            yy: Za
        },
        meridiemParse: /\u043d\u043e\u0447\u0456|\u0440\u0430\u043d\u043a\u0443|\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430/,
        isPM: function(e) {
            return /^(\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430)$/.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 4 ? "Ð½Ð¾Ñ‡Ñ–" : e < 12 ? "Ñ€Ð°Ð½ÐºÑƒ" : e < 17 ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡Ð¾Ñ€Ð°"
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(\u0439|\u0433\u043e)/,
        ordinal: function(e, t) {
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return e + "-Ð¹";
                case "D":
                    return e + "-Ð³Ð¾";
                default:
                    return e
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var er = ["Ø¬Ù†ÙˆØ±ÛŒ", "ÙØ±ÙˆØ±ÛŒ", "Ù…Ø§Ø±Ú†", "Ø§Ù¾Ø±ÛŒÙ„", "Ù…Ø¦ÛŒ", "Ø¬ÙˆÙ†", "Ø¬ÙˆÙ„Ø§Ø¦ÛŒ", "Ø§Ú¯Ø³Øª", "Ø³ØªÙ…Ø¨Ø±", "Ø§Ú©ØªÙˆØ¨Ø±", "Ù†ÙˆÙ…Ø¨Ø±", "Ø¯Ø³Ù…Ø¨Ø±"],
        tr = ["Ø§ØªÙˆØ§Ø±", "Ù¾ÛŒØ±", "Ù…Ù†Ú¯Ù„", "Ø¨Ø¯Ú¾", "Ø¬Ù…Ø¹Ø±Ø§Øª", "Ø¬Ù…Ø¹Û", "ÛÙØªÛ"];
    return i.defineLocale("ur", {
        months: er,
        monthsShort: er,
        weekdays: tr,
        weekdaysShort: tr,
        weekdaysMin: tr,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "ddddØŒ D MMMM YYYY HH:mm"
        },
        meridiemParse: /\u0635\u0628\u062d|\u0634\u0627\u0645/,
        isPM: function(e) {
            return "Ø´Ø§Ù…" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "ØµØ¨Ø­" : "Ø´Ø§Ù…"
        },
        calendar: {
            sameDay: "[Ø¢Ø¬ Ø¨ÙˆÙ‚Øª] LT",
            nextDay: "[Ú©Ù„ Ø¨ÙˆÙ‚Øª] LT",
            nextWeek: "dddd [Ø¨ÙˆÙ‚Øª] LT",
            lastDay: "[Ú¯Ø°Ø´ØªÛ Ø±ÙˆØ² Ø¨ÙˆÙ‚Øª] LT",
            lastWeek: "[Ú¯Ø°Ø´ØªÛ] dddd [Ø¨ÙˆÙ‚Øª] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s Ø¨Ø¹Ø¯",
            past: "%s Ù‚Ø¨Ù„",
            s: "Ú†Ù†Ø¯ Ø³ÛŒÚ©Ù†Úˆ",
            ss: "%d Ø³ÛŒÚ©Ù†Úˆ",
            m: "Ø§ÛŒÚ© Ù…Ù†Ù¹",
            mm: "%d Ù…Ù†Ù¹",
            h: "Ø§ÛŒÚ© Ú¯Ú¾Ù†Ù¹Û",
            hh: "%d Ú¯Ú¾Ù†Ù¹Û’",
            d: "Ø§ÛŒÚ© Ø¯Ù†",
            dd: "%d Ø¯Ù†",
            M: "Ø§ÛŒÚ© Ù…Ø§Û",
            MM: "%d Ù…Ø§Û",
            y: "Ø§ÛŒÚ© Ø³Ø§Ù„",
            yy: "%d Ø³Ø§Ù„"
        },
        preparse: function(e) {
            return e.replace(/\u060c/g, ",")
        },
        postformat: function(e) {
            return e.replace(/,/g, "ØŒ")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("uz-latn", {
        months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),
        monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
        weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),
        weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
        weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "D MMMM YYYY, dddd HH:mm"
        },
        calendar: {
            sameDay: "[Bugun soat] LT [da]",
            nextDay: "[Ertaga] LT [da]",
            nextWeek: "dddd [kuni soat] LT [da]",
            lastDay: "[Kecha soat] LT [da]",
            lastWeek: "[O'tgan] dddd [kuni soat] LT [da]",
            sameElse: "L"
        },
        relativeTime: {
            future: "Yaqin %s ichida",
            past: "Bir necha %s oldin",
            s: "soniya",
            ss: "%d soniya",
            m: "bir daqiqa",
            mm: "%d daqiqa",
            h: "bir soat",
            hh: "%d soat",
            d: "bir kun",
            dd: "%d kun",
            M: "bir oy",
            MM: "%d oy",
            y: "bir yil",
            yy: "%d yil"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("uz", {
        months: "ÑÐ½Ð²Ð°Ñ€_Ñ„ÐµÐ²Ñ€Ð°Ð»_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€_Ð¾ÐºÑ‚ÑÐ±Ñ€_Ð½Ð¾ÑÐ±Ñ€_Ð´ÐµÐºÐ°Ð±Ñ€".split("_"),
        monthsShort: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_"),
        weekdays: "Ð¯ÐºÑˆÐ°Ð½Ð±Ð°_Ð”ÑƒÑˆÐ°Ð½Ð±Ð°_Ð¡ÐµÑˆÐ°Ð½Ð±Ð°_Ð§Ð¾Ñ€ÑˆÐ°Ð½Ð±Ð°_ÐŸÐ°Ð¹ÑˆÐ°Ð½Ð±Ð°_Ð–ÑƒÐ¼Ð°_Ð¨Ð°Ð½Ð±Ð°".split("_"),
        weekdaysShort: "Ð¯ÐºÑˆ_Ð”ÑƒÑˆ_Ð¡ÐµÑˆ_Ð§Ð¾Ñ€_ÐŸÐ°Ð¹_Ð–ÑƒÐ¼_Ð¨Ð°Ð½".split("_"),
        weekdaysMin: "Ð¯Ðº_Ð”Ñƒ_Ð¡Ðµ_Ð§Ð¾_ÐŸÐ°_Ð–Ñƒ_Ð¨Ð°".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "D MMMM YYYY, dddd HH:mm"
        },
        calendar: {
            sameDay: "[Ð‘ÑƒÐ³ÑƒÐ½ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
            nextDay: "[Ð­Ñ€Ñ‚Ð°Ð³Ð°] LT [Ð´Ð°]",
            nextWeek: "dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
            lastDay: "[ÐšÐµÑ‡Ð° ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
            lastWeek: "[Ð£Ñ‚Ð³Ð°Ð½] dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]",
            sameElse: "L"
        },
        relativeTime: {
            future: "Ð¯ÐºÐ¸Ð½ %s Ð¸Ñ‡Ð¸Ð´Ð°",
            past: "Ð‘Ð¸Ñ€ Ð½ÐµÑ‡Ð° %s Ð¾Ð»Ð´Ð¸Ð½",
            s: "Ñ„ÑƒÑ€ÑÐ°Ñ‚",
            ss: "%d Ñ„ÑƒÑ€ÑÐ°Ñ‚",
            m: "Ð±Ð¸Ñ€ Ð´Ð°ÐºÐ¸ÐºÐ°",
            mm: "%d Ð´Ð°ÐºÐ¸ÐºÐ°",
            h: "Ð±Ð¸Ñ€ ÑÐ¾Ð°Ñ‚",
            hh: "%d ÑÐ¾Ð°Ñ‚",
            d: "Ð±Ð¸Ñ€ ÐºÑƒÐ½",
            dd: "%d ÐºÑƒÐ½",
            M: "Ð±Ð¸Ñ€ Ð¾Ð¹",
            MM: "%d Ð¾Ð¹",
            y: "Ð±Ð¸Ñ€ Ð¹Ð¸Ð»",
            yy: "%d Ð¹Ð¸Ð»"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), i.defineLocale("vi", {
        months: "thÃ¡ng 1_thÃ¡ng 2_thÃ¡ng 3_thÃ¡ng 4_thÃ¡ng 5_thÃ¡ng 6_thÃ¡ng 7_thÃ¡ng 8_thÃ¡ng 9_thÃ¡ng 10_thÃ¡ng 11_thÃ¡ng 12".split("_"),
        monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
        monthsParseExact: !0,
        weekdays: "chá»§ nháº­t_thá»© hai_thá»© ba_thá»© tÆ°_thá»© nÄƒm_thá»© sÃ¡u_thá»© báº£y".split("_"),
        weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysParseExact: !0,
        meridiemParse: /sa|ch/i,
        isPM: function(e) {
            return /^ch$/i.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 12 ? i ? "sa" : "SA" : i ? "ch" : "CH"
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM [nÄƒm] YYYY",
            LLL: "D MMMM [nÄƒm] YYYY HH:mm",
            LLLL: "dddd, D MMMM [nÄƒm] YYYY HH:mm",
            l: "DD/M/YYYY",
            ll: "D MMM YYYY",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd, D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[HÃ´m nay lÃºc] LT",
            nextDay: "[NgÃ y mai lÃºc] LT",
            nextWeek: "dddd [tuáº§n tá»›i lÃºc] LT",
            lastDay: "[HÃ´m qua lÃºc] LT",
            lastWeek: "dddd [tuáº§n rá»“i lÃºc] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s tá»›i",
            past: "%s trÆ°á»›c",
            s: "vÃ i giÃ¢y",
            ss: "%d giÃ¢y",
            m: "má»™t phÃºt",
            mm: "%d phÃºt",
            h: "má»™t giá»",
            hh: "%d giá»",
            d: "má»™t ngÃ y",
            dd: "%d ngÃ y",
            M: "má»™t thÃ¡ng",
            MM: "%d thÃ¡ng",
            y: "má»™t nÄƒm",
            yy: "%d nÄƒm"
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function(e) {
            return e
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("x-pseudo", {
        months: "J~Ã¡Ã±ÃºÃ¡~rÃ½_F~Ã©brÃº~Ã¡rÃ½_~MÃ¡rc~h_Ãp~rÃ­l_~MÃ¡Ã½_~JÃºÃ±Ã©~_JÃºl~Ã½_ÃÃº~gÃºst~_SÃ©p~tÃ©mb~Ã©r_Ã“~ctÃ³b~Ã©r_Ã‘~Ã³vÃ©m~bÃ©r_~DÃ©cÃ©~mbÃ©r".split("_"),
        monthsShort: "J~Ã¡Ã±_~FÃ©b_~MÃ¡r_~Ãpr_~MÃ¡Ã½_~JÃºÃ±_~JÃºl_~ÃÃºg_~SÃ©p_~Ã“ct_~Ã‘Ã³v_~DÃ©c".split("_"),
        monthsParseExact: !0,
        weekdays: "S~ÃºÃ±dÃ¡~Ã½_MÃ³~Ã±dÃ¡Ã½~_TÃºÃ©~sdÃ¡Ã½~_WÃ©d~Ã±Ã©sd~Ã¡Ã½_T~hÃºrs~dÃ¡Ã½_~FrÃ­d~Ã¡Ã½_S~Ã¡tÃºr~dÃ¡Ã½".split("_"),
        weekdaysShort: "S~ÃºÃ±_~MÃ³Ã±_~TÃºÃ©_~WÃ©d_~ThÃº_~FrÃ­_~SÃ¡t".split("_"),
        weekdaysMin: "S~Ãº_MÃ³~_TÃº_~WÃ©_T~h_Fr~_SÃ¡".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[T~Ã³dÃ¡~Ã½ Ã¡t] LT",
            nextDay: "[T~Ã³mÃ³~rrÃ³~w Ã¡t] LT",
            nextWeek: "dddd [Ã¡t] LT",
            lastDay: "[Ã~Ã©st~Ã©rdÃ¡~Ã½ Ã¡t] LT",
            lastWeek: "[L~Ã¡st] dddd [Ã¡t] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "Ã­~Ã± %s",
            past: "%s Ã¡~gÃ³",
            s: "Ã¡ ~fÃ©w ~sÃ©cÃ³~Ã±ds",
            ss: "%d s~Ã©cÃ³Ã±~ds",
            m: "Ã¡ ~mÃ­Ã±~ÃºtÃ©",
            mm: "%d m~Ã­Ã±Ãº~tÃ©s",
            h: "Ã¡~Ã± hÃ³~Ãºr",
            hh: "%d h~Ã³Ãºrs",
            d: "Ã¡ ~dÃ¡Ã½",
            dd: "%d d~Ã¡Ã½s",
            M: "Ã¡ ~mÃ³Ã±~th",
            MM: "%d m~Ã³Ã±t~hs",
            y: "Ã¡ ~Ã½Ã©Ã¡r",
            yy: "%d Ã½~Ã©Ã¡rs"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("yo", {
        months: "Sáº¹Ìráº¹Ì_EÌ€reÌ€leÌ€_áº¸ráº¹Ì€naÌ€_IÌ€gbeÌ_EÌ€bibi_OÌ€kuÌ€du_Agáº¹mo_OÌ€guÌn_Owewe_á»ŒÌ€waÌ€raÌ€_BeÌluÌ_á»ŒÌ€páº¹Ì€Ì€".split("_"),
        monthsShort: "Sáº¹Ìr_EÌ€rl_áº¸rn_IÌ€gb_EÌ€bi_OÌ€kuÌ€_Agáº¹_OÌ€guÌ_Owe_á»ŒÌ€waÌ€_BeÌl_á»ŒÌ€páº¹Ì€Ì€".split("_"),
        weekdays: "AÌ€iÌ€kuÌ_AjeÌ_IÌ€sáº¹Ìgun_á»Œjá»ÌruÌ_á»Œjá»Ìbá»_áº¸tiÌ€_AÌ€baÌmáº¹Ìta".split("_"),
        weekdaysShort: "AÌ€iÌ€k_AjeÌ_IÌ€sáº¹Ì_á»Œjr_á»Œjb_áº¸tiÌ€_AÌ€baÌ".split("_"),
        weekdaysMin: "AÌ€iÌ€_Aj_IÌ€s_á»Œr_á»Œb_áº¸t_AÌ€b".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[OÌ€niÌ€ ni] LT",
            nextDay: "[á»ŒÌ€la ni] LT",
            nextWeek: "dddd [á»Œsáº¹Ì€ toÌn'bá»] [ni] LT",
            lastDay: "[AÌ€na ni] LT",
            lastWeek: "dddd [á»Œsáº¹Ì€ toÌlá»Ì] [ni] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "niÌ %s",
            past: "%s ká»jaÌ",
            s: "iÌ€sáº¹juÌ aayaÌ die",
            ss: "aayaÌ %d",
            m: "iÌ€sáº¹juÌ kan",
            mm: "iÌ€sáº¹juÌ %d",
            h: "waÌkati kan",
            hh: "waÌkati %d",
            d: "á»já»Ì kan",
            dd: "á»já»Ì %d",
            M: "osuÌ€ kan",
            MM: "osuÌ€ %d",
            y: "á»duÌn kan",
            yy: "á»duÌn %d"
        },
        dayOfMonthOrdinalParse: /\u1ecdj\u1ecd\u0301\s\d{1,2}/,
        ordinal: "á»já»Ì %d",
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("zh-cn", {
        months: "ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ".split("_"),
        monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
        weekdays: "æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­".split("_"),
        weekdaysShort: "å‘¨æ—¥_å‘¨ä¸€_å‘¨äºŒ_å‘¨ä¸‰_å‘¨å››_å‘¨äº”_å‘¨å…­".split("_"),
        weekdaysMin: "æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYYå¹´MæœˆDæ—¥",
            LLL: "YYYYå¹´MæœˆDæ—¥Ahç‚¹mmåˆ†",
            LLLL: "YYYYå¹´MæœˆDæ—¥ddddAhç‚¹mmåˆ†",
            l: "YYYY/M/D",
            ll: "YYYYå¹´MæœˆDæ—¥",
            lll: "YYYYå¹´MæœˆDæ—¥ HH:mm",
            llll: "YYYYå¹´MæœˆDæ—¥dddd HH:mm"
        },
        meridiemParse: /\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "å‡Œæ™¨" === t || "æ—©ä¸Š" === t || "ä¸Šåˆ" === t ? e : "ä¸‹åˆ" === t || "æ™šä¸Š" === t ? e + 12 : 11 <= e ? e : e + 12
        },
        meridiem: function(e, t, i) {
            var n = 100 * e + t;
            return n < 600 ? "å‡Œæ™¨" : n < 900 ? "æ—©ä¸Š" : n < 1130 ? "ä¸Šåˆ" : n < 1230 ? "ä¸­åˆ" : n < 1800 ? "ä¸‹åˆ" : "æ™šä¸Š"
        },
        calendar: {
            sameDay: "[ä»Šå¤©]LT",
            nextDay: "[æ˜Žå¤©]LT",
            nextWeek: "[ä¸‹]ddddLT",
            lastDay: "[æ˜¨å¤©]LT",
            lastWeek: "[ä¸Š]ddddLT",
            sameElse: "L"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(\u65e5|\u6708|\u5468)/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "æ—¥";
                case "M":
                    return e + "æœˆ";
                case "w":
                case "W":
                    return e + "å‘¨";
                default:
                    return e
            }
        },
        relativeTime: {
            future: "%så†…",
            past: "%så‰",
            s: "å‡ ç§’",
            ss: "%d ç§’",
            m: "1 åˆ†é’Ÿ",
            mm: "%d åˆ†é’Ÿ",
            h: "1 å°æ—¶",
            hh: "%d å°æ—¶",
            d: "1 å¤©",
            dd: "%d å¤©",
            M: "1 ä¸ªæœˆ",
            MM: "%d ä¸ªæœˆ",
            y: "1 å¹´",
            yy: "%d å¹´"
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), i.defineLocale("zh-hk", {
        months: "ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ".split("_"),
        monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
        weekdays: "æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­".split("_"),
        weekdaysShort: "é€±æ—¥_é€±ä¸€_é€±äºŒ_é€±ä¸‰_é€±å››_é€±äº”_é€±å…­".split("_"),
        weekdaysMin: "æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYYå¹´MæœˆDæ—¥",
            LLL: "YYYYå¹´MæœˆDæ—¥ HH:mm",
            LLLL: "YYYYå¹´MæœˆDæ—¥dddd HH:mm",
            l: "YYYY/M/D",
            ll: "YYYYå¹´MæœˆDæ—¥",
            lll: "YYYYå¹´MæœˆDæ—¥ HH:mm",
            llll: "YYYYå¹´MæœˆDæ—¥dddd HH:mm"
        },
        meridiemParse: /\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "å‡Œæ™¨" === t || "æ—©ä¸Š" === t || "ä¸Šåˆ" === t ? e : "ä¸­åˆ" === t ? 11 <= e ? e : e + 12 : "ä¸‹åˆ" === t || "æ™šä¸Š" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            var n = 100 * e + t;
            return n < 600 ? "å‡Œæ™¨" : n < 900 ? "æ—©ä¸Š" : n < 1130 ? "ä¸Šåˆ" : n < 1230 ? "ä¸­åˆ" : n < 1800 ? "ä¸‹åˆ" : "æ™šä¸Š"
        },
        calendar: {
            sameDay: "[ä»Šå¤©]LT",
            nextDay: "[æ˜Žå¤©]LT",
            nextWeek: "[ä¸‹]ddddLT",
            lastDay: "[æ˜¨å¤©]LT",
            lastWeek: "[ä¸Š]ddddLT",
            sameElse: "L"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(\u65e5|\u6708|\u9031)/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "æ—¥";
                case "M":
                    return e + "æœˆ";
                case "w":
                case "W":
                    return e + "é€±";
                default:
                    return e
            }
        },
        relativeTime: {
            future: "%så…§",
            past: "%så‰",
            s: "å¹¾ç§’",
            ss: "%d ç§’",
            m: "1 åˆ†é˜",
            mm: "%d åˆ†é˜",
            h: "1 å°æ™‚",
            hh: "%d å°æ™‚",
            d: "1 å¤©",
            dd: "%d å¤©",
            M: "1 å€‹æœˆ",
            MM: "%d å€‹æœˆ",
            y: "1 å¹´",
            yy: "%d å¹´"
        }
    }), i.defineLocale("zh-tw", {
        months: "ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ".split("_"),
        monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
        weekdays: "æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­".split("_"),
        weekdaysShort: "é€±æ—¥_é€±ä¸€_é€±äºŒ_é€±ä¸‰_é€±å››_é€±äº”_é€±å…­".split("_"),
        weekdaysMin: "æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYYå¹´MæœˆDæ—¥",
            LLL: "YYYYå¹´MæœˆDæ—¥ HH:mm",
            LLLL: "YYYYå¹´MæœˆDæ—¥dddd HH:mm",
            l: "YYYY/M/D",
            ll: "YYYYå¹´MæœˆDæ—¥",
            lll: "YYYYå¹´MæœˆDæ—¥ HH:mm",
            llll: "YYYYå¹´MæœˆDæ—¥dddd HH:mm"
        },
        meridiemParse: /\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "å‡Œæ™¨" === t || "æ—©ä¸Š" === t || "ä¸Šåˆ" === t ? e : "ä¸­åˆ" === t ? 11 <= e ? e : e + 12 : "ä¸‹åˆ" === t || "æ™šä¸Š" === t ? e + 12 : void 0
        },
        meridiem: function(e, t, i) {
            var n = 100 * e + t;
            return n < 600 ? "å‡Œæ™¨" : n < 900 ? "æ—©ä¸Š" : n < 1130 ? "ä¸Šåˆ" : n < 1230 ? "ä¸­åˆ" : n < 1800 ? "ä¸‹åˆ" : "æ™šä¸Š"
        },
        calendar: {
            sameDay: "[ä»Šå¤©] LT",
            nextDay: "[æ˜Žå¤©] LT",
            nextWeek: "[ä¸‹]dddd LT",
            lastDay: "[æ˜¨å¤©] LT",
            lastWeek: "[ä¸Š]dddd LT",
            sameElse: "L"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(\u65e5|\u6708|\u9031)/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "æ—¥";
                case "M":
                    return e + "æœˆ";
                case "w":
                case "W":
                    return e + "é€±";
                default:
                    return e
            }
        },
        relativeTime: {
            future: "%så…§",
            past: "%så‰",
            s: "å¹¾ç§’",
            ss: "%d ç§’",
            m: "1 åˆ†é˜",
            mm: "%d åˆ†é˜",
            h: "1 å°æ™‚",
            hh: "%d å°æ™‚",
            d: "1 å¤©",
            dd: "%d å¤©",
            M: "1 å€‹æœˆ",
            MM: "%d å€‹æœˆ",
            y: "1 å¹´",
            yy: "%d å¹´"
        }
    }), i.locale("en"), i
}),
function(e, t) {
    "use strict";
    "object" == typeof module && module.exports ? module.exports = t(require("moment")) : "function" == typeof define && define.amd ? define(["moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    var t, i = {},
        n = {},
        a = {},
        r = {};
    e && "string" == typeof e.version || T("Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/");
    var s = e.version.split("."),
        o = +s[0],
        d = +s[1];

    function u(e) {
        return 96 < e ? e - 87 : 64 < e ? e - 29 : e - 48
    }

    function l(e) {
        var t = 0,
            i = e.split("."),
            n = i[0],
            a = i[1] || "",
            r = 1,
            s = 0,
            o = 1;
        for (45 === e.charCodeAt(0) && (o = -(t = 1)); t < n.length; t++) s = 60 * s + u(n.charCodeAt(t));
        for (t = 0; t < a.length; t++) r /= 60, s += u(a.charCodeAt(t)) * r;
        return s * o
    }

    function c(e) {
        for (var t = 0; t < e.length; t++) e[t] = l(e[t])
    }

    function _(e, t) {
        var i, n = [];
        for (i = 0; i < t.length; i++) n[i] = e[t[i]];
        return n
    }

    function m(e) {
        var t = e.split("|"),
            i = t[2].split(" "),
            n = t[3].split(""),
            a = t[4].split(" ");
        return c(i), c(n), c(a),
            function(e, t) {
                for (var i = 0; i < t; i++) e[i] = Math.round((e[i - 1] || 0) + 6e4 * e[i]);
                e[t - 1] = 1 / 0
            }(a, n.length), {
                name: t[0],
                abbrs: _(t[1].split(" "), n),
                offsets: _(i, n),
                untils: a,
                population: 0 | t[5]
            }
    }

    function h(e) {
        e && this._set(m(e))
    }

    function p(e) {
        var t = e.toTimeString(),
            i = t.match(/\([a-z ]+\)/i);
        "GMT" === (i = i && i[0] ? (i = i[0].match(/[A-Z]/g)) ? i.join("") : void 0 : (i = t.match(/[A-Z]{3,5}/g)) ? i[0] : void 0) && (i = void 0), this.at = +e, this.abbr = i, this.offset = e.getTimezoneOffset()
    }

    function f(e) {
        this.zone = e, this.offsetScore = 0, this.abbrScore = 0
    }

    function g(e, t) {
        for (var i, n; n = 6e4 * ((t.at - e.at) / 12e4 | 0);)(i = new p(new Date(e.at + n))).offset === e.offset ? e = i : t = i;
        return e
    }

    function y(e, t) {
        return e.offsetScore !== t.offsetScore ? e.offsetScore - t.offsetScore : e.abbrScore !== t.abbrScore ? e.abbrScore - t.abbrScore : t.zone.population - e.zone.population
    }

    function M(e, t) {
        var i, n;
        for (c(t), i = 0; i < t.length; i++) n = t[i], r[n] = r[n] || {}, r[n][e] = !0
    }

    function v(e) {
        return (e || "").toLowerCase().replace(/\//g, "_")
    }

    function L(e) {
        var t, n, r, s;
        for ("string" == typeof e && (e = [e]), t = 0; t < e.length; t++) s = v(n = (r = e[t].split("|"))[0]), i[s] = e[t], a[s] = n, M(s, r[2].split(" "))
    }

    function w(e, t) {
        e = v(e);
        var r, s = i[e];
        return s instanceof h ? s : "string" == typeof s ? (s = new h(s), i[e] = s) : n[e] && t !== w && (r = w(n[e], w)) ? ((s = i[e] = new h)._set(r), s.name = a[e], s) : null
    }

    function b(e) {
        var t, i, r, s;
        for ("string" == typeof e && (e = [e]), t = 0; t < e.length; t++) r = v((i = e[t].split("|"))[0]), s = v(i[1]), n[r] = s, a[r] = i[0], n[s] = r, a[s] = i[1]
    }

    function k(e) {
        L(e.zones), b(e.links), D.dataVersion = e.version
    }

    function Y(e) {
        var t = "X" === e._f || "x" === e._f;
        return !(!e._a || void 0 !== e._tzm || t)
    }

    function T(e) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(e)
    }

    function D(t) {
        var i = Array.prototype.slice.call(arguments, 0, -1),
            n = arguments[arguments.length - 1],
            a = w(n),
            r = e.utc.apply(null, i);
        return a && !e.isMoment(t) && Y(r) && r.add(a.parse(r), "minutes"), r.tz(n), r
    }(o < 2 || 2 == o && d < 6) && T("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + e.version + ". See momentjs.com"), h.prototype = {
        _set: function(e) {
            this.name = e.name, this.abbrs = e.abbrs, this.untils = e.untils, this.offsets = e.offsets, this.population = e.population
        },
        _index: function(e) {
            var t, i = +e,
                n = this.untils;
            for (t = 0; t < n.length; t++)
                if (i < n[t]) return t
        },
        parse: function(e) {
            var t, i, n, a, r = +e,
                s = this.offsets,
                o = this.untils,
                d = o.length - 1;
            for (a = 0; a < d; a++)
                if (t = s[a], i = s[a + 1], n = s[a ? a - 1 : a], t < i && D.moveAmbiguousForward ? t = i : n < t && D.moveInvalidForward && (t = n), r < o[a] - 6e4 * t) return s[a];
            return s[d]
        },
        abbr: function(e) {
            return this.abbrs[this._index(e)]
        },
        offset: function(e) {
            return T("zone.offset has been deprecated in favor of zone.utcOffset"), this.offsets[this._index(e)]
        },
        utcOffset: function(e) {
            return this.offsets[this._index(e)]
        }
    }, f.prototype.scoreOffsetAt = function(e) {
        this.offsetScore += Math.abs(this.zone.utcOffset(e.at) - e.offset), this.zone.abbr(e.at).replace(/[^A-Z]/g, "") !== e.abbr && this.abbrScore++
    }, D.version = "0.5.25", D.dataVersion = "", D._zones = i, D._links = n, D._names = a, D.add = L, D.link = b, D.load = k, D.zone = w, D.zoneExists = function e(t) {
        return e.didShowError || (e.didShowError = !0, T("moment.tz.zoneExists('" + t + "') has been deprecated in favor of !moment.tz.zone('" + t + "')")), !!w(t)
    }, D.guess = function(e) {
        return t && !e || (t = function() {
            try {
                var e = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (e && 3 < e.length) {
                    var t = a[v(e)];
                    if (t) return t;
                    T("Moment Timezone found " + e + " from the Intl api, but did not have that data loaded.")
                }
            } catch (e) {}
            var i, n, s, o = function() {
                    var e, t, i, n = (new Date).getFullYear() - 2,
                        a = new p(new Date(n, 0, 1)),
                        r = [a];
                    for (i = 1; i < 48; i++)(t = new p(new Date(n, i, 1))).offset !== a.offset && (e = g(a, t), r.push(e), r.push(new p(new Date(e.at + 6e4)))), a = t;
                    for (i = 0; i < 4; i++) r.push(new p(new Date(n + i, 0, 1))), r.push(new p(new Date(n + i, 6, 1)));
                    return r
                }(),
                d = o.length,
                u = function(e) {
                    var t, i, n, s = e.length,
                        o = {},
                        d = [];
                    for (t = 0; t < s; t++)
                        for (i in n = r[e[t].offset] || {}) n.hasOwnProperty(i) && (o[i] = !0);
                    for (t in o) o.hasOwnProperty(t) && d.push(a[t]);
                    return d
                }(o),
                l = [];
            for (n = 0; n < u.length; n++) {
                for (i = new f(w(u[n]), d), s = 0; s < d; s++) i.scoreOffsetAt(o[s]);
                l.push(i)
            }
            return l.sort(y), 0 < l.length ? l[0].zone.name : void 0
        }()), t
    }, D.names = function() {
        var e, t = [];
        for (e in a) a.hasOwnProperty(e) && (i[e] || i[n[e]]) && a[e] && t.push(a[e]);
        return t.sort()
    }, D.Zone = h, D.unpack = m, D.unpackBase60 = l, D.needsOffset = Y, D.moveInvalidForward = !0, D.moveAmbiguousForward = !1;
    var A, S = e.fn;

    function x(e) {
        return function() {
            return this._z ? this._z.abbr(this) : e.call(this)
        }
    }

    function E(e) {
        return function() {
            return this._z = null, e.apply(this, arguments)
        }
    }
    e.tz = D, e.defaultZone = null, e.updateOffset = function(t, i) {
        var n, a = e.defaultZone;
        if (void 0 === t._z && (a && Y(t) && !t._isUTC && (t._d = e.utc(t._a)._d, t.utc().add(a.parse(t), "minutes")), t._z = a), t._z)
            if (n = t._z.utcOffset(t), Math.abs(n) < 16 && (n /= 60), void 0 !== t.utcOffset) {
                var r = t._z;
                t.utcOffset(-n, i), t._z = r
            } else t.zone(n, i)
    }, S.tz = function(t, i) {
        if (t) {
            if ("string" != typeof t) throw new Error("Time zone name must be a string, got " + t + " [" + typeof t + "]");
            return this._z = w(t), this._z ? e.updateOffset(this, i) : T("Moment Timezone has no data for " + t + ". See http://momentjs.com/timezone/docs/#/data-loading/."), this
        }
        if (this._z) return this._z.name
    }, S.zoneName = x(S.zoneName), S.zoneAbbr = x(S.zoneAbbr), S.utc = E(S.utc), S.local = E(S.local), S.utcOffset = (A = S.utcOffset, function() {
        return 0 < arguments.length && (this._z = null), A.apply(this, arguments)
    }), e.tz.setDefault = function(t) {
        return (o < 2 || 2 == o && d < 9) && T("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + e.version + "."), e.defaultZone = t ? w(t) : null, e
    };
    var H = e.momentProperties;
    return "[object Array]" === Object.prototype.toString.call(H) ? (H.push("_z"), H.push("_a")) : H && (H._z = null), k({
        version: "2019a",
        zones: ["Africa/Abidjan|GMT|0|0||48e5", "Africa/Nairobi|EAT|-30|0||47e5", "Africa/Algiers|CET|-10|0||26e5", "Africa/Lagos|WAT|-10|0||17e6", "Africa/Maputo|CAT|-20|0||26e5", "Africa/Cairo|EET EEST|-20 -30|01010|1M2m0 gL0 e10 mn0|15e6", "Africa/Casablanca|+00 +01|0 -10|01010101010101010101010101010101|1LHC0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00|32e5", "Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|11e6", "Africa/Johannesburg|SAST|-20|0||84e5", "Africa/Khartoum|EAT CAT|-30 -20|01|1Usl0|51e5", "Africa/Sao_Tome|GMT WAT|0 -10|010|1UQN0 2q00", "Africa/Tripoli|EET|-20|0||11e5", "Africa/Windhoek|CAT WAT|-20 -10|010101010|1LKo0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4", "America/Adak|HST HDT|a0 90|01010101010101010101010|1Lzo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326", "America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1Lzn0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4", "America/Santo_Domingo|AST|40|0||29e5", "America/Fortaleza|-03|30|0||34e5", "America/Asuncion|-03 -04|30 40|01010101010101010101010|1LEP0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0|28e5", "America/Panama|EST|50|0||15e5", "America/Mexico_City|CST CDT|60 50|01010101010101010101010|1LKw0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|20e6", "America/Managua|CST|60|0||22e5", "America/La_Paz|-04|40|0||19e5", "America/Lima|-05|50|0||11e6", "America/Denver|MST MDT|70 60|01010101010101010101010|1Lzl0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5", "America/Campo_Grande|-03 -04|30 40|01010101010101010101010|1LqP0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0 1HB0 FX0 1HB0 IL0 1HB0 FX0 1HB0 IL0 1EN0 FX0 1HB0|77e4", "America/Cancun|CST CDT EST|60 50 50|0102|1LKw0 1lb0 Dd0|63e4", "America/Caracas|-0430 -04|4u 40|01|1QMT0|29e5", "America/Chicago|CST CDT|60 50|01010101010101010101010|1Lzk0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5", "America/Chihuahua|MST MDT|70 60|01010101010101010101010|1LKx0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0|81e4", "America/Phoenix|MST|70|0||42e5", "America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1Lzm0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6", "America/New_York|EST EDT|50 40|01010101010101010101010|1Lzj0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6", "America/Fort_Nelson|PST PDT MST|80 70 70|0102|1Lzm0 1zb0 Op0|39e2", "America/Halifax|AST ADT|40 30|01010101010101010101010|1Lzi0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4", "America/Godthab|-03 -02|30 20|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|17e3", "America/Grand_Turk|EST EDT AST|50 40 40|0101210101010101010|1Lzj0 1zb0 Op0 1zb0 5Ip0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2", "America/Havana|CST CDT|50 40|01010101010101010101010|1Lzh0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5", "America/Metlakatla|PST AKST AKDT|80 90 80|012121201212121212121|1PAa0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", "America/Miquelon|-03 -02|30 20|01010101010101010101010|1Lzh0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2", "America/Montevideo|-02 -03|20 30|0101|1Lzg0 1o10 11z0|17e5", "America/Noronha|-02|20|0||30e2", "America/Port-au-Prince|EST EDT|50 40|010101010101010101010|1Lzj0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "Antarctica/Palmer|-03 -04|30 40|01010|1LSP0 Rd0 46n0 Ap0|40", "America/Santiago|-03 -04|30 40|010101010101010101010|1LSP0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0|62e5", "America/Sao_Paulo|-02 -03|20 30|01010101010101010101010|1LqO0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0 1HB0 FX0 1HB0 IL0 1HB0 FX0 1HB0 IL0 1EN0 FX0 1HB0|20e6", "Atlantic/Azores|-01 +00|10 0|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|25e4", "America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1Lzhu 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "Antarctica/Casey|+08 +11|-80 -b0|010|1RWg0 3m10|10", "Asia/Bangkok|+07|-70|0||15e6", "Pacific/Port_Moresby|+10|-a0|0||25e4", "Pacific/Guadalcanal|+11|-b0|0||11e4", "Asia/Tashkent|+05|-50|0||23e5", "Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1LKe0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00|14e5", "Asia/Baghdad|+03|-30|0||66e5", "Antarctica/Troll|+00 +02|0 -20|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|40", "Asia/Dhaka|+06|-60|0||16e6", "Asia/Amman|EET EEST|-20 -30|01010101010101010101010|1LGK0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|25e5", "Asia/Kamchatka|+12|-c0|0||18e4", "Asia/Baku|+04 +05|-40 -50|01010|1LHA0 1o00 11A0 1o00|27e5", "Asia/Barnaul|+07 +06|-70 -60|010|1N7v0 3rd0", "Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1LHy0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0|22e5", "Asia/Kuala_Lumpur|+08|-80|0||71e5", "Asia/Kolkata|IST|-5u|0||15e6", "Asia/Chita|+10 +08 +09|-a0 -80 -90|012|1N7s0 3re0|33e4", "Asia/Ulaanbaatar|+08 +09|-80 -90|01010|1O8G0 1cJ0 1cP0 1cJ0|12e5", "Asia/Shanghai|CST|-80|0||23e6", "Asia/Colombo|+0530|-5u|0||22e5", "Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1LGK0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|26e5", "Asia/Dili|+09|-90|0||19e4", "Asia/Dubai|+04|-40|0||39e5", "Asia/Famagusta|EET EEST +03|-20 -30 -30|0101012010101010101010|1LHB0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00", "Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1LGK0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0|18e5", "Asia/Hong_Kong|HKT|-80|0||73e5", "Asia/Hovd|+07 +08|-70 -80|01010|1O8H0 1cJ0 1cP0 1cJ0|81e3", "Asia/Irkutsk|+09 +08|-90 -80|01|1N7t0|60e4", "Europe/Istanbul|EET EEST +03|-20 -30 -30|0101012|1LI10 1nA0 11A0 1tA0 U00 15w0|13e6", "Asia/Jakarta|WIB|-70|0||31e6", "Asia/Jayapura|WIT|-90|0||26e4", "Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1LGM0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0|81e4", "Asia/Kabul|+0430|-4u|0||46e5", "Asia/Karachi|PKT|-50|0||24e6", "Asia/Kathmandu|+0545|-5J|0||12e5", "Asia/Yakutsk|+10 +09|-a0 -90|01|1N7s0|28e4", "Asia/Krasnoyarsk|+08 +07|-80 -70|01|1N7u0|10e5", "Asia/Magadan|+12 +10 +11|-c0 -a0 -b0|012|1N7q0 3Cq0|95e3", "Asia/Makassar|WITA|-80|0||15e5", "Asia/Manila|PST|-80|0||24e6", "Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|35e5", "Asia/Novosibirsk|+07 +06|-70 -60|010|1N7v0 4eN0|15e5", "Asia/Omsk|+07 +06|-70 -60|01|1N7v0|12e5", "Asia/Pyongyang|KST KST|-90 -8u|010|1P4D0 6BA0|29e5", "Asia/Qyzylorda|+06 +05|-60 -50|01|1Xei0|73e4", "Asia/Rangoon|+0630|-6u|0||48e5", "Asia/Sakhalin|+11 +10|-b0 -a0|010|1N7r0 3rd0|58e4", "Asia/Seoul|KST|-90|0||23e6", "Asia/Srednekolymsk|+12 +11|-c0 -b0|01|1N7q0|35e2", "Asia/Tehran|+0330 +0430|-3u -4u|01010101010101010101010|1LEku 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6", "Asia/Tokyo|JST|-90|0||38e6", "Asia/Tomsk|+07 +06|-70 -60|010|1N7v0 3Qp0|10e5", "Asia/Vladivostok|+11 +10|-b0 -a0|01|1N7r0|60e4", "Asia/Yekaterinburg|+06 +05|-60 -50|01|1N7w0|14e5", "Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|27e5", "Atlantic/Cape_Verde|-01|10|0||50e4", "Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1LKg0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0|40e5", "Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1LKgu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0|11e5", "Australia/Brisbane|AEST|-a0|0||20e5", "Australia/Darwin|ACST|-9u|0||12e4", "Australia/Eucla|+0845|-8J|0||368", "Australia/Lord_Howe|+11 +1030|-b0 -au|01010101010101010101010|1LKf0 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu|347", "Australia/Perth|AWST|-80|0||18e5", "Pacific/Easter|-05 -06|50 60|010101010101010101010|1LSP0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0|30e2", "Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|12e5", "Etc/GMT-1|+01|-10|0|", "Pacific/Fakaofo|+13|-d0|0||483", "Pacific/Kiritimati|+14|-e0|0||51e2", "Etc/GMT-2|+02|-20|0|", "Pacific/Tahiti|-10|a0|0||18e4", "Pacific/Niue|-11|b0|0||12e2", "Etc/GMT+12|-12|c0|0|", "Pacific/Galapagos|-06|60|0||25e3", "Etc/GMT+7|-07|70|0|", "Pacific/Pitcairn|-08|80|0||56", "Pacific/Gambier|-09|90|0||125", "Etc/UTC|UTC|0|0|", "Europe/Ulyanovsk|+04 +03|-40 -30|010|1N7y0 3rd0|13e5", "Europe/London|GMT BST|0 -10|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|10e6", "Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1LHA0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00|67e4", "Europe/Kaliningrad|+03 EET|-30 -20|01|1N7z0|44e4", "Europe/Kirov|+04 +03|-40 -30|01|1N7y0|48e4", "Europe/Moscow|MSK MSK|-40 -30|01|1N7y0|16e6", "Europe/Saratov|+04 +03|-40 -30|010|1N7y0 5810", "Europe/Simferopol|EET MSK MSK|-20 -40 -30|012|1LHA0 1nW0|33e4", "Europe/Volgograd|+04 +03|-40 -30|010|1N7y0 9Jd0|10e5", "Pacific/Honolulu|HST|a0|0||37e4", "MET|MET MEST|-10 -20|01010101010101010101010|1LHB0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00", "Pacific/Chatham|+1345 +1245|-dJ -cJ|01010101010101010101010|1LKe0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00|600", "Pacific/Apia|+14 +13|-e0 -d0|01010101010101010101010|1LKe0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00|37e3", "Pacific/Bougainville|+10 +11|-a0 -b0|01|1NwE0|18e4", "Pacific/Fiji|+13 +12|-d0 -c0|01010101010101010101010|1Lfp0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 1VA0|88e4", "Pacific/Guam|ChST|-a0|0||17e4", "Pacific/Marquesas|-0930|9u|0||86e2", "Pacific/Pago_Pago|SST|b0|0||37e2", "Pacific/Norfolk|+1130 +11|-bu -b0|01|1PoCu|25e4", "Pacific/Tongatapu|+13 +14|-d0 -e0|010|1S4d0 s00|75e3"],
        links: ["Africa/Abidjan|Africa/Accra", "Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Bissau", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Monrovia", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|America/Danmarkshavn", "Africa/Abidjan|Atlantic/Reykjavik", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Abidjan|Etc/GMT", "Africa/Abidjan|Etc/GMT+0", "Africa/Abidjan|Etc/GMT-0", "Africa/Abidjan|Etc/GMT0", "Africa/Abidjan|Etc/Greenwich", "Africa/Abidjan|GMT", "Africa/Abidjan|GMT+0", "Africa/Abidjan|GMT-0", "Africa/Abidjan|GMT0", "Africa/Abidjan|Greenwich", "Africa/Abidjan|Iceland", "Africa/Algiers|Africa/Tunis", "Africa/Cairo|Egypt", "Africa/Casablanca|Africa/El_Aaiun", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Lagos|Africa/Bangui", "Africa/Lagos|Africa/Brazzaville", "Africa/Lagos|Africa/Douala", "Africa/Lagos|Africa/Kinshasa", "Africa/Lagos|Africa/Libreville", "Africa/Lagos|Africa/Luanda", "Africa/Lagos|Africa/Malabo", "Africa/Lagos|Africa/Ndjamena", "Africa/Lagos|Africa/Niamey", "Africa/Lagos|Africa/Porto-Novo", "Africa/Maputo|Africa/Blantyre", "Africa/Maputo|Africa/Bujumbura", "Africa/Maputo|Africa/Gaborone", "Africa/Maputo|Africa/Harare", "Africa/Maputo|Africa/Kigali", "Africa/Maputo|Africa/Lubumbashi", "Africa/Maputo|Africa/Lusaka", "Africa/Nairobi|Africa/Addis_Ababa", "Africa/Nairobi|Africa/Asmara", "Africa/Nairobi|Africa/Asmera", "Africa/Nairobi|Africa/Dar_es_Salaam", "Africa/Nairobi|Africa/Djibouti", "Africa/Nairobi|Africa/Juba", "Africa/Nairobi|Africa/Kampala", "Africa/Nairobi|Africa/Mogadishu", "Africa/Nairobi|Indian/Antananarivo", "Africa/Nairobi|Indian/Comoro", "Africa/Nairobi|Indian/Mayotte", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|America/Juneau", "America/Anchorage|America/Nome", "America/Anchorage|America/Sitka", "America/Anchorage|America/Yakutat", "America/Anchorage|US/Alaska", "America/Campo_Grande|America/Cuiaba", "America/Chicago|America/Indiana/Knox", "America/Chicago|America/Indiana/Tell_City", "America/Chicago|America/Knox_IN", "America/Chicago|America/Matamoros", "America/Chicago|America/Menominee", "America/Chicago|America/North_Dakota/Beulah", "America/Chicago|America/North_Dakota/Center", "America/Chicago|America/North_Dakota/New_Salem", "America/Chicago|America/Rainy_River", "America/Chicago|America/Rankin_Inlet", "America/Chicago|America/Resolute", "America/Chicago|America/Winnipeg", "America/Chicago|CST6CDT", "America/Chicago|Canada/Central", "America/Chicago|US/Central", "America/Chicago|US/Indiana-Starke", "America/Chihuahua|America/Mazatlan", "America/Chihuahua|Mexico/BajaSur", "America/Denver|America/Boise", "America/Denver|America/Cambridge_Bay", "America/Denver|America/Edmonton", "America/Denver|America/Inuvik", "America/Denver|America/Ojinaga", "America/Denver|America/Shiprock", "America/Denver|America/Yellowknife", "America/Denver|Canada/Mountain", "America/Denver|MST7MDT", "America/Denver|Navajo", "America/Denver|US/Mountain", "America/Fortaleza|America/Araguaina", "America/Fortaleza|America/Argentina/Buenos_Aires", "America/Fortaleza|America/Argentina/Catamarca", "America/Fortaleza|America/Argentina/ComodRivadavia", "America/Fortaleza|America/Argentina/Cordoba", "America/Fortaleza|America/Argentina/Jujuy", "America/Fortaleza|America/Argentina/La_Rioja", "America/Fortaleza|America/Argentina/Mendoza", "America/Fortaleza|America/Argentina/Rio_Gallegos", "America/Fortaleza|America/Argentina/Salta", "America/Fortaleza|America/Argentina/San_Juan", "America/Fortaleza|America/Argentina/San_Luis", "America/Fortaleza|America/Argentina/Tucuman", "America/Fortaleza|America/Argentina/Ushuaia", "America/Fortaleza|America/Bahia", "America/Fortaleza|America/Belem", "America/Fortaleza|America/Buenos_Aires", "America/Fortaleza|America/Catamarca", "America/Fortaleza|America/Cayenne", "America/Fortaleza|America/Cordoba", "America/Fortaleza|America/Jujuy", "America/Fortaleza|America/Maceio", "America/Fortaleza|America/Mendoza", "America/Fortaleza|America/Paramaribo", "America/Fortaleza|America/Recife", "America/Fortaleza|America/Rosario", "America/Fortaleza|America/Santarem", "America/Fortaleza|Antarctica/Rothera", "America/Fortaleza|Atlantic/Stanley", "America/Fortaleza|Etc/GMT+3", "America/Halifax|America/Glace_Bay", "America/Halifax|America/Goose_Bay", "America/Halifax|America/Moncton", "America/Halifax|America/Thule", "America/Halifax|Atlantic/Bermuda", "America/Halifax|Canada/Atlantic", "America/Havana|Cuba", "America/La_Paz|America/Boa_Vista", "America/La_Paz|America/Guyana", "America/La_Paz|America/Manaus", "America/La_Paz|America/Porto_Velho", "America/La_Paz|Brazil/West", "America/La_Paz|Etc/GMT+4", "America/Lima|America/Bogota", "America/Lima|America/Eirunepe", "America/Lima|America/Guayaquil", "America/Lima|America/Porto_Acre", "America/Lima|America/Rio_Branco", "America/Lima|Brazil/Acre", "America/Lima|Etc/GMT+5", "America/Los_Angeles|America/Dawson", "America/Los_Angeles|America/Ensenada", "America/Los_Angeles|America/Santa_Isabel", "America/Los_Angeles|America/Tijuana", "America/Los_Angeles|America/Vancouver", "America/Los_Angeles|America/Whitehorse", "America/Los_Angeles|Canada/Pacific", "America/Los_Angeles|Canada/Yukon", "America/Los_Angeles|Mexico/BajaNorte", "America/Los_Angeles|PST8PDT", "America/Los_Angeles|US/Pacific", "America/Los_Angeles|US/Pacific-New", "America/Managua|America/Belize", "America/Managua|America/Costa_Rica", "America/Managua|America/El_Salvador", "America/Managua|America/Guatemala", "America/Managua|America/Regina", "America/Managua|America/Swift_Current", "America/Managua|America/Tegucigalpa", "America/Managua|Canada/Saskatchewan", "America/Mexico_City|America/Bahia_Banderas", "America/Mexico_City|America/Merida", "America/Mexico_City|America/Monterrey", "America/Mexico_City|Mexico/General", "America/New_York|America/Detroit", "America/New_York|America/Fort_Wayne", "America/New_York|America/Indiana/Indianapolis", "America/New_York|America/Indiana/Marengo", "America/New_York|America/Indiana/Petersburg", "America/New_York|America/Indiana/Vevay", "America/New_York|America/Indiana/Vincennes", "America/New_York|America/Indiana/Winamac", "America/New_York|America/Indianapolis", "America/New_York|America/Iqaluit", "America/New_York|America/Kentucky/Louisville", "America/New_York|America/Kentucky/Monticello", "America/New_York|America/Louisville", "America/New_York|America/Montreal", "America/New_York|America/Nassau", "America/New_York|America/Nipigon", "America/New_York|America/Pangnirtung", "America/New_York|America/Thunder_Bay", "America/New_York|America/Toronto", "America/New_York|Canada/Eastern", "America/New_York|EST5EDT", "America/New_York|US/East-Indiana", "America/New_York|US/Eastern", "America/New_York|US/Michigan", "America/Noronha|Atlantic/South_Georgia", "America/Noronha|Brazil/DeNoronha", "America/Noronha|Etc/GMT+2", "America/Panama|America/Atikokan", "America/Panama|America/Cayman", "America/Panama|America/Coral_Harbour", "America/Panama|America/Jamaica", "America/Panama|EST", "America/Panama|Jamaica", "America/Phoenix|America/Creston", "America/Phoenix|America/Dawson_Creek", "America/Phoenix|America/Hermosillo", "America/Phoenix|MST", "America/Phoenix|US/Arizona", "America/Santiago|Chile/Continental", "America/Santo_Domingo|America/Anguilla", "America/Santo_Domingo|America/Antigua", "America/Santo_Domingo|America/Aruba", "America/Santo_Domingo|America/Barbados", "America/Santo_Domingo|America/Blanc-Sablon", "America/Santo_Domingo|America/Curacao", "America/Santo_Domingo|America/Dominica", "America/Santo_Domingo|America/Grenada", "America/Santo_Domingo|America/Guadeloupe", "America/Santo_Domingo|America/Kralendijk", "America/Santo_Domingo|America/Lower_Princes", "America/Santo_Domingo|America/Marigot", "America/Santo_Domingo|America/Martinique", "America/Santo_Domingo|America/Montserrat", "America/Santo_Domingo|America/Port_of_Spain", "America/Santo_Domingo|America/Puerto_Rico", "America/Santo_Domingo|America/St_Barthelemy", "America/Santo_Domingo|America/St_Kitts", "America/Santo_Domingo|America/St_Lucia", "America/Santo_Domingo|America/St_Thomas", "America/Santo_Domingo|America/St_Vincent", "America/Santo_Domingo|America/Tortola", "America/Santo_Domingo|America/Virgin", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "Antarctica/Palmer|America/Punta_Arenas", "Asia/Baghdad|Antarctica/Syowa", "Asia/Baghdad|Asia/Aden", "Asia/Baghdad|Asia/Bahrain", "Asia/Baghdad|Asia/Kuwait", "Asia/Baghdad|Asia/Qatar", "Asia/Baghdad|Asia/Riyadh", "Asia/Baghdad|Etc/GMT-3", "Asia/Baghdad|Europe/Minsk", "Asia/Bangkok|Antarctica/Davis", "Asia/Bangkok|Asia/Ho_Chi_Minh", "Asia/Bangkok|Asia/Novokuznetsk", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Saigon", "Asia/Bangkok|Asia/Vientiane", "Asia/Bangkok|Etc/GMT-7", "Asia/Bangkok|Indian/Christmas", "Asia/Dhaka|Antarctica/Vostok", "Asia/Dhaka|Asia/Almaty", "Asia/Dhaka|Asia/Bishkek", "Asia/Dhaka|Asia/Dacca", "Asia/Dhaka|Asia/Kashgar", "Asia/Dhaka|Asia/Qostanay", "Asia/Dhaka|Asia/Thimbu", "Asia/Dhaka|Asia/Thimphu", "Asia/Dhaka|Asia/Urumqi", "Asia/Dhaka|Etc/GMT-6", "Asia/Dhaka|Indian/Chagos", "Asia/Dili|Etc/GMT-9", "Asia/Dili|Pacific/Palau", "Asia/Dubai|Asia/Muscat", "Asia/Dubai|Asia/Tbilisi", "Asia/Dubai|Asia/Yerevan", "Asia/Dubai|Etc/GMT-4", "Asia/Dubai|Europe/Samara", "Asia/Dubai|Indian/Mahe", "Asia/Dubai|Indian/Mauritius", "Asia/Dubai|Indian/Reunion", "Asia/Gaza|Asia/Hebron", "Asia/Hong_Kong|Hongkong", "Asia/Jakarta|Asia/Pontianak", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kamchatka|Asia/Anadyr", "Asia/Kamchatka|Etc/GMT-12", "Asia/Kamchatka|Kwajalein", "Asia/Kamchatka|Pacific/Funafuti", "Asia/Kamchatka|Pacific/Kwajalein", "Asia/Kamchatka|Pacific/Majuro", "Asia/Kamchatka|Pacific/Nauru", "Asia/Kamchatka|Pacific/Tarawa", "Asia/Kamchatka|Pacific/Wake", "Asia/Kamchatka|Pacific/Wallis", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kolkata|Asia/Calcutta", "Asia/Kuala_Lumpur|Asia/Brunei", "Asia/Kuala_Lumpur|Asia/Kuching", "Asia/Kuala_Lumpur|Asia/Singapore", "Asia/Kuala_Lumpur|Etc/GMT-8", "Asia/Kuala_Lumpur|Singapore", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Rangoon|Asia/Yangon", "Asia/Rangoon|Indian/Cocos", "Asia/Seoul|ROK", "Asia/Shanghai|Asia/Chongqing", "Asia/Shanghai|Asia/Chungking", "Asia/Shanghai|Asia/Harbin", "Asia/Shanghai|Asia/Macao", "Asia/Shanghai|Asia/Macau", "Asia/Shanghai|Asia/Taipei", "Asia/Shanghai|PRC", "Asia/Shanghai|ROC", "Asia/Tashkent|Antarctica/Mawson", "Asia/Tashkent|Asia/Aqtau", "Asia/Tashkent|Asia/Aqtobe", "Asia/Tashkent|Asia/Ashgabat", "Asia/Tashkent|Asia/Ashkhabad", "Asia/Tashkent|Asia/Atyrau", "Asia/Tashkent|Asia/Dushanbe", "Asia/Tashkent|Asia/Oral", "Asia/Tashkent|Asia/Samarkand", "Asia/Tashkent|Etc/GMT-5", "Asia/Tashkent|Indian/Kerguelen", "Asia/Tashkent|Indian/Maldives", "Asia/Tehran|Iran", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Choibalsan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Asia/Vladivostok|Asia/Ust-Nera", "Asia/Yakutsk|Asia/Khandyga", "Atlantic/Azores|America/Scoresbysund", "Atlantic/Cape_Verde|Etc/GMT+1", "Australia/Adelaide|Australia/Broken_Hill", "Australia/Adelaide|Australia/South", "Australia/Adelaide|Australia/Yancowinna", "Australia/Brisbane|Australia/Lindeman", "Australia/Brisbane|Australia/Queensland", "Australia/Darwin|Australia/North", "Australia/Lord_Howe|Australia/LHI", "Australia/Perth|Australia/West", "Australia/Sydney|Australia/ACT", "Australia/Sydney|Australia/Canberra", "Australia/Sydney|Australia/Currie", "Australia/Sydney|Australia/Hobart", "Australia/Sydney|Australia/Melbourne", "Australia/Sydney|Australia/NSW", "Australia/Sydney|Australia/Tasmania", "Australia/Sydney|Australia/Victoria", "Etc/UTC|Etc/UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UCT", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Athens|Asia/Nicosia", "Europe/Athens|EET", "Europe/Athens|Europe/Bucharest", "Europe/Athens|Europe/Helsinki", "Europe/Athens|Europe/Kiev", "Europe/Athens|Europe/Mariehamn", "Europe/Athens|Europe/Nicosia", "Europe/Athens|Europe/Riga", "Europe/Athens|Europe/Sofia", "Europe/Athens|Europe/Tallinn", "Europe/Athens|Europe/Uzhgorod", "Europe/Athens|Europe/Vilnius", "Europe/Athens|Europe/Zaporozhye", "Europe/Chisinau|Europe/Tiraspol", "Europe/Dublin|Eire", "Europe/Istanbul|Asia/Istanbul", "Europe/Istanbul|Turkey", "Europe/Lisbon|Atlantic/Canary", "Europe/Lisbon|Atlantic/Faeroe", "Europe/Lisbon|Atlantic/Faroe", "Europe/Lisbon|Atlantic/Madeira", "Europe/Lisbon|Portugal", "Europe/Lisbon|WET", "Europe/London|Europe/Belfast", "Europe/London|Europe/Guernsey", "Europe/London|Europe/Isle_of_Man", "Europe/London|Europe/Jersey", "Europe/London|GB", "Europe/London|GB-Eire", "Europe/Moscow|W-SU", "Europe/Paris|Africa/Ceuta", "Europe/Paris|Arctic/Longyearbyen", "Europe/Paris|Atlantic/Jan_Mayen", "Europe/Paris|CET", "Europe/Paris|Europe/Amsterdam", "Europe/Paris|Europe/Andorra", "Europe/Paris|Europe/Belgrade", "Europe/Paris|Europe/Berlin", "Europe/Paris|Europe/Bratislava", "Europe/Paris|Europe/Brussels", "Europe/Paris|Europe/Budapest", "Europe/Paris|Europe/Busingen", "Europe/Paris|Europe/Copenhagen", "Europe/Paris|Europe/Gibraltar", "Europe/Paris|Europe/Ljubljana", "Europe/Paris|Europe/Luxembourg", "Europe/Paris|Europe/Madrid", "Europe/Paris|Europe/Malta", "Europe/Paris|Europe/Monaco", "Europe/Paris|Europe/Oslo", "Europe/Paris|Europe/Podgorica", "Europe/Paris|Europe/Prague", "Europe/Paris|Europe/Rome", "Europe/Paris|Europe/San_Marino", "Europe/Paris|Europe/Sarajevo", "Europe/Paris|Europe/Skopje", "Europe/Paris|Europe/Stockholm", "Europe/Paris|Europe/Tirane", "Europe/Paris|Europe/Vaduz", "Europe/Paris|Europe/Vatican", "Europe/Paris|Europe/Vienna", "Europe/Paris|Europe/Warsaw", "Europe/Paris|Europe/Zagreb", "Europe/Paris|Europe/Zurich", "Europe/Paris|Poland", "Europe/Ulyanovsk|Europe/Astrakhan", "Pacific/Auckland|Antarctica/McMurdo", "Pacific/Auckland|Antarctica/South_Pole", "Pacific/Auckland|NZ", "Pacific/Chatham|NZ-CHAT", "Pacific/Easter|Chile/EasterIsland", "Pacific/Fakaofo|Etc/GMT-13", "Pacific/Fakaofo|Pacific/Enderbury", "Pacific/Galapagos|Etc/GMT+6", "Pacific/Gambier|Etc/GMT+9", "Pacific/Guadalcanal|Antarctica/Macquarie", "Pacific/Guadalcanal|Etc/GMT-11", "Pacific/Guadalcanal|Pacific/Efate", "Pacific/Guadalcanal|Pacific/Kosrae", "Pacific/Guadalcanal|Pacific/Noumea", "Pacific/Guadalcanal|Pacific/Pohnpei", "Pacific/Guadalcanal|Pacific/Ponape", "Pacific/Guam|Pacific/Saipan", "Pacific/Honolulu|HST", "Pacific/Honolulu|Pacific/Johnston", "Pacific/Honolulu|US/Hawaii", "Pacific/Kiritimati|Etc/GMT-14", "Pacific/Niue|Etc/GMT+11", "Pacific/Pago_Pago|Pacific/Midway", "Pacific/Pago_Pago|Pacific/Samoa", "Pacific/Pago_Pago|US/Samoa", "Pacific/Pitcairn|Etc/GMT+8", "Pacific/Port_Moresby|Antarctica/DumontDUrville", "Pacific/Port_Moresby|Etc/GMT-10", "Pacific/Port_Moresby|Pacific/Chuuk", "Pacific/Port_Moresby|Pacific/Truk", "Pacific/Port_Moresby|Pacific/Yap", "Pacific/Tahiti|Etc/GMT+10", "Pacific/Tahiti|Pacific/Rarotonga"]
    }), e
}),
function(e, t) {
    "use strict";

    function i(e, i, r) {
        if ("string" != typeof e) throw "invalid module definition, module id must be defined and be a string";
        if (i === t) throw "invalid module definition, dependencies must be specified";
        if (r === t) throw "invalid module definition, definition function must be specified";
        ! function(e, t) {
            for (var i, r = [], s = 0; s < e.length; ++s) {
                if (!(i = a[e[s]] || n(e[s]))) throw "module definition dependecy not found: " + e[s];
                r.push(i)
            }
            t.apply(null, r)
        }(i, function() {
            a[e] = r.apply(null, arguments)
        })
    }

    function n(t) {
        for (var i = e, n = t.split(/[.\/]/), a = 0; a < n.length; ++a) {
            if (!i[n[a]]) return;
            i = i[n[a]]
        }
        return i
    }
    var a = {},
        r = "moxie/core/utils/Basic",
        s = "moxie/core/utils/Env",
        o = "moxie/core/I18n",
        d = "moxie/core/utils/Mime",
        u = "moxie/core/utils/Dom",
        l = "moxie/core/Exceptions",
        c = "moxie/core/EventTarget",
        _ = "moxie/runtime/Runtime",
        m = "moxie/runtime/RuntimeClient",
        h = "moxie/file/FileInput",
        p = "moxie/core/utils/Encode",
        f = "moxie/file/Blob",
        g = "moxie/file/File",
        y = "moxie/file/FileDrop",
        M = "moxie/file/FileReader",
        v = "moxie/core/utils/Url",
        L = "moxie/runtime/RuntimeTarget",
        w = "moxie/file/FileReaderSync",
        b = "moxie/xhr/FormData",
        k = "moxie/xhr/XMLHttpRequest",
        Y = "moxie/runtime/Transporter",
        T = "moxie/image/Image",
        D = "moxie/runtime/html5/Runtime",
        A = "moxie/core/utils/Events",
        S = "moxie/runtime/html5/file/FileReader",
        x = "moxie/runtime/html5/utils/BinaryReader",
        E = "moxie/runtime/html5/image/JPEGHeaders",
        H = "moxie/runtime/html5/image/ExifParser",
        O = "moxie/runtime/html5/image/JPEG",
        C = "moxie/runtime/html5/image/PNG",
        P = "moxie/runtime/html5/image/ImageInfo",
        z = "moxie/runtime/html5/image/MegaPixel",
        j = "moxie/runtime/html5/image/Image",
        R = "moxie/runtime/flash/Runtime",
        I = "moxie/runtime/flash/file/Blob",
        F = "moxie/runtime/flash/file/FileReader",
        $ = "moxie/runtime/flash/file/FileReaderSync",
        N = "moxie/runtime/flash/xhr/XMLHttpRequest",
        W = "moxie/runtime/flash/runtime/Transporter",
        B = "moxie/runtime/flash/image/Image",
        U = "moxie/runtime/silverlight/Runtime",
        q = "moxie/runtime/html4/Runtime";
    i(r, [], function() {
            var e = function(e) {
                    return void 0 === e ? "undefined" : null === e ? "null" : e.nodeType ? "node" : {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
                },
                t = function(a) {
                    return i(arguments, function(r, s) {
                        s > 0 && i(r, function(i, r) {
                            void 0 !== i && (e(a[r]) === e(i) && ~n(e(i), ["array", "object"]) ? t(a[r], i) : a[r] = i)
                        })
                    }), a
                },
                i = function(t, i) {
                    var n, a, r;
                    if (t)
                        if ("number" === e(t.length)) {
                            for (r = 0, n = t.length; n > r; r++)
                                if (!1 === i(t[r], r)) return
                        } else if ("object" === e(t))
                        for (a in t)
                            if (t.hasOwnProperty(a) && !1 === i(t[a], a)) return
                },
                n = function(e, t) {
                    if (t) {
                        if (Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e);
                        for (var i = 0, n = t.length; n > i; i++)
                            if (t[i] === e) return i
                    }
                    return -1
                };
            return {
                guid: function() {
                    var e = 0;
                    return function(t) {
                        var i, n = (new Date).getTime().toString(32);
                        for (i = 0; 5 > i; i++) n += Math.floor(65535 * Math.random()).toString(32);
                        return (t || "o_") + n + (e++).toString(32)
                    }
                }(),
                typeOf: e,
                extend: t,
                each: i,
                isEmptyObj: function(t) {
                    var i;
                    if (!t || "object" !== e(t)) return !0;
                    for (i in t) return !1;
                    return !0
                },
                inSeries: function(t, i) {
                    var n = t.length;
                    "function" !== e(i) && (i = function() {}), t && t.length || i(),
                        function a(r) {
                            "function" === e(t[r]) && t[r](function(e) {
                                ++r < n && !e ? a(r) : i(e)
                            })
                        }(0)
                },
                inParallel: function(e, t) {
                    var n = 0,
                        a = e.length,
                        r = new Array(a);
                    i(e, function(e, i) {
                        e(function(e) {
                            if (e) return t(e);
                            var s = [].slice.call(arguments);
                            s.shift(), r[i] = s, ++n === a && (r.unshift(null), t.apply(this, r))
                        })
                    })
                },
                inArray: n,
                arrayDiff: function(t, i) {
                    var a = [];
                    for (var r in "array" !== e(t) && (t = [t]), "array" !== e(i) && (i = [i]), t) - 1 === n(t[r], i) && a.push(t[r]);
                    return !!a.length && a
                },
                arrayIntersect: function(e, t) {
                    var a = [];
                    return i(e, function(e) {
                        -1 !== n(e, t) && a.push(e)
                    }), a.length ? a : null
                },
                toArray: function(e) {
                    var t, i = [];
                    for (t = 0; t < e.length; t++) i[t] = e[t];
                    return i
                },
                trim: function(e) {
                    return e ? String.prototype.trim ? String.prototype.trim.call(e) : e.toString().replace(/^\s*/, "").replace(/\s*$/, "") : e
                },
                sprintf: function(t) {
                    var i = [].slice.call(arguments, 1);
                    return t.replace(/%[a-z]/g, function() {
                        var t = i.shift();
                        return "undefined" !== e(t) ? t : ""
                    })
                },
                parseSizeStr: function(e) {
                    if ("string" != typeof e) return e;
                    var t, i = {
                        t: 1099511627776,
                        g: 1073741824,
                        m: 1048576,
                        k: 1024
                    };
                    return t = (e = /^([0-9\.]+)([tmgk]?)$/.exec(e.toLowerCase().replace(/[^0-9\.tmkg]/g, "")))[2], e = +e[1], i.hasOwnProperty(t) && (e *= i[t]), Math.floor(e)
                }
            }
        }), i(s, [r], function(e) {
            var t = function(e) {
                    var t = "function",
                        i = "object",
                        n = "name",
                        a = "version",
                        r = function(e, t) {
                            return -1 !== t.toLowerCase().indexOf(e.toLowerCase())
                        },
                        s = {
                            rgx: function() {
                                for (var n, a, r, s, o, d, u, l = 0, c = arguments; l < c.length; l += 2) {
                                    var _ = c[l],
                                        m = c[l + 1];
                                    if (void 0 === n)
                                        for (s in n = {}, m) typeof(o = m[s]) === i ? n[o[0]] = e : n[o] = e;
                                    for (a = r = 0; a < _.length; a++)
                                        if (d = _[a].exec(this.getUA())) {
                                            for (s = 0; s < m.length; s++) u = d[++r], typeof(o = m[s]) === i && o.length > 0 ? 2 == o.length ? typeof o[1] == t ? n[o[0]] = o[1].call(this, u) : n[o[0]] = o[1] : 3 == o.length ? typeof o[1] !== t || o[1].exec && o[1].test ? n[o[0]] = u ? u.replace(o[1], o[2]) : e : n[o[0]] = u ? o[1].call(this, u, o[2]) : e : 4 == o.length && (n[o[0]] = u ? o[3].call(this, u.replace(o[1], o[2])) : e) : n[o] = u || e;
                                            break
                                        }
                                    if (d) break
                                }
                                return n
                            },
                            str: function(t, n) {
                                for (var a in n)
                                    if (typeof n[a] === i && n[a].length > 0) {
                                        for (var s = 0; s < n[a].length; s++)
                                            if (r(n[a][s], t)) return "?" === a ? e : a
                                    } else if (r(n[a], t)) return "?" === a ? e : a;
                                return t
                            }
                        },
                        o = {
                            browser: {
                                oldsafari: {
                                    major: {
                                        1: ["/8", "/1", "/3"],
                                        2: "/4",
                                        "?": "/"
                                    },
                                    version: {
                                        "1.0": "/8",
                                        1.2: "/1",
                                        1.3: "/3",
                                        "2.0": "/412",
                                        "2.0.2": "/416",
                                        "2.0.3": "/417",
                                        "2.0.4": "/419",
                                        "?": "/"
                                    }
                                }
                            },
                            device: {
                                sprint: {
                                    model: {
                                        "Evo Shift 4G": "7373KT"
                                    },
                                    vendor: {
                                        HTC: "APA",
                                        Sprint: "Sprint"
                                    }
                                }
                            },
                            os: {
                                windows: {
                                    version: {
                                        ME: "4.90",
                                        "NT 3.11": "NT3.51",
                                        "NT 4.0": "NT4.0",
                                        2000: "NT 5.0",
                                        XP: ["NT 5.1", "NT 5.2"],
                                        Vista: "NT 6.0",
                                        7: "NT 6.1",
                                        8: "NT 6.2",
                                        8.1: "NT 6.3",
                                        RT: "ARM"
                                    }
                                }
                            }
                        },
                        d = {
                            browser: [
                                [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                                [n, a],
                                [/\s(opr)\/([\w\.]+)/i],
                                [
                                    [n, "Opera"], a
                                ],
                                [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i],
                                [n, a],
                                [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                                [
                                    [n, "IE"], a
                                ],
                                [/(edge)\/((\d+)?[\w\.]+)/i],
                                [n, a],
                                [/(yabrowser)\/([\w\.]+)/i],
                                [
                                    [n, "Yandex"], a
                                ],
                                [/(comodo_dragon)\/([\w\.]+)/i],
                                [
                                    [n, /_/g, " "], a
                                ],
                                [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],
                                [n, a],
                                [/(dolfin)\/([\w\.]+)/i],
                                [
                                    [n, "Dolphin"], a
                                ],
                                [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                                [
                                    [n, "Chrome"], a
                                ],
                                [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
                                [a, [n, "MIUI Browser"]],
                                [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
                                [a, [n, "Android Browser"]],
                                [/FBAV\/([\w\.]+);/i],
                                [a, [n, "Facebook"]],
                                [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                                [a, [n, "Mobile Safari"]],
                                [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                                [a, n],
                                [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                                [n, [a, s.str, o.browser.oldsafari.version]],
                                [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                                [n, a],
                                [/(navigator|netscape)\/([\w\.-]+)/i],
                                [
                                    [n, "Netscape"], a
                                ],
                                [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                                [n, a]
                            ],
                            engine: [
                                [/windows.+\sedge\/([\w\.]+)/i],
                                [a, [n, "EdgeHTML"]],
                                [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                                [n, a],
                                [/rv\:([\w\.]+).*(gecko)/i],
                                [a, n]
                            ],
                            os: [
                                [/microsoft\s(windows)\s(vista|xp)/i],
                                [n, a],
                                [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                                [n, [a, s.str, o.os.windows.version]],
                                [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                                [
                                    [n, "Windows"],
                                    [a, s.str, o.os.windows.version]
                                ],
                                [/\((bb)(10);/i],
                                [
                                    [n, "BlackBerry"], a
                                ],
                                [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i],
                                [n, a],
                                [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
                                [
                                    [n, "Symbian"], a
                                ],
                                [/\((series40);/i],
                                [n],
                                [/mozilla.+\(mobile;.+gecko.+firefox/i],
                                [
                                    [n, "Firefox OS"], a
                                ],
                                [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i],
                                [n, a],
                                [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                                [
                                    [n, "Chromium OS"], a
                                ],
                                [/(sunos)\s?([\w\.]+\d)*/i],
                                [
                                    [n, "Solaris"], a
                                ],
                                [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
                                [n, a],
                                [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],
                                [
                                    [n, "iOS"],
                                    [a, /_/g, "."]
                                ],
                                [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
                                [
                                    [n, "Mac OS"],
                                    [a, /_/g, "."]
                                ],
                                [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i],
                                [n, a]
                            ]
                        };
                    return function(e) {
                        var t = e || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : "");
                        this.getBrowser = function() {
                            return s.rgx.apply(this, d.browser)
                        }, this.getEngine = function() {
                            return s.rgx.apply(this, d.engine)
                        }, this.getOS = function() {
                            return s.rgx.apply(this, d.os)
                        }, this.getResult = function() {
                            return {
                                ua: this.getUA(),
                                browser: this.getBrowser(),
                                engine: this.getEngine(),
                                os: this.getOS()
                            }
                        }, this.getUA = function() {
                            return t
                        }, this.setUA = function(e) {
                            return t = e, this
                        }, this.setUA(t)
                    }
                }(),
                i = function() {
                    var t = {
                        define_property: !1,
                        create_canvas: function() {
                            var e = document.createElement("canvas");
                            return !(!e.getContext || !e.getContext("2d"))
                        }(),
                        return_response_type: function(t) {
                            try {
                                if (-1 !== e.inArray(t, ["", "text", "document"])) return !0;
                                if (window.XMLHttpRequest) {
                                    var i = new XMLHttpRequest;
                                    if (i.open("get", "/"), "responseType" in i) return i.responseType = t, i.responseType === t
                                }
                            } catch (e) {}
                            return !1
                        },
                        use_data_uri: function() {
                            var e = new Image;
                            return e.onload = function() {
                                t.use_data_uri = 1 === e.width && 1 === e.height
                            }, setTimeout(function() {
                                e.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                            }, 1), !1
                        }(),
                        use_data_uri_over32kb: function() {
                            return t.use_data_uri && ("IE" !== a.browser || a.version >= 9)
                        },
                        use_data_uri_of: function(e) {
                            return t.use_data_uri && 33e3 > e || t.use_data_uri_over32kb()
                        },
                        use_fileinput: function() {
                            if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
                            var e = document.createElement("input");
                            return e.setAttribute("type", "file"), !e.disabled
                        }
                    };
                    return function(i) {
                        var n = [].slice.call(arguments);
                        return n.shift(), "function" === e.typeOf(t[i]) ? t[i].apply(this, n) : !!t[i]
                    }
                }(),
                n = (new t).getResult(),
                a = {
                    can: i,
                    uaParser: t,
                    browser: n.browser.name,
                    version: n.browser.version,
                    os: n.os.name,
                    osVersion: n.os.version,
                    verComp: function(e, t, i) {
                        var n, a = 0,
                            r = 0,
                            s = {
                                dev: -6,
                                alpha: -5,
                                a: -5,
                                beta: -4,
                                b: -4,
                                RC: -3,
                                rc: -3,
                                "#": -2,
                                p: 1,
                                pl: 1
                            },
                            o = function(e) {
                                return (e = (e = ("" + e).replace(/[_\-+]/g, ".")).replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, ".")).length ? e.split(".") : [-8]
                            },
                            d = function(e) {
                                return e ? isNaN(e) ? s[e] || -7 : parseInt(e, 10) : 0
                            };
                        for (e = o(e), t = o(t), n = Math.max(e.length, t.length), a = 0; n > a; a++)
                            if (e[a] != t[a]) {
                                if (e[a] = d(e[a]), t[a] = d(t[a]), e[a] < t[a]) {
                                    r = -1;
                                    break
                                }
                                if (e[a] > t[a]) {
                                    r = 1;
                                    break
                                }
                            }
                        if (!i) return r;
                        switch (i) {
                            case ">":
                            case "gt":
                                return r > 0;
                            case ">=":
                            case "ge":
                                return r >= 0;
                            case "<=":
                            case "le":
                                return 0 >= r;
                            case "==":
                            case "=":
                            case "eq":
                                return 0 === r;
                            case "<>":
                            case "!=":
                            case "ne":
                                return 0 !== r;
                            case "":
                            case "<":
                            case "lt":
                                return 0 > r;
                            default:
                                return null
                        }
                    },
                    swf_url: "../flash/Moxie.swf",
                    xap_url: "../silverlight/Moxie.xap",
                    global_event_dispatcher: "moxie.core.EventTarget.instance.dispatchEvent"
                };
            return a.OS = a.os, a
        }), i(o, [r], function(e) {
            var t = {};
            return {
                addI18n: function(i) {
                    return e.extend(t, i)
                },
                translate: function(e) {
                    return t[e] || e
                },
                _: function(e) {
                    return this.translate(e)
                },
                sprintf: function(t) {
                    var i = [].slice.call(arguments, 1);
                    return t.replace(/%[a-z]/g, function() {
                        var t = i.shift();
                        return "undefined" !== e.typeOf(t) ? t : ""
                    })
                }
            }
        }), i(d, [r, o], function(e, t) {
            var i = {
                mimes: {},
                extensions: {},
                addMimeType: function(e) {
                    var t, i, n, a = e.split(/,/);
                    for (t = 0; t < a.length; t += 2) {
                        for (n = a[t + 1].split(/ /), i = 0; i < n.length; i++) this.mimes[n[i]] = a[t];
                        this.extensions[a[t]] = n
                    }
                },
                extList2mimes: function(t, i) {
                    var n, a, r, s, o = [];
                    for (a = 0; a < t.length; a++)
                        for (n = t[a].extensions.split(/\s*,\s*/), r = 0; r < n.length; r++) {
                            if ("*" === n[r]) return [];
                            if ((s = this.mimes[n[r]]) && -1 === e.inArray(s, o) && o.push(s), i && /^\w+$/.test(n[r])) o.push("." + n[r]);
                            else if (!s) return []
                        }
                    return o
                },
                mimes2exts: function(t) {
                    var i = this,
                        n = [];
                    return e.each(t, function(t) {
                        if ("*" === t) return n = [], !1;
                        var a = t.match(/^(\w+)\/(\*|\w+)$/);
                        a && ("*" === a[2] ? e.each(i.extensions, function(e, t) {
                            new RegExp("^" + a[1] + "/").test(t) && [].push.apply(n, i.extensions[t])
                        }) : i.extensions[t] && [].push.apply(n, i.extensions[t]))
                    }), n
                },
                mimes2extList: function(i) {
                    var n = [],
                        a = [];
                    return "string" === e.typeOf(i) && (i = e.trim(i).split(/\s*,\s*/)), a = this.mimes2exts(i), n.push({
                        title: t.translate("Files"),
                        extensions: a.length ? a.join(",") : "*"
                    }), n.mimes = i, n
                },
                getFileExtension: function(e) {
                    var t = e && e.match(/\.([^.]+)$/);
                    return t ? t[1].toLowerCase() : ""
                },
                getFileMime: function(e) {
                    return this.mimes[this.getFileExtension(e)] || ""
                }
            };
            return i.addMimeType("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mp3 mpga mpega mp2,audio/x-wav,wav,audio/x-m4a,m4a,audio/ogg,oga ogg,audio/aiff,aiff aif,audio/flac,flac,audio/aac,aac,audio/ac3,ac3,audio/x-ms-wma,wma,image/bmp,bmp,image/gif,gif,image/jpeg,jpg jpeg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gpp 3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,video/ogg,ogv,video/x-matroska,mkv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe"), i
        }), i(u, [s], function(e) {
            var t = function(e, t) {
                return !!e.className && new RegExp("(^|\\s+)" + t + "(\\s+|$)").test(e.className)
            };
            return {
                get: function(e) {
                    return "string" != typeof e ? e : document.getElementById(e)
                },
                hasClass: t,
                addClass: function(e, i) {
                    t(e, i) || (e.className = e.className ? e.className.replace(/\s+$/, "") + " " + i : i)
                },
                removeClass: function(e, t) {
                    if (e.className) {
                        var i = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
                        e.className = e.className.replace(i, function(e, t, i) {
                            return " " === t && " " === i ? " " : ""
                        })
                    }
                },
                getStyle: function(e, t) {
                    return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? window.getComputedStyle(e, null)[t] : void 0
                },
                getPos: function(t, i) {
                    function n(e) {
                        var t, i, n = 0,
                            a = 0;
                        return e && (i = e.getBoundingClientRect(), t = "CSS1Compat" === u.compatMode ? u.documentElement : u.body, n = i.left + t.scrollLeft, a = i.top + t.scrollTop), {
                            x: n,
                            y: a
                        }
                    }
                    var a, r, s, o = 0,
                        d = 0,
                        u = document;
                    if (t = t, i = i || u.body, t && t.getBoundingClientRect && "IE" === e.browser && (!u.documentMode || u.documentMode < 8)) return r = n(t), s = n(i), {
                        x: r.x - s.x,
                        y: r.y - s.y
                    };
                    for (a = t; a && a != i && a.nodeType;) o += a.offsetLeft || 0, d += a.offsetTop || 0, a = a.offsetParent;
                    for (a = t.parentNode; a && a != i && a.nodeType;) o -= a.scrollLeft || 0, d -= a.scrollTop || 0, a = a.parentNode;
                    return {
                        x: o,
                        y: d
                    }
                },
                getSize: function(e) {
                    return {
                        w: e.offsetWidth || e.clientWidth,
                        h: e.offsetHeight || e.clientHeight
                    }
                }
            }
        }), i(l, [r], function(e) {
            function t(e, t) {
                var i;
                for (i in e)
                    if (e[i] === t) return i;
                return null
            }
            return {
                RuntimeError: function() {
                    function i(e) {
                        this.code = e, this.name = t(n, e), this.message = this.name + ": RuntimeError " + this.code
                    }
                    var n = {
                        NOT_INIT_ERR: 1,
                        NOT_SUPPORTED_ERR: 9,
                        JS_ERR: 4
                    };
                    return e.extend(i, n), i.prototype = Error.prototype, i
                }(),
                OperationNotAllowedException: function() {
                    function t(e) {
                        this.code = e, this.name = "OperationNotAllowedException"
                    }
                    return e.extend(t, {
                        NOT_ALLOWED_ERR: 1
                    }), t.prototype = Error.prototype, t
                }(),
                ImageError: function() {
                    function i(e) {
                        this.code = e, this.name = t(n, e), this.message = this.name + ": ImageError " + this.code
                    }
                    var n = {
                        WRONG_FORMAT: 1,
                        MAX_RESOLUTION_ERR: 2,
                        INVALID_META_ERR: 3
                    };
                    return e.extend(i, n), i.prototype = Error.prototype, i
                }(),
                FileException: function() {
                    function i(e) {
                        this.code = e, this.name = t(n, e), this.message = this.name + ": FileException " + this.code
                    }
                    var n = {
                        NOT_FOUND_ERR: 1,
                        SECURITY_ERR: 2,
                        ABORT_ERR: 3,
                        NOT_READABLE_ERR: 4,
                        ENCODING_ERR: 5,
                        NO_MODIFICATION_ALLOWED_ERR: 6,
                        INVALID_STATE_ERR: 7,
                        SYNTAX_ERR: 8
                    };
                    return e.extend(i, n), i.prototype = Error.prototype, i
                }(),
                DOMException: function() {
                    function i(e) {
                        this.code = e, this.name = t(n, e), this.message = this.name + ": DOMException " + this.code
                    }
                    var n = {
                        INDEX_SIZE_ERR: 1,
                        DOMSTRING_SIZE_ERR: 2,
                        HIERARCHY_REQUEST_ERR: 3,
                        WRONG_DOCUMENT_ERR: 4,
                        INVALID_CHARACTER_ERR: 5,
                        NO_DATA_ALLOWED_ERR: 6,
                        NO_MODIFICATION_ALLOWED_ERR: 7,
                        NOT_FOUND_ERR: 8,
                        NOT_SUPPORTED_ERR: 9,
                        INUSE_ATTRIBUTE_ERR: 10,
                        INVALID_STATE_ERR: 11,
                        SYNTAX_ERR: 12,
                        INVALID_MODIFICATION_ERR: 13,
                        NAMESPACE_ERR: 14,
                        INVALID_ACCESS_ERR: 15,
                        VALIDATION_ERR: 16,
                        TYPE_MISMATCH_ERR: 17,
                        SECURITY_ERR: 18,
                        NETWORK_ERR: 19,
                        ABORT_ERR: 20,
                        URL_MISMATCH_ERR: 21,
                        QUOTA_EXCEEDED_ERR: 22,
                        TIMEOUT_ERR: 23,
                        INVALID_NODE_TYPE_ERR: 24,
                        DATA_CLONE_ERR: 25
                    };
                    return e.extend(i, n), i.prototype = Error.prototype, i
                }(),
                EventException: function() {
                    function t(e) {
                        this.code = e, this.name = "EventException"
                    }
                    return e.extend(t, {
                        UNSPECIFIED_EVENT_TYPE_ERR: 0
                    }), t.prototype = Error.prototype, t
                }()
            }
        }), i(c, [s, l, r], function(e, t, i) {
            function n() {
                var e = {};
                i.extend(this, {
                    uid: null,
                    init: function() {
                        this.uid || (this.uid = i.guid("uid_"))
                    },
                    addEventListener: function(t, n, a, r) {
                        var s, o = this;
                        return this.hasOwnProperty("uid") || (this.uid = i.guid("uid_")), t = i.trim(t), /\s/.test(t) ? void i.each(t.split(/\s+/), function(e) {
                            o.addEventListener(e, n, a, r)
                        }) : (t = t.toLowerCase(), a = parseInt(a, 10) || 0, (s = e[this.uid] && e[this.uid][t] || []).push({
                            fn: n,
                            priority: a,
                            scope: r || this
                        }), e[this.uid] || (e[this.uid] = {}), void(e[this.uid][t] = s))
                    },
                    hasEventListener: function(t) {
                        var i = t ? e[this.uid] && e[this.uid][t] : e[this.uid];
                        return i || !1
                    },
                    removeEventListener: function(t, n) {
                        t = t.toLowerCase();
                        var a, r = e[this.uid] && e[this.uid][t];
                        if (r) {
                            if (n) {
                                for (a = r.length - 1; a >= 0; a--)
                                    if (r[a].fn === n) {
                                        r.splice(a, 1);
                                        break
                                    }
                            } else r = [];
                            r.length || (delete e[this.uid][t], i.isEmptyObj(e[this.uid]) && delete e[this.uid])
                        }
                    },
                    removeAllEventListeners: function() {
                        e[this.uid] && delete e[this.uid]
                    },
                    dispatchEvent: function(n) {
                        var a, r, s, o, d, u = {},
                            l = !0;
                        if ("string" !== i.typeOf(n)) {
                            if (o = n, "string" !== i.typeOf(o.type)) throw new t.EventException(t.EventException.UNSPECIFIED_EVENT_TYPE_ERR);
                            n = o.type, o.total !== d && o.loaded !== d && (u.total = o.total, u.loaded = o.loaded), u.async = o.async || !1
                        }
                        if (-1 !== n.indexOf("::") ? function(e) {
                                a = e[0], n = e[1]
                            }(n.split("::")) : a = this.uid, n = n.toLowerCase(), r = e[a] && e[a][n]) {
                            r.sort(function(e, t) {
                                return t.priority - e.priority
                            }), (s = [].slice.call(arguments)).shift(), u.type = n, s.unshift(u);
                            var c = [];
                            i.each(r, function(e) {
                                s[0].target = e.scope, u.async ? c.push(function(t) {
                                    setTimeout(function() {
                                        t(!1 === e.fn.apply(e.scope, s))
                                    }, 1)
                                }) : c.push(function(t) {
                                    t(!1 === e.fn.apply(e.scope, s))
                                })
                            }), c.length && i.inSeries(c, function(e) {
                                l = !e
                            })
                        }
                        return l
                    },
                    bind: function() {
                        this.addEventListener.apply(this, arguments)
                    },
                    unbind: function() {
                        this.removeEventListener.apply(this, arguments)
                    },
                    unbindAll: function() {
                        this.removeAllEventListeners.apply(this, arguments)
                    },
                    trigger: function() {
                        return this.dispatchEvent.apply(this, arguments)
                    },
                    handleEventProps: function(e) {
                        var t = this;
                        this.bind(e.join(" "), function(e) {
                            var t = "on" + e.type.toLowerCase();
                            "function" === i.typeOf(this[t]) && this[t].apply(this, arguments)
                        }), i.each(e, function(e) {
                            e = "on" + e.toLowerCase(e), "undefined" === i.typeOf(t[e]) && (t[e] = null)
                        })
                    }
                })
            }
            return n.instance = new n, n
        }), i(_, [s, r, u, c], function(e, t, i, n) {
            function a(e, n, r, o, d) {
                var u, l = this,
                    c = t.guid(n + "_"),
                    _ = d || "browser";
                e = e || {}, s[c] = this, r = t.extend({
                    access_binary: !1,
                    access_image_binary: !1,
                    display_media: !1,
                    do_cors: !1,
                    drag_and_drop: !1,
                    filter_by_extension: !0,
                    resize_image: !1,
                    report_upload_progress: !1,
                    return_response_headers: !1,
                    return_response_type: !1,
                    return_status_code: !0,
                    send_custom_headers: !1,
                    select_file: !1,
                    select_folder: !1,
                    select_multiple: !0,
                    send_binary_string: !1,
                    send_browser_cookies: !0,
                    send_multipart: !0,
                    slice_blob: !1,
                    stream_upload: !1,
                    summon_file_dialog: !1,
                    upload_filesize: !0,
                    use_http_method: !0
                }, r), e.preferred_caps && (_ = a.getMode(o, e.preferred_caps, _)), u = function() {
                    var e = {};
                    return {
                        exec: function(t, i, n, a) {
                            return u[i] && (e[t] || (e[t] = {
                                context: this,
                                instance: new u[i]
                            }), e[t].instance[n]) ? e[t].instance[n].apply(this, a) : void 0
                        },
                        removeInstance: function(t) {
                            delete e[t]
                        },
                        removeAllInstances: function() {
                            var i = this;
                            t.each(e, function(e, n) {
                                "function" === t.typeOf(e.instance.destroy) && e.instance.destroy.call(e.context), i.removeInstance(n)
                            })
                        }
                    }
                }(), t.extend(this, {
                    initialized: !1,
                    uid: c,
                    type: n,
                    mode: a.getMode(o, e.required_caps, _),
                    shimid: c + "_container",
                    clients: 0,
                    options: e,
                    can: function(e, i) {
                        var n = arguments[2] || r;
                        if ("string" === t.typeOf(e) && "undefined" === t.typeOf(i) && (e = a.parseCaps(e)), "object" === t.typeOf(e)) {
                            for (var s in e)
                                if (!this.can(s, e[s], n)) return !1;
                            return !0
                        }
                        return "function" === t.typeOf(n[e]) ? n[e].call(this, i) : i === n[e]
                    },
                    getShimContainer: function() {
                        var e, n = i.get(this.shimid);
                        return n || (e = this.options.container ? i.get(this.options.container) : document.body, (n = document.createElement("div")).id = this.shimid, n.className = "moxie-shim moxie-shim-" + this.type, t.extend(n.style, {
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            width: "1px",
                            height: "1px",
                            overflow: "hidden"
                        }), e.appendChild(n), e = null), n
                    },
                    getShim: function() {
                        return u
                    },
                    shimExec: function(e, t) {
                        var i = [].slice.call(arguments, 2);
                        return l.getShim().exec.call(this, this.uid, e, t, i)
                    },
                    exec: function(e, t) {
                        var i = [].slice.call(arguments, 2);
                        return l[e] && l[e][t] ? l[e][t].apply(this, i) : l.shimExec.apply(this, arguments)
                    },
                    destroy: function() {
                        if (l) {
                            var e = i.get(this.shimid);
                            e && e.parentNode.removeChild(e), u && u.removeAllInstances(), this.unbindAll(), delete s[this.uid], this.uid = null, c = l = u = e = null
                        }
                    }
                }), this.mode && e.required_caps && !this.can(e.required_caps) && (this.mode = !1)
            }
            var r = {},
                s = {};
            return a.order = "html5,flash,silverlight,html4", a.getRuntime = function(e) {
                return !!s[e] && s[e]
            }, a.addConstructor = function(e, t) {
                t.prototype = n.instance, r[e] = t
            }, a.getConstructor = function(e) {
                return r[e] || null
            }, a.getInfo = function(e) {
                var t = a.getRuntime(e);
                return t ? {
                    uid: t.uid,
                    type: t.type,
                    mode: t.mode,
                    can: function() {
                        return t.can.apply(t, arguments)
                    }
                } : null
            }, a.parseCaps = function(e) {
                var i = {};
                return "string" !== t.typeOf(e) ? e || {} : (t.each(e.split(","), function(e) {
                    i[e] = !0
                }), i)
            }, a.can = function(e, t) {
                var i, n, r = a.getConstructor(e);
                return !!r && (n = (i = new r({
                    required_caps: t
                })).mode, i.destroy(), !!n)
            }, a.thatCan = function(e, t) {
                var i = (t || a.order).split(/\s*,\s*/);
                for (var n in i)
                    if (a.can(i[n], e)) return i[n];
                return null
            }, a.getMode = function(e, i, n) {
                var a = null;
                if ("undefined" === t.typeOf(n) && (n = "browser"), i && !t.isEmptyObj(e)) {
                    if (t.each(i, function(i, n) {
                            if (e.hasOwnProperty(n)) {
                                var r = e[n](i);
                                if ("string" == typeof r && (r = [r]), a) {
                                    if (!(a = t.arrayIntersect(a, r))) return a = !1
                                } else a = r
                            }
                        }), a) return -1 !== t.inArray(n, a) ? n : a[0];
                    if (!1 === a) return !1
                }
                return n
            }, a.capTrue = function() {
                return !0
            }, a.capFalse = function() {
                return !1
            }, a.capTest = function(e) {
                return function() {
                    return !!e
                }
            }, a
        }), i(m, [s, l, r, _], function(e, t, i, n) {
            return function() {
                var e;
                i.extend(this, {
                    connectRuntime: function(a) {
                        var r, s = this;
                        if ("string" === i.typeOf(a) ? r = a : "string" === i.typeOf(a.ruid) && (r = a.ruid), r) {
                            if (e = n.getRuntime(r)) return e.clients++, e;
                            throw new t.RuntimeError(t.RuntimeError.NOT_INIT_ERR)
                        }! function i(r) {
                            var o, d;
                            return r.length ? (o = r.shift().toLowerCase(), (d = n.getConstructor(o)) ? ((e = new d(a)).bind("Init", function() {
                                e.initialized = !0, setTimeout(function() {
                                    e.clients++, s.trigger("RuntimeInit", e)
                                }, 1)
                            }), e.bind("Error", function() {
                                e.destroy(), i(r)
                            }), e.mode ? void e.init() : void e.trigger("Error")) : void i(r)) : (s.trigger("RuntimeError", new t.RuntimeError(t.RuntimeError.NOT_INIT_ERR)), void(e = null))
                        }((a.runtime_order || n.order).split(/\s*,\s*/))
                    },
                    disconnectRuntime: function() {
                        e && --e.clients <= 0 && e.destroy(), e = null
                    },
                    getRuntime: function() {
                        return e && e.uid ? e : e = null
                    },
                    exec: function() {
                        return e ? e.exec.apply(this, arguments) : null
                    }
                })
            }
        }), i(h, [r, s, d, u, l, c, o, _, m], function(e, t, i, n, a, r, s, o, d) {
            function u(t) {
                var r, u, c, _ = this;
                if (-1 !== e.inArray(e.typeOf(t), ["string", "node"]) && (t = {
                        browse_button: t
                    }), !(u = n.get(t.browse_button))) throw new a.DOMException(a.DOMException.NOT_FOUND_ERR);
                c = {
                    accept: [{
                        title: s.translate("All Files"),
                        extensions: "*"
                    }],
                    name: "file",
                    multiple: !1,
                    required_caps: !1,
                    container: u.parentNode || document.body
                }, "string" == typeof(t = e.extend({}, c, t)).required_caps && (t.required_caps = o.parseCaps(t.required_caps)), "string" == typeof t.accept && (t.accept = i.mimes2extList(t.accept)), (r = n.get(t.container)) || (r = document.body), "static" === n.getStyle(r, "position") && (r.style.position = "relative"), r = u = null, d.call(_), e.extend(_, {
                    uid: e.guid("uid_"),
                    ruid: null,
                    shimid: null,
                    files: null,
                    init: function() {
                        _.bind("RuntimeInit", function(i, a) {
                            _.ruid = a.uid, _.shimid = a.shimid, _.bind("Ready", function() {
                                _.trigger("Refresh")
                            }, 999), _.bind("Refresh", function() {
                                var i, r, s, o;
                                s = n.get(t.browse_button), o = n.get(a.shimid), s && (i = n.getPos(s, n.get(t.container)), r = n.getSize(s), o && e.extend(o.style, {
                                    top: i.y + "px",
                                    left: i.x + "px",
                                    width: r.w + "px",
                                    height: r.h + "px"
                                })), o = s = null
                            }), a.exec.call(_, "FileInput", "init", t)
                        }), _.connectRuntime(e.extend({}, t, {
                            required_caps: {
                                select_file: !0
                            }
                        }))
                    },
                    disable: function(t) {
                        var i = this.getRuntime();
                        i && i.exec.call(this, "FileInput", "disable", "undefined" === e.typeOf(t) || t)
                    },
                    refresh: function() {
                        _.trigger("Refresh")
                    },
                    destroy: function() {
                        var t = this.getRuntime();
                        t && (t.exec.call(this, "FileInput", "destroy"), this.disconnectRuntime()), "array" === e.typeOf(this.files) && e.each(this.files, function(e) {
                            e.destroy()
                        }), this.files = null, this.unbindAll()
                    }
                }), this.handleEventProps(l)
            }
            var l = ["ready", "change", "cancel", "mouseenter", "mouseleave", "mousedown", "mouseup"];
            return u.prototype = r.instance, u
        }), i(p, [], function() {
            var e = function(e) {
                    return unescape(encodeURIComponent(e))
                },
                t = function(e) {
                    return decodeURIComponent(escape(e))
                };
            return {
                utf8_encode: e,
                utf8_decode: t,
                atob: function(e, i) {
                    if ("function" == typeof window.atob) return i ? t(window.atob(e)) : window.atob(e);
                    var n, a, r, s, o, d, u, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        c = 0,
                        _ = 0,
                        m = [];
                    if (!e) return e;
                    e += "";
                    do {
                        n = (d = l.indexOf(e.charAt(c++)) << 18 | l.indexOf(e.charAt(c++)) << 12 | (s = l.indexOf(e.charAt(c++))) << 6 | (o = l.indexOf(e.charAt(c++)))) >> 16 & 255, a = d >> 8 & 255, r = 255 & d, m[_++] = 64 == s ? String.fromCharCode(n) : 64 == o ? String.fromCharCode(n, a) : String.fromCharCode(n, a, r)
                    } while (c < e.length);
                    return u = m.join(""), i ? t(u) : u
                },
                btoa: function(t, i) {
                    if (i && (t = e(t)), "function" == typeof window.btoa) return window.btoa(t);
                    var n, a, r, s, o, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        u = 0,
                        l = 0,
                        c = "",
                        _ = [];
                    if (!t) return t;
                    do {
                        n = (o = t.charCodeAt(u++) << 16 | t.charCodeAt(u++) << 8 | t.charCodeAt(u++)) >> 18 & 63, a = o >> 12 & 63, r = o >> 6 & 63, s = 63 & o, _[l++] = d.charAt(n) + d.charAt(a) + d.charAt(r) + d.charAt(s)
                    } while (u < t.length);
                    c = _.join("");
                    var m = t.length % 3;
                    return (m ? c.slice(0, m - 3) : c) + "===".slice(m || 3)
                }
            }
        }), i(f, [r, p, m], function(e, t, i) {
            var n = {};
            return function a(r, s) {
                function o(t, i, r) {
                    var s, o = n[this.uid];
                    return "string" === e.typeOf(o) && o.length ? ((s = new a(null, {
                        type: r,
                        size: i - t
                    })).detach(o.substr(t, s.size)), s) : null
                }
                i.call(this), r && this.connectRuntime(r), s ? "string" === e.typeOf(s) && (s = {
                    data: s
                }) : s = {}, e.extend(this, {
                    uid: s.uid || e.guid("uid_"),
                    ruid: r,
                    size: s.size || 0,
                    type: s.type || "",
                    slice: function(e, t, i) {
                        return this.isDetached() ? o.apply(this, arguments) : this.getRuntime().exec.call(this, "Blob", "slice", this.getSource(), e, t, i)
                    },
                    getSource: function() {
                        return n[this.uid] ? n[this.uid] : null
                    },
                    detach: function(e) {
                        if (this.ruid && (this.getRuntime().exec.call(this, "Blob", "destroy"), this.disconnectRuntime(), this.ruid = null), "data:" == (e = e || "").substr(0, 5)) {
                            var i = e.indexOf(";base64,");
                            this.type = e.substring(5, i), e = t.atob(e.substring(i + 8))
                        }
                        this.size = e.length, n[this.uid] = e
                    },
                    isDetached: function() {
                        return !this.ruid && "string" === e.typeOf(n[this.uid])
                    },
                    destroy: function() {
                        this.detach(), delete n[this.uid]
                    }
                }), s.data ? this.detach(s.data) : n[this.uid] = s
            }
        }), i(g, [r, d, f], function(e, t, i) {
            function n(n, a) {
                var r;
                if (a || (a = {}), i.apply(this, arguments), this.type || (this.type = t.getFileMime(a.name)), a.name) r = (r = a.name.replace(/\\/g, "/")).substr(r.lastIndexOf("/") + 1);
                else if (this.type) {
                    var s = this.type.split("/")[0];
                    r = e.guid(("" !== s ? s : "file") + "_"), t.extensions[this.type] && (r += "." + t.extensions[this.type][0])
                }
                e.extend(this, {
                    name: r || e.guid("file_"),
                    relativePath: "",
                    lastModifiedDate: a.lastModifiedDate || (new Date).toLocaleString()
                })
            }
            return n.prototype = i.prototype, n
        }), i(y, [o, u, l, r, s, g, m, c, d], function(e, t, i, n, a, r, s, o, d) {
            function u(i) {
                var a, r = this;
                "string" == typeof i && (i = {
                    drop_zone: i
                }), a = {
                    accept: [{
                        title: e.translate("All Files"),
                        extensions: "*"
                    }],
                    required_caps: {
                        drag_and_drop: !0
                    }
                }, (i = "object" == typeof i ? n.extend({}, a, i) : a).container = t.get(i.drop_zone) || document.body, "static" === t.getStyle(i.container, "position") && (i.container.style.position = "relative"), "string" == typeof i.accept && (i.accept = d.mimes2extList(i.accept)), s.call(r), n.extend(r, {
                    uid: n.guid("uid_"),
                    ruid: null,
                    files: null,
                    init: function() {
                        r.bind("RuntimeInit", function(e, t) {
                            r.ruid = t.uid, t.exec.call(r, "FileDrop", "init", i), r.dispatchEvent("ready")
                        }), r.connectRuntime(i)
                    },
                    destroy: function() {
                        var e = this.getRuntime();
                        e && (e.exec.call(this, "FileDrop", "destroy"), this.disconnectRuntime()), this.files = null, this.unbindAll()
                    }
                }), this.handleEventProps(l)
            }
            var l = ["ready", "dragenter", "dragleave", "drop", "error"];
            return u.prototype = o.instance, u
        }), i(M, [r, p, l, c, f, m], function(e, t, i, n, a, r) {
            function s() {
                function n(e, n) {
                    if (this.trigger("loadstart"), this.readyState === s.LOADING) return this.trigger("error", new i.DOMException(i.DOMException.INVALID_STATE_ERR)), void this.trigger("loadend");
                    if (!(n instanceof a)) return this.trigger("error", new i.DOMException(i.DOMException.NOT_FOUND_ERR)), void this.trigger("loadend");
                    if (this.result = null, this.readyState = s.LOADING, n.isDetached()) {
                        var r = n.getSource();
                        switch (e) {
                            case "readAsText":
                            case "readAsBinaryString":
                                this.result = r;
                                break;
                            case "readAsDataURL":
                                this.result = "data:" + n.type + ";base64," + t.btoa(r)
                        }
                        this.readyState = s.DONE, this.trigger("load"), this.trigger("loadend")
                    } else this.connectRuntime(n.ruid), this.exec("FileReader", "read", e, n)
                }
                r.call(this), e.extend(this, {
                    uid: e.guid("uid_"),
                    readyState: s.EMPTY,
                    result: null,
                    error: null,
                    readAsBinaryString: function(e) {
                        n.call(this, "readAsBinaryString", e)
                    },
                    readAsDataURL: function(e) {
                        n.call(this, "readAsDataURL", e)
                    },
                    readAsText: function(e) {
                        n.call(this, "readAsText", e)
                    },
                    abort: function() {
                        this.result = null, -1 === e.inArray(this.readyState, [s.EMPTY, s.DONE]) && (this.readyState === s.LOADING && (this.readyState = s.DONE), this.exec("FileReader", "abort"), this.trigger("abort"), this.trigger("loadend"))
                    },
                    destroy: function() {
                        this.abort(), this.exec("FileReader", "destroy"), this.disconnectRuntime(), this.unbindAll()
                    }
                }), this.handleEventProps(o), this.bind("Error", function(e, t) {
                    this.readyState = s.DONE, this.error = t
                }, 999), this.bind("Load", function(e) {
                    this.readyState = s.DONE
                }, 999)
            }
            var o = ["loadstart", "progress", "load", "abort", "error", "loadend"];
            return s.EMPTY = 0, s.LOADING = 1, s.DONE = 2, s.prototype = n.instance, s
        }), i(v, [], function() {
            var e = function(t, i) {
                for (var n = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], a = n.length, r = {}, s = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/.exec(t || ""); a--;) s[a] && (r[n[a]] = s[a]);
                if (!r.scheme) {
                    i && "string" != typeof i || (i = e(i || document.location.href)), r.scheme = i.scheme, r.host = i.host, r.port = i.port;
                    var o = "";
                    /^[^\/]/.test(r.path) && (o = i.path, o = /\/[^\/]*\.[^\/]*$/.test(o) ? o.replace(/\/[^\/]+$/, "/") : o.replace(/\/?$/, "/")), r.path = o + (r.path || "")
                }
                return r.port || (r.port = {
                    http: 80,
                    https: 443
                }[r.scheme] || 80), r.port = parseInt(r.port, 10), r.path || (r.path = "/"), delete r.source, r
            };
            return {
                parseUrl: e,
                resolveUrl: function(t) {
                    var i = "object" == typeof t ? t : e(t);
                    return i.scheme + "://" + i.host + (i.port !== {
                        http: 80,
                        https: 443
                    }[i.scheme] ? ":" + i.port : "") + i.path + (i.query ? i.query : "")
                },
                hasSameOrigin: function(t) {
                    function i(e) {
                        return [e.scheme, e.host, e.port].join("/")
                    }
                    return "string" == typeof t && (t = e(t)), i(e()) === i(t)
                }
            }
        }), i(L, [r, m, c], function(e, t, i) {
            function n() {
                this.uid = e.guid("uid_"), t.call(this), this.destroy = function() {
                    this.disconnectRuntime(), this.unbindAll()
                }
            }
            return n.prototype = i.instance, n
        }), i(w, [r, m, p], function(e, t, i) {
            return function() {
                function n(e, t) {
                    if (!t.isDetached()) {
                        var n = this.connectRuntime(t.ruid).exec.call(this, "FileReaderSync", "read", e, t);
                        return this.disconnectRuntime(), n
                    }
                    var a = t.getSource();
                    switch (e) {
                        case "readAsBinaryString":
                            return a;
                        case "readAsDataURL":
                            return "data:" + t.type + ";base64," + i.btoa(a);
                        case "readAsText":
                            for (var r = "", s = 0, o = a.length; o > s; s++) r += String.fromCharCode(a[s]);
                            return r
                    }
                }
                t.call(this), e.extend(this, {
                    uid: e.guid("uid_"),
                    readAsBinaryString: function(e) {
                        return n.call(this, "readAsBinaryString", e)
                    },
                    readAsDataURL: function(e) {
                        return n.call(this, "readAsDataURL", e)
                    },
                    readAsText: function(e) {
                        return n.call(this, "readAsText", e)
                    }
                })
            }
        }), i(b, [l, r, f], function(e, t, i) {
            return function() {
                var e, n = [];
                t.extend(this, {
                    append: function(a, r) {
                        var s = this,
                            o = t.typeOf(r);
                        r instanceof i ? e = {
                            name: a,
                            value: r
                        } : "array" === o ? (a += "[]", t.each(r, function(e) {
                            s.append(a, e)
                        })) : "object" === o ? t.each(r, function(e, t) {
                            s.append(a + "[" + t + "]", e)
                        }) : "null" === o || "undefined" === o || "number" === o && isNaN(r) ? s.append(a, "false") : n.push({
                            name: a,
                            value: r.toString()
                        })
                    },
                    hasBlob: function() {
                        return !!this.getBlob()
                    },
                    getBlob: function() {
                        return e && e.value || null
                    },
                    getBlobName: function() {
                        return e && e.name || null
                    },
                    each: function(i) {
                        t.each(n, function(e) {
                            i(e.value, e.name)
                        }), e && i(e.value, e.name)
                    },
                    destroy: function() {
                        e = null, n = []
                    }
                })
            }
        }), i(k, [r, l, c, p, v, _, L, f, w, b, s, d], function(e, t, i, n, a, r, s, o, d, u, l, c) {
            function _() {
                this.uid = e.guid("uid_")
            }

            function m() {
                function i(e, t) {
                    return b.hasOwnProperty(e) ? 1 === arguments.length ? l.can("define_property") ? b[e] : w[e] : void(l.can("define_property") ? b[e] = t : w[e] = t) : void 0
                }

                function d(t) {
                    function n() {
                        v && (v.destroy(), v = null), o.dispatchEvent("loadend"), o = null
                    }

                    function a(a) {
                        v.bind("LoadStart", function(e) {
                            i("readyState", m.LOADING), o.dispatchEvent("readystatechange"), o.dispatchEvent(e), x && o.upload.dispatchEvent(e)
                        }), v.bind("Progress", function(e) {
                            i("readyState") !== m.LOADING && (i("readyState", m.LOADING), o.dispatchEvent("readystatechange")), o.dispatchEvent(e)
                        }), v.bind("UploadProgress", function(e) {
                            x && o.upload.dispatchEvent({
                                type: "progress",
                                lengthComputable: !1,
                                total: e.total,
                                loaded: e.loaded
                            })
                        }), v.bind("Load", function(t) {
                            i("readyState", m.DONE), i("status", Number(a.exec.call(v, "XMLHttpRequest", "getStatus") || 0)), i("statusText", h[i("status")] || ""), i("response", a.exec.call(v, "XMLHttpRequest", "getResponse", i("responseType"))), ~e.inArray(i("responseType"), ["text", ""]) ? i("responseText", i("response")) : "document" === i("responseType") && i("responseXML", i("response")), P = a.exec.call(v, "XMLHttpRequest", "getAllResponseHeaders"), o.dispatchEvent("readystatechange"), i("status") > 0 ? (x && o.upload.dispatchEvent(t), o.dispatchEvent(t)) : (H = !0, o.dispatchEvent("error")), n()
                        }), v.bind("Abort", function(e) {
                            o.dispatchEvent(e), n()
                        }), v.bind("Error", function(e) {
                            H = !0, i("readyState", m.DONE), o.dispatchEvent("readystatechange"), E = !0, o.dispatchEvent(e), n()
                        }), a.exec.call(v, "XMLHttpRequest", "send", {
                            url: f,
                            method: g,
                            async: k,
                            user: y,
                            password: M,
                            headers: Y,
                            mimeType: D,
                            encoding: T,
                            responseType: o.responseType,
                            withCredentials: o.withCredentials,
                            options: C
                        }, t)
                    }
                    var o = this;
                    (new Date).getTime(), v = new s, "string" == typeof C.required_caps && (C.required_caps = r.parseCaps(C.required_caps)), C.required_caps = e.extend({}, C.required_caps, {
                        return_response_type: o.responseType
                    }), t instanceof u && (C.required_caps.send_multipart = !0), e.isEmptyObj(Y) || (C.required_caps.send_custom_headers = !0), O || (C.required_caps.do_cors = !0), C.ruid ? a(v.connectRuntime(C)) : (v.bind("RuntimeInit", function(e, t) {
                        a(t)
                    }), v.bind("RuntimeError", function(e, t) {
                        o.dispatchEvent("RuntimeError", t)
                    }), v.connectRuntime(C))
                }
                var f, g, y, M, v, L, w = this,
                    b = {
                        timeout: 0,
                        readyState: m.UNSENT,
                        withCredentials: !1,
                        status: 0,
                        statusText: "",
                        responseType: "",
                        responseXML: null,
                        responseText: null,
                        response: null
                    },
                    k = !0,
                    Y = {},
                    T = null,
                    D = null,
                    A = !1,
                    S = !1,
                    x = !1,
                    E = !1,
                    H = !1,
                    O = !1,
                    C = {},
                    P = "";
                e.extend(this, b, {
                    uid: e.guid("uid_"),
                    upload: new _,
                    open: function(r, s, o, d, u) {
                        var l;
                        if (!r || !s) throw new t.DOMException(t.DOMException.SYNTAX_ERR);
                        if (/[\u0100-\uffff]/.test(r) || n.utf8_encode(r) !== r) throw new t.DOMException(t.DOMException.SYNTAX_ERR);
                        if (~e.inArray(r.toUpperCase(), ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT", "TRACE", "TRACK"]) && (g = r.toUpperCase()), ~e.inArray(g, ["CONNECT", "TRACE", "TRACK"])) throw new t.DOMException(t.DOMException.SECURITY_ERR);
                        if (s = n.utf8_encode(s), l = a.parseUrl(s), O = a.hasSameOrigin(l), f = a.resolveUrl(s), (d || u) && !O) throw new t.DOMException(t.DOMException.INVALID_ACCESS_ERR);
                        if (y = d || l.user, M = u || l.pass, !1 === (k = o || !0) && (i("timeout") || i("withCredentials") || "" !== i("responseType"))) throw new t.DOMException(t.DOMException.INVALID_ACCESS_ERR);
                        A = !k, S = !1, Y = {},
                            function() {
                                i("responseText", ""), i("responseXML", null), i("response", null), i("status", 0), i("statusText", ""), null
                            }.call(this), i("readyState", m.OPENED), this.dispatchEvent("readystatechange")
                    },
                    setRequestHeader: function(a, r) {
                        if (i("readyState") !== m.OPENED || S) throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);
                        if (/[\u0100-\uffff]/.test(a) || n.utf8_encode(a) !== a) throw new t.DOMException(t.DOMException.SYNTAX_ERR);
                        return a = e.trim(a).toLowerCase(), !~e.inArray(a, ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"]) && !/^(proxy\-|sec\-)/.test(a) && (Y[a] ? Y[a] += ", " + r : Y[a] = r, !0)
                    },
                    getAllResponseHeaders: function() {
                        return P || ""
                    },
                    getResponseHeader: function(t) {
                        return t = t.toLowerCase(), H || ~e.inArray(t, ["set-cookie", "set-cookie2"]) ? null : P && "" !== P && (L || (L = {}, e.each(P.split(/\r\n/), function(t) {
                            var i = t.split(/:\s+/);
                            2 === i.length && (i[0] = e.trim(i[0]), L[i[0].toLowerCase()] = {
                                header: i[0],
                                value: e.trim(i[1])
                            })
                        })), L.hasOwnProperty(t)) ? L[t].header + ": " + L[t].value : null
                    },
                    overrideMimeType: function(n) {
                        var a, r;
                        if (~e.inArray(i("readyState"), [m.LOADING, m.DONE])) throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);
                        if (n = e.trim(n.toLowerCase()), /;/.test(n) && (a = n.match(/^([^;]+)(?:;\scharset\=)?(.*)$/)) && (n = a[1], a[2] && (r = a[2])), !c.mimes[n]) throw new t.DOMException(t.DOMException.SYNTAX_ERR);
                        n, r
                    },
                    send: function(i, a) {
                        if (C = "string" === e.typeOf(a) ? {
                                ruid: a
                            } : a || {}, this.readyState !== m.OPENED || S) throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);
                        if (i instanceof o) C.ruid = i.ruid, D = i.type || "application/octet-stream";
                        else if (i instanceof u) {
                            if (i.hasBlob()) {
                                var r = i.getBlob();
                                C.ruid = r.ruid, D = r.type || "application/octet-stream"
                            }
                        } else "string" == typeof i && (T = "UTF-8", D = "text/plain;charset=UTF-8", i = n.utf8_encode(i));
                        this.withCredentials || (this.withCredentials = C.required_caps && C.required_caps.send_browser_cookies && !O), x = !A && this.upload.hasEventListener(), H = !1, E = !i, A || (S = !0), d.call(this, i)
                    },
                    abort: function() {
                        if (H = !0, A = !1, ~e.inArray(i("readyState"), [m.UNSENT, m.OPENED, m.DONE])) i("readyState", m.UNSENT);
                        else {
                            if (i("readyState", m.DONE), S = !1, !v) throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);
                            v.getRuntime().exec.call(v, "XMLHttpRequest", "abort", E), E = !0
                        }
                    },
                    destroy: function() {
                        v && ("function" === e.typeOf(v.destroy) && v.destroy(), v = null), this.unbindAll(), this.upload && (this.upload.unbindAll(), this.upload = null)
                    }
                }), this.handleEventProps(p.concat(["readystatechange"])), this.upload.handleEventProps(p)
            }
            var h = {
                100: "Continue",
                101: "Switching Protocols",
                102: "Processing",
                200: "OK",
                201: "Created",
                202: "Accepted",
                203: "Non-Authoritative Information",
                204: "No Content",
                205: "Reset Content",
                206: "Partial Content",
                207: "Multi-Status",
                226: "IM Used",
                300: "Multiple Choices",
                301: "Moved Permanently",
                302: "Found",
                303: "See Other",
                304: "Not Modified",
                305: "Use Proxy",
                306: "Reserved",
                307: "Temporary Redirect",
                400: "Bad Request",
                401: "Unauthorized",
                402: "Payment Required",
                403: "Forbidden",
                404: "Not Found",
                405: "Method Not Allowed",
                406: "Not Acceptable",
                407: "Proxy Authentication Required",
                408: "Request Timeout",
                409: "Conflict",
                410: "Gone",
                411: "Length Required",
                412: "Precondition Failed",
                413: "Request Entity Too Large",
                414: "Request-URI Too Long",
                415: "Unsupported Media Type",
                416: "Requested Range Not Satisfiable",
                417: "Expectation Failed",
                422: "Unprocessable Entity",
                423: "Locked",
                424: "Failed Dependency",
                426: "Upgrade Required",
                500: "Internal Server Error",
                501: "Not Implemented",
                502: "Bad Gateway",
                503: "Service Unavailable",
                504: "Gateway Timeout",
                505: "HTTP Version Not Supported",
                506: "Variant Also Negotiates",
                507: "Insufficient Storage",
                510: "Not Extended"
            };
            _.prototype = i.instance;
            var p = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];
            return m.UNSENT = 0, m.OPENED = 1, m.HEADERS_RECEIVED = 2, m.LOADING = 3, m.DONE = 4, m.prototype = i.instance, m
        }), i(Y, [r, p, m, c], function(e, t, i, n) {
            function a() {
                function n() {
                    l = c = 0, u = this.result = null
                }

                function r(t, i) {
                    var n = this;
                    d = i, n.bind("TransportingProgress", function(t) {
                        c = t.loaded, l > c && -1 === e.inArray(n.state, [a.IDLE, a.DONE]) && s.call(n)
                    }, 999), n.bind("TransportingComplete", function() {
                        c = l, n.state = a.DONE, u = null, n.result = d.exec.call(n, "Transporter", "getAsBlob", t || "")
                    }, 999), n.state = a.BUSY, n.trigger("TransportingStarted"), s.call(n)
                }

                function s() {
                    var e, i = l - c;
                    _ > i && (_ = i), e = t.btoa(u.substr(c, _)), d.exec.call(this, "Transporter", "receive", e, l)
                }
                var o, d, u, l, c, _;
                i.call(this), e.extend(this, {
                    uid: e.guid("uid_"),
                    state: a.IDLE,
                    result: null,
                    transport: function(t, i, a) {
                        var s = this;
                        if (a = e.extend({
                                chunk_size: 204798
                            }, a), (o = a.chunk_size % 3) && (a.chunk_size += 3 - o), _ = a.chunk_size, n.call(this), u = t, l = t.length, "string" === e.typeOf(a) || a.ruid) r.call(s, i, this.connectRuntime(a));
                        else {
                            var d = function(e, t) {
                                s.unbind("RuntimeInit", d), r.call(s, i, t)
                            };
                            this.bind("RuntimeInit", d), this.connectRuntime(a)
                        }
                    },
                    abort: function() {
                        var e = this;
                        e.state = a.IDLE, d && (d.exec.call(e, "Transporter", "clear"), e.trigger("TransportingAborted")), n.call(e)
                    },
                    destroy: function() {
                        this.unbindAll(), d = null, this.disconnectRuntime(), n.call(this)
                    }
                })
            }
            return a.IDLE = 0, a.BUSY = 1, a.DONE = 2, a.prototype = n.instance, a
        }), i(T, [r, u, l, w, k, _, m, Y, s, c, f, g, p], function(e, t, i, n, a, r, s, o, d, u, l, c, _) {
            function m() {
                function n(t) {
                    var r = e.typeOf(t);
                    try {
                        if (t instanceof m) {
                            if (!t.size) throw new i.DOMException(i.DOMException.INVALID_STATE_ERR);
                            (function(t, i) {
                                var n = this.connectRuntime(t.ruid);
                                this.ruid = n.uid, n.exec.call(this, "Image", "loadFromImage", t, "undefined" === e.typeOf(i) || i)
                            }).apply(this, arguments)
                        } else if (t instanceof l) {
                            if (!~e.inArray(t.type, ["image/jpeg", "image/png"])) throw new i.ImageError(i.ImageError.WRONG_FORMAT);
                            u.apply(this, arguments)
                        } else if (-1 !== e.inArray(r, ["blob", "file"])) n.call(this, new c(null, t), arguments[1]);
                        else if ("string" === r) "data:" === t.substr(0, 5) ? n.call(this, new l(null, {
                            data: t
                        }), arguments[1]) : function(e, t) {
                            var i, n = this;
                            (i = new a).open("get", e), i.responseType = "blob", i.onprogress = function(e) {
                                n.trigger(e)
                            }, i.onload = function() {
                                u.call(n, i.response, !0)
                            }, i.onerror = function(e) {
                                n.trigger(e)
                            }, i.onloadend = function() {
                                i.destroy()
                            }, i.bind("RuntimeError", function(e, t) {
                                n.trigger("RuntimeError", t)
                            }), i.send(null, t)
                        }.apply(this, arguments);
                        else {
                            if ("node" !== r || "img" !== t.nodeName.toLowerCase()) throw new i.DOMException(i.DOMException.TYPE_MISMATCH_ERR);
                            n.call(this, t.src, arguments[1])
                        }
                    } catch (e) {
                        this.trigger("error", e.code)
                    }
                }

                function u(t, i) {
                    function n(e) {
                        a.ruid = e.uid, e.exec.call(a, "Image", "loadFromBlob", t)
                    }
                    var a = this;
                    a.name = t.name || "", t.isDetached() ? (this.bind("RuntimeInit", function(e, t) {
                        n(t)
                    }), i && "string" == typeof i.required_caps && (i.required_caps = r.parseCaps(i.required_caps)), this.connectRuntime(e.extend({
                        required_caps: {
                            access_image_binary: !0,
                            resize_image: !0
                        }
                    }, i))) : n(this.connectRuntime(t.ruid))
                }
                s.call(this), e.extend(this, {
                    uid: e.guid("uid_"),
                    ruid: null,
                    name: "",
                    size: 0,
                    width: 0,
                    height: 0,
                    type: "",
                    meta: {},
                    clone: function() {
                        this.load.apply(this, arguments)
                    },
                    load: function() {
                        n.apply(this, arguments)
                    },
                    downsize: function(t) {
                        var n = {
                            width: this.width,
                            height: this.height,
                            type: this.type || "image/jpeg",
                            quality: 90,
                            crop: !1,
                            preserveHeaders: !0,
                            resample: !1
                        };
                        t = "object" == typeof t ? e.extend(n, t) : e.extend(n, {
                            width: arguments[0],
                            height: arguments[1],
                            crop: arguments[2],
                            preserveHeaders: arguments[3]
                        });
                        try {
                            if (!this.size) throw new i.DOMException(i.DOMException.INVALID_STATE_ERR);
                            if (this.width > m.MAX_RESIZE_WIDTH || this.height > m.MAX_RESIZE_HEIGHT) throw new i.ImageError(i.ImageError.MAX_RESOLUTION_ERR);
                            this.exec("Image", "downsize", t.width, t.height, t.crop, t.preserveHeaders)
                        } catch (e) {
                            this.trigger("error", e.code)
                        }
                    },
                    crop: function(e, t, i) {
                        this.downsize(e, t, !0, i)
                    },
                    getAsCanvas: function() {
                        if (!d.can("create_canvas")) throw new i.RuntimeError(i.RuntimeError.NOT_SUPPORTED_ERR);
                        return this.connectRuntime(this.ruid).exec.call(this, "Image", "getAsCanvas")
                    },
                    getAsBlob: function(e, t) {
                        if (!this.size) throw new i.DOMException(i.DOMException.INVALID_STATE_ERR);
                        return this.exec("Image", "getAsBlob", e || "image/jpeg", t || 90)
                    },
                    getAsDataURL: function(e, t) {
                        if (!this.size) throw new i.DOMException(i.DOMException.INVALID_STATE_ERR);
                        return this.exec("Image", "getAsDataURL", e || "image/jpeg", t || 90)
                    },
                    getAsBinaryString: function(e, t) {
                        var i = this.getAsDataURL(e, t);
                        return _.atob(i.substring(i.indexOf("base64,") + 7))
                    },
                    embed: function(n, a) {
                        var r, s = this;
                        a = e.extend({
                            width: this.width,
                            height: this.height,
                            type: this.type || "image/jpeg",
                            quality: 90
                        }, a || {});
                        try {
                            if (!(n = t.get(n))) throw new i.DOMException(i.DOMException.INVALID_NODE_TYPE_ERR);
                            if (!this.size) throw new i.DOMException(i.DOMException.INVALID_STATE_ERR);
                            this.width > m.MAX_RESIZE_WIDTH || (this.height, m.MAX_RESIZE_HEIGHT);
                            var u = new m;
                            return u.bind("Resize", function() {
                                (function(t, a) {
                                    var u = this;
                                    if (d.can("create_canvas")) {
                                        var l = u.getAsCanvas();
                                        if (l) return n.appendChild(l), l = null, u.destroy(), void s.trigger("embedded")
                                    }
                                    var c = u.getAsDataURL(t, a);
                                    if (!c) throw new i.ImageError(i.ImageError.WRONG_FORMAT);
                                    if (d.can("use_data_uri_of", c.length)) n.innerHTML = '<img src="' + c + '" width="' + u.width + '" height="' + u.height + '" />', u.destroy(), s.trigger("embedded");
                                    else {
                                        var m = new o;
                                        m.bind("TransportingComplete", function() {
                                            r = s.connectRuntime(this.result.ruid), s.bind("Embedded", function() {
                                                e.extend(r.getShimContainer().style, {
                                                    top: "0px",
                                                    left: "0px",
                                                    width: u.width + "px",
                                                    height: u.height + "px"
                                                }), r = null
                                            }, 999), r.exec.call(s, "ImageView", "display", this.result.uid, width, height), u.destroy()
                                        }), m.transport(_.atob(c.substring(c.indexOf("base64,") + 7)), t, {
                                            required_caps: {
                                                display_media: !0
                                            },
                                            runtime_order: "flash,silverlight",
                                            container: n
                                        })
                                    }
                                }).call(this, a.type, a.quality)
                            }), u.bind("Load", function() {
                                u.downsize(a)
                            }), this.meta.thumb && this.meta.thumb.width >= a.width && this.meta.thumb.height >= a.height ? u.load(this.meta.thumb.data) : u.clone(this, !1), u
                        } catch (e) {
                            this.trigger("error", e.code)
                        }
                    },
                    destroy: function() {
                        this.ruid && (this.getRuntime().exec.call(this, "Image", "destroy"), this.disconnectRuntime()), this.unbindAll()
                    }
                }), this.handleEventProps(h), this.bind("Load Resize", function() {
                    (function(e) {
                        e || (e = this.exec("Image", "getInfo")), this.size = e.size, this.width = e.width, this.height = e.height, this.type = e.type, this.meta = e.meta, "" === this.name && (this.name = e.name)
                    }).call(this)
                }, 999)
            }
            var h = ["progress", "load", "error", "resize", "embedded"];
            return m.MAX_RESIZE_WIDTH = 8192, m.MAX_RESIZE_HEIGHT = 8192, m.prototype = u.instance, m
        }), i(D, [r, l, _, s], function(e, t, i, n) {
            var a = "html5",
                r = {};
            return i.addConstructor(a, function(t) {
                var s = this,
                    o = i.capTest,
                    d = i.capTrue,
                    u = e.extend({
                        access_binary: o(window.FileReader || window.File && window.File.getAsDataURL),
                        access_image_binary: function() {
                            return s.can("access_binary") && !!r.Image
                        },
                        display_media: o(n.can("create_canvas") || n.can("use_data_uri_over32kb")),
                        do_cors: o(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                        drag_and_drop: o(function() {
                            var e = document.createElement("div");
                            return ("draggable" in e || "ondragstart" in e && "ondrop" in e) && ("IE" !== n.browser || n.verComp(n.version, 9, ">"))
                        }()),
                        filter_by_extension: o("Chrome" === n.browser && n.verComp(n.version, 28, ">=") || "IE" === n.browser && n.verComp(n.version, 10, ">=") || "Safari" === n.browser && n.verComp(n.version, 7, ">=")),
                        return_response_headers: d,
                        return_response_type: function(e) {
                            return !("json" !== e || !window.JSON) || n.can("return_response_type", e)
                        },
                        return_status_code: d,
                        report_upload_progress: o(window.XMLHttpRequest && (new XMLHttpRequest).upload),
                        resize_image: function() {
                            return s.can("access_binary") && n.can("create_canvas")
                        },
                        select_file: function() {
                            return n.can("use_fileinput") && window.File
                        },
                        select_folder: function() {
                            return s.can("select_file") && "Chrome" === n.browser && n.verComp(n.version, 21, ">=")
                        },
                        select_multiple: function() {
                            return s.can("select_file") && !("Safari" === n.browser && "Windows" === n.os) && !("iOS" === n.os && n.verComp(n.osVersion, "7.0.0", ">") && n.verComp(n.osVersion, "8.0.0", "<"))
                        },
                        send_binary_string: o(window.XMLHttpRequest && ((new XMLHttpRequest).sendAsBinary || window.Uint8Array && window.ArrayBuffer)),
                        send_custom_headers: o(window.XMLHttpRequest),
                        send_multipart: function() {
                            return !!(window.XMLHttpRequest && (new XMLHttpRequest).upload && window.FormData) || s.can("send_binary_string")
                        },
                        slice_blob: o(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
                        stream_upload: function() {
                            return s.can("slice_blob") && s.can("send_multipart")
                        },
                        summon_file_dialog: function() {
                            return s.can("select_file") && ("Firefox" === n.browser && n.verComp(n.version, 4, ">=") || "Opera" === n.browser && n.verComp(n.version, 12, ">=") || "IE" === n.browser && n.verComp(n.version, 10, ">=") || !!~e.inArray(n.browser, ["Chrome", "Safari"]))
                        },
                        upload_filesize: d
                    }, arguments[2]);
                i.call(this, t, arguments[1] || a, u), e.extend(this, {
                    init: function() {
                        this.trigger("Init")
                    },
                    destroy: function(e) {
                        return function() {
                            e.call(s), e = s = null
                        }
                    }(this.destroy)
                }), e.extend(this.getShim(), r)
            }), r
        }), i(A, [r], function(e) {
            function t() {
                this.returnValue = !1
            }

            function i() {
                this.cancelBubble = !0
            }
            var n = {},
                a = "moxie_" + e.guid(),
                r = function(t, i, r) {
                    var s, o;
                    if (i = i.toLowerCase(), t[a] && n[t[a]] && n[t[a]][i]) {
                        for (var d = (s = n[t[a]][i]).length - 1; d >= 0 && (s[d].orig !== r && s[d].key !== r || (t.removeEventListener ? t.removeEventListener(i, s[d].func, !1) : t.detachEvent && t.detachEvent("on" + i, s[d].func), s[d].orig = null, s[d].func = null, s.splice(d, 1), r === o)); d--);
                        if (s.length || delete n[t[a]][i], e.isEmptyObj(n[t[a]])) {
                            delete n[t[a]];
                            try {
                                delete t[a]
                            } catch (e) {
                                t[a] = o
                            }
                        }
                    }
                };
            return {
                addEvent: function(r, s, o, d) {
                    var u, l;
                    s = s.toLowerCase(), r.addEventListener ? (u = o, r.addEventListener(s, u, !1)) : r.attachEvent && (u = function() {
                        var e = window.event;
                        e.target || (e.target = e.srcElement), e.preventDefault = t, e.stopPropagation = i, o(e)
                    }, r.attachEvent("on" + s, u)), r[a] || (r[a] = e.guid()), n.hasOwnProperty(r[a]) || (n[r[a]] = {}), (l = n[r[a]]).hasOwnProperty(s) || (l[s] = []), l[s].push({
                        func: u,
                        orig: o,
                        key: d
                    })
                },
                removeEvent: r,
                removeAllEvents: function(t, i) {
                    t && t[a] && e.each(n[t[a]], function(e, n) {
                        r(t, n, i)
                    })
                }
            }
        }), i("moxie/runtime/html5/file/FileInput", [D, g, r, u, A, d, s], function(e, t, i, n, a, r, s) {
            return e.FileInput = function() {
                var e;
                i.extend(this, {
                    init: function(o) {
                        var d, u, l, c, _, m, h = this,
                            p = h.getRuntime();
                        l = (e = o).accept.mimes || r.extList2mimes(e.accept, p.can("filter_by_extension")), (u = p.getShimContainer()).innerHTML = '<input id="' + p.uid + '" type="file" style="font-size:999px;opacity:0;"' + (e.multiple && p.can("select_multiple") ? "multiple" : "") + (e.directory && p.can("select_folder") ? "webkitdirectory directory" : "") + (l ? ' accept="' + l.join(",") + '"' : "") + " />", d = n.get(p.uid), i.extend(d.style, {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }), c = n.get(e.browse_button), p.can("summon_file_dialog") && ("static" === n.getStyle(c, "position") && (c.style.position = "relative"), _ = parseInt(n.getStyle(c, "z-index"), 10) || 1, c.style.zIndex = _, u.style.zIndex = _ - 1, a.addEvent(c, "click", function(e) {
                            var t = n.get(p.uid);
                            t && !t.disabled && t.click(), e.preventDefault()
                        }, h.uid)), m = p.can("summon_file_dialog") ? c : u, a.addEvent(m, "mouseover", function() {
                            h.trigger("mouseenter")
                        }, h.uid), a.addEvent(m, "mouseout", function() {
                            h.trigger("mouseleave")
                        }, h.uid), a.addEvent(m, "mousedown", function() {
                            h.trigger("mousedown")
                        }, h.uid), a.addEvent(n.get(e.container), "mouseup", function() {
                            h.trigger("mouseup")
                        }, h.uid), d.onchange = function n(a) {
                            if (h.files = [], i.each(this.files, function(i) {
                                    var n = "";
                                    return !(!e.directory || "." != i.name) || (i.webkitRelativePath && (n = "/" + i.webkitRelativePath.replace(/^\//, "")), (i = new t(p.uid, i)).relativePath = n, void h.files.push(i))
                                }), "IE" !== s.browser && "IEMobile" !== s.browser) this.value = "";
                            else {
                                var r = this.cloneNode(!0);
                                this.parentNode.replaceChild(r, this), r.onchange = n
                            }
                            h.files.length && h.trigger("change")
                        }, h.trigger({
                            type: "ready",
                            async: !0
                        }), u = null
                    },
                    disable: function(e) {
                        var t, i = this.getRuntime();
                        (t = n.get(i.uid)) && (t.disabled = !!e)
                    },
                    destroy: function() {
                        var t = this.getRuntime(),
                            i = t.getShim(),
                            r = t.getShimContainer();
                        a.removeAllEvents(r, this.uid), a.removeAllEvents(e && n.get(e.container), this.uid), a.removeAllEvents(e && n.get(e.browse_button), this.uid), r && (r.innerHTML = ""), i.removeInstance(this.uid), e = r = i = null
                    }
                })
            }
        }), i("moxie/runtime/html5/file/Blob", [D, f], function(e, t) {
            return e.Blob = function() {
                this.slice = function() {
                    return new t(this.getRuntime().uid, function(e, t, i) {
                        var n;
                        if (!window.File.prototype.slice) return (n = window.File.prototype.webkitSlice || window.File.prototype.mozSlice) ? n.call(e, t, i) : null;
                        try {
                            return e.slice(), e.slice(t, i)
                        } catch (n) {
                            return e.slice(t, i - t)
                        }
                    }.apply(this, arguments))
                }
            }
        }), i("moxie/runtime/html5/file/FileDrop", [D, g, r, u, A, d], function(e, t, i, n, a, r) {
            return e.FileDrop = function() {
                function e(e) {
                    if (!e.dataTransfer || !e.dataTransfer.types) return !1;
                    var t = i.toArray(e.dataTransfer.types || []);
                    return -1 !== i.inArray("Files", t) || -1 !== i.inArray("public.file-url", t) || -1 !== i.inArray("application/x-moz-file", t)
                }

                function s(e, i) {
                    if (o(e)) {
                        var n = new t(l, e);
                        n.relativePath = i || "", c.push(n)
                    }
                }

                function o(e) {
                    if (!_.length) return !0;
                    var t = r.getFileExtension(e.name);
                    return !t || -1 !== i.inArray(t, _)
                }

                function d(e, t) {
                    var n = [];
                    i.each(e, function(e) {
                        n.push(function(t) {
                            ! function(e, t) {
                                e.isFile ? e.file(function(i) {
                                    s(i, e.fullPath), t()
                                }, function() {
                                    t()
                                }) : e.isDirectory ? function(e, t) {
                                    var i = [],
                                        n = e.createReader();
                                    ! function e(t) {
                                        n.readEntries(function(n) {
                                            n.length ? ([].push.apply(i, n), e(t)) : t()
                                        }, t)
                                    }(function() {
                                        d(i, t)
                                    })
                                }(e, t) : t()
                            }(e, t)
                        })
                    }), i.inSeries(n, function() {
                        t()
                    })
                }
                var u, l, c = [],
                    _ = [];
                i.extend(this, {
                    init: function(t) {
                        var n, r = this;
                        u = t, l = r.ruid, _ = function(e) {
                            for (var t = [], n = 0; n < e.length; n++)[].push.apply(t, e[n].extensions.split(/\s*,\s*/));
                            return -1 === i.inArray("*", t) ? t : []
                        }(u.accept), n = u.container, a.addEvent(n, "dragover", function(t) {
                            e(t) && (t.preventDefault(), t.dataTransfer.dropEffect = "copy")
                        }, r.uid), a.addEvent(n, "drop", function(t) {
                            e(t) && (t.preventDefault(), c = [], t.dataTransfer.items && t.dataTransfer.items[0].webkitGetAsEntry ? function(e, t) {
                                var n = [];
                                i.each(e, function(e) {
                                    var t = e.webkitGetAsEntry();
                                    t && (t.isFile ? s(e.getAsFile(), t.fullPath) : n.push(t))
                                }), n.length ? d(n, t) : t()
                            }(t.dataTransfer.items, function() {
                                r.files = c, r.trigger("drop")
                            }) : (i.each(t.dataTransfer.files, function(e) {
                                s(e)
                            }), r.files = c, r.trigger("drop")))
                        }, r.uid), a.addEvent(n, "dragenter", function(e) {
                            r.trigger("dragenter")
                        }, r.uid), a.addEvent(n, "dragleave", function(e) {
                            r.trigger("dragleave")
                        }, r.uid)
                    },
                    destroy: function() {
                        a.removeAllEvents(u && n.get(u.container), this.uid), l = c = _ = u = null
                    }
                })
            }
        }), i(S, [D, p, r], function(e, t, i) {
            return e.FileReader = function() {
                function e(e) {
                    return t.atob(e.substring(e.indexOf("base64,") + 7))
                }
                var n, a = !1;
                i.extend(this, {
                    read: function(t, r) {
                        var s = this;
                        s.result = "", (n = new window.FileReader).addEventListener("progress", function(e) {
                            s.trigger(e)
                        }), n.addEventListener("load", function(t) {
                            s.result = a ? e(n.result) : n.result, s.trigger(t)
                        }), n.addEventListener("error", function(e) {
                            s.trigger(e, n.error)
                        }), n.addEventListener("loadend", function(e) {
                            n = null, s.trigger(e)
                        }), "function" === i.typeOf(n[t]) ? (a = !1, n[t](r.getSource())) : "readAsBinaryString" === t && (a = !0, n.readAsDataURL(r.getSource()))
                    },
                    abort: function() {
                        n && n.abort()
                    },
                    destroy: function() {
                        n = null
                    }
                })
            }
        }), i("moxie/runtime/html5/xhr/XMLHttpRequest", [D, r, d, v, g, f, b, l, s], function(e, t, i, n, a, r, s, o, d) {
            return e.XMLHttpRequest = function() {
                function e(e, t) {
                    var i, n, a = this;
                    i = t.getBlob().getSource(), (n = new window.FileReader).onload = function() {
                        t.append(t.getBlobName(), new r(null, {
                            type: i.type,
                            data: n.result
                        })), _.send.call(a, e, t)
                    }, n.readAsBinaryString(i)
                }

                function u(e) {
                    var t = "----moxieboundary" + (new Date).getTime(),
                        i = "--",
                        n = "\r\n",
                        a = "";
                    if (!this.getRuntime().can("send_binary_string")) throw new o.RuntimeError(o.RuntimeError.NOT_SUPPORTED_ERR);
                    return l.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + t), e.each(function(e, s) {
                        a += e instanceof r ? i + t + n + 'Content-Disposition: form-data; name="' + s + '"; filename="' + unescape(encodeURIComponent(e.name || "blob")) + '"' + n + "Content-Type: " + (e.type || "application/octet-stream") + n + n + e.getSource() + n : i + t + n + 'Content-Disposition: form-data; name="' + s + '"' + n + n + unescape(encodeURIComponent(e)) + n
                    }), a += i + t + i + n
                }
                var l, c, _ = this;
                t.extend(this, {
                    send: function(i, a) {
                        var o = this,
                            _ = "Mozilla" === d.browser && d.verComp(d.version, 4, ">=") && d.verComp(d.version, 7, "<"),
                            m = "Android Browser" === d.browser,
                            h = !1;
                        if (c = i.url.replace(/^.+?\/([\w\-\.]+)$/, "$1").toLowerCase(), (l = !window.XMLHttpRequest || "IE" === d.browser && d.verComp(d.version, 8, "<") ? function() {
                                for (var e = ["Msxml2.XMLHTTP.6.0", "Microsoft.XMLHTTP"], t = 0; t < e.length; t++) try {
                                    return new ActiveXObject(e[t])
                                } catch (e) {}
                            }() : new window.XMLHttpRequest).open(i.method, i.url, i.async, i.user, i.password), a instanceof r) a.isDetached() && (h = !0), a = a.getSource();
                        else if (a instanceof s) {
                            if (a.hasBlob())
                                if (a.getBlob().isDetached()) a = u.call(o, a), h = !0;
                                else if ((_ || m) && "blob" === t.typeOf(a.getBlob().getSource()) && window.FileReader) return void e.call(o, i, a);
                            if (a instanceof s) {
                                var p = new window.FormData;
                                a.each(function(e, t) {
                                    e instanceof r ? p.append(t, e.getSource()) : p.append(t, e)
                                }), a = p
                            }
                        }
                        l.upload ? (i.withCredentials && (l.withCredentials = !0), l.addEventListener("load", function(e) {
                            o.trigger(e)
                        }), l.addEventListener("error", function(e) {
                            o.trigger(e)
                        }), l.addEventListener("progress", function(e) {
                            o.trigger(e)
                        }), l.upload.addEventListener("progress", function(e) {
                            o.trigger({
                                type: "UploadProgress",
                                loaded: e.loaded,
                                total: e.total
                            })
                        })) : l.onreadystatechange = function() {
                            switch (l.readyState) {
                                case 1:
                                case 2:
                                    break;
                                case 3:
                                    var e, t;
                                    try {
                                        n.hasSameOrigin(i.url) && (e = l.getResponseHeader("Content-Length") || 0), l.responseText && (t = l.responseText.length)
                                    } catch (i) {
                                        e = t = 0
                                    }
                                    o.trigger({
                                        type: "progress",
                                        lengthComputable: !!e,
                                        total: parseInt(e, 10),
                                        loaded: t
                                    });
                                    break;
                                case 4:
                                    l.onreadystatechange = function() {}, 0 === l.status ? o.trigger("error") : o.trigger("load")
                            }
                        }, t.isEmptyObj(i.headers) || t.each(i.headers, function(e, t) {
                            l.setRequestHeader(t, e)
                        }), "" !== i.responseType && "responseType" in l && ("json" !== i.responseType || d.can("return_response_type", "json") ? l.responseType = i.responseType : l.responseType = "text"), h ? l.sendAsBinary ? l.sendAsBinary(a) : function() {
                            for (var e = new Uint8Array(a.length), t = 0; t < a.length; t++) e[t] = 255 & a.charCodeAt(t);
                            l.send(e.buffer)
                        }() : l.send(a), o.trigger("loadstart")
                    },
                    getStatus: function() {
                        try {
                            if (l) return l.status
                        } catch (e) {}
                        return 0
                    },
                    getResponse: function(e) {
                        var t = this.getRuntime();
                        try {
                            switch (e) {
                                case "blob":
                                    var n = new a(t.uid, l.response),
                                        r = l.getResponseHeader("Content-Disposition");
                                    if (r) {
                                        var s = r.match(/filename=([\'\"'])([^\1]+)\1/);
                                        s && (c = s[2])
                                    }
                                    return n.name = c, n.type || (n.type = i.getFileMime(c)), n;
                                case "json":
                                    return d.can("return_response_type", "json") ? l.response : 200 === l.status && window.JSON ? JSON.parse(l.responseText) : null;
                                case "document":
                                    return function(e) {
                                        var t = e.responseXML,
                                            i = e.responseText;
                                        return "IE" === d.browser && i && t && !t.documentElement && /[^\/]+\/[^\+]+\+xml/.test(e.getResponseHeader("Content-Type")) && ((t = new window.ActiveXObject("Microsoft.XMLDOM")).async = !1, t.validateOnParse = !1, t.loadXML(i)), t && ("IE" === d.browser && 0 !== t.parseError || !t.documentElement || "parsererror" === t.documentElement.tagName) ? null : t
                                    }(l);
                                default:
                                    return "" !== l.responseText ? l.responseText : null
                            }
                        } catch (e) {
                            return null
                        }
                    },
                    getAllResponseHeaders: function() {
                        try {
                            return l.getAllResponseHeaders()
                        } catch (e) {}
                        return ""
                    },
                    abort: function() {
                        l && l.abort()
                    },
                    destroy: function() {
                        _ = c = null
                    }
                })
            }
        }), i(x, [r], function(e) {
            function t(e) {
                e instanceof ArrayBuffer ? i.apply(this, arguments) : n.apply(this, arguments)
            }

            function i(t) {
                var i = new DataView(t);
                e.extend(this, {
                    readByteAt: function(e) {
                        return i.getUint8(e)
                    },
                    writeByteAt: function(e, t) {
                        i.setUint8(e, t)
                    },
                    SEGMENT: function(e, n, a) {
                        switch (arguments.length) {
                            case 2:
                                return t.slice(e, e + n);
                            case 1:
                                return t.slice(e);
                            case 3:
                                if (null === a && (a = new ArrayBuffer), a instanceof ArrayBuffer) {
                                    var r = new Uint8Array(this.length() - n + a.byteLength);
                                    e > 0 && r.set(new Uint8Array(t.slice(0, e)), 0), r.set(new Uint8Array(a), e), r.set(new Uint8Array(t.slice(e + n)), e + a.byteLength), this.clear(), t = r.buffer, i = new DataView(t);
                                    break
                                }
                            default:
                                return t
                        }
                    },
                    length: function() {
                        return t ? t.byteLength : 0
                    },
                    clear: function() {
                        i = t = null
                    }
                })
            }

            function n(t) {
                function i(e, i, n) {
                    n = 3 === arguments.length ? n : t.length - i - 1, t = t.substr(0, i) + e + t.substr(n + i)
                }
                e.extend(this, {
                    readByteAt: function(e) {
                        return t.charCodeAt(e)
                    },
                    writeByteAt: function(e, t) {
                        i(String.fromCharCode(t), e, 1)
                    },
                    SEGMENT: function(e, n, a) {
                        switch (arguments.length) {
                            case 1:
                                return t.substr(e);
                            case 2:
                                return t.substr(e, n);
                            case 3:
                                i(null !== a ? a : "", e, n);
                                break;
                            default:
                                return t
                        }
                    },
                    length: function() {
                        return t ? t.length : 0
                    },
                    clear: function() {
                        t = null
                    }
                })
            }
            return e.extend(t.prototype, {
                littleEndian: !1,
                read: function(e, t) {
                    var i, n, a;
                    if (e + t > this.length()) throw new Error("You are trying to read outside the source boundaries.");
                    for (n = this.littleEndian ? 0 : -8 * (t - 1), a = 0, i = 0; t > a; a++) i |= this.readByteAt(e + a) << Math.abs(n + 8 * a);
                    return i
                },
                write: function(e, t, i) {
                    var n, a;
                    if (e > this.length()) throw new Error("You are trying to write outside the source boundaries.");
                    for (n = this.littleEndian ? 0 : -8 * (i - 1), a = 0; i > a; a++) this.writeByteAt(e + a, t >> Math.abs(n + 8 * a) & 255)
                },
                BYTE: function(e) {
                    return this.read(e, 1)
                },
                SHORT: function(e) {
                    return this.read(e, 2)
                },
                LONG: function(e) {
                    return this.read(e, 4)
                },
                SLONG: function(e) {
                    var t = this.read(e, 4);
                    return t > 2147483647 ? t - 4294967296 : t
                },
                CHAR: function(e) {
                    return String.fromCharCode(this.read(e, 1))
                },
                STRING: function(e, t) {
                    return this.asArray("CHAR", e, t).join("")
                },
                asArray: function(e, t, i) {
                    for (var n = [], a = 0; i > a; a++) n[a] = this[e](t + a);
                    return n
                }
            }), t
        }), i(E, [x, l], function(e, t) {
            return function i(n) {
                var a, r, s, o = [],
                    d = 0;
                if (65496 !== (a = new e(n)).SHORT(0)) throw a.clear(), new t.ImageError(t.ImageError.WRONG_FORMAT);
                for (r = 2; r <= a.length();)
                    if ((s = a.SHORT(r)) >= 65488 && 65495 >= s) r += 2;
                    else {
                        if (65498 === s || 65497 === s) break;
                        d = a.SHORT(r + 2) + 2, s >= 65505 && 65519 >= s && o.push({
                            hex: s,
                            name: "APP" + (15 & s),
                            start: r,
                            length: d,
                            segment: a.SEGMENT(r, d)
                        }), r += d
                    }
                return a.clear(), {
                    headers: o,
                    restore: function(t) {
                        var i, n, a;
                        for (a = new e(t), r = 65504 == a.SHORT(2) ? 4 + a.SHORT(4) : 2, n = 0, i = o.length; i > n; n++) a.SEGMENT(r, 0, o[n].segment), r += o[n].length;
                        return t = a.SEGMENT(), a.clear(), t
                    },
                    strip: function(t) {
                        var n, a, r, s;
                        for (a = (r = new i(t)).headers, r.purge(), n = new e(t), s = a.length; s--;) n.SEGMENT(a[s].start, a[s].length, "");
                        return t = n.SEGMENT(), n.clear(), t
                    },
                    get: function(e) {
                        for (var t = [], i = 0, n = o.length; n > i; i++) o[i].name === e.toUpperCase() && t.push(o[i].segment);
                        return t
                    },
                    set: function(e, t) {
                        var i, n, a, r = [];
                        for ("string" == typeof t ? r.push(t) : r = t, i = n = 0, a = o.length; a > i && (o[i].name === e.toUpperCase() && (o[i].segment = r[n], o[i].length = r[n].length, n++), !(n >= r.length)); i++);
                    },
                    purge: function() {
                        this.headers = o = []
                    }
                }
            }
        }), i(H, [r, x, l], function(e, i, n) {
            function a(r) {
                function s(i, a) {
                    var r, s, o, d, c, _, m, h, p = this,
                        f = [],
                        g = {},
                        y = {
                            1: "BYTE",
                            7: "UNDEFINED",
                            2: "ASCII",
                            3: "SHORT",
                            4: "LONG",
                            5: "RATIONAL",
                            9: "SLONG",
                            10: "SRATIONAL"
                        },
                        M = {
                            BYTE: 1,
                            UNDEFINED: 1,
                            ASCII: 1,
                            SHORT: 2,
                            LONG: 4,
                            RATIONAL: 8,
                            SLONG: 4,
                            SRATIONAL: 8
                        };
                    for (r = p.SHORT(i), s = 0; r > s; s++)
                        if (f = [], m = i + 2 + 12 * s, (o = a[p.SHORT(m)]) !== t) {
                            if (d = y[p.SHORT(m += 2)], c = p.LONG(m += 2), !(_ = M[d])) throw new n.ImageError(n.ImageError.INVALID_META_ERR);
                            if (m += 4, _ * c > 4 && (m = p.LONG(m) + l.tiffHeader), m + _ * c >= this.length()) throw new n.ImageError(n.ImageError.INVALID_META_ERR);
                            "ASCII" !== d ? (f = p.asArray(d, m, c), h = 1 == c ? f[0] : f, u.hasOwnProperty(o) && "object" != typeof h ? g[o] = u[o][h] : g[o] = h) : g[o] = e.trim(p.STRING(m, c).replace(/\0$/, ""))
                        }
                    return g
                }
                var o, d, u, l, c, _;
                if (i.call(this, r), d = {
                        tiff: {
                            274: "Orientation",
                            270: "ImageDescription",
                            271: "Make",
                            272: "Model",
                            305: "Software",
                            34665: "ExifIFDPointer",
                            34853: "GPSInfoIFDPointer"
                        },
                        exif: {
                            36864: "ExifVersion",
                            40961: "ColorSpace",
                            40962: "PixelXDimension",
                            40963: "PixelYDimension",
                            36867: "DateTimeOriginal",
                            33434: "ExposureTime",
                            33437: "FNumber",
                            34855: "ISOSpeedRatings",
                            37377: "ShutterSpeedValue",
                            37378: "ApertureValue",
                            37383: "MeteringMode",
                            37384: "LightSource",
                            37385: "Flash",
                            37386: "FocalLength",
                            41986: "ExposureMode",
                            41987: "WhiteBalance",
                            41990: "SceneCaptureType",
                            41988: "DigitalZoomRatio",
                            41992: "Contrast",
                            41993: "Saturation",
                            41994: "Sharpness"
                        },
                        gps: {
                            0: "GPSVersionID",
                            1: "GPSLatitudeRef",
                            2: "GPSLatitude",
                            3: "GPSLongitudeRef",
                            4: "GPSLongitude"
                        },
                        thumb: {
                            513: "JPEGInterchangeFormat",
                            514: "JPEGInterchangeFormatLength"
                        }
                    }, u = {
                        ColorSpace: {
                            1: "sRGB",
                            0: "Uncalibrated"
                        },
                        MeteringMode: {
                            0: "Unknown",
                            1: "Average",
                            2: "CenterWeightedAverage",
                            3: "Spot",
                            4: "MultiSpot",
                            5: "Pattern",
                            6: "Partial",
                            255: "Other"
                        },
                        LightSource: {
                            1: "Daylight",
                            2: "Fliorescent",
                            3: "Tungsten",
                            4: "Flash",
                            9: "Fine weather",
                            10: "Cloudy weather",
                            11: "Shade",
                            12: "Daylight fluorescent (D 5700 - 7100K)",
                            13: "Day white fluorescent (N 4600 -5400K)",
                            14: "Cool white fluorescent (W 3900 - 4500K)",
                            15: "White fluorescent (WW 3200 - 3700K)",
                            17: "Standard light A",
                            18: "Standard light B",
                            19: "Standard light C",
                            20: "D55",
                            21: "D65",
                            22: "D75",
                            23: "D50",
                            24: "ISO studio tungsten",
                            255: "Other"
                        },
                        Flash: {
                            0: "Flash did not fire",
                            1: "Flash fired",
                            5: "Strobe return light not detected",
                            7: "Strobe return light detected",
                            9: "Flash fired, compulsory flash mode",
                            13: "Flash fired, compulsory flash mode, return light not detected",
                            15: "Flash fired, compulsory flash mode, return light detected",
                            16: "Flash did not fire, compulsory flash mode",
                            24: "Flash did not fire, auto mode",
                            25: "Flash fired, auto mode",
                            29: "Flash fired, auto mode, return light not detected",
                            31: "Flash fired, auto mode, return light detected",
                            32: "No flash function",
                            65: "Flash fired, red-eye reduction mode",
                            69: "Flash fired, red-eye reduction mode, return light not detected",
                            71: "Flash fired, red-eye reduction mode, return light detected",
                            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                            89: "Flash fired, auto mode, red-eye reduction mode",
                            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
                        },
                        ExposureMode: {
                            0: "Auto exposure",
                            1: "Manual exposure",
                            2: "Auto bracket"
                        },
                        WhiteBalance: {
                            0: "Auto white balance",
                            1: "Manual white balance"
                        },
                        SceneCaptureType: {
                            0: "Standard",
                            1: "Landscape",
                            2: "Portrait",
                            3: "Night scene"
                        },
                        Contrast: {
                            0: "Normal",
                            1: "Soft",
                            2: "Hard"
                        },
                        Saturation: {
                            0: "Normal",
                            1: "Low saturation",
                            2: "High saturation"
                        },
                        Sharpness: {
                            0: "Normal",
                            1: "Soft",
                            2: "Hard"
                        },
                        GPSLatitudeRef: {
                            N: "North latitude",
                            S: "South latitude"
                        },
                        GPSLongitudeRef: {
                            E: "East longitude",
                            W: "West longitude"
                        }
                    }, c = (l = {
                        tiffHeader: 10
                    }).tiffHeader, o = {
                        clear: this.clear
                    }, e.extend(this, {
                        read: function() {
                            try {
                                return a.prototype.read.apply(this, arguments)
                            } catch (e) {
                                throw new n.ImageError(n.ImageError.INVALID_META_ERR)
                            }
                        },
                        write: function() {
                            try {
                                return a.prototype.write.apply(this, arguments)
                            } catch (e) {
                                throw new n.ImageError(n.ImageError.INVALID_META_ERR)
                            }
                        },
                        UNDEFINED: function() {
                            return this.BYTE.apply(this, arguments)
                        },
                        RATIONAL: function(e) {
                            return this.LONG(e) / this.LONG(e + 4)
                        },
                        SRATIONAL: function(e) {
                            return this.SLONG(e) / this.SLONG(e + 4)
                        },
                        ASCII: function(e) {
                            return this.CHAR(e)
                        },
                        TIFF: function() {
                            return _ || null
                        },
                        EXIF: function() {
                            var t = null;
                            if (l.exifIFD) {
                                try {
                                    t = s.call(this, l.exifIFD, d.exif)
                                } catch (e) {
                                    return null
                                }
                                if (t.ExifVersion && "array" === e.typeOf(t.ExifVersion)) {
                                    for (var i = 0, n = ""; i < t.ExifVersion.length; i++) n += String.fromCharCode(t.ExifVersion[i]);
                                    t.ExifVersion = n
                                }
                            }
                            return t
                        },
                        GPS: function() {
                            var t = null;
                            if (l.gpsIFD) {
                                try {
                                    t = s.call(this, l.gpsIFD, d.gps)
                                } catch (e) {
                                    return null
                                }
                                t.GPSVersionID && "array" === e.typeOf(t.GPSVersionID) && (t.GPSVersionID = t.GPSVersionID.join("."))
                            }
                            return t
                        },
                        thumb: function() {
                            if (l.IFD1) try {
                                var e = s.call(this, l.IFD1, d.thumb);
                                if ("JPEGInterchangeFormat" in e) return this.SEGMENT(l.tiffHeader + e.JPEGInterchangeFormat, e.JPEGInterchangeFormatLength)
                            } catch (e) {}
                            return null
                        },
                        setExif: function(e, t) {
                            return ("PixelXDimension" === e || "PixelYDimension" === e) && function(e, t, i) {
                                var n, a, r, s = 0;
                                if ("string" == typeof t) {
                                    var o = d[e.toLowerCase()];
                                    for (var u in o)
                                        if (o[u] === t) {
                                            t = u;
                                            break
                                        }
                                }
                                n = l[e.toLowerCase() + "IFD"], a = this.SHORT(n);
                                for (var c = 0; a > c; c++)
                                    if (r = n + 12 * c + 2, this.SHORT(r) == t) {
                                        s = r + 8;
                                        break
                                    }
                                if (!s) return !1;
                                try {
                                    this.write(s, i, 4)
                                } catch (e) {
                                    return !1
                                }
                                return !0
                            }.call(this, "exif", e, t)
                        },
                        clear: function() {
                            o.clear(), r = d = u = _ = l = o = null
                        }
                    }), 65505 !== this.SHORT(0) || "EXIF\0" !== this.STRING(4, 5).toUpperCase()) throw new n.ImageError(n.ImageError.INVALID_META_ERR);
                if (this.littleEndian = 18761 == this.SHORT(c), 42 !== this.SHORT(c += 2)) throw new n.ImageError(n.ImageError.INVALID_META_ERR);
                l.IFD0 = l.tiffHeader + this.LONG(c += 2), "ExifIFDPointer" in (_ = s.call(this, l.IFD0, d.tiff)) && (l.exifIFD = l.tiffHeader + _.ExifIFDPointer, delete _.ExifIFDPointer), "GPSInfoIFDPointer" in _ && (l.gpsIFD = l.tiffHeader + _.GPSInfoIFDPointer, delete _.GPSInfoIFDPointer), e.isEmptyObj(_) && (_ = null);
                var m = this.LONG(l.IFD0 + 12 * this.SHORT(l.IFD0) + 2);
                m && (l.IFD1 = l.tiffHeader + m)
            }
            return a.prototype = i.prototype, a
        }), i(O, [r, l, E, x, H], function(e, t, i, n, a) {
            return function(r) {
                function s(e) {
                    var t, i, n = 0;
                    for (e || (e = o); n <= e.length();) {
                        if ((t = e.SHORT(n += 2)) >= 65472 && 65475 >= t) return n += 5, {
                            height: e.SHORT(n),
                            width: e.SHORT(n += 2)
                        };
                        i = e.SHORT(n += 2), n += i - 2
                    }
                    return null
                }
                var o, d, u, l;
                if (65496 !== (o = new n(r)).SHORT(0)) throw new t.ImageError(t.ImageError.WRONG_FORMAT);
                d = new i(r);
                try {
                    u = new a(d.get("app1")[0])
                } catch (e) {}
                l = s.call(this), e.extend(this, {
                    type: "image/jpeg",
                    size: o.length(),
                    width: l && l.width || 0,
                    height: l && l.height || 0,
                    setExif: function(t, i) {
                        return !!u && ("object" === e.typeOf(t) ? e.each(t, function(e, t) {
                            u.setExif(t, e)
                        }) : u.setExif(t, i), void d.set("app1", u.SEGMENT()))
                    },
                    writeHeaders: function() {
                        return arguments.length ? d.restore(arguments[0]) : d.restore(r)
                    },
                    stripHeaders: function(e) {
                        return d.strip(e)
                    },
                    purge: function() {
                        (function() {
                            u && d && o && (u.clear(), d.purge(), o.clear(), l = d = u = o = null)
                        }).call(this)
                    }
                }), u && (this.meta = {
                    tiff: u.TIFF(),
                    exif: u.EXIF(),
                    gps: u.GPS(),
                    thumb: function() {
                        var e, t, i = u.thumb();
                        return i && (t = s(e = new n(i)), e.clear(), t) ? (t.data = i, t) : null
                    }()
                })
            }
        }), i(C, [l, r, x], function(e, t, i) {
            return function(n) {
                function a() {
                    r && (r.clear(), n = s = r = null)
                }
                var r, s;
                r = new i(n),
                    function() {
                        var t = 0,
                            i = 0,
                            n = [35152, 20039, 3338, 6666];
                        for (i = 0; i < n.length; i++, t += 2)
                            if (n[i] != r.SHORT(t)) throw new e.ImageError(e.ImageError.WRONG_FORMAT)
                    }(), s = function() {
                        var e, t;
                        return "IHDR" == (e = function(e) {
                            var t, i, n, a;
                            return t = r.LONG(e), i = r.STRING(e += 4, 4), n = e += 4, a = r.LONG(e + t), {
                                length: t,
                                type: i,
                                start: n,
                                CRC: a
                            }
                        }.call(this, 8)).type ? (t = e.start, {
                            width: r.LONG(t),
                            height: r.LONG(t += 4)
                        }) : null
                    }.call(this), t.extend(this, {
                        type: "image/png",
                        size: r.length(),
                        width: s.width,
                        height: s.height,
                        purge: function() {
                            a.call(this)
                        }
                    }), a.call(this)
            }
        }), i(P, [r, l, O, C], function(e, t, i, n) {
            return function(a) {
                var r, s = [i, n];
                r = function() {
                    for (var e = 0; e < s.length; e++) try {
                        return new s[e](a)
                    } catch (e) {}
                    throw new t.ImageError(t.ImageError.WRONG_FORMAT)
                }(), e.extend(this, {
                    type: "",
                    size: 0,
                    width: 0,
                    height: 0,
                    setExif: function() {},
                    writeHeaders: function(e) {
                        return e
                    },
                    stripHeaders: function(e) {
                        return e
                    },
                    purge: function() {
                        a = null
                    }
                }), e.extend(this, r), this.purge = function() {
                    r.purge(), r = null
                }
            }
        }), i(z, [], function() {
            function e(e) {
                var t = e.naturalWidth;
                if (t * e.naturalHeight > 1048576) {
                    var i = document.createElement("canvas");
                    i.width = i.height = 1;
                    var n = i.getContext("2d");
                    return n.drawImage(e, 1 - t, 0), 0 === n.getImageData(0, 0, 1, 1).data[3]
                }
                return !1
            }
            return {
                isSubsampled: e,
                renderTo: function(t, i, n) {
                    var a = t.naturalWidth,
                        r = t.naturalHeight,
                        s = n.width,
                        o = n.height,
                        d = n.x || 0,
                        u = n.y || 0,
                        l = i.getContext("2d");
                    e(t) && (a /= 2, r /= 2);
                    var c = 1024,
                        _ = document.createElement("canvas");
                    _.width = _.height = c;
                    for (var m = _.getContext("2d"), h = function(e, t, i) {
                            var n = document.createElement("canvas");
                            n.width = 1, n.height = i;
                            var a = n.getContext("2d");
                            a.drawImage(e, 0, 0);
                            for (var r = a.getImageData(0, 0, 1, i).data, s = 0, o = i, d = i; d > s;) {
                                var u = r[4 * (d - 1) + 3];
                                0 === u ? o = d : s = d, d = o + s >> 1
                            }
                            n = null;
                            var l = d / i;
                            return 0 === l ? 1 : l
                        }(t, 0, r), p = 0; r > p;) {
                        for (var f = p + c > r ? r - p : c, g = 0; a > g;) {
                            var y = g + c > a ? a - g : c;
                            m.clearRect(0, 0, c, c), m.drawImage(t, -g, -p);
                            var M = g * s / a + d << 0,
                                v = Math.ceil(y * s / a),
                                L = p * o / r / h + u << 0,
                                w = Math.ceil(f * o / r / h);
                            l.drawImage(_, 0, 0, y, f, M, L, v, w), g += c
                        }
                        p += c
                    }
                    _ = m = null
                }
            }
        }), i(j, [D, r, l, p, f, g, P, z, d, s], function(e, t, i, n, a, r, s, o, d, u) {
            return e.Image = function() {
                function e() {
                    if (!g && !p) throw new i.ImageError(i.DOMException.INVALID_STATE_ERR);
                    return g || p
                }

                function l(e) {
                    return n.atob(e.substring(e.indexOf("base64,") + 7))
                }

                function c(e) {
                    var t = this;
                    (p = new Image).onerror = function() {
                        h.call(this), t.trigger("error", i.ImageError.WRONG_FORMAT)
                    }, p.onload = function() {
                        t.trigger("load")
                    }, p.src = "data:" == e.substr(0, 5) ? e : function(e, t) {
                        return "data:" + (t || "") + ";base64," + n.btoa(e)
                    }(e, M.type)
                }

                function _(i, n, a, r) {
                    var s, o, d, u, l, c = 0,
                        _ = 0;
                    if (w = r, l = this.meta && this.meta.tiff && this.meta.tiff.Orientation || 1, -1 !== t.inArray(l, [5, 6, 7, 8])) {
                        var h = i;
                        i = n, n = h
                    }
                    return o = e(), a ? (i = Math.min(i, o.width), n = Math.min(n, o.height), s = Math.max(i / o.width, n / o.height)) : s = Math.min(i / o.width, n / o.height), s > 1 && !a && r ? void this.trigger("Resize") : (g || (g = document.createElement("canvas")), d = Math.round(o.width * s), u = Math.round(o.height * s), a ? (g.width = i, g.height = n, d > i && (c = Math.round((d - i) / 2)), u > n && (_ = Math.round((u - n) / 2))) : (g.width = d, g.height = u), w || function(e, t, i) {
                        switch (i) {
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                                g.width = t, g.height = e;
                                break;
                            default:
                                g.width = e, g.height = t
                        }
                        var n = g.getContext("2d");
                        switch (i) {
                            case 2:
                                n.translate(e, 0), n.scale(-1, 1);
                                break;
                            case 3:
                                n.translate(e, t), n.rotate(Math.PI);
                                break;
                            case 4:
                                n.translate(0, t), n.scale(1, -1);
                                break;
                            case 5:
                                n.rotate(.5 * Math.PI), n.scale(1, -1);
                                break;
                            case 6:
                                n.rotate(.5 * Math.PI), n.translate(0, -t);
                                break;
                            case 7:
                                n.rotate(.5 * Math.PI), n.translate(e, -t), n.scale(-1, 1);
                                break;
                            case 8:
                                n.rotate(-.5 * Math.PI), n.translate(-e, 0)
                        }
                    }(g.width, g.height, l), m.call(this, o, g, -c, -_, d, u), this.width = g.width, this.height = g.height, L = !0, void this.trigger("Resize"))
                }

                function m(e, t, i, n, a, r) {
                    "iOS" === u.OS ? o.renderTo(e, t, {
                        width: a,
                        height: r,
                        x: i,
                        y: n
                    }) : t.getContext("2d").drawImage(e, i, n, a, r)
                }

                function h() {
                    f && (f.purge(), f = null), y = p = g = M = null, L = !1
                }
                var p, f, g, y, M, v = this,
                    L = !1,
                    w = !0;
                t.extend(this, {
                    loadFromBlob: function(e) {
                        var t = this,
                            n = t.getRuntime(),
                            a = !(arguments.length > 1) || arguments[1];
                        if (!n.can("access_binary")) throw new i.RuntimeError(i.RuntimeError.NOT_SUPPORTED_ERR);
                        return M = e, e.isDetached() ? (y = e.getSource(), void c.call(this, y)) : void
                        function(e, t) {
                            var n, a = this;
                            return window.FileReader ? ((n = new FileReader).onload = function() {
                                t(this.result)
                            }, n.onerror = function() {
                                a.trigger("error", i.ImageError.WRONG_FORMAT)
                            }, void n.readAsDataURL(e)) : t(e.getAsDataURL())
                        }.call(this, e.getSource(), function(e) {
                            a && (y = l(e)), c.call(t, e)
                        })
                    },
                    loadFromImage: function(e, t) {
                        this.meta = e.meta, M = new r(null, {
                            name: e.name,
                            size: e.size,
                            type: e.type
                        }), c.call(this, t ? y = e.getAsBinaryString() : e.getAsDataURL())
                    },
                    getInfo: function() {
                        var t, i = this.getRuntime();
                        return !f && y && i.can("access_image_binary") && (f = new s(y)), !(t = {
                            width: e().width || 0,
                            height: e().height || 0,
                            type: M.type || d.getFileMime(M.name),
                            size: y && y.length || M.size || 0,
                            name: M.name || "",
                            meta: f && f.meta || this.meta || {}
                        }).meta || !t.meta.thumb || t.meta.thumb.data instanceof a || (t.meta.thumb.data = new a(null, {
                            type: "image/jpeg",
                            data: t.meta.thumb.data
                        })), t
                    },
                    downsize: function() {
                        _.apply(this, arguments)
                    },
                    getAsCanvas: function() {
                        return g && (g.id = this.uid + "_canvas"), g
                    },
                    getAsBlob: function(e, t) {
                        return e !== this.type && _.call(this, this.width, this.height, !1), new r(null, {
                            name: M.name || "",
                            type: e,
                            data: v.getAsBinaryString.call(this, e, t)
                        })
                    },
                    getAsDataURL: function(e) {
                        var t = arguments[1] || 90;
                        if (!L) return p.src;
                        if ("image/jpeg" !== e) return g.toDataURL("image/png");
                        try {
                            return g.toDataURL("image/jpeg", t / 100)
                        } catch (e) {
                            return g.toDataURL("image/jpeg")
                        }
                    },
                    getAsBinaryString: function(e, t) {
                        if (!L) return y || (y = l(v.getAsDataURL(e, t))), y;
                        if ("image/jpeg" !== e) y = l(v.getAsDataURL(e, t));
                        else {
                            var i;
                            t || (t = 90);
                            try {
                                i = g.toDataURL("image/jpeg", t / 100)
                            } catch (e) {
                                i = g.toDataURL("image/jpeg")
                            }
                            y = l(i), f && (y = f.stripHeaders(y), w && (f.meta && f.meta.exif && f.setExif({
                                PixelXDimension: this.width,
                                PixelYDimension: this.height
                            }), y = f.writeHeaders(y)), f.purge(), f = null)
                        }
                        return L = !1, y
                    },
                    destroy: function() {
                        v = null, h.call(this), this.getRuntime().getShim().removeInstance(this.uid)
                    }
                })
            }
        }), i(R, [r, s, u, l, _], function(e, t, i, n, a) {
            function r(e) {
                var n = i.get(e);
                n && "OBJECT" == n.nodeName && ("IE" === t.browser ? (n.style.display = "none", function t() {
                    4 == n.readyState ? function(e) {
                        var t = i.get(e);
                        if (t) {
                            for (var n in t) "function" == typeof t[n] && (t[n] = null);
                            t.parentNode.removeChild(t)
                        }
                    }(e) : setTimeout(t, 10)
                }()) : n.parentNode.removeChild(n))
            }
            var s = "flash",
                o = {};
            return a.addConstructor(s, function(d) {
                var u, l = this;
                d = e.extend({
                        swf_url: t.swf_url
                    }, d), a.call(this, d, s, {
                        access_binary: function(e) {
                            return e && "browser" === l.mode
                        },
                        access_image_binary: function(e) {
                            return e && "browser" === l.mode
                        },
                        display_media: a.capTrue,
                        do_cors: a.capTrue,
                        drag_and_drop: !1,
                        report_upload_progress: function() {
                            return "client" === l.mode
                        },
                        resize_image: a.capTrue,
                        return_response_headers: !1,
                        return_response_type: function(t) {
                            return !("json" !== t || !window.JSON) || !e.arrayDiff(t, ["", "text", "document"]) || "browser" === l.mode
                        },
                        return_status_code: function(t) {
                            return "browser" === l.mode || !e.arrayDiff(t, [200, 404])
                        },
                        select_file: a.capTrue,
                        select_multiple: a.capTrue,
                        send_binary_string: function(e) {
                            return e && "browser" === l.mode
                        },
                        send_browser_cookies: function(e) {
                            return e && "browser" === l.mode
                        },
                        send_custom_headers: function(e) {
                            return e && "browser" === l.mode
                        },
                        send_multipart: a.capTrue,
                        slice_blob: function(e) {
                            return e && "browser" === l.mode
                        },
                        stream_upload: function(e) {
                            return e && "browser" === l.mode
                        },
                        summon_file_dialog: !1,
                        upload_filesize: function(t) {
                            return e.parseSizeStr(t) <= 2097152 || "client" === l.mode
                        },
                        use_http_method: function(t) {
                            return !e.arrayDiff(t, ["GET", "POST"])
                        }
                    }, {
                        access_binary: function(e) {
                            return e ? "browser" : "client"
                        },
                        access_image_binary: function(e) {
                            return e ? "browser" : "client"
                        },
                        report_upload_progress: function(e) {
                            return e ? "browser" : "client"
                        },
                        return_response_type: function(t) {
                            return e.arrayDiff(t, ["", "text", "json", "document"]) ? "browser" : ["client", "browser"]
                        },
                        return_status_code: function(t) {
                            return e.arrayDiff(t, [200, 404]) ? "browser" : ["client", "browser"]
                        },
                        send_binary_string: function(e) {
                            return e ? "browser" : "client"
                        },
                        send_browser_cookies: function(e) {
                            return e ? "browser" : "client"
                        },
                        send_custom_headers: function(e) {
                            return e ? "browser" : "client"
                        },
                        stream_upload: function(e) {
                            return e ? "client" : "browser"
                        },
                        upload_filesize: function(t) {
                            return e.parseSizeStr(t) >= 2097152 ? "client" : "browser"
                        }
                    }, "client"),
                    function() {
                        var e;
                        try {
                            e = (e = navigator.plugins["Shockwave Flash"]).description
                        } catch (t) {
                            try {
                                e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
                            } catch (t) {
                                e = "0.0"
                            }
                        }
                        return e = e.match(/\d+/g), parseFloat(e[0] + "." + e[1])
                    }() < 10 && (this.mode = !1), e.extend(this, {
                        getShim: function() {
                            return i.get(this.uid)
                        },
                        shimExec: function(e, t) {
                            var i = [].slice.call(arguments, 2);
                            return l.getShim().exec(this.uid, e, t, i)
                        },
                        init: function() {
                            var i, a, r;
                            r = this.getShimContainer(), e.extend(r.style, {
                                position: "absolute",
                                top: "-8px",
                                left: "-8px",
                                width: "9px",
                                height: "9px",
                                overflow: "hidden"
                            }), i = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + d.swf_url + '" ', "IE" === t.browser && (i += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), i += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + d.swf_url + '" /><param name="flashvars" value="uid=' + escape(this.uid) + "&target=" + t.global_event_dispatcher + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', "IE" === t.browser ? (a = document.createElement("div"), r.appendChild(a), a.outerHTML = i, a = r = null) : r.innerHTML = i, u = setTimeout(function() {
                                l && !l.initialized && l.trigger("Error", new n.RuntimeError(n.RuntimeError.NOT_INIT_ERR))
                            }, 5e3)
                        },
                        destroy: function(e) {
                            return function() {
                                r(l.uid), e.call(l), clearTimeout(u), d = u = e = l = null
                            }
                        }(this.destroy)
                    }, o)
            }), o
        }), i("moxie/runtime/flash/file/FileInput", [R, g, r], function(e, t, i) {
            var n = {
                init: function(e) {
                    var n = this,
                        a = this.getRuntime();
                    this.bind("Change", function() {
                        var e = a.shimExec.call(n, "FileInput", "getFiles");
                        n.files = [], i.each(e, function(e) {
                            n.files.push(new t(a.uid, e))
                        })
                    }, 999), this.getRuntime().shimExec.call(this, "FileInput", "init", {
                        name: e.name,
                        accept: e.accept,
                        multiple: e.multiple
                    }), this.trigger("ready")
                }
            };
            return e.FileInput = n
        }), i(I, [R, f], function(e, t) {
            var i = {
                slice: function(e, i, n, a) {
                    var r = this.getRuntime();
                    return 0 > i ? i = Math.max(e.size + i, 0) : i > 0 && (i = Math.min(i, e.size)), 0 > n ? n = Math.max(e.size + n, 0) : n > 0 && (n = Math.min(n, e.size)), (e = r.shimExec.call(this, "Blob", "slice", i, n, a || "")) && (e = new t(r.uid, e)), e
                }
            };
            return e.Blob = i
        }), i(F, [R, p], function(e, t) {
            function i(e, i) {
                switch (i) {
                    case "readAsText":
                        return t.atob(e, "utf8");
                    case "readAsBinaryString":
                        return t.atob(e);
                    case "readAsDataURL":
                        return e
                }
                return null
            }
            var n = {
                read: function(e, t) {
                    var n = this;
                    return n.result = "", "readAsDataURL" === e && (n.result = "data:" + (t.type || "") + ";base64,"), n.bind("Progress", function(t, a) {
                        a && (n.result += i(a, e))
                    }, 999), n.getRuntime().shimExec.call(this, "FileReader", "readAsBase64", t.uid)
                }
            };
            return e.FileReader = n
        }), i($, [R, p], function(e, t) {
            function i(e, i) {
                switch (i) {
                    case "readAsText":
                        return t.atob(e, "utf8");
                    case "readAsBinaryString":
                        return t.atob(e);
                    case "readAsDataURL":
                        return e
                }
                return null
            }
            var n = {
                read: function(e, t) {
                    var n;
                    return (n = this.getRuntime().shimExec.call(this, "FileReaderSync", "readAsBase64", t.uid)) ? ("readAsDataURL" === e && (n = "data:" + (t.type || "") + ";base64," + n), i(n, e, t.type)) : null
                }
            };
            return e.FileReaderSync = n
        }), i(N, [R, r, f, g, w, b, Y], function(e, t, i, n, a, r, s) {
            var o = {
                send: function(e, n) {
                    function a() {
                        e.transport = c.mode, c.shimExec.call(l, "XMLHttpRequest", "send", e, n)
                    }

                    function o(e, t) {
                        c.shimExec.call(l, "XMLHttpRequest", "appendBlob", e, t.uid), n = null, a()
                    }

                    function d(e, t) {
                        var i = new s;
                        i.bind("TransportingComplete", function() {
                            t(this.result)
                        }), i.transport(e.getSource(), e.type, {
                            ruid: c.uid
                        })
                    }
                    var u, l = this,
                        c = l.getRuntime();
                    if (t.isEmptyObj(e.headers) || t.each(e.headers, function(e, t) {
                            c.shimExec.call(l, "XMLHttpRequest", "setRequestHeader", t, e.toString())
                        }), n instanceof r)
                        if (n.each(function(e, t) {
                                e instanceof i ? u = t : c.shimExec.call(l, "XMLHttpRequest", "append", t, e)
                            }), n.hasBlob()) {
                            var _ = n.getBlob();
                            _.isDetached() ? d(_, function(e) {
                                _.destroy(), o(u, e)
                            }) : o(u, _)
                        } else n = null, a();
                    else n instanceof i ? n.isDetached() ? d(n, function(e) {
                        n.destroy(), n = e.uid, a()
                    }) : (n = n.uid, a()) : a()
                },
                getResponse: function(e) {
                    var i, r, s = this.getRuntime();
                    if (r = s.shimExec.call(this, "XMLHttpRequest", "getResponseAsBlob")) {
                        if (r = new n(s.uid, r), "blob" === e) return r;
                        try {
                            if (i = new a, ~t.inArray(e, ["", "text"])) return i.readAsText(r);
                            if ("json" === e && window.JSON) return JSON.parse(i.readAsText(r))
                        } finally {
                            r.destroy()
                        }
                    }
                    return null
                },
                abort: function(e) {
                    this.getRuntime().shimExec.call(this, "XMLHttpRequest", "abort"), this.dispatchEvent("readystatechange"), this.dispatchEvent("abort")
                }
            };
            return e.XMLHttpRequest = o
        }), i(W, [R, f], function(e, t) {
            var i = {
                getAsBlob: function(e) {
                    var i = this.getRuntime(),
                        n = i.shimExec.call(this, "Transporter", "getAsBlob", e);
                    return n ? new t(i.uid, n) : null
                }
            };
            return e.Transporter = i
        }), i(B, [R, r, Y, f, w], function(e, t, i, n, a) {
            var r = {
                loadFromBlob: function(e) {
                    function t(e) {
                        a.shimExec.call(n, "Image", "loadFromBlob", e.uid), n = a = null
                    }
                    var n = this,
                        a = n.getRuntime();
                    if (e.isDetached()) {
                        var r = new i;
                        r.bind("TransportingComplete", function() {
                            t(r.result.getSource())
                        }), r.transport(e.getSource(), e.type, {
                            ruid: a.uid
                        })
                    } else t(e.getSource())
                },
                loadFromImage: function(e) {
                    return this.getRuntime().shimExec.call(this, "Image", "loadFromImage", e.uid)
                },
                getInfo: function() {
                    var e = this.getRuntime(),
                        t = e.shimExec.call(this, "Image", "getInfo");
                    return !t.meta || !t.meta.thumb || t.meta.thumb.data instanceof n || (t.meta.thumb.data = new n(e.uid, t.meta.thumb.data)), t
                },
                getAsBlob: function(e, t) {
                    var i = this.getRuntime(),
                        a = i.shimExec.call(this, "Image", "getAsBlob", e, t);
                    return a ? new n(i.uid, a) : null
                },
                getAsDataURL: function() {
                    var e = this.getRuntime().Image.getAsBlob.apply(this, arguments);
                    return e ? (new a).readAsDataURL(e) : null
                }
            };
            return e.Image = r
        }), i(U, [r, s, u, l, _], function(e, t, i, n, a) {
            var r = "silverlight",
                s = {};
            return a.addConstructor(r, function(o) {
                var d, u = this;
                o = e.extend({
                        xap_url: t.xap_url
                    }, o), a.call(this, o, r, {
                        access_binary: a.capTrue,
                        access_image_binary: a.capTrue,
                        display_media: a.capTrue,
                        do_cors: a.capTrue,
                        drag_and_drop: !1,
                        report_upload_progress: a.capTrue,
                        resize_image: a.capTrue,
                        return_response_headers: function(e) {
                            return e && "client" === u.mode
                        },
                        return_response_type: function(e) {
                            return "json" !== e || !!window.JSON
                        },
                        return_status_code: function(t) {
                            return "client" === u.mode || !e.arrayDiff(t, [200, 404])
                        },
                        select_file: a.capTrue,
                        select_multiple: a.capTrue,
                        send_binary_string: a.capTrue,
                        send_browser_cookies: function(e) {
                            return e && "browser" === u.mode
                        },
                        send_custom_headers: function(e) {
                            return e && "client" === u.mode
                        },
                        send_multipart: a.capTrue,
                        slice_blob: a.capTrue,
                        stream_upload: !0,
                        summon_file_dialog: !1,
                        upload_filesize: a.capTrue,
                        use_http_method: function(t) {
                            return "client" === u.mode || !e.arrayDiff(t, ["GET", "POST"])
                        }
                    }, {
                        return_response_headers: function(e) {
                            return e ? "client" : "browser"
                        },
                        return_status_code: function(t) {
                            return e.arrayDiff(t, [200, 404]) ? "client" : ["client", "browser"]
                        },
                        send_browser_cookies: function(e) {
                            return e ? "browser" : "client"
                        },
                        send_custom_headers: function(e) {
                            return e ? "client" : "browser"
                        },
                        use_http_method: function(t) {
                            return e.arrayDiff(t, ["GET", "POST"]) ? "client" : ["client", "browser"]
                        }
                    }),
                    function(e) {
                        var t, i, n, a, r, s = !1,
                            o = 0;
                        try {
                            try {
                                new ActiveXObject("AgControl.AgControl").IsVersionSupported(e) && (s = !0)
                            } catch (u) {
                                var d = navigator.plugins["Silverlight Plug-In"];
                                if (d) {
                                    for ("1.0.30226.2" === (t = d.description) && (t = "2.0.30226.2"), i = t.split("."); i.length > 3;) i.pop();
                                    for (; i.length < 4;) i.push(0);
                                    for (n = e.split("."); n.length > 4;) n.pop();
                                    do {
                                        a = parseInt(n[o], 10), r = parseInt(i[o], 10), o++
                                    } while (o < n.length && a === r);
                                    r >= a && !isNaN(a) && (s = !0)
                                }
                            }
                        } catch (e) {
                            s = !1
                        }
                        return s
                    }("2.0.31005.0") && "Opera" !== t.browser || (this.mode = !1), e.extend(this, {
                        getShim: function() {
                            return i.get(this.uid).content.Moxie
                        },
                        shimExec: function(e, t) {
                            var i = [].slice.call(arguments, 2);
                            return u.getShim().exec(this.uid, e, t, i)
                        },
                        init: function() {
                            this.getShimContainer().innerHTML = '<object id="' + this.uid + '" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;"><param name="source" value="' + o.xap_url + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="uid=' + this.uid + ",target=" + t.global_event_dispatcher + '"/></object>', d = setTimeout(function() {
                                u && !u.initialized && u.trigger("Error", new n.RuntimeError(n.RuntimeError.NOT_INIT_ERR))
                            }, "Windows" !== t.OS ? 1e4 : 5e3)
                        },
                        destroy: function(e) {
                            return function() {
                                e.call(u), clearTimeout(d), o = d = e = u = null
                            }
                        }(this.destroy)
                    }, s)
            }), s
        }), i("moxie/runtime/silverlight/file/FileInput", [U, g, r], function(e, t, i) {
            var n = {
                init: function(e) {
                    var n = this,
                        a = this.getRuntime();
                    this.bind("Change", function() {
                        var e = a.shimExec.call(n, "FileInput", "getFiles");
                        n.files = [], i.each(e, function(e) {
                            n.files.push(new t(a.uid, e))
                        })
                    }, 999), this.getRuntime().shimExec.call(this, "FileInput", "init", function(e) {
                        for (var t = "", i = 0; i < e.length; i++) t += ("" !== t ? "|" : "") + e[i].title + " | *." + e[i].extensions.replace(/,/g, ";*.");
                        return t
                    }(e.accept), e.name, e.multiple), this.trigger("ready")
                }
            };
            return e.FileInput = n
        }), i("moxie/runtime/silverlight/file/Blob", [U, r, I], function(e, t, i) {
            return e.Blob = t.extend({}, i)
        }), i("moxie/runtime/silverlight/file/FileDrop", [U, u, A], function(e, t, i) {
            var n = {
                init: function() {
                    var e, n = this,
                        a = n.getRuntime();
                    return e = a.getShimContainer(), i.addEvent(e, "dragover", function(e) {
                        e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy"
                    }, n.uid), i.addEvent(e, "dragenter", function(e) {
                        e.preventDefault(), t.get(a.uid).dragEnter(e) && e.stopPropagation()
                    }, n.uid), i.addEvent(e, "drop", function(e) {
                        e.preventDefault(), t.get(a.uid).dragDrop(e) && e.stopPropagation()
                    }, n.uid), a.shimExec.call(this, "FileDrop", "init")
                }
            };
            return e.FileDrop = n
        }), i("moxie/runtime/silverlight/file/FileReader", [U, r, F], function(e, t, i) {
            return e.FileReader = t.extend({}, i)
        }), i("moxie/runtime/silverlight/file/FileReaderSync", [U, r, $], function(e, t, i) {
            return e.FileReaderSync = t.extend({}, i)
        }), i("moxie/runtime/silverlight/xhr/XMLHttpRequest", [U, r, N], function(e, t, i) {
            return e.XMLHttpRequest = t.extend({}, i)
        }), i("moxie/runtime/silverlight/runtime/Transporter", [U, r, W], function(e, t, i) {
            return e.Transporter = t.extend({}, i)
        }), i("moxie/runtime/silverlight/image/Image", [U, r, f, B], function(e, t, i, n) {
            return e.Image = t.extend({}, n, {
                getInfo: function() {
                    var e = this.getRuntime(),
                        n = {
                            meta: {}
                        },
                        a = e.shimExec.call(this, "Image", "getInfo");
                    return a.meta && (t.each(["tiff", "exif", "gps", "thumb"], function(e) {
                        var t, i, r, s, o = a.meta[e];
                        if (o && o.keys)
                            for (n.meta[e] = {}, i = 0, r = o.keys.length; r > i; i++)(s = o[t = o.keys[i]]) && (/^(\d|[1-9]\d+)$/.test(s) ? s = parseInt(s, 10) : /^\d*\.\d+$/.test(s) && (s = parseFloat(s)), n.meta[e][t] = s)
                    }), !n.meta || !n.meta.thumb || n.meta.thumb.data instanceof i || (n.meta.thumb.data = new i(e.uid, n.meta.thumb.data))), n.width = parseInt(a.width, 10), n.height = parseInt(a.height, 10), n.size = parseInt(a.size, 10), n.type = a.type, n.name = a.name, n
                }
            })
        }), i(q, [r, l, _, s], function(e, t, i, n) {
            var a = "html4",
                r = {};
            return i.addConstructor(a, function(t) {
                var s = this,
                    o = i.capTest,
                    d = i.capTrue;
                i.call(this, t, a, {
                    access_binary: o(window.FileReader || window.File && File.getAsDataURL),
                    access_image_binary: !1,
                    display_media: o(r.Image && (n.can("create_canvas") || n.can("use_data_uri_over32kb"))),
                    do_cors: !1,
                    drag_and_drop: !1,
                    filter_by_extension: o("Chrome" === n.browser && n.verComp(n.version, 28, ">=") || "IE" === n.browser && n.verComp(n.version, 10, ">=") || "Safari" === n.browser && n.verComp(n.version, 7, ">=")),
                    resize_image: function() {
                        return r.Image && s.can("access_binary") && n.can("create_canvas")
                    },
                    report_upload_progress: !1,
                    return_response_headers: !1,
                    return_response_type: function(t) {
                        return !("json" !== t || !window.JSON) || !!~e.inArray(t, ["text", "document", ""])
                    },
                    return_status_code: function(t) {
                        return !e.arrayDiff(t, [200, 404])
                    },
                    select_file: function() {
                        return n.can("use_fileinput")
                    },
                    select_multiple: !1,
                    send_binary_string: !1,
                    send_custom_headers: !1,
                    send_multipart: !0,
                    slice_blob: !1,
                    stream_upload: function() {
                        return s.can("select_file")
                    },
                    summon_file_dialog: function() {
                        return s.can("select_file") && ("Firefox" === n.browser && n.verComp(n.version, 4, ">=") || "Opera" === n.browser && n.verComp(n.version, 12, ">=") || "IE" === n.browser && n.verComp(n.version, 10, ">=") || !!~e.inArray(n.browser, ["Chrome", "Safari"]))
                    },
                    upload_filesize: d,
                    use_http_method: function(t) {
                        return !e.arrayDiff(t, ["GET", "POST"])
                    }
                }), e.extend(this, {
                    init: function() {
                        this.trigger("Init")
                    },
                    destroy: function(e) {
                        return function() {
                            e.call(s), e = s = null
                        }
                    }(this.destroy)
                }), e.extend(this.getShim(), r)
            }), r
        }), i("moxie/runtime/html4/file/FileInput", [q, g, r, u, A, d, s], function(e, t, i, n, a, r, s) {
            return e.FileInput = function() {
                function e() {
                    var r, l, c, _, m, h, p = this,
                        f = p.getRuntime();
                    h = i.guid("uid_"), r = f.getShimContainer(), o && (c = n.get(o + "_form")) && i.extend(c.style, {
                        top: "100%"
                    }), (_ = document.createElement("form")).setAttribute("id", h + "_form"), _.setAttribute("method", "post"), _.setAttribute("enctype", "multipart/form-data"), _.setAttribute("encoding", "multipart/form-data"), i.extend(_.style, {
                        overflow: "hidden",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }), (m = document.createElement("input")).setAttribute("id", h), m.setAttribute("type", "file"), m.setAttribute("name", d.name || "Filedata"), m.setAttribute("accept", u.join(",")), i.extend(m.style, {
                        fontSize: "999px",
                        opacity: 0
                    }), _.appendChild(m), r.appendChild(_), i.extend(m.style, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }), "IE" === s.browser && s.verComp(s.version, 10, "<") && i.extend(m.style, {
                        filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
                    }), m.onchange = function() {
                        var i;
                        if (this.value) {
                            if (this.files) {
                                if (0 === (i = this.files[0]).size) return void _.parentNode.removeChild(_)
                            } else i = {
                                name: this.value
                            };
                            i = new t(f.uid, i), this.onchange = function() {}, e.call(p), p.files = [i], m.setAttribute("id", i.uid), _.setAttribute("id", i.uid + "_form"), p.trigger("change"), m = _ = null
                        }
                    }, f.can("summon_file_dialog") && (l = n.get(d.browse_button), a.removeEvent(l, "click", p.uid), a.addEvent(l, "click", function(e) {
                        m && !m.disabled && m.click(), e.preventDefault()
                    }, p.uid)), o = h, r = c = l = null
                }
                var o, d, u = [];
                i.extend(this, {
                    init: function(t) {
                        var i, s = this,
                            o = s.getRuntime();
                        d = t, u = t.accept.mimes || r.extList2mimes(t.accept, o.can("filter_by_extension")), i = o.getShimContainer(),
                            function() {
                                var e, r, d;
                                e = n.get(t.browse_button), o.can("summon_file_dialog") && ("static" === n.getStyle(e, "position") && (e.style.position = "relative"), r = parseInt(n.getStyle(e, "z-index"), 10) || 1, e.style.zIndex = r, i.style.zIndex = r - 1), d = o.can("summon_file_dialog") ? e : i, a.addEvent(d, "mouseover", function() {
                                    s.trigger("mouseenter")
                                }, s.uid), a.addEvent(d, "mouseout", function() {
                                    s.trigger("mouseleave")
                                }, s.uid), a.addEvent(d, "mousedown", function() {
                                    s.trigger("mousedown")
                                }, s.uid), a.addEvent(n.get(t.container), "mouseup", function() {
                                    s.trigger("mouseup")
                                }, s.uid), e = null
                            }(), e.call(this), i = null, s.trigger({
                                type: "ready",
                                async: !0
                            })
                    },
                    disable: function(e) {
                        var t;
                        (t = n.get(o)) && (t.disabled = !!e)
                    },
                    destroy: function() {
                        var e = this.getRuntime(),
                            t = e.getShim(),
                            i = e.getShimContainer();
                        a.removeAllEvents(i, this.uid), a.removeAllEvents(d && n.get(d.container), this.uid), a.removeAllEvents(d && n.get(d.browse_button), this.uid), i && (i.innerHTML = ""), t.removeInstance(this.uid), o = u = d = i = t = null
                    }
                })
            }
        }), i("moxie/runtime/html4/file/FileReader", [q, S], function(e, t) {
            return e.FileReader = t
        }), i("moxie/runtime/html4/xhr/XMLHttpRequest", [q, r, u, v, l, A, f, b], function(e, t, i, n, a, r, s, o) {
            return e.XMLHttpRequest = function() {
                function e(e) {
                    var t, n, a, s, o = this,
                        d = !1;
                    if (l) {
                        if (t = l.id.replace(/_iframe$/, ""), n = i.get(t + "_form")) {
                            for (s = (a = n.getElementsByTagName("input")).length; s--;) switch (a[s].getAttribute("type")) {
                                case "hidden":
                                    a[s].parentNode.removeChild(a[s]);
                                    break;
                                case "file":
                                    d = !0
                            }
                            a = [], d || n.parentNode.removeChild(n), n = null
                        }
                        setTimeout(function() {
                            r.removeEvent(l, "load", o.uid), l.parentNode && l.parentNode.removeChild(l);
                            var t = o.getRuntime().getShimContainer();
                            t.children.length || t.parentNode.removeChild(t), t = l = null, e()
                        }, 1)
                    }
                }
                var d, u, l;
                t.extend(this, {
                    send: function(c, _) {
                        var m, h, p, f, g = this,
                            y = g.getRuntime();
                        if (d = u = null, _ instanceof o && _.hasBlob()) {
                            if (f = _.getBlob(), m = f.uid, p = i.get(m), !(h = i.get(m + "_form"))) throw new a.DOMException(a.DOMException.NOT_FOUND_ERR)
                        } else m = t.guid("uid_"), (h = document.createElement("form")).setAttribute("id", m + "_form"), h.setAttribute("method", c.method), h.setAttribute("enctype", "multipart/form-data"), h.setAttribute("encoding", "multipart/form-data"), y.getShimContainer().appendChild(h);
                        h.setAttribute("target", m + "_iframe"), _ instanceof o && _.each(function(e, i) {
                                if (e instanceof s) p && p.setAttribute("name", i);
                                else {
                                    var n = document.createElement("input");
                                    t.extend(n, {
                                        type: "hidden",
                                        name: i,
                                        value: e
                                    }), p ? h.insertBefore(n, p) : h.appendChild(n)
                                }
                            }), h.setAttribute("action", c.url),
                            function() {
                                var i = y.getShimContainer() || document.body,
                                    a = document.createElement("div");
                                a.innerHTML = '<iframe id="' + m + '_iframe" name="' + m + '_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>', l = a.firstChild, i.appendChild(l), r.addEvent(l, "load", function() {
                                    var i;
                                    try {
                                        i = l.contentWindow.document || l.contentDocument || window.frames[l.id].document, /^4(0[0-9]|1[0-7]|2[2346])\s/.test(i.title) ? d = i.title.replace(/^(\d+).*$/, "$1") : (d = 200, u = t.trim(i.body.innerHTML), g.trigger({
                                            type: "progress",
                                            loaded: u.length,
                                            total: u.length
                                        }), f && g.trigger({
                                            type: "uploadprogress",
                                            loaded: f.size || 1025,
                                            total: f.size || 1025
                                        }))
                                    } catch (t) {
                                        if (!n.hasSameOrigin(c.url)) return void e.call(g, function() {
                                            g.trigger("error")
                                        });
                                        d = 404
                                    }
                                    e.call(g, function() {
                                        g.trigger("load")
                                    })
                                }, g.uid)
                            }(), h.submit(), g.trigger("loadstart")
                    },
                    getStatus: function() {
                        return d
                    },
                    getResponse: function(e) {
                        if ("json" === e && "string" === t.typeOf(u) && window.JSON) try {
                            return JSON.parse(u.replace(/^\s*<pre[^>]*>/, "").replace(/<\/pre>\s*$/, ""))
                        } catch (e) {
                            return null
                        }
                        return u
                    },
                    abort: function() {
                        var t = this;
                        l && l.contentWindow && (l.contentWindow.stop ? l.contentWindow.stop() : l.contentWindow.document.execCommand ? l.contentWindow.document.execCommand("Stop") : l.src = "about:blank"), e.call(this, function() {
                            t.dispatchEvent("abort")
                        })
                    }
                })
            }
        }), i("moxie/runtime/html4/image/Image", [q, j], function(e, t) {
            return e.Image = t
        }),
        function(i) {
            for (var n = 0; n < i.length; n++) {
                for (var r = e, s = i[n], o = s.split(/[.\/]/), d = 0; d < o.length - 1; ++d) r[o[d]] === t && (r[o[d]] = {}), r = r[o[d]];
                r[o[o.length - 1]] = a[s]
            }
        }([r, s, o, d, u, l, c, _, m, h, p, f, g, y, M, v, L, w, b, k, Y, T, A])
}(this),
function(e) {
    "use strict";
    var t = {},
        i = e.moxie.core.utils.Basic.inArray;
    (function e(n) {
        var a, r;
        for (a in n) "object" !== (r = typeof n[a]) || ~i(a, ["Exceptions", "Env", "Mime"]) ? "function" === r && (t[a] = n[a]) : e(n[a])
    })(e.moxie), t.Env = e.moxie.core.utils.Env, t.Mime = e.moxie.core.utils.Mime, t.Exceptions = e.moxie.core.Exceptions, e.mOxie = t, e.o || (e.o = t)
}(this),
function(e, t, i) {
    function n(e) {
        function t(e, t, i) {
            var a = {
                chunks: "slice_blob",
                jpgresize: "send_binary_string",
                pngresize: "send_binary_string",
                progress: "report_upload_progress",
                multi_selection: "select_multiple",
                dragdrop: "drag_and_drop",
                drop_element: "drag_and_drop",
                headers: "send_custom_headers",
                urlstream_upload: "send_binary_string",
                canSendBinary: "send_binary",
                triggerDialog: "summon_file_dialog"
            };
            a[e] ? n[a[e]] = t : i || (n[e] = t)
        }
        var i = e.required_features,
            n = {};
        return "string" == typeof i ? s.each(i.split(/\s*,\s*/), function(e) {
            t(e, !0)
        }) : "object" == typeof i ? s.each(i, function(e, i) {
            t(i, e)
        }) : !0 === i && (e.chunk_size > 0 && (n.slice_blob = !0), !e.resize.enabled && e.multipart || (n.send_binary_string = !0), s.each(e, function(e, i) {
            t(i, !!e, !0)
        })), n
    }
    var a = e.setTimeout,
        r = {},
        s = {
            VERSION: "2.1.9",
            STOPPED: 1,
            STARTED: 2,
            QUEUED: 1,
            UPLOADING: 2,
            FAILED: 4,
            DONE: 5,
            GENERIC_ERROR: -100,
            HTTP_ERROR: -200,
            IO_ERROR: -300,
            SECURITY_ERROR: -400,
            INIT_ERROR: -500,
            FILE_SIZE_ERROR: -600,
            FILE_EXTENSION_ERROR: -601,
            FILE_DUPLICATE_ERROR: -602,
            IMAGE_FORMAT_ERROR: -700,
            MEMORY_ERROR: -701,
            IMAGE_DIMENSIONS_ERROR: -702,
            mimeTypes: t.mimes,
            ua: t.ua,
            typeOf: t.typeOf,
            extend: t.extend,
            guid: t.guid,
            getAll: function(e) {
                var t, i = [];
                "array" !== s.typeOf(e) && (e = [e]);
                for (var n = e.length; n--;)(t = s.get(e[n])) && i.push(t);
                return i.length ? i : null
            },
            get: t.get,
            each: t.each,
            getPos: t.getPos,
            getSize: t.getSize,
            xmlEncode: function(e) {
                var t = {
                    "<": "lt",
                    ">": "gt",
                    "&": "amp",
                    '"': "quot",
                    "'": "#39"
                };
                return e ? ("" + e).replace(/[<>&\"\']/g, function(e) {
                    return t[e] ? "&" + t[e] + ";" : e
                }) : e
            },
            toArray: t.toArray,
            inArray: t.inArray,
            addI18n: t.addI18n,
            translate: t.translate,
            isEmptyObj: t.isEmptyObj,
            hasClass: t.hasClass,
            addClass: t.addClass,
            removeClass: t.removeClass,
            getStyle: t.getStyle,
            addEvent: t.addEvent,
            removeEvent: t.removeEvent,
            removeAllEvents: t.removeAllEvents,
            cleanName: function(e) {
                var t, i;
                for (i = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"], t = 0; t < i.length; t += 2) e = e.replace(i[t], i[t + 1]);
                return e = (e = e.replace(/\s+/g, "_")).replace(/[^a-z0-9_\-\.]+/gi, "")
            },
            buildUrl: function(e, t) {
                var i = "";
                return s.each(t, function(e, t) {
                    i += (i ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(e)
                }), i && (e += (e.indexOf("?") > 0 ? "&" : "?") + i), e
            },
            formatSize: function(e) {
                function t(e, t) {
                    return Math.round(e * Math.pow(10, t)) / Math.pow(10, t)
                }
                if (e === i || /\D/.test(e)) return s.translate("N/A");
                var n = Math.pow(1024, 4);
                return e > n ? t(e / n, 1) + " " + s.translate("tb") : e > (n /= 1024) ? t(e / n, 1) + " " + s.translate("gb") : e > (n /= 1024) ? t(e / n, 1) + " " + s.translate("mb") : e > 1024 ? Math.round(e / 1024) + " " + s.translate("kb") : e + " " + s.translate("b")
            },
            parseSize: t.parseSizeStr,
            predictRuntime: function(e, i) {
                var n, a;
                return n = new s.Uploader(e), a = t.Runtime.thatCan(n.getOption().required_features, i || e.runtimes), n.destroy(), a
            },
            addFileFilter: function(e, t) {
                r[e] = t
            }
        };
    s.addFileFilter("mime_types", function(e, t, i) {
        e.length && !e.regexp.test(t.name) ? (this.trigger("Error", {
            code: s.FILE_EXTENSION_ERROR,
            message: s.translate("File extension error."),
            file: t
        }), i(!1)) : i(!0)
    }), s.addFileFilter("max_file_size", function(e, t, i) {
        e = s.parseSize(e), void 0 !== t.size && e && t.size > e ? (this.trigger("Error", {
            code: s.FILE_SIZE_ERROR,
            message: s.translate("File size error."),
            file: t
        }), i(!1)) : i(!0)
    }), s.addFileFilter("prevent_duplicates", function(e, t, i) {
        if (e)
            for (var n = this.files.length; n--;)
                if (t.name === this.files[n].name && t.size === this.files[n].size) return this.trigger("Error", {
                    code: s.FILE_DUPLICATE_ERROR,
                    message: s.translate("Duplicate file error."),
                    file: t
                }), void i(!1);
        i(!0)
    }), s.Uploader = function(e) {
        function o() {
            var e, t, i = 0;
            if (this.state == s.STARTED) {
                for (t = 0; t < D.length; t++) e || D[t].status != s.QUEUED ? i++ : (e = D[t], this.trigger("BeforeUpload", e) && (e.status = s.UPLOADING, this.trigger("UploadFile", e)));
                i == D.length && (this.state !== s.STOPPED && (this.state = s.STOPPED, this.trigger("StateChanged")), this.trigger("UploadComplete", D))
            }
        }

        function d(e) {
            e.percent = e.size > 0 ? Math.ceil(e.loaded / e.size * 100) : 100, u()
        }

        function u() {
            var e, t;
            for (k.reset(), e = 0; e < D.length; e++)(t = D[e]).size !== i ? (k.size += t.origSize, k.loaded += t.loaded * t.origSize / t.size) : k.size = i, t.status == s.DONE ? k.uploaded++ : t.status == s.FAILED ? k.failed++ : k.queued++;
            k.size === i ? k.percent = D.length > 0 ? Math.ceil(k.uploaded / D.length * 100) : 0 : (k.bytesPerSec = Math.ceil(k.loaded / ((+new Date - b || 1) / 1e3)), k.percent = k.size > 0 ? Math.ceil(k.loaded / k.size * 100) : 0)
        }

        function l() {
            var e = S[0] || x[0];
            return !!e && e.getRuntime().uid
        }

        function c(e, i) {
            var n = this,
                a = 0,
                r = [],
                o = {
                    runtime_order: e.runtimes,
                    required_caps: e.required_features,
                    preferred_caps: A,
                    swf_url: e.flash_swf_url,
                    xap_url: e.silverlight_xap_url
                };
            s.each(e.runtimes.split(/\s*,\s*/), function(t) {
                e[t] && (o[t] = e[t])
            }), e.browse_button && s.each(e.browse_button, function(i) {
                r.push(function(r) {
                    var d = new t.FileInput(s.extend({}, o, {
                        accept: e.filters.mime_types,
                        name: e.file_data_name,
                        multiple: e.multi_selection,
                        container: e.container,
                        browse_button: i
                    }));
                    d.onready = function() {
                        var e = t.Runtime.getInfo(this.ruid);
                        t.extend(n.features, {
                            chunks: e.can("slice_blob"),
                            multipart: e.can("send_multipart"),
                            multi_selection: e.can("select_multiple")
                        }), a++, S.push(this), r()
                    }, d.onchange = function() {
                        n.addFile(this.files)
                    }, d.bind("mouseenter mouseleave mousedown mouseup", function(n) {
                        E || (e.browse_button_hover && ("mouseenter" === n.type ? t.addClass(i, e.browse_button_hover) : "mouseleave" === n.type && t.removeClass(i, e.browse_button_hover)), e.browse_button_active && ("mousedown" === n.type ? t.addClass(i, e.browse_button_active) : "mouseup" === n.type && t.removeClass(i, e.browse_button_active)))
                    }), d.bind("mousedown", function() {
                        n.trigger("Browse")
                    }), d.bind("error runtimeerror", function() {
                        d = null, r()
                    }), d.init()
                })
            }), e.drop_element && s.each(e.drop_element, function(e) {
                r.push(function(i) {
                    var r = new t.FileDrop(s.extend({}, o, {
                        drop_zone: e
                    }));
                    r.onready = function() {
                        var e = t.Runtime.getInfo(this.ruid);
                        t.extend(n.features, {
                            chunks: e.can("slice_blob"),
                            multipart: e.can("send_multipart"),
                            dragdrop: e.can("drag_and_drop")
                        }), a++, x.push(this), i()
                    }, r.ondrop = function() {
                        n.addFile(this.files)
                    }, r.bind("error runtimeerror", function() {
                        r = null, i()
                    }), r.init()
                })
            }), t.inSeries(r, function() {
                "function" == typeof i && i(a)
            })
        }

        function _(e, n, a) {
            var r = new t.Image;
            try {
                r.onload = function() {
                    if (n.width > this.width && n.height > this.height && n.quality === i && n.preserve_headers && !n.crop) return this.destroy(), a(e);
                    r.downsize(n.width, n.height, n.crop, n.preserve_headers)
                }, r.onresize = function() {
                    a(this.getAsBlob(e.type, n.quality)), this.destroy()
                }, r.onerror = function() {
                    a(e)
                }, r.load(e)
            } catch (t) {
                a(e)
            }
        }

        function m(e, i, a) {
            function r(e, t, i) {
                var n = w[e];
                switch (e) {
                    case "max_file_size":
                        "max_file_size" === e && (w.max_file_size = w.filters.max_file_size = t);
                        break;
                    case "chunk_size":
                        (t = s.parseSize(t)) && (w[e] = t, w.send_file_name = !0);
                        break;
                    case "multipart":
                        w[e] = t, t || (w.send_file_name = !0);
                        break;
                    case "unique_names":
                        w[e] = t, t && (w.send_file_name = !0);
                        break;
                    case "filters":
                        "array" === s.typeOf(t) && (t = {
                            mime_types: t
                        }), i ? s.extend(w.filters, t) : w.filters = t, t.mime_types && (w.filters.mime_types.regexp = function(e) {
                            var t = [];
                            return s.each(e, function(e) {
                                s.each(e.extensions.split(/,/), function(e) {
                                    /^\s*\*\s*$/.test(e) ? t.push("\\.*") : t.push("\\." + e.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"))
                                })
                            }), new RegExp("(" + t.join("|") + ")$", "i")
                        }(w.filters.mime_types));
                        break;
                    case "resize":
                        i ? s.extend(w.resize, t, {
                            enabled: !0
                        }) : w.resize = t;
                        break;
                    case "prevent_duplicates":
                        w.prevent_duplicates = w.filters.prevent_duplicates = !!t;
                        break;
                    case "container":
                    case "browse_button":
                    case "drop_element":
                        t = "container" === e ? s.get(t) : s.getAll(t);
                    case "runtimes":
                    case "multi_selection":
                    case "flash_swf_url":
                    case "silverlight_xap_url":
                        w[e] = t, i || (d = !0);
                        break;
                    default:
                        w[e] = t
                }
                i || o.trigger("OptionChanged", e, t, n)
            }
            var o = this,
                d = !1;
            "object" == typeof e ? s.each(e, function(e, t) {
                r(t, e, a)
            }) : r(e, i, a), a ? (w.required_features = n(s.extend({}, w)), A = n(s.extend({}, w, {
                required_features: !0
            }))) : d && (o.trigger("Destroy"), c.call(o, w, function(e) {
                e ? (o.runtime = t.Runtime.getInfo(l()).type, o.trigger("Init", {
                    runtime: o.runtime
                }), o.trigger("PostInit")) : o.trigger("Error", {
                    code: s.INIT_ERROR,
                    message: s.translate("Init error.")
                })
            }))
        }

        function h(e, t) {
            if (e.settings.unique_names) {
                var i = t.name.match(/\.([^.]+)$/),
                    n = "part";
                i && (n = i[1]), t.target_name = t.id + "." + n
            }
        }

        function p(e, i) {
            function n() {
                l-- > 0 ? a(r, 1e3) : (i.loaded = m, e.trigger("Error", {
                    code: s.HTTP_ERROR,
                    message: s.translate("HTTP Error."),
                    file: i,
                    response: Y.responseText,
                    status: Y.status,
                    responseHeaders: Y.getAllResponseHeaders()
                }))
            }

            function r() {
                var _, h, p, f = {};
                i.status === s.UPLOADING && e.state !== s.STOPPED && (e.settings.send_file_name && (f.name = i.target_name || i.name), u && c.chunks && o.size > u ? (p = Math.min(u, o.size - m), _ = o.slice(m, m + p)) : (p = o.size, _ = o), u && c.chunks && (e.settings.send_chunk_number ? (f.chunk = Math.ceil(m / u), f.chunks = Math.ceil(o.size / u)) : (f.offset = m, f.total = o.size)), (Y = new t.XMLHttpRequest).upload && (Y.upload.onprogress = function(t) {
                    i.loaded = Math.min(i.size, m + t.loaded), e.trigger("UploadProgress", i)
                }), Y.onload = function() {
                    Y.status >= 400 ? n() : (l = e.settings.max_retries, p < o.size ? (_.destroy(), m += p, i.loaded = Math.min(m, o.size), e.trigger("ChunkUploaded", i, {
                        offset: i.loaded,
                        total: o.size,
                        response: Y.responseText,
                        status: Y.status,
                        responseHeaders: Y.getAllResponseHeaders()
                    }), "Android Browser" === t.Env.browser && e.trigger("UploadProgress", i)) : i.loaded = i.size, _ = h = null, !m || m >= o.size ? (i.size != i.origSize && (o.destroy(), o = null), e.trigger("UploadProgress", i), i.status = s.DONE, e.trigger("FileUploaded", i, {
                        response: Y.responseText,
                        status: Y.status,
                        responseHeaders: Y.getAllResponseHeaders()
                    })) : a(r, 1))
                }, Y.onerror = function() {
                    n()
                }, Y.onloadend = function() {
                    this.destroy(), Y = null
                }, e.settings.multipart && c.multipart ? (Y.open("post", d, !0), s.each(e.settings.headers, function(e, t) {
                    Y.setRequestHeader(t, e)
                }), h = new t.FormData, s.each(s.extend(f, e.settings.multipart_params), function(e, t) {
                    h.append(t, e)
                }), h.append(e.settings.file_data_name, _), Y.send(h, {
                    runtime_order: e.settings.runtimes,
                    required_caps: e.settings.required_features,
                    preferred_caps: A,
                    swf_url: e.settings.flash_swf_url,
                    xap_url: e.settings.silverlight_xap_url
                })) : (d = s.buildUrl(e.settings.url, s.extend(f, e.settings.multipart_params)), Y.open("post", d, !0), Y.setRequestHeader("Content-Type", "application/octet-stream"), s.each(e.settings.headers, function(e, t) {
                    Y.setRequestHeader(t, e)
                }), Y.send(_, {
                    runtime_order: e.settings.runtimes,
                    required_caps: e.settings.required_features,
                    preferred_caps: A,
                    swf_url: e.settings.flash_swf_url,
                    xap_url: e.settings.silverlight_xap_url
                })))
            }
            var o, d = e.settings.url,
                u = e.settings.chunk_size,
                l = e.settings.max_retries,
                c = e.features,
                m = 0;
            i.loaded && (m = i.loaded = u ? u * Math.floor(i.loaded / u) : 0), o = i.getSource(), e.settings.resize.enabled && function(e, i) {
                if (e.ruid) {
                    var n = t.Runtime.getInfo(e.ruid);
                    if (n) return n.can(i)
                }
                return !1
            }(o, "send_binary_string") && ~t.inArray(o.type, ["image/jpeg", "image/png"]) ? _.call(this, o, e.settings.resize, function(e) {
                o = e, i.size = e.size, r()
            }) : r()
        }

        function f(e, t) {
            d(t)
        }

        function g(e) {
            if (e.state == s.STARTED) b = +new Date;
            else if (e.state == s.STOPPED)
                for (var t = e.files.length - 1; t >= 0; t--) e.files[t].status == s.UPLOADING && (e.files[t].status = s.QUEUED, u())
        }

        function y() {
            Y && Y.abort()
        }

        function M(e) {
            u(), a(function() {
                o.call(e)
            }, 1)
        }

        function v(e, t) {
            t.code === s.INIT_ERROR ? e.destroy() : t.code === s.HTTP_ERROR && (t.file.status = s.FAILED, d(t.file), e.state == s.STARTED && (e.trigger("CancelUpload"), a(function() {
                o.call(e)
            }, 1)))
        }

        function L(e) {
            e.stop(), s.each(D, function(e) {
                e.destroy()
            }), D = [], S.length && (s.each(S, function(e) {
                e.destroy()
            }), S = []), x.length && (s.each(x, function(e) {
                e.destroy()
            }), x = []), A = {}, E = !1, b = Y = null, k.reset()
        }
        var w, b, k, Y, T = s.guid(),
            D = [],
            A = {},
            S = [],
            x = [],
            E = !1;
        w = {
            runtimes: t.Runtime.order,
            max_retries: 0,
            chunk_size: 0,
            multipart: !0,
            multi_selection: !0,
            file_data_name: "file",
            flash_swf_url: "js/Moxie.swf",
            silverlight_xap_url: "js/Moxie.xap",
            filters: {
                mime_types: [],
                prevent_duplicates: !1,
                max_file_size: 0
            },
            resize: {
                enabled: !1,
                preserve_headers: !0,
                crop: !1
            },
            send_file_name: !0,
            send_chunk_number: !0
        }, m.call(this, e, null, !0), k = new s.QueueProgress, s.extend(this, {
            id: T,
            uid: T,
            state: s.STOPPED,
            features: {},
            runtime: null,
            files: D,
            settings: w,
            total: k,
            init: function() {
                var e, i, n = this;
                return "function" == typeof(e = n.getOption("preinit")) ? e(n) : s.each(e, function(e, t) {
                        n.bind(t, e)
                    }),
                    function() {
                        this.bind("FilesAdded FilesRemoved", function(e) {
                            e.trigger("QueueChanged"), e.refresh()
                        }), this.bind("CancelUpload", y), this.bind("BeforeUpload", h), this.bind("UploadFile", p), this.bind("UploadProgress", f), this.bind("StateChanged", g), this.bind("QueueChanged", u), this.bind("Error", v), this.bind("FileUploaded", M), this.bind("Destroy", L)
                    }.call(n), s.each(["container", "browse_button", "drop_element"], function(e) {
                        if (null === n.getOption(e)) return i = {
                            code: s.INIT_ERROR,
                            message: s.translate("'%' specified, but cannot be found.")
                        }, !1
                    }), i ? n.trigger("Error", i) : w.browse_button || w.drop_element ? void c.call(n, w, function(e) {
                        var i = n.getOption("init");
                        "function" == typeof i ? i(n) : s.each(i, function(e, t) {
                            n.bind(t, e)
                        }), e ? (n.runtime = t.Runtime.getInfo(l()).type, n.trigger("Init", {
                            runtime: n.runtime
                        }), n.trigger("PostInit")) : n.trigger("Error", {
                            code: s.INIT_ERROR,
                            message: s.translate("Init error.")
                        })
                    }) : n.trigger("Error", {
                        code: s.INIT_ERROR,
                        message: s.translate("You must specify either 'browse_button' or 'drop_element'.")
                    })
            },
            setOption: function(e, t) {
                m.call(this, e, t, !this.runtime)
            },
            getOption: function(e) {
                return e ? w[e] : w
            },
            refresh: function() {
                S.length && s.each(S, function(e) {
                    e.trigger("Refresh")
                }), this.trigger("Refresh")
            },
            start: function() {
                this.state != s.STARTED && (this.state = s.STARTED, this.trigger("StateChanged"), o.call(this))
            },
            stop: function() {
                this.state != s.STOPPED && (this.state = s.STOPPED, this.trigger("StateChanged"), this.trigger("CancelUpload"))
            },
            disableBrowse: function() {
                E = arguments[0] === i || arguments[0], S.length && s.each(S, function(e) {
                    e.disable(E)
                }), this.trigger("DisableBrowse", E)
            },
            getFile: function(e) {
                var t;
                for (t = D.length - 1; t >= 0; t--)
                    if (D[t].id === e) return D[t]
            },
            addFile: function(e, i) {
                function n(e, i) {
                    var n = [];
                    t.each(d.settings.filters, function(t, i) {
                        r[i] && n.push(function(n) {
                            r[i].call(d, t, e, function(e) {
                                n(!e)
                            })
                        })
                    }), t.inSeries(n, i)
                }
                var o, d = this,
                    u = [],
                    c = [];
                o = l(),
                    function e(r) {
                        var l = t.typeOf(r);
                        if (r instanceof t.File) {
                            if (!r.ruid && !r.isDetached()) {
                                if (!o) return !1;
                                r.ruid = o, r.connectRuntime(o)
                            }
                            e(new s.File(r))
                        } else r instanceof t.Blob ? (e(r.getSource()), r.destroy()) : r instanceof s.File ? (i && (r.name = i), u.push(function(e) {
                            n(r, function(t) {
                                t || (D.push(r), c.push(r), d.trigger("FileFiltered", r)), a(e, 1)
                            })
                        })) : -1 !== t.inArray(l, ["file", "blob"]) ? e(new t.File(null, r)) : "node" === l && "filelist" === t.typeOf(r.files) ? t.each(r.files, e) : "array" === l && (i = null, t.each(r, e))
                    }(e), u.length && t.inSeries(u, function() {
                        c.length && d.trigger("FilesAdded", c)
                    })
            },
            removeFile: function(e) {
                for (var t = "string" == typeof e ? e : e.id, i = D.length - 1; i >= 0; i--)
                    if (D[i].id === t) return this.splice(i, 1)[0]
            },
            splice: function(e, t) {
                var n = D.splice(e === i ? 0 : e, t === i ? D.length : t),
                    a = !1;
                return this.state == s.STARTED && (s.each(n, function(e) {
                    if (e.status === s.UPLOADING) return a = !0, !1
                }), a && this.stop()), this.trigger("FilesRemoved", n), s.each(n, function(e) {
                    e.destroy()
                }), a && this.start(), n
            },
            dispatchEvent: function(e) {
                var t, i;
                if (e = e.toLowerCase(), t = this.hasEventListener(e)) {
                    t.sort(function(e, t) {
                        return t.priority - e.priority
                    }), (i = [].slice.call(arguments)).shift(), i.unshift(this);
                    for (var n = 0; n < t.length; n++)
                        if (!1 === t[n].fn.apply(t[n].scope, i)) return !1
                }
                return !0
            },
            bind: function(e, t, i, n) {
                s.Uploader.prototype.bind.call(this, e, t, n, i)
            },
            destroy: function() {
                this.trigger("Destroy"), w = k = null, this.unbindAll()
            }
        })
    }, s.Uploader.prototype = t.EventTarget.instance, s.File = function() {
        var e = {};
        return function(i) {
            s.extend(this, {
                id: s.guid(),
                name: i.name || i.fileName,
                type: i.type || "",
                size: i.size || i.fileSize,
                origSize: i.size || i.fileSize,
                loaded: 0,
                percent: 0,
                status: s.QUEUED,
                lastModifiedDate: i.lastModifiedDate || (new Date).toLocaleString(),
                getNative: function() {
                    var e = this.getSource().getSource();
                    return -1 !== t.inArray(t.typeOf(e), ["blob", "file"]) ? e : null
                },
                getSource: function() {
                    return e[this.id] ? e[this.id] : null
                },
                destroy: function() {
                    var t = this.getSource();
                    t && (t.destroy(), delete e[this.id])
                }
            }), e[this.id] = i
        }
    }(), s.QueueProgress = function() {
        var e = this;
        e.size = 0, e.loaded = 0, e.uploaded = 0, e.failed = 0, e.queued = 0, e.percent = 0, e.bytesPerSec = 0, e.reset = function() {
            e.size = e.loaded = e.uploaded = e.failed = e.queued = e.percent = e.bytesPerSec = 0
        }
    }, e.plupload = s
}(window, mOxie),
function(e, t, i) {
    function n(e, t) {
        return typeof e === t
    }

    function a(e) {
        var t = c.className,
            i = u._config.classPrefix || "";
        if (_ && (t = t.baseVal), u._config.enableJSClass) {
            var n = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
            t = t.replace(n, "$1" + i + "js$2")
        }
        u._config.enableClasses && (t += " " + i + e.join(" " + i), _ ? c.className.baseVal = t : c.className = t)
    }

    function r(e, t) {
        if ("object" == typeof e)
            for (var i in e) l(e, i) && r(i, e[i]);
        else {
            var n = (e = e.toLowerCase()).split("."),
                s = u[n[0]];
            if (2 == n.length && (s = s[n[1]]), void 0 !== s) return u;
            t = "function" == typeof t ? t() : t, 1 == n.length ? u[n[0]] = t : (!u[n[0]] || u[n[0]] instanceof Boolean || (u[n[0]] = new Boolean(u[n[0]])), u[n[0]][n[1]] = t), a([(t && 0 != t ? "" : "no-") + n.join("-")]), u._trigger(e, t)
        }
        return u
    }
    var s = [],
        o = [],
        d = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var i = this;
                setTimeout(function() {
                    t(i[e])
                }, 0)
            },
            addTest: function(e, t, i) {
                o.push({
                    name: e,
                    fn: t,
                    options: i
                })
            },
            addAsyncTest: function(e) {
                o.push({
                    name: null,
                    fn: e
                })
            }
        },
        u = function() {};
    u.prototype = d, u = new u;
    var l, c = t.documentElement,
        _ = "svg" === c.nodeName.toLowerCase();
    ! function() {
        var e = {}.hasOwnProperty;
        l = n(e, "undefined") || n(e.call, "undefined") ? function(e, t) {
            return t in e && n(e.constructor.prototype[t], "undefined")
        } : function(t, i) {
            return e.call(t, i)
        }
    }(), d._l = {}, d.on = function(e, t) {
            this._l[e] || (this._l[e] = []), this._l[e].push(t), u.hasOwnProperty(e) && setTimeout(function() {
                u._trigger(e, u[e])
            }, 0)
        }, d._trigger = function(e, t) {
            if (this._l[e]) {
                var i = this._l[e];
                setTimeout(function() {
                    var e;
                    for (e = 0; e < i.length; e++)(0, i[e])(t)
                }, 0), delete this._l[e]
            }
        }, u._q.push(function() {
            d.addTest = r
        }), u.addAsyncTest(function() {
            function e(e, t, i) {
                function n(t) {
                    var n = !(!t || "load" !== t.type) && 1 == a.width;
                    r(e, "webp" === e && n ? new Boolean(n) : n), i && i(t)
                }
                var a = new Image;
                a.onerror = n, a.onload = n, a.src = t
            }
            var t = [{
                    uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
                    name: "webp"
                }, {
                    uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
                    name: "webp.alpha"
                }, {
                    uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
                    name: "webp.animation"
                }, {
                    uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
                    name: "webp.lossless"
                }],
                i = t.shift();
            e(i.name, i.uri, function(i) {
                if (i && "load" === i.type)
                    for (var n = 0; n < t.length; n++) e(t[n].name, t[n].uri)
            })
        }),
        function() {
            var e, t, i, a, r, d;
            for (var l in o)
                if (o.hasOwnProperty(l)) {
                    if (e = [], (t = o[l]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                        for (i = 0; i < t.options.aliases.length; i++) e.push(t.options.aliases[i].toLowerCase());
                    for (a = n(t.fn, "function") ? t.fn() : t.fn, r = 0; r < e.length; r++) 1 === (d = e[r].split(".")).length ? u[d[0]] = a : (!u[d[0]] || u[d[0]] instanceof Boolean || (u[d[0]] = new Boolean(u[d[0]])), u[d[0]][d[1]] = a), s.push((a ? "" : "no-") + d.join("-"))
                }
        }(), a(s), delete d.addTest, delete d.addAsyncTest;
    for (var m = 0; m < u._q.length; m++) u._q[m]();
    e.Modernizr = u
}(window, document);
var ButtonPreloader = {
    buttons: [],
    showPreloader: function(e) {
        var t = $(e);
        t.css("pointer-events", "none"), this.buttons[e] = t.html(), t.html('<div class="wrapper-preloader"><div class="circle circle-1"></div><div class="circle circle-1a"></div><div class="circle circle-2"></div><div class="circle circle-3"></div></div>')
    },
    hidePreloader: function(e) {
        var t = $(e);
        t.css("pointer-events", "auto"), t.html(this.buttons[e]), this.buttons.splice(e, 1)
    }
};

function preloader(e, t, i) {
    void 0 !== i ? e ? ButtonPreloader.showPreloader(i) : ButtonPreloader.hidePreloader(i) : e ? $(t).html('<div class="alert alert-primary">' + i18next.t("common.request_in_progress") + "</div>") : $(t).html("")
}

function hideConfirmPopup(e, t, i) {
    e && $(e).hasClass("confirm-true") && window.close_popup_after_action && (!t && $(i).hasClass("confirm-status") || setTimeout(function() {
        $.magnificPopup.close()
    }, 5))
}

function setAuthTokenToRequestHeaders(e) {
    $.ajaxSetup({
        beforeSend: function(t) {
            t.setRequestHeader("Authorization", "Bearer " + e)
        },
        beforeSendHeaders: function(t) {
            t.setRequestHeader("Authorization", "Bearer " + e)
        }
    })
}

function currentHostIsSubDomain() {
    return location.hostname.split(".").length >= 3
}

function redirectByCurrentHost(e) {
    currentHostIsSubDomain() ? (setAuthTokenToRequestHeaders(localStorage.getItem("vs_auth_token")), $.get(api_domain_name + "/get_auth_token", {}, function(t) {
        t.auth_token ? window.location.href = main_domain_name + e + "?auth_token=" + t.auth_token : alert("ÐŸÑ€Ð¾Ð¸Ð·Ð¾ÑˆÐ»Ð° Ð¾ÑˆÐ¸Ð±ÐºÐ°. ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°, ÑÐ²ÑÐ¶Ð¸Ñ‚ÐµÑÑŒ Ñ Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÐµÐ¹.")
    })) : window.location.href = e
}
var RequestHelpers = {
        getParameter: function(e) {
            var t = window.location.search;
            return !!(t = t.match(new RegExp(e + "=([^&=]+)"))) && t[1]
        },
        getAllParameters: function() {
            var e = window.location.search;
            if ("" === e) return {};
            e = (e = e.slice(1)).split("&");
            var t, i = {};
            for (var n in e) i[(t = e[n].split("="))[0]] = t[1] || null;
            return i
        }
    },
    OrderFilesUploadController = {
        plupload_objects: [],
        error_plupload: !1,
        current_upload_button: void 0,
        already_added_files: [],
        initAdminEditOrderPlupload: function() {
            var e = this;
            this._basePlupload("files_container", "add_files", {
                file_added_handler: function(t, i) {
                    var n = $("#files_list");
                    !0 !== e.already_added_files[0] && (n.find("li:last-child").addClass("no-border"), n.append('<div class="NewAddFiles"><p class="FilesHeader">Ð”Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ñ‹Ðµ Ð´Ð»Ñ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ Ñ„Ð°Ð¹Ð»Ñ‹</p></div>'), e.already_added_files[0] = !0), plupload.each(i, function(t) {
                        e._addTaskFileToSimpleList(n, t)
                    })
                },
                upload_progress: function(e, t) {
                    $("#" + t.id).find("[role=progressbar]").css("width", t.percent)
                },
                upload_complete_success: function(e, t) {
                    $("#order_edit").submit()
                },
                error: function(e) {
                    var t = $("#" + e);
                    t.find(".react-fine-uploader-file-progress-bar-container").remove(), t.find(".react-fine-uploader-filesize-value").addClass("text-red").html("ÐžÑˆÐ¸Ð±ÐºÐ°")
                }
            }), this._fileDelete(".FileLoader", 0, function(e) {
                if (0 === e.files.length) {
                    var t = $("#files_list");
                    t.find(".NewAddFiles").remove(), t.find("li:last-child").removeClass("no-border")
                }
            })
        },
        initAdminOrderPlupload: function(e) {
            var t = this,
                i = e ? "task_files_list" : "files_list",
                n = e ? "add_task_file" : "add_file";
            this._basePlupload(i, n, {
                file_added_handler: function(i, n) {
                    e || $("#upload_files_result").html("");
                    var a = e ? $("#task_files_list") : $("#files_list");
                    e ? $(".UploadTaskFilesButton").removeClass("hide") : ($(".UploadFilesButton").removeClass("hide"), $(".FilesOptions").removeClass("hide"));
                    var r = !1;
                    a.find("div").is(".NewTaskFiles") || (a.append('<div class="NewTaskFiles"><p class="FilesHeader">Ð”Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ñ‹Ðµ Ð´Ð»Ñ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ Ñ„Ð°Ð¹Ð»Ñ‹</p></div>'), r = !0), plupload.each(n, function(e) {
                        t._addFileToManagementList(a, e, r), r = !1
                    })
                },
                upload_progress: function(e, t) {
                    $("#" + t.id).find("[role=progressbar]").text("Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° " + t.percent + "%")
                },
                file_uploaded: function(e, t, i, n) {
                    e.find("[role=progressbar]").text("Ð—Ð°Ð³Ñ€ÑƒÐ¶ÐµÐ½Ð¾")
                },
                upload_complete_success: function() {},
                upload_complete: function() {
                    e || $(".FilesOptions").addClass("hide")
                },
                error: function(e) {
                    $("#" + e).find("[role=progressbar]").addClass("text-red").text("ÐžÑˆÐ¸Ð±ÐºÐ°")
                }
            }), this._fileDelete(".Task, .Files", 0, function(i) {
                0 === t._countNotUploaded(i) && (e ? (0 === i.files.length && $("#task_files_list").find(".NewTaskFiles").remove(), $(".UploadTaskFilesButton").addClass("hide")) : (0 === i.files.length && $("#files_list").find(".NewTaskFiles").remove(), $(".UploadFilesButton").addClass("hide"), $(".FilesOptions").addClass("hide")))
            })
        },
        initPublicCreateOrderPlupload: function() {
            var e = this;
            this._basePlupload("files_container", "add_files", {
                file_added_handler: function(t, i) {
                    var n = $("#files_list");
                    plupload.each(i, function(t) {
                        e._addTaskFileToSimpleList(n, t)
                    }), CreateOrderPopupController.setCountAddedFiles(t.files.length), CreateOrderPopupController.updateFieldsFilledHints()
                },
                upload_progress: function(e, t) {
                    $("#" + t.id).find("[role=progressbar]").css("width", t.percent)
                },
                upload_complete: function(e, t) {
                    CreateOrderPopupController.endCreateOrder()
                },
                error: function(e) {
                    var t = $("#" + e);
                    t.find(".react-fine-uploader-file-progress-bar-container").remove(), t.find(".react-fine-uploader-filesize-value").addClass("text-red").html(i18next.t("files.error")), CreateOrderPopupController.errorWhenUploadFiles()
                }
            }), this._fileDelete(".FileLoader", 0, function(e) {
                CreateOrderPopupController.setCountAddedFiles(e.files.length), CreateOrderPopupController.updateFieldsFilledHints()
            }), this.setErrorCloseCallback(function() {
                setTimeout(function() {
                    CreateOrderPopupController.openPopup()
                }, 5)
            })
        },
        initQuizCreateOrderPlupload: function() {
            var e = this;
            this._basePlupload("files_container", "add_files", {
                file_added_handler: function(t, i) {
                    var n = $("#files_container"),
                        a = t.files.length;
                    plupload.each(i, function(i) {
                        e._addFileToQuizList(n, i, t.files)
                    }), QuizCreateOrderPopupController.setCountAddedFiles(a)
                },
                upload_progress: function(e, t) {
                    $("#" + t.id).find("[role=progressbar]").css("width", t.percent)
                },
                upload_complete: function(e, t) {
                    QuizCreateOrderPopupController.endCreateOrder()
                },
                error: function(e) {
                    $("#" + e).find("[role=progressbar]").addClass("Error"), QuizCreateOrderPopupController.errorWhenUploadFiles()
                }
            }), this._fileDelete("#files_list", 0, function(e) {
                QuizCreateOrderPopupController.setCountAddedFiles(e.files.length)
            }), this.setErrorCloseCallback(function() {
                setTimeout(function() {
                    QuizCreateOrderPopupController.openPopup()
                }, 5)
            })
        },
        startTaskUpload: function(e, t, i) {
            var n = "/admin/order/management/" + i + "/upload_file?_token=" + token + "&order_id=" + i + "&is_task_file=1&from_who=3";
            return this._upload(e, t, n)
        },
        startUpload: function(e, t, i) {
            var n = $("[name=from_who]:checked").val(),
                a = $("[name=need_notify]:checked").val(),
                r = "/admin/order/management/" + i + "/upload_file?_token=" + token + "&order_id=" + i + "&from_who=" + n + "&need_notify=" + a;
            return this._upload(e, t, r)
        },
        setErrorCloseCallback: function(e) {
            this.error_close_callback = e
        },
        removeAllFilesAfterLoad: function(e) {
            e = e || 0;
            var t = this.plupload_objects[e];
            if (0 !== t.files.length) {
                t.files.forEach(function(e) {
                    setTimeout(function() {
                        t.removeFile(e.id), $("#" + e.id).remove()
                    }, 10)
                });
                var i = this;
                setTimeout(function() {
                    0 === i._countNotUploaded(t) && (i.already_added_files[e] = !1)
                }, 100)
            }
        },
        _showError: function(e) {
            showPopupError(i18next.t("files.upload_error") + " " + e, this.error_close_callback)
        },
        _addTaskFileToSimpleList: function(e, t) {
            e.append('<li id="' + t.id + '"><div class="FileItem"><div class="FileName"><span class="react-fine-uploader-filename ">' + t.name + '</span></div><div class="FileSize"><div class="react-fine-uploader-file-progress-bar-container "><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" class="react-fine-uploader-file-progress-bar " role="progressbar" style="width: 0;"></div></div><span class="react-fine-uploader-filesize "><span class="react-fine-uploader-filesize-value">' + plupload.formatSize(t.size) + '</span></span></div><div class="DelFile"><button aria-label="cancel" class="del-btn" data-id="' + t.id + '" type="button">Ã—</button></div></div></li>')
        },
        _addFileToQuizList: function(e, t, i) {
            e.before('<div id="' + t.id + '" class="File col-6 col-sm-3"><div class="Wrap"><div class="FileProgressBar" role="progressbar" style="width: 0;"></div><img class="IconFile" src="/images/blue_file.svg" alt="file" /><img class="IconDelete del-btn" src="/images/gray_close.svg" alt="delete" data-id="' + t.id + '" /><span class="FileName">' + t.name + "</span></div></div>")
        },
        _addFileToManagementList: function(e, t, i) {
            e.append('<div id="' + t.id + '">' + (i ? "" : "<hr>") + '<div class="TaskFiles-item"><div class="item-name"><div class="name"><p><a href="#">' + t.name + '</a></p></div></div><div class="item-control"><span class="btn btn-link btn-small-size" role="progressbar"></span><div class="buttons"><button class="btn btn-link btn-small-size del-btn" data-id="' + t.id + '">' + i18next.t("common.delete") + '</button></div><div class="size">' + plupload.formatSize(t.size) + "</div></div></div></div>")
        },
        _upload: function(e, t, i) {
            var n = this.plupload_objects[void 0 === e ? 0 : e];
            void 0 !== t && (this.current_upload_button = t, t.addClass("hide"));
            var a = localStorage.getItem("vs_auth_token");
            return n.settings.headers = {
                Authorization: "Bearer " + a
            }, n.settings.url = i, this._countNotUploaded(n) > 0 && (n.start(), !0)
        },
        _countNotUploaded: function(e) {
            var t = 0;
            return $.each(e.files, function(e, i) {
                0 === i.loaded && t++
            }), t
        },
        _fileDelete: function(e, t, i) {
            e = $(e), t = void 0 === t ? 0 : t;
            var n = this;
            e.on("click", ".del-btn", function() {
                var e = $(this);
                if (void 0 === e.attr("title")) {
                    var a = n.plupload_objects[t];
                    a.removeFile(a.getFile(e.data("id"))), $("#" + e.data("id")).remove(), 0 === n._countNotUploaded(a) && (n.already_added_files[t] = !1), void 0 !== i && i(a)
                }
            })
        },
        _basePlupload: function(e, t, i) {
            for (var n in {
                    file_added_handler: function() {},
                    upload_progress: function() {},
                    file_uploaded: function() {},
                    upload_complete_success: function() {},
                    upload_complete: function() {},
                    error: function() {}
                }) void 0 === i[n] && (i[n] = function() {});
            var a = this,
                r = new plupload.Uploader({
                    browse_button: t,
                    container: document.getElementById(e),
                    runtimes: "html5,flash,silverlight,html4",
                    url: "",
                    filters: {
                        max_file_size: "100mb",
                        prevent_duplicates: !0,
                        unique_names: !0,
                        mime_types: [{
                            title: i18next.t("files.images"),
                            extensions: "jpg,jpeg,gif,png,bmp,tif,tiff,wmf,tga,svg"
                        }, {
                            title: i18next.t("files.archives"),
                            extensions: "zip,rar,tar,7z"
                        }, {
                            title: i18next.t("files.docs"),
                            extensions: "doc,docx,pdf,xls,xlsx,xlsm,odt,txt,rtf,djvu,ppt,pptx,accdb,mdb"
                        }, {
                            title: i18next.t("files.project_files"),
                            extensions: "dwg,cdw,m3d,psd"
                        }]
                    },
                    flash_swf_url: "Moxie.swf",
                    silverlight_xap_url: "Moxie.xap",
                    init: {
                        FilesAdded: i.file_added_handler,
                        UploadProgress: i.upload_progress,
                        Error: function(e, t) {
                            a._showError(t.message), this.error_plupload = !0, i.error(t.file.id)
                        },
                        UploadFile: function(e, t) {
                            $("#" + t.id).find(".del-btn").remove()
                        },
                        FileUploaded: function(e, t, n) {
                            var r = JSON.parse(n.response),
                                s = $("#" + t.id);
                            "true" !== r.success && !0 !== r.success ? (this.error_plupload = !0, a._showError(r.error), i.error(t.id)) : (i.file_uploaded(s, e, t, r), s.find(".del-btn").remove())
                        },
                        UploadComplete: function(e, t) {
                            !0 === this.error_plupload ? this.error_plupload = !1 : i.upload_complete_success(e, t), i.upload_complete(e, t)
                        }
                    }
                });
            r.init(), this.plupload_objects.push(r)
        }
    };

function focusedOnField() {
    $(this).parents(".field").addClass("field-focused field-not-empty").removeClass("field-error").removeClass("field-info").find(".errorText").hide()
}

function checkEmail(e) {
    return /^([a-z0-9_\.\-\+])+@[a-z0-9-]+\.([a-z0-9]{2,}\.)?[a-z]{2,4}$/i.test(e)
}

function checkPhone(e) {
    return ("USA" === window.country ? /^[+]\d{5,}$/i : /^[+](?:79|380|37|77|992|993|994|996|998|375|48)\d{9}$/i).test(e)
}

function checkAccount(e) {
    return checkEmail(e) || checkPhone(e)
}

function showFieldError(e, t) {
    var i = $(e).closest(".form-item-container"),
        n = i.find(".errorText");
    n.text(t), 26 === n.height() && (i.addClass("big-error"), n.addClass("big-error")), n.fadeIn(), i.addClass("field-error")
}

function hideFieldsErrors() {
    $(".errorText, .Success, #systemError").fadeOut(), $(".errorText.big-error").removeClass("big-error"), $(".field").closest(".form-item-container").removeClass("field-error").removeClass("big-error")
}

function showFieldInfo(e, t) {
    (e = $(e)).parent().find(".errorText").html('<span class="info">' + t + "</span>").fadeIn(), e.closest(".field").addClass("field-info")
}

function showDateFieldInfo(e, t, i) {
    var n = $(e).parent();
    n.find("div").is(".errorText") || n.append('<div class="errorText"></div>'), n.find(".errorText").html('<span class="' + (!0 !== i ? "info" : "") + '" style="text-transform: none;">' + t + "</span>").fadeIn(), n.closest(".InputDatePicker").addClass(i ? "field-error" : "field-info")
}

function hideDateFieldInfo(e) {
    $(e).parent().find(".errorText").hide().closest(".InputDatePicker").removeClass("field-info")
}

function hideFieldError(e) {
    $(e).closest(".form-item-container").find(".errorText").fadeOut(), $(e).closest(".form-item-container").removeClass("field-error")
}

function fieldNotEmpty(e) {
    $(e).parents(".field").addClass("field-not-empty")
}

function fieldEmpty(e) {
    $(e).parents(".field").removeClass("field-not-empty")
}

function changeCheckbox(e, t) {
    e = $(e), (t = void 0 === t ? e.prop("checked") : t) ? e.prev(".option-input").addClass("option-input-checked") : e.prev(".option-input").removeClass("option-input-checked")
}

function changeRadio(e) {
    $(e).parentsUntil(".checkbox-radio-container").find(".option-input").removeClass("option-input-checked"), $(e).prop("checked") && $(e).prev(".option-input").addClass("option-input-checked")
}

function setSelectValue(e, t) {
    (e = $(e)).find("option").removeAttr("selected");
    var i = e.find("[value=" + t + "]").attr("selected", "true");
    e.parent().find("#select2-" + e.attr("id") + "-container").text(i.text())
}

function setDateField(e, t, i) {
    (e = $(e)).attr("value", t).val(t), e.parent().find(".DateInput__display-text").text(i).addClass("DateInput__display-text--has-input"), e.closest(".InputDatePicker").addClass("field-not-empty")
}

function getStandardPhone(e) {
    return "" === (e = e.replace(/[^0-9]/g, "", e)) ? "" : ("+" !== e[0] && (e = "+" + e), "8" === e[1] && (e = "+7" + e.slice(2)), e)
}

function setCKEditorValue(e, t) {
    window.CKEDITOR && CKEDITOR.instances[e] && CKEDITOR.instances[e].setData(t)
}

function getCKEditorValue(e) {
    if (window.CKEDITOR && CKEDITOR.instances[e]) return CKEDITOR.instances[e].getData()
}
$(function() {
    $(document).on("focus", "input, textarea", focusedOnField).on("blur", "input, textarea", function() {
        $(this).parents(".field").removeClass("field-focused"), "" === $(this).val() && $(this).parents(".field").removeClass("field-not-empty")
    }), $(document).on("click", ".select2", focusedOnField).on("click", ".datepicker", function() {
        var e = $(this);
        e.find(".errorText").hide(), e.find(".InputDatePicker").removeClass("field-error").removeClass("field-info")
    }).on("click", ".radio", function() {
        $(this).removeClass("field-error").find(".errorText").hide()
    }), $(".Eye").click(function() {
        var e = $(this),
            t = e.parent().parent().find("[type=password], [type=text]");
        e.hasClass("field-password-hide") ? (e.removeClass("field-password-hide").addClass("field-password-show"), t.attr("type", "text")) : (e.removeClass("field-password-show").addClass("field-password-hide"), t.prop("type", "password"))
    }), fieldNotEmpty($("#account")), fieldNotEmpty($("#password"))
});
var MutationObserver = function() {
    for (var e = ["WebKit", "Moz", "O", "Ms", ""], t = 0; t < e.length; t++)
        if (e[t] + "MutationObserver" in window) return window[e[t] + "MutationObserver"];
    return !1
}();

function mutationObserve(e, t) {
    $("*").is("#" + e) && new MutationObserver(function(e) {
        e.forEach(t)
    }).observe(document.getElementById(e), {
        attributes: !0
    })
}

function setMagnificPopupCloseCallback(e) {
    $.magnificPopup.instance.st.callbacks = {
        close: e,
        afterClose: function() {
            this.st.callbacks.close = void 0
        }
    }
}

function showPopupError(e, t) {
    $("#error-popup").find(".Error").text(e), $.magnificPopup.open({
        items: {
            src: "#error-popup"
        },
        type: "inline",
        preloader: !1
    }), void 0 !== t && setMagnificPopupCloseCallback(t)
}
$(function() {
    $(document).on("click", ".mfp-content .Close, .mfp-content .close", function() {
        $.magnificPopup.close()
    })
}), $(function() {
    $("#error-popup").find(".close").click(function() {
        $.magnificPopup.close()
    })
});
var CookieHelpers = {
    getCookie: function(e) {
        var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
        return t ? decodeURIComponent(t[1]) : void 0
    },
    setCookie: function(e, t, i) {
        void 0 === (i = i || {}).path && (i.path = "/");
        var n = i.expires;
        if ("number" == typeof n && n) {
            var a = new Date;
            a.setTime(a.getTime() + 1e3 * n), n = i.expires = a
        }
        n && n.toUTCString && (i.expires = n.toUTCString());
        var r = e + "=" + (t = encodeURIComponent(t));
        for (var s in i) {
            r += "; " + s;
            var o = i[s];
            !0 !== o && (r += "=" + o)
        }
        document.cookie = r
    },
    removeCookie: function(e) {
        this.setCookie(e, "", {
            expires: -1
        })
    }
};
! function() {
    window.ValidationHelpers = {
        showServerErrors: function(e, t) {
            if (t = t || {}, e.validation_errors) {
                var i, n;
                for (i in e.validation_errors) n = e.validation_errors[i][0], showFieldError(t[i] || "#" + i, n)
            } else {
                if (1 === Number(e.operation_status.code)) return void showFieldError(t.account || "#account", e.operation_status.message);
                $("#systemError").text(e.operation_status.message).fadeIn()
            }
        }
    }
}(),
function() {
    window.FormErrorsController = {
        ajaxError: function(e, t) {
            var i = e.responseJSON;
            i.operation_status || (i.operation_status = {
                status: "error",
                message: i18next.t("common.server_error")
            });
            ValidationHelpers.showServerErrors(i, t)
        },
        ajaxFail: function(e) {
            alert(i18next.t("common.server_error"))
        }
    }
}();
var EmailReplacer = {
    replace: function(e) {
        var t = (e = $(e)).val();
        if ("" === t) return t;
        var i = t.split("@"),
            n = i[0],
            a = i[1];
        if (!a) return t;
        var r = this._check_domain_rules_error(n, a);
        return !1 !== r && e.val(r), t
    },
    _domain_rules: ["aol.com", "yahoo.com", "gmail.com", "outlook.com", "me.com", "icloud.com", "yandex.ru", "ya.ru", "rambler.ru", "mail.ru", "bk.ru", "list.ru", "narod.ru", "inbox.ru", "lenta.ru", "ro.ru", "gmail.ru", "hotmail.com", "yandex.ua", "yandex.kz", "meta.ua", "mail.ua", "tut.by"],
    _domain_no_dots: function(e) {
        return e.replace(/\./g, "")
    },
    _check_domain_rules_error: function(e, t) {
        var i = this._domain_no_dots(t),
            n = i.length,
            a = this,
            r = "";
        return this._domain_rules.forEach(function(t) {
            if ("" === r) {
                var s = a._domain_no_dots(t),
                    o = 0,
                    d = 0,
                    u = 0;
                if (n === s.length) {
                    for (d = 0; d < n; d++) i[d] !== s[d] && o++;
                    if (o < 2) return void(r = e + "@" + t)
                } else if (n === s.length + 1) {
                    for (d = 0; d < n; d++) i[d] !== s[d + u] && (o++, u = -1);
                    if (o < 2) return void(r = e + "@" + t)
                } else if (n === s.length - 1) {
                    for (d = 0; d < n; d++) i[d] !== s[d + u] && (o++, u = 1);
                    if (o < 2) return r = e + "@" + t
                }
            }
        }), "" !== r && r
    }
};
$(function() {
    $(".Faq .QuestionBlock").click(function() {
        var e = $(this),
            t = e.find(".Answer"),
            i = e.find("img:nth-child(2)");
        "block" === t.css("display") ? (t.hide("slow"), i.css("transform", "rotate(90deg)")) : (t.show("slow"), i.css("transform", "rotate(180deg)"))
    })
});
var SendMessageForm = {
    form: ".send-message-form",
    init: function() {
        $(".open-send-message-form").click(function() {
            $.magnificPopup.open({
                items: {
                    src: "#send-message-form"
                },
                type: "inline"
            })
        }), $(this.form).submit(this.sendForm)
    },
    sendForm: function() {
        var e = $(this),
            t = e.find('[name="mess-email"]'),
            i = e.find('[name="mess-text"]');
        if ("" === t.val()) return showFieldError(t, i18next.t("auth.empty_email")), !1;
        if (!checkEmail(t.val())) return showFieldError(t, i18next.t("auth.incorrect_email")), !1;
        if ("" === i.val()) return showFieldError(i, i18next.t("question.enter_question")), !1;
        if (i.val().length < 3) return showFieldError(i, i18next.t("question.small_message")), !1;
        var n = {
                email: t.val(),
                comment: i.val(),
                type: window.send_message_form_type || null,
                _token: token
            },
            a = e.find("button"),
            r = e.find(".result");
        return ButtonPreloader.showPreloader(a), $.post("/landing/action/feedback", n, function(e) {
            r.html('<div class="alert alert-success">' + i18next.t("question.message_sent") + "</div>"), a.hide(), ButtonPreloader.hidePreloader(a)
        }).fail(function(e) {
            ButtonPreloader.hidePreloader(a);
            var t = e.responseJSON;
            showFieldError(i, t.message || t.operation_status.message)
        }), !1
    }
};
$(function() {
    $(".alert .close").click(function() {
        $(this).parent(".alert").hide()
    }), $(".tooltipster").tooltipster({
        theme: "tooltipster-shadow",
        anchor: "bottom-center",
        offset: [0, 13],
        plugins: ["follower"],
        animation: "fade",
        delay: 0,
        animationDuration: 0
    })
});
var AuthorizationController = {
    success_handler: void 0,
    need_only_customers: !1,
    login_button: "#login_button",
    auth_popup: $("#sign_in_popup"),
    auth: function() {
        var e = $("#account").val().trim(),
            t = $("#password").val();
        if (checkEmail(e) || (e = getStandardPhone(e)), hideFieldsErrors(), !this.checkAuthErrors(e, t)) return !1;
        var i = {
            account: e,
            password: t,
            registration_page: window.registration_page || null,
            _token: token
        };
        return this.need_only_customers && (i.only_customer = this.need_only_customers), ButtonPreloader.showPreloader(this.login_button), window.recaptcha_enabled ? (this.just_was_recaptcha && (grecaptcha.reset(), this.just_was_recaptcha = !1), this.request_data = i, grecaptcha.execute()) : this.processAuth(i), !1
    },
    processAuth: function(e) {
        var t = this;
        $.ajax({
            url: "/login",
            type: "POST",
            data: e,
            success: function(e) {
                if (e.operation_status) switch (e.operation_status.status) {
                    case "success":
                        if (void 0 !== t.success_handler) return void t.success_handler(e);
                        localStorage.setItem("vs_auth_token", e.jwt_token), redirectByCurrentHost("/main_redirect");
                        break;
                    case "error":
                        ValidationHelpers.showServerErrors(e)
                }
            },
            error: FormErrorsController.ajaxError,
            fail: FormErrorsController.ajaxFail
        }).always(function() {
            ButtonPreloader.hidePreloader(t.login_button)
        })
    },
    processAfterReCaptcha: function() {
        this.just_was_recaptcha = !0;
        var e = this.request_data;
        e.recaptcha_token = grecaptcha.getResponse(), this.processAuth(e)
    },
    openAuthPopup: function() {
        $.magnificPopup.open({
            items: {
                src: "#sign_in_popup"
            },
            type: "inline",
            preloader: !1,
            fixedContentPos: !0
        }), setMagnificPopupCloseCallback(function() {
            AuthorizationController.clearSuccessHandler()
        })
    },
    checkAuthErrors: function(e, t, i, n) {
        i = i || {
            account: $("#account"),
            password: $("#password")
        };
        var a = !0;
        return "" === e && (showFieldError(i.account, i18next.t(n ? "auth.empty_email" : "auth.empty_login")), a = !1), "" === t && (showFieldError(i.password, i18next.t("auth.empty_password")), a = !1), t.length < 5 && (showFieldError(i.password, i18next.t("auth.small_password")), a = !1), (n && !checkEmail(e) || !n && !checkAccount(e)) && (showFieldError(i.account, i18next.t(n ? "auth.incorrect_email" : "auth.incorrect_login")), a = !1), a
    },
    clearSuccessHandler: function() {
        this.success_handler = void 0, this.auth_popup.find(".AdditionalInfo").remove()
    },
    setSuccessHandler: function(e) {
        this.success_handler = e
    },
    setAccount: function(e) {
        $("#account").val(e), fieldNotEmpty("#account")
    },
    setNeedOnlyCustomers: function(e) {
        this.need_only_customers = e
    },
    addAdditionalInfo: function(e) {
        this.auth_popup.find("h2").after('<p class="AdditionalInfo">' + e + "</p>")
    }
};
$(document).ready(function() {
    var e = $(".VideoClip");
    e.magnificPopup({
        type: "iframe",
        iframe: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>',
            patterns: {
                youtube: {
                    src: "//www.youtube.com/embed/" + e.data("id") + "?rel=0&amp;showinfo=0&amp;autoplay=1"
                }
            },
            srcAction: "iframe_src"
        }
    }), e.click(function() {
        CookieHelpers.setCookie("see_video_clip", "1", {
            expires: 31536e3
        })
    })
});
var AutocompleteInput = {
        input: ".subject-autocomplete input",
        url: "/autocomplete/subject",
        _already_init: !1,
        init: function(e) {
            if (!this._already_init) {
                this._already_init = !0, e && (this.input = e.input ? e.input : this.input, this.url = e.url ? e.url : this.url);
                var t = this;
                $(t.input).keyup(function() {
                    var e = $(this);
                    e.val().length > 2 ? $.post(t.url, {
                        text: e.val()
                    }, function(i) {
                        t.autocomplete(e, i.data)
                    }) : t.autocomplete(e, [])
                })
            }
        },
        autocomplete: function(e, t, i, n) {
            var a = this,
                r = e.parent(),
                s = e.val();
            r.find("div").is(".autocomplete-container") || r.append("<div class='AutoComplete autocomplete-container'><ul></ul></div>");
            var o = r.find(".autocomplete-container");
            if (s.length > 2 || !0 === i)
                if (void 0 !== t && 0 !== t.length) {
                    var d = "";
                    t.forEach(function(e) {
                        d += "<li>" + e + "</li>"
                    }), o.find("ul").html(d), void 0 === n ? o.find("li").click(function() {
                        e.val($(this).text()), a.hideAutocomplete(o)
                    }) : o.find("li").click(n), a.showAutocomplete(o)
                } else o.find("ul").html(""), a.hideAutocomplete(o);
            else a.hideAutocomplete(o)
        },
        showAutocomplete: function(e) {
            e.parent().addClass("focused"), e.show()
        },
        hideAutocomplete: function(e) {
            e.parent().removeClass("focused"), e.hide()
        }
    },
    AntiplagiatController = {
        antiplagiat_block: ".Antiplagiat",
        antiplagiat_flag: "[name=antiplagiat_flag]",
        active_antiplagiat_flag: "[name=antiplagiat_flag]:checked",
        antiplagiat_value_block: ".AntiplagiatValue",
        antiplagiat_value: "#antiplagiat_value",
        antiplagiat_hint: ".AntiplagiatHint",
        order_type_select: "#type",
        subject_input: "#subject",
        hide_antiplagiat_flag: "#hideAntiplagiat",
        init: function(e) {
            if (e)
                for (var t in e) this[t] = e[t];
            this.antiplagiat_block = $(this.antiplagiat_block), this.antiplagiat_flag = $(this.antiplagiat_flag), this.antiplagiat_value_block = $(this.antiplagiat_value_block), this.antiplagiat_value = $(this.antiplagiat_value), this.antiplagiat_hint = $(this.antiplagiat_hint), this.order_type_select = $(this.order_type_select), this.subject_input = $(this.subject_input), this.hide_antiplagiat_flag = $(this.hide_antiplagiat_flag);
            var i = this;
            i.antiplagiat_flag.change(function() {
                "0" === $(this).val() ? (i.antiplagiat_value_block.addClass("hide"), i.antiplagiat_hint.hide()) : (i.antiplagiat_value_block.removeClass("hide"), i.antiplagiat_hint.show())
            }), this.antiplagiat_value.keyup($.proxy(this.checkAntiplagiatValue, this)).focusout($.proxy(this.checkAntiplagiatValue, this)), this.order_type_select.change($.proxy(this.checkShowAntiplagiat, this)), this.subject_input.on("change keyup", $.proxy(this.checkShowAntiplagiat, this))
        },
        checkAntiplagiatValue: function() {
            var e = this.antiplagiat_value.val(),
                t = !1;
            this.antiplagiat_value.parent().removeClass("field-error"), (e = e.replace(/[^0-9]/gim, "")).length > 2 && (e = e.substr(0, 2));
            var i = parseInt(e);
            if (1 === (e = isNaN(i) ? "%" : i + "%").length && (e = "", this.antiplagiat_value.parent().addClass("field-error"), t = !0), this.antiplagiat_value.val(e), void 0 !== this.antiplagiat_hint.length)
                if (t) this.antiplagiat_hint.html('<span class="text-red">' + i18next.t("antiplagiat.incorrect_value") + "</span>").show();
                else {
                    var n = parseInt(this.order_type_select.val());
                    10 !== n && 13 !== n ? i >= 90 && i <= 100 ? this.antiplagiat_hint.html('<span class="text-red">' + i18next.t("antiplagiat.big_value") + "</span>").show() : i >= 76 && i <= 89 ? this.antiplagiat_hint.html(i18next.t("antiplagiat.medium_value")).show() : this.antiplagiat_hint.hide().html("") : this.antiplagiat_hint.hide().html("")
                }
            return !t
        },
        checkShowAntiplagiat: function() {
            var e = this.subject_input.val(),
                t = parseInt(this.order_type_select.val());
            if (-1 === t) return this.hideAntiplagiat(), !1;
            if (-1 === [8, 6, 10, 13, 7, 16, 11, 12, 21, 20].indexOf(t) && new RegExp(i18next.t("antiplagiat.bad_subjects_regexp"), "iu").test(e)) return this.hideAntiplagiat(), !1;
            return -1 !== [7, 16, 11, 12, 21, 20, 19].indexOf(t) ? (this.hideAntiplagiat(), !1) : (this.hide_antiplagiat_flag.val(0), this.antiplagiat_block.removeClass("hide"), !0)
        },
        hideAntiplagiat: function() {
            this.hide_antiplagiat_flag.val(1), this.antiplagiat_block.addClass("hide")
        },
        showFlagError: function() {
            showFieldError(this.antiplagiat_flag.closest(".radio").find("[for=" + this.antiplagiat_flag.attr("name") + "]"), i18next.t("antiplagiat.select_value"))
        },
        isNeedAntiplagiat: function() {
            return this.checkShowAntiplagiat() ? parseInt($(this.active_antiplagiat_flag).val() || 0) : 0
        },
        getAntiplagiatValue: function() {
            return this.antiplagiat_value.val().replace("%", "")
        }
    },
    CreateOrderPopupController = {
        selectors: {
            form: "#create_order_form",
            send_button: "#create_order_send",
            order_type: "#create_order_type",
            subject: "#subject",
            deadline: "#date_deadline",
            comment: "#comment",
            account: "#customer_account",
            login: "#customer_login",
            phone: "#phone",
            auth_data_block: ".AuthDataBlock",
            file_loader_block: ".FileLoader"
        },
        count_added_files: 0,
        user_id: void 0,
        is_new_user: void 0,
        is_for_admin: !1,
        registration_url: "/landing/action/registration",
        create_order_url: "/landing/action/create_order",
        activate_order_url: "/landing/action/activate_order",
        registration_page: 1,
        init: function(e) {
            if (e)
                for (var t in e) this[t] = e[t];
            for (var i in this.selectors) this.selectors[i] = $(this.selectors[i]);
            this.bindEvents(), this.is_for_admin && this.showAuthDataBlock(), this.selectors.phone.length > 0 && showFieldInfo(this.selectors.phone, i18next.t("registration.phone_comment"))
        },
        bindEvents: function() {
            var e = this;
            $(".place-order-popup").click(function() {
                var t = $(this);
                t.data("order-type") ? e.openPopup(t.data("order-type")) : e.openPopup(-1)
            }), this.selectors.order_type.change($.proxy(this.updateTypeHints, this)), mutationObserve(this.selectors.deadline.attr("id"), $.proxy(this.updateDeadlineHint, this)), this.selectors.form.find("[type=text], textarea").focusout($.proxy(this.updateFieldsFilledHints, this)), this.selectors.account.focusout($.proxy(this.checkAccount, this)), this.selectors.send_button.click($.proxy(this.sendForm, this)), this.is_for_admin && (this.selectors.form.find("#clear_order_popup").click($.proxy(this.clearForm, this)), this.selectors.form.find("#remove_files").click(this.removeFiles))
        },
        openPopup: function(e) {
            1 === this.selectors.order_type.find("option").length && this.loadOrderTypes(), void 0 !== e && setSelectValue(this.selectors.order_type, e), $.magnificPopup.open({
                items: {
                    src: "#place_order_popup"
                },
                fixedContentPos: !0,
                type: "inline"
            })
        },
        loadOrderTypes: function() {
            var e = this;
            this.sendRequest("/support_data/get_order_types", "get", {}, this.selectors.form.find(".result"), function(t) {
                var i = t.order_types,
                    n = "";
                for (var a in i) {
                    n += '<option value="' + a + '">' + i[a] + "</option>"
                }
                e.selectors.order_type.append(n)
            })
        },
        checkAccount: function() {
            var e = this.selectors.account;
            return e.val(e.val().trim()), this.is_for_admin && !checkEmail(e.val()) || EmailReplacer.replace(e), !this.is_for_admin && !checkEmail(e.val()) || this.is_for_admin && !checkAccount(e.val()) ? (showFieldError(e, this.is_for_admin ? i18next.t("auth.incorrect_login") : i18next.t("auth.incorrect_email")), !1) : (hideFieldError(e), !0)
        },
        updateTypeHints: function() {
            var e = this.selectors.order_type.val(),
                t = $(".InputDatePicker label"),
                i = this.selectors.comment.parent().find("label");
            "20" === e ? (t.text(i18next.t("create_order.date_start")), i.text(i18next.t("create_order.comment_placeholder"))) : (t.text(i18next.t("create_order.deadline")), "1" === e || "10" === e || "8" === e || "9" === e ? i.text(i18next.t("create_order.comment_placeholder_2")) : "21" === e ? i.text(i18next.t("create_order.comment_placeholder_3")) : i.text(i18next.t("create_order.comment"))), this.updateFieldsFilledHints()
        },
        updateDeadlineHint: function() {
            var e = this.selectors.deadline.val(),
                t = this.selectors.order_type.val();
            if (0 !== e.length) {
                var i = i18next.t("create_order.big_deadline"),
                    n = new Date,
                    a = new Date(e),
                    r = Math.floor((a - n) / 864e5);
                "20" === t || "21" === t ? hideDateFieldInfo(this.selectors.deadline) : "6" === t || "3" === t ? r < 14 ? showDateFieldInfo(this.selectors.deadline, i) : hideDateFieldInfo(this.selectors.deadline) : "1" === t || "5" === t || "15" === t ? r < 5 ? showDateFieldInfo(this.selectors.deadline, i) : hideDateFieldInfo(this.selectors.deadline) : null != t && (r < 3 ? showDateFieldInfo(this.selectors.deadline, i) : hideDateFieldInfo(this.selectors.deadline)), this.updateFieldsFilledHints()
            }
        },
        updateFieldsFilledHints: function() {
            var e = 0; - 1 !== parseInt(this.selectors.order_type.val()) && e++, 0 !== this.selectors.subject.val().length && e++, 0 !== this.selectors.deadline.val().length && e++, 0 !== this.selectors.login.val().length && e++, 0 !== this.selectors.account.val().length && e++, 0 !== this.selectors.comment.val().length && e++, 0 === this.count_added_files && e > 4 ? showFieldInfo(this.selectors.form.find(".FileList"), i18next.t("create_order.need_files_info")) : hideFieldError(this.selectors.form.find(".FileList")), e >= 2 && (this.user_id || this.showAuthDataBlock(), this.showFileLoaderBlock())
        },
        setCountAddedFiles: function(e) {
            this.count_added_files = e
        },
        sendForm: function() {
            if (!this.validateFrom()) return !1;
            this.selectors.deadline.find(".InputDatePicker").removeClass("field-info"), void 0 === this.user_id ? this.attemptUserRegistration() : this.createNewOrder()
        },
        validateFrom: function() {
            var e = !0; - 1 === parseInt(this.selectors.order_type.val()) && (showFieldError(this.selectors.order_type, i18next.t("create_order.select_type")), e = !1);
            var t = this.selectors.subject.val().trim().length;
            0 === t && (showFieldError(this.selectors.subject, i18next.t("create_order.enter_subject")), e = !1), t < 3 && (showFieldError(this.selectors.subject, i18next.t("create_order.enter_more_three_symbols")), e = !1), 0 === this.selectors.deadline.val().length && (showDateFieldInfo(this.selectors.deadline, i18next.t("create_order.select_deadline"), !0), e = !1), moment(this.selectors.deadline.val(), "YYYY-MM-DD").isBefore(moment(), "day") && (showDateFieldInfo(this.selectors.deadline, i18next.t("create_order.select_date_more_now"), !0), e = !1), AntiplagiatController.checkShowAntiplagiat() && !AntiplagiatController.antiplagiat_flag.is(":checked") && (AntiplagiatController.showFlagError(), e = !1), AntiplagiatController.checkShowAntiplagiat() && !AntiplagiatController.checkAntiplagiatValue() && (e = !1), 0 === this.selectors.comment.val().trim().length && (showFieldError(this.selectors.comment, i18next.t("create_order.enter_comment")), e = !1);
            var i = this.selectors.login.val().trim().length;
            if (0 === i && (showFieldError(this.selectors.login, i18next.t("create_order.enter_name")), e = !1), i < 2 && (showFieldError(this.selectors.login, i18next.t("create_order.enter_more_two_symbols")), e = !1), this.checkAccount() || (e = !1), !this.is_for_admin && this.selectors.phone.length > 0) {
                if ("" === this.selectors.phone.val()) return showFieldError(this.selectors.phone, i18next.t("registration.enter_phone")), !1;
                if (this.selectors.phone.val().length < 7) return showFieldError(this.selectors.phone, i18next.t("registration.incorrect_phone")), !1
            }
            return e
        },
        attemptUserRegistration: function() {
            var e = this,
                t = this.selectors.phone.val();
            t && (t = getStandardPhone(t));
            var i = {
                    user_type: 1,
                    account: this.selectors.account.val().trim(),
                    login: this.selectors.login.val().trim(),
                    phone: t,
                    registration_page: this.registration_page,
                    registered_from: this.registered_from || null,
                    is_from_create_order: 1,
                    _token: token
                },
                n = this.selectors.form.find(".result");
            this.sendRequest(this.registration_url, "post", i, n, function(t) {
                if (t.already_registered) return e.is_for_admin ? (e.user_id = t.user_id, e.is_new_user = !1, e.user_auth_token = t.user_auth_token, void e.createNewOrder()) : (AuthorizationController.setSuccessHandler(function(t) {
                    localStorage.setItem("vs_auth_token", t.jwt_token), e.user_id = t.user_id, $.magnificPopup.close(), e.hideAuthDataBlock(), e.openPopup(), e.createNewOrder()
                }), AuthorizationController.setNeedOnlyCustomers(!0), AuthorizationController.setAccount(e.selectors.account.val().trim()), AuthorizationController.addAdditionalInfo(i18next.t("create_order.email_already_registered")), void AuthorizationController.openAuthPopup());
                e.user_id = t.user_id, e.is_for_admin ? e.is_new_user = !0 : (localStorage.setItem("vs_auth_token", t.jwt_token), e.hideAuthDataBlock()), e.createNewOrder()
            })
        },
        hideAuthDataBlock: function() {
            this.selectors.auth_data_block.hide()
        },
        showAuthDataBlock: function() {
            this.selectors.auth_data_block.show()
        },
        showFileLoaderBlock: function() {
            this.selectors.file_loader_block.show()
        },
        createNewOrder: function() {
            var e = AntiplagiatController.isNeedAntiplagiat(),
                t = {
                    user_id: this.user_id,
                    type: this.selectors.order_type.val(),
                    subject: this.selectors.subject.val(),
                    kdate: this.selectors.deadline.val(),
                    text: this.selectors.comment.val(),
                    apval: AntiplagiatController.getAntiplagiatValue(),
                    apstate: e,
                    _token: token
                },
                i = this;
            this.sendRequest(this.create_order_url, "post", t, this.selectors.form.find(".result"), function(e) {
                i.order_id = e.order_id, i.uploadFiles()
            })
        },
        uploadFiles: function() {
            ButtonPreloader.showPreloader(this.selectors.send_button), !1 === OrderFilesUploadController.startTaskUpload(0, void 0, this.order_id) && this.endCreateOrder()
        },
        removeFiles: function() {
            OrderFilesUploadController.removeAllFilesAfterLoad()
        },
        errorWhenUploadFiles: function() {
            if (ButtonPreloader.hidePreloader(this.selectors.send_button), void 0 !== this.order_id) {
                var e = this;
                this.selectors.send_button.off().text(i18next.t("create_order.go_to_order")).click(function() {
                    e.endCreateOrder()
                })
            }
        },
        endCreateOrder: function() {
            var e = this.order_id,
                t = this;
            $.post(this.activate_order_url, {
                _token: token,
                order_id: e
            }, function() {
                if (t.is_for_admin) {
                    var i = '<span class="alert alert-success">',
                        n = '<a href="/admin/user/search?search=' + t.user_id + '" target="_blank">â„–' + t.user_id + "</a>",
                        a = "/admin/order/management/" + e,
                        r = "https://vse-sdal.com/cabinet/order/" + e + "?auth_token=" + t.user_auth_token;
                    t.is_new_user ? i += "Ð’Ð°Ñˆ Ð·Ð°ÐºÐ°Ð· â„–" + e + " ÑƒÑÐ¿ÐµÑˆÐ½Ð¾ Ñ€Ð°Ð·Ð¼ÐµÑ‰ÐµÐ½. Ð§Ñ‚Ð¾Ð±Ñ‹ Ð²Ñ‹ ÑÐ¼Ð¾Ð³Ð»Ð¸ Ð²Ñ‹Ð±Ñ€Ð°Ñ‚ÑŒ ÑÐºÑÐ¿ÐµÑ€Ñ‚Ð° Ð´Ð»Ñ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹, Ð°ÐºÑ‚Ð¸Ð²Ð¸Ñ€ÑƒÐ¹Ñ‚Ðµ Ð²Ð°Ñˆ Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚. ÐœÑ‹ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð¸ Ð¿Ð¸ÑÑŒÐ¼Ð¾ Ð½Ð° Ð²Ð°ÑˆÑƒ Ð¿Ð¾Ñ‡Ñ‚Ñƒ, Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑŒÑ‚Ðµ Ð¿Ð¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð°." : i += "Ð’Ð°Ñˆ Ð·Ð°ÐºÐ°Ð· â„–" + e + " ÑƒÑÐ¿ÐµÑˆÐ½Ð¾ Ñ€Ð°Ð·Ð¼ÐµÑ‰ÐµÐ½. Ð§Ñ‚Ð¾Ð±Ñ‹ Ð²Ñ‹Ð±Ñ€Ð°Ñ‚ÑŒ ÑÐºÑÐ¿ÐµÑ€Ñ‚Ð° Ð´Ð»Ñ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ð¿ÐµÑ€ÐµÐ¹Ð´Ð¸Ñ‚Ðµ Ð½Ð° ÑÐ°Ð¹Ñ‚ âž¡ " + r, i += "<br><br>ðŸ’¡ ÐžÐ±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑŒÑ‚Ðµ Ð²Ð°Ñˆ Ð·Ð°ÐºÐ°Ð· Ð½Ð° ÐºÐ¾Ñ€Ñ€ÐµÐºÑ‚Ð½Ð¾ÑÑ‚ÑŒ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸, ÑƒÐºÐ°Ð¶Ð¸Ñ‚Ðµ Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸Ñ Ðº Ñ€Ð°Ð±Ð¾Ñ‚Ðµ Ð´Ð¾ Ð²Ñ‹Ð±Ð¾Ñ€Ð° ÑÐºÑÐ¿ÐµÑ€Ñ‚Ð°.<br><br><b>Ð¡Ð»ÑƒÐ¶ÐµÐ±Ð½Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ:</b> Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚ Ð·Ð°ÐºÐ°Ð·Ñ‡Ð¸ÐºÐ° " + n + ', ÑÑÑ‹Ð»ÐºÐ° Ð½Ð° Ð·Ð°ÐºÐ°Ð· Ð² Ð°Ð´Ð¼Ð¸Ð½ÐºÐµ: <a href="' + a + '" target="_blank">â„–' + e + "</a>", i += "</span>", t.selectors.form.find(".result").html(i), ButtonPreloader.hidePreloader(t.selectors.send_button), t.user_id = void 0, t.is_new_user = void 0, t.order_id = void 0
                } else redirectByCurrentHost("/cabinet/order/" + e)
            })
        },
        sendRequest: function(e, t, i, n, a) {
            sendRequest(e, t, i, n, function(e) {
                $(n).html(""), a(e)
            }, !0, this.selectors.send_button)
        },
        clearForm: function() {
            setSelectValue(this.selectors.order_type, -1), setDateField(this.selectors.deadline, "", ""), this.selectors.subject.val(""), this.selectors.comment.val(""), this.selectors.account.val(""), this.selectors.login.val(""), this.count_added_files = 0, this.user_id = void 0, this.is_new_user = void 0, this.order_id = void 0, this.selectors.form.find(".result").text(""), this.showAuthDataBlock(), this.removeFiles(), this.selectors.phone.length > 0 && this.selectors.phone.val(""), AntiplagiatController.hideAntiplagiat()
        }
    };

function scrollToDiv(e, t) {
    t = t || 0;
    var i = e.offset().top - t;
    $("body,html").animate({
        scrollTop: i
    }, 500)
}
CreateOrderPopupController.openPopup = function() {}, $(document).ready(function() {
    var e = $("h1").first().text().trim();
    $("img").each(function(t, i) {
        (i = $(i)).attr("alt") || i.attr("alt", e), i.attr("title") || i.hasClass("tooltipster") || i.attr("title", e)
    })
}), $(function() {
    var e, t, i, n, a = $(".current-time");

    function r() {
        var a = moment();
        e.html(a.format("LL").replace(new RegExp(" ", "g"), "&nbsp;")), t.text("RUS" !== app_country && "ru" !== app_locale ? a.format("h") : a.format("HH")), i.text(a.format("mm") + ("RUS" !== app_country && "ru" !== app_locale ? " " + a.format("a") : "")), n.animate({
            opacity: 0
        }, 500).animate({
            opacity: 1
        }, 500)
    }
    a.html('<span class="date"></span>&nbsp;<span class="hours_block"></span><span class="dots_block">:</span><span class="minutes_block"></span>'), e = a.find(".date"), t = a.find(".hours_block"), i = a.find(".minutes_block"), n = a.find(".dots_block"), setInterval(r, 1e3), r()
}), $(function() {
    Modernizr.on("webp", function(e) {
        $(".lazy-load-webp").each(function() {
            var t = $(this).data("src");
            e && (t = t.split(".")[0] + ".webp"), $(this).attr("src", t)
        })
    }), $(".lazy-load").each(function() {
        var e = $(this).data("src");
        $(this).attr("src", e)
    })
}), $(function() {
    $("a.scroll").click(function() {
        var e = $(this),
            t = e.attr("href");
        "#" !== t && (scrollToDiv($(t), e.data("offset")), e.closest(".BurgerMenu") && $("body").removeClass("pushy-open-left"));
        return !1
    })
});
var SavePromoEmailController = {
    field: 'input[name="account"]',
    init: function() {
        $(this.field).focusout(this.save)
    },
    reload: function(e) {
        $(this.field).unbind("focusout", this.save), this.field = e, this.init()
    },
    save: function() {
        var e = $(this).val();
        if (checkEmail(e)) {
            var t = {
                contact: e,
                type: 5,
                _token: token
            };
            $.post("/marketing/save_customer_contact", t)
        }
    }
};
$(function() {
    SavePromoEmailController.init()
}), $(function() {
    SavePromoEmailController.reload("#customer_account");
    var e = document.getElementById("vk_container");
    if (e) {
        function t() {
            e.innerHTML = '<div id="vk_groups"></div>', VK.Widgets.Group("vk_groups", {
                mode: 0,
                width: "auto",
                height: "356",
                color1: "FFFFFF",
                color2: "2B587A",
                color3: "5B7FA6"
            }, 38673575)
        }
        window.addEventListener("load", t), window.addEventListener("resize", t)
    }

    function i() {
        scrollToDiv($(".MainBlock"), 0)
    }
    if ($(".place-order").click(i), $("#get_price").click(function() {
            setSelectValue($("#create_order_type"), $("#order_type").val()), i()
        }), SendMessageForm.init(), "RUS" === window.app_country) {
        function n() {
            var e = +$("#create_order_type").val(),
                t = $(".MainBlock h1"),
                i = $("#header_help"),
                n = $("#price_title"),
                a = $("#price_value"),
                r = $("#time"),
                s = $("#comment");
            if (-1 != +e) {
                var o = {
                    type: e,
                    title: null,
                    help: null,
                    price_title: null,
                    price_value: null,
                    time: null,
                    setPriceValue: function(e, t) {
                        t = t ? '<span style="position: relative; top:3px;">' + t + "</span>" : "<span>Ñ€ÑƒÐ±</span>", this.price_value = "<span>Ð¾Ñ‚</span><span>" + e + "</span>" + t
                    }
                };
                switch (e) {
                    case 1:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ ÐºÑƒÑ€ÑÐ¾Ð²Ð¾Ð¹ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ ÐºÑƒÑ€ÑÐ¾Ð²Ð¾Ð¹ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° ÐºÑƒÑ€ÑÐ¾Ð²Ð¾Ð¹", o.setPriceValue(500);
                        break;
                    case 2:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»ÑŒÐ½Ð¾Ð¹ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»ÑŒÐ½Ð¾Ð¹ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»ÑŒÐ½Ð¾Ð¹", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 3:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð´Ð¸Ð¿Ð»Ð¾Ð¼Ð°", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð´Ð¸Ð¿Ð»Ð¾Ð¼Ð¾Ð¼ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð´Ð¸Ð¿Ð»Ð¾Ð¼Ð°", o.setPriceValue(3e3, "â‚½"), o.time = "<span>oÑ‚</span><span>3</span><span>Ð´Ð½ÐµÐ¹</span>";
                        break;
                    case 4:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð»Ð°Ð±Ð¾Ñ€Ð°Ñ‚Ð¾Ñ€Ð½Ð¾Ð¹ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð»Ð°Ð±Ð¾Ñ€Ð°Ñ‚Ð¾Ñ€Ð½Ð¾Ð¹ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð»Ð°Ð±Ð¾Ñ€Ð°Ñ‚Ð¾Ñ€Ð½Ð¾Ð¹", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 5:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð¾Ñ‚Ñ‡ÐµÑ‚Ð° Ð¿Ð¾ Ð¿Ñ€Ð°ÐºÑ‚Ð¸ÐºÐµ", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð¾Ñ‚Ñ‡ÐµÑ‚Ð¾Ð¼ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð¾Ñ‚Ñ‡ÐµÑ‚Ð°", o.setPriceValue(500), o.time = "<span>oÑ‚</span><span>1</span><span>Ð´Ð½Ñ</span>";
                        break;
                    case 6:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð´Ð¸ÑÑÐµÑ€Ñ‚Ð°Ñ†Ð¸Ð¸", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð´Ð¸ÑÑÐµÑ€Ñ‚Ð°Ñ†Ð¸ÐµÐ¹ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð´Ð¸ÑÑÐµÑ€Ñ‚Ð°Ñ†Ð¸Ð¸", o.setPriceValue(9e3, "â‚½"), o.time = '<span style="margin-left: -13px;">oÑ‚</span><span>10</span><span>Ð´Ð½ÐµÐ¹</span>';
                        break;
                    case 7:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ð¸ Ñ‡ÐµÑ€Ñ‚ÐµÐ¶ÐµÐ¹", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ñ‡ÐµÑ€Ñ‚ÐµÐ¶Ð°Ð¼Ð¸ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ñ‡ÐµÑ€Ñ‚ÐµÐ¶ÐµÐ¹", o.setPriceValue(500), o.time = "<span>oÑ‚</span><span>1</span><span>Ð´Ð½Ñ</span>";
                        break;
                    case 8:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ñ€ÐµÑ„ÐµÑ€Ð°Ñ‚Ð°", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ñ€ÐµÑ„ÐµÑ€Ð°Ñ‚Ð¾Ð¼ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ñ€ÐµÑ„ÐµÑ€Ð°Ñ‚Ð°", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 9:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð´Ð¾ÐºÐ»Ð°Ð´Ð°", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð´Ð¾ÐºÐ»Ð°Ð´Ð¾Ð¼ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð´Ð¾ÐºÐ»Ð°Ð´Ð°", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 10:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ ÑÑÑÐµ", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ ÑÑÑÐµ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° ÑÑÑÐµ", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 11:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð¾Ñ‚Ð²ÐµÑ‚Ð¾Ð² Ð½Ð° Ð±Ð¸Ð»ÐµÑ‚Ñ‹", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð¾Ñ‚Ð²ÐµÑ‚Ð°Ð¼Ð¸ Ð½Ð° Ð±Ð¸Ð»ÐµÑ‚Ñ‹ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð¾Ñ‚Ð²ÐµÑ‚Ð¾Ð²", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 12:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ ÑˆÐ¿Ð°Ñ€Ð³Ð°Ð»ÐºÐ¸", o.help = 'Ð—Ð´ÐµÑÑŒ Ð²Ð°Ð¼ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° ÑˆÐ¿Ð°Ñ€Ð³Ð°Ð»ÐºÐ¸", o.setPriceValue(150), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 13:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ ÑÑ‚Ð°Ñ‚ÑŒÐ¸", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ ÑÐ¾ ÑÑ‚Ð°Ñ‚ÑŒÐµÐ¹ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° ÑÑ‚Ð°Ñ‚ÑŒÐ¸", o.setPriceValue(100), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 14:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ð¸ Ð¿Ñ€ÐµÐ·ÐµÐ½Ñ‚Ð°Ñ†Ð¸Ð¸", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð¿Ñ€ÐµÐ·ÐµÐ½Ñ‚Ð°Ñ†Ð¸ÐµÐ¹ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð¿Ñ€ÐµÐ·ÐµÐ½Ñ‚Ð°Ñ†Ð¸Ð¸", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 15:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð±Ð¸Ð·Ð½ÐµÑ-Ð¿Ð»Ð°Ð½Ð°", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð±Ð¸Ð·Ð½ÐµÑ-Ð¿Ð»Ð°Ð½Ð¾Ð¼ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð±Ð¸Ð·Ð½ÐµÑ-Ð¿Ð»Ð°Ð½Ð°", o.setPriceValue(500, "â‚½"), o.time = "<span>oÑ‚</span><span>3</span><span>Ð´Ð½ÐµÐ¹</span>";
                        break;
                    case 16:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ðµ Ñ‚ÐµÐºÑÑ‚Ð¾Ð²", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð¾Ð¼ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð°", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 17:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð¿Ð¾Ð´Ð±Ð¾Ñ€Ðµ Ð»Ð¸Ñ‚ÐµÑ€Ð°Ñ‚ÑƒÑ€Ñ‹", o.help = 'Ð—Ð´ÐµÑÑŒ Ð²Ð°Ð¼ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹", o.setPriceValue(800), o.time = "<span>oÑ‚</span><span>1</span><span>Ð´Ð½Ñ</span>";
                        break;
                    case 18:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð¿Ð¾Ð¸ÑÐºÐµ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸", o.help = 'Ð—Ð´ÐµÑÑŒ Ð²Ð°Ð¼ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹", o.setPriceValue(600), o.time = "<span>oÑ‚</span><span>1</span><span>Ð´Ð½Ñ</span>";
                        break;
                    case 19:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ñ€ÐµÑˆÐµÐ½Ð¸Ð¸ Ð·Ð°Ð´Ð°Ñ‡", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ð·Ð°Ð´Ð°Ñ‡Ð°Ð¼Ð¸ <span class="Underline">Ð±Ñ‹ÑÑ‚Ñ€Ð¾ Ð¸ Ð½ÐµÐ´Ð¾Ñ€Ð¾Ð³Ð¾.<span class="Underline">', o.price_title = "Ð¦ÐµÐ½Ð° Ð·Ð°Ð´Ð°Ñ‡Ð¸", o.setPriceValue(40), o.time = "<span>oÑ‚</span><span>1</span><span>Ñ‡Ð°ÑÐ°</span>";
                        break;
                    case 20:
                        o.title = "ÐžÐ½Ð»Ð°Ð¹Ð½-Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒ", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¾ÐºÐ°Ð¶ÑƒÑ‚ Ð¾Ð½Ð»Ð°Ð¹Ð½-Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð¿Ð¾Ð¼Ð¾Ñ‰Ð¸", o.setPriceValue(200), o.time = "<span>oÑ‚</span><span>1</span><span>Ñ‡Ð°ÑÐ°</span>";
                        break;
                    case 21:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² ÑÐ´Ð°Ñ‡Ðµ Ñ‚ÐµÑÑ‚Ð¾Ð²", o.help = 'Ð—Ð´ÐµÑÑŒ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ Ñ Ñ‚ÐµÑÑ‚Ð°Ð¼Ð¸ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ñ‚ÐµÑÑ‚Ð°", o.setPriceValue(600), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>";
                        break;
                    case 30:
                        o.title = "ÐŸÐ¾Ð¼Ð¾Ñ‰ÑŒ Ð² Ð½Ð°Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ ÑƒÑ‡ÐµÐ±Ð½Ñ‹Ñ… Ñ€Ð°Ð±Ð¾Ñ‚", o.help = 'Ð—Ð´ÐµÑÑŒ Ð²Ð°Ð¼ Ð¿Ð¾Ð¼Ð¾Ð³ÑƒÑ‚ <span class="Underline">Ð±ÐµÐ·&nbsp;Ð¿Ð¾ÑÑ€ÐµÐ´Ð½Ð¸ÐºÐ¾Ð²</span>', o.price_title = "Ð¦ÐµÐ½Ð° Ð½Ð° Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹", o.setPriceValue(300), o.time = "<span>oÑ‚</span><span>4</span><span>Ñ‡Ð°ÑÐ¾Ð²</span>"
                }
                header && +work_id === e ? t.html(header) : t.html(o.title + city), +price || 19 === e ? a.html(o.price_value) : "Ð¾Ñ‚40Ñ€ÑƒÐ±" === a.text() && a.html("<span>Ð²</span><span>2-3</span><span>Ñ€Ð°Ð·Ð° Ð½Ð¸Ð¶Ðµ</span>"), o.time && r.html(o.time), 20 === e ? ($(".myDatePicker > label").text("Ð”Ð°Ñ‚Ð° Ð½Ð°Ñ‡Ð°Ð»Ð°"), s.attr("placeholder", "Ð’Ñ€ÐµÐ¼Ñ Ð½Ð°Ñ‡Ð°Ð»Ð° Ð¿Ð¾ ÐœÐ¾ÑÐºÐ²Ðµ, Ð´Ð»Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ, ÐºÐ¾Ð»-Ð²Ð¾ Ð·Ð°Ð´Ð°Ð½Ð¸Ð¹, Ñ‚ÐµÐ¼Ñ‹ Ð¸ Ñ‚.Ð´.")) : ($(".myDatePicker > label").text("Ð¡Ñ€Ð¾Ðº Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ"), -1 !== [1, 8, 9, 10].indexOf(e) ? s.attr("placeholder", "Ð¢ÐµÐ¼Ð°, ÐºÐ¾Ð»-Ð²Ð¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†, Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸Ñ Ðº Ð°Ð½Ñ‚Ð¸Ð¿Ð»Ð°Ð³Ð¸Ð°Ñ‚Ñƒ, Ðº Ð¾Ñ„Ð¾Ñ€Ð¼Ð»ÐµÐ½Ð¸ÑŽ Ð¸ Ñ‚.Ð´.") : 21 === e ? s.attr("placeholder", "Ð¢ÐµÐ¼Ñ‹, ÐºÐ¾Ð»-Ð²Ð¾ Ð²Ð¾Ð¿Ñ€Ð¾ÑÐ¾Ð², Ð¿Ñ€Ð¾Ð´Ð¾Ð»Ð¶Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ, Ð¿Ñ€Ð¸Ð¼ÐµÑ€Ñ‹ Ð¸ Ñ‚.Ð´.") : s.attr("placeholder", "")), i.html(o.help), n.html(o.price_title)
            }
        }
        $("#create_order_type").change(n), n()
    }
});