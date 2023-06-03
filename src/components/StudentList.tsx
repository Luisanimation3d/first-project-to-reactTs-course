// Importing Dependencies
import { FC } from 'react';

// Interface for the StudentList component
interface PropsStudentList {
	children: JSX.Element[] | JSX.Element;
	[key: string]: any;
}

export const StudentList: FC<PropsStudentList> = ({ children, ...props }) => {
	return (
		<table {...props}>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Carrera</th>
					<th>Estado</th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};
