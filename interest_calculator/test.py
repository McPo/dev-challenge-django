import json
from django.test import TestCase, Client

class InterestCalculatorTestCase(TestCase):
    def setUp(self):
        pass

    def test_calculate(self):
        c = Client()
        response = c.post('/calculate/', json.dumps({'currentBalance': 0, 'monthlyDeposit': 0, 'interestRate': 0, 'compoundPeriod': 'monthly'}), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        self.assertEqual(len(json_response['monthly_balance']), 600)
