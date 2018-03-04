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

    monthly_balance = []
    number_of_months = 50 * 12
    for x in range(number_of_months):
        current_balance = math.floor((current_balance + monthly_deposit) * (1 + (interest_rate / 100)))
        monthly_balance.append(current_balance)

    return JsonResponse({'monthly_balance': monthly_balance})
