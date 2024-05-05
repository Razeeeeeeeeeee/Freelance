from django.urls import path
from .views import Employer,Candidate_view

urlpatterns = [
    path('employer/', Employer.as_view()),
    path('candidate/', Candidate_view.as_view()),
    
]