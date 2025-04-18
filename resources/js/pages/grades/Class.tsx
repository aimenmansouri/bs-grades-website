import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Classes',
        href: '/dashboard/classes',
    },
];
interface Student {
    id: number;
    name: string;
    email: string;
    role: number;
    pivot: {
        my_class_id: number;
        user_id: number;
        created_at: string;
        updated_at: string;
    };
}

interface StudentsTableProps {
    students: Student[];
    classCode: string;
}

export default function StudentsTable({ students, classCode }: StudentsTableProps) {
    console.log('classcode ', classCode);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id} className="cursor-pointer hover:bg-neutral-900">
                                    <TableCell>
                                        <Link
                                            href={route('dashboard.grades.student', { class_code: classCode, studentId: student.id })}
                                            className="block w-full"
                                        >
                                            {student.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={route('dashboard.grades.student', { class_code: classCode, studentId: student.id })}
                                            className="block w-full"
                                        >
                                            {student.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={route('dashboard.grades.student', { class_code: classCode, studentId: student.id })}
                                            className="block w-full"
                                        >
                                            {student.role === 3 ? 'Student' : 'Other'}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
