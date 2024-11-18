from requests import post, put
from collections import namedtuple

URL_BASE = 'http://localhost:5000/api'

Employee = namedtuple('Employee', 'name, email, position')

BLUR_EMPLOYEES = [
    Employee(name='Demon Albarn', email='demonalbarn@blur.music', position='MAN'),
    Employee(name='Graham Coxon', email='grahamcoxon@blur.music', position='EMP'),
    Employee(name='Alex James', email='alexjames@blur.music', position='EMP'),
    Employee(name='Dave Rowntree', email='daverowntree@blur.music', position='EMP')
]

OASIS_EMPLOYEES = [
    Employee(name='Noel Gallagher', email='noelgallagher@oasis.music', position='MAN'),
    Employee(name='Liam Gallagher', email='liamgallagher@oasis.music', position='EMP'),
    Employee(name='Paul Arthurs', email='paularthurs@oasis.music', position='EMP'),
    Employee(name='Paul McGuigan', email='paulmcguigan@oasis.music', position='EMP'),
    Employee(name='Tony McCarroll', email='tonymccarroll@oasis.music', position='EMP')
]

STONE_ROSES_EMPLOYEES = [
    Employee(name='Ian Brown', email='ianbrown@stoneroses.music', position='MAN'),
    Employee(name='John Squire', email='johnsquire@stoneroses.music', position='EMP'),
    Employee(name='Reni', email='reni@stoneroses.music', position='EMP'),
    Employee(name='Mani', email='mani@stoneroses.music', position='EMP'),
]


def populate_department(employees: list[Employee], name: str, description: str):
    manager = ''
    members = []
    for member in employees:
        result = post(f'{URL_BASE}/employees', json={'name': member.name, 'email':member.email, 'position': member.position, 'department_id':''})
        inserted_member = result.json()
        members.append(inserted_member)
        if inserted_member['position'] == 'MAN':
            manager = inserted_member['id']

    result = post(f'{URL_BASE}/departments', json={'name': name, 'manager':manager, 'description': description})
    band = result.json()
    print(band)
    for member in members:
        result = put(f'{URL_BASE}/employees/{member["id"]}', json={'name': member['name'], 'email': member['email'], 'position': member['position'], 'department_id': band['id']})
        print(result.json())


if __name__ == '__main__':
    from sys import argv
    from psycopg import connect
    
    if len(argv) != 2:
        print(f'Usage: python {argv[0]} populate: populate db\npython {argv[0]} reset: reset db')
    elif argv[1] == 'populate':
        populate_department(BLUR_EMPLOYEES, 'Blur', 'Blur are an English rock band formed in London in 1988')
        populate_department(OASIS_EMPLOYEES, 'Oasis', 'Oasis are an English rock band formed in Manchester in 1991')
        populate_department(STONE_ROSES_EMPLOYEES, 'The Stone Roses', 'The Stone Roses were an English rock band formed in Manchester, England in 1983')
    elif argv[1] == 'reset':
        with connect("dbname=scaleragency user=scaleruser password=scalerpwd host=localhost port=5432") as conn:
            with conn.cursor() as cur:
                cur.execute('DELETE FROM appointmentsrest_department')
                cur.execute('DELETE FROM appointmentsrest_employee')
                conn.commit()
        
