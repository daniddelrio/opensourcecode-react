from webapp.models import *
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class_num = serializers.SerializerMethodField('get_class_num', read_only=True)
    section = serializers.SerializerMethodField('get_section', read_only=True)

    def get_class_num(self, obj):
        return obj.class_num.number

    def get_section(self, obj):
        return obj.section.name

    class Meta:
        model = Student
        fields = ['id', 'name', 'roll_number', 'class_num', 'section']

class StudentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'roll_number', 'class_num', 'section']

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'number', 'teacher']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name', 'teacher', 'class_num']

class SectionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name', 'teacher', 'class_num']

class TeacherSerializer(serializers.ModelSerializer):
    classes = ClassSerializer(many=True, read_only=True)
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = ['id', 'name', 'teacher_id', 'classes', 'sections']
