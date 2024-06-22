from django.db import models


# Create your models here.
class EmployeeUploadedFile(models.Model):
    file = models.FileField(upload_to="employee/")
    uploaded_on = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CandidateUploadedFile(models.Model):
    file = models.FileField(upload_to="candidate/")
    uploaded_on = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Candidate(models.Model):
    mode_choices = (("online", "online"), ("offline", "offline"))
    name = models.CharField(max_length=200)
    skill = models.CharField(max_length=200)
    salary = models.IntegerField()
    mode = models.CharField(max_length=200, choices=mode_choices)
    available_from = models.DateField()
    available_to = models.DateField()
    preference1 = models.CharField(max_length=200)
    preference2 = models.CharField(max_length=200)
    preference3 = models.CharField(max_length=200)


class Employee(models.Model):
    mode_choices = (("online", "online"), ("offline", "offline"))
    name = models.CharField(max_length=200)
    requirement = models.CharField(max_length=200)
    budget = models.IntegerField()
    mode = models.CharField(max_length=200, choices=mode_choices)
    available_from = models.DateField()
    available_to = models.DateField()
    min_worker = models.IntegerField()
    max_worker = models.IntegerField()
