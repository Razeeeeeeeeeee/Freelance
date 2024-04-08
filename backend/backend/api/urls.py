from django.urls import path
from .views import EmployeeFileUploadAPIView,CandidateFileUploadAPIView

app_name = 'api'

urlpatterns = [
    path('employee_upload/', EmployeeFileUploadAPIView.as_view(), name='employee-file'),
    path('candidate_upload/', CandidateFileUploadAPIView.as_view(), name='candidate-file'),
]
