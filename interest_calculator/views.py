import json
import math

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

    if current_balance is None or monthly_deposit is None or interest_rate is None or compound_period is None:
        return HttpResponseBadRequest('Required parameters are not provided')

    divide_monthly_interest_rate_by = {'monthly': 12, 'quarterly': 4, 'yearly': 1}[compound_period]
    number_of_months_before_applying_interest = {'monthly': 1, 'quarterly': 3, 'yearly': 12}[compound_period]

    interest_calc = 1 + (interest_rate / divide_monthly_interest_rate_by) / 100

    monthly_balance = []
    number_of_months = 50 * 12
    for x in range(number_of_months):
        current_balance = current_balance + monthly_deposit

        if (x+1) % number_of_months_before_applying_interest == 0:
            current_balance = math.floor(current_balance * interest_calc * 100 + 0.5)/100

        monthly_balance.append(current_balance)

    return JsonResponse({'monthly_balance': monthly_balance})
