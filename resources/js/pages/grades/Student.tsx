import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `Student Grades`,
        href: '/dashboard/classes',
    },
];
interface Student {
    id: number;
    name: string;
    email: string;
}

interface ClassData {
    id: number;
    name: string;
    code: string;
}

interface GradeData {
    id: number;
    grade: number;
    type: 'term' | 'exam';
    student_id: number;
    by_id: number;
    my_class_id: number;
    by: Student;
    class: ClassData;
    created_at: string;
    updated_at: string;
}
interface StudentPageProps {
    student: Student;
    myclass: ClassData;
    grades: GradeData[];
}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
export default function Student({ student, myclass, grades }: StudentPageProps) {
    console.log(grades);
    const [termGrade, setTermGrade] = useState('');
    const [examGrade, setExamGrade] = useState('');

    const handleSaveGrades = () => {
        const data = {
            termGrade: termGrade || null,
            examGrade: examGrade || null,
            student_id: student.id,
            my_class_id: myclass.id,
        };
        console.log(data);
        router.post(route('dashboard.grades.store'), data);

        toast('grades saved');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Head title={`${student.name} Grades`} />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Student Information</CardTitle>
                                <CardDescription>
                                    View and manage grades for {student.name} in {myclass.name} class
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-medium">Name:</p>
                                            <p>{student.name}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Email:</p>
                                            <p>{student.email}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="mb-4 text-lg font-medium">Grades</h3>

                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Assessment Type</TableHead>
                                                    <TableHead>Grade</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Term Grade</TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={termGrade}
                                                            onChange={(e) => setTermGrade(e.target.value)}
                                                            placeholder="Enter term grade"
                                                            className="w-32"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Exam Grade</TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={examGrade}
                                                            onChange={(e) => setExamGrade(e.target.value)}
                                                            placeholder="Enter exam grade"
                                                            className="w-32"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                        <div className="mt-4 flex justify-end">
                                            <Button onClick={handleSaveGrades}>Save Grades</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">Student Grades</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Class</TableHead>
                                            <TableHead>Added By</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {grades.map((grade) => (
                                            <TableRow key={grade.id}>
                                                <TableCell className="font-medium">{grade.id}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            grade.grade >= 16
                                                                ? 'bg-green-500'
                                                                : grade.grade >= 14
                                                                  ? 'bg-blue-500'
                                                                  : grade.grade >= 10
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-red-500'
                                                        }
                                                    >
                                                        {grade.grade}/20
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="capitalize">{grade.type}</TableCell>
                                                <TableCell>{grade.class.code}</TableCell>
                                                <TableCell>{grade.by.name}</TableCell>
                                                <TableCell>{formatDate(grade.created_at)}</TableCell>
                                                <TableCell>
                                                    <Button>Verify</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
