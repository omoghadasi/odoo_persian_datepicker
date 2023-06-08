/** @odoo-module **/

import { DateTimeField } from "@web/views/fields/date/datetime_field";
import { PersianDateTimePicker } from "../persianDatepicker/persianDatepicker";

DateTimeField.template = "web.PersianDateTimeField";
DateTimeField.components = {
    PersianDateTimePicker,
};