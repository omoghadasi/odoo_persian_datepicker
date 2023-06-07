from odoo import models, fields, api
import jdatetime


class JalaliCalendar(models.Model):
    _inherit = 'your.model'  # جایگزین کنید

    jalali_datetime = fields.Char(
        string='Jalali DateTime', compute='_compute_jalali_datetime')

    @api.depends('your_datetime_field')  # جایگزین کنید
    def _compute_jalali_datetime(self):
        for record in self:
            if record.your_datetime_field:
                gregorian_date = record.your_datetime_field.date()  # جایگزین کنید
                jalali_date = jdatetime.date.fromgregorian(date=gregorian_date)
                record.jalali_datetime = str(jalali_date)
            else:
                record.jalali_datetime = False
