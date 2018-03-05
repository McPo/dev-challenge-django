import json
import math
import requests

from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

@require_POST
@csrf_exempt
def calculate(request):
    params = json.loads(request.body)
    current_balance = params.get('currentBalance', None)
    monthly_deposit = params.get('monthlyDeposit', None)
    interest_rate = params.get('interestRate', None)
    compound_period = params.get('compoundPeriod', None)
    input_currency = params.get('inputCurrency', None)
    result_currency = params.get('resultCurrency', None)

    # Quick way to make sure parameters exist, are of the correct type and within the right range
    # Should probably be using django form validators
    try:
        if current_balance < 0 or monthly_deposit < 0 or interest_rate < 0 or not compound_period in ['monthly', 'quarterly', 'yearly']:
            return HttpResponseBadRequest('Invalid or missing parameters')
    except:
        return HttpResponseBadRequest('Invalid or missing parameters')

    # Interest is calculated monthly but applied either monthly, quarterly or yearly
    monthly_interest_calc = (interest_rate / 100) / 12
    number_of_months_before_applying_interest = {'monthly': 1, 'quarterly': 3, 'yearly': 12}[compound_period]

    monthly_balance = []
    outstanding_interest = 0
    number_of_months = 50 * 12
    for x in range(number_of_months):
        current_balance += monthly_deposit

        outstanding_interest += current_balance * monthly_interest_calc
        if (x+1) % number_of_months_before_applying_interest == 0:
            current_balance = round(current_balance + outstanding_interest, 2)
            outstanding_interest = 0

        monthly_balance.append(current_balance)

    # Convert Currency (Maybe make it a utility function)
    # Deliberately kept it a separate process (Inefficent)
    # Rounds off to 2 decimal places, may not be valid for all currency
    # Should cache the result, or ideally make a scheduled job to get the daily rates
    if input_currency != result_currency:
        currency_rate_url = 'https://api.fixer.io/latest?base=%s&symbols=%s' % ('GBP', result_currency)
        currency_rate_json = requests.get(currency_rate_url, auth=('user', 'pass')).json()
        currency_rate = currency_rate_json['rates'][result_currency]

        for i in range(len(monthly_balance)):
            monthly_balance[i] = round(monthly_balance[i] * currency_rate, 2)

    return JsonResponse({'monthly_balance': monthly_balance})
