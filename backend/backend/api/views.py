from api.models import Employee
from django.shortcuts import render
from django.core.files import File
from django.http import HttpResponse

import math
import numpy as np
from models import Employer_ms,Candidate_ms

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
    EmployeeSerializer_ms,
    CandidateSerializer_ms,
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

    def distance(self,loc1,loc2):
        loc1 = [int(a) for a in loc1.split(',')]
        loc2 = [int(a) for a in loc2.split(',')]
        return math.dist(loc1,loc2)

    def check_skillmatch(self,worker,task):
        k = set(worker.skills)&set(task.skills)
        if(k == None):
            return False
        else:
            return True

    def check_valid(self,worker,task):
        if((self.check_skillmatch(worker,task)) & (self.distance(worker.location,task.location)*(worker.velocity) <= (task.arrival_deadline)) & (self.distance(worker.location,task.location)*(worker.velocity)<=(task.arrival_deadline))):
            return True
        return False

    def generate_graph(self,list_of_tasks,list_of_workers):
        k = {}
        worker_no=-1
        for i in list_of_workers:
            worker_no = worker_no + 1
            for j in range(len(list_of_tasks)):
                if(self.check_valid(i,list_of_tasks[j])):
                    if i in k.keys():
                        k[i].append(list_of_tasks[j])
                    else:
                        k[i] = [list_of_tasks[j]]
        return k

    def calculate_score(self,task,worker):
        s = (task.budget - worker.cost)*len(list(set(worker.skills).intersection(set(task.skills))))
        s = s/len(task.skills)
        return s

    def ms_sc_greedy(self,list_of_workers,list_of_tasks):
        Ip = []
        k = self.generate_graph(list_of_workers,list_of_tasks)
        print(f"graph : {k}")
        cnt = 0
        while((len(list_of_tasks) !=0) & (len(list_of_workers)!=0)):
            S_cand = []
            assigned_w = 0
            for task in list_of_tasks:
                print(task)
                for worker in k[task]:
                    S_cand.append([worker,task])
                score = 0
                for g in S_cand:
                    cur_score = self.calculate_score(g[0],g[1])
                    if cur_score>score:
                        score = cur_score
                        assigned_w = g[0]
                        assigned_t = g[1]
            if(assigned_w != 0):
                Ip.append([assigned_w.name,assigned_t.name,cur_score])
                if assigned_w in list_of_workers:
                    list_of_workers.remove(assigned_w) 
                skills_covered = list(set(assigned_w.skills).intersection(set(assigned_t.skills)))
                assigned_t.skills = [ele for ele in assigned_t.skills if ele not in skills_covered]
            if cnt == 8:
                break
            cnt += 1
        return Ip
    

    def generate_graph1(self,list_of_workers,list_of_tasks):
        k = {}
        worker_no=-1
        for i in list_of_workers:
            worker_no = worker_no + 1
            for j in range(len(list_of_tasks)):
                if(self.check_valid(i,list_of_tasks[j])):
                    if list_of_tasks[j] in k.keys():
                        k[list_of_tasks[j]].append(i)
                    else:
                        k[list_of_tasks[j]] = [i]
        return k

    def calculate_degree(graph):
        count1 = 0
        count2 = 0
        for i in graph.keys():
            count1 = count1 + 1
            count2 = count2 + len(graph[i])
        degree = count2/count1
        return degree

    def calculate_g(m,degree):
        g=2
        l = ((m*(math.log10(m))*(g*math.log10(g) - g - 1))/(g*math.log10(2*g))) + ((1-m)/((1-g)**2))*(degree**2)
        while(l<0):
            g = g+1
            if(g==m):
                break
            l =  l = ((m*(math.log(m))*(g*math.log(g) - g - 1))/(g*math.log(2*g))) + ((1-m)/((1-g)**2))*(degree**2)
        return g

    def find_nearest_tasks(self,task,list_of_tasks,g):
        nearest_tasks = []
        distances = {}
        l = math.ceil(len(list_of_tasks)/g) 
        l = min(l,len(list_of_tasks))
        for i in list_of_tasks:
            loc = self.distance(task.location,i.location)
            distances[i] = loc
        keys = list(distances.keys())
        values = list(distances.values())
        sorted_value_index = np.argsort(values)
        sorted_tasks = [keys[i] for i in sorted_value_index]
        nearest_tasks = sorted_tasks[:l]
        return nearest_tasks


    def ms_sc_decomp(self,list_of_workers,list_of_tasks,g):
        P = []
        for i in range(g):
            P.append([])
        G = self.generate_graph1(list_of_tasks,list_of_workers)
        print("Graph : ",G)
        for s in range(g):
            small = float('inf')
            max_index = 0
            cur_index = 0
            print("list of tasks : ",list_of_tasks)
            for y in list_of_tasks:
                if y.location[1] < small:
                    small = y.location[1]
                    max_index = cur_index
                cur_index = cur_index+ 1
            anchor = list_of_tasks[max_index]
            nearest_tasks = self.find_nearest_tasks(anchor,list_of_tasks,g)
            print("anchor : ",anchor)
            print("nearest tasks : ",nearest_tasks)
            sub_prob = {}
            for t in nearest_tasks:
                sub_prob[t] = G[t]
            P[s] = sub_prob
            list_of_tasks = [i for i in list_of_tasks if i not in nearest_tasks]
        return P

    def ms_sc_conflict_reconcile(Ip,Ips):
        worker_Ip = [i[0] for i in Ip]
        worker_Ips = [i[0] for i in Ips]
        conflicting_workers = list(set(worker_Ips).intersection(set(worker_Ip)))
        while(len(conflicting_workers)!=0):
            k=0
            max_index = 0
            max = 0
            for i in conflicting_workers:
                if i.cost>max:
                    max = i.cost
                    max_index = k
                k = k+1
            highest_costworker = conflicting_workers[max_index]
            conflicting_workers.remove(highest_costworker)
        return Ip

    def ms_sc_gdc(self,list_of_tasks,list_of_workers):
        Ip = []
        graph = self.generate_graph1(list_of_tasks,list_of_workers)
        degree = self.calculate_degree(graph)
        g = self.calculate_g(len(list_of_tasks),degree)
        sub_problems = self.ms_sc_decomp(list_of_workers,list_of_tasks,g)
        for i in sub_problems:
            if len(graph[i]) != 1:
                Ip[i] = self.ms_sc_gdc(i,graph[i])
            else:
                Ip[i] = self.ms_sc_greedy(i,graph[i])
        Sol = []
        for i in range(1,g+1):
            Sol = self.ms_sc_conflict_reconcile(Sol,Ip[i])
        return Sol
            

    def calc_costgreedy(self,list_of_tasks,list_of_workers):
        G = self.generate_graph(list_of_tasks,list_of_workers)
        G1 = self.generate_graph1(list_of_tasks,list_of_workers)
        degw =self.calculate_degree(G)
        degt = self.calculate_degree(G1)
        m = len(list_of_tasks)
        n = len(list_of_workers)
        costg = m*n + n*degt*(3*m + degw) + m*degt**2
        return costg

    def calc_costgdc(n,degree,m,g,list_of_tasks,list_of_workers):
        m = len(list_of_tasks)
        n = len(list_of_workers)
        return (m*g+n)(degree-1)


    def ms_sc_adaptive(self,list_of_workers,list_of_tasks):
        Ip = []
        cost_greedy = self.calc_costgreedy(list_of_tasks,list_of_workers)
        cost_gdc = self.calc_costgdc()
        if cost_gdc < cost_greedy:
            Ip = self.ms_sc_greedy(list_of_workers,list_of_tasks)
        else:
            graph = self.generate_graph1(list_of_tasks,list_of_workers)
            degree = self.calculate_degree(graph)
            g = self.calculate_g(len(list_of_tasks),degree)
            sub_problems = self.ms_sc_decomp(list_of_workers,list_of_tasks,g)
            Ips = []
            for i in range(g):
                Ips.append([])
            for i in sub_problems : 
                Ips[i] = self.ms_sc_adaptive(i[0],i[1])
            for i in range(g):
                Ip = self.ms_sc_conflict_reconcile(Ip,Ips[i])
        return Ip

    

    def getfiles(self, dirpath):
        a = [s for s in os.listdir(dirpath) if os.path.isfile(os.path.join(dirpath, s))]
        a.sort(key=lambda s: os.path.getmtime(os.path.join(dirpath, s)))

        if a:
            return a[-1]
        else:
            run = False
            return None

    def getHappinessScore(self, results):
        """
        function to find the happiness score from the results
        Args :
            results (key-value pair) : the result of the matching algorithms

        Returns :
            happiness score as a key value pair
        """
        happiness = {
            33: 0,
            67: 0,
            100: 0,
        }

        df = self.candidate_file
        df2 = self.employer_file
        for result in results:
            emp = result[1]
            jobassigned = result[0]
            index2 = df2.index[df2["job name"] == jobassigned].tolist()
            index = df.index[df["candidate name"] == emp].tolist()
            reqs = df2.loc[index2, "requirements"].tolist()[0].strip().lower()
            if df.loc[index, "preference 1"].tolist()[0].strip().lower() == reqs:
                happiness[100] += 1
            elif df.loc[index, "preference 2"].tolist()[0].strip().lower() == reqs:
                happiness[67] += 1
            else:
                happiness[33] += 1

        return happiness

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
            Employers = []
            for _, row in self.employer_file.iterrows():
                Employers.append(
                    gale_shapely.Employer(
                        row['name'],
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
            # print(results)
            happiness = self.getHappinessScore(results)
            score = [list(happiness.keys()), list(happiness.values())]
            print(score)
            response = {
                "results": results,
                "happiness": score,
            }
            return Response(json.dumps(response), status=status.HTTP_200_OK)
            # print(request.data["method"])

            # elif request.data["method"] == "random":
            # candidate_file = candidate_file.sample(frac=1)
            # employee_file = employee_file.sample(frac=1)
            # min_size = 10


        if request.data["method"] == "greedy":
            list_of_tasks = [tasks for tasks in Employer_ms.objects.all()]
            list_of_workers = [workers for workers in Candidate_ms.objects.all()]
            output  =  self.ms_sc_greedy(list_of_tasks,list_of_workers)
            #output = [['rut','frontend',100]]
            results = [[i[0],i[1]] for i in output]
            scores = [i[2] for i in output]
            response = {
                    "results": results,
                    "happiness": scores,
                }
            return Response(json.dumps(response), status=status.HTTP_200_OK)

        if request.data["method"] == "gdc":
            list_of_tasks = [tasks for tasks in Candidate_ms.objects.all()]
            list_of_workers = [workers for workers in Employer_ms.objects.all()]
            output  =  self.ms_sc_gdc(list_of_tasks,list_of_workers)
            #output = [['rut','frontend',100]]
            results = [[i[0],i[1]] for i in output]
            scores = [i[2] for i in output]
            response = {
                    "results": results,
                    "happiness": scores,
                }
            return Response(json.dumps(response), status=status.HTTP_200_OK)

        
        if request.data["method"] == "adaptive":
            list_of_tasks = [tasks for tasks in Employer_ms.objects.all()]
            list_of_workers = [workers for workers in Candidate_ms.objects.all()]
            output  =  self.ms_sc_greedy(list_of_tasks,list_of_workers)
            #output = [['rut','frontend',100]]
            results = [[i[0],i[1]] for i in output]
            scores = [i[2] for i in output]
            response = {
                    "results": results,
                    "happiness": scores,
                }
            return Response(json.dumps(response), status=status.HTTP_200_OK)



        # Candidate_ms_file = candidate_file.iloc[:min_size]
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
        
class Employer_ms_sc_view(APIView):
    def post(self,request):
        serializer = EmployeeSerializer_ms(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class Candidate_ms_sc_view(APIView):


    def post(self,request):
        serializer = CandidateSerializer_ms(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)