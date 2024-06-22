from os import name
from django.urls import path
from .views import (
    EmployeeFileUploadAPIView,
    CandidateFileUploadAPIView,
    RunSimulation,
)
from .views import manualCandidateFileUpload

app_name = "api"

urlpatterns = [
    path("employee_upload/", EmployeeFileUploadAPIView.as_view(), name="employee-file"),
    path(
        "candidate_upload/", CandidateFileUploadAPIView.as_view(), name="candidate-file"
    ),
    path("run_simulation/", RunSimulation.as_view(), name="simulate"),
    path(
        "m_candidate_upload/",
        manualCandidateFileUpload.as_view(),
        name="manual_candidate_file_upload",
    ),
]
