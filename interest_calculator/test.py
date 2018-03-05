import json
from django.test import TestCase, Client

from parameterized import parameterized

# Results tested against https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php#compoundinterval
# However due to rounding issues they were slightly adjusted < £1
class InterestCalculatorTestCase(TestCase):

    def setUp(self):
        pass

    @parameterized.expand([
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
    def test_calculate(self, name, request, first_expected_val, last_expected_val):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        monthly_balance = json_response['monthly_balance']

        self.assertEqual(len(monthly_balance), 600)
        self.assertEqual(monthly_balance[0], first_expected_val)
        self.assertEqual(monthly_balance[-1], last_expected_val)

    @parameterized.expand([
        ('current_balance', { 'monthlyDeposit': 100, 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('monthly_deposit', { 'currentBalance': 10, 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('interest_rate', { 'currentBalance': 10, 'monthlyDeposit': 100, 'compoundPeriod': 'quarterly' }),
        ('compound_period', { 'currentBalance': 10, 'monthlyDeposit': 100, 'interestRate': 1 })
    ])
    def test_calculate_missing_current_balance(self, name, request):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    @parameterized.expand([
        ('current_balance', { 'currentBalance': -1, 'monthlyDeposit': 100, 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('monthly_deposit', { 'currentBalance': 10, 'monthlyDeposit': -1, 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('interest_rate', { 'currentBalance': 10, 'monthlyDeposit': 100, 'interestRate': -1, 'compoundPeriod': 'quarterly' }),
        ('compound_period', { 'currentBalance': 10, 'monthlyDeposit': 100, 'interestRate': 1, 'compoundPeriod': 'daily' })
    ])
    def test_calculate_invalid_range(self, name, request):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    @parameterized.expand([
        ('current_balance', { 'currentBalance': '10', 'monthlyDeposit': 100, 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('monthly_deposit', { 'currentBalance': 10, 'monthlyDeposit': '100', 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('interest_rate', { 'currentBalance': 10, 'monthlyDeposit': 100, 'interestRate': '1', 'compoundPeriod': 'quarterly' }),
        ('compound_period', { 'currentBalance': 10, 'monthlyDeposit': 100, 'interestRate': 1, 'compoundPeriod': 0 })
    ])
    def test_calculate_invalid_type(self, name, request):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)
