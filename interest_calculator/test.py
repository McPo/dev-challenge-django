import json
from django.test import TestCase, Client

from parameterized import parameterized

# Results tested against https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php#compoundinterval
# However due to rounding issues they were slightly adjusted < £1
class InterestCalculatorTestCase(TestCase):
    def setUp(self):
        pass

    def test_calculate_monthly(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'monthly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        monthly_balance = json_response['monthly_balance']

        self.assertEqual(len(monthly_balance), 600)
        self.assertEqual(monthly_balance[0], 110.09)
        self.assertEqual(monthly_balance[-1], 77886.61)

    def test_calculate_yearly(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'yearly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        monthly_balance = json_response['monthly_balance']

        self.assertEqual(len(monthly_balance), 600)
        self.assertEqual(monthly_balance[0], 110.00)
        self.assertEqual(monthly_balance[-1], 77791.25)

    def test_calculate_quarterly(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        monthly_balance = json_response['monthly_balance']

        self.assertEqual(len(monthly_balance), 600)
        self.assertEqual(monthly_balance[0], 110.00)
        self.assertEqual(monthly_balance[-1], 77869.08)

    @parameterized.expand([
        ('current_balance', { 'monthlyDeposit': 100, 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('monthly_deposit', { 'currentBalance': 10, 'interestRate': 1, 'compoundPeriod': 'quarterly' }),
        ('interest_rate', { 'currentBalance': 10, 'monthlyDeposit': 100, 'compoundPeriod': 'quarterly' }),
        ('compound_period', { 'currentBalance': 10, 'monthlyDeposit': 100, 'interestRate': 1 })
    ])
    def test_calculate_missing_current_balance(self, name, request):
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_range_current_balance(self):
        request = {
            'currentBalance': -1,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_range_monthly_deposit(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': -1,
            'interestRate': 1,
            'compoundPeriod': 'quarterly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_range_interest_rate(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': -1,
            'compoundPeriod': 'quarterly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_range_compound_period(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'daily'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_type_monthly_deposit(self):
        request = {
            'currentBalance': '10',
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'quarterly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_type_monthly_deposit(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': '100',
            'interestRate': 1,
            'compoundPeriod': 'quarterly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_type_interest_rate(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': '1',
            'compoundPeriod': 'quarterly'
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_calculate_invalid_type_compound_period(self):
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 0
        }
        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)
