from rest_framework import serializers
from .models import EmployeeUploadedFile,CandidateUploadedFile

class EmployeeFileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeUploadedFile
        fields = ('file', 'name',)

class CandidateFileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateUploadedFile
        fields = ('file', 'name',)