import './css/App.css';
// importing the necessary dependencies
import { useState, useEffect, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlinePlus } from 'react-icons/ai';

// importing the necessary components
import { Title } from './components/Title';
import { StudentSearch } from './components/StudentSearch';
import { StudentList } from './components/StudentList';
import { Student } from './components/Student';
import { ModalContainer, Modal } from './components/Modal';

export interface StudentInterface {
	id: number;
	name: string;
	carreer: string;
	active: boolean;
}

function App() {

	const initialData: StudentInterface[] =  localStorage.students == null ? [] : JSON.parse(localStorage.students);

	const [search, setSearch] = useState<string>('');
	const [students, setStudents] = useState<StudentInterface[]>(initialData);
	const [showModal, setShowModal] = useState<boolean>(false);

	let studentsFiltered: StudentInterface[] = [];

	const totalActiveStudents: number = students?.filter(
		(student) => student.active
	).length;
	const totalStudents: number = students.length;

	function handleStudentStateChange(id: number) {
		const newStudents: StudentInterface[] = [...students];
		const studentIndex: number = newStudents.findIndex(
			(student) => student.id === id
		);
		newStudents[studentIndex].active = !newStudents[studentIndex].active;
		setStudents(newStudents);
	}

	function handleSearch(event: ChangeEvent<HTMLInputElement>) {
		setSearch(event.target.value);
	}

	if (search !== '') {
		studentsFiltered = students.filter((student) => {
			return (
				student.name.toLowerCase().includes(search.toLowerCase()) ||
				student.carreer.toLowerCase().includes(search.toLowerCase())
			);
		});
	} else {
		studentsFiltered = [...students];
	}

	useEffect(() => {
		localStorage.students = JSON.stringify(students);	
	}, [students]);

	return (
		<div className='App'>
			<Title
				totalStudents={totalStudents}
				totalActiveStudents={totalActiveStudents}
				className={`title`}
			/>
			<StudentSearch search={search} handleSearch={handleSearch} />
			{studentsFiltered.length === 0 && students.length !== 0 ? (
				<h3 className='emptyResult'>No hay resultados para la busqueda</h3>
			) : (
				<StudentList className={`tableStudents`}>
					{studentsFiltered?.map((student) => {
						return (
							<Student
								key={student.id}
								name={student.name}
								carreer={student.carreer}
								active={student.active}
								handleStudentStateChange={() =>
									handleStudentStateChange(student.id)
								}
							/>
						);
					})}
				</StudentList>
			)}

			<button
				onClick={() => setShowModal((previousState) => !previousState)}
				className='addButton'
			>
				<AiOutlinePlus />
			</button>
			{showModal && createPortal(
				<ModalContainer setShowModal={setShowModal}>
					<Modal
						students={students}
						setStudents={setStudents}
						setShowModal={setShowModal}
					/>
				</ModalContainer>,
				document.querySelector('#modal') as HTMLElement
			)}
			<span className={`copy`}>Proyecto desarrollado en ReactTs por <a href="https://github.com/Luisanimation3d">Luis Correa</a></span>
		</div>
	);
}

export default App;
