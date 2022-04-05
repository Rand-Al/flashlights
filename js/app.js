(() => {
  "use strict";
  function t(t) {
    this.type = t;
  }
  (t.prototype.init = function () {
    const t = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let t = 0; t < this.nodes.length; t++) {
      const e = this.nodes[t],
        a = e.dataset.da.trim().split(","),
        o = {};
      (o.element = e),
        (o.parent = e.parentNode),
        (o.destination = document.querySelector(a[0].trim())),
        (o.breakpoint = a[1] ? a[1].trim() : "767"),
        (o.place = a[2] ? a[2].trim() : "last"),
        (o.index = this.indexInParent(o.parent, o.element)),
        this.оbjects.push(o);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (t) {
          return (
            "(" + this.type + "-width: " + t.breakpoint + "px)," + t.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (t, e, a) {
          return Array.prototype.indexOf.call(a, t) === e;
        }
      ));
    for (let e = 0; e < this.mediaQueries.length; e++) {
      const a = this.mediaQueries[e],
        o = String.prototype.split.call(a, ","),
        n = window.matchMedia(o[0]),
        r = o[1],
        s = Array.prototype.filter.call(this.оbjects, function (t) {
          return t.breakpoint === r;
        });
      n.addListener(function () {
        t.mediaHandler(n, s);
      }),
        this.mediaHandler(n, s);
    }
  }),
    (t.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const a = e[t];
          (a.index = this.indexInParent(a.parent, a.element)),
            this.moveTo(a.place, a.element, a.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const a = e[t];
          a.element.classList.contains(this.daClassname) &&
            this.moveBack(a.parent, a.element, a.index);
        }
    }),
    (t.prototype.moveTo = function (t, e, a) {
      e.classList.add(this.daClassname),
        "last" === t || t >= a.children.length
          ? a.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? a.children[t].insertAdjacentElement("beforebegin", e)
          : a.insertAdjacentElement("afterbegin", e);
    }),
    (t.prototype.moveBack = function (t, e, a) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[a]
          ? t.children[a].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (t.prototype.indexInParent = function (t, e) {
      const a = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(a, e);
    }),
    (t.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new t("max").init();
  let e = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
      );
    },
  };
  let a = !0,
    o = (t = 500) => {
      let e = document.querySelector("body");
      if (a) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (a = !1),
          setTimeout(function () {
            a = !0;
          }, t);
      }
    };
  function n(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function r(t) {
    return t.filter(function (t, e, a) {
      return a.indexOf(t) === e;
    });
  }
  let s = (t, e = !1, a = 500, r = 0) => {
    const s = document.querySelector(t);
    if (s) {
      let i = "",
        c = 0;
      e &&
        ((i = "header.header"), (c = document.querySelector(i).offsetHeight));
      let l = {
        speedAsDuration: !0,
        speed: a,
        header: i,
        offset: r,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(s, "", l);
      else {
        let t = s.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: c ? t - c : t, behavior: "smooth" });
      }
      n(`[gotoBlock]: Юхуу...едем к ${t}`);
    } else n(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
  };
  class i {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${t.length})...`
        ),
          r(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let a = e.split("|"),
              o = { root: a[0], margin: a[1], threshold: a[2] },
              n = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  a = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  n = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === o.root &&
                  String(a) === o.margin &&
                  String(n) === o.threshold
                )
                  return t;
              }),
              r = this.getScrollWatcherConfig(o);
            this.scrollWatcherInit(n, r);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${t.root} нет на странице`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${e.classList}, добавил класс _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${e.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`Я перестал следить за ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging && n(`[Наблюдатель]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const a = t.target;
      this.scrollWatcherIntersecting(t, a),
        a.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(a, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  }
  let c = !1;
  setTimeout(() => {
    if (c) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    e.any() && document.documentElement.classList.add("touch"),
    (function () {
      if (document.querySelectorAll("[data-fullscreen]").length && e.any()) {
        function t() {
          let t = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty("--vh", `${t}px`);
        }
        window.addEventListener("resize", t), t();
      }
    })(),
    new i({}),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const a = e.closest("[data-goto]"),
              o = a.dataset.goto ? a.dataset.goto : "",
              n = !!a.hasAttribute("data-goto-header"),
              r = a.dataset.gotoSpeed ? a.dataset.gotoSpeed : "500";
            s(o, n, r), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            a = e.target;
          if ("navigator" === a.dataset.watch) {
            const t = a.id,
              o =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${t}"]`));
            e.isIntersecting
              ? o && o.classList.add("_navigator-active")
              : o && o.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t);
    })(),
    (function () {
      c = !0;
      const t = document.querySelector("header.header"),
        e = t.hasAttribute("data-scroll-show"),
        a = t.dataset.scrollShow ? t.dataset.scrollShow : 500,
        o = t.dataset.scroll ? t.dataset.scroll : 1;
      let n,
        r = 0;
      document.addEventListener("windowScroll", function (s) {
        const i = window.scrollY;
        clearTimeout(n),
          i >= o
            ? (!t.classList.contains("_header-scroll") &&
                t.classList.add("_header-scroll"),
              e &&
                (i > r
                  ? t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")
                  : !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show"),
                (n = setTimeout(() => {
                  !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show");
                }, a))))
            : (t.classList.contains("_header-scroll") &&
                t.classList.remove("_header-scroll"),
              e &&
                t.classList.contains("_header-show") &&
                t.classList.remove("_header-show")),
          (r = i <= 0 ? 0 : i);
      });
    })();
})();
