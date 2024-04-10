from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd
import os
from django.conf import settings
import random
from django.http import JsonResponse

from .serializers import CandidateFileUploadSerializer,EmployeeFileUploadSerializer

class CandidateFileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CandidateFileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    

class EmployeeFileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = EmployeeFileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class RunSimulation(APIView):
    
    run = True
    
    def getfiles(dirpath):
        a = [s for s in os.listdir(dirpath)
            if os.path.isfile(os.path.join(dirpath, s))]
        a.sort(key=lambda s: os.path.getmtime(os.path.join(dirpath, s)))
        
        if a:
            return a[-1]
        else: 
            run = False
            return None
    
    if (run):
        employee_dir = os.path.join(settings.MEDIA_ROOT,'employee')
        employee_file = pd.read_excel(os.path.join(employee_dir,getfiles(employee_dir)))
        candidate_dir = os.path.join(settings.MEDIA_ROOT,'candidate')
        employee_file = pd.read_excel(os.path.join(candidate_dir, getfiles(candidate_dir)))


    def matching_algo(self,dirpath1,dirpath2,request,*args,**kwargs):
        candi_files = os.listdir(dirpath1)
        emplo_files = os.listdir(dirpath2)

        random.shuffle(candi_files)
        random.shuffle(emplo_files)

        matched_files = list(zip(emplo_files,candi_files))
        
        data = {'matched_files': matched_files}

    # Send data as JSON response
        return JsonResponse(data)
        



