/** @odoo-module **/

import { DateField } from "@web/views/fields/date/date_field";
import { PersianDatePicker } from "../persianDatepicker/persianDatepicker";

DateField.template = "web.PersianDateField";
DateField.components = {
    PersianDatePicker,
};
