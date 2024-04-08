from django.db import models

# Create your models here.
class EmployeeUploadedFile(models.Model):
    file = models.FileField(upload_to='employee/')
    uploaded_on = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class CandidateUploadedFile(models.Model):
    file = models.FileField(upload_to='candidate/')
    uploaded_on = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name