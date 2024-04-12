from rest_framework import serializers
from .models import Employer,Candidate

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'