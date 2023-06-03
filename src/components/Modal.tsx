// importing the necessary dependencies
import { useState, FormEvent, FC } from 'react';
import { StudentInterface } from '../App';
import { MdOutlineClose } from 'react-icons/md';

// importing the necessary components
import { Form, FieldsForm } from './Form';

// import css
import '../css/Modal.css';

// Interface for the ModalContainer component
interface PropsModalContainer {
    children: JSX.Element | JSX.Element[]; // It's a JSX Element or an array of JSX Elements and it's required
}

// Interface for the Modal component
interface PropsModal {
    students: StudentInterface[]; // It's an array of StudentInterface and it's required
    setStudents: (students: StudentInterface[]) => void; // It's a function that returns nothing and it's required
    setShowModal: (showModal: boolean) => void; // It's a function that returns nothing and it's required
}

// Interface for the ModalContent component
interface PropsModalContent {
    children: JSX.Element | JSX.Element[]; // It's a JSX Element or an array of JSX Elements and it's required
}

export const ModalContainer:FC<PropsModalContainer> = ({ children }) => {
    return <div className='ModalContainer'>{children}</div>;
} 

export const Modal: FC<PropsModal> = ({ students, setStudents, setShowModal }) => {
    const formFields: FieldsForm[] = [
        {
            name: 'Nombre',
            type: 'text',
            label: 'Nombre Completo',
        },
        {
            name: 'Carrera',
            type: 'text',
            label: 'Carrera',
        }
    ]

    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();4

        const nameRegExp = /^(?!\s*$)[a-zA-Z\s]+$/;;

        const name = event.currentTarget.Nombre.value;
        const carreer = event.currentTarget.Carrera.value;

        if (!nameRegExp.test(name) || !nameRegExp.test(carreer)) {
            setErrors({
                Nombre: !nameRegExp.test(name) ? 'El nombre es requerido' : '',
                Carrera: !nameRegExp.test(carreer) ? 'La carrera es requerida' : '',
            });
            return;
        }

        const newStudent: StudentInterface = {
            id: students.length + 1,
            name: event.currentTarget.Nombre.value.trim(),
            carreer: event.currentTarget.Carrera.value.trim(),
            active: true,
        };

        setStudents([...students, newStudent]);
        setShowModal(false);
    }

    return (
		<div className='modal'>
			<span className='closeModal' onClick={()=>setShowModal(false)}>
				<MdOutlineClose />
			</span>
			<ModalContent>
                <Form title={'Registrar Estudiante'} fields={formFields} buttonText={'Registrar Estudiante'} className={`formCreate`} onSubmit={handleSubmit} errors={errors}/>
            </ModalContent>
		</div>
	);
}

export const ModalContent: FC<PropsModalContent> = ({ children }) => {
    return <div className='modalContent'>{children}</div>;
}