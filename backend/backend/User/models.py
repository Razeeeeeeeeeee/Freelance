from django.db import models
TYPES = (
        ("offline","offline"),
        ("online","online"),
    )
# Create your models here.
class Employer(models.Model):

    name = models.CharField(max_length=200)
    skills = models.CharField(max_length=1000)
    budget = models.IntegerField(default= 1)
    arrival_deadline = models.IntegerField(default = 1)
    location = models.CharField(max_length=1000)
    
    def get_location(self):
        return self.Location.split(',')


class Candidate(models.Model):
    
    name = models.CharField(max_length=200)
    skills = models.CharField(max_length=100, null = True)
    velocity = models.IntegerField(null = True)
    cost = models.IntegerField(null = True)
    max_distance = models.IntegerField(null = True)
    location = models.CharField(max_length=1000)


    def get_location(self):
        return self.location.split(',')