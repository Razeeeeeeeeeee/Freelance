from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmployeeSerializer,CandidateSerializer
from .models import Candidate,Employer
import random
import math
import numpy as np
import json
# Create your views here.

class Employer_view(APIView):
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

    
class Run_simulation_ms_sc_greedy(APIView):

    def post(self,request):
        list_of_tasks = [tasks for tasks in Employer.objects.all()]
        list_of_workers = [workers for workers in Candidate.objects.all()]
        output  =  self.ms_sc_greedy(list_of_tasks,list_of_workers)
        #output = [['rut','frontend',100]]
        results = [[i[0],i[1]] for i in output]
        scores = [i[2] for i in output]
        response = {
                "results": results,
                "happiness": scores,
            }
        return Response(json.dumps(response), status=status.HTTP_200_OK)
    
    '''def simulation(list_of_tasks, list_of_workers):
        allotted_task = []
        for i in preferences:
            j = random.randint(1,4)
            allotted_task.append(j)
        no_of_workers = [0,0,0,0]
        for i in allotted_task:
            no_of_workers[i-1] = no_of_workers[i-1] + 1
        happiness = [25,50,75,100]
        return [happiness,no_of_workers]  '''
    

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
            

class Run_Simulation_ms_sc_gdc(APIView):

    def post(self,request):
        list_of_tasks = [tasks for tasks in Candidate.objects.all()]
        list_of_workers = [workers for workers in Employer.objects.all()]
        assignment = self.ms_sc_gdc(list_of_tasks,list_of_workers)
        return Response(assignment)
    
    def generate_graph1(list_of_workers,list_of_tasks):
        k = {}
        worker_no=-1
        for i in list_of_workers:
            worker_no = worker_no + 1
            for j in range(len(list_of_tasks)):
                if(Candidate_view.check_valid(i,list_of_tasks[j])):
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

    def find_nearest_tasks(task,list_of_tasks,g):
        nearest_tasks = []
        distances = {}
        l = math.ceil(len(list_of_tasks)/g) 
        l = min(l,len(list_of_tasks))
        for i in list_of_tasks:
            loc = Candidate_view.distance(task.location,i.location)
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
                Ip[i] = Candidate_view.ms_sc_greedy(i,graph[i])
        Sol = []
        for i in range(1,g+1):
            Sol = self.ms_sc_conflict_reconcile(Sol,Ip[i])
        return Sol


class Run_simulation_ms_sc_adaptive(APIView):

    def post(self,request):
        list_of_tasks = [tasks for tasks in Employer.objects.all()]
        list_of_workers = [workers for workers in Candidate.objects.all()]
        output  =  self.ms_sc_greedy(list_of_tasks,list_of_workers)
        #output = [['rut','frontend',100]]
        results = [[i[0],i[1]] for i in output]
        scores = [i[2] for i in output]
        response = {
                "results": results,
                "happiness": scores,
            }
        return Response(json.dumps(response), status=status.HTTP_200_OK)
     
     
    def calc_costgreedy(list_of_tasks,list_of_workers):
        G = Run_simulation_ms_sc_greedy.generate_graph(list_of_tasks,list_of_workers)
        G1 = Run_Simulation_ms_sc_gdc.generate_graph1(list_of_tasks,list_of_workers)
        degw = Run_Simulation_ms_sc_gdc.calculate_degree(G)
        degt = Run_Simulation_ms_sc_gdc.calculate_degree(G1)
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
            Ip = Run_simulation_ms_sc_greedy.ms_sc_greedy(list_of_workers,list_of_tasks)
        else:
            graph = Run_Simulation_ms_sc_gdc.generate_graph1(list_of_tasks,list_of_workers)
            degree = Run_Simulation_ms_sc_gdc.calculate_degree(graph)
            g = Run_Simulation_ms_sc_gdc.calculate_g(len(list_of_tasks),degree)
            sub_problems = Run_Simulation_ms_sc_gdc.ms_sc_decomp(list_of_workers,list_of_tasks,g)
            Ips = []
            for i in range(g):
                Ips.append([])
            for i in sub_problems : 
                Ips[i] = self.ms_sc_adaptive(i[0],i[1])
            for i in range(g):
                Ip = Run_Simulation_ms_sc_gdc.ms_sc_conflict_reconcile(Ip,Ips[i])
        return Ip

        
        
    
