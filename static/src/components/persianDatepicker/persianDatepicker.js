/** @odoo-module **/
import { DatePicker } from "@web/core/datepicker/datepicker";

import {
    areDateEquals,
    formatDate,
    formatDateTime,
    luxonToMoment,
    luxonToMomentFormat,
    momentToLuxon,
    parseDate,
    parseDateTime,
} from "@web/core/l10n/dates";
import { getActiveHotkey } from "@web/core/hotkeys/hotkey_service";
import { localization } from "@web/core/l10n/localization";
import { useAutofocus } from "@web/core/utils/hooks";
import { isMobileOS } from "@web/core/browser/feature_detection";

import {
    onMounted,
    onWillUpdateProps,
    onWillUnmount,
    useExternalListener,
    useRef,
    useState,
} from "@odoo/owl";

let datePickerId = 0;

export class PersianDatePicker extends DatePicker {
    /**
     * @override
    */
    setup() {
        console.log('setup datepicker')
        this.rootRef = useRef("root");
        this.inputRef = useRef("input");
        this.state = useState({ warning: false, pDatepickerObject: null });

        this.datePickerId = `o_datepicker_${datePickerId++}`;
        // Manually keep track of the "open" state to write the date in the
        // static format just before bootstrap parses it.
        this.datePickerShown = false;

        this.initFormat();
        this.setDateAndFormat(this.props);

        useAutofocus();
        useExternalListener(window, "scroll", this.onWindowScroll, { capture: true });


        onMounted(this.onMounted);
        onWillUpdateProps(this.onWillUpdateProps);
        onWillUnmount(this.onWillUnmount);
    }

    /**
    * Initialises formatting and parsing parameters
    */
    initFormat() {
        this.staticFormat = "yyyy/MM/dd";
        this.formatValue = this.formatDate;
        this.parseValue = this.parseDate;
        this.isLocal = false;
    }

    onMounted() {
        this.state.pDatepickerObject = this.bootstrapDateTimePicker(this.props);
        this.updateInput();

        // window.$(this.rootRef.el).on("show.datetimepicker", () => {
        //     this.datePickerShown = true;
        //     this.inputRef.el.select();
        // });
        // window.$(this.rootRef.el).on("hide.datetimepicker", ({ date }) => {
        //     this.datePickerShown = false;
        //     this.onDateChange({ eventDate: date, useStatic: true });
        // });
        // window.$(this.rootRef.el).on("error.datetimepicker", () => false);
    }

    onWillUpdateProps(nextProps) {
        // const pickerParams = {};
        // for (const prop in nextProps) {
        //     if (!areDateEquals(this.props[prop], nextProps[prop])) {
        //         pickerParams[prop] = nextProps[prop];
        //     }
        // }
        // this.setDateAndFormat(nextProps);
        // if ("date" in pickerParams || "format" in pickerParams) {
        //     this.updateInput();
        // }
        // this.bootstrapDateTimePicker(pickerParams);
    }

    onWillUnmount() {
        this.state.pDatepickerObject.destroy();
        window.$(this.rootRef.el).off(); // Removes all jQuery events
    }

    bootstrapDateTimePicker() {
        return window.$(this.rootRef.el).pDatepicker({ autoClose: true, onSelect: this.afterSelectDate.bind(this) });
    }

    /**
    * Updates the input element with the current formatted date value.
    * @param {Object} [params={}]
    * @param {boolean} [params.useStatic]
    */
    updateInput({ useStatic } = {}) {
        let currentDate = new persianDate.unix(this.date.ts / 1000).format();
        this.inputRef.el.value = currentDate;
        this.props.onUpdateInput(currentDate);
    }

    /**
    * Sets the current date value. If a locale is provided, the given date
    * will first be set in that locale.
    * @param {Object} params
    * @param {DateTime} params.date
    * @param {string} [params.locale]
    * @param {string} [params.format]
    */
    setDateAndFormat({ date, locale, format }) {
        this.date = date && locale ? date.setLocale(locale) : date;
        // Fallback to default localization format in `@web/core/l10n/dates.js`.
        this.format = format || this.staticFormat;
    }

    afterSelectDate(unixDate) {
        persianDate.toLocale('en');
        let nowPersianDate = new persianDate.unix(unixDate / 1000)
        this.date = {
            ...this.date,
            ts: unixDate,
            c: {
                year: nowPersianDate.year(),
                month: nowPersianDate.month(),
                day: nowPersianDate.date()
            }
        }
        this.updateInput()
        this.props.date.c = {
            year: nowPersianDate.toCalendar('gregorian').year(),
            month: nowPersianDate.toCalendar('gregorian').month(),
            day: nowPersianDate.toCalendar('gregorian').date()
        }
        this.props.date.ts = unixDate
        this.props.onDateTimeChanged(this.props.date);
    }
    onInputClick() {

    }
}

DatePicker.defaultProps = {
    calendarWeeks: true,
    icons: {
        clear: "fa fa-delete",
        close: "fa fa-check primary",
        date: "fa fa-calendar",
        down: "fa fa-chevron-down",
        next: "fa fa-chevron-right",
        previous: "fa fa-chevron-left",
        time: "fa fa-clock-o",
        today: "fa fa-calendar-check-o",
        up: "fa fa-chevron-up",
    },
    inputId: "",
    useCurrent: false,
    widgetParent: "body",
    onInput: () => { },
    onUpdateInput: () => { },
};
DatePicker.props = {
    // Components props
    onDateTimeChanged: Function,
    date: { type: Object, optional: true },
    warn_future: { type: Boolean, optional: true },
    // Bootstrap datepicker options
    buttons: {
        type: Object,
        shape: {
            showClear: Boolean,
            showClose: Boolean,
            showToday: Boolean,
        },
        optional: true,
    },
    calendarWeeks: { type: Boolean, optional: true },
    format: { type: String, optional: true },
    icons: {
        type: Object,
        shape: {
            clear: String,
            close: String,
            date: String,
            down: String,
            next: String,
            previous: String,
            time: String,
            today: String,
            up: String,
        },
        optional: true,
    },
    inputId: { type: String, optional: true },
    keyBinds: { validate: (kb) => typeof kb === "object" || kb === null, optional: true },
    locale: { type: String, optional: true },
    readonly: { type: Boolean, optional: true },
    useCurrent: { type: Boolean, optional: true },
    widgetParent: { type: String, optional: true },
    daysOfWeekDisabled: { type: Array, optional: true },
    placeholder: { type: String, optional: true },
    onInput: { type: Function, optional: true },
    onUpdateInput: { type: Function, optional: true },
};

PersianDatePicker.template = "web.PersianDatePicker";