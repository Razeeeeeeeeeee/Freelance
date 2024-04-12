from django.urls import path
from .views import Employer,Candidate

urlpatterns = [
    path('employer/', Employer.as_view()),
    path('candidate/', Candidate.as_view())
]