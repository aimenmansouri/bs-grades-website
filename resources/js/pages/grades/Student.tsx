import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from "sonner"

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

interface StudentPageProps {
    student: Student;
    class: ClassData;
}

export default function Student({ student, class: classData }: StudentPageProps) {
    const [termGrade, setTermGrade] = useState('');
    const [examGrade, setExamGrade] = useState('');

    const handleSaveGrades = () => {
        toast("Event has been created.")

        console.log('Saving grades:', { termGrade, examGrade });
        // You would typically use Inertia.post here to submit to your backend
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Head title={`${student.name} Grades`} />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Student Information</CardTitle>
                                <CardDescription>
                                    View and manage grades for {student.name} in {classData.name} class
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
