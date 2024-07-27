
class Employer:
    def __init__(self, name, job_name, requirements, budget, max_workers, min_workers, mode, available_from, available_till, preference_list):
        self.name = name.lower()
        self.job_name = job_name.lower()
        self.requirements = set(requirement.strip().lower() for requirement in requirements.split(","))
        self.budget = budget
        self.max_workers = max_workers
        self.min_workers = min_workers
        self.mode = mode.lower()
        self.available_from = available_from
        self.available_till = available_till
        self.preference_list = [pref.lower() for pref in preference_list]
        self.matched_employees = []

class Employee:
    def __init__(self, name, skills, desired_salary, mode, available_from, available_till, preference_list):
        self.name = name.lower()
        self.skills = set(skill.strip().lower() for skill in skills.split(","))
        self.desired_salary = desired_salary
        self.mode = mode.lower()
        self.available_from = available_from
        self.available_till = available_till
        self.preference_list = [pref.lower() for pref in preference_list]
        self.matched_employer = None

def qualifies(employee, employer):
    return (employee.skills.issuperset(employer.requirements) and
            employee.desired_salary <= employer.budget and
            employee.mode == employer.mode and
            employee.available_from <= employer.available_from and
            employee.available_till >= employer.available_till)

def gale_shapley(employers, employees):
    unmatched_employers = employers[:]
    while unmatched_employers:
        employer = unmatched_employers.pop(0)
        for employee_name in employer.preference_list:
            employee = next(e for e in employees if e.name == employee_name)
            if qualifies(employee, employer):
                if employee.matched_employer is None:
                    employer.matched_employees.append(employee)
                    employee.matched_employer = employer
                    if len(employer.matched_employees) >= employer.max_workers:
                        break
                else:
                    current_employer = employee.matched_employer
                    if employee.preference_list.index(employer.name) < employee.preference_list.index(current_employer.name):
                        current_employer.matched_employees.remove(employee)
                        if len(current_employer.matched_employees) < current_employer.min_workers:
                            unmatched_employers.append(current_employer)
                        employer.matched_employees.append(employee)
                        employee.matched_employer = employer
                        if len(employer.matched_employees) >= employer.max_workers:
                            break

    return [(employer.name, [e.name for e in employer.matched_employees]) for employer in employers]

# Example Usage
# employers = [
#     Employer("Employer1", "Software Developer", "Python, sql", 100000, 3, 1, "online", "2023-01-01", "2023-12-31", ["Employee1", "Employee2"]),
#     Employer("Employer2", "Data Scientist", "Python, Machine Learning", 120000, 2, 1, "offline", "2023-02-01", "2023-11-30", ["Employee3", "Employee4"])
# ]
#
# employees = [
#     Employee("Employee1", "Python, SQL, JavaScript", 90000, "online", "2023-01-01", "2023-12-31", ["Employer1", "Employer2"]),
#     Employee("Employee2", "Python, SQL, Java", 95000, "online", "2023-03-01", "2023-12-31", ["Employer2", "Employer1"]),
#     Employee("Employee3", "Python, Machine Learning, R", 110000, "offline", "2023-02-01", "2023-11-30", ["Employer2", "Employer1"]),
#     Employee("Employee4", "Python, Machine Learning, Java", 115000, "offline", "2023-05-01", "2023-10-31", ["Employer1", "Employer2"])
# ]
#
# matches = gale_shapley(employers, employees)
# for match in matches:
#     print(f"{match[0].capitalize()} matched with {', '.join([e.capitalize() for e in match[1]])}")

