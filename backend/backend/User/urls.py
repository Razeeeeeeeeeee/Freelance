from django.urls import path
from .views import Employer_view,Candidate_view,Run_Simulation_ms_sc_gdc,Run_simulation_ms_sc_greedy

urlpatterns = [
    path('employer/', Employer_view.as_view()),
    path('candidate/', Candidate_view.as_view()),
    path('get_ms_sc_gdc/',Run_Simulation_ms_sc_gdc.as_view()),
    path('get_ms_sc_greedy/',Run_simulation_ms_sc_greedy.as_view()),
]