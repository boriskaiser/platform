import Plugin from 'src/script/helper/plugin/plugin.class';
import DeviceDetection from 'src/script/helper/device-detection.helper';
import DomAccess from 'src/script/helper/dom-access.helper';


/**
 * This Plugin handles the
 * Subcategory display of the main navigation.
 */
export default class FlyoutMenuPlugin extends Plugin {

    static options = {
        /**
         * Hover debounce delay.
         */
        debounceTime: 125,

        /**
         * Class to add when the flyout is active.
         */
        activeCls: 'is-open',

        /**
         * Selector for the close buttons.
         */
        closeSelector: '.js-close-flyout-menu',

        /**
         * Id attribute for the flyout.
         * Should be the same as 'triggerDataAttribute'
         */
        flyoutIdDataAttribute: 'data-flyout-menu-id',

        /**
         * Trigger attribute for the opening elements.
         * Should be the same as 'flyoutIdDataAttribute'
         */
        triggerDataAttribute: 'data-flyout-menu-trigger',
    };

    init() {
        this._debouncer = null;
        this.triggerEls = this.el.querySelectorAll(`[${this.options.triggerDataAttribute}]`);
        this.closeEls = this.el.querySelectorAll(this.options.closeSelector);
        this.flyoutEls = this.el.querySelectorAll(`[${this.options.flyoutIdDataAttribute}]`);

        this._registerEvents();
    }

    /**
     * registers all needed events
     *
     * @private
     */
    _registerEvents() {
        const clickEvent = (DeviceDetection.isTouchDevice()) ? 'touchstart' : 'click';
        const openEvent = (DeviceDetection.isTouchDevice()) ? 'touchstart' : 'mouseenter';
        const closeEvent = (DeviceDetection.isTouchDevice()) ? 'touchstart' : 'mouseleave';

        // register opening triggers
        this.triggerEls.forEach(el => {
            const flyoutId = DomAccess.getDataAttribute(el, this.options.triggerDataAttribute);
            el.addEventListener(openEvent, this._openFlyoutById.bind(this, flyoutId, el));
            el.addEventListener(closeEvent, () => this._debounce(this._closeAllFlyouts));
        });

        // register closing triggers
        this.closeEls.forEach(el => {
            el.addEventListener(clickEvent, this._closeAllFlyouts.bind(this));
        });

        // register non touch events for open flyouts
        if (!DeviceDetection.isTouchDevice()) {
            this.flyoutEls.forEach(el => {
                el.addEventListener('mousemove', () => this._clearDebounce());
                el.addEventListener('mouseleave', () => this._debounce(this._closeAllFlyouts));
            });
        }
    }

    /**
     * opens a single flyout
     *
     * @param {Element} flyoutEl
     * @param {Element} triggerEl
     * @private
     */
    _openFlyout(flyoutEl, triggerEl) {
        if (!this._isOpen(triggerEl)) {
            this._closeAllFlyouts();
            flyoutEl.classList.add(this.options.activeCls);
            triggerEl.classList.add(this.options.activeCls);
        }
    }

    /**
     * closes a single flyout
     *
     * @param {Element} flyoutEl
     * @param {Element} triggerEl
     * @private
     */
    _closeFlyout(flyoutEl, triggerEl) {
        if (this._isOpen(triggerEl)) {
            flyoutEl.classList.remove(this.options.activeCls);
            triggerEl.classList.remove(this.options.activeCls);
        }
    }

    /**
     * opens a flyout
     *
     * @param {String} flyoutId
     * @param {Element} triggerEl
     * @param {Event} event
     *
     * @private
     */
    _openFlyoutById(flyoutId, triggerEl, event) {
        const flyoutEl = this.el.querySelector(`[${this.options.flyoutIdDataAttribute}='${flyoutId}']`);

        if (flyoutEl) {
            this._debounce(this._openFlyout, flyoutEl, triggerEl);
        }

        if (!this._isOpen(triggerEl)) {
            FlyoutMenuPlugin._stopEvent(event);
        }
    }

    /**
     * collect all flyouts
     * and close them
     *
     * @private
     */
    _closeAllFlyouts() {
        const flyoutEls = this.el.querySelectorAll(`[${this.options.flyoutIdDataAttribute}]`);

        flyoutEls.forEach((el) => {
            const triggerEl = this._retrieveTriggerEl(el);
            this._closeFlyout(el, triggerEl);
        });
    }

    /**
     *
     * @param {Element} el
     * @returns {Element}
     * @private
     */
    _retrieveTriggerEl(el) {
        const flyoutId = DomAccess.getDataAttribute(el, this.options.flyoutIdDataAttribute, false);
        return this.el.querySelector(`[${this.options.triggerDataAttribute}='${flyoutId}']`);
    }

    /**
     * returns if the element is opened or not
     *
     * @param {Element} el
     *
     * @returns {boolean}
     * @private
     */
    _isOpen(el) {
        return el.classList.contains(this.options.activeCls);
    }

    /**
     *
     * function to debounce menu
     * openings/closings
     *
     * @param {function} fn
     * @param {array} args
     *
     * @returns {Function}
     * @private
     */
    _debounce(fn, ...args) {
        this._clearDebounce();
        this._debouncer = setTimeout(fn.bind(this, ...args), this.options.debounceTime);
    }

    /**
     * clears the debounce timer
     *
     * @private
     */
    _clearDebounce() {
        clearTimeout(this._debouncer);
    }

    /**
     * prevents the passed event
     *
     * @param {Event} event
     * @private
     */
    static _stopEvent(event) {
        if (event && event.cancelable) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }

}
