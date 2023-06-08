/** @odoo-module **/

import { DateTimeField } from "@web/views/fields/datetime/datetime_field";
import { PersianDateTimePicker } from "../persianDatepicker/persianDatepicker";
import { areDateEquals, formatDateTime } from "@web/core/l10n/dates";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { registry } from "@web/core/registry";

export class PersianDateTimeField extends DateTimeField {
    setup() {
        /**
         * The last value that has been commited to the model.
         * Not changed in case of invalid field value.
         */
        this.lastSetValue = null;
    }
    get formattedValue() {
        return new persianDate.unix(this.props.value.ts / 1000).format('YYYY/MM/D HH:mm:ss');
    }

    onDateTimeChanged(date) {
        if (!areDateEquals(this.props.value || "", date)) {
            this.props.update(date);
        }
    }
    onDatePickerInput(ev) {
        this.props.setDirty(ev.target.value !== this.lastSetValue);
    }
    onUpdateInput(date) {
        this.props.setDirty(false);
        this.lastSetValue = date;
    }
}


PersianDateTimeField.template = "web.PersianDateTimeField";
PersianDateTimeField.components = {
    PersianDateTimePicker,
};
PersianDateTimeField.props = {
    ...standardFieldProps,
    pickerOptions: { type: Object, optional: true },
    placeholder: { type: String, optional: true },
};
PersianDateTimeField.defaultProps = {
    pickerOptions: {},
};

PersianDateTimeField.displayName = _lt("Date & Time");
PersianDateTimeField.supportedTypes = ["datetime"];

PersianDateTimeField.extractProps = ({ attrs }) => {
    return {
        pickerOptions: attrs.options.datepicker,
        placeholder: attrs.placeholder,
    };
};
registry.category("fields").remove("datetime");
registry.category("fields").add("datetime", PersianDateTimeField);