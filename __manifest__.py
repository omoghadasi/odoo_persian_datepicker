# Copyright 2018 Expert exp-sa.com, Suliman Alsowelim (KACST)
{
    "name": "Persian Datepicker",
    'version': '1',
    'author': '',
    "license": "LGPL-3",
    'summary': 'Web',
    "description":
        """
        """,
    "depends": ['base', 'web'],
    'category': 'web',
    'sequence': 5,
    'assets': {
        'web.assets_backend': [
            '/persian_datepicker/static/lib/**/*',
            '/persian_datepicker/static/src/components/persianDatepicker/**/*',
            '/persian_datepicker/static/src/components/persianDateField/**/*',
        ],
    },
    'installable': True,
    'application': True,
}
