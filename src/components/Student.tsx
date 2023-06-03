// importing the necessary dependencies
import { FC } from 'react';

// Interface for Student component props
interface PropsStudent {
    name: string;
    carreer: string;
    active: boolean;
    handleStudentStateChange: ()  => void;
}

export const Student: FC<PropsStudent> = ({name, carreer, active, handleStudentStateChange}) => {
 return (
    <tr>
			<td>{name}</td>
			<td>{carreer}</td>
			<td>
				<button onClick={handleStudentStateChange} className={`button--${active ? 'activo' : 'inactivo'}`}>{active ? 'Activo' : 'Inactivo'}</button>
			</td>
		</tr>
 )
}