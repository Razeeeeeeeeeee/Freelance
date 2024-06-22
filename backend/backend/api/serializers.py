from rest_framework import serializers
from .models import EmployeeUploadedFile, CandidateUploadedFile

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


class CandidateEntrySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    skill = serializers.CharField(max_length=200)
    salary = serializers.IntegerField()
    mode = serializers.ChoiceField(choices=mode_choices)
    available_from = serializers.DateField()
    available_to = serializers.DateField()
    preference1 = serializers.CharField(max_length=200)
    preference2 = serializers.CharField(max_length=200)
    preference3 = serializers.CharField(max_length=200)


class EmployeeEntrySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    requirement = serializers.CharField(max_length=200)
    budget = serializers.IntegerField()
    mode = serializers.ChoiceField(choices=mode_choices)
    available_from = serializers.DateField()
    available_to = serializers.DateField()
    min_worker = serializers.IntegerField()
    max_worker = serializers.IntegerField()
