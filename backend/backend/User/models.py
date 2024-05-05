from django.db import models
TYPES = (
        ("offline","offline"),
        ("online","online"),
    )
# Create your models here.
class Employer(models.Model):

    Job_Name = models.CharField(max_length=200)
    Job_type = models.CharField(max_length=20, choices = TYPES)
    Skill_Requirement = models.CharField(max_length=1000)
    Budget_allocated = models.IntegerField(null = True)
    Min_worker = models.IntegerField()
    Max_worker = models.IntegerField()
    Start_date = models.DateField()
    End_date = models.DateField()


class Candidate(models.Model):
    
    Candi_name = models.CharField(max_length=200)
    mode = models.CharField(max_length=20, choices = TYPES,null = True)
    Skills = models.CharField(max_length=100, null = True)
    Payment = models.IntegerField(null = True)
    Start_date = models.DateField(null = True)
    End_date = models.DateField(null = True)
    Preferences = models.CharField(max_length=300,default = "Frontend,Backend,Aiml,Fullstack")


    def get_preference_list(self):
        return self.Preferences.split(',')