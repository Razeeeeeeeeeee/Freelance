from api.models import Employee
from django.shortcuts import render
from django.core.files import File
from django.http import HttpResponse

# Create your views here.
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd
import os
from django.conf import settings
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .serializers import (
    CandidateFileUploadSerializer,
    EmployeeFileUploadSerializer,
    CandidateEntrySerializer,
    EmployeeEntrySerializer,
)
import json
from .algorithms import gale_shapely


class CandidateFileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CandidateFileUploadSerializer
    required_columns = [
        "candidate name",
        "skills",
        "desired salary",
        "mode",
        "available from",
        "available till",
        "preference list"
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            df = pd.read_excel(serializer.validated_data["file"])
            actual_columns = [str(x).lower() for x in df.columns.tolist()]
            missing_columns = [
                col for col in self.required_columns if col not in actual_columns
            ]

            if missing_columns:
                return Response(
                    "Some of the required columns are missing",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeFileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = EmployeeFileUploadSerializer
    required_columns = [
        "job name",
        "requirements",
        "budget",
        "max workers",
        "min workers",
        "mode",
        "available from",
        "available till",
        "preference list"
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            df = pd.read_excel(serializer.validated_data["file"])
            actual_columns = [str(x).lower() for x in df.columns.tolist()]
            missing_columns = [
                col for col in self.required_columns if col not in actual_columns
            ]

            if missing_columns:
                return Response(
                    "Some of the required columns are missing",
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class manualCandidateFileUpload(APIView):
    serializer_class = CandidateEntrySerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.validated_data)
            return Response(serializer.validated_data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class manualEmployeeFileUpload(APIView):
    serializer_class = EmployeeEntrySerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.validated_data)
            return Response(serializer.validated_data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RunSimulation(APIView):

    def __init__(self) -> None:
        super().__init__()
        self.employer_dir = os.path.join(settings.MEDIA_ROOT, "employer")
        self.employer_file = pd.read_excel(
            os.path.join(self.employer_dir, self.getfiles(self.employer_dir))
        )
        self.candidate_dir = os.path.join(settings.MEDIA_ROOT, "candidate")
        self.candidate_file = pd.read_excel(
            os.path.join(self.candidate_dir, self.getfiles(self.candidate_dir))
        )

    def getfiles(self, dirpath):
        a = [s for s in os.listdir(dirpath) if os.path.isfile(os.path.join(dirpath, s))]
        a.sort(key=lambda s: os.path.getmtime(os.path.join(dirpath, s)))

        if a:
            return a[-1]
        else:
            run = False
            return None

    def getHappinessScore(self, matches,employers,employees):
        """
        function to find the happiness score from the results
        Args :
            results (key-value pair) : the result of the matching algorithms

        Returns :
            happiness score as a key value pair
        """
        
        happiness_scores_employee = {}
        happiness_scores_employer = {}

        for employer_name, employee_names in matches:
            employer = next(e for e in employers if e.name == employer_name)
            for employee_name in employee_names:
                employee = next(e for e in employees if e.name == employee_name)
            
            # Employer's happiness
                employer_happiness = 1 - employer.preference_list.index(employee_name) / len(employer.preference_list)
                happiness_scores_employer[employer.name] = employer_happiness
            
            # Employee's happiness
                employee_happiness = 1 - employee.preference_list.index(employer_name) / len(employee.preference_list)
                happiness_scores_employee[employee.name] = employee_happiness

        return happiness_scores_employee,happiness_scores_employer

    def post(self, request, *args, **kwargs):
        # min_size = min(len(candidate_file),len(employee_file))

        if request.data["method"] == "gale-shapely":
            Employees = []
            for _, row in self.candidate_file.iterrows():
                Employees.append(
                    gale_shapely.Employee(
                        row["candidate name"],
                        row["skills"],
                        row["desired salary"],
                        row["mode"],
                        row["available from"],
                        row["available till"],
                        row["preference list"]
                    )
                )
            # print(Employees)
            Employers = []
            for _, row in self.employer_file.iterrows():
                Employers.append(
                    gale_shapely.Employer(
                        row['employer name'],
                        row["job name"],
                        row["requirements"],
                        row["budget"],
                        row["max workers"],
                        row["min workers"],
                        row["mode"],
                        row["available from"],
                        row["available till"],
                        row["preference list"],
                    )
                )

            results = gale_shapely.gale_shapley(Employers, Employees)
            print(results)
            happiness_scores_employer,happiness_scores_employee = self.getHappinessScore(results,Employers,Employees)
            response = {
                "results": results,
                "happiness_employee": happiness_scores_employee ,
                "happiness_employer": happiness_scores_employer,
            }
            print(response)
            return Response(json.dumps(response), status=status.HTTP_200_OK)
            # print(request.data["method"])

            # elif request.data["method"] == "random":
            # candidate_file = candidate_file.sample(frac=1)
            # employee_file = employee_file.sample(frac=1)
            # min_size = 10

        # candidate_file = candidate_file.iloc[:min_size]
        # candidate_file.reset_index(drop=True,inplace = True)
        # employee_file = employee_file.iloc[:min_size]
        # employee_file.reset_index(drop=True, inplace= True)

        # candidate_file.columns = [column+'_candidate' for column in candidate_file.columns]
        # employee_file.columns = [column+'_employee' for column in employee_file.columns]
        # final_file = pd.concat([candidate_file,employee_file],axis =1 )

        # # To be done for enabling the data visualisation
        # # res = final_file.to_json(orient='records')

        # processed_dir = os.path.join(settings.MEDIA_ROOT,'processed')
        # if not os.path.exists(processed_dir):
        #     os.makedirs(processed_dir)

        # file_path = os.path.join(processed_dir,'processed_file.xlsx')
        # final_file.to_excel(file_path)

        # ff = open(file_path,'rb')

        # f = File(ff)
        # res = HttpResponse(f.read())
        # res['Content-Disposition'] = 'attachment'

        # return res
        return Response({"alert": {"type": "error", "message": "Please choose an algorithm"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
