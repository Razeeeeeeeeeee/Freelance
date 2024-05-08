from django.contrib import admin
from .models import EmployeeUploadedFile,CandidateUploadedFile

# Register your models here.
admin.site.register(EmployeeUploadedFile)
admin.site.register(CandidateUploadedFile)