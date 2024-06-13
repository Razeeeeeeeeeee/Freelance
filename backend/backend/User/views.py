from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmployeeSerializer,CandidateSerializer
from .models import Candidate
import random
# Create your views here.

class Employer(APIView):
    def post(self,request):
        serializer = EmployeeSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class Candidate_view(APIView):
    def post(self,request):
        serializer = CandidateSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request):
        preferences = [tasks.Preferences for tasks in Candidate.objects.all()]
        output  = self.simulation(preferences)
        return Response(output)
    
    def simulation(preferences):
        allotted_task = []
        for i in preferences:
            j = random.randint(1,4)
            allotted_task.append(j)
        no_of_workers = [0,0,0,0]
        for i in allotted_task:
            no_of_workers[i-1] = no_of_workers[i-1] + 1
        happiness = [25,50,75,100]
        return [happiness,no_of_workers]

        
    
