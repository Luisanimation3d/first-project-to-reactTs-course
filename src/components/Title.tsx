import { FC } from "react";


// Interface for the Title component
interface PropsTitle {
    totalStudents: number | 0; // It's a number and it's required
    totalActiveStudents: number | 0; 
    [key: string]: any; // It's any other prop and it's optional
}

export const Title: FC<PropsTitle> = ({totalStudents = 0, totalActiveStudents = 0, ...props })  => {
  return <h1 {...props}>Hay {totalActiveStudents} estudiantes activos de {totalStudents} registrados</h1>
}