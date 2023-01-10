import jQuery from 'jquery'

(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports !== "undefined") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(function ($) {
    "use strict";
    var SuperWheel = window.SuperWheel || {};
    SuperWheel = (function () {
        var instanceUid = 0;
        function SuperWheel(element, settings) {
            var self = this,
                dataSettings;
            self.defaults = {
                slices: [
                    { name: "Win", message: "You win", value: "win" },
                    { name: "Lose", message: "You lose", value: "lose" },
                ],
                slice: { background: "#333", selected: { background: "#ddd", color: "#333" } },
                text: { type: "text", color: "#fefefe", size: 16, offset: 10, letterSpacing: 0, orientation: "v", arc: false },
                line: { width: 6, color: "#d6d6d6" },
                outer: { width: 12, color: "#d6d6d6" },
                inner: { width: 12, color: "#d6d6d6" },
                center: { width: 30, background: "#FFFFFF00", rotate: true, class: "", image: { url: "", width: 45 }, html: { template: "", width: 45 } },
                marker: { animate: true, background: "#e74c3c" },
                width: 500,
                easing: "superWheel",
                duration: 8000,
                selector: "value",
                type: "rotate",
                rotates: 8,
                frame: 6,
            };
            dataSettings = $(element).data("superWheel") || {};
            self.o = $.extend({}, self.defaults, settings, dataSettings);
            if (typeof self.o.text !== "object") self.o.text = self.defaults.text;
            else self.o.text = $.extend({}, self.defaults.text, self.o.text);
            if (typeof self.o.slice !== "object") self.o.slice = self.defaults.slice;
            else self.o.slice = $.extend({}, self.defaults.slice, self.o.slice);
            if (typeof self.o.slice.selected !== "object") self.o.slice.selected = self.defaults.slice.selected;
            else self.o.slice.selected = $.extend({}, self.defaults.slice.selected, self.o.slice.selected);
            if (typeof self.o.line !== "object") self.o.line = self.defaults.line;
            else self.o.line = $.extend({}, self.defaults.line, self.o.line);
            if (typeof self.o.outer !== "object") self.o.outer = self.defaults.outer;
            else self.o.outer = $.extend({}, self.defaults.outer, self.o.outer);
            if (typeof self.o.inner !== "object") self.o.inner = self.defaults.inner;
            else self.o.inner = $.extend({}, self.defaults.inner, self.o.inner);
            if (typeof self.o.center !== "object") self.o.center = self.defaults.center;
            else self.o.center = $.extend({}, self.defaults.center, self.o.center);
            if (typeof self.o.center.image !== "object") self.o.center.image = self.defaults.center.image;
            if (typeof self.o.center.html !== "object") self.o.center.html = self.defaults.center.html;
            if ((typeof self.o.center.html.template === "undefined" || self.o.center.html.template) && typeof self.o.center.html.tmpl !== "undefined") self.o.center.html.template = self.o.center.html.tmpl;
            if ((typeof self.o.center.image.url === "undefined" || self.o.center.image.url) && typeof self.o.center.image.src !== "undefined") self.o.center.image.url = self.defaults.center.image.src;
            if (typeof self.o.marker !== "object") self.o.marker = self.defaults.marker;
            else self.o.marker = $.extend({}, self.defaults.marker, self.o.marker);
            $.each(self.o.slices, function (i, slice) {
                var validatedSlice = slice;
                if (typeof validatedSlice.color === "undefined") {
                    validatedSlice.color = self.o.text.color;
                }
                if (typeof validatedSlice.background === "undefined") {
                    if (!self.o.slice.background) {
                        validatedSlice.background = self.randomColor((360 / self.o.slices.length) * i);
                    } else {
                        validatedSlice.background = self.o.slice.background;
                    }
                }
                self.o.slices[i] = validatedSlice;
            });
            if ((typeof self.o.center.image.url === "undefined" || self.o.center.image.url) && typeof self.o.center.image.src !== "undefined") self.o.center.image.url = self.defaults.center.image.src;
            if (typeof self.o.center.image.width !== "undefined") self.o.center.image.width = Math.abs(self.o.center.image.width);

            self.o.width = Math.abs(self.o.width);
            self.o.center.width = Math.abs(self.o.center.width);
            self.o.outer.width = Math.abs(self.o.outer.width / 2);
            self.o.inner.width = Math.abs(self.o.inner.width / 2);
            self.o.line.width = Math.abs(self.o.line.width / 2);
            self.initials = {
                spinner: false,
                now: 0,
                spinning: false,
                slice: { id: null, results: null },
                currentSliceData: { id: null, results: null },
                winner: false,
                spinCount: 0,
                counter: 0,
                currentSlice: 0,
                currentStep: 0,
                lastStep: 0,
                slicePercent: 0,
                circlePercent: 0,
                rotates: parseInt(self.o.rotates, 10),
                $element: $(element),
                slices: self.o.slices,
                width: 400,
                cache: $(element).data("superWheelData") ? $(element).data("superWheelData").cache : [],
            };
            $.extend(self, self.initials);
            self.half = 200 / 2;
            $.extend($.easing, {
                superWheel: function (x, t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                },
            });
            $.extend($.easing, {
                easeOutQuad: function (x, t, b, c, d) {
                    return -c * (t /= d) * (t - 2) + b;
                },
            });
            self.instanceUid = $(element).data("superWheelData") ? $(element).data("superWheelData").instanceUid : instanceUid++;
            $(element).data("superWheelData", self);
            self.init();
        }
        return SuperWheel;
    })();
    var dotsConfig = {
        0: {x: 183, y: 130},
        1: {x: 132, y: 179},
        2: {x: 62, y: 179},
        3: {x: 12, y: 128},
        4: {x: 12, y: 57},
        5: {x: 64, y: 7},
        6: {x: 134, y: 7},
        7: {x: 185, y: 60},
    }
    SuperWheel.prototype.init = function () {
        var self = this;
        self.$element.addClass("superWheel _" + self.instanceUid).html("");
        self.$element.html("");
        var size = self.slices.length;
        var rotate = 360 / size;
        var skewY = 90 - rotate;
        var arcSize = 360 / self.totalSlices(),
            pStart = 0,
            pEnd = 0,
            wrapper = $("<div/>").addClass("sWheel-wrapper").appendTo(self.$element),
            inner = $("<div/>").addClass("sWheel-inner").appendTo(wrapper),
            spinner = $("<div/>").addClass("sWheel").prependTo(inner),
            Layerbg = $("<div/>").addClass("sWheel-bg-layer").appendTo(spinner),
            Layersvg = $("<div/>").addClass('sWheel-wheel');

        if (self.o.text.orientation === "v" || self.o.text.orientation === "vertical" || ((self.o.text.type === "icon" || self.o.text.type === "image") && (self.o.text.orientation === "h" || self.o.text.orientation === "horizontal"))) {
            var Layertext = $("<div/>"),
                textHtml = $("<div/>");
            Layertext.addClass("sWheel-txt-wrap");
            Layertext.appendTo(spinner);
            textHtml.addClass("sWheel-txt");
            textHtml.css({
                "-webkit-transform": "rotate(" + (-(360 / self.totalSlices()) / 2 + self.getDegree()) + "deg)",
                "-moz-transform": "rotate(" + (-(360 / self.totalSlices()) / 2 + self.getDegree()) + "deg)",
                "-ms-transform": "rotate(" + (-(360 / self.totalSlices()) / 2 + self.getDegree()) + "deg)",
                "-o-transform": "rotate(" + (-(360 / self.totalSlices()) / 2 + self.getDegree()) + "deg)",
                transform: "rotate(" + (-(360 / self.totalSlices()) / 2 + self.getDegree()) + "deg)",
            });
            textHtml.appendTo(Layertext);
        } else {
            var textsGroup = $('<g class="sWheel-txt"/>');
        }
        let MAKER_SIZE = {w: 124, h: 132};


        if ($.trim(self.o.type) !== "color") {
            var Layermarker = $("<div/>").addClass("sWheel-marker").appendTo(wrapper);
            Layermarker.append(
                '<svg class="makerok"  viewBox="0 0 134 142" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<g opacity="0.5" filter="url(#filter0_f_612_67)">\n' +
                '<path d="M115.737 71.7283L75.9695 123.342C75.0477 124.571 73.7469 125.587 72.1933 126.292C70.6396 126.998 68.8857 127.368 67.1016 127.368C65.3175 127.368 63.5635 126.998 62.0098 126.292C60.4561 125.587 59.1553 124.571 58.2335 123.342L18.4662 71.7283C12.3734 63.8578 14.3232 53.4243 22.9444 47.4553C32.4612 40.864 47.0838 34.1305 67.0985 34.1305C87.1131 34.1305 101.742 40.864 111.259 47.4553C119.88 53.439 121.799 63.8872 115.737 71.7283Z" fill="#121240"/>\n' +
                '</g>\n' +
                '<g opacity="0.5" filter="url(#filter1_f_612_67)">\n' +
                '<path d="M110.484 55.5619L75.011 112.29C74.1887 113.641 73.0284 114.758 71.6426 115.533C70.2567 116.309 68.6922 116.716 67.1008 116.716C65.5093 116.716 63.9447 116.309 62.5588 115.533C61.1729 114.758 60.0126 113.641 59.1904 112.29L23.7176 55.5619C18.2829 46.9114 20.022 35.444 27.7122 28.8834C36.2013 21.6388 49.2448 14.2381 67.098 14.2381C84.9512 14.2381 98 21.6388 106.489 28.8834C114.179 35.4601 115.891 46.9438 110.484 55.5619Z" fill="#121240"/>\n' +
                '</g>\n' +
                '<path d="M107.457 50.648L74.459 105.321C71.006 111.038 63.1899 111.038 59.7419 105.321L26.7435 50.648C21.6878 42.3075 23.3057 31.2628 30.4594 24.9342C38.3564 17.9534 50.49 10.821 67.0979 10.821C83.7058 10.821 95.8445 17.9534 103.742 24.9342C110.895 31.2628 112.488 42.3227 107.457 50.648Z" fill="url(#paint0_radial_612_67)"/>\n' +
                '<path d="M77.455 107.131L77.4555 107.13L110.453 52.4581C110.453 52.4576 110.454 52.4571 110.454 52.4566C116.332 42.7272 114.517 29.7936 106.061 22.3127L106.06 22.3118C97.717 14.9372 84.7875 7.32098 67.0979 7.32098C49.4081 7.32098 36.4836 14.9375 28.1414 22.3118L28.1404 22.3127C19.6897 29.7886 17.8391 42.7068 23.7484 52.4591C23.7491 52.4601 23.7498 52.4612 23.7504 52.4623L56.7448 107.129C56.745 107.129 56.7452 107.129 56.7454 107.13C61.5556 115.104 72.6418 115.1 77.455 107.131Z" stroke="url(#paint1_linear_612_67)" stroke-width="7"/>\n' +
                '<g filter="url(#filter2_d_612_67)">\n' +
                '<path d="M76.171 106.355L76.1713 106.355L109.169 51.6823C109.169 51.6821 109.17 51.6818 109.17 51.6815C114.684 42.5539 112.965 30.4232 105.067 23.4362L105.066 23.4357C96.9145 16.2299 84.3239 8.82098 67.0979 8.82098C49.8718 8.82098 37.2863 16.23 29.1348 23.4357L29.1343 23.4362C21.2394 30.4205 19.4885 42.5358 25.0321 51.683C25.0325 51.6836 25.0328 51.6842 25.0331 51.6848L58.0293 106.354C58.0294 106.354 58.0295 106.354 58.0296 106.355C62.256 113.361 71.9407 113.359 76.171 106.355Z" stroke="url(#paint2_linear_612_67)" stroke-width="4" shape-rendering="crispEdges"/>\n' +
                '</g>\n' +
                '<path style="mix-blend-mode:screen" d="M107.457 48.4188L74.459 100.032C73.6941 101.261 72.6147 102.277 71.3255 102.983C70.0363 103.688 68.581 104.059 67.1005 104.059C65.6201 104.059 64.1646 103.688 62.8754 102.983C61.5862 102.277 60.5068 101.261 59.7419 100.032L26.7435 48.4188C21.6878 40.5483 23.3057 30.1148 30.4594 24.1458C38.3564 17.5544 50.49 10.821 67.0979 10.821C83.7058 10.821 95.8445 17.5544 103.742 24.1458C110.895 30.1295 112.488 40.5777 107.457 48.4188Z" fill="url(#paint3_radial_612_67)"/>\n' +
                '<g style="mix-blend-mode:screen" opacity="0.75" filter="url(#filter3_f_612_67)">\n' +
                '<path d="M107.95 45.1966L74.4575 93.8768C73.6923 95.0638 72.6127 96.0456 71.3231 96.7271C70.0336 97.4087 68.5779 97.7668 67.097 97.7668C65.6162 97.7668 64.1603 97.4087 62.8708 96.7271C61.5812 96.0456 60.5015 95.0638 59.7364 93.8768L25.8089 45.1966C24.4587 43.1513 23.867 39.2453 24.0996 37.4746C23.272 41.9086 24.2074 46.4729 26.7292 50.3051L59.7364 100.169C60.5015 101.356 61.5812 102.338 62.8708 103.019C64.1603 103.701 65.6162 104.059 67.097 104.059C68.5779 104.059 70.0336 103.701 71.3231 103.019C72.6127 102.338 73.6923 101.356 74.4575 100.169L107.465 50.2909C109.985 46.458 110.918 41.8938 110.089 37.4604C110.554 39.714 109.3 43.1513 107.95 45.1966Z" fill="#0085FF"/>\n' +
                '</g>\n' +
                '<g style="mix-blend-mode:screen" opacity="0.53" filter="url(#filter4_f_612_67)">\n' +
                '<path d="M67.0951 47.4502C86.0988 47.4502 101.504 39.2505 101.504 29.1356C101.504 19.0207 86.0988 10.821 67.0951 10.821C48.0913 10.821 32.6858 19.0207 32.6858 29.1356C32.6858 39.2505 48.0913 47.4502 67.0951 47.4502Z" fill="url(#paint4_linear_612_67)" style="mix-blend-mode:screen"/>\n' +
                '</g>\n' +
                '<g style="mix-blend-mode:multiply" opacity="0.73" filter="url(#filter5_f_612_67)">\n' +
                '<path d="M58.1336 39.8957C56.8953 37.2306 56.7704 34.1959 57.7854 31.4415C58.8005 28.6871 60.8748 26.432 63.5642 25.1594C64.8909 24.5489 66.3288 24.2054 67.7931 24.149C69.2574 24.0926 70.7184 24.3243 72.0898 24.8309C73.4612 25.3374 74.7153 26.1083 75.7779 27.0981C76.8406 28.0878 77.6904 29.2764 78.277 30.5936V30.5936C79.5147 33.257 79.6394 36.29 78.6243 39.0425C77.6092 41.7949 75.5351 44.0477 72.8466 45.318V45.318C71.3963 45.9899 69.8123 46.339 68.2084 46.3402C66.0749 46.3307 63.9896 45.7176 62.2025 44.5745C60.4155 43.4314 59.0027 41.8068 58.1336 39.8957Z" fill="#227FDB"/>\n' +
                '</g>\n' +
                '<path d="M60.1523 34.5105C59.1594 32.3819 59.0564 29.9569 59.8653 27.7548C60.6743 25.5527 62.3309 23.7486 64.4804 22.7287V22.7287C65.543 22.2431 66.694 21.9705 67.8656 21.927C69.0372 21.8834 70.2059 22.0696 71.3031 22.4749C72.4002 22.8801 73.4037 23.4961 74.2546 24.2867C75.1054 25.0772 75.7864 26.0264 76.2577 27.0785V27.0785C77.2506 29.2071 77.3537 31.632 76.5447 33.8341C75.7358 36.0362 74.0791 37.8404 71.9296 38.8604C70.7683 39.3969 69.5009 39.6769 68.217 39.6804V39.6804C66.5072 39.6722 64.8364 39.1799 63.4055 38.2626C61.9747 37.3454 60.8449 36.0424 60.1523 34.5105V34.5105Z" fill="url(#paint5_radial_612_67)"/>\n' +
                '<defs>\n' +
                '<filter id="filter0_f_612_67" x="0.926025" y="20.1305" width="132.338" height="121.238" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
                '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
                '<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n' +
                '<feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur_612_67"/>\n' +
                '</filter>\n' +
                '<filter id="filter1_f_612_67" x="6.55981" y="0.238068" width="121.07" height="130.478" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
                '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
                '<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n' +
                '<feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur_612_67"/>\n' +
                '</filter>\n' +
                '<filter id="filter2_d_612_67" x="16.8066" y="3.82098" width="100.577" height="112.788" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
                '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
                '<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n' +
                '<feOffset/>\n' +
                '<feGaussianBlur stdDeviation="1.5"/>\n' +
                '<feComposite in2="hardAlpha" operator="out"/>\n' +
                '<feColorMatrix type="matrix" values="0 0 0 0 0.479167 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>\n' +
                '<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_612_67"/>\n' +
                '<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_612_67" result="shape"/>\n' +
                '</filter>\n' +
                '<filter id="filter3_f_612_67" x="20.8059" y="34.4604" width="92.5781" height="72.5986" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
                '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
                '<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n' +
                '<feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_612_67"/>\n' +
                '</filter>\n' +
                '<filter id="filter4_f_612_67" x="28.6858" y="6.82098" width="76.8186" height="44.6292" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
                '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
                '<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n' +
                '<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_612_67"/>\n' +
                '</filter>\n' +
                '<filter id="filter5_f_612_67" x="53.1052" y="20.1407" width="30.1995" height="30.1995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
                '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
                '<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n' +
                '<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_612_67"/>\n' +
                '</filter>\n' +
                '<radialGradient id="paint0_radial_612_67" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(68.3752 33.0322) rotate(90.9578) scale(76.5873 67.1215)">\n' +
                '<stop offset="0.0885417" stop-color="#02B1FC"/>\n' +
                '<stop offset="1" stop-color="#00318E"/>\n' +
                '</radialGradient>\n' +
                '<linearGradient id="paint1_linear_612_67" x1="23.8059" y1="79.6395" x2="114.269" y2="12.4859" gradientUnits="userSpaceOnUse">\n' +
                '<stop stop-color="white"/>\n' +
                '<stop offset="0.429041" stop-color="#FFE660"/>\n' +
                '<stop offset="0.700776" stop-color="#FF8D23"/>\n' +
                '<stop offset="1" stop-color="#FFE660"/>\n' +
                '</linearGradient>\n' +
                '<linearGradient id="paint2_linear_612_67" x1="43.1325" y1="36.9748" x2="43.1325" y2="91.6585" gradientUnits="userSpaceOnUse">\n' +
                '<stop stop-color="white"/>\n' +
                '<stop offset="0.429041" stop-color="#FFE660"/>\n' +
                '<stop offset="0.700776" stop-color="#FF8D23"/>\n' +
                '<stop offset="1" stop-color="#FFE660"/>\n' +
                '</linearGradient>\n' +
                '<radialGradient id="paint3_radial_612_67" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.9027 1.95081) scale(35.6519 36.3775)">\n' +
                '<stop stop-color="#86FFFF"/>\n' +
                '<stop offset="0.13" stop-color="#79E6E6"/>\n' +
                '<stop offset="0.39" stop-color="#57A5A5"/>\n' +
                '<stop offset="0.78" stop-color="#213E3E"/>\n' +
                '<stop offset="1"/>\n' +
                '</radialGradient>\n' +
                '<linearGradient id="paint4_linear_612_67" x1="67.0951" y1="47.4549" x2="67.0951" y2="10.821" gradientUnits="userSpaceOnUse">\n' +
                '<stop/>\n' +
                '<stop offset="0.11" stop-color="#050504"/>\n' +
                '<stop offset="0.23" stop-color="#13130E"/>\n' +
                '<stop offset="0.36" stop-color="#2A2A20"/>\n' +
                '<stop offset="0.5" stop-color="#4A4A39"/>\n' +
                '<stop offset="0.64" stop-color="#747458"/>\n' +
                '<stop offset="0.79" stop-color="#A7A77F"/>\n' +
                '<stop offset="0.93" stop-color="#E2E2AC"/>\n' +
                '<stop offset="1" stop-color="#FFFFC3"/>\n' +
                '</linearGradient>\n' +
                '<radialGradient id="paint5_radial_612_67" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(70.6637 27.1068) scale(9.80273 9.80249)">\n' +
                '<stop stop-color="#FFFBF5"/>\n' +
                '<stop offset="0.23" stop-color="#FBF9F5"/>\n' +
                '<stop offset="0.45" stop-color="#F0F3F4"/>\n' +
                '<stop offset="0.66" stop-color="#DDE8F2"/>\n' +
                '<stop offset="0.87" stop-color="#C2D9F0"/>\n' +
                '<stop offset="1" stop-color="#AECEEF"/>\n' +
                '</radialGradient>\n' +
                '</defs>\n' +
                '</svg>\n'
            );
        }

        $.each(self.slices, function (i, slice) {
            var rotate = (360 / self.totalSlices()) * i;
            pEnd += arcSize;
            var arc = self.annularSector({
                centerX: self.half,
                centerY: self.half,
                startDegrees: pStart,
                endDegrees: pEnd,
                innerRadius: parseInt(self.o.center.width, 10),
                outerRadius: self.half - (parseInt(self.o.outer.width, 10) > 1 ? 1 : 0),
            });
            Layersvg.append(`<li class="prize" style="transform: rotate(${rotate}deg) skewY(-${skewY}deg); --background: ${slice.color}"></li>`);

            if (self.o.text.orientation === "v" || self.o.text.orientation === "vertical" || ((self.o.text.type === "icon" || self.o.text.type === "image") && (self.o.text.orientation === "h" || self.o.text.orientation === "horizontal"))) {
                var LayerTitle = $("<div/>");
                if (self.toNumber(self.o.text.letterSpacing) > 0) textHtml.css("letter-spacing", self.toNumber(self.o.text.letterSpacing));
                LayerTitle.css({
                    paddingRight: slice.padding ? `${slice.padding}%` : parseInt(self.o.text.offset, 10) + "%",
                    "-webkit-transform": "rotate(" + rotate + "deg) translate(0px, -50%)",
                    "-moz-transform": "rotate(" + rotate + "deg) translate(0px, -50%)",
                    "-ms-transform": "rotate(" + rotate + "deg) translate(0px, -50%)",
                    "-o-transform": "rotate(" + rotate + "deg) translate(0px, -50%)",
                    transform: "rotate(" + rotate + "deg) translate(0px, -50%)",
                    fontSize: slice.fontSetting?.size || 38 ,
                    fontWeight: slice.fontSetting?.weight ,
                    lineHeight: slice.fontSetting?.height || '100%' ,
                    whiteSpace: slice.textSetting
                });
                if (self.o.text.type === "icon") {
                    LayerTitle.html('<i class="' + slice.text + '" aria-hidden="true"></i>');
                    if (self.o.text.orientation === "h" || self.o.text.orientation === "horizontal") {
                        LayerTitle.find(">i").css({ "-webkit-transform": "rotate(90deg)", "-moz-transform": "rotate(90deg)", "-ms-transform": "rotate(90deg)", "-o-transform": "rotate(90deg)", transform: "rotate(90deg)" });
                    }
                } else if (self.o.text.type === "image") {
                    LayerTitle.html('<img src="' + slice.text + '"/>');
                    if (self.o.text.orientation === "h" || self.o.text.orientation === "horizontal") {
                        LayerTitle.find(">img").css({ "-webkit-transform": "rotate(90deg)", "-moz-transform": "rotate(90deg)", "-ms-transform": "rotate(90deg)", "-o-transform": "rotate(90deg)", transform: "rotate(90deg)" });
                    }
                } else {
                    LayerTitle.html(slice.text);
                }
                LayerTitle.attr("data-color", slice.color);
                LayerTitle.addClass("sWheel-title").appendTo(textHtml);
            } else {
                var LayerText = $(
                    '<text stroke-width="0" data-color="' +
                    slice.color +
                    '" fill="' +
                    slice.color +
                    '" dy="' +
                    self.toNumber(self.o.text.offset) +
                    '%">' +
                    '<textPath xlink:href="#sw-text-' +
                    i +
                    '" startOffset="50%" style="text-anchor: middle;">' +
                    slice.text +
                    "</textPath>" +
                    "</text>"
                );
                LayerText.addClass("sWheel-title");
                textsGroup.css("font-size", parseInt(self.o.text.size / 2, 10));
                if (parseInt(self.o.text.letterSpacing, 10) > 0) textsGroup.css("letter-spacing", parseInt(self.o.text.letterSpacing / 2, 10));
                textsGroup.append(LayerText);
                var firstArcSection = /(^.+?)L/;
                var newD = firstArcSection.exec(arc)[1];
                if (self.o.text.arc !== true && self.o.text.arc !== "true" && self.o.text.arc !== 1) {
                    var secArcSection = /(^.+?)A/;
                    var Commas = /(^.+?),/;
                    var newc = secArcSection.exec(newD);
                    var replaceVal = newD.replace(newc[0], "");
                    var getFirstANumber = Commas.exec(replaceVal);
                    var nval = replaceVal.replace(getFirstANumber[1], 0);
                    newD = newD.replace(replaceVal, nval);
                }
            }
            var LayerTitleInner = $("<div/>");
            LayerTitleInner.html(slice);
            LayerTitleInner.appendTo(LayerTitle);
            pStart += arcSize;
        });

        Layersvg.appendTo(Layerbg);
        Layerbg.html(Layerbg.html());

        var AdaptiveSize = self.$element.width()

        if ($(window).width() < 1280) {
            AdaptiveSize = 504
        }
        if ($(window).width() < 769) {
            AdaptiveSize = 325
        }

        if ($(window).width() > 1280){
            AdaptiveSize = 580
        }

        //TODO размеры
        self.$element.css("font-size", parseInt(self.o.text.size, 10));
        self.$element.width(AdaptiveSize);
        self.$element.height(AdaptiveSize);
        self.$element.find(".sWheel-wrapper").width(AdaptiveSize);
        self.$element.find(".sWheel-wrapper").height(AdaptiveSize);
        self.FontScale();
        $(window).on("resize." + self.instanceUid, function (e) {
            var AdaptiveSize = self.$element.width()
            if (e.target.innerWidth < 1280) {
                AdaptiveSize = 504
            } else {
                AdaptiveSize = 580
            }

            if (e.target.innerWidth < 769) {
                AdaptiveSize = 325
            }

            self.$element.height(AdaptiveSize);
            self.$element.width(AdaptiveSize);
            self.$element.find(".sWheel-wrapper").width(AdaptiveSize);
            self.$element.find(".sWheel-wrapper").height(AdaptiveSize);
            self.FontScale();
        });
    };
    SuperWheel.prototype.SVG = function (e, t) {
        var r = document.createElementNS("http://www.w3.org/2000/svg", e);
        for (var n in t) r.setAttribute(n, t[n]);
        return r;
    };
    SuperWheel.prototype.annularSector = function (options) {
        var self = this;
        var opts = self.oWithDefaults(options);
        var p = [
            [opts.cx + opts.r2 * Math.cos(opts.startRadians), opts.cy + opts.r2 * Math.sin(opts.startRadians)],
            [opts.cx + opts.r2 * Math.cos(opts.closeRadians), opts.cy + opts.r2 * Math.sin(opts.closeRadians)],
            [opts.cx + opts.r1 * Math.cos(opts.closeRadians), opts.cy + opts.r1 * Math.sin(opts.closeRadians)],
            [opts.cx + opts.r1 * Math.cos(opts.startRadians), opts.cy + opts.r1 * Math.sin(opts.startRadians)],
        ];
        var angleDiff = opts.closeRadians - opts.startRadians;
        var largeArc = angleDiff % (Math.PI * 2) > Math.PI ? 1 : 0;
        var cmds = [];
        cmds.push("M" + p[0].join());
        cmds.push("A" + [opts.r2, opts.r2, 0, largeArc, 1, p[1]].join());
        cmds.push("L" + p[2].join());
        cmds.push("A" + [opts.r1, opts.r1, 0, largeArc, 0, p[3]].join());
        cmds.push("z");
        return cmds.join(" ");
    };
    SuperWheel.prototype.oWithDefaults = function (o) {
        var o2 = { cx: o.centerX || 0, cy: o.centerY || 0, startRadians: ((o.startDegrees || 0) * Math.PI) / 180, closeRadians: ((o.endDegrees || 0) * Math.PI) / 180 };
        var t = o.thickness !== undefined ? o.thickness : 100;
        if (o.innerRadius !== undefined) o2.r1 = o.innerRadius;
        else if (o.outerRadius !== undefined) o2.r1 = o.outerRadius - t;
        else o2.r1 = 200 - t;
        if (o.outerRadius !== undefined) o2.r2 = o.outerRadius;
        else o2.r2 = o2.r1 + t;
        if (o2.r1 < 0) o2.r1 = 0;
        if (o2.r2 < 0) o2.r2 = 0;
        return o2;
    };
    SuperWheel.prototype.findPoint = function (cx, cy, rad, cornerGrad) {
        var cornerRad = (cornerGrad * Math.PI) / 180;
        var nx = Math.cos(cornerRad) * rad + cx;
        var ny = Math.sin(cornerRad) * rad + cy;
        return { x: nx, y: ny };
    };
    SuperWheel.prototype.start = function (key, val) {
        var self = this;
        if (self.spinning) return;
        if (typeof val === "undefined") {
            val = key;
            key = self.o.selector;
        }
        self.o.selector = key;
        if (typeof val !== "undefined") {
            self.winner = self.findWinner(val, false);
            if (self.winner !== false) {
                self.slice.id = self.winner;
            } else {
                return;
            }
        } else {
            return;
        }
        self.spinning = true;
        if (typeof self.slices[self.slice.id] === "undefined") return;
        self.slice.results = self.slices[self.slice.id];
        self.slice.length = self.slice.id;
        if (typeof self.cache["onStart"] !== "undefined") {
            $.each(self.cache["onStart"], function (i, callback) {
                if (typeof callback === "function") callback.call(self.$wheel, self.slice.results, self.spinCount, self.now);
            });
        }
        var selectedSlicePos = self.calcSliceSize(self.slice.id);
        var randomize = self.randomInt(selectedSlicePos.start, selectedSlicePos.end);
        var _deg = 360 * parseInt(self.rotates, 10) + randomize;
        var temp = self.numberToArray(self.totalSlices()).reverse();
        var MarkerAnimator = false;
        if (parseInt(self.o.frame, 10) !== 0) {
            var oldinterval = $.fx.interval;
            $.fx.interval = parseInt(self.o.frame, 10);
        }
        self.spinner = $({ deg: self.now }).animate(
            { deg: _deg },
            {
                duration: parseInt(self.o.duration, 10),
                easing: $.trim(self.o.easing),
                step: function (now, fx) {
                    if (parseInt(self.o.frame, 10) !== 0) $.fx.interval = parseInt(self.o.frame, 10);
                    self.now = now % 360;
                    if ($.trim(self.o.type) !== "color") {
                        self.$element
                            .find(".sWheel")
                            .css({
                                "-webkit-transform": "rotate(" + self.now + "deg)",
                                "-moz-transform": "rotate(" + self.now + "deg)",
                                "-ms-transform": "rotate(" + self.now + "deg)",
                                "-o-transform": "rotate(" + self.now + "deg)",
                                transform: "rotate(" + self.now + "deg)",
                            });
                    }
                    self.currentStep = Math.floor(now / (360 / self.totalSlices()));
                    self.currentSlice = temp[self.currentStep % self.totalSlices()];
                    var ewCircleSize = 400 * 4,
                        ewTotalArcs = self.totalSlices(),
                        ewArcSizeDeg = 360 / ewTotalArcs,
                        ewArcSize = ewCircleSize / ewTotalArcs,
                        point = ewCircleSize / 360,
                        ewCirclePos = point * self.now,
                        ewCirclePosPercent = (ewCirclePos / ewCircleSize) * 100,
                        ewArcPos = (self.currentSlice + 1) * ewArcSize - (ewCircleSize - point * self.now),
                        ewArcPosPercent = (ewArcPos / ewArcSize) * 100,
                        cpercent = ewCirclePosPercent,
                        apercent = ewArcPosPercent;
                    self.slicePercent = ewArcPosPercent;
                    self.circlePercent = ewCirclePosPercent;
                    if (typeof self.cache["onProgress"] !== "undefined") {
                        $.each(self.cache["onProgress"], function (i, callback) {
                            if (typeof callback === "function") callback.call(self.$element, self.slicePercent, self.circlePercent);
                        });
                    }
                    if (self.lastStep !== self.currentStep) {
                        self.lastStep = self.currentStep;
                        if (
                            (self.o.marker.animate === true || self.o.marker.animate === 1 || self.o.marker.animate === "true") &&
                            $.inArray($.trim(self.o.easing), ["easeInElastic", "easeInBack", "easeInBounce", "easeOutElastic", "easeOutBack", "easeOutBounce", "easeInOutElastic", "easeInOutBack", "easeInOutBounce"]) === -1
                        ) {
                            var Mduration = parseFloat(self.o.duration) / (self.totalSlices() * self.o.rotates + (self.totalSlices() - self.winner) - self.currentStep) / self.o.rotates;
                            var BDeg = self.totalSlices() * self.o.rotates - self.currentStep;
                            if (MarkerAnimator) MarkerAnimator.stop();
                            var markerNow = 0;
                            MarkerAnimator = $({ deg: BDeg > 40 ? -40 : -BDeg > -10 ? 0 : -BDeg }).animate(
                                { deg: -50 },
                                {
                                    easing: "linear",
                                    duration: Mduration / 4,
                                    step: function (now) {
                                        markerNow = now;
                                        $(".sWheel-marker").css({
                                            "-webkit-transform": "rotate(" + now + "deg)",
                                            "-moz-transform": "rotate(" + now + "deg)",
                                            "-ms-transform": "rotate(" + now + "deg)",
                                            "-o-transform": "rotate(" + now + "deg)",
                                            transform: "rotate(" + now + "deg)",
                                        });
                                    },
                                    complete: function (animation, progress, remainingMs) {
                                        MarkerAnimator = $({ deg: markerNow }).animate(
                                            { deg: 0 },
                                            {
                                                easing: "linear",
                                                duration: 100,
                                                step: function (now) {
                                                    $(".sWheel-marker").css({
                                                        "-webkit-transform": "rotate(" + now + "deg)",
                                                        "-moz-transform": "rotate(" + now + "deg)",
                                                        "-ms-transform": "rotate(" + now + "deg)",
                                                        "-o-transform": "rotate(" + now + "deg)",
                                                        transform: "rotate(" + now + "deg)",
                                                    });
                                                },
                                            }
                                        );
                                    },
                                }
                            );
                        }
                        if ($.trim(self.o.type) === "color") {
                            self.$element.find("svg>g.sw-slicesGroup>path").each(function (i) {
                                $(this).attr("class", "").attr("fill", $(this).attr("data-fill"));
                            });
                            self.$element.find(".sWheel-txt>.sWheel-title").each(function (i) {
                                $(this).attr("class", "sWheel-title");
                                if (self.o.text.orientation === "v" || self.o.text.orientation === "vertical") $(this).css("color", $(this).attr("data-color"));
                                else $(this).attr("fill", $(this).attr("data-color"));
                            });
                            self.$element.find("svg>g.sw-slicesGroup>path").eq(self.currentSlice).addClass("sw-ccurrent").attr("fill", self.o.slice.selected.background);
                            if (self.o.text.orientation === "v" || self.o.text.orientation === "vertical")
                                self.$element.find(".sWheel-txt>.sWheel-title").eq(self.currentSlice).addClass("sw-ccurrent").css("color", self.o.slice.selected.color);
                            else self.$element.find(".sWheel-txt>.sWheel-title").eq(self.currentSlice).addClass("sw-ccurrent").attr("fill", self.o.slice.selected.color);
                        } else {
                            self.$element.find("svg>g.sw-slicesGroup>path").removeClass("sw-current");
                            self.$element.find("svg>g.sw-slicesGroup>path").eq(self.currentSlice).addClass("sw-current");
                            self.$element.find(".sWheel-txt>.sWheel-title").eq(self.currentSlice).addClass("sw-current");
                        }
                        self.currentSliceData = {};
                        self.currentSliceData.id = self.currentSlice;
                        self.currentSliceData.results = self.slices[self.currentSliceData.id];
                        self.currentSliceData.results.length = self.currentSliceData.id;
                        if (typeof self.cache["onStep"] !== "undefined") {
                            $.each(self.cache["onStep"], function (i, callback) {
                                if (typeof callback === "function") callback.call(self.$element, self.currentSliceData.results, self.slicePercent, self.circlePercent);
                            });
                        }
                    }
                    if (parseInt(self.o.frame, 10) !== 0) $.fx.interval = oldinterval;
                },
                fail: function (animation, progress, remainingMs) {
                    self.spinning = false;
                    if (typeof self.cache["onFail"] !== "undefined") {
                        $.each(self.cache["onFail"], function (i, callback) {
                            if (typeof callback === "function") callback.call(self.$element, self.slice.results, self.spinCount, self.now);
                        });
                    }
                },
                complete: function (animation, progress, remainingMs) {
                    self.spinning = false;
                    if (typeof self.cache["onComplete"] !== "undefined") {
                        $.each(self.cache["onComplete"], function (i, callback) {
                            if (typeof callback === "function") callback.call(self.$element, self.slice.results, self.spinCount, self.now);
                        });
                    }
                },
            }
        );
        self.counter++;
        self.spinCount++;
    };
    SuperWheel.prototype.totalSlices = function () {
        var self = this;
        return self.slices.length;
    };
    SuperWheel.prototype.calcSliceSize = function (slice) {
        var self = this;
        var start = self.degStart(slice) - (parseInt(self.o.line.width, 10) + 2);
        var end = self.degEnd(slice) + (parseInt(self.o.line.width, 10) + 2);
        var results = [];
        results.start = start;
        results.end = end;
        return results;
    };
    SuperWheel.prototype.findWinner = function (value, type) {
        var self = this;
        var filter = [];
        $.each(self.slices, function (i, slice) {
            if (typeof slice[self.o.selector] === "object" || typeof slice[self.o.selector] === "array" || typeof slice[self.o.selector] === "undefined") return undefined;
            if (slice[self.o.selector] === value) {
                filter.push(i);
            }
        });
        var keys = Object.keys(filter);
        var selectedKey = filter[keys[(keys.length * Math.random()) << 0]];
        return selectedKey;
    };
    SuperWheel.prototype.getDegree = function (id) {
        var self = this;
        return 360 / self.totalSlices();
    };
    SuperWheel.prototype.degStart = function (id) {
        var self = this;
        return 360 - self.getDegree() * id;
    };
    SuperWheel.prototype.degEnd = function (id) {
        var self = this;
        return 360 - (self.getDegree() * id + self.getDegree());
    };
    SuperWheel.prototype.toNumber = function (e) {
        return NaN === Number(e) ? 0 : Number(e);
    };
    SuperWheel.prototype.numberToArray = function (N) {
        var args = [];
        var i;
        for (i = 0; i < N; i++) {
            args[i] = i;
        }
        return args;
    };
    SuperWheel.prototype.brightness = function (c) {
        var r, g, b, brightness;
        if (c.match(/^rgb/)) {
            c = c.match(/rgba?\(([^)]+)\)/)[1];
            c = c.split(/ *, */).map(Number);
            r = c[0];
            g = c[1];
            b = c[2];
        } else if ("#" == c[0] && 7 == c.length) {
            r = parseInt(c.slice(1, 3), 16);
            g = parseInt(c.slice(3, 5), 16);
            b = parseInt(c.slice(5, 7), 16);
        } else if ("#" == c[0] && 4 == c.length) {
            r = parseInt(c[1] + c[1], 16);
            g = parseInt(c[2] + c[2], 16);
            b = parseInt(c[3] + c[3], 16);
        }
        brightness = (r * 299 + g * 587 + b * 114) / 1000;
        if (brightness < 125) {
            return "#fff";
        } else {
            return "#333";
        }
    };
    SuperWheel.prototype.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    SuperWheel.prototype.randomColor = function (h) {
        var PHI = 0.618033988749895;
        var s, v, hue;
        if (h === undefined) {
            hue = Math.floor(Math.random() * (360 - 0 + 1) + 0) / 360;
            h = (hue + hue / PHI) % 360;
        } else h /= 360;
        v = Math.floor(Math.random() * (100 - 20 + 1) + 20);
        s = (v - 10) / 100;
        v = v / 100;
        var r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
        }
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        var finalColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return finalColor;
    };
    SuperWheel.prototype.FontScale = function (slice) {
        var self = this;
        var Fscale = 1 + (1 * (self.$element.width() - parseInt(self.o.width, 10))) / parseInt(self.o.width, 10);
        if (Fscale > 4) {
            Fscale = 4;
        } else if (Fscale < 0.1) {
            Fscale = 0.1;
        }
        self.$element.find(".sWheel-wrapper").css("font-size", Fscale * 100 + "%");
    };
    SuperWheel.prototype.guid = function (r) {
        var t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            a = "";
        r || (r = 8);
        for (var o = 0; o < r; o++) a += t.charAt(Math.floor(Math.random() * t.length));
        return a;
    };
    SuperWheel.prototype.onStart = function (callback) {
        var self = this;
        if (typeof self.cache["onStart"] === "undefined") self.cache["onStart"] = [];
        self.cache["onStart"][self.cache["onStart"].length] = callback;
    };
    SuperWheel.prototype.onStep = function (callback) {
        var self = this;
        if (typeof self.cache["onStep"] === "undefined") self.cache["onStep"] = [];
        self.cache["onStep"][self.cache["onStep"].length] = callback;
    };
    SuperWheel.prototype.onProgress = function (callback) {
        var self = this;
        if (typeof self.cache["onProgress"] === "undefined") self.cache["onProgress"] = [];
        self.cache["onProgress"][self.cache["onProgress"].length] = callback;
    };
    SuperWheel.prototype.onFail = function (callback) {
        var self = this;
        if (typeof self.cache["onFail"] === "undefined") self.cache["onFail"] = [];
        self.cache["onFail"][self.cache["onFail"].length] = callback;
    };
    SuperWheel.prototype.onComplete = function (callback) {
        var self = this;
        if (typeof self.cache["onComplete"] === "undefined") self.cache["onComplete"] = [];
        self.cache["onComplete"][self.cache["onComplete"].length] = callback;
    };
    SuperWheel.prototype.onFail = function (callback) {
        var self = this;
        if (typeof self.cache["onFail"] === "undefined") self.cache["onFail"] = [];
        self.cache["onFail"][self.cache["onFail"].length] = callback;
    };
    $.fn.superWheel = function () {
        var self = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            arg2 = Array.prototype.slice.call(arguments, 2),
            l = self.length,
            i,
            apply,
            allowed = ["destroy", "start", "finish", "option", "onStart", "onStep", "onProgress", "onComplete", "onFail"];
        for (i = 0; i < l; i++) {
            if (typeof opt == "object" || typeof opt == "undefined") {
                self[i].superWheel = new SuperWheel(self[i], opt);
            } else if ($.inArray($.trim(opt), allowed) !== -1) {
                if ($.trim(opt) === "option") {
                    apply = self[i].superWheel[opt].apply(self[i].superWheel, args, arg2);
                } else {
                    apply = self[i].superWheel[opt].apply(self[i].superWheel, args);
                }
            }
            if (typeof apply != "undefined") return apply;
        }
        return self;
    };
});
