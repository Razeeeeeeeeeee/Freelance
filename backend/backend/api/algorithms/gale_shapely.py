from datetime import datetime


class Employer:
    def __init__(self, name, skills_required, work_dates):
        self.name = name
        self.skills_required = [skill.lower() for skill in skills_required]
        self.work_dates = work_dates
        self.proposals = []

    def evaluate(self, employee):
        # Evaluate employee based on skills required and work dates
        skill_match = set(self.skills_required).intersection(
            set([skill.lower() for skill in employee.skills])
        )
        employee_start_date, employee_end_date = employee.available_dates

        date_match = (
            self.work_dates[0] >= employee_start_date
            and self.work_dates[1] <= employee_end_date
        )

        if skill_match and date_match:
            return 0
        elif skill_match:
            return 1
        elif date_match:
            return 2
        else:
            return 3

    def propose_to(self, employee):
        # Employer proposes to employee
        self.proposals.append(employee)
        return employee.accept_proposal(self)

    def __str__(self) -> str:
        return self.name


class Employee:
    def __init__(self, name, skills, available_dates, preferences):
        self.name = name
        self.skills = [skill.lower() for skill in skills]
        self.available_dates = available_dates
        self.preferences = [preference.lower() for preference in preferences]
        self.matched_employer = None

    def accept_proposal(self, employer):
        # Employee accepts proposal if it's the best match
        if self.matched_employer is None:
            self.matched_employer = employer
            return True
        elif self.preferences.index(
            self.matched_employer.skills_required[0]
        ) > self.preferences.index(employer.skills_required[0]):
            self.matched_employer = employer
            return True
        else:
            return False

    def __str__(self) -> str:
        return self.name


def gale_shapley_matching(employers, employees):
    # Step 1: Initialization
    unmatched_employers = list(employers)
    matched_pairs = []

    # Step 2: Preference List Construction
    employer_preferences = {}
    for employer in employers:
        # Construct employer's preference list based on employee preferences
        employer_preferences[employer] = sorted(
            employees, key=lambda emp: employer.evaluate(emp)
        )

    # Step 3: Matching Process
    while unmatched_employers:
        employer = unmatched_employers.pop(0)
        for employee in employer_preferences[employer]:
            if employer.propose_to(employee):  # Employer proposes to the employee
                if employee.matched_employer is employer:
                    matched_pairs.append((employer.name, employee.name))
                    break
                else:
                    unmatched_employers.append(employer)
                    break

    # Step 5: Output
    return matched_pairs


# Example usage:
# employers = [
#    Employer("Company A", ["Python"], ["2024-07-01", "2024-07-31"]),
#    Employer("Company B", ["Java"], ["2024-08-01", "2024-08-31"]),
# ]

# employees = [
#    Employee("Alice", ["Python"], ["2024-06-01", "2024-08-01"], ["Python", "Java"]),
#    Employee("Bob", ["Java"], ["2024-07-01", "2024-09-01"], ["Java", "Python"]),
# ]

# matches = gale_shapley_matching(employers, employees)
# print(matches)
