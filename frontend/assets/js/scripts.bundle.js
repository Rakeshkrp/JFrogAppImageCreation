"use strict";
var KTCookie = {
    get: function (e) {
        var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
        return t ? decodeURIComponent(t[1]) : null
    },
    set: function (e, t, n) {
        null == n && (n = {}), (n = Object.assign({}, {
            path: "/"
        }, n)).expires instanceof Date && (n.expires = n.expires.toUTCString());
        var i = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        for (var r in n)
            if (!1 !== n.hasOwnProperty(r)) {
                i += "; " + r;
                var o = n[r];
                !0 !== o && (i += "=" + o)
            } document.cookie = i
    },
    remove: function (e) {
        this.set(e, "", {
            "max-age": -1
        })
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTCookie);
var KTDialer = function (e, t) {
    var n = this;
    if (e) {
        var i = {
                min: null,
                max: null,
                step: 1,
                decimals: 0,
                prefix: "",
                suffix: ""
            },
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.element = e, n.incElement = n.element.querySelector('[data-kt-dialer-control="increase"]'), n.decElement = n.element.querySelector('[data-kt-dialer-control="decrease"]'), n.inputElement = n.element.querySelector("input[type]"), d("decimals") && (n.options.decimals = parseInt(d("decimals"))), d("prefix") && (n.options.prefix = d("prefix")), d("suffix") && (n.options.suffix = d("suffix")), d("step") && (n.options.step = parseFloat(d("step"))), d("min") && (n.options.min = parseFloat(d("min"))), d("max") && (n.options.max = parseFloat(d("max"))), n.value = parseFloat(n.inputElement.value.replace(/[^\d.]/g, "")), s(), o(), KTUtil.data(n.element).set("dialer", n)
            },
            o = function () {
                KTUtil.addEvent(n.incElement, "click", (function (e) {
                    e.preventDefault(), a()
                })), KTUtil.addEvent(n.decElement, "click", (function (e) {
                    e.preventDefault(), l()
                })), KTUtil.addEvent(n.inputElement, "change", (function (e) {
                    e.preventDefault(), s()
                }))
            },
            a = function () {
                return KTEventHandler.trigger(n.element, "kt.dialer.increase", n), n.inputElement.value = n.value + n.options.step, s(), KTEventHandler.trigger(n.element, "kt.dialer.increased", n), n
            },
            l = function () {
                return KTEventHandler.trigger(n.element, "kt.dialer.decrease", n), n.inputElement.value = n.value - n.options.step, s(), KTEventHandler.trigger(n.element, "kt.dialer.decreased", n), n
            },
            s = function () {
                KTEventHandler.trigger(n.element, "kt.dialer.change", n), n.value = parseFloat(n.inputElement.value.replace(/[^\d.]/g, "")), n.value < n.options.min && (n.value = n.options.min), n.value > n.options.max && (n.value = n.options.max), n.inputElement.value = u(n.value), KTEventHandler.trigger(n.element, "kt.dialer.changed", n)
            },
            u = function (e) {
                return n.options.prefix + parseFloat(e).toFixed(n.options.decimals) + n.options.suffix
            },
            d = function (e) {
                return !0 === n.element.hasAttribute("data-kt-dialer-" + e) ? n.element.getAttribute("data-kt-dialer-" + e) : null
            };
        !0 === KTUtil.data(e).has("dialer") ? n = KTUtil.data(e).get("dialer") : r(), n.increase = function () {
            return a()
        }, n.decrease = function () {
            return l()
        }, n.getElement = function () {
            return n.element
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }, n.trigger = function (e, t) {
            return KTEventHandler.trigger(n.element, e, t, n, t)
        }
    }
};
KTDialer.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("dialer") ? KTUtil.data(e).get("dialer") : null
}, KTDialer.createInstances = function (e = '[data-kt-dialer="true"]') {
    var t = document.body.querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTDialer(t[n])
}, KTDialer.init = function () {
    KTDialer.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTDialer.init) : KTDialer.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTDialer);
var KTDrawer = function (e, t) {
    var n = this,
        i = document.getElementsByTagName("BODY")[0];
    if (null != e) {
        var r = {
                overlay: !0,
                direction: "end",
                baseClass: "drawer",
                overlayClass: "drawer-overlay"
            },
            o = function () {
                n.options = KTUtil.deepExtend({}, r, t), n.uid = KTUtil.getUniqueId("drawer"), n.element = e, n.overlayElement = null, n.name = n.element.getAttribute("data-kt-drawer-name"), n.shown = !1, n.lastWidth, n.toggleElement = null, n.element.setAttribute("data-kt-drawer", "true"), a(), d(), KTUtil.data(n.element).set("drawer", n)
            },
            a = function () {
                var e = f("toggle"),
                    t = f("close");
                null !== e && e.length > 0 && KTUtil.on(i, e, "click", (function (e) {
                    e.preventDefault(), n.toggleElement = this, l()
                })), null !== t && t.length > 0 && KTUtil.on(i, t, "click", (function (e) {
                    e.preventDefault(), n.closeElement = this, s()
                }))
            },
            l = function () {
                !1 !== KTEventHandler.trigger(n.element, "kt.drawer.toggle", n) && (!0 === n.shown ? s() : u(), KTEventHandler.trigger(n.element, "kt.drawer.toggled", n))
            },
            s = function () {
                !1 !== KTEventHandler.trigger(n.element, "kt.drawer.hide", n) && (n.shown = !1, m(), i.removeAttribute("data-kt-drawer-" + n.name, "on"), i.removeAttribute("data-kt-drawer"), KTUtil.removeClass(n.element, n.options.baseClass + "-on"), null !== n.toggleElement && KTUtil.removeClass(n.toggleElement, "active"), KTEventHandler.trigger(n.element, "kt.drawer.after.hidden", n))
            },
            u = function () {
                !1 !== KTEventHandler.trigger(n.element, "kt.drawer.show", n) && (n.shown = !0, c(), i.setAttribute("data-kt-drawer-" + n.name, "on"), i.setAttribute("data-kt-drawer", "on"), KTUtil.addClass(n.element, n.options.baseClass + "-on"), null !== n.toggleElement && KTUtil.addClass(n.toggleElement, "active"), KTEventHandler.trigger(n.element, "kt.drawer.shown", n))
            },
            d = function () {
                var e = p(),
                    t = f("direction");
                !0 === KTUtil.hasClass(n.element, n.options.baseClass + "-on") && "on" === String(i.getAttribute("data-kt-drawer-" + n.name + "-")) ? n.shown = !0 : n.shown = !1, !0 === f("activate") ? (KTUtil.addClass(n.element, n.options.baseClass), KTUtil.addClass(n.element, n.options.baseClass + "-" + t), KTUtil.css(n.element, "width", e, !0), n.lastWidth = e) : (KTUtil.css(n.element, "width", ""), KTUtil.removeClass(n.element, n.options.baseClass), KTUtil.removeClass(n.element, n.options.baseClass + "-" + t), s())
            },
            c = function () {
                !0 === f("overlay") && (n.overlayElement = document.createElement("DIV"), KTUtil.css(n.overlayElement, "z-index", KTUtil.css(n.element, "z-index") - 1), i.append(n.overlayElement), KTUtil.addClass(n.overlayElement, f("overlay-class")), KTUtil.addEvent(n.overlayElement, "click", (function (e) {
                    e.preventDefault(), s()
                })))
            },
            m = function () {
                null !== n.overlayElement && KTUtil.remove(n.overlayElement)
            },
            f = function (e) {
                if (!0 === n.element.hasAttribute("data-kt-drawer-" + e)) {
                    var t = n.element.getAttribute("data-kt-drawer-" + e),
                        i = KTUtil.getResponsiveValue(t);
                    return null !== i && "true" === String(i) ? i = !0 : null !== i && "false" === String(i) && (i = !1), i
                }
                var r = KTUtil.snakeToCamel(e);
                return n.options[r] ? KTUtil.getResponsiveValue(n.options[r]) : null
            },
            p = function () {
                var e = f("width");
                return "auto" === e && (e = KTUtil.css(n.element, "width")), e
            };
        KTUtil.data(e).has("drawer") ? n = KTUtil.data(e).get("drawer") : o(), n.toggle = function () {
            return l()
        }, n.show = function () {
            return u()
        }, n.hide = function () {
            return s()
        }, n.isShown = function () {
            return n.shown
        }, n.update = function () {
            d()
        }, n.goElement = function () {
            return n.element
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }, n.trigger = function (e, t) {
            return KTEventHandler.trigger(n.element, e, t, n, t)
        }
    }
};
KTDrawer.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("drawer") ? KTUtil.data(e).get("drawer") : null
}, KTDrawer.createInstances = function (e = '[data-kt-drawer="true"]') {
    var t = document.getElementsByTagName("BODY")[0].querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTDrawer(t[n])
}, KTDrawer.handleShow = function () {
    KTUtil.on(document.body, '[data-kt-drawer-show="true"][data-kt-drawer-target]', "click", (function (e) {
        var t = document.querySelector(this.getAttribute("data-kt-drawer-target"));
        t && KTDrawer.getInstance(t).show()
    }))
}, KTDrawer.handleDismiss = function () {
    KTUtil.on(document.body, '[data-kt-drawer-dismiss="true"]', "click", (function (e) {
        var t = this.closest('[data-kt-drawer="true"]');
        if (t) {
            var n = KTDrawer.getInstance(t);
            n.isShown() && n.hide()
        }
    }))
}, window.addEventListener("resize", (function () {
    var e = document.getElementsByTagName("BODY")[0];
    KTUtil.throttle(undefined, (function () {
        var t = e.querySelectorAll('[data-kt-drawer="true"]');
        if (t && t.length > 0)
            for (var n = 0, i = t.length; n < i; n++) {
                var r = KTDrawer.getInstance(t[n]);
                r && r.update()
            }
    }), 200)
})), KTDrawer.init = function () {
    KTDrawer.createInstances(), KTDrawer.handleShow(), KTDrawer.handleDismiss()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTDrawer.init) : KTDrawer.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTDrawer);
var KTEventHandler = function () {
    var e = {},
        t = function (t, n, i, r) {
            var o = KTUtil.getUniqueId("event");
            KTUtil.data(t).set(n, o), e[n] || (e[n] = {}), e[n][o] = {
                name: n,
                callback: i,
                one: r,
                fired: !1
            }
        };
    return {
        trigger: function (t, n, i, r) {
            return function (t, n, i, r) {
                if (!0 === KTUtil.data(t).has(n)) {
                    var o = KTUtil.data(t).get(n);
                    if (e[n] && e[n][o]) {
                        var a = e[n][o];
                        if (a.name === n) {
                            if (1 != a.one) return a.callback.call(this, i, r);
                            if (0 == a.fired) return e[n][o].fired = !0, a.callback.call(this, i, r)
                        }
                    }
                }
                return null
            }(t, n, i, r)
        },
        on: function (e, n, i) {
            return t(e, n, i)
        },
        one: function (e, n, i) {
            return t(e, n, i, !0)
        },
        off: function (t, n) {
            return function (t, n) {
                var i = KTUtil.data(t).get(n);
                e[n] && e[n][i] && delete e[n][i]
            }(t, n)
        },
        debug: function () {
            for (var t in e) e.hasOwnProperty(t) && console.log(t)
        }
    }
}();
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTEventHandler);
var KTFeedback = function (e) {
    var t = this,
        n = document.getElementsByTagName("BODY")[0],
        i = {
            width: 100,
            placement: "top-center",
            content: "",
            type: "popup"
        },
        r = function () {
            t.options = KTUtil.deepExtend({}, i, e), t.uid = KTUtil.getUniqueId("feedback"), t.element, t.shown = !1, o(), KTUtil.data(t.element).set("feedback", t)
        },
        o = function () {
            KTUtil.addEvent(t.element, "click", (function (e) {
                e.preventDefault(), _go()
            }))
        },
        a = function () {
            t.element = document.createElement("DIV"), KTUtil.addClass(t.element, "feedback feedback-popup"), KTUtil.setHTML(t.element, t.options.content), "top-center" == t.options.placement && l(), n.appendChild(t.element), KTUtil.addClass(t.element, "feedback-shown"), t.shown = !0
        },
        l = function () {
            var e = KTUtil.getResponsiveValue(t.options.width),
                n = KTUtil.css(t.element, "height");
            KTUtil.addClass(t.element, "feedback-top-center"), KTUtil.css(t.element, "width", e), KTUtil.css(t.element, "left", "50%"), KTUtil.css(t.element, "top", "-" + n)
        },
        s = function () {
            t.element.remove()
        };
    r(), t.show = function () {
        return function () {
            if (!1 !== KTEventHandler.trigger(t.element, "kt.feedback.show", t)) return "popup" === t.options.type && a(), KTEventHandler.trigger(t.element, "kt.feedback.shown", t), t
        }()
    }, t.hide = function () {
        return function () {
            if (!1 !== KTEventHandler.trigger(t.element, "kt.feedback.hide", t)) return "popup" === t.options.type && s(), t.shown = !1, KTEventHandler.trigger(t.element, "kt.feedback.hidden", t), t
        }()
    }, t.isShown = function () {
        return t.shown
    }, t.getElement = function () {
        return t.element
    }, t.on = function (e, n) {
        return KTEventHandler.on(t.element, e, n)
    }, t.one = function (e, n) {
        return KTEventHandler.one(t.element, e, n)
    }, t.off = function (e) {
        return KTEventHandler.off(t.element, e)
    }, t.trigger = function (e, n) {
        return KTEventHandler.trigger(t.element, e, n, t, n)
    }
};
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTFeedback);
var KTImageInput = function (e, t) {
    var n = this;
    if (null != e) {
        var i = {},
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.uid = KTUtil.getUniqueId("image-input"), n.element = e, n.inputElement = KTUtil.find(e, 'input[type="file"]'), n.wrapperElement = KTUtil.find(e, ".image-input-wrapper"), n.cancelElement = KTUtil.find(e, '[data-kt-image-input-action="cancel"]'), n.removeElement = KTUtil.find(e, '[data-kt-image-input-action="remove"]'), n.hiddenElement = KTUtil.find(e, 'input[type="hidden"]'), n.src = KTUtil.css(n.wrapperElement, "backgroundImage"), n.element.setAttribute("data-kt-image-input", "true"), o(), KTUtil.data(n.element).set("image-input", n)
            },
            o = function () {
                KTUtil.addEvent(n.inputElement, "change", a), KTUtil.addEvent(n.cancelElement, "click", l), KTUtil.addEvent(n.removeElement, "click", s)
            },
            a = function (e) {
                if (e.preventDefault(), null !== n.inputElement && n.inputElement.files && n.inputElement.files[0]) {
                    if (!1 === KTEventHandler.trigger(n.element, "kt.imageinput.change", n)) return;
                    var t = new FileReader;
                    t.onload = function (e) {
                        KTUtil.css(n.wrapperElement, "background-image", "url(" + e.target.result + ")")
                    }, t.readAsDataURL(n.inputElement.files[0]), KTUtil.addClass(n.element, "image-input-changed"), KTUtil.removeClass(n.element, "image-input-empty"), KTEventHandler.trigger(n.element, "kt.imageinput.changed", n)
                }
            },
            l = function (e) {
                e.preventDefault(), !1 !== KTEventHandler.trigger(n.element, "kt.imageinput.cancel", n) && (KTUtil.removeClass(n.element, "image-input-changed"), KTUtil.removeClass(n.element, "image-input-empty"), KTUtil.css(n.wrapperElement, "background-image", n.src), n.inputElement.value = "", null !== n.hiddenElement && (n.hiddenElement.value = "0"), KTEventHandler.trigger(n.element, "kt.imageinput.canceled", n))
            },
            s = function (e) {
                e.preventDefault(), !1 !== KTEventHandler.trigger(n.element, "kt.imageinput.remove", n) && (KTUtil.removeClass(n.element, "image-input-changed"), KTUtil.addClass(n.element, "image-input-empty"), KTUtil.css(n.wrapperElement, "background-image", "none"), n.inputElement.value = "", null !== n.hiddenElement && (n.hiddenElement.value = "1"), KTEventHandler.trigger(n.element, "kt.imageinput.removed", n))
            };
        !0 === KTUtil.data(e).has("image-input") ? n = KTUtil.data(e).get("image-input") : r(), n.getInputElement = function () {
            return n.inputElement
        }, n.goElement = function () {
            return n.element
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }, n.trigger = function (e, t) {
            return KTEventHandler.trigger(n.element, e, t, n, t)
        }
    }
};
KTImageInput.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("image-input") ? KTUtil.data(e).get("image-input") : null
}, KTImageInput.createInstances = function (e = "[data-kt-image-input]") {
    var t = document.querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTImageInput(t[n])
}, KTImageInput.init = function () {
    KTImageInput.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTImageInput.init) : KTImageInput.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTImageInput);
var KTMenu = function (e, t) {
    var n = this;
    if (null != e) {
        var i = {
                dropdown: {
                    hoverTimeout: 200,
                    zindex: 105
                },
                accordion: {
                    slideSpeed: 250,
                    expand: !1
                }
            },
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.uid = KTUtil.getUniqueId("menu"), n.element = e, n.triggerElement, n.element.setAttribute("data-kt-menu", "true"), d(), u(), KTUtil.data(n.element).set("menu", n)
            },
            o = function (e) {
                null !== e && (!0 === m(e) ? l(e) : a(e))
            },
            a = function (e) {
                null !== e && !0 !== m(e) && ("dropdown" === v(e) ? w(e) : "accordion" === v(e) && S(e), KTUtil.data(e).set("type", v(e)))
            },
            l = function (e) {
                null !== e && !1 !== m(e) && ("dropdown" === v(e) ? E(e) : "accordion" === v(e) && A(e))
            },
            s = function (e) {
                if (!1 !== f(e)) {
                    var t = g(e);
                    KTUtil.data(e).has("type") && KTUtil.data(e).get("type") !== v(e) && (KTUtil.removeClass(e, "hover"), KTUtil.removeClass(e, "show"), KTUtil.removeClass(t, "show"))
                }
            },
            u = function () {
                var e = n.element.querySelectorAll(".menu-item[data-kt-menu-trigger]");
                if (e && e.length > 0)
                    for (var t = 0, i = e.length; t < i; t++) s(e[t])
            },
            d = function () {
                var e = document.querySelector('[data-kt-menu-target="# ' + n.element.getAttribute("id") + '"]');
                null !== e ? n.triggerElement = e : n.element.closest("[data-kt-menu-trigger]") ? n.triggerElement = n.element.closest("[data-kt-menu-trigger]") : n.element.parentNode && KTUtil.child(n.element.parentNode, "[data-kt-menu-trigger]") && (n.triggerElement = KTUtil.child(n.element.parentNode, "[data-kt-menu-trigger]")), n.triggerElement && KTUtil.data(n.triggerElement).set("menu", n)
            },
            c = function (e) {
                return n.triggerElement === e
            },
            m = function (e) {
                var t = g(e);
                return null !== t && ("dropdown" === v(e) ? !0 === KTUtil.hasClass(t, "show") && !0 === t.hasAttribute("data-popper-placement") : KTUtil.hasClass(e, "show"))
            },
            f = function (e) {
                return KTUtil.hasClass(e, "menu-item") && e.hasAttribute("data-kt-menu-trigger")
            },
            p = function (e) {
                return KTUtil.child(e, ".menu-link")
            },
            g = function (e) {
                return !0 === c(e) ? n.element : !0 === e.classList.contains("menu-sub") ? e : KTUtil.data(e).has("sub") ? KTUtil.data(e).get("sub") : KTUtil.child(e, ".menu-sub")
            },
            v = function (e) {
                var t = g(e);
                return t && parseInt(KTUtil.css(t, "z-index")) > 0 ? "dropdown" : "accordion"
            },
            T = function (e) {
                var t, n;
                return c(e) || e.hasAttribute("data-kt-menu-trigger") ? e : KTUtil.data(e).has("item") ? KTUtil.data(e).get("item") : (t = e.closest(".menu-item[data-kt-menu-trigger]")) ? t : (n = e.closest(".menu-sub")) && !0 === KTUtil.data(n).has("item") ? KTUtil.data(n).get("item") : void 0
            },
            h = function (e) {
                var t, n = e.closest(".menu-sub");
                return KTUtil.data(n).has("item") ? KTUtil.data(n).get("item") : n && (t = n.closest(".menu-item[data-kt-menu-trigger]")) ? t : null
            },
            K = function (e) {
                var t = e;
                return KTUtil.data(e).get("sub") && (t = KTUtil.data(e).get("sub")), null !== t && t.querySelector(".menu-item[data-kt-menu-trigger]") || null
            },
            U = function (e) {
                var t, n = [],
                    i = 0;
                do {
                    (t = K(e)) && (n.push(t), e = t), i++
                } while (null !== t && i < 20);
                return n
            },
            w = function (e) {
                if (!1 !== KTEventHandler.trigger(n.element, "kt.menu.dropdown.show", e)) {
                    KTMenu.hideDropdowns(e);
                    c(e) || p(e);
                    var t = g(e),
                        i = x(e, "width"),
                        r = x(e, "height"),
                        o = n.options.dropdown.zindex,
                        a = KTUtil.getHighestZindex(e);
                    null !== a && a >= o && (o = a + 1), o > 0 && KTUtil.css(t, "z-index", o), null !== i && KTUtil.css(t, "width", i), null !== r && KTUtil.css(t, "height", r), KTUtil.css(t, "display", ""), KTUtil.css(t, "overflow", ""), b(e, t), KTUtil.addClass(e, "show"), KTUtil.addClass(e, "menu-dropdown"), KTUtil.addClass(t, "show"), !0 === x(e, "overflow") ? (document.body.appendChild(t), KTUtil.data(e).set("sub", t), KTUtil.data(t).set("item", e), KTUtil.data(t).set("menu", n)) : KTUtil.data(t).set("item", e), KTEventHandler.trigger(n.element, "kt.menu.dropdown.shown", e)
                }
            },
            E = function (e) {
                if (!1 !== KTEventHandler.trigger(n.element, "kt.menu.dropdown.hide", e)) {
                    var t = g(e);
                    KTUtil.css(t, "z-index", ""), KTUtil.css(t, "width", ""), KTUtil.css(t, "height", ""), KTUtil.removeClass(e, "show"), KTUtil.removeClass(e, "menu-dropdown"), KTUtil.removeClass(t, "show"), !0 === x(e, "overflow") && (e.classList.contains("menu-item") ? e.appendChild(t) : KTUtil.insertAfter(n.element, e), KTUtil.data(e).remove("sub"), KTUtil.data(t).remove("item"), KTUtil.data(t).remove("menu")), k(e), KTEventHandler.trigger(n.element, "kt.menu.dropdown.hidden", e)
                }
            },
            b = function (e, t) {
                var n, i = x(e, "attach");
                n = i ? "parent" === i ? e.parentNode : document.querySelector(i) : e;
                var r = Popper.createPopper(n, t, y(e));
                KTUtil.data(e).set("popper", r)
            },
            k = function (e) {
                !0 === KTUtil.data(e).has("popper") && (KTUtil.data(e).get("popper").destroy(), KTUtil.data(e).remove("popper"))
            },
            y = function (e) {
                var t = x(e, "placement");
                t || (t = "right");
                var n = x(e, "flip"),
                    i = n ? n.split(",") : [],
                    r = x(e, "offset"),
                    o = r ? r.split(",") : [];
                return {
                    placement: t,
                    strategy: !0 === x(e, "overflow") ? "absolute" : "fixed",
                    modifiers: [{
                        name: "offset",
                        options: {
                            offset: o
                        }
                    }, {
                        name: "preventOverflow",
                        options: {
                            rootBoundary: "clippingParents"
                        }
                    }, {
                        name: "flip",
                        options: {
                            altBoundary: !0,
                            fallbackPlacements: i
                        }
                    }]
                }
            },
            S = function (e) {
                if (!1 !== KTEventHandler.trigger(n.element, "kt.menu.accordion.show", e)) {
                    !1 === n.options.accordion.expand && I(e);
                    var t = g(e);
                    !0 === KTUtil.data(e).has("popper") && E(e), KTUtil.addClass(e, "hover"), KTUtil.addClass(e, "showing"), KTUtil.slideDown(t, n.options.accordion.slideSpeed, (function () {
                        KTUtil.removeClass(e, "showing"), KTUtil.addClass(e, "show"), KTUtil.addClass(t, "show"), KTEventHandler.trigger(n.element, "kt.menu.accordion.shown", e)
                    }))
                }
            },
            A = function (e) {
                if (!1 !== KTEventHandler.trigger(n.element, "kt.menu.accordion.hide", e)) {
                    var t = g(e);
                    KTUtil.addClass(e, "hiding"), KTUtil.slideUp(t, n.options.accordion.slideSpeed, (function () {
                        KTUtil.removeClass(e, "hiding"), KTUtil.removeClass(e, "show"), KTUtil.removeClass(t, "show"), KTUtil.removeClass(e, "hover"), KTEventHandler.trigger(n.element, "kt.menu.accordion.hidden", e)
                    }))
                }
            },
            I = function (e) {
                var t, i = KTUtil.findAll(n.element, ".show[data-kt-menu-trigger]");
                if (i && i.length > 0)
                    for (var r = 0, o = i.length; r < o; r++) t = i[r], "accordion" === v(t) && t !== e && !1 === e.contains(t) && !1 === t.contains(e) && A(t)
            },
            x = function (e, t) {
                var n, i = null;
                return e && e.hasAttribute("data-kt-menu-" + t) && (n = e.getAttribute("data-kt-menu-" + t), null !== (i = KTUtil.getResponsiveValue(n)) && "true" === String(i) ? i = !0 : null !== i && "false" === String(i) && (i = !1)), i
            };
        !0 === KTUtil.data(e).has("menu") ? n = KTUtil.data(e).get("menu") : r(), n.click = function (e, t) {
            return function (e, t) {
                t.preventDefault();
                var n = T(e);
                "click" === x(n, "trigger") && (!1 === x(n, "toggle") ? a(n) : o(n))
            }(e, t)
        }, n.link = function (e, t) {
            !1 !== KTEventHandler.trigger(n.element, "kt.menu.link.click", n) && (KTMenu.hideDropdowns(), KTEventHandler.trigger(n.element, "kt.menu.link.clicked", n))
        }, n.dismiss = function (e, t) {
            return function (e, t) {
                var n = T(e),
                    i = U(n);
                if (null !== n && "dropdown" === v(n) && (l(n), i.length > 0))
                    for (var r = 0, o = i.length; r < o; r++) null !== i[r] && "dropdown" === v(i[r]) && l(tems[r])
            }(e)
        }, n.mouseover = function (e, t) {
            return function (e, t) {
                var n = T(e);
                null !== n && "hover" === x(n, "trigger") && ("1" === KTUtil.data(n).get("hover") && (clearTimeout(KTUtil.data(n).get("timeout")), KTUtil.data(n).remove("hover"), KTUtil.data(n).remove("timeout")), a(n))
            }(e)
        }, n.mouseout = function (e, t) {
            return function (e, t) {
                var i = T(e);
                if (null !== i && "hover" === x(i, "trigger")) {
                    var r = setTimeout((function () {
                        "1" === KTUtil.data(i).get("hover") && l(i)
                    }), n.options.dropdown.hoverTimeout);
                    KTUtil.data(i).set("hover", "1"), KTUtil.data(i).set("timeout", r)
                }
            }(e)
        }, n.getItemTriggerType = function (e) {
            return x(e, "trigger")
        }, n.getItemSubType = function (e) {
            return v(e)
        }, n.show = function (e) {
            return a(e)
        }, n.hide = function (e) {
            return l(e)
        }, n.reset = function (e) {
            return s(e)
        }, n.update = function () {
            return u()
        }, n.getElement = function () {
            return n.element
        }, n.getItemLinkElement = function (e) {
            return p(e)
        }, n.getItemToggleElement = function (e) {
            return function (e) {
                return n.triggerElement ? n.triggerElement : p(e)
            }(e)
        }, n.getItemSubElement = function (e) {
            return g(e)
        }, n.getItemParentElements = function (e) {
            return function (e) {
                var t, i = [],
                    r = 0;
                do {
                    (t = h(e)) && (i.push(t), e = t), r++
                } while (null !== t && r < 20);
                return n.triggerElement && i.unshift(n.triggerElement), i
            }(e)
        }, n.isItemSubShown = function (e) {
            return m(e)
        }, n.isItemParentShown = function (e) {
            return function (e) {
                return KTUtil.parents(e, ".menu-item.show").length > 0
            }(e)
        }, n.getTriggerElement = function () {
            return n.triggerElement
        }, n.isItemDropdownPermanent = function (e) {
            return function (e) {
                return !0 === x(e, "permanent")
            }(e)
        }, n.hideAccordions = function (e) {
            return I(e)
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }
    }
};
KTMenu.getInstance = function (e) {
    var t;
    if (KTUtil.data(e).has("menu")) return KTUtil.data(e).get("menu");
    if ((t = e.closest(".menu")) && KTUtil.data(t).has("menu")) return KTUtil.data(t).get("menu");
    if (KTUtil.hasClass(e, "menu-link")) {
        var n = e.closest(".menu-sub");
        if (KTUtil.data(n).has("menu")) return KTUtil.data(n).get("menu")
    }
    return null
}, KTMenu.hideDropdowns = function (e) {
    var t = document.querySelectorAll(".show.menu-dropdown[data-kt-menu-trigger]");
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) {
            var r = t[n],
                o = KTMenu.getInstance(r);
            o && "dropdown" === o.getItemSubType(r) && (e ? !1 === o.getItemSubElement(r).contains(e) && !1 === r.contains(e) && r !== e && o.hide(r) : o.hide(r))
        }
}, KTMenu.updateDropdowns = function () {
    var e = document.querySelectorAll(".show.menu-dropdown[data-kt-menu-trigger]");
    if (e && e.length > 0)
        for (var t = 0, n = e.length; t < n; t++) {
            var i = e[t];
            KTUtil.data(i).has("popper") && KTUtil.data(i).get("popper").forceUpdate()
        }
}, KTMenu.initGlobalHandlers = function () {
    document.addEventListener("click", (function (e) {
        var t, n, i, r = document.querySelectorAll(".show.menu-dropdown[data-kt-menu-trigger]");
        if (r && r.length > 0)
            for (var o = 0, a = r.length; o < a; o++)
                if (t = r[o], (i = KTMenu.getInstance(t)) && "dropdown" === i.getItemSubType(t)) {
                    if (i.getElement(), n = i.getItemSubElement(t), t === e.target || t.contains(e.target)) continue;
                    if (n === e.target || n.contains(e.target)) continue;
                    i.hide(t)
                }
    })), KTUtil.on(document.body, '.menu-item[data-kt-menu-trigger] > .menu-link, [data-kt-menu-trigger]:not(.menu-item):not([data-kt-menu-trigger="auto"])', "click", (function (e) {
        var t = KTMenu.getInstance(this);
        if (null !== t) return t.click(this, e)
    })), KTUtil.on(document.body, ".menu-item:not([data-kt-menu-trigger]) > .menu-link", "click", (function (e) {
        var t = KTMenu.getInstance(this);
        if (null !== t) return t.link(this, e)
    })), KTUtil.on(document.body, '[data-kt-menu-dismiss="true"]', "click", (function (e) {
        var t = KTMenu.getInstance(this);
        if (null !== t) return t.dismiss(this, e)
    })), KTUtil.on(document.body, "[data-kt-menu-trigger], .menu-sub", "mouseover", (function (e) {
        var t = KTMenu.getInstance(this);
        if (null !== t && "dropdown" === t.getItemSubType(this)) return t.mouseover(this, e)
    })), KTUtil.on(document.body, "[data-kt-menu-trigger], .menu-sub", "mouseout", (function (e) {
        var t = KTMenu.getInstance(this);
        if (null !== t && "dropdown" === t.getItemSubType(this)) return t.mouseout(this, e)
    })), window.addEventListener("resize", (function () {
        var e;
        KTUtil.throttle(undefined, (function () {
            var t = document.querySelectorAll('[data-kt-menu="true"]');
            if (t && t.length > 0)
                for (var n = 0, i = t.length; n < i; n++)(e = KTMenu.getInstance(t[n])) && e.update()
        }), 200)
    }))
}, KTMenu.createInstances = function (e = '[data-kt-menu="true"]') {
    var t = document.querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTMenu(t[n])
}, KTMenu.init = function () {
    KTMenu.initGlobalHandlers(), KTMenu.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTMenu.init) : KTMenu.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTMenu);
var KTPasswordMeter = function (e, t) {
    var n = this;
    if (e) {
        var i = {
                minLength: 8,
                checkUppercase: !0,
                checkLowercase: !0,
                checkDigit: !0,
                checkChar: !0,
                scoreHighlightClass: "active"
            },
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.score = 0, n.checkSteps = 5, n.element = e, n.inputElement = n.element.querySelector("input[type]"), n.visibilityElement = n.element.querySelector('[data-kt-password-meter-control="visibility"]'), n.highlightElement = n.element.querySelector('[data-kt-password-meter-control="highlight"]'), n.element.setAttribute("data-kt-password-meter", "true"), o(), KTUtil.data(n.element).set("password-meter", n)
            },
            o = function () {
                n.inputElement.addEventListener("input", (function () {
                    a()
                })), n.visibilityElement && n.visibilityElement.addEventListener("click", (function () {
                    p()
                }))
            },
            a = function () {
                var e = 0,
                    t = m();
                !0 === l() && (e += t), !0 === n.options.checkUppercase && !0 === s() && (e += t), !0 === n.options.checkLowercase && !0 === u() && (e += t), !0 === n.options.checkDigit && !0 === d() && (e += t), !0 === n.options.checkChar && !0 === c() && (e += t), n.score = e, f()
            },
            l = function () {
                return n.inputElement.value.length >= n.options.minLength
            },
            s = function () {
                return /[a-z]/.test(n.inputElement.value)
            },
            u = function () {
                return /[A-Z]/.test(n.inputElement.value)
            },
            d = function () {
                return /[0-9]/.test(n.inputElement.value)
            },
            c = function () {
                return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(n.inputElement.value)
            },
            m = function () {
                var e = 1;
                return !0 === n.options.checkUppercase && e++, !0 === n.options.checkLowercase && e++, !0 === n.options.checkDigit && e++, !0 === n.options.checkChar && e++, n.checkSteps = e, 100 / n.checkSteps
            },
            f = function () {
                var e = [].slice.call(n.highlightElement.querySelectorAll("div")),
                    t = e.length,
                    i = 0,
                    r = m(),
                    o = g();
                e.map((function (e) {
                    i++, r * i * (n.checkSteps / t) <= o ? e.classList.add("active") : e.classList.remove("active")
                }))
            },
            p = function () {
                var e = n.visibilityElement.querySelector("i:not(.d-none), .svg-icon:not(.d-none)"),
                    t = n.visibilityElement.querySelector("i.d-none, .svg-icon.d-none");
                "password" === n.inputElement.getAttribute("type").toLowerCase() ? n.inputElement.setAttribute("type", "text") : n.inputElement.setAttribute("type", "password"), e.classList.add("d-none"), t.classList.remove("d-none"), n.inputElement.focus()
            },
            g = function () {
                return n.score
            };
        !0 === KTUtil.data(e).has("password-meter") ? n = KTUtil.data(e).get("password-meter") : r(), n.check = function () {
            return a()
        }, n.getScore = function () {
            return g()
        }, n.reset = function () {
            return n.score = 0, void f()
        }
    }
};
KTPasswordMeter.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("password-meter") ? KTUtil.data(e).get("password-meter") : null
}, KTPasswordMeter.createInstances = function (e = "[data-kt-password-meter]") {
    var t = document.body.querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTPasswordMeter(t[n])
}, KTPasswordMeter.init = function () {
    KTPasswordMeter.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTPasswordMeter.init) : KTPasswordMeter.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTPasswordMeter);
var KTScroll = function (e, t) {
    var n = this;
    document.getElementsByTagName("BODY")[0];
    if (e) {
        var i = {
                saveState: !0
            },
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.element = e, n.id = n.element.getAttribute("id"), n.element.setAttribute("data-kt-scroll", "true"), a(), KTUtil.data(n.element).set("scroll", n)
            },
            o = function () {
                KTCookie.set(n.id + "st", n.element.scrollTop)
            },
            a = function () {
                var e, t;
                !0 === u("activate") || !1 === n.element.hasAttribute("data-kt-scroll-activate") ? (e = d(), null !== (t = l()) && t.length > 0 ? KTUtil.css(n.element, e, t) : KTUtil.css(n.element, e, ""), !0 === u("save-state") && void 0 !== KTCookie && n.id ? n.element.addEventListener("scroll", o) : n.element.removeEventListener("scroll", o), function () {
                    if (!0 === u("save-state") && void 0 !== KTCookie && n.id && KTCookie.get(n.id + "st")) {
                        var e = parseInt(KTCookie.get(n.id + "st"));
                        e > 0 && (n.element.scrollTop = e)
                    }
                }()) : (KTUtil.css(n.element, d(), ""), n.element.removeEventListener("scroll", o))
            },
            l = function () {
                var e = u(d());
                return e instanceof Function ? e.call() : null !== e && "string" == typeof e && "auto" === e.toLowerCase() ? s() : e
            },
            s = function () {
                var e, t = KTUtil.getViewPort().height,
                    i = u("dependencies"),
                    r = u("wrappers"),
                    o = u("offset");
                if (null !== i && ((e = document.querySelectorAll(i)) && e.length > 0))
                    for (var a = 0, l = e.length; a < l; a++) {
                        var s = e[a];
                        !1 !== KTUtil.visible(s) && (t -= parseInt(KTUtil.css(s, "height")), t -= parseInt(KTUtil.css(s, "margin-top")), t -= parseInt(KTUtil.css(s, "margin-bottom")), KTUtil.css(s, "border-top") && (t -= parseInt(KTUtil.css(s, "border-top"))), KTUtil.css(s, "border-bottom") && (t -= parseInt(KTUtil.css(s, "border-bottom"))))
                    }
                if (null !== r && ((e = document.querySelectorAll(r)) && e.length > 0))
                    for (a = 0, l = e.length; a < l; a++) {
                        s = e[a];
                        !1 !== KTUtil.visible(s) && (t -= parseInt(KTUtil.css(s, "margin-top")), t -= parseInt(KTUtil.css(s, "margin-bottom")), t -= parseInt(KTUtil.css(s, "padding-top")), t -= parseInt(KTUtil.css(s, "padding-bottom")), KTUtil.css(s, "border-top") && (t -= parseInt(KTUtil.css(s, "border-top"))), KTUtil.css(s, "border-bottom") && (t -= parseInt(KTUtil.css(s, "border-bottom"))))
                    }
                return null !== o && (t -= parseInt(o)), t -= parseInt(KTUtil.css(n.element, "margin-top")), t -= parseInt(KTUtil.css(n.element, "margin-bottom")), KTUtil.css(s, "border-top") && (t -= parseInt(KTUtil.css(s, "border-top"))), KTUtil.css(s, "border-bottom") && (t -= parseInt(KTUtil.css(s, "border-bottom"))), t = String(t) + "px"
            },
            u = function (e) {
                if (!0 === n.element.hasAttribute("data-kt-scroll-" + e)) {
                    var t = n.element.getAttribute("data-kt-scroll-" + e),
                        i = KTUtil.getResponsiveValue(t);
                    return null !== i && "true" === String(i) ? i = !0 : null !== i && "false" === String(i) && (i = !1), i
                }
                var r = KTUtil.snakeToCamel(e);
                return n.options[r] ? KTUtil.getResponsiveValue(n.options[r]) : null
            },
            d = function () {
                return u("height") ? "height" : u("min-height") ? "min-height" : u("max-height") ? "max-height" : void 0
            };
        KTUtil.data(e).has("scroll") ? n = KTUtil.data(e).get("scroll") : r(), n.update = function () {
            return a()
        }, n.getHeight = function () {
            return l()
        }, n.getElement = function () {
            return n.element
        }
    }
};
KTScroll.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("scroll") ? KTUtil.data(e).get("scroll") : null
}, KTScroll.createInstances = function (e = '[data-kt-scroll="true"]') {
    var t = document.getElementsByTagName("BODY")[0].querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTScroll(t[n])
}, window.addEventListener("resize", (function () {
    var e = document.getElementsByTagName("BODY")[0];
    KTUtil.throttle(undefined, (function () {
        var t = e.querySelectorAll('[data-kt-scroll="true"]');
        if (t && t.length > 0)
            for (var n = 0, i = t.length; n < i; n++) {
                var r = KTScroll.getInstance(t[n]);
                r && r.update()
            }
    }), 200)
})), KTScroll.init = function () {
    KTScroll.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTScroll.init) : KTScroll.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTScroll);
var KTScrolltop = function (e, t) {
    var n = this,
        i = document.getElementsByTagName("BODY")[0];
    if (null != e) {
        var r = {
                offset: 300,
                speed: 600
            },
            o = function () {
                n.options = KTUtil.deepExtend({}, r, t), n.uid = KTUtil.getUniqueId("scrolltop"), n.element = e, n.element.setAttribute("data-kt-scrolltop", "true"), a(), KTUtil.data(n.element).set("scrolltop", n)
            },
            a = function () {
                window.addEventListener("scroll", (function () {
                    KTUtil.throttle(undefined, (function () {
                        l()
                    }), 200)
                })), KTUtil.addEvent(n.element, "click", (function (e) {
                    e.preventDefault(), s()
                }))
            },
            l = function () {
                var e = parseInt(u("offset"));
                KTUtil.getScrollTop() > e ? !1 === i.hasAttribute("data-kt-scrolltop") && i.setAttribute("data-kt-scrolltop", "on") : !0 === i.hasAttribute("data-kt-scrolltop") && i.removeAttribute("data-kt-scrolltop")
            },
            s = function () {
                var e = parseInt(u("speed"));
                KTUtil.scrollTop(0, e)
            },
            u = function (e) {
                if (!0 === n.element.hasAttribute("data-kt-scrolltop-" + e)) {
                    var t = n.element.getAttribute("data-kt-scrolltop-" + e),
                        i = KTUtil.getResponsiveValue(t);
                    return null !== i && "true" === String(i) ? i = !0 : null !== i && "false" === String(i) && (i = !1), i
                }
                var r = KTUtil.snakeToCamel(e);
                return n.options[r] ? KTUtil.getResponsiveValue(n.options[r]) : null
            };
        KTUtil.data(e).has("scrolltop") ? n = KTUtil.data(e).get("scrolltop") : o(), n.go = function () {
            return s()
        }, n.getElement = function () {
            return n.element
        }
    }
};
KTScrolltop.getInstance = function (e) {
    return e && KTUtil.data(e).has("scrolltop") ? KTUtil.data(e).get("scrolltop") : null
}, KTScrolltop.createInstances = function (e = '[data-kt-scrolltop="true"]') {
    var t = document.getElementsByTagName("BODY")[0].querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTScrolltop(t[n])
}, KTScrolltop.init = function () {
    KTScrolltop.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTScrolltop.init) : KTScrolltop.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTScrolltop);
var KTSearch = function (e, t) {
    var n = this;
    if (e) {
        var i = {
                minLength: 2,
                keypress: !0,
                enter: !0,
                layout: "menu",
                responsive: null,
                showOnFocus: !0
            },
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.processing = !1, n.element = e, n.contentElement = v("content"), n.formElement = v("form"), n.inputElement = v("input"), n.spinnerElement = v("spinner"), n.clearElement = v("clear"), n.toggleElement = v("toggle"), n.submitElement = v("submit"), n.toolbarElement = v("toolbar"), n.resultsElement = v("results"), n.suggestionElement = v("suggestion"), n.emptyElement = v("empty"), n.element.setAttribute("data-kt-search", "true"), n.layout = g("layout"), "menu" === n.layout ? n.menuObject = new KTMenu(n.contentElement) : n.menuObject = null, m(), o(), KTUtil.data(n.element).set("search", n)
            },
            o = function () {
                n.inputElement.addEventListener("focus", a), n.inputElement.addEventListener("blur", l), !0 === g("keypress") && n.inputElement.addEventListener("input", u), n.submitElement && n.submitElement.addEventListener("click", d), !0 === g("enter") && n.inputElement.addEventListener("keypress", s), n.clearElement && n.clearElement.addEventListener("click", c), n.menuObject && (n.toggleElement && (n.toggleElement.addEventListener("click", f), n.menuObject.on("kt.menu.dropdown.show", (function (e) {
                    KTUtil.visible(n.toggleElement) && (n.toggleElement.classList.add("active"), n.toggleElement.classList.add("show"))
                })), n.menuObject.on("kt.menu.dropdown.hide", (function (e) {
                    KTUtil.visible(n.toggleElement) && (n.toggleElement.classList.remove("active"), n.toggleElement.classList.remove("show"))
                }))), n.menuObject.on("kt.menu.dropdown.shown", (function () {
                    n.inputElement.focus()
                }))), window.addEventListener("resize", (function () {
                    KTUtil.throttle(undefined, (function () {
                        m()
                    }), 200)
                }))
            },
            a = function () {
                n.element.classList.add("focus"), (!0 === g("show-on-focus") || n.inputElement.value.length >= minLength) && f()
            },
            l = function () {
                n.element.classList.remove("focus")
            },
            s = function (e) {
                13 == (e.charCode || e.keyCode || 0) && (e.preventDefault(), d())
            },
            u = function () {
                if (g("min-length")) {
                    var e = parseInt(g("min-length"));
                    n.inputElement.value.length >= e ? d() : 0 === n.inputElement.value.length && c()
                }
            },
            d = function () {
                !1 === n.processing && (n.spinnerElement && n.spinnerElement.classList.remove("d-none"), n.clearElement && n.clearElement.classList.add("d-none"), n.toolbarElement && n.toolbarElement.classList.add("d-none"), n.inputElement.focus(), n.processing = !0, KTEventHandler.trigger(n.element, "kt.search.process", n))
            },
            c = function () {
                !1 !== KTEventHandler.trigger(n.element, "kt.search.clear", n) && (n.inputElement.value = "", n.inputElement.focus(), n.clearElement && n.clearElement.classList.add("d-none"), n.toolbarElement && n.toolbarElement.classList.remove("d-none"), !1 === g("show-on-focus") && p(), KTEventHandler.trigger(n.element, "kt.search.cleared", n))
            },
            m = function () {
                if ("menu" === n.layout) {
                    var e = T();
                    "on" === e && !1 === n.contentElement.contains(n.formElement) ? (n.contentElement.prepend(n.formElement), n.formElement.classList.remove("d-none")) : "off" === e && !0 === n.contentElement.contains(n.formElement) && (n.element.prepend(n.formElement), n.formElement.classList.add("d-none"))
                }
            },
            f = function () {
                n.menuObject && (m(), n.menuObject.show(n.element))
            },
            p = function () {
                n.menuObject && (m(), n.menuObject.hide(n.element))
            },
            g = function (e) {
                if (!0 === n.element.hasAttribute("data-kt-search-" + e)) {
                    var t = n.element.getAttribute("data-kt-search-" + e),
                        i = KTUtil.getResponsiveValue(t);
                    return null !== i && "true" === String(i) ? i = !0 : null !== i && "false" === String(i) && (i = !1), i
                }
                var r = KTUtil.snakeToCamel(e);
                return n.options[r] ? KTUtil.getResponsiveValue(n.options[r]) : null
            },
            v = function (e) {
                return n.element.querySelector('[data-kt-search-element="' + e + '"]')
            },
            T = function () {
                var e = g("responsive"),
                    t = KTUtil.getViewPort().width;
                if (!e) return null;
                var n = KTUtil.getBreakpoint(e);
                return n || (n = parseInt(e)), t < n ? "on" : "off"
            };
        !0 === KTUtil.data(e).has("search") ? n = KTUtil.data(e).get("search") : r(), n.show = function () {
            return f()
        }, n.hide = function () {
            return p()
        }, n.update = function () {
            return m()
        }, n.search = function () {
            return d()
        }, n.complete = function () {
            return n.spinnerElement && n.spinnerElement.classList.add("d-none"), n.clearElement && n.clearElement.classList.remove("d-none"), 0 === n.inputElement.value.length && c(), n.inputElement.focus(), f(), void(n.processing = !1)
        }, n.clear = function () {
            return c()
        }, n.isProcessing = function () {
            return n.processing
        }, n.getQuery = function () {
            return n.inputElement.value()
        }, n.getMenu = function () {
            return n.menuObject
        }, n.getFormElement = function () {
            return n.formElement
        }, n.getInputElement = function () {
            return n.inputElement
        }, n.getContentElement = function () {
            return n.contentElement
        }, n.getElement = function () {
            return n.element
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }
    }
};
KTSearch.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("search") ? KTUtil.data(e).get("search") : null
}, "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTSearch);
var KTStepper = function (e, t) {
    var n = this;
    document.getElementsByTagName("BODY")[0];
    if (null != e) {
        var i = {
                startIndex: 1,
                animation: !1,
                animationSpeed: "0.3s",
                animationNextClass: "animate__animated animate__slideInRight animate__fast",
                animationPreviousClass: "animate__animated animate__slideInLeft animate__fast"
            },
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.uid = KTUtil.getUniqueId("stepper"), n.element = e, n.element.setAttribute("data-kt-stepper", "true"), n.steps = KTUtil.findAll(n.element, '[data-kt-stepper-element="nav"]'), n.btnNext = KTUtil.find(n.element, '[data-kt-stepper-action="next"]'), n.btnPrevious = KTUtil.find(n.element, '[data-kt-stepper-action="previous"]'), n.btnSubmit = KTUtil.find(n.element, '[data-kt-stepper-action="submit"]'), n.totalStepsNumber = n.steps.length, n.passedStepIndex = 0, n.currentStepIndex = 1, n.options.startIndex > 1 && o(n.options.startIndex), KTUtil.addEvent(n.btnNext, "click", (function (e) {
                    e.preventDefault(), KTEventHandler.trigger(n.element, "kt.stepper.next", n)
                })), KTUtil.addEvent(n.btnPrevious, "click", (function (e) {
                    e.preventDefault(), KTEventHandler.trigger(n.element, "kt.stepper.previous", n)
                })), KTUtil.on(n.element, '[data-kt-stepper-action="step"]', "click", (function (e) {
                    if (e.PreviousentDefault(), n.steps && n.steps.length > 0)
                        for (var t = 0, i = n.steps.length; t < i; t++) {
                            if (n.steps[t] === this) return void("next" === f(t + 1) ? KTEventHandler.trigger(n.element, "kt.stepper.next", n) : KTEventHandler.trigger(n.element, "kt.stepper.Previousious", n))
                        }
                })), KTUtil.data(n.element).set("stepper", n)
            },
            o = function (e) {
                if (KTEventHandler.trigger(n.element, "kt.stepper.change", n), !(e === n.currentStepIndex || e > n.totalStepsNumber || e < 0)) return e = parseInt(e), n.passedStepIndex = n.currentStepIndex, n.currentStepIndex = e, a(), KTEventHandler.trigger(n.element, "kt.stepper.changed", n), n
            },
            a = function () {
                var e = "";
                e = l() ? "last" : s() ? "first" : "between", KTUtil.removeClass(n.element, "last"), KTUtil.removeClass(n.element, "first"), KTUtil.removeClass(n.element, "between"), KTUtil.addClass(n.element, e);
                var t = KTUtil.findAll(n.element, '[data-kt-stepper-element="nav"], [data-kt-stepper-element="content"], [data-kt-stepper-element="info"]');
                if (t && t.length > 0)
                    for (var i = 0, r = t.length; i < r; i++) {
                        var o = t[i],
                            a = KTUtil.index(o) + 1;
                        if (KTUtil.removeClass(o, "current"), KTUtil.removeClass(o, "completed"), KTUtil.removeClass(o, "pending"), a == n.currentStepIndex) {
                            if (KTUtil.addClass(o, "current"), !1 !== n.options.animation && "content" == o.getAttribute("data-kt-stepper-element")) {
                                KTUtil.css(o, "animationDuration", n.options.animationSpeed);
                                var u = "previous" === f(n.passedStepIndex) ? n.options.animationPreviousClass : n.options.animationNextClass;
                                KTUtil.animateClass(o, u)
                            }
                        } else a < n.currentStepIndex ? KTUtil.addClass(o, "completed") : KTUtil.addClass(o, "pending")
                    }
            },
            l = function () {
                return n.currentStepIndex === n.totalStepsNumber
            },
            s = function () {
                return 1 === n.currentStepIndex
            },
            u = function () {
                return n.totalStepsNumber >= n.currentStepIndex + 1 ? n.currentStepIndex + 1 : n.totalStepsNumber
            },
            d = function () {
                return n.currentStepIndex - 1 > 1 ? n.currentStepIndex - 1 : 1
            },
            c = function () {
                return 1
            },
            m = function () {
                return n.totalStepsNumber
            },
            f = function (e) {
                return e > n.currentStepIndex ? "next" : "previous"
            };
        !0 === KTUtil.data(e).has("stepper") ? n = KTUtil.data(e).get("stepper") : r(), n.getElement = function (e) {
            return n.element
        }, n.goTo = function (e) {
            return o(e)
        }, n.goPrevious = function () {
            return o(d())
        }, n.goNext = function () {
            return o(u())
        }, n.goFirst = function () {
            return o(c())
        }, n.goLast = function () {
            return o(m())
        }, n.getCurrentStepIndex = function () {
            return n.currentStepIndex
        }, n.getNextStepIndex = function () {
            return n.nextStepIndex
        }, n.getPassedtepIndex = function () {
            return n.passedStepIndex
        }, n.getPreviousStepIndex = function () {
            return n.PreviousStepIndex
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }, n.trigger = function (e, t) {
            return KTEventHandler.trigger(n.element, e, t, n, t)
        }
    }
};
KTStepper.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("stepper") ? KTUtil.data(e).get("stepper") : null
}, "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTStepper);
var KTSticky = function (e, t) {
    var n = this,
        i = document.getElementsByTagName("BODY")[0];
    if (null != e) {
        var r = {
                offset: 200,
                reverse: !1,
                animation: !0,
                animationSpeed: "0.3s",
                animationClass: "animation-slide-in-down"
            },
            o = function () {
                n.element = e, n.options = KTUtil.deepExtend({}, r, t), n.uid = KTUtil.getUniqueId("sticky"), n.name = n.element.getAttribute("data-kt-sticky-name"), n.attributeName = "data-kt-sticky-" + n.name, n.eventTriggerState = !0, n.lastScrollTop = 0, n.element.setAttribute("data-kt-sticky", "true"), window.addEventListener("scroll", a), a(), KTUtil.data(n.element).set("sticky", n)
            },
            a = function (e) {
                var t, r = u("offset"),
                    o = u("reverse");
                !1 !== r && (r = parseInt(r), t = KTUtil.getScrollTop(), !0 === o ? (t > r && n.lastScrollTop < t ? (!1 === i.hasAttribute(n.attributeName) && (l(), i.setAttribute(n.attributeName, "on")), !0 === n.eventTriggerState && (KTEventHandler.trigger(n.element, "kt.sticky.on", n), KTEventHandler.trigger(n.element, "kt.sticky.change", n), n.eventTriggerState = !1)) : (!0 === i.hasAttribute(n.attributeName) && (s(), i.removeAttribute(n.attributeName)), !1 === n.eventTriggerState && (KTEventHandler.trigger(n.element, "kt.sticky.off", n), KTEventHandler.trigger(n.element, "kt.sticky.change", n), n.eventTriggerState = !0)), n.lastScrollTop = t) : t > r ? (!1 === i.hasAttribute(n.attributeName) && (l(), i.setAttribute(n.attributeName, "on")), !0 === n.eventTriggerState && (KTEventHandler.trigger(n.element, "kt.sticky.on", n), KTEventHandler.trigger(n.element, "kt.sticky.change", n), n.eventTriggerState = !1)) : (!0 === i.hasAttribute(n.attributeName) && (s(), i.removeAttribute(n.attributeName)), !1 === n.eventTriggerState && (KTEventHandler.trigger(n.element, "kt.sticky.off", n), KTEventHandler.trigger(n.element, "kt.sticky.change", n), n.eventTriggerState = !0)))
            },
            l = function (e) {
                var t = u("top"),
                    i = u("left"),
                    r = (u("right"), u("width")),
                    o = u("zindex");
                if (!0 !== e && !0 === u("animation") && (KTUtil.css(n.element, "animationDuration", u("animationSpeed")), KTUtil.animateClass(n.element, "animation " + u("animationClass"))), null !== o && (KTUtil.css(n.element, "z-index", o), KTUtil.css(n.element, "position", "fixed")), null !== t && KTUtil.css(n.element, "top", t), null !== r) {
                    if (r.target) {
                        var a = document.querySelector(r.target);
                        a && (r = KTUtil.css(a, "width"))
                    }
                    KTUtil.css(n.element, "width", r)
                }
                if (null !== i && "auto" === String(i).toLowerCase()) {
                    var l = KTUtil.offset(n.element).left;
                    l > 0 && KTUtil.css(n.element, "left", String(l) + "px")
                }
            },
            s = function () {
                KTUtil.css(n.element, "top", ""), KTUtil.css(n.element, "width", ""), KTUtil.css(n.element, "left", ""), KTUtil.css(n.element, "right", ""), KTUtil.css(n.element, "z-index", ""), KTUtil.css(n.element, "position", "")
            },
            u = function (e) {
                if (!0 === n.element.hasAttribute("data-kt-sticky-" + e)) {
                    var t = n.element.getAttribute("data-kt-sticky-" + e),
                        i = KTUtil.getResponsiveValue(t);
                    return null !== i && "true" === String(i) ? i = !0 : null !== i && "false" === String(i) && (i = !1), i
                }
                var r = KTUtil.snakeToCamel(e);
                return n.options[r] ? KTUtil.getResponsiveValue(n.options[r]) : null
            };
        !0 === KTUtil.data(e).has("sticky") ? n = KTUtil.data(e).get("sticky") : o(), n.update = function () {
            !0 === i.hasAttribute(n.attributeName) && (s(), i.removeAttribute(n.attributeName), l(!0), i.setAttribute(n.attributeName, "on"))
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }, n.trigger = function (e, t) {
            return KTEventHandler.trigger(n.element, e, t, n, t)
        }
    }
};
KTSticky.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("sticky") ? KTUtil.data(e).get("sticky") : null
}, KTSticky.createInstances = function (e = '[data-kt-sticky="true"]') {
    var t = document.getElementsByTagName("BODY")[0].querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTSticky(t[n])
}, window.addEventListener("resize", (function () {
    var e = document.getElementsByTagName("BODY")[0];
    KTUtil.throttle(undefined, (function () {
        var t = e.querySelectorAll('[data-kt-sticky="true"]');
        if (t && t.length > 0)
            for (var n = 0, i = t.length; n < i; n++) {
                var r = KTSticky.getInstance(t[n]);
                r && r.update()
            }
    }), 200)
})), KTSticky.init = function () {
    KTSticky.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTSticky.init) : KTSticky.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTSticky);
var KTSwapper = function (e, t) {
    var n = this;
    if (null != e) {
        var i = {
                mode: "append"
            },
            r = function () {
                n.element = e, n.options = KTUtil.deepExtend({}, i, t), n.element.setAttribute("data-kt-swapper", "true"), o(), KTUtil.data(n.element).set("swapper", n)
            },
            o = function (t) {
                var n = a("parent"),
                    i = a("mode"),
                    r = n ? document.querySelector(n) : null;
                r && e.parentNode !== r && ("prepend" === i ? r.prepend(e) : "append" === i && r.append(e))
            },
            a = function (e) {
                if (!0 === n.element.hasAttribute("data-kt-swapper-" + e)) {
                    var t = n.element.getAttribute("data-kt-swapper-" + e),
                        i = KTUtil.getResponsiveValue(t);
                    return null !== i && "true" === String(i) ? i = !0 : null !== i && "false" === String(i) && (i = !1), i
                }
                var r = KTUtil.snakeToCamel(e);
                return n.options[r] ? KTUtil.getResponsiveValue(n.options[r]) : null
            };
        !0 === KTUtil.data(e).has("swapper") ? n = KTUtil.data(e).get("swapper") : r(), n.update = function () {
            o()
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }, n.trigger = function (e, t) {
            return KTEventHandler.trigger(n.element, e, t, n, t)
        }
    }
};
KTSwapper.getInstance = function (e) {
    return null !== e && KTUtil.data(e).has("swapper") ? KTUtil.data(e).get("swapper") : null
}, KTSwapper.createInstances = function (e = '[data-kt-swapper="true"]') {
    var t = document.querySelectorAll(e);
    if (t && t.length > 0)
        for (var n = 0, i = t.length; n < i; n++) new KTSwapper(t[n])
}, window.addEventListener("resize", (function () {
    KTUtil.throttle(undefined, (function () {
        var e = document.querySelectorAll('[data-kt-swapper="true"]');
        if (e && e.length > 0)
            for (var t = 0, n = e.length; t < n; t++) {
                var i = KTSwapper.getInstance(e[t]);
                i && i.update()
            }
    }), 200)
})), KTSwapper.init = function () {
    KTSwapper.createInstances()
}, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTSwapper.init) : KTSwapper.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTSwapper);
var KTToggle = function (e, t) {
    var n = this;
    document.getElementsByTagName("BODY")[0];
    if (e) {
        var i = {
                saveState: !0
            },
            r = function () {
                n.options = KTUtil.deepExtend({}, i, t), n.uid = KTUtil.getUniqueId("toggle"), n.element = e, n.target = document.querySelector(n.element.getAttribute("data-kt-toggle-target")) ? document.querySelector(n.element.getAttribute("data-kt-toggle-target")) : n.element, n.state = n.element.hasAttribute("data-kt-toggle-state") ? n.element.getAttribute("data-kt-toggle-state") : "", n.attribute = "data-kt-" + n.element.getAttribute("data-kt-toggle-name"), o(), KTUtil.data(n.element).set("toggle", n)
            },
            o = function () {
                KTUtil.addEvent(n.element, "click", (function (e) {
                    e.preventDefault(), a()
                }))
            },
            a = function () {
                return KTEventHandler.trigger(n.element, "kt.toggle.change", n), u() ? s() : l(), KTEventHandler.trigger(n.element, "kt.toggle.changed", n), n
            },
            l = function () {
                if (!0 !== u()) return KTEventHandler.trigger(n.element, "kt.toggle.enable", n), n.target.setAttribute(n.attribute, "on"), n.state.length > 0 && n.element.classList.add(n.state), void 0 !== KTCookie && !0 === n.options.saveState && KTCookie.set(n.attribute, "on"), KTEventHandler.trigger(n.element, "kt.toggle.enabled", n), n
            },
            s = function () {
                if (!1 !== u()) return KTEventHandler.trigger(n.element, "kt.toggle.disable", n), n.target.removeAttribute(n.attribute), n.state.length > 0 && n.element.classList.remove(n.state), void 0 !== KTCookie && !0 === n.options.saveState && KTCookie.remove(n.attribute), KTEventHandler.trigger(n.element, "kt.toggle.disabled", n), n
            },
            u = function () {
                return "on" === String(n.target.getAttribute(n.attribute)).toLowerCase()
            };
        !0 === KTUtil.data(e).has("toggle") ? n = KTUtil.data(e).get("toggle") : r(), n.toggle = function () {
            return a()
        }, n.enable = function () {
            return l()
        }, n.disable = function () {
            return s()
        }, n.isEnabled = function () {
            return u()
        }, n.goElement = function () {
            return n.element
        }, n.on = function (e, t) {
            return KTEventHandler.on(n.element, e, t)
        }, n.one = function (e, t) {
            return KTEventHandler.one(n.element, e, t)
        }, n.off = function (e) {
            return KTEventHandler.off(n.element, e)
        }, n.trigger = function (e, t) {
            return KTEventHandler.trigger(n.element, e, t, n, t)
        }
    }
};
KTToggle.getInstance = function (e) {
        return null !== e && KTUtil.data(e).has("toggle") ? KTUtil.data(e).get("toggle") : null
    }, KTToggle.createInstances = function (e = "[data-kt-toggle]") {
        var t = document.getElementsByTagName("BODY")[0].querySelectorAll(e);
        if (t && t.length > 0)
            for (var n = 0, i = t.length; n < i; n++) new KTToggle(t[n])
    }, KTToggle.init = function () {
        KTToggle.createInstances()
    }, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", KTToggle.init) : KTToggle.init(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTToggle), Element.prototype.matches || (Element.prototype.matches = function (e) {
        for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
        return n > -1
    }), Element.prototype.closest || (Element.prototype.closest = function (e) {
        var t = this;
        if (!document.documentElement.contains(this)) return null;
        do {
            if (t.matches(e)) return t;
            t = t.parentElement
        } while (null !== t);
        return null
    })
    /**
     * ChildNode.remove() polyfill
     * https://gomakethings.com/removing-an-element-from-the-dom-the-es6-way/
     * @author Chris Ferdinandi
     * @license MIT
     */
    ,
    function (e) {
        for (var t = 0; t < e.length; t++) window[e[t]] && !("remove" in window[e[t]].prototype) && (window[e[t]].prototype.remove = function () {
            this.parentNode.removeChild(this)
        })
    }(["Element", "CharacterData", "DocumentType"]),
    function () {
        for (var e = 0, t = ["webkit", "moz"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
            var n = (new Date).getTime(),
                i = Math.max(0, 16 - (n - e)),
                r = window.setTimeout((function () {
                    t(n + i)
                }), i);
            return e = n + i, r
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
            clearTimeout(e)
        })
    }(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach((function (e) {
        e.hasOwnProperty("prepend") || Object.defineProperty(e, "prepend", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function () {
                var e = Array.prototype.slice.call(arguments),
                    t = document.createDocumentFragment();
                e.forEach((function (e) {
                    var n = e instanceof Node;
                    t.appendChild(n ? e : document.createTextNode(String(e)))
                })), this.insertBefore(t, this.firstChild)
            }
        })
    })), null == Element.prototype.getAttributeNames && (Element.prototype.getAttributeNames = function () {
        for (var e = this.attributes, t = e.length, n = new Array(t), i = 0; i < t; i++) n[i] = e[i].name;
        return n
    }), window.KTUtilElementDataStore = {}, window.KTUtilElementDataStoreID = 0, window.KTUtilDelegatedEventHandlers = {};
var KTUtil = function () {
    var e = [],
        t = function () {
            window.addEventListener("resize", (function () {
                KTUtil.throttle(undefined, (function () {
                    ! function () {
                        for (var t = 0; t < e.length; t++) e[t].call()
                    }()
                }), 200)
            }))
        };
    return {
        init: function (e) {
            t()
        },
        addResizeHandler: function (t) {
            e.push(t)
        },
        removeResizeHandler: function (t) {
            for (var n = 0; n < e.length; n++) t === e[n] && delete e[n]
        },
        runResizeHandlers: function () {
            _runResizeHandlers()
        },
        resize: function () {
            if ("function" == typeof Event) window.dispatchEvent(new Event("resize"));
            else {
                var e = window.document.createEvent("UIEvents");
                e.initUIEvent("resize", !0, !1, window, 0), window.dispatchEvent(e)
            }
        },
        getURLParam: function (e) {
            var t, n, i = window.location.search.substring(1).split("&");
            for (t = 0; t < i.length; t++)
                if ((n = i[t].split("="))[0] == e) return unescape(n[1]);
            return null
        },
        isMobileDevice: function () {
            var e = this.getViewPort().width < this.getBreakpoint("lg");
            return !1 === e && (e = null != navigator.userAgent.match(/iPad/i)), e
        },
        isDesktopDevice: function () {
            return !KTUtil.isMobileDevice()
        },
        getViewPort: function () {
            var e = window,
                t = "inner";
            return "innerWidth" in window || (t = "client", e = document.documentElement || document.body), {
                width: e[t + "Width"],
                height: e[t + "Height"]
            }
        },
        isBreakpointUp: function (e) {
            return this.getViewPort().width >= this.getBreakpoint(e)
        },
        isBreakpointDown: function (e) {
            return this.getViewPort().width < this.getBreakpoint(e)
        },
        getViewportWidth: function () {
            return this.getViewPort().width
        },
        getUniqueId: function (e) {
            return e + Math.floor(Math.random() * (new Date).getTime())
        },
        getBreakpoint: function (e) {
            var t = this.getCssVariableValue("--bs-" + e);
            return t && (t = parseInt(t.trim())), t
        },
        isset: function (e, t) {
            var n;
            if (-1 !== (t = t || "").indexOf("[")) throw new Error("Unsupported object path notation.");
            t = t.split(".");
            do {
                if (void 0 === e) return !1;
                if (n = t.shift(), !e.hasOwnProperty(n)) return !1;
                e = e[n]
            } while (t.length);
            return !0
        },
        getHighestZindex: function (e) {
            for (var t, n; e && e !== document;) {
                if (("absolute" === (t = KTUtil.css(e, "position")) || "relative" === t || "fixed" === t) && (n = parseInt(KTUtil.css(e, "z-index")), !isNaN(n) && 0 !== n)) return n;
                e = e.parentNode
            }
            return null
        },
        hasFixedPositionedParent: function (e) {
            for (; e && e !== document;) {
                if ("fixed" === KTUtil.css(e, "position")) return !0;
                e = e.parentNode
            }
            return !1
        },
        sleep: function (e) {
            for (var t = (new Date).getTime(), n = 0; n < 1e7 && !((new Date).getTime() - t > e); n++);
        },
        getRandomInt: function (e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        },
        isAngularVersion: function () {
            return void 0 !== window.Zone
        },
        deepExtend: function (e) {
            e = e || {};
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                if (n)
                    for (var i in n) n.hasOwnProperty(i) && ("[object Object]" !== Object.prototype.toString.call(n[i]) ? e[i] = n[i] : e[i] = KTUtil.deepExtend(e[i], n[i]))
            }
            return e
        },
        extend: function (e) {
            e = e || {};
            for (var t = 1; t < arguments.length; t++)
                if (arguments[t])
                    for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
            return e
        },
        getBody: function () {
            return document.getElementsByTagName("body")[0]
        },
        hasClasses: function (e, t) {
            if (e) {
                for (var n = t.split(" "), i = 0; i < n.length; i++)
                    if (0 == KTUtil.hasClass(e, KTUtil.trim(n[i]))) return !1;
                return !0
            }
        },
        hasClass: function (e, t) {
            if (e) return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)
        },
        addClass: function (e, t) {
            if (e && void 0 !== t) {
                var n = t.split(" ");
                if (e.classList)
                    for (var i = 0; i < n.length; i++) n[i] && n[i].length > 0 && e.classList.add(KTUtil.trim(n[i]));
                else if (!KTUtil.hasClass(e, t))
                    for (var r = 0; r < n.length; r++) e.className += " " + KTUtil.trim(n[r])
            }
        },
        removeClass: function (e, t) {
            if (e && void 0 !== t) {
                var n = t.split(" ");
                if (e.classList)
                    for (var i = 0; i < n.length; i++) e.classList.remove(KTUtil.trim(n[i]));
                else if (KTUtil.hasClass(e, t))
                    for (var r = 0; r < n.length; r++) e.className = e.className.replace(new RegExp("\\b" + KTUtil.trim(n[r]) + "\\b", "g"), "")
            }
        },
        triggerCustomEvent: function (e, t, n) {
            var i;
            window.CustomEvent ? i = new CustomEvent(t, {
                detail: n
            }) : (i = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, n), e.dispatchEvent(i)
        },
        triggerEvent: function (e, t) {
            var n;
            if (e.ownerDocument) n = e.ownerDocument;
            else {
                if (9 != e.nodeType) throw new Error("Invalid node passed to fireEvent: " + e.id);
                n = e
            }
            if (e.dispatchEvent) {
                var i = "";
                switch (t) {
                    case "click":
                    case "mouseenter":
                    case "mouseleave":
                    case "mousedown":
                    case "mouseup":
                        i = "MouseEvents";
                        break;
                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        i = "HTMLEvents";
                        break;
                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + t + "'."
                }
                var r = "change" != t;
                (o = n.createEvent(i)).initEvent(t, r, !0), o.synthetic = !0, e.dispatchEvent(o, !0)
            } else if (e.fireEvent) {
                var o;
                (o = n.createEventObject()).synthetic = !0, e.fireEvent("on" + t, o)
            }
        },
        index: function (e) {
            for (var t = e.parentNode.children, n = 0; n < t.length; n++)
                if (t[n] == e) return n
        },
        trim: function (e) {
            return e.trim()
        },
        eventTriggered: function (e) {
            return !!e.currentTarget.dataset.triggered || (e.currentTarget.dataset.triggered = !0, !1)
        },
        remove: function (e) {
            e && e.parentNode && e.parentNode.removeChild(e)
        },
        find: function (e, t) {
            return null !== e ? e.querySelector(t) : null
        },
        findAll: function (e, t) {
            return null !== e ? e.querySelectorAll(t) : null
        },
        insertAfter: function (e, t) {
            return t.parentNode.insertBefore(e, t.nextSibling)
        },
        parents: function (e, t) {
            for (var n = []; e && e !== document; e = e.parentNode) t ? e.matches(t) && n.push(e) : n.push(e);
            return n
        },
        children: function (e, t, n) {
            if (!e || !e.childNodes) return null;
            for (var i = [], r = 0, o = e.childNodes.length; r < o; ++r) 1 == e.childNodes[r].nodeType && KTUtil.matches(e.childNodes[r], t, n) && i.push(e.childNodes[r]);
            return i
        },
        child: function (e, t, n) {
            var i = KTUtil.children(e, t, n);
            return i ? i[0] : null
        },
        matches: function (e, t, n) {
            var i = Element.prototype,
                r = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function (e) {
                    return -1 !== [].indexOf.call(document.querySelectorAll(e), this)
                };
            return !(!e || !e.tagName) && r.call(e, t)
        },
        data: function (e) {
            return {
                set: function (t, n) {
                    e && (void 0 === e.customDataTag && (window.KTUtilElementDataStoreID++, e.customDataTag = window.KTUtilElementDataStoreID), void 0 === window.KTUtilElementDataStore[e.customDataTag] && (window.KTUtilElementDataStore[e.customDataTag] = {}), window.KTUtilElementDataStore[e.customDataTag][t] = n)
                },
                get: function (t) {
                    if (e) return void 0 === e.customDataTag ? null : this.has(t) ? window.KTUtilElementDataStore[e.customDataTag][t] : null
                },
                has: function (t) {
                    return !!e && (void 0 !== e.customDataTag && !(!window.KTUtilElementDataStore[e.customDataTag] || !window.KTUtilElementDataStore[e.customDataTag][t]))
                },
                remove: function (t) {
                    e && this.has(t) && delete window.KTUtilElementDataStore[e.customDataTag][t]
                }
            }
        },
        outerWidth: function (e, t) {
            var n;
            return !0 === t ? (n = parseFloat(e.offsetWidth), n += parseFloat(KTUtil.css(e, "margin-left")) + parseFloat(KTUtil.css(e, "margin-right")), parseFloat(n)) : n = parseFloat(e.offsetWidth)
        },
        offset: function (e) {
            var t, n;
            if (e) return e.getClientRects().length ? (t = e.getBoundingClientRect(), n = e.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset,
                right: window.innerWidth - (e.offsetLeft + e.offsetWidth)
            }) : {
                top: 0,
                left: 0
            }
        },
        height: function (e) {
            return KTUtil.css(e, "height")
        },
        outerHeight: function (e, t) {
            var n, i = e.offsetHeight;
            return void 0 !== t && !0 === t ? (n = getComputedStyle(e), i += parseInt(n.marginTop) + parseInt(n.marginBottom)) : i
        },
        visible: function (e) {
            return !(0 === e.offsetWidth && 0 === e.offsetHeight)
        },
        attr: function (e, t, n) {
            if (null != e) return void 0 === n ? e.getAttribute(t) : void e.setAttribute(t, n)
        },
        hasAttr: function (e, t) {
            if (null != e) return !!e.getAttribute(t)
        },
        removeAttr: function (e, t) {
            null != e && e.removeAttribute(t)
        },
        animate: function (e, t, n, i, r, o) {
            var a = {};
            if (a.linear = function (e, t, n, i) {
                    return n * e / i + t
                }, r = a.linear, "number" == typeof e && "number" == typeof t && "number" == typeof n && "function" == typeof i) {
                "function" != typeof o && (o = function () {});
                var l = window.requestAnimationFrame || function (e) {
                        window.setTimeout(e, 20)
                    },
                    s = t - e;
                i(e);
                var u = window.performance && window.performance.now ? window.performance.now() : +new Date;
                l((function a(d) {
                    var c = (d || +new Date) - u;
                    c >= 0 && i(r(c, e, s, n)), c >= 0 && c >= n ? (i(t), o()) : l(a)
                }))
            }
        },
        actualCss: function (e, t, n) {
            var i, r = "";
            if (e instanceof HTMLElement != !1) return e.getAttribute("kt-hidden-" + t) && !1 !== n ? parseFloat(e.getAttribute("kt-hidden-" + t)) : (r = e.style.cssText, e.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" == t ? i = e.offsetWidth : "height" == t && (i = e.offsetHeight), e.style.cssText = r, e.setAttribute("kt-hidden-" + t, i), parseFloat(i))
        },
        actualHeight: function (e, t) {
            return KTUtil.actualCss(e, "height", t)
        },
        actualWidth: function (e, t) {
            return KTUtil.actualCss(e, "width", t)
        },
        getScroll: function (e, t) {
            return t = "scroll" + t, e == window || e == document ? self["scrollTop" == t ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[t] || document.body[t] : e[t]
        },
        css: function (e, t, n, i) {
            if (e)
                if (void 0 !== n) !0 === i ? e.style.setProperty(t, n, "important") : e.style[t] = n;
                else {
                    var r = (e.ownerDocument || document).defaultView;
                    if (r && r.getComputedStyle) return t = t.replace(/([A-Z])/g, "-$1").toLowerCase(), r.getComputedStyle(e, null).getPropertyValue(t);
                    if (e.currentStyle) return t = t.replace(/\-(\w)/g, (function (e, t) {
                        return t.toUpperCase()
                    })), n = e.currentStyle[t], /^\d+(em|pt|%|ex)?$/i.test(n) ? function (t) {
                        var n = e.style.left,
                            i = e.runtimeStyle.left;
                        return e.runtimeStyle.left = e.currentStyle.left, e.style.left = t || 0, t = e.style.pixelLeft + "px", e.style.left = n, e.runtimeStyle.left = i, t
                    }(n) : n
                }
        },
        slide: function (e, t, n, i, r) {
            if (!(!e || "up" == t && !1 === KTUtil.visible(e) || "down" == t && !0 === KTUtil.visible(e))) {
                n = n || 600;
                var o = KTUtil.actualHeight(e),
                    a = !1,
                    l = !1;
                KTUtil.css(e, "padding-top") && !0 !== KTUtil.data(e).has("slide-padding-top") && KTUtil.data(e).set("slide-padding-top", KTUtil.css(e, "padding-top")), KTUtil.css(e, "padding-bottom") && !0 !== KTUtil.data(e).has("slide-padding-bottom") && KTUtil.data(e).set("slide-padding-bottom", KTUtil.css(e, "padding-bottom")), KTUtil.data(e).has("slide-padding-top") && (a = parseInt(KTUtil.data(e).get("slide-padding-top"))), KTUtil.data(e).has("slide-padding-bottom") && (l = parseInt(KTUtil.data(e).get("slide-padding-bottom"))), "up" == t ? (e.style.cssText = "display: block; overflow: hidden;", a && KTUtil.animate(0, a, n, (function (t) {
                    e.style.paddingTop = a - t + "px"
                }), "linear"), l && KTUtil.animate(0, l, n, (function (t) {
                    e.style.paddingBottom = l - t + "px"
                }), "linear"), KTUtil.animate(0, o, n, (function (t) {
                    e.style.height = o - t + "px"
                }), "linear", (function () {
                    e.style.height = "", e.style.display = "none", "function" == typeof i && i()
                }))) : "down" == t && (e.style.cssText = "display: block; overflow: hidden;", a && KTUtil.animate(0, a, n, (function (t) {
                    e.style.paddingTop = t + "px"
                }), "linear", (function () {
                    e.style.paddingTop = ""
                })), l && KTUtil.animate(0, l, n, (function (t) {
                    e.style.paddingBottom = t + "px"
                }), "linear", (function () {
                    e.style.paddingBottom = ""
                })), KTUtil.animate(0, o, n, (function (t) {
                    e.style.height = t + "px"
                }), "linear", (function () {
                    e.style.height = "", e.style.display = "", e.style.overflow = "", "function" == typeof i && i()
                })))
            }
        },
        slideUp: function (e, t, n) {
            KTUtil.slide(e, "up", t, n)
        },
        slideDown: function (e, t, n) {
            KTUtil.slide(e, "down", t, n)
        },
        show: function (e, t) {
            void 0 !== e && (e.style.display = t || "block")
        },
        hide: function (e) {
            void 0 !== e && (e.style.display = "none")
        },
        addEvent: function (e, t, n, i) {
            null != e && e.addEventListener(t, n)
        },
        removeEvent: function (e, t, n) {
            null !== e && e.removeEventListener(t, n)
        },
        on: function (e, t, n, i) {
            if (null !== e) {
                var r = KTUtil.getUniqueId("event");
                return window.KTUtilDelegatedEventHandlers[r] = function (n) {
                    for (var r = e.querySelectorAll(t), o = n.target; o && o !== e;) {
                        for (var a = 0, l = r.length; a < l; a++) o === r[a] && i.call(o, n);
                        o = o.parentNode
                    }
                }, KTUtil.addEvent(e, n, window.KTUtilDelegatedEventHandlers[r]), r
            }
        },
        off: function (e, t, n) {
            e && window.KTUtilDelegatedEventHandlers[n] && (KTUtil.removeEvent(e, t, window.KTUtilDelegatedEventHandlers[n]), delete window.KTUtilDelegatedEventHandlers[n])
        },
        one: function (e, t, n) {
            e.addEventListener(t, (function t(i) {
                return i.target && i.target.removeEventListener && i.target.removeEventListener(i.type, t), e && e.removeEventListener && i.currentTarget.removeEventListener(i.type, t), n(i)
            }))
        },
        hash: function (e) {
            var t, n = 0;
            if (0 === e.length) return n;
            for (t = 0; t < e.length; t++) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
            return n
        },
        animateClass: function (e, t, n) {
            var i, r = {
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MozAnimation: "mozAnimationEnd",
                WebkitAnimation: "webkitAnimationEnd",
                msAnimation: "msAnimationEnd"
            };
            for (var o in r) void 0 !== e.style[o] && (i = r[o]);
            KTUtil.addClass(e, t), KTUtil.one(e, i, (function () {
                KTUtil.removeClass(e, t)
            })), n && KTUtil.one(e, i, n)
        },
        transitionEnd: function (e, t) {
            var n, i = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "mozTransitionEnd",
                WebkitTransition: "webkitTransitionEnd",
                msTransition: "msTransitionEnd"
            };
            for (var r in i) void 0 !== e.style[r] && (n = i[r]);
            KTUtil.one(e, n, t)
        },
        animationEnd: function (e, t) {
            var n, i = {
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MozAnimation: "mozAnimationEnd",
                WebkitAnimation: "webkitAnimationEnd",
                msAnimation: "msAnimationEnd"
            };
            for (var r in i) void 0 !== e.style[r] && (n = i[r]);
            KTUtil.one(e, n, t)
        },
        animateDelay: function (e, t) {
            for (var n = ["webkit-", "moz-", "ms-", "o-", ""], i = 0; i < n.length; i++) KTUtil.css(e, n[i] + "animation-delay", t)
        },
        animateDuration: function (e, t) {
            for (var n = ["webkit-", "moz-", "ms-", "o-", ""], i = 0; i < n.length; i++) KTUtil.css(e, n[i] + "animation-duration", t)
        },
        scrollTo: function (e, t, n) {
            n = n || 500;
            var i, r, o = e ? KTUtil.offset(e).top : 0;
            t && (o -= t), i = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, r = o, KTUtil.animate(i, r, n, (function (e) {
                document.documentElement.scrollTop = e, document.body.parentNode.scrollTop = e, document.body.scrollTop = e
            }))
        },
        scrollTop: function (e, t) {
            KTUtil.scrollTo(null, e, t)
        },
        isArray: function (e) {
            return e && Array.isArray(e)
        },
        isEmpty: function (e) {
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        },
        numberString: function (e) {
            for (var t = (e += "").split("."), n = t[0], i = t.length > 1 ? "." + t[1] : "", r = /(\d+)(\d{3})/; r.test(n);) n = n.replace(r, "$1,$2");
            return n + i
        },
        isRTL: function () {
            return "rtl" === document.querySelector("html").getAttribute("direction")
        },
        snakeToCamel: function (e) {
            return e.replace(/(\-\w)/g, (function (e) {
                return e[1].toUpperCase()
            }))
        },
        filterBoolean: function (e) {
            return !0 === e || "true" === e || !1 !== e && "false" !== e && e
        },
        setHTML: function (e, t) {
            e.innerHTML = t
        },
        getHTML: function (e) {
            if (e) return e.innerHTML
        },
        getDocumentHeight: function () {
            var e = document.body,
                t = document.documentElement;
            return Math.max(e.scrollHeight, e.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight)
        },
        getScrollTop: function () {
            return (document.scrollingElement || document.documentElement).scrollTop
        },
        colorLighten: function (e, t) {
            const n = function (e, t) {
                let n = parseInt(e, 16) + t,
                    i = n > 255 ? 255 : n;
                return i = i.toString(16).length > 1 ? i.toString(16) : `0${i.toString(16)}`, i
            };
            return e = e.indexOf("#") >= 0 ? e.substring(1, e.length) : e, t = parseInt(255 * t / 100), `#${n(e.substring(0,2),t)}${n(e.substring(2,4),t)}${n(e.substring(4,6),t)}`
        },
        colorDarken: function (e, t) {
            const n = function (e, t) {
                let n = parseInt(e, 16) - t,
                    i = n < 0 ? 0 : n;
                return i = i.toString(16).length > 1 ? i.toString(16) : `0${i.toString(16)}`, i
            };
            return e = e.indexOf("#") >= 0 ? e.substring(1, e.length) : e, t = parseInt(255 * t / 100), `#${n(e.substring(0,2),t)}${n(e.substring(2,4),t)}${n(e.substring(4,6),t)}`
        },
        throttle: function (e, t, n) {
            e || (e = setTimeout((function () {
                t(), e = void 0
            }), n))
        },
        debounce: function (e, t, n) {
            clearTimeout(e), e = setTimeout(t, n)
        },
        parseJson: function (e) {
            if ("string" == typeof e) {
                var t = (e = e.replace(/'/g, '"')).replace(/(\w+:)|(\w+ :)/g, (function (e) {
                    return '"' + e.substring(0, e.length - 1) + '":'
                }));
                try {
                    e = JSON.parse(t)
                } catch (e) {}
            }
            return e
        },
        getResponsiveValue: function (e, t) {
            var n, i = this.getViewPort().width;
            if ("object" == typeof (e = KTUtil.parseJson(e))) {
                var r, o, a = -1;
                for (var l in e)(o = "default" === l ? 0 : this.getBreakpoint(l) ? this.getBreakpoint(l) : parseInt(l)) <= i && o > a && (r = l, a = o);
                n = r ? e[r] : e
            } else n = e;
            return n
        },
        each: function (e, t) {
            return [].slice.call(e).map(t)
        },
        getSelectorMatchValue: function (e) {
            var t = null;
            if ("object" == typeof (e = KTUtil.parseJson(e))) {
                if (void 0 !== e.match) {
                    var n = Object.keys(e.match)[0];
                    e = Object.values(e.match)[0], null !== document.querySelector(n) && (t = e)
                }
            } else t = e;
            return t
        },
        getConditionalValue: function (e) {
            e = KTUtil.parseJson(e);
            var t = KTUtil.getResponsiveValue(e);
            return null !== t && void 0 !== t.match && (t = KTUtil.getSelectorMatchValue(t)), null === t && null !== e && void 0 !== e.default && (t = e.default), t
        },
        getCssVariableValue: function (e) {
            var t = getComputedStyle(document.documentElement).getPropertyValue(e);
            return t && t.length > 0 && (t = t.trim()), t
        },
        isInViewport: function (e) {
            var t = e.getBoundingClientRect();
            return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
        },
        onDOMContentLoaded: function (e) {
            "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e()
        },
        inIframe: function () {
            try {
                return window.self !== window.top
            } catch (e) {
                return !0
            }
        }
    }
}();
"undefined" != typeof module && void 0 !== module.exports && (module.exports = KTUtil);
var KTApp = function () {
    var e = function (e, t) {
            var n = {};
            e.hasAttribute("data-bs-delay-hide") && (n.hide = e.getAttribute("data-bs-delay-hide")), e.hasAttribute("data-bs-delay-show") && (n.show = e.getAttribute("data-bs-delay-show")), n && (t.delay = n), e.hasAttribute("data-bs-dismiss") && "click" == e.getAttribute("data-bs-dismiss") && (t.dismiss = "click");
            var i = new bootstrap.Tooltip(e, t);
            return t.dismiss && "click" === t.dismiss && e.addEventListener("click", (function (e) {
                i.hide()
            })), i
        },
        t = function (e, t) {
            var n = {};
            e.hasAttribute("data-bs-delay-hide") && (n.hide = e.getAttribute("data-bs-delay-hide")), e.hasAttribute("data-bs-delay-show") && (n.show = e.getAttribute("data-bs-delay-show")), n && (t.delay = n), "true" == e.getAttribute("data-bs-dismiss") && (t.dismiss = !0), !0 === t.dismiss && (t.template = '<div class="popover" role="tooltip"><div class="popover-arrow"></div><span class="popover-dismiss btn btn-icon"><i class="bi bi-x fs-2"></i></span><h3 class="popover-header"></h3><div class="popover-body"></div></div>');
            var i = new bootstrap.Popover(e, t);
            if (!0 === t.dismiss) {
                var r = function (e) {
                    i.hide()
                };
                e.addEventListener("shown.bs.popover", (function () {
                    document.getElementById(e.getAttribute("aria-describedby")).addEventListener("click", r)
                })), e.addEventListener("hide.bs.popover", (function () {
                    document.getElementById(e.getAttribute("aria-describedby")).removeEventListener("click", r)
                }))
            }
            return i
        },
        n = function () {
            [].slice.call(document.querySelectorAll('[data-kt-countup="true"]:not(.counted)')).map((function (e) {
                if (KTUtil.isInViewport(e) && KTUtil.visible(e)) {
                    var t = {},
                        n = e.getAttribute("data-kt-countup-value");
                    n = parseFloat(n.replace(/,/, "")), e.hasAttribute("data-kt-countup-start-val") && (t.startVal = parseFloat(e.getAttribute("data-kt-countup-start-val"))), e.hasAttribute("data-kt-countup-duration") && (t.duration = parseInt(e.getAttribute("data-kt-countup-duration"))), e.hasAttribute("data-kt-countup-decimal-places") && (t.decimalPlaces = parseInt(e.getAttribute("data-kt-countup-decimal-places"))), e.hasAttribute("data-kt-countup-prefix") && (t.prefix = e.getAttribute("data-kt-countup-prefix")), e.hasAttribute("data-kt-countup-suffix") && (t.suffix = e.getAttribute("data-kt-countup-suffix")), new countUp.CountUp(e, n, t).start(), e.classList.add("counted")
                }
            }))
        },
        i = function () {
            const e = Array.prototype.slice.call(document.querySelectorAll('[data-tns="true"]'), 0);
            (e || 0 !== e.length) && e.forEach((function (e) {
                ! function (e) {
                    if (!e) return;
                    const t = {};
                    e.getAttributeNames().forEach((function (n) {
                        if (/^data-tns-.*/g.test(n)) {
                            let r = n.replace("data-tns-", "").toLowerCase().replace(/(?:[\s-])\w/g, (function (e) {
                                return e.replace("-", "").toUpperCase()
                            }));
                            if ("data-tns-responsive" === n) {
                                const i = e.getAttribute(n).replace(/(\w+:)|(\w+ :)/g, (function (e) {
                                    return '"' + e.substring(0, e.length - 1) + '":'
                                }));
                                try {
                                    t[r] = JSON.parse(i)
                                } catch (e) {}
                            } else t[r] = "true" === (i = e.getAttribute(n)) || "false" !== i && i
                        }
                        var i
                    }));
                    const n = Object.assign({}, {
                        container: e,
                        slideBy: "page",
                        autoplay: !0,
                        autoplayButtonOutput: !1
                    }, t);
                    e.closest(".tns") && KTUtil.addClass(e.closest(".tns"), "tns-initiazlied"), tns(n)
                }(e)
            }))
        };
    return {
        init: function () {
            this.initPageLoader(), this.initBootstrapTooltips(), this.initBootstrapPopovers(), this.initScrollSpy(), this.initButtons(), this.initCheck(), this.initSelect2(), this.initCountUp(), this.initCountUpTabs(), this.initAutosize(), this.initTinySliders(), this.initSmoothScroll()
        },
        initPageLoader: function () {
            KTUtil.removeClass(document.body, "page-loading")
        },
        initBootstrapTooltip: function (t, n) {
            return e(t, n)
        },
        initBootstrapTooltips: function () {
            [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function (t) {
                e(t, {})
            }))
        },
        initBootstrapPopovers: function () {
            [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function (e) {
                t(e, {})
            }))
        },
        initBootstrapPopover: function (e, n) {
            return t(e, n)
        },
        initScrollSpy: function () {
            [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]')).map((function (e) {
                e.getAttribute("data-bs-target");
                var t = document.querySelector(e.getAttribute("data-bs-target")),
                    n = bootstrap.ScrollSpy.getInstance(t);
                n && n.refresh()
            }))
        },
        initButtons: function () {
            [].slice.call(document.querySelectorAll('[data-kt-buttons="true"]')).map((function (e) {
                var t = e.hasAttribute("data-kt-buttons-target") ? e.getAttribute("data-kt-buttons-target") : ".btn";
                KTUtil.on(e, t, "click", (function (n) {
                    [].slice.call(e.querySelectorAll(t + ".active")).map((function (e) {
                        e.classList.remove("active")
                    })), this.classList.add("active")
                }))
            }))
        },
        initCheck: function () {
            KTUtil.on(document.body, '[data-kt-check="true"]', "change", (function (e) {
                var t = this,
                    n = document.querySelectorAll(t.getAttribute("data-kt-check-target"));
                KTUtil.each(n, (function (e) {
                    "checkbox" == e.type ? e.checked = t.checked : e.classList.toggle("active")
                }))
            }))
        },
        initSelect2: function () {
            [].slice.call(document.querySelectorAll('[data-control="select2"], [data-kt-select2="true"]')).map((function (e) {
                var t = {
                    dir: document.body.getAttribute("direction")
                };
                "true" == e.getAttribute("data-hide-search") && (t.minimumResultsForSearch = 1 / 0), $(e).select2(t)
            }))
        },
        initCountUp: function () {
            n()
        },
        initCountUpTabs: function () {
            n(), window.addEventListener("scroll", n), [].slice.call(document.querySelectorAll('[data-kt-countup-tabs="true"][data-bs-toggle="tab"]')).map((function (e) {
                e.addEventListener("shown.bs.tab", n)
            }))
        },
        initAutosize: function () {
            [].slice.call(document.querySelectorAll('[data-kt-autosize="true"]')).map((function (e) {
                autosize(e)
            }))
        },
        initTinySliders: function () {
            i()
        },
        initSmoothScroll: function () {
            SmoothScroll && new SmoothScroll('a[data-kt-scroll-toggle][href*="#"]', {
                offset: function (e, t) {
                    return e.hasAttribute("data-kt-scroll-offset") ? KTUtil.getResponsiveValue(e.getAttribute("data-kt-scroll-offset")) : 0
                }
            })
        },
        isDarkMode: function () {
            return document.body.classList.contains("dark-mode")
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTApp.init()
})), window.addEventListener("load", (function () {
    KTApp.initPageLoader()
})), "undefined" != typeof module && void 0 !== module.exports && (module.exports = KTApp);
var KTLayoutAside = function () {
    var e, t;
    return {
        init: function () {
            t = document.querySelector("#kt_aside"), e = document.querySelector("#kt_aside_toggle"), t && e && KTToggle.getInstance(e).on("kt.toggle.change", (function () {
                t.classList.add("animating"), setTimeout((function () {
                    t.classList.remove("animating")
                }), 300)
            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTLayoutAside.init()
}));
var KTLayoutExplore = {
    init: function () {
        document.querySelector("#kt_explore")
    }
};
KTUtil.onDOMContentLoaded((function () {
    KTLayoutExplore.init()
}));
var KTLayoutSearch = function () {
    var e, t, n, i, r, o, a, l, s, u, d, c, m, f = function (e) {
            setTimeout((function () {
                var i = KTUtil.getRandomInt(1, 3);
                t.classList.add("d-none"), 3 === i ? (n.classList.add("d-none"), r.classList.remove("d-none")) : (n.classList.remove("d-none"), r.classList.add("d-none")), e.complete()
            }), 1500)
        },
        p = function (e) {
            t.classList.remove("d-none"), n.classList.add("d-none"), r.classList.add("d-none")
        };
    return {
        init: function () {
            (e = document.querySelector("#kt_header_search")) && (i = e.querySelector('[data-kt-search-element="wrapper"]'), e.querySelector('[data-kt-search-element="form"]'), t = e.querySelector('[data-kt-search-element="main"]'), n = e.querySelector('[data-kt-search-element="results"]'), r = e.querySelector('[data-kt-search-element="empty"]'), o = e.querySelector('[data-kt-search-element="preferences"]'), a = e.querySelector('[data-kt-search-element="preferences-show"]'), l = e.querySelector('[data-kt-search-element="preferences-dismiss"]'), s = e.querySelector('[data-kt-search-element="advanced-options-form"]'), u = e.querySelector('[data-kt-search-element="advanced-options-form-show"]'), d = e.querySelector('[data-kt-search-element="advanced-options-form-cancel"]'), c = e.querySelector('[data-kt-search-element="advanced-options-form-search"]'), (m = new KTSearch(e)).on("kt.search.process", f), m.on("kt.search.clear", p), a.addEventListener("click", (function () {
                i.classList.add("d-none"), o.classList.remove("d-none")
            })), l.addEventListener("click", (function () {
                i.classList.remove("d-none"), o.classList.add("d-none")
            })), u.addEventListener("click", (function () {
                i.classList.add("d-none"), s.classList.remove("d-none")
            })), d.addEventListener("click", (function () {
                i.classList.remove("d-none"), s.classList.add("d-none")
            })), c.addEventListener("click", (function () {})))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTLayoutSearch.init()
}));
var KTLayoutToolbar = {
    init: function () {
        document.querySelector("#kt_toolbar") && function () {
            var e = document.querySelector("#kt_toolbar_slider"),
                t = document.querySelector("#kt_toolbar_slider_value");
            if (e) {
                noUiSlider.create(e, {
                    start: [5],
                    connect: [!0, !1],
                    step: 1,
                    format: wNumb({
                        decimals: 1
                    }),
                    range: {
                        min: [1],
                        max: [10]
                    }
                }), e.noUiSlider.on("update", (function (e, n) {
                    t.innerHTML = e[n]
                }));
                var n = e.querySelector(".noUi-handle");
                n.setAttribute("tabindex", 0), n.addEventListener("click", (function () {
                    this.focus()
                })), n.addEventListener("keydown", (function (t) {
                    var n = Number(e.noUiSlider.get());
                    switch (t.which) {
                        case 37:
                            e.noUiSlider.set(n - 1);
                            break;
                        case 39:
                            e.noUiSlider.set(n + 1)
                    }
                }))
            }
        }()
    }
};
KTUtil.onDOMContentLoaded((function () {
    KTLayoutToolbar.init()
}));


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a,b){function c(){return new Date(Date.UTC.apply(Date,arguments))}function d(){var a=new Date;return c(a.getFullYear(),a.getMonth(),a.getDate())}function e(a,b){return a.getUTCFullYear()===b.getUTCFullYear()&&a.getUTCMonth()===b.getUTCMonth()&&a.getUTCDate()===b.getUTCDate()}function f(c,d){return function(){return d!==b&&a.fn.datepicker.deprecated(d),this[c].apply(this,arguments)}}function g(a){return a&&!isNaN(a.getTime())}function h(b,c){function d(a,b){return b.toLowerCase()}var e,f=a(b).data(),g={},h=new RegExp("^"+c.toLowerCase()+"([A-Z])");c=new RegExp("^"+c.toLowerCase());for(var i in f)c.test(i)&&(e=i.replace(h,d),g[e]=f[i]);return g}function i(b){var c={};if(q[b]||(b=b.split("-")[0],q[b])){var d=q[b];return a.each(p,function(a,b){b in d&&(c[b]=d[b])}),c}}var j=function(){var b={get:function(a){return this.slice(a)[0]},contains:function(a){for(var b=a&&a.valueOf(),c=0,d=this.length;c<d;c++)if(0<=this[c].valueOf()-b&&this[c].valueOf()-b<864e5)return c;return-1},remove:function(a){this.splice(a,1)},replace:function(b){b&&(a.isArray(b)||(b=[b]),this.clear(),this.push.apply(this,b))},clear:function(){this.length=0},copy:function(){var a=new j;return a.replace(this),a}};return function(){var c=[];return c.push.apply(c,arguments),a.extend(c,b),c}}(),k=function(b,c){a.data(b,"datepicker",this),this._events=[],this._secondaryEvents=[],this._process_options(c),this.dates=new j,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=a(b),this.isInput=this.element.is("input"),this.inputField=this.isInput?this.element:this.element.find("input"),this.component=!!this.element.hasClass("date")&&this.element.find(".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn"),this.component&&0===this.component.length&&(this.component=!1),this.isInline=!this.component&&this.element.is("div"),this.picker=a(r.template),this._check_template(this.o.templates.leftArrow)&&this.picker.find(".prev").html(this.o.templates.leftArrow),this._check_template(this.o.templates.rightArrow)&&this.picker.find(".next").html(this.o.templates.rightArrow),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.o.calendarWeeks&&this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan",function(a,b){return Number(b)+1}),this._process_options({startDate:this._o.startDate,endDate:this._o.endDate,daysOfWeekDisabled:this.o.daysOfWeekDisabled,daysOfWeekHighlighted:this.o.daysOfWeekHighlighted,datesDisabled:this.o.datesDisabled}),this._allow_update=!1,this.setViewMode(this.o.startView),this._allow_update=!0,this.fillDow(),this.fillMonths(),this.update(),this.isInline&&this.show()};k.prototype={constructor:k,_resolveViewName:function(b){return a.each(r.viewModes,function(c,d){if(b===c||-1!==a.inArray(b,d.names))return b=c,!1}),b},_resolveDaysOfWeek:function(b){return a.isArray(b)||(b=b.split(/[,\s]*/)),a.map(b,Number)},_check_template:function(c){try{if(c===b||""===c)return!1;if((c.match(/[<>]/g)||[]).length<=0)return!0;return a(c).length>0}catch(a){return!1}},_process_options:function(b){this._o=a.extend({},this._o,b);var e=this.o=a.extend({},this._o),f=e.language;q[f]||(f=f.split("-")[0],q[f]||(f=o.language)),e.language=f,e.startView=this._resolveViewName(e.startView),e.minViewMode=this._resolveViewName(e.minViewMode),e.maxViewMode=this._resolveViewName(e.maxViewMode),e.startView=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,e.startView)),!0!==e.multidate&&(e.multidate=Number(e.multidate)||!1,!1!==e.multidate&&(e.multidate=Math.max(0,e.multidate))),e.multidateSeparator=String(e.multidateSeparator),e.weekStart%=7,e.weekEnd=(e.weekStart+6)%7;var g=r.parseFormat(e.format);e.startDate!==-1/0&&(e.startDate?e.startDate instanceof Date?e.startDate=this._local_to_utc(this._zero_time(e.startDate)):e.startDate=r.parseDate(e.startDate,g,e.language,e.assumeNearbyYear):e.startDate=-1/0),e.endDate!==1/0&&(e.endDate?e.endDate instanceof Date?e.endDate=this._local_to_utc(this._zero_time(e.endDate)):e.endDate=r.parseDate(e.endDate,g,e.language,e.assumeNearbyYear):e.endDate=1/0),e.daysOfWeekDisabled=this._resolveDaysOfWeek(e.daysOfWeekDisabled||[]),e.daysOfWeekHighlighted=this._resolveDaysOfWeek(e.daysOfWeekHighlighted||[]),e.datesDisabled=e.datesDisabled||[],a.isArray(e.datesDisabled)||(e.datesDisabled=e.datesDisabled.split(",")),e.datesDisabled=a.map(e.datesDisabled,function(a){return r.parseDate(a,g,e.language,e.assumeNearbyYear)});var h=String(e.orientation).toLowerCase().split(/\s+/g),i=e.orientation.toLowerCase();if(h=a.grep(h,function(a){return/^auto|left|right|top|bottom$/.test(a)}),e.orientation={x:"auto",y:"auto"},i&&"auto"!==i)if(1===h.length)switch(h[0]){case"top":case"bottom":e.orientation.y=h[0];break;case"left":case"right":e.orientation.x=h[0]}else i=a.grep(h,function(a){return/^left|right$/.test(a)}),e.orientation.x=i[0]||"auto",i=a.grep(h,function(a){return/^top|bottom$/.test(a)}),e.orientation.y=i[0]||"auto";else;if(e.defaultViewDate instanceof Date||"string"==typeof e.defaultViewDate)e.defaultViewDate=r.parseDate(e.defaultViewDate,g,e.language,e.assumeNearbyYear);else if(e.defaultViewDate){var j=e.defaultViewDate.year||(new Date).getFullYear(),k=e.defaultViewDate.month||0,l=e.defaultViewDate.day||1;e.defaultViewDate=c(j,k,l)}else e.defaultViewDate=d()},_applyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(d=b,e=a[f][1]):3===a[f].length&&(d=a[f][1],e=a[f][2]),c.on(e,d)},_unapplyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(e=b,d=a[f][1]):3===a[f].length&&(e=a[f][1],d=a[f][2]),c.off(d,e)},_buildEvents:function(){var b={keyup:a.proxy(function(b){-1===a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:a.proxy(this.keydown,this),paste:a.proxy(this.paste,this)};!0===this.o.showOnFocus&&(b.focus=a.proxy(this.show,this)),this.isInput?this._events=[[this.element,b]]:this.component&&this.inputField.length?this._events=[[this.inputField,b],[this.component,{click:a.proxy(this.show,this)}]]:this._events=[[this.element,{click:a.proxy(this.show,this),keydown:a.proxy(this.keydown,this)}]],this._events.push([this.element,"*",{blur:a.proxy(function(a){this._focused_from=a.target},this)}],[this.element,{blur:a.proxy(function(a){this._focused_from=a.target},this)}]),this.o.immediateUpdates&&this._events.push([this.element,{"changeYear changeMonth":a.proxy(function(a){this.update(a.date)},this)}]),this._secondaryEvents=[[this.picker,{click:a.proxy(this.click,this)}],[this.picker,".prev, .next",{click:a.proxy(this.navArrowsClick,this)}],[this.picker,".day:not(.disabled)",{click:a.proxy(this.dayCellClick,this)}],[a(window),{resize:a.proxy(this.place,this)}],[a(document),{"mousedown touchstart":a.proxy(function(a){this.element.is(a.target)||this.element.find(a.target).length||this.picker.is(a.target)||this.picker.find(a.target).length||this.isInline||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(b,c){var d=c||this.dates.get(-1),e=this._utc_to_local(d);this.element.trigger({type:b,date:e,viewMode:this.viewMode,dates:a.map(this.dates,this._utc_to_local),format:a.proxy(function(a,b){0===arguments.length?(a=this.dates.length-1,b=this.o.format):"string"==typeof a&&(b=a,a=this.dates.length-1),b=b||this.o.format;var c=this.dates.get(a);return r.formatDate(c,b,this.o.language)},this)})},show:function(){if(!(this.inputField.is(":disabled")||this.inputField.prop("readonly")&&!1===this.o.enableOnReadonly))return this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&a(this.element).blur(),this},hide:function(){return this.isInline||!this.picker.is(":visible")?this:(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.setViewMode(this.o.startView),this.o.forceParse&&this.inputField.val()&&this.setValue(),this._trigger("hide"),this)},destroy:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},paste:function(b){var c;if(b.originalEvent.clipboardData&&b.originalEvent.clipboardData.types&&-1!==a.inArray("text/plain",b.originalEvent.clipboardData.types))c=b.originalEvent.clipboardData.getData("text/plain");else{if(!window.clipboardData)return;c=window.clipboardData.getData("Text")}this.setDate(c),this.update(),b.preventDefault()},_utc_to_local:function(a){if(!a)return a;var b=new Date(a.getTime()+6e4*a.getTimezoneOffset());return b.getTimezoneOffset()!==a.getTimezoneOffset()&&(b=new Date(a.getTime()+6e4*b.getTimezoneOffset())),b},_local_to_utc:function(a){return a&&new Date(a.getTime()-6e4*a.getTimezoneOffset())},_zero_time:function(a){return a&&new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return a&&c(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate())},getDates:function(){return a.map(this.dates,this._utc_to_local)},getUTCDates:function(){return a.map(this.dates,function(a){return new Date(a)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var a=this.dates.get(-1);return a!==b?new Date(a):null},clearDates:function(){this.inputField.val(""),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,b),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.setDates.apply(this,a.map(b,this._utc_to_local)),this},setDate:f("setDates"),setUTCDate:f("setUTCDates"),remove:f("destroy","Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),setValue:function(){var a=this.getFormattedDate();return this.inputField.val(a),this},getFormattedDate:function(c){c===b&&(c=this.o.format);var d=this.o.language;return a.map(this.dates,function(a){return r.formatDate(a,c,d)}).join(this.o.multidateSeparator)},getStartDate:function(){return this.o.startDate},setStartDate:function(a){return this._process_options({startDate:a}),this.update(),this.updateNavArrows(),this},getEndDate:function(){return this.o.endDate},setEndDate:function(a){return this._process_options({endDate:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(a){return this._process_options({daysOfWeekDisabled:a}),this.update(),this},setDaysOfWeekHighlighted:function(a){return this._process_options({daysOfWeekHighlighted:a}),this.update(),this},setDatesDisabled:function(a){return this._process_options({datesDisabled:a}),this.update(),this},place:function(){if(this.isInline)return this;var b=this.picker.outerWidth(),c=this.picker.outerHeight(),d=a(this.o.container),e=d.width(),f="body"===this.o.container?a(document).scrollTop():d.scrollTop(),g=d.offset(),h=[0];this.element.parents().each(function(){var b=a(this).css("z-index");"auto"!==b&&0!==Number(b)&&h.push(Number(b))});var i=Math.max.apply(Math,h)+this.o.zIndexOffset,j=this.component?this.component.parent().offset():this.element.offset(),k=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),l=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),m=j.left-g.left,n=j.top-g.top;"body"!==this.o.container&&(n+=f),this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(m-=b-l)):j.left<0?(this.picker.addClass("datepicker-orient-left"),m-=j.left-10):m+b>e?(this.picker.addClass("datepicker-orient-right"),m+=l-b):this.o.rtl?this.picker.addClass("datepicker-orient-right"):this.picker.addClass("datepicker-orient-left");var o,p=this.o.orientation.y;if("auto"===p&&(o=-f+n-c,p=o<0?"bottom":"top"),this.picker.addClass("datepicker-orient-"+p),"top"===p?n-=c+parseInt(this.picker.css("padding-top")):n+=k,this.o.rtl){var q=e-(m+l);this.picker.css({top:n,right:q,zIndex:i})}else this.picker.css({top:n,left:m,zIndex:i});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var b=this.dates.copy(),c=[],d=!1;return arguments.length?(a.each(arguments,a.proxy(function(a,b){b instanceof Date&&(b=this._local_to_utc(b)),c.push(b)},this)),d=!0):(c=this.isInput?this.element.val():this.element.data("date")||this.inputField.val(),c=c&&this.o.multidate?c.split(this.o.multidateSeparator):[c],delete this.element.data().date),c=a.map(c,a.proxy(function(a){return r.parseDate(a,this.o.format,this.o.language,this.o.assumeNearbyYear)},this)),c=a.grep(c,a.proxy(function(a){return!this.dateWithinRange(a)||!a},this),!0),this.dates.replace(c),this.o.updateViewDate&&(this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate?this.viewDate=new Date(this.o.endDate):this.viewDate=this.o.defaultViewDate),d?(this.setValue(),this.element.change()):this.dates.length&&String(b)!==String(this.dates)&&d&&(this._trigger("changeDate"),this.element.change()),!this.dates.length&&b.length&&(this._trigger("clearDate"),this.element.change()),this.fill(),this},fillDow:function(){if(this.o.showWeekDays){var b=this.o.weekStart,c="<tr>";for(this.o.calendarWeeks&&(c+='<th class="cw">&#160;</th>');b<this.o.weekStart+7;)c+='<th class="dow',-1!==a.inArray(b,this.o.daysOfWeekDisabled)&&(c+=" disabled"),c+='">'+q[this.o.language].daysMin[b++%7]+"</th>";c+="</tr>",this.picker.find(".datepicker-days thead").append(c)}},fillMonths:function(){for(var a,b=this._utc_to_local(this.viewDate),c="",d=0;d<12;d++)a=b&&b.getMonth()===d?" focused":"",c+='<span class="month'+a+'">'+q[this.o.language].monthsShort[d]+"</span>";this.picker.find(".datepicker-months td").html(c)},setRange:function(b){b&&b.length?this.range=a.map(b,function(a){return a.valueOf()}):delete this.range,this.fill()},getClassNames:function(b){var c=[],f=this.viewDate.getUTCFullYear(),g=this.viewDate.getUTCMonth(),h=d();return b.getUTCFullYear()<f||b.getUTCFullYear()===f&&b.getUTCMonth()<g?c.push("old"):(b.getUTCFullYear()>f||b.getUTCFullYear()===f&&b.getUTCMonth()>g)&&c.push("new"),this.focusDate&&b.valueOf()===this.focusDate.valueOf()&&c.push("focused"),this.o.todayHighlight&&e(b,h)&&c.push("today"),-1!==this.dates.contains(b)&&c.push("active"),this.dateWithinRange(b)||c.push("disabled"),this.dateIsDisabled(b)&&c.push("disabled","disabled-date"),-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekHighlighted)&&c.push("highlighted"),this.range&&(b>this.range[0]&&b<this.range[this.range.length-1]&&c.push("range"),-1!==a.inArray(b.valueOf(),this.range)&&c.push("selected"),b.valueOf()===this.range[0]&&c.push("range-start"),b.valueOf()===this.range[this.range.length-1]&&c.push("range-end")),c},_fill_yearsView:function(c,d,e,f,g,h,i){for(var j,k,l,m="",n=e/10,o=this.picker.find(c),p=Math.floor(f/e)*e,q=p+9*n,r=Math.floor(this.viewDate.getFullYear()/n)*n,s=a.map(this.dates,function(a){return Math.floor(a.getUTCFullYear()/n)*n}),t=p-n;t<=q+n;t+=n)j=[d],k=null,t===p-n?j.push("old"):t===q+n&&j.push("new"),-1!==a.inArray(t,s)&&j.push("active"),(t<g||t>h)&&j.push("disabled"),t===r&&j.push("focused"),i!==a.noop&&(l=i(new Date(t,0,1)),l===b?l={}:"boolean"==typeof l?l={enabled:l}:"string"==typeof l&&(l={classes:l}),!1===l.enabled&&j.push("disabled"),l.classes&&(j=j.concat(l.classes.split(/\s+/))),l.tooltip&&(k=l.tooltip)),m+='<span class="'+j.join(" ")+'"'+(k?' title="'+k+'"':"")+">"+t+"</span>";o.find(".datepicker-switch").text(p+"-"+q),o.find("td").html(m)},fill:function(){var e,f,g=new Date(this.viewDate),h=g.getUTCFullYear(),i=g.getUTCMonth(),j=this.o.startDate!==-1/0?this.o.startDate.getUTCFullYear():-1/0,k=this.o.startDate!==-1/0?this.o.startDate.getUTCMonth():-1/0,l=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,m=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,n=q[this.o.language].today||q.en.today||"",o=q[this.o.language].clear||q.en.clear||"",p=q[this.o.language].titleFormat||q.en.titleFormat,s=d(),t=(!0===this.o.todayBtn||"linked"===this.o.todayBtn)&&s>=this.o.startDate&&s<=this.o.endDate&&!this.weekOfDateIsDisabled(s);if(!isNaN(h)&&!isNaN(i)){this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(g,p,this.o.language)),this.picker.find("tfoot .today").text(n).css("display",t?"table-cell":"none"),this.picker.find("tfoot .clear").text(o).css("display",!0===this.o.clearBtn?"table-cell":"none"),this.picker.find("thead .datepicker-title").text(this.o.title).css("display","string"==typeof this.o.title&&""!==this.o.title?"table-cell":"none"),this.updateNavArrows(),this.fillMonths();var u=c(h,i,0),v=u.getUTCDate();u.setUTCDate(v-(u.getUTCDay()-this.o.weekStart+7)%7);var w=new Date(u);u.getUTCFullYear()<100&&w.setUTCFullYear(u.getUTCFullYear()),w.setUTCDate(w.getUTCDate()+42),w=w.valueOf();for(var x,y,z=[];u.valueOf()<w;){if((x=u.getUTCDay())===this.o.weekStart&&(z.push("<tr>"),this.o.calendarWeeks)){var A=new Date(+u+(this.o.weekStart-x-7)%7*864e5),B=new Date(Number(A)+(11-A.getUTCDay())%7*864e5),C=new Date(Number(C=c(B.getUTCFullYear(),0,1))+(11-C.getUTCDay())%7*864e5),D=(B-C)/864e5/7+1;z.push('<td class="cw">'+D+"</td>")}y=this.getClassNames(u),y.push("day");var E=u.getUTCDate();this.o.beforeShowDay!==a.noop&&(f=this.o.beforeShowDay(this._utc_to_local(u)),f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),!1===f.enabled&&y.push("disabled"),f.classes&&(y=y.concat(f.classes.split(/\s+/))),f.tooltip&&(e=f.tooltip),f.content&&(E=f.content)),y=a.isFunction(a.uniqueSort)?a.uniqueSort(y):a.unique(y),z.push('<td class="'+y.join(" ")+'"'+(e?' title="'+e+'"':"")+' data-date="'+u.getTime().toString()+'">'+E+"</td>"),e=null,x===this.o.weekEnd&&z.push("</tr>"),u.setUTCDate(u.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").html(z.join(""));var F=q[this.o.language].monthsTitle||q.en.monthsTitle||"Months",G=this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode<2?F:h).end().find("tbody span").removeClass("active");if(a.each(this.dates,function(a,b){b.getUTCFullYear()===h&&G.eq(b.getUTCMonth()).addClass("active")}),(h<j||h>l)&&G.addClass("disabled"),h===j&&G.slice(0,k).addClass("disabled"),h===l&&G.slice(m+1).addClass("disabled"),this.o.beforeShowMonth!==a.noop){var H=this;a.each(G,function(c,d){var e=new Date(h,c,1),f=H.o.beforeShowMonth(e);f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),!1!==f.enabled||a(d).hasClass("disabled")||a(d).addClass("disabled"),f.classes&&a(d).addClass(f.classes),f.tooltip&&a(d).prop("title",f.tooltip)})}this._fill_yearsView(".datepicker-years","year",10,h,j,l,this.o.beforeShowYear),this._fill_yearsView(".datepicker-decades","decade",100,h,j,l,this.o.beforeShowDecade),this._fill_yearsView(".datepicker-centuries","century",1e3,h,j,l,this.o.beforeShowCentury)}},updateNavArrows:function(){if(this._allow_update){var a,b,c=new Date(this.viewDate),d=c.getUTCFullYear(),e=c.getUTCMonth(),f=this.o.startDate!==-1/0?this.o.startDate.getUTCFullYear():-1/0,g=this.o.startDate!==-1/0?this.o.startDate.getUTCMonth():-1/0,h=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,i=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,j=1;switch(this.viewMode){case 4:j*=10;case 3:j*=10;case 2:j*=10;case 1:a=Math.floor(d/j)*j<=f,b=Math.floor(d/j)*j+j>h;break;case 0:a=d<=f&&e<=g,b=d>=h&&e>=i}this.picker.find(".prev").toggleClass("disabled",a),this.picker.find(".next").toggleClass("disabled",b)}},click:function(b){b.preventDefault(),b.stopPropagation();var e,f,g,h;e=a(b.target),e.hasClass("datepicker-switch")&&this.viewMode!==this.o.maxViewMode&&this.setViewMode(this.viewMode+1),e.hasClass("today")&&!e.hasClass("day")&&(this.setViewMode(0),this._setDate(d(),"linked"===this.o.todayBtn?null:"view")),e.hasClass("clear")&&this.clearDates(),e.hasClass("disabled")||(e.hasClass("month")||e.hasClass("year")||e.hasClass("decade")||e.hasClass("century"))&&(this.viewDate.setUTCDate(1),f=1,1===this.viewMode?(h=e.parent().find("span").index(e),g=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(h)):(h=0,g=Number(e.text()),this.viewDate.setUTCFullYear(g)),this._trigger(r.viewModes[this.viewMode-1].e,this.viewDate),this.viewMode===this.o.minViewMode?this._setDate(c(g,h,f)):(this.setViewMode(this.viewMode-1),this.fill())),this.picker.is(":visible")&&this._focused_from&&this._focused_from.focus(),delete this._focused_from},dayCellClick:function(b){var c=a(b.currentTarget),d=c.data("date"),e=new Date(d);this.o.updateViewDate&&(e.getUTCFullYear()!==this.viewDate.getUTCFullYear()&&this._trigger("changeYear",this.viewDate),e.getUTCMonth()!==this.viewDate.getUTCMonth()&&this._trigger("changeMonth",this.viewDate)),this._setDate(e)},navArrowsClick:function(b){var c=a(b.currentTarget),d=c.hasClass("prev")?-1:1;0!==this.viewMode&&(d*=12*r.viewModes[this.viewMode].navStep),this.viewDate=this.moveMonth(this.viewDate,d),this._trigger(r.viewModes[this.viewMode].e,this.viewDate),this.fill()},_toggle_multidate:function(a){var b=this.dates.contains(a);if(a||this.dates.clear(),-1!==b?(!0===this.o.multidate||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(b):!1===this.o.multidate?(this.dates.clear(),this.dates.push(a)):this.dates.push(a),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(a,b){b&&"date"!==b||this._toggle_multidate(a&&new Date(a)),(!b&&this.o.updateViewDate||"view"===b)&&(this.viewDate=a&&new Date(a)),this.fill(),this.setValue(),b&&"view"===b||this._trigger("changeDate"),this.inputField.trigger("change"),!this.o.autoclose||b&&"date"!==b||this.hide()},moveDay:function(a,b){var c=new Date(a);return c.setUTCDate(a.getUTCDate()+b),c},moveWeek:function(a,b){return this.moveDay(a,7*b)},moveMonth:function(a,b){if(!g(a))return this.o.defaultViewDate;if(!b)return a;var c,d,e=new Date(a.valueOf()),f=e.getUTCDate(),h=e.getUTCMonth(),i=Math.abs(b);if(b=b>0?1:-1,1===i)d=-1===b?function(){return e.getUTCMonth()===h}:function(){return e.getUTCMonth()!==c},c=h+b,e.setUTCMonth(c),c=(c+12)%12;else{for(var j=0;j<i;j++)e=this.moveMonth(e,b);c=e.getUTCMonth(),e.setUTCDate(f),d=function(){return c!==e.getUTCMonth()}}for(;d();)e.setUTCDate(--f),e.setUTCMonth(c);return e},moveYear:function(a,b){return this.moveMonth(a,12*b)},moveAvailableDate:function(a,b,c){do{if(a=this[c](a,b),!this.dateWithinRange(a))return!1;c="moveDay"}while(this.dateIsDisabled(a));return a},weekOfDateIsDisabled:function(b){return-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekDisabled)},dateIsDisabled:function(b){return this.weekOfDateIsDisabled(b)||a.grep(this.o.datesDisabled,function(a){return e(b,a)}).length>0},dateWithinRange:function(a){return a>=this.o.startDate&&a<=this.o.endDate},keydown:function(a){if(!this.picker.is(":visible"))return void(40!==a.keyCode&&27!==a.keyCode||(this.show(),a.stopPropagation()));var b,c,d=!1,e=this.focusDate||this.viewDate;switch(a.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),a.preventDefault(),a.stopPropagation();break;case 37:case 38:case 39:case 40:if(!this.o.keyboardNavigation||7===this.o.daysOfWeekDisabled.length)break;b=37===a.keyCode||38===a.keyCode?-1:1,0===this.viewMode?a.ctrlKey?(c=this.moveAvailableDate(e,b,"moveYear"))&&this._trigger("changeYear",this.viewDate):a.shiftKey?(c=this.moveAvailableDate(e,b,"moveMonth"))&&this._trigger("changeMonth",this.viewDate):37===a.keyCode||39===a.keyCode?c=this.moveAvailableDate(e,b,"moveDay"):this.weekOfDateIsDisabled(e)||(c=this.moveAvailableDate(e,b,"moveWeek")):1===this.viewMode?(38!==a.keyCode&&40!==a.keyCode||(b*=4),c=this.moveAvailableDate(e,b,"moveMonth")):2===this.viewMode&&(38!==a.keyCode&&40!==a.keyCode||(b*=4),c=this.moveAvailableDate(e,b,"moveYear")),c&&(this.focusDate=this.viewDate=c,this.setValue(),this.fill(),a.preventDefault());break;case 13:if(!this.o.forceParse)break;e=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(e),d=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(a.preventDefault(),a.stopPropagation(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}d&&(this.dates.length?this._trigger("changeDate"):this._trigger("clearDate"),this.inputField.trigger("change"))},setViewMode:function(a){this.viewMode=a,this.picker.children("div").hide().filter(".datepicker-"+r.viewModes[this.viewMode].clsName).show(),this.updateNavArrows(),this._trigger("changeViewMode",new Date(this.viewDate))}};var l=function(b,c){a.data(b,"datepicker",this),this.element=a(b),this.inputs=a.map(c.inputs,function(a){return a.jquery?a[0]:a}),delete c.inputs,this.keepEmptyValues=c.keepEmptyValues,delete c.keepEmptyValues,n.call(a(this.inputs),c).on("changeDate",a.proxy(this.dateUpdated,this)),this.pickers=a.map(this.inputs,function(b){return a.data(b,"datepicker")}),this.updateDates()};l.prototype={updateDates:function(){this.dates=a.map(this.pickers,function(a){return a.getUTCDate()}),this.updateRanges()},updateRanges:function(){var b=a.map(this.dates,function(a){return a.valueOf()});a.each(this.pickers,function(a,c){c.setRange(b)})},clearDates:function(){a.each(this.pickers,function(a,b){b.clearDates()})},dateUpdated:function(c){if(!this.updating){this.updating=!0;var d=a.data(c.target,"datepicker");if(d!==b){var e=d.getUTCDate(),f=this.keepEmptyValues,g=a.inArray(c.target,this.inputs),h=g-1,i=g+1,j=this.inputs.length;if(-1!==g){if(a.each(this.pickers,function(a,b){b.getUTCDate()||b!==d&&f||b.setUTCDate(e)}),e<this.dates[h])for(;h>=0&&e<this.dates[h];)this.pickers[h--].setUTCDate(e);else if(e>this.dates[i])for(;i<j&&e>this.dates[i];)this.pickers[i++].setUTCDate(e);this.updateDates(),delete this.updating}}}},destroy:function(){a.map(this.pickers,function(a){a.destroy()}),a(this.inputs).off("changeDate",this.dateUpdated),delete this.element.data().datepicker},remove:f("destroy","Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")};var m=a.fn.datepicker,n=function(c){var d=Array.apply(null,arguments);d.shift();var e;if(this.each(function(){var b=a(this),f=b.data("datepicker"),g="object"==typeof c&&c;if(!f){var j=h(this,"date"),m=a.extend({},o,j,g),n=i(m.language),p=a.extend({},o,n,j,g);b.hasClass("input-daterange")||p.inputs?(a.extend(p,{inputs:p.inputs||b.find("input").toArray()}),f=new l(this,p)):f=new k(this,p),b.data("datepicker",f)}"string"==typeof c&&"function"==typeof f[c]&&(e=f[c].apply(f,d))}),e===b||e instanceof k||e instanceof l)return this;if(this.length>1)throw new Error("Using only allowed for the collection of a single element ("+c+" function)");return e};a.fn.datepicker=n;var o=a.fn.datepicker.defaults={assumeNearbyYear:!1,autoclose:!1,beforeShowDay:a.noop,beforeShowMonth:a.noop,beforeShowYear:a.noop,beforeShowDecade:a.noop,beforeShowCentury:a.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keepEmptyValues:!1,keyboardNavigation:!0,language:"en",minViewMode:0,maxViewMode:4,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-1/0,startView:0,todayBtn:!1,todayHighlight:!1,updateViewDate:!0,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,showOnFocus:!0,zIndexOffset:10,container:"body",immediateUpdates:!1,title:"",templates:{leftArrow:"&#x00AB;",rightArrow:"&#x00BB;"},showWeekDays:!0},p=a.fn.datepicker.locale_opts=["format","rtl","weekStart"];a.fn.datepicker.Constructor=k;var q=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM yyyy"}},r={viewModes:[{names:["days","month"],clsName:"days",e:"changeMonth"},{names:["months","year"],clsName:"months",e:"changeYear",navStep:1},{names:["years","decade"],clsName:"years",e:"changeDecade",navStep:10},{names:["decades","century"],clsName:"decades",e:"changeCentury",navStep:100},{names:["centuries","millennium"],clsName:"centuries",e:"changeMillennium",navStep:1e3}],validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,parseFormat:function(a){if("function"==typeof a.toValue&&"function"==typeof a.toDisplay)return a;var b=a.replace(this.validParts,"\0").split("\0"),c=a.match(this.validParts);if(!b||!b.length||!c||0===c.length)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(c,e,f,g){function h(a,b){return!0===b&&(b=10),a<100&&(a+=2e3)>(new Date).getFullYear()+b&&(a-=100),a}function i(){var a=this.slice(0,j[n].length),b=j[n].slice(0,a.length);return a.toLowerCase()===b.toLowerCase()}if(!c)return b;if(c instanceof Date)return c;if("string"==typeof e&&(e=r.parseFormat(e)),e.toValue)return e.toValue(c,e,f);var j,l,m,n,o,p={d:"moveDay",m:"moveMonth",w:"moveWeek",y:"moveYear"},s={yesterday:"-1d",today:"+0d",tomorrow:"+1d"};if(c in s&&(c=s[c]),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(c)){for(j=c.match(/([\-+]\d+)([dmwy])/gi),c=new Date,n=0;n<j.length;n++)l=j[n].match(/([\-+]\d+)([dmwy])/i),m=Number(l[1]),o=p[l[2].toLowerCase()],c=k.prototype[o](c,m);return k.prototype._zero_utc_time(c)}j=c&&c.match(this.nonpunctuation)||[];var t,u,v={},w=["yyyy","yy","M","MM","m","mm","d","dd"],x={yyyy:function(a,b){return a.setUTCFullYear(g?h(b,g):b)},m:function(a,b){if(isNaN(a))return a;for(b-=1;b<0;)b+=12;for(b%=12,a.setUTCMonth(b);a.getUTCMonth()!==b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};x.yy=x.yyyy,x.M=x.MM=x.mm=x.m,x.dd=x.d,c=d();var y=e.parts.slice();if(j.length!==y.length&&(y=a(y).filter(function(b,c){return-1!==a.inArray(c,w)}).toArray()),j.length===y.length){var z;for(n=0,z=y.length;n<z;n++){if(t=parseInt(j[n],10),l=y[n],isNaN(t))switch(l){case"MM":u=a(q[f].months).filter(i),t=a.inArray(u[0],q[f].months)+1;break;case"M":u=a(q[f].monthsShort).filter(i),t=a.inArray(u[0],q[f].monthsShort)+1}v[l]=t}var A,B;for(n=0;n<w.length;n++)(B=w[n])in v&&!isNaN(v[B])&&(A=new Date(c),x[B](A,v[B]),isNaN(A)||(c=A))}return c},formatDate:function(b,c,d){if(!b)return"";if("string"==typeof c&&(c=r.parseFormat(c)),c.toDisplay)return c.toDisplay(b,c,d);var e={d:b.getUTCDate(),D:q[d].daysShort[b.getUTCDay()],DD:q[d].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:q[d].monthsShort[b.getUTCMonth()],MM:q[d].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m,b=[];for(var f=a.extend([],c.separators),g=0,h=c.parts.length;g<=h;g++)f.length&&b.push(f.shift()),b.push(e[c.parts[g]]);return b.join("")},
headTemplate:'<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">'+o.templates.leftArrow+'</th><th colspan="5" class="datepicker-switch"></th><th class="next">'+o.templates.rightArrow+"</th></tr></thead>",contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};r.template='<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">'+r.headTemplate+"<tbody></tbody>"+r.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-decades"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-centuries"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+"</table></div></div>",a.fn.datepicker.DPGlobal=r,a.fn.datepicker.noConflict=function(){return a.fn.datepicker=m,this},a.fn.datepicker.version="1.9.0",a.fn.datepicker.deprecated=function(a){var b=window.console;b&&b.warn&&b.warn("DEPRECATED: "+a)},a(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(b){var c=a(this);c.data("datepicker")||(b.preventDefault(),n.call(c,"show"))}),a(function(){n.call(a('[data-provide="datepicker-inline"]'))})});
"use strict";
$.fn.datepicker.defaults.zIndexOffset = 10;
