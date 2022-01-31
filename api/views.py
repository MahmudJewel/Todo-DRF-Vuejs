from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from todo.models import Task
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all()
    tSerializer = TaskSerializer(tasks, many = True)
    #return JsonResponse(tSerializer.data, safe=False)
    return Response(tSerializer.data)
    


# creat 
@api_view(['POST'])
def createTask(request):
    serializer = TaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        # return JsonResponse(serializer.errors, status=400)
        return HttpResponse('Some Error Occured')

@api_view(['DELETE'])
def deleteTask(request, id):
    tsk = Task.objects.get(id=id)
    try:
        tsk.delete()
    except Exception as e:
        Response('Unable to delete')
    return Response('Operations is Oparated')

@api_view(['POST'])
def updateTask(request, id):
    tsk = Task.objects.get(id=id)
    serializer = TaskSerializer(instance=tsk, data = request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        HttpResponse('Some error occured')
    return Response(serializer.data)
