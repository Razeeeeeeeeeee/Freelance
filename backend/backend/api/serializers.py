from rest_framework import serializers
from .models import EmployeeUploadedFile, CandidateUploadedFile, Employee, Candidate

mode_choices = (("online", "online"), ("offline", "offline"))


class EmployeeFileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeUploadedFile
        fields = (
            "file",
            "name",
        )


class CandidateFileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateUploadedFile
        fields = (
            "file",
            "name",
        )


class CandidateEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = "__all__"


class EmployeeEntrySerializer(serializers.Serializer):
    class Meta:
        model = Employee
        fields = "__all__"
