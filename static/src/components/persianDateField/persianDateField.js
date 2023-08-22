/** @odoo-module **/

import { DateField } from "@web/views/fields/date/date_field";
import { PersianDatePicker } from "../persianDatepicker/persianDatepicker";
import { areDateEquals } from "@web/core/l10n/dates";
import { _lt } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class PersianDateField extends DateField {
    setup() {
        /**
         * The last value that has been commited to the model.
         * Not changed in case of invalid field value.
         */
        this.lastSetValue = null;
        console.log('PersianDateField ssssssssss')
    }
    get isDateTime() {
        return this.props.record.fields[this.props.name].type === "datetime";
    }
    get date() {
        return this.props.value && this.props.value.startOf("day");
    }

    get formattedValue() {
        if (this.props.value.ts) {
            return new persianDate.unix(this.props.value.ts / 1000).format('YYYY/MM/D');
        } else {
            return ''
        }
    }

    onDateTimeChanged(date) {
        this.props.update(date)
    }
    onDatePickerInput(ev) {
        this.props.setDirty(ev.target.value !== this.lastSetValue);
    }
    onUpdateInput(date) {
        this.props.setDirty(false);
        this.lastSetValue = date;
    }
}

PersianDateField.template = "web.PersianDateField";
PersianDateField.components = {
    PersianDatePicker,
};
PersianDateField.props = {
    ...standardFieldProps,
    pickerOptions: { type: Object, optional: true },
    placeholder: { type: String, optional: true },
};
PersianDateField.defaultProps = {
    pickerOptions: {},
};

PersianDateField.displayName = _lt("Date");
// PersianDateField.supportedTypes = ["date", "datetime"];

PersianDateField.extractProps = ({ attrs }) => {
    return {
        pickerOptions: attrs.options.datepicker,
        placeholder: attrs.placeholder,
    };
};

registry.category("fields").remove("date");
registry.category("fields").add("date", PersianDateField);

