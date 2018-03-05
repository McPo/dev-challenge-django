import json
from unittest import mock

from django.test import TestCase, Client

from parameterized import parameterized

# Mock the request.get for the currency rate from fixer
# Taken from https://stackoverflow.com/a/28507806/1167880
def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code

        def json(self):
            return self.json_data

    expected_url = 'https://api.fixer.io/latest?base=%s&symbols=%s' % ('GBP', 'USD')
    if args[0] == expected_url:
        return MockResponse({
            'base': 'GBP',
            'date': '2018-03-05',
            'rates': {
                'USD': 1.3817
            }
        }, 200)

    return MockResponse(None, 404)

# Results tested against https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php#compoundinterval
# However due to rounding issues they were slightly adjusted < £1
class InterestCalculatorTestCase(TestCase):

    def setUp(self):
        pass

    @parameterized.expand([
        ('current_balance', {
            'currentBalance': 100,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'monthly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }, 200.17, 78035.00),
        ('monthly_deposit', {
            'currentBalance': 10,
            'monthlyDeposit': 1000,
            'interestRate': 1,
            'compoundPeriod': 'monthly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }, 1010.84, 778718.60),
        ('interest_rate', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 10,
            'compoundPeriod': 'monthly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }, 110.92, 1748333.04),
        ('monthly', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'monthly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }, 110.09, 77886.61),
        ('yearly', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'yearly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }, 110.00, 77791.25),
        ('quarterly', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }, 110.00, 77869.08),
        ('currency', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'monthly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'USD'
        }, 152.11, 107615.93)
    ])
    @mock.patch('requests.get', side_effect=mocked_requests_get)
    def test_calculate(self, name, request, first_expected_val, last_expected_val, mock_get):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        monthly_balance = json_response['monthly_balance']

        self.assertEqual(len(monthly_balance), 600)
        self.assertEqual(monthly_balance[0], first_expected_val)
        self.assertEqual(monthly_balance[-1], last_expected_val)

    @parameterized.expand([
        ('current_balance', {
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('monthly_deposit', {
            'currentBalance': 10,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('interest_rate', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('compound_period', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('input_currency', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'resultCurrency': 'GBP'
        }),
        ('result_currency', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
        })
    ])
    def test_calculate_missing(self, name, request):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    @parameterized.expand([
        ('current_balance', {
            'currentBalance': -1,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('monthly_deposit', {
            'currentBalance': 10,
            'monthlyDeposit': -1, 'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('interest_rate', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': -1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('compound_period', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'daily',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('input_currency', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'ABC',
            'resultCurrency': 'GBP'
        }),
        ('result_currency', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'ABC'
        })
    ])
    def test_calculate_invalid_range(self, name, request):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    @parameterized.expand([
        ('current_balance', {
            'currentBalance': '10',
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('monthly_deposit', {
            'currentBalance': 10,
            'monthlyDeposit': '100',
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('interest_rate', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': '1',
            'compoundPeriod': 'quarterly',
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('compound_period', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 0,
            'inputCurrency': 'GBP',
            'resultCurrency': 'GBP'
        }),
        ('input_currency', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly',
            'inputCurrency': 0,
            'resultCurrency': 'GBP'
        }),
        ('result_currency', {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 0,
            'inputCurrency': 'GBP',
            'resultCurrency': 0
        })
    ])
    def test_calculate_invalid_type(self, name, request):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)
