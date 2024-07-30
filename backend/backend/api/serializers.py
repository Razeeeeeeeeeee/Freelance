from rest_framework import serializers
from .models import EmployeeUploadedFile, CandidateUploadedFile, Employee, Candidate , Employer_ms, Candidate_ms

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




class EmployeeSerializer_ms(serializers.ModelSerializer):
    class Meta:
        model = Employer_ms
        fields = '__all__'

class CandidateSerializer_ms(serializers.ModelSerializer):
    class Meta:
        model = Candidate_ms
        fields = '__all__'
