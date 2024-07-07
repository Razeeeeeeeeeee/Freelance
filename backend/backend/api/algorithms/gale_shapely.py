

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

    def __str__(self):
        return self.name


class Employee:
    def __init__(self, name, skills, available_dates, preferences):
        self.name = name
        self.skills = [skill.lower() for skill in skills]
        self.available_dates = available_dates
        self.preferences = [preference.lower() for preference in preferences]
        self.matched_employer = None

    def accept_proposal(self, employer):
        if self.matched_employer is None:
            self.matched_employer = employer
            return True
        else:
            current_employer_skill = self.matched_employer.skills_required[0]
            new_employer_skill = employer.skills_required[0]

            if current_employer_skill not in self.preferences:
                current_preference_index = len(self.preferences) + 1
            else:
                current_preference_index = self.preferences.index(current_employer_skill)

            if new_employer_skill not in self.preferences:
                new_preference_index = len(self.preferences) + 1
            else:
                new_preference_index = self.preferences.index(new_employer_skill)

            if new_preference_index < current_preference_index:
                self.matched_employer = employer
                return True
            else:
                return False

    def __str__(self):
        return self.name


def gale_shapley_matching(employers, employees):
    unmatched_employers = list(employers)
    matched_pairs = []

    employer_preferences = {}
    for employer in employers:
        employer_preferences[employer] = sorted(
            employees, key=lambda emp: employer.evaluate(emp)
        )

    while unmatched_employers:
        employer = unmatched_employers.pop(0)
        for employee in employer_preferences[employer]:
            if employer.propose_to(employee):
                if employee.matched_employer is employer:
                    matched_pairs.append((employer.name, employee.name))
                    break
                else:
                    unmatched_employers.append(employer)
                    break

    return matched_pairs
