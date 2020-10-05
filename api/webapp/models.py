from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Teacher(models.Model):
    name = models.CharField(max_length=255)
    teacher_id = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Class(models.Model):
    number = models.IntegerField(validators=[
        MaxValueValidator(12),
        MinValueValidator(1)
    ])
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='classes')

    def __str__(self):
        return str(self.number)

class Section(models.Model):
    SECTION_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('E', 'E'),
        ('F', 'F'),
    ]

    name = models.CharField(max_length=5, choices=SECTION_CHOICES)
    class_num = models.OneToOneField(Class, on_delete=models.CASCADE, related_name='class+')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='sections')

    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=255)
    roll_number = models.IntegerField()
    class_num = models.ForeignKey(Class, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
