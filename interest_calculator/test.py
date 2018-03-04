import json
from django.test import TestCase, Client

class InterestCalculatorTestCase(TestCase):
    def setUp(self):
        pass

    # Results tested against https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php#compoundinterval
    def test_calculate(self):
        c = Client()
        request = {
            'currentBalance': 10,
            'monthlyDeposit': 100,
            'interestRate': 1,
            'compoundPeriod': 'monthly'
        }
        response = c.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        monthly_balance = json_response['monthly_balance']

        self.assertEqual(len(monthly_balance), 600)
        self.assertEqual(monthly_balance[0], 110.09)
        self.assertEqual(monthly_balance[-1], 77,886.68)
