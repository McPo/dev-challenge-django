import json
from django.test import TestCase, Client

class InterestCalculatorTestCase(TestCase):
    def setUp(self):
        pass

    # Results tested against https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php#compoundinterval
    # However due to rounding issues they were slightly adjusted < £1
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
