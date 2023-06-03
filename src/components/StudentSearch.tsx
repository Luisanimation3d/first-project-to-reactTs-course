// importing the necessary dependencies
import { FC } from 'react';
import { MdSearch } from 'react-icons/md';

// Interface for the StudentSearch component
interface PropsStudentSearch {
	search: string; // The search string
	handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void; // The function to handle the search
	[key: string]: any; // Any other prop
}

export const StudentSearch: FC<PropsStudentSearch> = ({
	search,
	handleSearch,
	...props
}) => {
	return (
		<div className={`StudentSearch ${props?.className}`}>
			<input
				type='text'
				value={search}
				onChange={handleSearch}
				id='searchStudent'
				placeholder='Buscar Estudiante'
			/>
			<label htmlFor='searchStudent'> <MdSearch/> </label>
		</div>
	);
};
